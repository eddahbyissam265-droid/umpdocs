// Demande le mot de passe à l'ouverture de la page et le mémorise
const adminPassword = sessionStorage.getItem('adminPassword') || prompt("🔒 Veuillez entrer le mot de passe administrateur pour accéder à cette page :");

if (adminPassword) {
    sessionStorage.setItem('adminPassword', adminPassword);
} else {
    alert("⚠️ Vous naviguez en mode visiteur. Vous ne pourrez pas modifier la base de données.");
}
// Dictionnaire complet des filières, semestres et modules
const dataModules = {
    "MIP Math": {
        "S1": ["Analyse 1", "Algèbre 1", "Algèbre 2", "Mécanique du point", "Thermodynamique", "Algorithmique et programmation Python 1", "Méthodologie du Travail Universitaire"],
        "S2": ["Algorithmique et programmation Python 2", "Analyse 2", "Analyse 3", "Algèbre 3", "Optique géométrique", "Electrostatique et magnétostatique", "Digital Skills"],
        "S3": ["Mécanique du solide", "Analyse 4", "Analyse 5", "Algèbre 4", "Programmation C", "Probabilités et statistique", "Langue étrangère : Francais"],
        "S4": ["Analyse numérique", "Algèbre 5", "Algèbre 6", "Analyse 6", "Structure de données en C", "Electromagnétisme", "Langues étrangères"],
        "S5": ["Analyse fonctionnelle", "Théorie des groupes", "Equations aux dérivées partielles", "Recherche opérationnelle", "Topologie général", "Modélisation financière", "Langues étrangères"],
        "S6": ["Topologie différentielle", "Algèbre 7", "Maths actuarielles", "Optimisation combinatoire", "Projet de Modélisation", "Probabilités"]
    },
    "MIP Informatique": {
        "S1": ["Analyse 1", "Algèbre 1", "Algèbre 2", "Mécanique du point", "Thermodynamique", "Algorithmique et programmation Python 1", "Méthodologie du Travail Universitaire"],
        "S2": ["Algorithmique et programmation Python 2", "Analyse 2", "Analyse 3", "Algèbre 3", "Optique géométrique", "Electrostatique et magnétostatique", "Digital Skills"],
        "S3": ["Analyse numérique", "Architecture des ordinateurs", "Systéme d'exploitation 1", "Programmation web 1", "Programmation C", "Probabilités et statistique", "Langue étrangère : Francais"],
        "S4": ["Algèbre relationnel et language SQL", "Probabilité et statistique", "Programmation orienté objet C++", "Système d'exploitation 2", "Structure de données en C", "Analyse numérique", "Langues étrangères (Francais)"],
        "S5": ["Théorie des languages et compilation", "Python pour IA", "IHM en JAVA", "Programmation web avec PHP", "Réseaux", "Innovation", "Anglais"],
        "S6": ["Outils et Frameworks de Developpement", "Bases de données avancées", "Administration système sous Linux", "Programmation système", "Sécurité Informatique", "Innovation", "Anglais"]
    },
    "TC Informatiques Appliquées": {
        "S1": ["Analyse 1", "Algèbre 1", "Electronique numérique", "Architecture et fonctionnement des ordinateurs", "Programmation Python", "Algorithmique et programmation 1", "Méthodologie du Travail Universitaire"],
        "S2": ["programmation Python 2", "Analyse 2", "Algèbre 2", "Traitement de signal", "Programmation web 1", "Algorithmique et programmation C 2", "Digital Skills"],
        "S3": ["Modélisation Objet UML", "Recherche opérationnel et optimisation", "Systéme d'exploitation 1", "Programmation web 2", "Structure de données en C", "Probabilités et statistique", "Langue étrangère : Francais"],
        "S4": ["Bases de données", "Sécurité informatique", "Programmation orienté objet C++", "Système d'exploitation 2", "Réseaux", "Analyse numérique", "Langues étrangères (Francais)"],
        "S5": ["Théorie des languages et compilation", "Python pour l'intelligence artificielle", "IHM en JAVA", "Développement Mobile", "Cloud computing et IoT", "Innovation", "Anglais"],
        "S6": ["Outils et Frameworks de Developpement", "Bases de données avancées", "Administration système sous Linux", "Programmation système", "Gestion des projets informatiques", "Innovation", "Anglais"]
    },
    "Licence de Physique PC-P": {
        "S1": ["Mécanique du point matériel", "Thermodynamique 1", "Thermochimie", "Atomistique", "Analyse 1", "Algèbre 1", "Méthodologie du Travail Universitaire"],
        "S2": ["Optique géométrique", "Electrostatique et Magnétostatique 1", "Liaisons chimiques", "Chimie en solution", "Analyse 2", "Algèbre 2", "Digital Skills"],
        "S3": ["Électromagnétisme dans le vide", "Chimie organique", "Analyse numérique", "Thermodynamique 2", "Analyse 3", "Mécanique des solides", "Langues étrangères : Francais"],
        "S4": ["Language C", "Cristallographie & Cristallochimie", "Electronique analogique", "Electronique numérique", "Optique ondulatoire", "Mécanique quantique 1", "Développement personnel"],
        "S5": ["Physique statistique", "Mécanique quantique 2", "Physique nucléaire", "Mécanique analytique", "Electronique analogique avancée", "Innovation et gestion de projet", "Anglais"],
        "S6": ["Physique des matériaux", "Traitement de signal", "Automatique", "Systémes embarquées", "Electromagnétisme dans les milieux", "Mécanique des fluides", "Transfert thermique", "Elasticité et résistance des matériaux", "Transfert thermique et Mécanique des fluides", "Renewnable energy", "Efficacité énergetique", "Détection et mesure des rayonnements", "Initiation à l'imagerie médicale", "Radioprotection et Dosimétrie", "Culture entrepreunariale", "Anglais"]
    },
    "EGC": {
        "S1": ["Biologie Cellulaire et Histologie", "Geologie Generale", "Atomistique et Liaison Chimique", "Physique 1 Thermodynamique Mecanique", "Mathematiques", "Langues etrangeres", "Methodologie de Travail Universitaire"],
        "S2": ["Biologie des organismes Veg et ani", "Geodynamique interne et externe", "Chimie en solution et Initiation a la Chimie organique", "Physique 2 Optique Electricite", "Informatique (Algorithmique et Programmation en Python)", "Langues etrangeres", "Digital Skills"],
        "S3": ["Modules S3 à ajouter..."],
        "S4": ["Modules S4 à ajouter..."],
        "S5": ["Metre et pathologie du batiment", "Beton arme", "Trace Routier", "Hydrologie", "Hydraulique urbaine", "Geophysique", "Anglais", "Innovation"],
        "S6": ["Modules S6 à ajouter..."]
    },
    "Licence de Chimie PC-C": {
        "S1": ["Mécanique du point matériel", "Thermodynamique 1", "Thermochimie", "Atomistique", "Analyse 1", "Algèbre 1", "Méthodologie du Travail Universitaire"],
        "S2": ["Optique géométrique", "Electrostatique et Magnétostatique 1", "Liaisons chimiques", "Chimie en solution", "Analyse 2", "Algèbre 2", "Digital Skills"],
        "S3": ["Hydrocarbures et fonctions monovalentes", "Chimie descriptive I/Diagrammes de phases", "Mécanique quantique", "Chimie des électrolytes", "Mathématiques pour la chimie", "Culture et Art Skills", "Langues étrangères : Francais"],
        "S4": ["Chimie organique Fonctionnelle", "Cristallographie & Cristallochimie", "Techniques d'analyse", "Thermodynamique chimique", "Probabilités et statistiques", "Langues étrangères", "Soft Skills"],
        "S5": ["Chimie organique Fonctionnelle", "Chimie quantique et Modélisation", "Chimie du Solide et méthodes de caractérisation", "Cinétique chimique et Catalyse", "Electrochimie", "Innovation et gestion de projet", "Anglais"],
        "S6": ["Chimie des hétérocycles", "Produits Naturels", "Grandes réactions en chimie organique (Anglais)", "Chimie Macromoléculaire", "Techniques chromatographique Instrumentales", "Culture entrepreunariale", "Anglais"]
    }
};

