console.log("🟢 ÉTAPE 1 : Le fichier JavaScript est bien connecté à la page HTML !");

// ==========================================
// DICTIONNAIRE DES MODULES
// ==========================================
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
        return;
    }
    
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

// ==========================================
// MISE A JOUR INTELLIGENTE DU MENU MODULES
// ==========================================
function updateModulesFilter() {
    const filiere = document.getElementById('filtreFiliere').value;
    const semestre = document.getElementById('filtreSemestre').value;
    const moduleSelect = document.getElementById('filtreModule'); // Le nouveau menu HTML qu'on a ajouté
    
    if (!moduleSelect) return; // Sécurité si le menu n'est pas encore dans le HTML

    // On vide l'ancien menu
    moduleSelect.innerHTML = '<option value="">Tous les modules</option>';
    
    // Si la filière et le semestre sont bien choisis, on remplit les modules
    if (filiere && semestre && dataModules[filiere] && dataModules[filiere][semestre]) {
        const modules = dataModules[filiere][semestre];
        modules.forEach(mod => {
            const option = document.createElement('option');
            option.value = mod;
            option.textContent = mod;
            moduleSelect.appendChild(option);
        });
    }

    // Après avoir mis à jour la liste des modules, on relance le filtrage général
    filtrerDocuments();
}

// ==========================================
// FILTRAGE DES DOCUMENTS
// ==========================================
// ==========================================
// FILTRAGE DES DOCUMENTS (VERSION FLEXIBLE)
// ==========================================
function filtrerDocuments() {
    const texteRecherche = document.getElementById('barreRecherche') ? document.getElementById('barreRecherche').value.toLowerCase().trim() : "";
    const choixFiliere = document.getElementById('filtreFiliere') ? document.getElementById('filtreFiliere').value.trim() : "";
    const choixSemestre = document.getElementById('filtreSemestre') ? document.getElementById('filtreSemestre').value.trim() : "";
    const choixCategorie = document.getElementById('filtreCategorie') ? document.getElementById('filtreCategorie').value.trim() : "";
    
    const moduleSelect = document.getElementById('filtreModule');
    const choixModule = moduleSelect ? moduleSelect.value.toLowerCase().trim() : "";

    const documentsFiltres = tousLesDocuments.filter(doc => {
        const titre = doc.title ? doc.title.toLowerCase().trim() : "";
        const moduleDoc = doc.module ? doc.module.toLowerCase().trim() : "";
        const filiereDoc = doc.filiere ? doc.filiere.trim() : "";
        const semestreDoc = doc.semestre ? doc.semestre.trim() : "";
        const categorieDoc = doc.category ? doc.category.trim() : "";

        // Vérifications assouplies
        const matchTexte = texteRecherche === "" || titre.includes(texteRecherche) || moduleDoc.includes(texteRecherche);
        const matchFiliere = choixFiliere === "" || filiereDoc === choixFiliere;
        const matchSemestre = choixSemestre === "" || semestreDoc === choixSemestre;
        const matchCategorie = choixCategorie === "" || categorieDoc === choixCategorie;
        
        // Match tolérant pour le module (prend en compte minuscules/majuscules et espaces)
        const matchModule = choixModule === "" || moduleDoc === choixModule || moduleDoc.includes(choixModule) || choixModule.includes(moduleDoc);

        return matchTexte && matchFiliere && matchSemestre && matchCategorie && matchModule;
    });

    console.log("🔍 Résultat du filtre :", documentsFiltres.length, "document(s) trouvé(s).");
    afficherDocuments(documentsFiltres);
}

// ==========================================
// ECOUTEURS D'EVENEMENTS
// ==========================================
if(document.getElementById('barreRecherche')) document.getElementById('barreRecherche').addEventListener('input', filtrerDocuments);
if(document.getElementById('filtreCategorie')) document.getElementById('filtreCategorie').addEventListener('change', filtrerDocuments);

// Quand on change la Filière ou le Semestre, ça met à jour les modules PUIS ça filtre !
if(document.getElementById('filtreFiliere')) document.getElementById('filtreFiliere').addEventListener('change', updateModulesFilter);
if(document.getElementById('filtreSemestre')) document.getElementById('filtreSemestre').addEventListener('change', updateModulesFilter);

// Et quand on choisit enfin un Module précis, ça filtre le résultat.
if(document.getElementById('filtreModule')) document.getElementById('filtreModule').addEventListener('change', filtrerDocuments);

// Démarrage
chargerDocuments();