let tousLesDocuments = [];
let categorieActuelle = 'Tous';
let texteRechercheActuel = '';
let filiereActuelle = 'Tous';
let semestreActuel = 'Tous';
let optionActuelle = 'Tous';

let pageActuelle = 1;
const documentsParPage = 6;

document.addEventListener('DOMContentLoaded', () => {
    chargerDocuments();
    gererPseudoUtilisateur();
    initialiserModeSombre(); 

    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            texteRechercheActuel = e.target.value.toLowerCase();
            pageActuelle = 1;
            filtrerEtAfficher();
        });
    }

    const selectFiliere = document.getElementById('filtre-filiere');
    const selectSemestre = document.getElementById('filtre-semestre');
    const filtreOptionContainer = document.getElementById('filtre-option-container');
    const selectOption = document.getElementById('filtre-option');

    function verifierAffichageFiltreOption() {
        if (selectFiliere && selectSemestre && filtreOptionContainer && selectOption) {
            if (selectFiliere.value === 'PC-P' && selectSemestre.value === 'Semestre 6') {
                filtreOptionContainer.style.display = 'block';
            } else {
                filtreOptionContainer.style.display = 'none';
                selectOption.value = 'Tous';
                optionActuelle = 'Tous';
            }
        }
    }

    if (selectFiliere) selectFiliere.addEventListener('change', (e) => {
        filiereActuelle = e.target.value;
        pageActuelle = 1;
        verifierAffichageFiltreOption();
        filtrerEtAfficher();
    });

    if (selectSemestre) selectSemestre.addEventListener('change', (e) => {
        semestreActuel = e.target.value;
        pageActuelle = 1;
        verifierAffichageFiltreOption();
        filtrerEtAfficher();
    });

    if (selectOption) selectOption.addEventListener('change', (e) => {
        optionActuelle = e.target.value;
        pageActuelle = 1;
        filtrerEtAfficher();
    });

    const boutonsFiltres = document.querySelectorAll('.filter-btn');
    boutonsFiltres.forEach(bouton => {
        bouton.addEventListener('click', (e) => {
            boutonsFiltres.forEach(b => {
                b.style.backgroundColor = '#e2e8f0';
                b.style.color = '#333';
            });
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.color = 'white';

            categorieActuelle = e.target.getAttribute('data-category');
            pageActuelle = 1;
            filtrerEtAfficher();
        });
    });
    // --- NOUVEAU : UPLOAD PAR LES ÉTUDIANTS ---
    const publicUploadForm = document.getElementById('public-upload-form');
    if(publicUploadForm) {
        publicUploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const msg = document.getElementById('pub-message');
            
            // On vérifie que l'étudiant a bien choisi une filière et un semestre précis
            if(filiereActuelle === 'Tous' || semestreActuel === 'Tous') {
                msg.textContent = "⚠️ Veuillez d'abord sélectionner une Filière ET un Semestre précis dans les filtres en haut !";
                msg.style.color = "#dc3545"; // rouge
                return;
            }

            const title = document.getElementById('pub-title').value.trim();
            const moduleName = document.getElementById('pub-module').value.trim();
            const category = document.getElementById('pub-category').value;
            const fileInput = document.getElementById('pub-file');

            if(fileInput.files.length === 0) {
                msg.textContent = "⚠️ Veuillez sélectionner un fichier PDF.";
                msg.style.color = "#dc3545";
                return;
            }

            msg.textContent = "Envoi du fichier en cours, veuillez patienter...";
            msg.style.color = "#0056b3"; // bleu

            // On prépare les données comme dans l'Admin
            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', category);
            formData.append('module', moduleName);
            formData.append('filiere', filiereActuelle);
            formData.append('semestre', semestreActuel);
            formData.append('option_pcp', optionActuelle === 'Tous' ? '' : optionActuelle);
            formData.append('file', fileInput.files[0]);

            try {
                const reponse = await fetch('http://localhost:3000/api/documents', {
                    method: 'POST',
                    body: formData
                });

                if (reponse.ok) {
                    msg.textContent = "✅ Document publié avec succès ! Merci pour votre contribution.";
                    msg.style.color = "#28a745"; // vert
                    publicUploadForm.reset();
                    chargerDocuments(); // On rafraîchit la page pour afficher le nouveau PDF
                    
                    // On efface le message de succès après 5 secondes
                    setTimeout(() => { msg.textContent = ''; }, 5000);
                } else {
                    msg.textContent = "❌ Erreur lors de la publication.";
                    msg.style.color = "#dc3545";
                }
            } catch (erreur) {
                msg.textContent = "❌ Impossible de joindre le serveur.";
                msg.style.color = "#dc3545";
            }
        });
    }
});