// Fonction pour mettre à jour les modules
function updateModules() {
    const filiere = document.getElementById('filiereAdmin').value;
    const semestre = document.getElementById('semestreAdmin').value;
    const moduleSelect = document.getElementById('module');
    
    // On vide l'ancien menu
    moduleSelect.innerHTML = '<option value="">-- Sélectionnez un module --</option>';
    
    // Si la filière et le semestre sont bien choisis
    if (filiere && semestre && dataModules[filiere] && dataModules[filiere][semestre]) {
        const modules = dataModules[filiere][semestre];
        modules.forEach(mod => {
            const option = document.createElement('option');
            option.value = mod;
            option.textContent = mod;
            moduleSelect.appendChild(option);
        });
    }
}

// On écoute les changements sur les menus Filière et Semestre
document.getElementById('filiereAdmin').addEventListener('change', updateModules);
document.getElementById('semestreAdmin').addEventListener('change', updateModules);
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche la page de se recharger
    
    const statusDiv = document.getElementById('uploadStatus');
    const submitBtn = document.querySelector('button[type="submit"]');
    
    // On affiche un message d'attente et on bloque le bouton
    statusDiv.innerHTML = '<p style="color: blue; margin-top: 15px;">⏳ Envoi en cours vers le serveur... Veuillez patienter, cela peut prendre quelques secondes.</p>';
    submitBtn.disabled = true;

    // On prépare TOUTES les données pour la base de données
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('module', document.getElementById('module').value);
    
    // 👇 ICI C'EST LA CORRECTION : On prend directement la valeur de tes nouveaux menus HTML
    formData.append('filiere', document.getElementById('filiereAdmin').value);
    formData.append('semestre', document.getElementById('semestreAdmin').value);
    
    // Si tu as ces champs dans ton formulaire HTML, on les prend, sinon valeur par défaut
    const categoryField = document.getElementById('category');
    formData.append('category', categoryField ? categoryField.value : 'Cours');
    
    formData.append('file', document.getElementById('file').files[0]);

    try {
        // On envoie tout à ton serveur Node.js
        const response = await fetch('/api/documents', {
            method: 'POST',
            headers: {
                'x-admin-password': adminPassword // 👈 On montre patte blanche au serveur
            },
            body: formData
        });

        if (response.ok) {
            statusDiv.innerHTML = '<p style="color: green; margin-top: 15px;">✅ Document mis en ligne avec succès !</p>';
            document.getElementById('uploadForm').reset(); // On vide le formulaire
        } else {
            const errorData = await response.json();
            statusDiv.innerHTML = `<p style="color: red; margin-top: 15px;">❌ Erreur du serveur : ${errorData.error || 'Échec de l\'envoi'}</p>`;
        }
    } catch (error) {
        console.error('Erreur:', error);
        statusDiv.innerHTML = '<p style="color: red; margin-top: 15px;">❌ Erreur de connexion avec le serveur.</p>';
    } finally {
        submitBtn.disabled = false; // On débloque le bouton
    }
});
// =========================================================
// SECTION : GESTION ET SUPPRESSION DES DOCUMENTS
// =========================================================

