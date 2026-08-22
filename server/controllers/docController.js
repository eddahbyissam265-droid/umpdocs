const db = require('../config/db');

// 1. Fonction pour AJOUTER un document (Cours OU Concours)
const ajouterDocument = async (req, res) => {
    try {
        // On accepte le français (Concours) OU l'anglais (Cours)
        const titre = req.body.titre || req.body.title;
        const categorie = req.body.categorie || req.body.category || 'Cours';
        
        // Champs spécifiques
        const annee = req.body.annee || null;
        const filiere = req.body.filiere || null;
        const semestre = req.body.semestre || null;
        const module_doc = req.body.module || null;

        const fichierUrl = req.file ? '/uploads/' + req.file.filename : null;

        if (!fichierUrl) return res.status(400).json({ message: "Fichier requis." });

        const query = `
            INSERT INTO documents (titre, categorie, annee, filiere, semestre, module, fichier_url) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        `;
        const result = await db.query(query, [titre, categorie, annee, filiere, semestre, module_doc, fichierUrl]);
        
        res.status(201).json({ message: "Document ajouté avec succès", document: result.rows[0] });
    } catch (erreur) {
        console.error("Erreur ajout document :", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// 2. Fonction pour RÉCUPÉRER les documents (avec traduction pour l'accueil)
const getDocuments = async (req, res) => {
    try {
        // On récupère tout, et on crée des "alias" (as) pour que main.js trouve ses mots en anglais !
        const query = `
            SELECT 
                *, 
                titre as title, 
                categorie as category 
            FROM documents 
            ORDER BY date_creation DESC
        `;
        const result = await db.query(query);
        
        res.status(200).json(result.rows);
    } catch (erreur) {
        console.error("Erreur lecture documents :", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = {
    ajouterDocument,
    getDocuments
};