// --- GESTION DU MODE SOMBRE ---
function initialiserModeSombre() {
    const btnToggle = document.getElementById('dark-mode-toggle');
    const icon = document.getElementById('dark-mode-icon');
    const text = document.getElementById('dark-mode-text');
    
    if (!btnToggle || !icon || !text) return;

    if (localStorage.getItem('umpdocs_theme') === 'dark') {
        document.body.classList.add('dark-mode');
        icon.textContent = '☀️';
        text.textContent = 'Passer en mode clair';
    } else {
        icon.textContent = '🌙';
        text.textContent = 'Passer en mode sombre';
    }

    btnToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('umpdocs_theme', 'dark');
            icon.textContent = '☀️';
            text.textContent = 'Passer en mode clair';
        } else {
            localStorage.setItem('umpdocs_theme', 'light');
            icon.textContent = '🌙';
            text.textContent = 'Passer en mode sombre';
        }
    });
}

// --- GESTION DU COMPTE UTILISATEUR (CONNEXION / INSCRIPTION) ---
function gererPseudoUtilisateur() {
    const btnOpenModal = document.getElementById('open-auth-modal');
    const modal = document.getElementById('auth-modal');
    if (!btnOpenModal || !modal) return;

    // Texte par défaut quand l'étudiant n'est pas connecté
    btnOpenModal.innerHTML = '👤 Se connecter';

    // Vérifier si un utilisateur est connecté
    const pseudoConnecte = localStorage.getItem('umpdocs_pseudo');
    if (pseudoConnecte) {
        // S'il est connecté, on affiche son nom et "(Se déconnecter)" plus petit
        btnOpenModal.innerHTML = `👤 ${pseudoConnecte} <small style="opacity: 0.8; font-weight: normal; margin-left: 5px;">(Se déconnecter)</small>`;
        btnOpenModal.style.background = '#28a745'; // Vert pour indiquer qu'on est connecté
        btnOpenModal.style.color = 'white';
    } else {
        // Style par défaut si déconnecté
        btnOpenModal.style.background = 'white';
        btnOpenModal.style.color = '#0056b3';
    }

    btnOpenModal.addEventListener('click', () => {
        if (localStorage.getItem('umpdocs_pseudo')) {
            // Si l'utilisateur est connecté, le clic propose de se déconnecter
            if (confirm("Voulez-vous vraiment vous déconnecter de votre compte ?")) {
                localStorage.removeItem('umpdocs_pseudo');
                location.reload();
            }
        } else {
            // Si non connecté, le clic ouvre la fenêtre
            ouvrirFormulaireConnexion();
            modal.style.display = 'flex';
        }
    });
}

function fermerAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
}

