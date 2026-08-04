console.log("🟢 ÉTAPE 1 : Le fichier JavaScript est bien connecté à la page HTML !");

let tousLesDocuments = [];

async function chargerDocuments() {
    console.log("🟢 ÉTAPE 2 : Je demande les documents au serveur...");
    try {
        const response = await fetch('/api/documents');
        tousLesDocuments = await response.json();
        
        console.log("🟢 ÉTAPE 3 : J'ai reçu la réponse du serveur. Voici les données :", tousLesDocuments);
        
        afficherDocuments(tousLesDocuments); 
    } catch (erreur) {
        console.error("🔴 ERREUR LORS DU CHARGEMENT :", erreur);
    }
}

function afficherDocuments(documents) {
    console.log("🟢 ÉTAPE 4 : Je prépare l'affichage de", documents.length, "documents.");
    
    const container = document.getElementById('documents-container'); 
    
    if (!container) {
        console.error("🔴 ERREUR FATALE : Je ne trouve pas la balise avec l'ID 'documents-container' dans le HTML !");
        return; // On arrête tout
    }

    console.log("🟢 ÉTAPE 5 : La boîte d'affichage est trouvée, je dessine les documents !");
    
    container.innerHTML = ''; 

    if (documents.length === 0) {
        container.innerHTML = '<p>Aucun document ne correspond à votre recherche.</p>';
        return;
    }

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

function filtrerDocuments() {
    const texteRecherche = document.getElementById('barreRecherche').value.toLowerCase();
    const choixFiliere = document.getElementById('filtreFiliere').value;
    const choixSemestre = document.getElementById('filtreSemestre').value;
    const choixCategorie = document.getElementById('filtreCategorie').value;

    const documentsFiltres = tousLesDocuments.filter(doc => {
        const titre = doc.title ? doc.title.toLowerCase() : "";
        const module = doc.module ? doc.module.toLowerCase() : "";

        const matchTexte = titre.includes(texteRecherche) || module.includes(texteRecherche);
        const matchFiliere = choixFiliere === "" || doc.filiere === choixFiliere;
        const matchSemestre = choixSemestre === "" || doc.semestre === choixSemestre;
        const matchCategorie = choixCategorie === "" || doc.category === choixCategorie;

        return matchTexte && matchFiliere && matchSemestre && matchCategorie;
    });

    afficherDocuments(documentsFiltres);
}

document.getElementById('barreRecherche').addEventListener('input', filtrerDocuments);
document.getElementById('filtreFiliere').addEventListener('change', filtrerDocuments);
document.getElementById('filtreSemestre').addEventListener('change', filtrerDocuments);
document.getElementById('filtreCategorie').addEventListener('change', filtrerDocuments);

chargerDocuments();