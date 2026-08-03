router.post('/', upload.single('file'), async (req, res) => {
    try {
        // 1. On vérifie d'abord si le fichier a bien été reçu par le serveur
        if (!req.file) {
            console.error("❌ ERREUR : Aucun fichier reçu ou identifiants Cloudinary manquants.");
            return res.status(400).json({ error: "Le fichier n'a pas pu être traité." });
        }

        const { title, category, module, filiere, semestre, option_pcp } = req.body;
        const cheminFichier = req.file.path; 
        const optionFinal = option_pcp || '';

        // 2. On tente de sauvegarder dans la base de données
        await db.query(
            "INSERT INTO documents (title, category, module, filiere, semestre, option_pcp, file_path, downloads) VALUES ($1, $2, $3, $4, $5, $6, $7, 0)",
            [title, category, module, filiere, semestre, optionFinal, cheminFichier]
        );
        
        res.status(200).json({ message: "Document sauvegardé !" });

    } catch (erreur) {
        // 3. LA LIGNE MAGIQUE : Le serveur va enfin crier l'erreur dans Render !
        console.error("❌ CRASH LORS DE L'ENVOI :", erreur);
        res.status(500).json({ error: "Erreur système : " + erreur.message });
    }
});