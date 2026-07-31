// server/middlewares/uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Définir le chemin absolu vers le dossier d'upload
const uploadDir = path.join(__dirname, '../uploads/documents');

// S'assurer que le dossier d'upload existe au démarrage, sinon le créer
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Dossier de destination
    },
    filename: (req, file, cb) => {
        // Nettoyer le nom du fichier original (remplacer les espaces par des tirets)
        const originalName = file.originalname.replace(/\s+/g, '-');
        // Générer un nom unique : DateActuelle_NomFichierOriginal.pdf
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '_' + originalName);
    }
});

// Filtre pour n'accepter que les fichiers PDF
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Format de fichier non supporté. Seuls les PDF sont autorisés.'), false);
    }
};

// Configuration finale de Multer
const uploadPDF = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024 // Limite à 20 MB par fichier
    }
});

module.exports = { uploadPDF };