const express = require('express');
const path = require('path');
// Autoriser le serveur à lire le dossier "client"
app.use(express.static(path.join(__dirname, '../client')));
const cors = require('cors');

console.log("Démarrage en cours, veuillez patienter...");

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../client')));

// ==========================================
// LA VRAIE PORTE EST GRANDE OUVERTE !
// ==========================================
app.use('/api/documents', require('./routes/docRoutes'));

const PORT = 3000;

const db = require('./config/db'); // On importe ta connexion Supabase

// 1. Ajouter une nouvelle annonce (POST)


// 2. Récupérer toutes les annonces (GET)

// ==========================================
// ROUTES API : ANNONCES (PostgreSQL)
// ==========================================
const db = require('./config/db'); // Import de la connexion

// 1. Ajouter une nouvelle annonce (POST)
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

// 2. Récupérer toutes les annonces (GET)
app.get('/api/annonces', async (req, res) => {
    try {
        const query = 'SELECT * FROM annonces ORDER BY date_added DESC';
        const result = await db.query(query);
        
        // On adapte les données pour le frontend (qui cherche une propriété "date")
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

app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 Serveur UMPDocs démarré sur le port ${PORT}`);
    console.log(`=========================================`);
});
