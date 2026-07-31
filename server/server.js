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

app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 Serveur UMPDocs démarré sur le port ${PORT}`);
    console.log(`=========================================`);
});