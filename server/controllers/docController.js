// server/controllers/docController.js
const db = require('../config/db');

const docController = {
    /**
     * Endpoint: GET /api/documents
     * Récupère la liste des documents. Peut inclure des filtres (category, module, search).
     * Accès : Public (pas besoin d'être connecté)
     */
    getAllDocuments: (req, res) => {
        // Extraction des paramètres de requête (Query params)
        const { category, module, search } = req.query;
        
        let query = `
            SELECT d.id, d.title, d.description, d.category, d.module, 
                   d.file_path, d.file_size, d.created_at, 
                   u.first_name, u.last_name 
            FROM documents d
            LEFT JOIN users u ON d.uploaded_by = u.id
            WHERE 1=1
        `;
        const params = [];

        // Ajout dynamique des filtres
        if (category) {
            query += ` AND d.category = ?`;
            params.push(category);
        }
        if (module) {
            query += ` AND d.module = ?`;
            params.push(module);
        }
        if (search) {
            query += ` AND (d.title LIKE ? OR d.description LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`);
        }

        query += ` ORDER BY d.created_at DESC`;

        db.all(query, params, (err, rows) => {
            if (err) {
                console.error('Erreur lors de la récupération des documents:', err.message);
                return res.status(500).json({ error: 'Erreur serveur.' });
            }
            res.status(200).json(rows);
        });
    },

    /**
     * Endpoint: POST /api/documents
     * Ajoute un nouveau document PDF.
     * Accès : Protégé (Admin uniquement)
     */
    addDocument: (req, res) => {
        // req.file est injecté par Multer
        if (!req.file) {
            return res.status(400).json({ error: 'Aucun fichier PDF fourni.' });
        }

        // req.body contient les champs texte envoyés avec le formulaire
        const { title, description, category, module } = req.body;

        // Validation basique
        if (!title || !category) {
            return res.status(400).json({ error: 'Le titre et la catégorie sont obligatoires.' });
        }

        // Construction des données du fichier
        // On stocke le chemin relatif pour le frontend (ex: /uploads/documents/nomfichier.pdf)
        const filePath = `/uploads/documents/${req.file.filename}`;
        const fileSize = req.file.size;
        
        // req.user.id est injecté par le middleware authMiddleware (verifyToken)
        const uploadedBy = req.user.id; 

        const insertQuery = `
            INSERT INTO documents (title, description, category, module, file_path, file_size, uploaded_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.run(insertQuery, [title, description, category, module, filePath, fileSize, uploadedBy], function(err) {
            if (err) {
                console.error('Erreur lors de l\'insertion du document:', err.message);
                return res.status(500).json({ error: 'Erreur lors de l\'enregistrement en base de données.' });
            }

            res.status(201).json({
                message: 'Document ajouté avec succès.',
                document: {
                    id: this.lastID,
                    title,
                    category,
                    module,
                    file_path: filePath
                }
            });
        });
    }
};

module.exports = docController;