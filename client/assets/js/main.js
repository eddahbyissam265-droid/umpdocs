let tousLesDocuments = [];
// AFFICHAGE DU BOUTON ADMIN (Si connecté)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const adminToken = localStorage.getItem('fsdocs_token'); 
    const btnAdmin = document.getElementById('btn-admin');

    // Si on a la clé secrète dans le navigateur, on affiche le bouton
    if (adminToken && btnAdmin) {
        btnAdmin.style.display = 'inline-block';
    }
});

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

async function chargerDocuments() {
    try {
        const response = await fetch('/api/documents');
        tousLesDocuments = await response.json();
        
        // Boîtes Concours
        const boxMaster = document.getElementById('liste-masters');
        const boxIngenieur = document.getElementById('liste-ingenieurs');
        const boxCrmef = document.getElementById('liste-crmef');
        
        // Boîtes Bibliothèque
        const boxLivreMath = document.getElementById('liste-livres-math');
        const boxLivrePhysique = document.getElementById('liste-livres-physique');
        const boxLivreInfo = document.getElementById('liste-livres-info');
        
        // On vide les textes par défaut
        if (boxMaster) boxMaster.innerHTML = '';
        if (boxIngenieur) boxIngenieur.innerHTML = '';
        if (boxCrmef) boxCrmef.innerHTML = '';
        if (boxLivreMath) boxLivreMath.innerHTML = '';
        if (boxLivrePhysique) boxLivrePhysique.innerHTML = '';
        if (boxLivreInfo) boxLivreInfo.innerHTML = '';

        const documentsOrdinaires = [];

        tousLesDocuments.forEach(doc => {
            
            // 1. SI C'EST UN CONCOURS
            if (doc.categorie === "Concours") {
                const lienConcours = `<a href="${doc.lien}" target="_blank" style="background-color: #f8f9fa; color: #333; text-align: left; padding: 10px; border-radius: 5px; text-decoration: none; font-weight: bold; border-left: 4px solid #6f42c1; display: block; margin-bottom: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-size: 0.9em;">📄 ${doc.module}</a>`;

                if (doc.filiere === "Master" && boxMaster) boxMaster.innerHTML += lienConcours;
                else if (doc.filiere === "Ingenieur" && boxIngenieur) boxIngenieur.innerHTML += lienConcours.replace('#6f42c1', '#fd7e14');
                else if (doc.filiere === "CRMEF" && boxCrmef) boxCrmef.innerHTML += lienConcours.replace('#6f42c1', '#20c997');
            } 
            
            // 2. SI C'EST UN LIVRE
            else if (doc.categorie === "Livre") {
                // Design spécifique pour les livres (plus compact)
                const lienLivre = `<a href="${doc.lien}" target="_blank" style="background-color: white; color: #333; text-align: left; padding: 8px; border-radius: 4px; text-decoration: none; font-weight: bold; border-left: 3px solid #007bff; display: block; margin-bottom: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); font-size: 0.85em;">📖 ${doc.module}</a>`;

                if (doc.filiere === "Livre Math" && boxLivreMath) boxLivreMath.innerHTML += lienLivre;
                else if (doc.filiere === "Livre Physique" && boxLivrePhysique) boxLivrePhysique.innerHTML += lienLivre.replace('#007bff', '#28a745');
                else if (doc.filiere === "Livre Info" && boxLivreInfo) boxLivreInfo.innerHTML += lienLivre.replace('#007bff', '#dc3545');
            }
            
            // 3. SI C'EST UN COURS/TD NORMAL
            else {
                documentsOrdinaires.push(doc);
            }
        });

        // On affiche les documents normaux
        afficherDocuments(documentsOrdinaires); 

        // ==========================================
        // 🌟 L'ASTUCE DU LIEN MAGIQUE
        // ==========================================
        const parametresUrl = new URLSearchParams(window.location.search);
        const motCle = parametresUrl.get('recherche'); // On cherche "?recherche=..." dans l'URL

        if (motCle) {
            const barre = document.getElementById('barreRecherche');
            if (barre) {
                barre.value = motCle; // On remplit la barre de recherche avec le mot
                filtrerDocuments();   // On lance le filtre automatiquement !
            }
        }
        // ==========================================
        
    } catch (erreur) {
        console.error("🔴 ERREUR LORS DU CHARGEMENT :", erreur);
    }
}
function afficherDocuments(documents) {
    console.log("🟢 ÉTAPE 4 : Je prépare l'affichage de", documents.length, "documents.");
    const container = document.getElementById('documents-container'); 
    
    if (!container) return;
    container.innerHTML = ''; 

    if (documents.length === 0) {
        container.innerHTML = '<p>Aucun document ne correspond à votre recherche.</p>';
        return;
    }

    documents.forEach(doc => {
        container.innerHTML += `
            <div class="document-card" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 5px; background: white;">
                <h3>${doc.title}</h3>
                <p><strong>Module :</strong> ${doc.module}</p>
                <p><strong>Filière :</strong> ${doc.filiere} | <strong>Semestre :</strong> ${doc.semestre} | <strong>Catégorie :</strong> ${doc.category}</p>
                
                <!-- 🌟 BOÎTE POUR LES BOUTONS (Télécharger + Copier) -->
                <div style="display: flex; gap: 15px; align-items: center; margin-top: 10px; margin-bottom: 15px;">
                    <a href="${doc.file_path}" target="_blank" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                        📥 Télécharger
                    </a>
                    
                    <!-- LE BOUTON MAGIQUE EST ICI (Version Icône) -->
                    <button onclick="copierLienMagique('${doc.title}')" title="Copier le lien" style="background: none; border: none; cursor: pointer; font-size: 1.4em; padding: 0;">
                        📋
                    </button>
                </div>
                
                <!-- NOUVEAU : SECTION COMMENTAIRES -->
                <div style="border-top: 1px solid #eee; padding-top: 10px;">
                    <button onclick="toggleCommentaires(${doc.id})" style="background: none; border: none; color: #6c757d; cursor: pointer; font-weight: bold; padding: 0;">
                        💬 Voir / Ajouter un commentaire
                    </button>
                    
                    <div id="zone-commentaires-${doc.id}" style="display: none; margin-top: 15px;">
                        <div id="liste-commentaires-${doc.id}" style="max-height: 150px; overflow-y: auto; background: #f8f9fa; padding: 10px; border-radius: 5px; margin-bottom: 10px; font-size: 0.9em;">
                            <!-- Les commentaires apparaîtront ici -->
                        </div>
                        
                        <div style="display: flex; gap: 5px;">
                            <input type="text" id="input-comment-${doc.id}" placeholder="Écrire un commentaire..." style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                            <button onclick="envoyerCommentaire(${doc.id})" style="background: #28a745; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">
                                Envoyer
                            </button>
                        </div>
                    </div>
                </div>
                
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
    // 1. On passe tous les choix en minuscules (.toLowerCase()) pour éviter les bugs de casse
    const texteRecherche = document.getElementById('barreRecherche') ? document.getElementById('barreRecherche').value.toLowerCase().trim() : "";
    const choixFiliere = document.getElementById('filtreFiliere') ? document.getElementById('filtreFiliere').value.toLowerCase().trim() : "";
    const choixSemestre = document.getElementById('filtreSemestre') ? document.getElementById('filtreSemestre').value.toLowerCase().trim() : "";
    const choixCategorie = document.getElementById('filtreCategorie') ? document.getElementById('filtreCategorie').value.toLowerCase().trim() : "";
    
    const moduleSelect = document.getElementById('filtreModule');
    const choixModule = moduleSelect ? moduleSelect.value.toLowerCase().trim() : "";
// --- RADAR DE DÉBOGAGE ---
    console.log("🎯 CHOIX DE L'UTILISATEUR :");
    console.log("Filière choisie : '" + choixFiliere + "'");
    console.log("Nombre total de documents avant filtre :", tousLesDocuments.length);
    if (tousLesDocuments.length > 0) {
        console.log("🔍 À QUOI RESSEMBLE UN DOCUMENT :", tousLesDocuments[0]);
    }
    // -------------------------
    // 2. On filtre tous les documents selon la recherche
    const documentsFiltres = tousLesDocuments.filter(doc => {
        const titre = doc.title ? doc.title.toLowerCase().trim() : "";
        const moduleDoc = doc.module ? doc.module.toLowerCase().trim() : "";
        
        // On met aussi les données du document en minuscules pour la comparaison
        const filiereDoc = doc.filiere ? doc.filiere.toLowerCase().trim() : "";
        const semestreDoc = doc.semestre ? doc.semestre.toLowerCase().trim() : "";
        const categorieDoc = (doc.category || doc.categorie || "").toLowerCase().trim();

        const matchTexte = texteRecherche === "" || titre.includes(texteRecherche) || moduleDoc.includes(texteRecherche);
        const matchFiliere = choixFiliere === "" || filiereDoc === choixFiliere;
        const matchSemestre = choixSemestre === "" || semestreDoc === choixSemestre;
        const matchCategorie = choixCategorie === "" || categorieDoc === choixCategorie;
        const matchModule = choixModule === "" || moduleDoc === choixModule || moduleDoc.includes(choixModule) || choixModule.includes(moduleDoc);

        return matchTexte && matchFiliere && matchSemestre && matchCategorie && matchModule;
    });

    console.log("🔍 Résultat du filtre :", documentsFiltres.length, "document(s) trouvé(s).");

    // 3. On prépare les boîtes pour les trier à l'écran
    const boxMaster = document.getElementById('liste-masters');
    const boxIngenieur = document.getElementById('liste-ingenieurs');
    const boxCrmef = document.getElementById('liste-crmef');
    const boxLivreMath = document.getElementById('liste-livres-math');
    const boxLivrePhysique = document.getElementById('liste-livres-physique');
    const boxLivreInfo = document.getElementById('liste-livres-info');

    // On vide toutes les boîtes avant d'afficher les résultats
    if (boxMaster) boxMaster.innerHTML = '';
    if (boxIngenieur) boxIngenieur.innerHTML = '';
    if (boxCrmef) boxCrmef.innerHTML = '';
    if (boxLivreMath) boxLivreMath.innerHTML = '';
    if (boxLivrePhysique) boxLivrePhysique.innerHTML = '';
    if (boxLivreInfo) boxLivreInfo.innerHTML = '';

    const documentsOrdinaires = [];

    // 4. On range les résultats de la recherche dans les bonnes cases
    // (Le doc.filiere d'origine garde ses majuscules, donc ça ne casse pas tes if en dessous !)
    documentsFiltres.forEach(doc => {
        const categorie = doc.categorie || doc.category; 

        if (categorie === "Concours") {
            const lienConcours = `<a href="${doc.lien}" target="_blank" style="background-color: #f8f9fa; color: #333; text-align: left; padding: 10px; border-radius: 5px; text-decoration: none; font-weight: bold; border-left: 4px solid #6f42c1; display: block; margin-bottom: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-size: 0.9em;">📄 ${doc.module}</a>`;
            if (doc.filiere === "Master" && boxMaster) boxMaster.innerHTML += lienConcours;
            else if (doc.filiere === "Ingenieur" && boxIngenieur) boxIngenieur.innerHTML += lienConcours.replace('#6f42c1', '#fd7e14');
            else if (doc.filiere === "CRMEF" && boxCrmef) boxCrmef.innerHTML += lienConcours.replace('#6f42c1', '#20c997');
        } 
        else if (categorie === "Livre") {
            const lienLivre = `<a href="${doc.lien}" target="_blank" style="background-color: white; color: #333; text-align: left; padding: 8px; border-radius: 4px; text-decoration: none; font-weight: bold; border-left: 3px solid #007bff; display: block; margin-bottom: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); font-size: 0.85em;">📖 ${doc.module}</a>`;
            if (doc.filiere === "Livre Math" && boxLivreMath) boxLivreMath.innerHTML += lienLivre;
            else if (doc.filiere === "Livre Physique" && boxLivrePhysique) boxLivrePhysique.innerHTML += lienLivre.replace('#007bff', '#28a745');
            else if (doc.filiere === "Livre Info" && boxLivreInfo) boxLivreInfo.innerHTML += lienLivre.replace('#007bff', '#dc3545');
        } 
        else {
            // Si c'est un cours/TD normal, on le met dans le panier principal
            documentsOrdinaires.push(doc);
        }
    });

    // 5. On affiche les documents normaux dans la grande liste principale
    afficherDocuments(documentsOrdinaires);
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
// ==========================================
// SYSTÈME DE CONNEXION GOOGLE
// ==========================================
async function handleGoogleLogin(response) {
    const jetonGoogle = response.credential;
    console.log("🟢 Jeton reçu de Google ! Envoi au serveur...");

    try {
        // Attention à l'URL : on suppose que tes routes sont montées sur /api/documents
        const res = await fetch('/api/documents/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ credential: jetonGoogle })
        });

        const data = await res.json();

        if (res.ok) {
            console.log("✅ Connexion réussie :", data);
            
            // On sauvegarde le nom de l'utilisateur dans le navigateur
            sessionStorage.setItem('userName', data.pseudo);
            
            // On met à jour l'affichage
            afficherUtilisateur(data.pseudo);
        } else {
            alert("❌ Erreur de connexion : " + data.erreur);
        }
    } catch (erreur) {
        console.error("🔴 Erreur système lors de la connexion :", erreur);
    }
}
// ==========================================
// SYSTÈME DE COMMENTAIRES
// ==========================================

// 1. Afficher/Masquer la zone de commentaires
async function toggleCommentaires(docId) {
    const zone = document.getElementById(`zone-commentaires-${docId}`);
    if (zone.style.display === "none") {
        zone.style.display = "block";
        await chargerCommentaires(docId); // On va chercher les commentaires dans la base
    } else {
        zone.style.display = "none";
    }
}

// 2. Récupérer les commentaires depuis PostgreSQL
async function chargerCommentaires(docId) {
    const listeDiv = document.getElementById(`liste-commentaires-${docId}`);
    listeDiv.innerHTML = "<p style='color: gray; margin: 0;'><em>Chargement...</em></p>";
    
    try {
        const response = await fetch(`/api/documents/${docId}/comments`);
        const commentaires = await response.json();
        
        if (commentaires.length === 0) {
            listeDiv.innerHTML = "<p style='color: gray; margin: 0;'><em>Aucun commentaire. Soyez le premier !</em></p>";
            return;
        }
        
        listeDiv.innerHTML = commentaires.map(c => 
            `<p style="margin: 0 0 8px 0; border-bottom: 1px solid #e9ecef; padding-bottom: 5px;">
                <strong>👤 ${c.author}</strong> : ${c.content}
            </p>`
        ).join('');
        
    } catch (erreur) {
        listeDiv.innerHTML = "<p style='color: red; margin: 0;'>❌ Erreur de chargement.</p>";
    }
}

// 3. Envoyer un nouveau commentaire
async function envoyerCommentaire(docId) {
    // On vérifie si l'étudiant est bien connecté avec Google
    const userName = sessionStorage.getItem('userName');
    if (!userName) {
        alert("⚠️ Vous devez être connecté avec Google pour pouvoir laisser un commentaire !");
        return;
    }
    
    const inputField = document.getElementById(`input-comment-${docId}`);
    const contenu = inputField.value.trim();
    
    if (contenu === "") return; // On n'envoie pas un commentaire vide
    
    try {
        const response = await fetch(`/api/documents/${docId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author: userName, content: contenu })
        });
        
        if (response.ok) {
            inputField.value = ""; // On vide la case
            await chargerCommentaires(docId); // On met à jour la liste instantanément
        } else {
            alert("❌ Erreur lors de l'envoi du commentaire.");
        }
    } catch (erreur) {
        console.error("Erreur d'envoi:", erreur);
    }
}
// Fonction pour modifier l'affichage quand on est connecté
function afficherUtilisateur(nom) {
    const zoneUser = document.getElementById('zoneUtilisateur');
    if (zoneUser) {
        zoneUser.innerHTML = `
            <div style="background: #eef2f5; padding: 10px; border-radius: 5px; display: inline-block;">
                👤 Bienvenue, <strong>${nom}</strong> ! 
                <button onclick="deconnexion()" style="margin-left: 10px; border: none; background: #dc3545; color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Déconnexion</button>
            </div>
        `;
    }
}

