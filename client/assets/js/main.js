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
            const nomAffiche = doc.module || doc.title || "Document"; // S'il n'y a pas de module, on affiche le titre
            
            // 1. SI C'EST UN CONCOURS
            if (doc.categorie === "Concours" || doc.category === "Concours") {
                const lienConcours = `<a href="${doc.fichier_url}" target="_blank" style="background-color: #f8f9fa; color: #333; text-align: left; padding: 10px; border-radius: 5px; text-decoration: none; font-weight: bold; border-left: 4px solid #6f42c1; display: block; margin-bottom: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-size: 0.9em;">📄 ${nomAffiche}</a>`;

                if (doc.filiere === "Master" && boxMaster) boxMaster.innerHTML += lienConcours;
                else if (doc.filiere === "Ingenieur" && boxIngenieur) boxIngenieur.innerHTML += lienConcours.replace('#6f42c1', '#fd7e14');
                else if (doc.filiere === "CRMEF" && boxCrmef) boxCrmef.innerHTML += lienConcours.replace('#6f42c1', '#20c997');
            } 
            
            // 2. SI C'EST UN LIVRE
            else if (doc.categorie === "Livre" || doc.category === "Livre") {
                const lienLivre = `<a href="${doc.fichier_url}" target="_blank" style="background-color: white; color: #333; text-align: left; padding: 8px; border-radius: 4px; text-decoration: none; font-weight: bold; border-left: 3px solid #007bff; display: block; margin-bottom: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); font-size: 0.85em;">📖 ${nomAffiche}</a>`;

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
    const conteneur = document.getElementById('conteneur-dossiers'); 
    if (!conteneur) return;
    
    conteneur.innerHTML = ''; 

    if (documents.length === 0) {
        conteneur.innerHTML = '<p style="text-align: center; color: #64748b; margin-top: 20px;">Aucun document ne correspond à votre recherche.</p>';
        return;
    }

    // 1. LE NOUVEAU CERVEAU : On trie par Filière > Semestre > Module > CATÉGORIE (Cours, TD...)
    const arborescence = {};
    
    documents.forEach(doc => {
        const filiere = doc.filiere || "Autres Filières";
        const semestre = doc.semestre || "Général";
        const module = doc.module || "Divers";
        const categorie = doc.category || doc.categorie || "Cours"; // 👈 Le nouveau niveau !
        
        if (!arborescence[filiere]) arborescence[filiere] = {};
        if (!arborescence[filiere][semestre]) arborescence[filiere][semestre] = {};
        if (!arborescence[filiere][semestre][module]) arborescence[filiere][semestre][module] = {};
        if (!arborescence[filiere][semestre][module][categorie]) arborescence[filiere][semestre][module][categorie] = [];
        
        arborescence[filiere][semestre][module][categorie].push(doc);
    });

    // 2. LA CONSTRUCTION HTML DES ACCORDÉONS (4 NIVEAUX)
    let html = '';
    
    for (const filiere in arborescence) {
        const filiereId = 'filiere-' + filiere.replace(/[^a-zA-Z0-9]/g, '');
        
        html += `
        <div class="filiere-card">
            <div class="filiere-header" onclick="toggleDossier('${filiereId}')">
                <span>📁 ${filiere}</span>
                <span id="icon-${filiereId}">▼</span>
            </div>
            <div id="${filiereId}" class="filiere-content hidden">
        `;
        
        for (const semestre in arborescence[filiere]) {
            const semestreId = filiereId + '-' + semestre.replace(/[^a-zA-Z0-9]/g, '');
            
            html += `
                <div class="semestre-container">
                    <div class="semestre-header" onclick="toggleDossier('${semestreId}')">
                        <span>📂 ${semestre}</span>
                        <span id="icon-${semestreId}" style="float: right; font-size: 0.8em; margin-top: 4px;">▼</span>
                    </div>
                    <div id="${semestreId}" class="semestre-content hidden">
            `;
            
            for (const module in arborescence[filiere][semestre]) {
                const moduleId = semestreId + '-' + module.replace(/[^a-zA-Z0-9]/g, '');
                
                // NOUVEAU : Le module devient lui aussi un dossier cliquable !
                html += `
                        <div class="module-container">
                            <div class="module-header" onclick="toggleDossier('${moduleId}')" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: #e0f2fe; padding: 8px 12px; border-radius: 6px; margin-bottom: 5px;">
                                <span style="color: #0369a1;">📘 ${module}</span>
                                <span id="icon-${moduleId}" style="font-size: 0.8em; color: #0369a1;">▼</span>
                            </div>
                            <div id="${moduleId}" class="module-content hidden" style="padding-left: 10px; border-left: 2px solid #e0f2fe; margin-left: 5px;">
                `;
                
                // NOUVEAU : On regroupe les documents par catégorie (Cours, TD, Examens...)
                for (const categorie in arborescence[filiere][semestre][module]) {
                    
                    // On choisit un petit emoji sympa selon la catégorie
                    let catIcon = "📄";
                    if (categorie.toLowerCase().includes("td") || categorie.toLowerCase().includes("exercice")) catIcon = "📝";
                    if (categorie.toLowerCase().includes("examen") || categorie.toLowerCase().includes("contrôle")) catIcon = "🎓";
                    if (categorie.toLowerCase().includes("résumé")) catIcon = "💡";

                    html += `
                                <div style="margin-top: 15px; margin-bottom: 10px; font-weight: bold; color: #475569; font-size: 0.95em; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
                                    ${catIcon} ${categorie}
                                </div>
                    `;

                    // On affiche enfin les documents de cette catégorie
                    arborescence[filiere][semestre][module][categorie].forEach(doc => {
                        const titre = doc.title || doc.titre || "Document sans titre";
                        const safeTitle = titre.replace(/'/g, "\\'");
                        
                        html += `
                                <div class="doc-item" style="display: flex; flex-direction: column;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                        <div>
                                            <strong>${titre}</strong>
                                        </div>
                                        <div style="display: flex; gap: 10px; align-items: center;">
                                            <button onclick="copierLienMagique('${safeTitle}')" title="Copier le lien" style="background: none; border: none; cursor: pointer; font-size: 1.2em; padding: 0;">📋</button>
                                            <a href="${doc.fichier_url}" target="_blank" class="btn-telecharger">📥 Ouvrir</a>
                                        </div>
                                    </div>

                                    <!-- Section Commentaires -->
                                    <div style="border-top: 1px dashed #e2e8f0; margin-top: 10px; padding-top: 8px;">
                                        <button onclick="toggleCommentaires(${doc.id})" style="background: none; border: none; color: #64748b; cursor: pointer; font-size: 0.85em; font-weight: bold; padding: 0;">
                                            💬 Voir / Ajouter un commentaire
                                        </button>
                                        
                                        <div id="zone-commentaires-${doc.id}" style="display: none; margin-top: 10px;">
                                            <div id="liste-commentaires-${doc.id}" style="max-height: 120px; overflow-y: auto; background: #f8fafd; padding: 10px; border-radius: 4px; margin-bottom: 8px; font-size: 0.85em; border: 1px solid #e2e8f0;">
                                            </div>
                                            <div style="display: flex; gap: 5px;">
                                                <input type="text" id="input-comment-${doc.id}" placeholder="Votre commentaire..." style="flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.9em;">
                                                <button onclick="envoyerCommentaire(${doc.id})" style="background: #10b981; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9em; font-weight:bold;">Envoyer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        `;
                    });
                }
                
                html += `</div></div> <!-- Fin module -->`;
            }
            html += `</div></div> <!-- Fin semestre -->`;
        }
        html += `</div></div> <!-- Fin filiere -->`;
    }
    
    conteneur.innerHTML = html;
    
    // Auto-ouverture en cas de recherche
    const barre = document.getElementById('barreRecherche');
    if (barre && barre.value.trim() !== "") {
        document.querySelectorAll('.hidden').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('[id^="icon-"]').forEach(icon => icon.textContent = '▲');
    }
}

// 3. FONCTION POUR OUVRIR/FERMER LES DOSSIERS AU CLIC
function toggleDossier(id) {
    const element = document.getElementById(id);
    const icon = document.getElementById('icon-' + id);
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        icon.textContent = '▲';
    } else {
        element.classList.add('hidden');
        icon.textContent = '▼';
    }
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


// FILTRAGE DES DOCUMENTS (VERSION FLEXIBLE)
// ==========================================
// FILTRAGE INTELLIGENT AVEC LA BARRE DE RECHERCHE
// ==========================================
function filtrerDocuments() {
    const barre = document.getElementById('barreRecherche');
    const texteRecherche = barre ? barre.value.toLowerCase().trim() : "";

    // 1. On filtre les documents
    const documentsFiltres = tousLesDocuments.filter(doc => {
        const titre = doc.title ? doc.title.toLowerCase().trim() : "";
        const moduleDoc = doc.module ? doc.module.toLowerCase().trim() : "";
        const filiereDoc = doc.filiere ? doc.filiere.toLowerCase().trim() : "";
        const categorieDoc = (doc.category || doc.categorie || "").toLowerCase().trim();

        // Si le mot cherché est dans le titre, le module, la filière ou la catégorie !
        return texteRecherche === "" || 
               titre.includes(texteRecherche) || 
               moduleDoc.includes(texteRecherche) ||
               filiereDoc.includes(texteRecherche) ||
               categorieDoc.includes(texteRecherche);
    });

    // 2. On prépare les listes (pour garder la compatibilité avec tes pages Concours/Bibliothèque)
    const boxMaster = document.getElementById('liste-masters');
    const boxIngenieur = document.getElementById('liste-ingenieurs');
    const boxCrmef = document.getElementById('liste-crmef');
    const boxLivreMath = document.getElementById('liste-livres-math');
    const boxLivrePhysique = document.getElementById('liste-livres-physique');
    const boxLivreInfo = document.getElementById('liste-livres-info');

    if (boxMaster) boxMaster.innerHTML = '';
    if (boxIngenieur) boxIngenieur.innerHTML = '';
    if (boxCrmef) boxCrmef.innerHTML = '';
    if (boxLivreMath) boxLivreMath.innerHTML = '';
    if (boxLivrePhysique) boxLivrePhysique.innerHTML = '';
    if (boxLivreInfo) boxLivreInfo.innerHTML = '';

    const documentsOrdinaires = [];

    // 3. On range dans les boîtes
    documentsFiltres.forEach(doc => {
        const categorie = doc.categorie || doc.category; 
        const nomAffiche = doc.module || doc.title || "Document";

        if (categorie === "Concours") {
            const lienConcours = `<a href="${doc.fichier_url}" target="_blank" style="...">📄 ${nomAffiche}</a>`;
            if (doc.filiere === "Master" && boxMaster) boxMaster.innerHTML += lienConcours;
            else if (doc.filiere === "Ingenieur" && boxIngenieur) boxIngenieur.innerHTML += lienConcours;
            else if (doc.filiere === "CRMEF" && boxCrmef) boxCrmef.innerHTML += lienConcours;
        } 
        else if (categorie === "Livre") {
            const lienLivre = `<a href="${doc.fichier_url}" target="_blank" style="...">📖 ${nomAffiche}</a>`;
            if (doc.filiere === "Livre Math" && boxLivreMath) boxLivreMath.innerHTML += lienLivre;
            else if (doc.filiere === "Livre Physique" && boxLivrePhysique) boxLivrePhysique.innerHTML += lienLivre;
            else if (doc.filiere === "Livre Info" && boxLivreInfo) boxLivreInfo.innerHTML += lienLivre;
        } 
        else {
            documentsOrdinaires.push(doc); // Les cours classiques !
        }
    });

    // 4. On redessine nos beaux dossiers bleus avec les résultats
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
        // On affiche chaque annonce
        // On affiche chaque annonce
        annonces.forEach(annonce => {
            const dateCreation = annonce.date ? new Date(annonce.date).toLocaleDateString('fr-FR') : 'Récemment';
            const couleur = annonce.couleur || '#17a2b8'; 

            const imageHtml = annonce.image_url 
                ? `<img src="${annonce.image_url}" alt="Image de l'annonce" style="max-width: 100%; max-height: 400px; border-radius: 8px; margin-top: 10px; margin-bottom: 10px; display: block;">` 
                : '';

            // 🌟 NOUVEAU : On vérifie si tu es admin, si oui on crée le bouton
            const isAdmin = localStorage.getItem('admin') === 'true';
            const boutonSupprimerHtml = isAdmin 
                ? `<button onclick="supprimerAnnonce(${annonce.id})" style="background-color: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; float: right; font-size: 0.9em;">🗑️ Supprimer</button>` 
                : '';

            conteneur.innerHTML += `
                <div style="background: white; padding: 15px; border-left: 5px solid ${couleur}; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 15px;">
                    
                    <!-- 🌟 LE BOUTON APPARAÎT ICI (SI ADMIN) -->
                    ${boutonSupprimerHtml}

                    <h4 style="margin: 0 0 5px 0; color: #333;">${annonce.titre}</h4>
                    
                    ${imageHtml}
                    
                    <p style="margin: 0; font-size: 0.9em; color: #555; white-space: pre-wrap;">${rendreLiensCliquables(annonce.contenu)}</p>
                    
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
// ==========================================
// ALLUMER LE BON BOUTON DU MENU AUTOMATIQUEMENT
// ==========================================
function allumerMenuActif() {
    // 1. On récupère le nom du fichier actuel dans l'URL (ex: "concours.html")
    let pageActuelle = window.location.pathname.split('/').pop();
    
    // Si l'URL est juste le nom du site (vide), c'est qu'on est sur l'accueil
    if (pageActuelle === "" || pageActuelle === "/") {
        pageActuelle = "index.html";
    }

    // 2. On récupère tous les boutons du menu
    const liens = document.querySelectorAll('.nav-link');

    // 3. On allume le bon, et on éteint les autres
    liens.forEach(lien => {
        if (lien.getAttribute('href') === pageActuelle) {
            lien.style.backgroundColor = "rgba(255, 255, 255, 0.2)"; // On allume
            lien.style.borderRadius = "4px"; // Pour que ce soit joli
        } else {
            lien.style.backgroundColor = "transparent"; // On éteint
        }
    });
}

// On lance cette fonction automatiquement dès que la page s'ouvre !
document.addEventListener('DOMContentLoaded', allumerMenuActif);
// ==========================================
// DÉTECTEUR DE LIENS DANS LES ANNONCES
// ==========================================
function rendreLiensCliquables(texte) {
    if (!texte) return ""; // Sécurité si le texte est vide
    // Cette formule (Regex) cherche tout ce qui ressemble à un lien web
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // On remplace le texte par une vraie balise <a> HTML
    return texte.replace(urlRegex, function(url) {
        return `<a href="${url}" target="_blank" style="color: #007bff; text-decoration: underline; font-weight: bold;">🔗 Cliquez ici pour accéder au lien</a>`;
    });
}
// ==========================================
// SUPPRIMER UNE ANNONCE
// ==========================================
async function supprimerAnnonce(id) {
    // On demande confirmation pour éviter les erreurs !
    const confirmation = confirm("⚠️ Es-tu sûr de vouloir supprimer cette annonce définitivement ?");
    
    if (confirmation) {
        try {
            const response = await fetch(`/api/annonces/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("🗑️ Annonce supprimée !");
                location.reload(); // On rafraîchit la page pour faire disparaître l'annonce
            } else {
                alert("❌ Erreur lors de la suppression.");
            }
        } catch (erreur) {
            console.error("Erreur réseau :", erreur);
            alert("❌ Impossible de joindre le serveur.");
        }
    }
}
// ==========================================
// 👤 SYSTÈME DE CONNEXION GOOGLE
// ==========================================

