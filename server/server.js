const express = require('express');
const path = require('path');
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
// ==========================================
// ROUTES API : ANNONCES
// ==========================================

// 1. Ajouter une nouvelle annonce (POST)
app.post('/api/annonces', async (req, res) => {
    try {
        const { titre, contenu, couleur } = req.body;
        const nouvelleAnnonce = new Annonce({ titre, contenu, couleur });
        await nouvelleAnnonce.save();
        res.status(201).json({ message: "Annonce publiée avec succès", annonce: nouvelleAnnonce });
    } catch (erreur) {
        console.error("Erreur création annonce :", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// 2. Récupérer toutes les annonces (GET)
app.get('/api/annonces', async (req, res) => {
    try {
        // Le .sort({ date: -1 }) permet d'afficher les plus récentes en premier !
        const annonces = await Annonce.find().sort({ date: -1 });
        res.status(200).json(annonces);
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
// ==========================================
// MODÈLE : ANNONCE
// ==========================================
const annonceSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    couleur: { type: String, default: '#17a2b8' },
    date: { type: Date, default: Date.now }
});

const Annonce = mongoose.model('Annonce', annonceSchema);