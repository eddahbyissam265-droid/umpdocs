const { Pool } = require('pg');
require('dotenv').config();

// Connexion à Supabase via ton fichier .env
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Indispensable pour les bases de données Cloud
});

pool.connect((err, client, release) => {
    if (err) {
        console.error("❌ Erreur de connexion à Supabase :", err.stack);
    } else {
        console.log("🗄️ Connecté avec succès à PostgreSQL (Supabase) !");
        
        // Création automatique des tables (Syntaxe PostgreSQL)
        const createTables = `
        CREATE TABLE IF NOT EXISTS documents (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            module TEXT NOT NULL,
            filiere TEXT NOT NULL,
            semestre TEXT NOT NULL,
            option_pcp TEXT,
            file_path TEXT NOT NULL,
            downloads INTEGER DEFAULT 0,
            date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS comments (
            id SERIAL PRIMARY KEY,
            document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
            author TEXT NOT NULL,
            content TEXT NOT NULL,
            date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS requests (
            id SERIAL PRIMARY KEY,
            author TEXT NOT NULL,
            content TEXT NOT NULL,
            date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            pseudo TEXT NOT NULL,
            date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS annonces (
            id SERIAL PRIMARY KEY,
            titre TEXT NOT NULL,
            contenu TEXT NOT NULL,
            couleur TEXT DEFAULT '#17a2b8',
            date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;

        client.query(createTables, (err, result) => {
            release(); // On libère la connexion
            if (err) {
                console.error("Erreur lors de la création des tables :", err);
            } else {
                console.log("✅ Tables PostgreSQL prêtes et configurées !");
            }
        });
    }
});

// On exporte une fonction pour faire des requêtes facilement
module.exports = {
    query: (text, params) => pool.query(text, params)
};