const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 👈 NOUVEAU : Le module pour créer des dossiers !
const docController = require('../controllers/docController');

// 🌟 SÉCURITÉ : Le chemin GPS exact du dossier
const uploadDir = path.join(__dirname, '../../client/uploads');

// 🌟 NOUVEAU : Si le dossier n'existe pas ou qu'il est mal placé, le serveur le crée tout seul !
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("📁 Dossier 'uploads' créé automatiquement !");
}

// 🌟 CONFIGURATION DE MULTER POUR LES DOCUMENTS (PDF)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // On utilise l'adresse absolue
    },
    filename: function (req, file, cb) {
        cb(null, 'doc-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 🌟 LA ROUTE GET : Pour envoyer la liste des documents au site web
router.get('/', docController.getDocuments);

// 🌟 LA ROUTE POST : Quand on reçoit un PDF, on le sauvegarde
router.post('/', upload.single('fichierPdf'), docController.ajouterDocument);

module.exports = router;