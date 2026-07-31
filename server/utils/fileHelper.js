// server/utils/fileHelper.js
const fs = require('fs');
const path = require('path');

/**
 * Supprime un fichier physique du disque.
 * @param {string} relativeFilePath - Chemin stocké en BDD (ex: /uploads/documents/fichier.pdf)
 */
const deletePhysicalFile = (relativeFilePath) => {
    if (!relativeFilePath) return;

    // Construction du chemin absolu (en remontant d'un dossier depuis 'utils')
    const absolutePath = path.join(__dirname, '..', relativeFilePath);

    fs.unlink(absolutePath, (err) => {
        if (err) {
            // On loggue l'erreur mais on ne bloque pas l'application
            // (le fichier a pu être supprimé manuellement entre-temps)
            console.error(`Impossible de supprimer le fichier ${absolutePath}:`, err.message);
        } else {
            console.log(`Fichier supprimé avec succès : ${absolutePath}`);
        }
    });
};

module.exports = { deletePhysicalFile };