// Fonction pour décoder la réponse de Google
function decodeJwtResponse(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Quand l'étudiant clique sur le bouton Google et réussit à se connecter
function handleGoogleLogin(response) {
    const payload = decodeJwtResponse(response.credential);
    
    // On crée un objet avec ses infos
    const utilisateur = {
        google_id: payload.sub,
        nom: payload.name,
        email: payload.email,
        photo: payload.picture
    };

    // On sauvegarde l'utilisateur dans la mémoire du navigateur
    localStorage.setItem('utilisateur_biblio', JSON.stringify(utilisateur));
    
    // On met à jour l'affichage
    afficherUtilisateur(utilisateur);
}

// Remplace le bouton Google par la photo de l'étudiant
function afficherUtilisateur(user) {
    const zone = document.getElementById('zoneUtilisateur');
    if(zone) {
        zone.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.1); padding: 5px 15px; border-radius: 20px;">
                <img src="${user.photo}" alt="Profil" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid white;">
                <span style="color: white; font-weight: bold; font-size: 0.9em;">${user.nom}</span>
                <button onclick="deconnexion()" style="background: none; border: none; color: #ffcccc; cursor: pointer; font-size: 1.2em; padding: 0;" title="Se déconnecter">🚪</button>
            </div>
        `;
    }
}

// Pour se déconnecter
function deconnexion() {
    localStorage.removeItem('utilisateur_biblio');
    location.reload(); // Recharge la page
}

// ==========================================
// 💬 SYSTÈME DE COMMENTAIRES (FORUM)
// ==========================================

// Déterminer sur quelle page on se trouve (ex: 'index', 'bibliotheque')
function getNomPageActuelle() {
    let nom = window.location.pathname.split('/').pop().replace('.html', '');
    return (nom === "" || nom === "/") ? 'index' : nom;
}

// 1. Charger les commentaires au démarrage de la page
async function chargerCommentairesPage() {
    const conteneur = document.getElementById('liste-commentaires');
    if(!conteneur) return; // Si la page n'a pas de forum, on arrête.

    const pageNom = getNomPageActuelle();

    try {
        const response = await fetch(`/api/commentaires/${pageNom}`);
        const commentaires = await response.json();

        conteneur.innerHTML = '';

        if(commentaires.length === 0) {
            conteneur.innerHTML = '<p style="text-align: center; color: #64748b; font-style: italic; padding: 20px;">Aucun message pour le moment. Soyez le premier à lancer la discussion ! 🎤</p>';
            return;
        }

        commentaires.forEach(c => {
            const date = new Date(c.date_creation).toLocaleString('fr-FR', {day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit'});
            conteneur.innerHTML += `
                <div style="display: flex; gap: 15px; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                    <img src="${c.photo_url}" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover; border: 2px solid #e0f2fe;">
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                            <strong style="color: #0f172a; font-size: 1.05em;">${c.nom_utilisateur}</strong>
                            <span style="color: #94a3b8; font-size: 0.8em;">🕒 ${date}</span>
                        </div>
                        <p style="margin: 0; color: #334155; line-height: 1.5; word-break: break-word;">${c.message}</p>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        conteneur.innerHTML = '<p style="color: red; text-align: center;">Erreur lors du chargement des messages.</p>';
    }
}

