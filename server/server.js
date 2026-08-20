const multer = require('multer');
const path = require('path');

// 🌟 CONFIGURATION DE MULTER (Pour dire où et comment ranger les images)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'client/uploads/'); // Le dossier qu'on vient de créer
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // On donne un nom unique
    }
});
const upload = multer({ storage: storage });
const express = require('express');
const cors = require('cors');

console.log("Démarrage en cours, veuillez patienter...");

// 1. Initialisation de l'application (doit toujours être en haut !)
const app = express();

// 2. Middlewares de base
app.use(cors()); 
app.use(express.json()); 

// 3. Radar pour voir quels fichiers le navigateur cherche
app.use((req, res, next) => {
    console.log("🔍 Le navigateur demande : " + req.url);
    next();
});

// 4. Dossiers statiques (pour l'image, le CSS, le JS)
app.use(express.static(path.join(__dirname, '../client')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5. Importation de la base de données Supabase
const db = require('./config/db'); 

// ==========================================
// ROUTES API : DOCUMENTS
// ==========================================
app.use('/api/documents', require('./routes/docRoutes'));


// ==========================================
// ROUTES API : ANNONCES (PostgreSQL)
// ==========================================

// A. Ajouter une nouvelle annonce (POST)
// A. Ajouter une nouvelle annonce (POST) avec prise en charge de l'image
app.post('/api/annonces', upload.single('image'), async (req, res) => {
    try {
        const { titre, contenu, couleur } = req.body;
        
        // 🌟 NOUVEAU : Si une image est là, on fabrique son lien, sinon c'est null
        const imageUrl = req.file ? '/uploads/' + req.file.filename : null;

        // 🌟 NOUVEAU : On ajoute image_url dans la base de données
        const query = 'INSERT INTO annonces (titre, contenu, couleur, image_url) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [titre, contenu, couleur || '#17a2b8', imageUrl];
        
        const result = await db.query(query, values);
        
        res.status(201).json({ message: "Annonce publiée avec succès", annonce: result.rows[0] });
    } catch (erreur) {
        console.error("Erreur création annonce :", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// B. Récupérer toutes les annonces (GET) - C'est celle-ci qui te manquait !
app.get('/api/annonces', async (req, res) => {
    try {
        const query = 'SELECT * FROM annonces ORDER BY date_added DESC';
        const result = await db.query(query);
        
        const annoncesFiltrees = result.rows.map(row => ({
            id: row.id,
            titre: row.titre,
            contenu: row.contenu,
            couleur: row.couleur,
            date: row.date_added
        }));
        
        res.status(200).json(annoncesFiltrees);
    } catch (erreur) {
        console.error("Erreur récupération annonces :", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// ==========================================
// DÉMARRAGE DU SERVEUR
// ==========================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 Serveur UMPDocs démarré sur le port ${PORT}`);
    console.log(`=========================================`);
});
// 🛠️ ROUTE TEMPORAIRE POUR METTRE À JOUR LA BASE DE DONNÉES
app.get('/api/maj-bdd', async (req, res) => {
    try {
        await db.query('ALTER TABLE annonces ADD COLUMN image_url VARCHAR(255);');
        res.send('✅ Base de données mise à jour avec succès ! (Tu peux maintenant supprimer cette route du code)');
    } catch (erreur) {
        res.send('❌ Erreur (ou la colonne existe déjà) : ' + erreur.message);
    }
});