function ouvrirFormulaireConnexion() {
    document.getElementById('auth-title').textContent = "Connexion";
    const container = document.getElementById('auth-form-container');
    container.innerHTML = `
        <form id="login-form" style="display: flex; flex-direction: column; gap: 12px;">
            <input type="email" id="login-email" placeholder="Votre email" required style="padding: 10px; border-radius: 6px; border: 1px solid #ccc;">
            <input type="password" id="login-password" placeholder="Mot de passe" required style="padding: 10px; border-radius: 6px; border: 1px solid #ccc;">
            <button type="submit" style="background: #0056b3; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer;">Se connecter</button>
            <p id="auth-error" style="color: red; font-size: 0.85rem; margin: 0; text-align: center;"></p>
            <p style="text-align: center; font-size: 0.9rem; margin-top: 10px;">Pas encore de compte ? <a href="#" onclick="ouvrirFormulaireInscription()" style="color: #0056b3; font-weight: bold;">S'inscrire</a></p>
        </form>
    `;

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errTag = document.getElementById('auth-error');

        try {
            const rep = await fetch('http://localhost:3000/api/documents/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await rep.json();
            if (rep.ok) {
                localStorage.setItem('umpdocs_pseudo', data.pseudo);
                fermerAuthModal();
                location.reload();
            } else {
                errTag.textContent = data.erreur;
            }
        } catch (err) {
            errTag.textContent = "Erreur de connexion au serveur.";
        }
    });
}

function ouvrirFormulaireConnexion() {
    document.getElementById('auth-title').textContent = "Connexion";
    const container = document.getElementById('auth-form-container');
    
    // On ajoute un espace pour le bouton Google (google-button-div) au-dessus du formulaire classique
    container.innerHTML = `
        <div id="google-button-div" style="display: flex; justify-content: center; margin-bottom: 15px;"></div>
        
        <div style="text-align: center; margin-bottom: 15px; color: #777; font-size: 0.9rem;">— OU —</div>

        <form id="login-form" style="display: flex; flex-direction: column; gap: 12px;">
            <input type="email" id="login-email" placeholder="Votre email" required style="padding: 10px; border-radius: 6px; border: 1px solid #ccc;">
            <input type="password" id="login-password" placeholder="Mot de passe" required style="padding: 10px; border-radius: 6px; border: 1px solid #ccc;">
            <button type="submit" style="background: #0056b3; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer;">Se connecter</button>
            <p id="auth-error" style="color: red; font-size: 0.85rem; margin: 0; text-align: center;"></p>
            <p style="text-align: center; font-size: 0.9rem; margin-top: 10px;">Pas encore de compte ? <a href="#" onclick="ouvrirFormulaireInscription()" style="color: #0056b3; font-weight: bold; cursor: pointer;">S'inscrire</a></p>
        </form>
    `;

    // 🌟 INJECTION DU BOUTON GOOGLE OFFICIEL
    if (window.google) {
        google.accounts.id.initialize({
            client_id: "265258547962-3l1s0l3ep99tg6ej2bk1ovgc78962euc.apps.googleusercontent.com", // REMPLACE PAR TON CLIENT ID
            callback: handleGoogleLogin
        });
        google.accounts.id.renderButton(
            document.getElementById("google-button-div"),
            { theme: "outline", size: "large", width: "100%" } 
        );
    }

    // Gestion du formulaire classique (Email)
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errTag = document.getElementById('auth-error');

        try {
            const rep = await fetch('http://localhost:3000/api/documents/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await rep.json();
            if (rep.ok) {
                localStorage.setItem('umpdocs_pseudo', data.pseudo);
                fermerAuthModal();
                location.reload();
            } else {
                errTag.textContent = data.erreur;
            }
        } catch (err) {
            errTag.textContent = "Erreur de connexion au serveur.";
        }
    });
}

// 🌟 FONCTION QUI S'ACTIVE QUAND L'ÉTUDIANT CLIQUE SUR GOOGLE
async function handleGoogleLogin(response) {
    const errTag = document.getElementById('auth-error');
    if (!errTag) return;
    
    try {
        const rep = await fetch('http://localhost:3000/api/documents/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential })
        });
        
        const data = await rep.json();
        
        if (rep.ok) {
            localStorage.setItem('umpdocs_pseudo', data.pseudo);
            fermerAuthModal();
            location.reload();
        } else {
            errTag.textContent = data.erreur;
        }
    } catch (err) {
        errTag.textContent = "Erreur de communication avec le serveur.";
    }
}