// 1. Fonction pour charger et afficher les documents dans l'Admin
async function chargerDocumentsAdmin() {
    const container = document.getElementById('admin-documents-list');
    
    // Si la zone d'affichage n'existe pas sur cette page, on arrête la fonction pour éviter une erreur
    if (!container) return; 

    try {
        const response = await fetch('/api/documents');
        const documents = await response.json();

        container.innerHTML = ''; // On vide le texte de chargement

        if (documents.length === 0) {
            container.innerHTML = '<p>Aucun document en ligne pour le moment.</p>';
            return;
        }

        // On crée une carte avec un bouton Supprimer pour chaque document
        documents.forEach(doc => {
            container.innerHTML += `
                <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; border-radius: 5px; background-color: #f9f9f9;">
                    <div>
                        <h4 style="margin: 0 0 5px 0;">${doc.title}</h4>
                        <small style="color: #555;">
    <span style="background: #007bff; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.85em; margin-right: 5px;">
        ${doc.category}
    </span>
    ${doc.filiere} - ${doc.semestre} | <strong>${doc.module}</strong>
</small>
                    </div>
                    <button onclick="supprimerDocument(${doc.id})" style="background-color: #dc3545; color: white; border: none; padding: 8px 15px; cursor: pointer; border-radius: 5px; font-weight: bold;">
                        Supprimer
                    </button>
                </div>
            `;
        });
    } catch (error) {
        console.error('Erreur:', error);
        container.innerHTML = '<p style="color: red;">❌ Erreur lors du chargement des documents.</p>';
    }
}

// 2. Fonction qui s'active quand on clique sur "Supprimer"
async function supprimerDocument(idDocument) {
    // On demande une petite confirmation pour éviter les erreurs de clic
    if (!confirm("Es-tu sûr de vouloir supprimer ce document définitivement ?")) {
        return; 
    }

    try {
        // On envoie l'ordre de suppression au serveur
        const response = await fetch(`/api/documents/${idDocument}`, {
            method: 'DELETE',
            headers: {
                'x-admin-password': adminPassword // 👈 On montre patte blanche au serveur
            }
        });

        if (response.ok) {
            alert("✅ Document supprimé avec succès !");
            chargerDocumentsAdmin(); // On rafraîchit la liste automatiquement
        } else {
            const errorData = await response.json();
            alert(`❌ Erreur : ${errorData.error || 'Impossible de supprimer'}`);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert("❌ Erreur de connexion avec le serveur.");
    }
}

// 3. On lance le chargement dès qu'on ouvre la page
chargerDocumentsAdmin();