const db = require('../config/db');

// 1. Fonction pour AJOUTER un document
const ajouterDocument = async (req, res) => {
    try {
        const { titre, categorie, annee } = req.body;
        const fichierUrl = req.file ? '/uploads/' + req.file.filename : null;

        if (!fichierUrl) return res.status(400).json({ message: "Fichier requis." });

        const query = 'INSERT INTO documents (titre, categorie, annee, fichier_url) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await db.query(query, [titre, categorie, annee, fichierUrl]);
        
        res.status(201).json({ message: "Document ajouté avec succès", document: result.rows[0] });
    } catch (erreur) {
        console.error("Erreur ajout document :", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// 2. 🌟 NOUVELLE FONCTION pour RÉCUPÉRER les documents
const getDocuments = async (req, res) => {
    try {
        // On récupère tous les documents, du plus récent au plus ancien
        const query = 'SELECT * FROM documents ORDER BY annee DESC, date_creation DESC';
        const result = await db.query(query);
        
        res.status(200).json(result.rows);
    } catch (erreur) {
        console.error("Erreur lecture documents :", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// On exporte les DEUX fonctions
module.exports = {
    ajouterDocument,
    getDocuments
};