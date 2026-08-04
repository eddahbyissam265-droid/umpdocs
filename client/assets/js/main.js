// ==========================================
// 1. VARIABLES GLOBALES
// ==========================================
let tousLesDocuments = []; // La "boîte" qui garde les documents en mémoire

// ==========================================
// 2. RÉCUPÉRATION DES DOCUMENTS (SERVEUR)
// ==========================================
async function chargerDocuments() {
    try {
        const response = await fetch('/api/documents');
        tousLesDocuments = await response.json();
        
        // On affiche tout par défaut au démarrage
        afficherDocuments(tousLesDocuments); 
    } catch (erreur) {
        console.error("Erreur de chargement :", erreur);
    }
}

// ==========================================
// 3. LE SYSTÈME DE FILTRES
// ==========================================
function filtrerDocuments() {
    console.log("Le tri se lance !");
    console.log("Texte tapé :", document.getElementById('barreRecherche').value);
    // On récupère les choix de l'utilisateur
    const texteRecherche = document.getElementById('barreRecherche').value.toLowerCase();
    const choixFiliere = document.getElementById('filtreFiliere').value;
    const choixSemestre = document.getElementById('filtreSemestre').value;
    const choixCategorie = document.getElementById('filtreCategorie').value;

    // On trie la liste complète
    const documentsFiltres = tousLesDocuments.filter(doc => {
        const titre = doc.title ? doc.title.toLowerCase() : "";
        const module = doc.module ? doc.module.toLowerCase() : "";

        const matchTexte = titre.includes(texteRecherche) || module.includes(texteRecherche);
        const matchFiliere = choixFiliere === "" || doc.filiere === choixFiliere;
        const matchSemestre = choixSemestre === "" || doc.semestre === choixSemestre;
        const matchCategorie = choixCategorie === "" || doc.category === choixCategorie;

        return matchTexte && matchFiliere && matchSemestre && matchCategorie;
    });

    // On affiche la nouvelle liste triée
    afficherDocuments(documentsFiltres);
}

// ==========================================
// 4. L'AFFICHAGE À L'ÉCRAN (L'ancienne Étape 3)
// ==========================================
function afficherDocuments(documents) {
    // ⚠️ REMPLACE 'documents-container' PAR LE VRAI ID DE TA BALISE HTML SI BESOIN
    const container = document.getElementById('documents-container'); 
    
    // 🚨 LA LIGNE MAGIQUE : On vide l'écran avant d'afficher !
    container.innerHTML = ''; 

    // S'il n'y a aucun document trouvé
    if (documents.length === 0) {
        container.innerHTML = '<p>Aucun document ne correspond à votre recherche.</p>';
        return;
    }

    // On crée le design pour chaque document trouvé
    documents.forEach(doc => {
        container.innerHTML += `
            <div class="document-card" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 5px;">
                <h3>${doc.title}</h3>
                <p><strong>Module :</strong> ${doc.module}</p>
                <p><strong>Filière :</strong> ${doc.filiere} | <strong>Semestre :</strong> ${doc.semestre} | <strong>Catégorie :</strong> ${doc.category}</p>
                
                <a href="${doc.file_path}" target="_blank" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                    Télécharger
                </a>
            </div>
        `;
    });
}

// ==========================================
// 5. DÉMARRAGE ET ÉCOUTEURS D'ÉVÉNEMENTS
// ==========================================
// On écoute les boutons
document.getElementById('barreRecherche').addEventListener('input', filtrerDocuments);
document.getElementById('filtreFiliere').addEventListener('change', filtrerDocuments);
document.getElementById('filtreSemestre').addEventListener('change', filtrerDocuments);
document.getElementById('filtreCategorie').addEventListener('change', filtrerDocuments);

// On lance le chargement initial au démarrage de la page
chargerDocuments();