// --- CHARGEMENT DES DOCUMENTS ---
async function chargerDocuments() {
    const docList = document.getElementById('documents-list');
    try {
        const reponse = await fetch('http://localhost:3000/api/documents');
        tousLesDocuments = await reponse.json(); 
        filtrerEtAfficher();
    } catch (erreur) {
        console.error("Erreur :", erreur);
        if (docList) docList.innerHTML = '<p style="color: red;">Erreur de connexion avec le serveur.</p>';
    }
}

async function incrementerEtOuvrir(id, filePath) {
    try {
        await fetch(`http://localhost:3000/api/documents/${id}/download`, { method: 'POST' });
    } catch (erreur) {}
    window.open(filePath, '_blank');
}

async function togglePDF(id, filePath, btnElement) {
    const container = document.getElementById(`pdf-container-${id}`);
    if (container.style.display === 'none') {
        try {
            await fetch(`http://localhost:3000/api/documents/${id}/download`, { method: 'POST' });
        } catch (erreur) {}
        
        container.innerHTML = `<iframe src="${filePath}" width="100%" height="100%" style="border: none;"></iframe>`;
        container.style.display = 'block';
        btnElement.textContent = "Fermer le PDF";
        btnElement.style.backgroundColor = "#dc3545"; 
    } else {
        container.innerHTML = '';
        container.style.display = 'none';
        btnElement.textContent = "Lire le PDF";
        btnElement.style.backgroundColor = "#28a745"; 
    }
}

// --- COMMENTAIRES ---
async function chargerCommentaires(docId) {
    const container = document.getElementById(`comments-list-${docId}`);
    try {
        const rep = await fetch(`http://localhost:3000/api/documents/${docId}/comments`);
        const commentaires = await rep.json();

        if (commentaires.length === 0) {
            container.innerHTML = '<p style="font-size: 0.85rem; color: #777; font-style: italic;">Aucun commentaire pour l\'instant. Soyez le premier !</p>';
            return;
        }

        container.innerHTML = '';
        commentaires.forEach(c => {
            const div = document.createElement('div');
            div.className = 'comment-item';
            div.style.background = '#f1f3f5';
            div.style.padding = '6px 10px';
            div.style.borderRadius = '4px';
            div.style.marginBottom = '6px';
            div.style.fontSize = '0.85rem';
            div.innerHTML = `<strong>💬 ${c.author} :</strong> ${c.content}`;
            container.appendChild(div);
        });
    } catch (e) {
        container.innerHTML = '<p style="font-size: 0.85rem; color: red;">Erreur de chargement des commentaires.</p>';
    }
}

