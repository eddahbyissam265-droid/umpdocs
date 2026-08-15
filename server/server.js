const express = require('express');
const path = require('path');
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
app.post('/api/annonces', async (req, res) => {
    try {
        const { titre, contenu, couleur } = req.body;
        const query = 'INSERT INTO annonces (titre, contenu, couleur) VALUES ($1, $2, $3) RETURNING *';
        const values = [titre, contenu, couleur || '#17a2b8'];
        
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