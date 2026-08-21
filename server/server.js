const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

console.log("Démarrage en cours, veuillez patienter...");

// 1. Initialisation de l'application
const app = express();

// 2. Middlewares de base
app.use(cors()); 
app.use(express.json()); 

// 3. Radar pour voir quels fichiers le navigateur cherche
app.use((req, res, next) => {
    console.log("🔍 Le navigateur demande : " + req.url);
    next();
});

// 4. Dossiers statiques (CORRIGÉ : pointe bien vers client/uploads)
app.use(express.static(path.join(__dirname, '../client')));
app.use('/uploads', express.static(path.join(__dirname, '../client/uploads')));

// 5. Importation de la base de données
const db = require('./config/db'); 

// 🌟 CONFIGURATION DE MULTER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'client/uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

// ==========================================
// ROUTES API : DOCUMENTS DE CONCOURS
// ==========================================
const docRoutes = require('./routes/docRoutes');
app.use('/api/documents', docRoutes);

// ==========================================
// ROUTES API : ANNONCES
// ==========================================

// A. Ajouter une nouvelle annonce
app.post('/api/annonces', upload.single('image'), async (req, res) => {
    try {
        const { titre, contenu, couleur } = req.body;
        const imageUrl = req.file ? '/uploads/' + req.file.filename : null;

        const query = 'INSERT INTO annonces (titre, contenu, couleur, image_url) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [titre, contenu, couleur || '#17a2b8', imageUrl];
        
        const result = await db.query(query, values);
        res.status(201).json({ message: "Annonce publiée avec succès", annonce: result.rows[0] });
    } catch (erreur) {
        console.error("Erreur création annonce :", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// B. Supprimer une annonce
app.delete('/api/annonces/:id', async (req, res) => {
    try {
        const idAnnonce = req.params.id;
        const query = 'DELETE FROM annonces WHERE id = $1';
        await db.query(query, [idAnnonce]);
        res.status(200).json({ message: "Annonce supprimée avec succès" });
    } catch (erreur) {
        console.error("Erreur lors de la suppression :", erreur);
        res.status(500).json({ message: "Erreur serveur lors de la suppression" });
    }
});

// C. Récupérer toutes les annonces
app.get('/api/annonces', async (req, res) => {
    try {
        const query = 'SELECT * FROM annonces ORDER BY date_added DESC';
        const result = await db.query(query);
        
        const annoncesFiltrees = result.rows.map(row => ({
            id: row.id,
            titre: row.titre,
            contenu: row.contenu,
            couleur: row.couleur,
            date: row.date_added,
            image_url: row.image_url // 🌟 AJOUTÉ : Pour que l'image s'affiche enfin !
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
// 🛠️ ROUTE TEMPORAIRE POUR RÉPARER LA TABLE DES DOCUMENTS

app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 Serveur UMPDocs démarré sur le port ${PORT}`);
    console.log(`=========================================`);
});