async function envoyerCommentaire(docId) {
    const pseudo = localStorage.getItem('umpdocs_pseudo');
    if (!pseudo) {
        alert("Veuillez d'abord entrer et sauvegarder votre pseudo en haut de la page (bouton OK) !");
        return;
    }

    const inputContent = document.getElementById(`comment-input-${docId}`);
    const content = inputContent.value.trim();

    if (!content) {
        alert("Le commentaire ne peut pas être vide.");
        return;
    }

    try {
        const rep = await fetch(`http://localhost:3000/api/documents/${docId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author: pseudo, content: content })
        });

        if (rep.ok) {
            inputContent.value = '';
            chargerCommentaires(docId); 
        } else {
            alert("Erreur lors de l'envoi du commentaire.");
        }
    } catch (e) {
        alert("Erreur de connexion avec le serveur.");
    }
}

// --- REQUÊTES ÉTUDIANTS ---
async function envoyerRequete() {
    const pseudo = localStorage.getItem('umpdocs_pseudo');
    if (!pseudo) {
        alert("Veuillez d'abord entrer et sauvegarder votre pseudo en haut de la page (bouton OK) !");
        return;
    }

    const input = document.getElementById('request-input');
    const msg = document.getElementById('request-msg');
    const content = input.value.trim();

    if (!content) {
        msg.textContent = "⚠️ Veuillez décrire le cours que vous cherchez.";
        msg.style.color = "#dc3545";
        return;
    }

    try {
        const rep = await fetch('http://localhost:3000/api/documents/requests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author: pseudo, content: content })
        });

        if (rep.ok) {
            input.value = '';
            msg.textContent = "✅ Demande envoyée avec succès ! Nous la traiterons bientôt.";
            msg.style.color = "#28a745";
            setTimeout(() => { msg.textContent = ''; }, 5000);
        } else {
            msg.textContent = "❌ Erreur lors de l'envoi.";
            msg.style.color = "#dc3545";
        }
    } catch (e) {
        msg.textContent = "❌ Impossible de joindre le serveur.";
        msg.style.color = "#dc3545";
    }
}

// --- AFFICHAGE ET FILTRES ---
function filtrerEtAfficher() {
    const docList = document.getElementById('documents-list');
    if(!docList) return;
    
    docList.innerHTML = ''; 

    const documentsFiltres = tousLesDocuments.filter(doc => {
        const correspondTexte = doc.title.toLowerCase().includes(texteRechercheActuel) || 
                               doc.module.toLowerCase().includes(texteRechercheActuel);
        const correspondCategorie = (categorieActuelle === 'Tous') || (doc.category === categorieActuelle);
        const correspondFiliere = (filiereActuelle === 'Tous') || (doc.filiere === filiereActuelle);
        const correspondSemestre = (semestreActuel === 'Tous') || (doc.semestre === semestreActuel);
        
        let correspondOption = true;
        if (filiereActuelle === 'PC-P' && semestreActuel === 'Semestre 6' && optionActuelle !== 'Tous') {
            correspondOption = (doc.option_pcp === optionActuelle);
        }

        return correspondTexte && correspondCategorie && correspondFiliere && correspondSemestre && correspondOption;
    });

    if (documentsFiltres.length === 0) {
        docList.innerHTML = '<p>Aucun document ne correspond à vos critères de recherche 🕵️‍♂️.</p>';
        supprimerPaginationHTML();
        return;
    }

    const totalPages = Math.ceil(documentsFiltres.length / documentsParPage);
    if (pageActuelle > totalPages) pageActuelle = totalPages;

    const debut = (pageActuelle - 1) * documentsParPage;
    const fin = debut + documentsParPage;
    const documentsPageCourante = documentsFiltres.slice(debut, fin);

    documentsPageCourante.forEach(doc => {
        const carte = document.createElement('div');
        carte.className = 'document-card';
        carte.style.border = '1px solid #ddd';
        carte.style.padding = '15px';
        carte.style.borderRadius = '8px';
        carte.style.backgroundColor = '#f9f9f9';
        carte.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        carte.style.display = 'flex';
        carte.style.flexDirection = 'column';
        carte.style.justifyContent = 'space-between';
        carte.style.transition = 'background-color 0.3s, border-color 0.3s';

        let texteOptionBadge = doc.option_pcp ? ` | ⚙️ ${doc.option_pcp}` : '';
        const texteMessage = `🎓 Regarde ce document : *${doc.title}* (${doc.module}) !\n\nRetrouve-le sur UMPDocs : ${window.location.origin}`;
        const lienWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(texteMessage)}`;

        // NOUVEAU : Trouver 2 autres documents similaires (même filière, mais pas le même document)
        const similaires = tousLesDocuments.filter(d => d.filiere === doc.filiere && d.id !== doc.id).slice(0, 2);
        let htmlSimilaires = '';
        
        if (similaires.length > 0) {
            const boutonsSimilaires = similaires.map(sim => `
                <button onclick="incrementerEtOuvrir(${sim.id}, '${sim.file_path}')" style="background: #e2e8f0; color: #333; border: none; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; cursor: pointer; white-space: nowrap;">
                    📄 ${sim.title}
                </button>
            `).join('');

            htmlSimilaires = `
                <div style="margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 10px;">
                    <h4 style="margin: 0 0 8px 0; font-size: 0.85rem; color: #0056b3;">🔄 Vous aimerez aussi :</h4>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        ${boutonsSimilaires}
                    </div>
                </div>
            `;
        }

        carte.innerHTML = `
            <div>
                <h3 style="margin-top: 0; color: #0056b3;">📄 ${doc.title}</h3>
                <p style="margin: 5px 0; font-size: 0.9rem; color: #555;"><strong>🎓 ${doc.filiere}</strong> | <strong>📅 ${doc.semestre}</strong>${texteOptionBadge}</p>
                <p style="margin: 5px 0;"><strong>Catégorie :</strong> ${doc.category}</p>
                <p style="margin: 5px 0;"><strong>Module :</strong> ${doc.module}</p>
            </div>
            
            <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div style="display: flex; gap: 8px;">
                    <button onclick="togglePDF(${doc.id}, '${doc.file_path}', this)" style="padding: 8px 12px; background-color: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
                        Lire le PDF
                    </button>
                    <a href="${lienWhatsApp}" target="_blank" style="padding: 8px 12px; background-color: #25D366; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; display: flex; align-items: center; gap: 5px;">
                        Partager
                    </a>
                </div>
            </div>

            <div id="pdf-container-${doc.id}" style="display: none; width: 100%; height: 500px; margin-top: 15px; border-radius: 6px; overflow: hidden; border: 1px solid #ccc;"></div>

            <!-- INJECTION DES COURS SIMILAIRES ICI -->
            ${htmlSimilaires}

            <div class="comment-section" style="margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 10px;">
                <h4 style="margin: 0 0 8px 0; font-size: 0.95rem; color: #333;">Espace Commentaires</h4>
                <div id="comments-list-${doc.id}" style="max-height: 120px; overflow-y: auto; margin-bottom: 10px;">
                    <p style="font-size: 0.85rem; color: #777;">Chargement...</p>
                </div>
                <div style="display: flex; gap: 5px;">
                    <input type="text" id="comment-input-${doc.id}" placeholder="Ajouter un commentaire..." style="flex: 1; padding: 6px; font-size: 0.85rem; border: 1px solid #ccc; border-radius: 4px;">
                    <button onclick="envoyerCommentaire(${doc.id})" style="background: #0056b3; color: white; border: none; padding: 6px 10px; border-radius: 4px; font-size: 0.85rem; cursor: pointer; font-weight: bold;">Envoyer</button>
                </div>
            </div>
        `;
        
        docList.appendChild(carte);
        chargerCommentaires(doc.id);
    });

    afficherPaginationHTML(totalPages);
}

