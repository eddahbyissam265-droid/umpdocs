const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../config/db'); // Notre nouveau db.js PostgreSQL

// --- CONFIGURATION CLOUDINARY ---
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: { 
        folder: 'umpdocs_cours', 
        resource_type: 'auto', // Laisse Cloudinary détecter automatiquement le type (PDF, image, etc.)
        format: 'pdf' // Force Cloudinary à ajouter l'extension .pdf au lien
    },
});
const upload = multer({ storage: storage });

// --- CONFIGURATION GOOGLE ---
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '265258547962-3l1s0l3ep99tg6ej2bk1ovgc78962euc.apps.googleusercontent.com'; // ⚠️ REMPLACE PAR TON VRAI CLIENT ID
const client = new OAuth2Client(CLIENT_ID);

// --- AUTHENTIFICATION GOOGLE ---
router.post('/auth/google', async (req, res) => {
    const { credential } = req.body;
    try {
        const ticket = await client.verifyIdToken({ idToken: credential, audience: CLIENT_ID });
        const payload = ticket.getPayload();
        const { email, name } = payload;

        const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (rows.length === 0) {
            await db.query("INSERT INTO users (email, password, pseudo) VALUES ($1, $2, $3)", [email, 'google_oauth', name]);
            res.status(200).json({ message: "Compte créé via Google", pseudo: name });
        } else {
            res.status(200).json({ message: "Connexion réussie", pseudo: rows[0].pseudo });
        }
    } catch (err) {
        console.error("Erreur Google :", err);
        res.status(401).json({ erreur: "Authentification Google échouée." });
    }
});

// --- AUTHENTIFICATION CLASSIQUE ---
router.post('/auth/register', async (req, res) => {
    const { email, password, pseudo } = req.body;
    if (!email || !password || !pseudo) return res.status(400).json({ erreur: "Champs obligatoires." });
    try {
        await db.query("INSERT INTO users (email, password, pseudo) VALUES ($1, $2, $3)", [email, password, pseudo]);
        res.status(200).json({ message: "Compte créé avec succès !", pseudo: pseudo });
    } catch (err) {
        res.status(400).json({ erreur: "Cet email est déjà utilisé." });
    }
});

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password]);
    if (rows.length === 0) return res.status(401).json({ erreur: "Email ou mot de passe incorrect." });
    res.status(200).json({ message: "Connexion réussie", pseudo: rows[0].pseudo });
});
// ==========================================
// VIGILE DE SÉCURITÉ ADMIN
// ==========================================
const verifierAdmin = (req, res, next) => {
    const motDePasse = req.headers['x-admin-password'];
    
    // 🔒 CHANGER LE MOT DE PASSE ICI :
    const vraiMotDePasse = "Oujda2026!"; // Tu peux mettre le mot de passe que tu veux
    
    if (motDePasse === vraiMotDePasse) {
        next(); // Le mot de passe est bon, on laisse passer
    } else {
        res.status(403).json({ error: "🔒 Accès refusé : Mot de passe administrateur incorrect." });
    }
};


// --- DOCUMENTS ---
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM documents ORDER BY id DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erreur: "Erreur serveur" });
    }
});

// 🚨 LE BLOC CORRIGÉ AVEC LE MOUCHARD 🚨
router.post('/',verifierAdmin ,upload.single('file'), async (req, res) => {
    try {
        // 1. Vérification du fichier
        if (!req.file) {
            console.error("❌ ERREUR : Aucun fichier reçu ou identifiants Cloudinary manquants.");
            return res.status(400).json({ error: "Le fichier n'a pas pu être traité." });
        }

        const { title, module, option_pcp } = req.body;
const category = req.body.category || 'Cours';
const filiere = req.body.filiere || 'Général';
const semestre = req.body.semestre || 'S1';
        const cheminFichier = req.file.path; 
        const optionFinal = option_pcp || '';

        // 2. Sauvegarde en BDD
        await db.query(
            "INSERT INTO documents (title, category, module, filiere, semestre, option_pcp, file_path, downloads) VALUES ($1, $2, $3, $4, $5, $6, $7, 0)",
            [title, category, module, filiere, semestre, optionFinal, cheminFichier]
        );
        
        res.status(200).json({ message: "Document sauvegardé !" });

    } catch (erreur) {
        // 3. Le serveur affiche enfin la vraie erreur sur Render !
        console.error("❌ CRASH LORS DE L'ENVOI :", erreur);
        res.status(500).json({ error: "Erreur système : " + erreur.message });
    }
});

router.post('/:id/download', async (req, res) => {
    await db.query("UPDATE documents SET downloads = downloads + 1 WHERE id = $1", [req.params.id]);
    res.status(200).json({ message: "Téléchargement comptabilisé !" });
});

// --- SUPPRESSION D'UN DOCUMENT ---
router.delete('/:id',verifierAdmin ,async (req, res) => {
    try {
        const documentId = req.params.id;

        // 1. Récupérer le document pour avoir son lien Cloudinary
        const { rows } = await db.query("SELECT file_path FROM documents WHERE id = $1", [documentId]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: "Document introuvable." });
        }

        const document = rows[0];

        // 2. Supprimer le fichier physiquement sur Cloudinary (si le lien existe)
        if (document.file_path && document.file_path.includes('cloudinary')) {
            // On extrait le nom exact du fichier depuis l'URL
            const urlParts = document.file_path.split('/');
            const nomFichierAvecExtension = urlParts[urlParts.length - 1];
            const nomFichier = nomFichierAvecExtension.split('.')[0]; 
            
            // Le public_id dans Cloudinary inclut le nom du dossier : "umpdocs_cours/nomdufichier"
            const publicId = `umpdocs_cours/${nomFichier}`;

            // Ordre de destruction envoyé à Cloudinary
            await cloudinary.uploader.destroy(publicId);
        }

        // 3. Supprimer la ligne de la base de données PostgreSQL
        await db.query("DELETE FROM documents WHERE id = $1", [documentId]);
        
        res.status(200).json({ message: "Document et fichier Cloudinary supprimés avec succès !" });

    } catch (error) {
        console.error("❌ Erreur lors de la suppression :", error);
        res.status(500).json({ error: "Erreur serveur lors de la suppression." });
    }
});

// --- COMMENTAIRES ---
router.get('/:id/comments', async (req, res) => {
    const { rows } = await db.query("SELECT * FROM comments WHERE document_id = $1 ORDER BY id DESC", [req.params.id]);
    res.json(rows);
});
router.post('/:id/comments', async (req, res) => {
    await db.query("INSERT INTO comments (document_id, author, content) VALUES ($1, $2, $3)", [req.params.id, req.body.author, req.body.content]);
    res.status(200).json({ message: "Commentaire ajouté !" });
});

// --- REQUÊTES ---
router.get('/requests', async (req, res) => {
    const { rows } = await db.query("SELECT * FROM requests ORDER BY id DESC");
    res.json(rows);
});
router.post('/requests', async (req, res) => {
    await db.query("INSERT INTO requests (author, content) VALUES ($1, $2)", [req.body.author, req.body.content]);
    res.status(200).json({ message: "Requête sauvegardée !" });
});
router.delete('/requests/:id', async (req, res) => {
    await db.query("DELETE FROM requests WHERE id = $1", [req.params.id]);
    res.status(200).json({ message: "Requête supprimée !" });
});

module.exports = router;