// Fonction de déconnexion
function deconnexion() {
    sessionStorage.removeItem('userName');
    location.reload(); // On recharge la page pour faire réapparaître le bouton Google
}

// Vérifier si on est déjà connecté au chargement de la page
window.addEventListener('load', () => {
    const nomSauvegarde = sessionStorage.getItem('userName');
    if (nomSauvegarde) {
        afficherUtilisateur(nomSauvegarde);
    }
});
// ==========================================
// AFFICHAGE DES ANNONCES DYNAMIQUES
// ==========================================
async function chargerAnnonces() {
    try {
        const response = await fetch('/api/annonces');
        const annonces = await response.json();
        
        const conteneur = document.getElementById('conteneur-annonces');
        if (!conteneur) return; // Sécurité si on n'est pas sur la page d'accueil
        
        conteneur.innerHTML = ''; // On vide le texte de chargement

        if (annonces.length === 0) {
            conteneur.innerHTML = `<p style="color: #666;">Aucune annonce pour le moment.</p>`;
            return;
        }

        // On affiche chaque annonce
        annonces.forEach(annonce => {
            const dateCreation = annonce.date ? new Date(annonce.date).toLocaleDateString('fr-FR') : 'Récemment';
            const couleur = annonce.couleur || '#17a2b8'; // Bleu par défaut

            conteneur.innerHTML += `
                <div style="background: white; padding: 15px; border-left: 5px solid ${couleur}; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <h4 style="margin: 0 0 5px 0; color: #333;">${annonce.titre}</h4>
                    <p style="margin: 0; font-size: 0.9em; color: #555; white-space: pre-wrap;">${annonce.contenu}</p>
                    <span style="font-size: 0.8em; color: #999; display: block; margin-top: 10px;">Publié le ${dateCreation}</span>
                </div>
            `;
        });
    } catch (erreur) {
        console.error("Erreur lors du chargement des annonces :", erreur);
    }
}

// On lance le chargement des annonces au démarrage
window.addEventListener('DOMContentLoaded', () => {
    chargerAnnonces();
});
// ==========================================
// FONCTION POUR COPIER LE LIEN MAGIQUE
// ==========================================
// ==========================================
// FONCTION POUR COPIER LE LIEN MAGIQUE
// ==========================================
function copierLienMagique(nomDuCours) {
    const urlBase = window.location.origin + window.location.pathname;
    const lienComplet = urlBase + '?recherche=' + encodeURIComponent(nomDuCours);

    navigator.clipboard.writeText(lienComplet).then(() => {
        alert("✅ Lien copié avec succès !\nVous pouvez le coller (Ctrl+V) où vous voulez.");
    }).catch(err => {
        console.error("Erreur lors de la copie :", err);
        alert("❌ Impossible de copier le lien. Veuillez le faire manuellement.");
    });
}