// --- PAGINATION ---
function afficherPaginationHTML(totalPages) {
    let paginationContainer = document.getElementById('pagination-container');
    
    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.id = 'pagination-container';
        paginationContainer.style.display = 'flex';
        paginationContainer.style.justifyContent = 'center';
        paginationContainer.style.alignItems = 'center';
        paginationContainer.style.gap = '15px';
        paginationContainer.style.margin = '30px 0';
        
        const documentsSection = document.querySelector('.documents-section');
        if(documentsSection) documentsSection.appendChild(paginationContainer);
    }

    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    paginationContainer.innerHTML = `
        <button id="btn-precedent" ${pageActuelle === 1 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : 'style="cursor: pointer;"'} style="padding: 8px 16px; background-color: #0056b3; color: white; border: none; border-radius: 4px; font-weight: bold;">
            ← Précédent
        </button>
        <span style="font-weight: bold; color: #333;">Page ${pageActuelle} sur ${totalPages}</span>
        <button id="btn-suivant" ${pageActuelle === totalPages ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : 'style="cursor: pointer;"'} style="padding: 8px 16px; background-color: #0056b3; color: white; border: none; border-radius: 4px; font-weight: bold;">
            Suivant →
        </button>
    `;

    document.getElementById('btn-precedent').addEventListener('click', () => {
        if (pageActuelle > 1) {
            pageActuelle--;
            filtrerEtAfficher();
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }
    });

    document.getElementById('btn-suivant').addEventListener('click', () => {
        if (pageActuelle < totalPages) {
            pageActuelle++;
            filtrerEtAfficher();
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }
    });
}

function supprimerPaginationHTML() {
    const paginationContainer = document.getElementById('pagination-container');
    if (paginationContainer) {
        paginationContainer.innerHTML = '';
    }
}