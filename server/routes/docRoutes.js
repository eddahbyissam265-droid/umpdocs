const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const docController = require('../controllers/docController');

// 🌟 CONFIGURATION DE MULTER POUR LES DOCUMENTS (PDF)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // On va dans le dossier client/uploads
        cb(null, 'client/uploads/'); 
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