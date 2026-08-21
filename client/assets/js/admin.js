// ==========================================
// 1. SÉCURITÉ ET MOT DE PASSE
// ==========================================
const adminPassword = sessionStorage.getItem('adminPassword') || prompt("🔒 Veuillez entrer le mot de passe administrateur pour accéder à cette page :");

if (adminPassword) {
    sessionStorage.setItem('adminPassword', adminPassword);
} else {
    alert("⚠️ Vous naviguez en mode visiteur. Vous ne pourrez pas modifier la base de données.");
}

// ==========================================
// 2. DICTIONNAIRE DES FILIÈRES ET MODULES
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
    },
    "Master": { "Aucun": ["Analyse", "Algèbre", "Électricité", "Électronique", "Mécanique", "Thermodynamique", "Optique", "Informatique Générale", "Sujet Complet"] },
    "Ingenieur": { "Aucun": ["Analyse", "Algèbre", "Électricité", "Électronique", "Mécanique", "Thermodynamique", "Optique", "Informatique Générale", "Sujet Complet"] },
    "CRMEF": { "Aucun": ["Analyse", "Algèbre", "Électricité", "Électronique", "Mécanique", "Thermodynamique", "Optique", "Informatique Générale", "Sujet Complet"] },
    "Livre Math": { "Aucun": ["Analyse", "Algèbre", "Probabilités", "Topologie", "Recherche Opérationnelle", "Ouvrage Général"] },
    "Livre Physique": { "Aucun": ["Mécanique", "Thermodynamique", "Électromagnétisme", "Optique", "Physique Quantique", "Ouvrage Général"] },
    "Livre Info": { "Aucun": ["Algorithmique", "Programmation (C, Python, Java...)", "Bases de données", "Réseaux", "Intelligence Artificielle", "Ouvrage Général"] }
};

// ==========================================
// 3. GESTION DU FORMULAIRE DES COURS CLASSIQUES
// ==========================================
function updateModules() {
    const filiere = document.getElementById('filiereAdmin')?.value;
    const semestre = document.getElementById('semestreAdmin')?.value;
    const moduleSelect = document.getElementById('module');
    
    if (!moduleSelect) return;
    moduleSelect.innerHTML = '<option value="">-- Sélectionnez un module --</option>';
    
    if (filiere && semestre && dataModules[filiere] && dataModules[filiere][semestre]) {
        dataModules[filiere][semestre].forEach(mod => {
            const option = document.createElement('option');
            option.value = mod;
            option.textContent = mod;
            moduleSelect.appendChild(option);
        });
    }
}

// SÉCURITÉ : On vérifie que les éléments existent avant d'ajouter des écouteurs
const menuFiliere = document.getElementById('filiereAdmin');
if (menuFiliere) menuFiliere.addEventListener('change', updateModules);

const menuSemestre = document.getElementById('semestreAdmin');
if (menuSemestre) menuSemestre.addEventListener('change', updateModules);

const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const statusDiv = document.getElementById('uploadStatus');
        const submitBtn = document.querySelector('button[type="submit"]');
        
        if (statusDiv) statusDiv.innerHTML = '<p style="color: blue; margin-top: 15px;">⏳ Envoi en cours vers le serveur...</p>';
        if (submitBtn) submitBtn.disabled = true;

        const formData = new FormData();
        formData.append('title', document.getElementById('title').value);
        formData.append('module', document.getElementById('module').value);
        formData.append('filiere', document.getElementById('filiereAdmin').value);
        formData.append('semestre', document.getElementById('semestreAdmin').value);
        
        const categoryField = document.getElementById('category');
        formData.append('category', categoryField ? categoryField.value : 'Cours');
        formData.append('file', document.getElementById('file').files[0]);

        try {
            const response = await fetch('/api/documents', {
                method: 'POST',
                headers: { 'x-admin-password': adminPassword },
                body: formData
            });

            if (response.ok) {
                if (statusDiv) statusDiv.innerHTML = '<p style="color: green; margin-top: 15px;">✅ Document mis en ligne avec succès !</p>';
                uploadForm.reset(); 
            } else {
                const errorData = await response.json();
                if (statusDiv) statusDiv.innerHTML = `<p style="color: red; margin-top: 15px;">❌ Erreur du serveur : ${errorData.error}</p>`;
            }
        } catch (error) {
            if (statusDiv) statusDiv.innerHTML = '<p style="color: red; margin-top: 15px;">❌ Erreur de connexion avec le serveur.</p>';
        } finally {
            if (submitBtn) submitBtn.disabled = false; 
        }
    });
}

// ==========================================
// 4. GESTION DES ANNONCES
// ==========================================
const formAnnonce = document.getElementById('form-annonce');
if (formAnnonce) {
    formAnnonce.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const titre = document.getElementById('titre-annonce').value;
        const contenu = document.getElementById('contenu-annonce').value;
        const couleur = document.getElementById('couleur-annonce').value;
        const fichierImage = document.getElementById('imageAnnonce').files[0];

        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('contenu', contenu);
        formData.append('couleur', couleur);
        if (fichierImage) formData.append('image', fichierImage);

        try {
            const response = await fetch('/api/annonces', {
                method: 'POST',
                body: formData 
            });

            if (response.ok) {
                alert("📢 Annonce publiée avec succès !");
                formAnnonce.reset(); 
            } else {
                alert("❌ Erreur lors de la publication de l'annonce.");
            }
        } catch (erreur) {
            alert("❌ Impossible de se connecter au serveur.");
        }
    });
}

// ==========================================
// 5. GESTION DES DOCUMENTS DE CONCOURS
// ==========================================
const formDocument = document.getElementById('form-document');
if (formDocument) {
    formDocument.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const titre = document.getElementById('titreDocument').value;
        const categorie = document.getElementById('categorieDocument').value;
        const annee = document.getElementById('anneeDocument').value;
        const fichierPdf = document.getElementById('fichierPdf').files[0];

        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('categorie', categorie);
        formData.append('annee', annee);
        formData.append('fichierPdf', fichierPdf); 

        try {
            const response = await fetch('/api/documents', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert("✅ Document publié avec succès !");
                formDocument.reset(); 
            } else {
                alert("❌ Erreur lors de la publication du document.");
            }
        } catch (erreur) {
            alert("❌ Impossible de se connecter au serveur.");
        }
    });
}