// 2. Envoyer un nouveau commentaire
// 2. Envoyer un nouveau commentaire
async function envoyerCommentairePage() {
    const userStr = localStorage.getItem('utilisateur_biblio');
    if(!userStr) {
        alert("⚠️ Vous devez vous connecter avec Google (en haut à droite) pour pouvoir discuter !");
        return;
    }

    const user = JSON.parse(userStr);
    const input = document.getElementById('nouveau-commentaire');
    const message = input.value.trim();

    if(message === "") return alert("Votre message est vide !");

    const pageNom = getNomPageActuelle();

    // On récupère le bouton de manière plus sécurisée
    const btn = document.querySelector('button[onclick="envoyerCommentairePage()"]');

    try {
        if(btn) {
            btn.textContent = "Envoi en cours...";
            btn.disabled = true;
        }

        const response = await fetch('/api/commentaires', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                page_nom: pageNom,
                google_id: user.google_id,
                nom_utilisateur: user.nom,
                photo_url: user.photo,
                message: message
            })
        });

        if(response.ok) {
            input.value = ''; // On vide la case
            chargerCommentairesPage(); // On recharge la liste
        } else {
            alert("Erreur du serveur (Code: " + response.status + "). Le backend a un problème.");
        }

    } catch (error) {
        console.error("Erreur Fetch:", error);
        alert("Serveur injoignable. Le serveur Node.js est peut-être éteint.");
    } finally {
        if(btn) {
            btn.textContent = "Envoyer le message 🚀";
            btn.disabled = false;
        }
    }
}

// ==========================================
// 🚀 AU CHARGEMENT DE LA PAGE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. On vérifie si l'étudiant est déjà connecté
    const userStr = localStorage.getItem('utilisateur_biblio');
    if(userStr) {
        afficherUtilisateur(JSON.parse(userStr));
    }
    
    // 2. On charge les commentaires de la page actuelle
    chargerCommentairesPage();
});