document.addEventListener('DOMContentLoaded', () => {
    chargerDocumentsAdmin();
    chargerRequetesAdmin(); // NOUVEAU : On charge les demandes des étudiants !

    const filiereSelect = document.getElementById('filiere');
    const semestreSelect = document.getElementById('semestre');
    const optionContainer = document.getElementById('option-container');

    function verifierAffichageOption() {
        if (filiereSelect && semestreSelect && optionContainer) {
            if (filiereSelect.value === 'PC-P' && semestreSelect.value === 'Semestre 6') {
                optionContainer.style.display = 'flex';
            } else {
                optionContainer.style.display = 'none';
                const optionPcp = document.getElementById('option-pcp');
                if (optionPcp) optionPcp.value = ''; 
            }
        }
    }

    if (filiereSelect) filiereSelect.addEventListener('change', verifierAffichageOption);
    if (semestreSelect) semestreSelect.addEventListener('change', verifierAffichageOption);

    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const messageDiv = document.getElementById('message');
            messageDiv.textContent = "Envoi du document en cours...";
            messageDiv.style.color = "blue";

            const title = document.getElementById('title').value;
            const category = document.getElementById('category').value;
            const moduleName = document.getElementById('module').value;
            const filiere = filiereSelect.value;
            const semestre = semestreSelect.value;
            const optionPcp = document.getElementById('option-pcp') ? document.getElementById('option-pcp').value : ''; 
            const fileInput = document.getElementById('file');
            
            if (fileInput.files.length === 0) {
                messageDiv.textContent = "Veuillez sélectionner un fichier PDF.";
                messageDiv.style.color = "red";
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', category);
            formData.append('module', moduleName);
            formData.append('filiere', filiere);
            formData.append('semestre', semestre);
            formData.append('option_pcp', optionPcp); 
            formData.append('file', fileInput.files[0]);

            try {
                const reponse = await fetch('http://localhost:3000/api/documents', {
                    method: 'POST',
                    body: formData
                });

                if (reponse.ok) {
                    messageDiv.textContent = "Document ajouté avec succès ! 🎉";
                    messageDiv.style.color = "green";
                    uploadForm.reset();
                    if (optionContainer) optionContainer.style.display = 'none';
                    chargerDocumentsAdmin();
                } else {
                    messageDiv.textContent = "Erreur lors de l'ajout.";
                    messageDiv.style.color = "red";
                }
            } catch (erreur) {
                console.error("Erreur détaillée :", erreur);
                messageDiv.textContent = "Impossible de joindre le serveur.";
                messageDiv.style.color = "red";
            }
        });
    }
});

// --- 1. GESTION DES DOCUMENTS ---
async function chargerDocumentsAdmin() {
    const listeAdmin = document.getElementById('admin-documents-list');
    if (!listeAdmin) return;
    
    try {
        const reponse = await fetch('http://localhost:3000/api/documents');
        const documents = await reponse.json();

        if (documents.length === 0) {
            listeAdmin.innerHTML = '<p>Aucun document dans la base de données.</p>';
            return;
        }

        listeAdmin.innerHTML = '';

        documents.forEach(doc => {
            const ligne = document.createElement('div');
            ligne.style.display = 'flex';
            ligne.style.justifyContent = 'space-between';
            ligne.style.alignItems = 'center';
            ligne.style.padding = '12px';
            ligne.style.border = '1px solid #ddd';
            ligne.style.borderRadius = '6px';
            ligne.style.backgroundColor = '#fdfdfd';
            ligne.style.marginBottom = '8px';

            const infoDiv = document.createElement('div');
            let texteOption = doc.option_pcp ? ` [Option: ${doc.option_pcp}]` : '';
            
            infoDiv.innerHTML = `
                <strong>${doc.title}</strong><br>
                <small style="color: #666;">${doc.filiere} - ${doc.semestre}${texteOption} | Module : ${doc.module} (${doc.category})</small><br>
                <span style="color: #28a745; font-weight: bold; font-size: 0.85rem;">📊 Statistiques : ${doc.downloads} lecture(s)</span>
            `;
            
            const boutonSupprimer = document.createElement('button');
            boutonSupprimer.textContent = 'Supprimer';
            boutonSupprimer.style.backgroundColor = '#dc3545';
            boutonSupprimer.style.color = 'white';
            boutonSupprimer.style.border = 'none';
            boutonSupprimer.style.padding = '8px 14px';
            boutonSupprimer.style.borderRadius = '4px';
            boutonSupprimer.style.cursor = 'pointer';
            boutonSupprimer.style.fontWeight = 'bold';

            boutonSupprimer.addEventListener('click', () => {
                supprimerDocument(doc.id);
            });

            ligne.appendChild(infoDiv);
            ligne.appendChild(boutonSupprimer);
            listeAdmin.appendChild(ligne);
        });

    } catch (erreur) {
        console.error("Erreur :", erreur);
        listeAdmin.innerHTML = '<p style="color: red;">Erreur de chargement.</p>';
    }
}

async function supprimerDocument(id) {
    if (!confirm("Voulez-vous vraiment supprimer ce document ?")) return;

    try {
        const reponse = await fetch(`http://localhost:3000/api/documents/${id}`, { method: 'DELETE' });
        if (reponse.ok) chargerDocumentsAdmin();
        else alert("Erreur lors de la suppression.");
    } catch (erreur) {
        alert("Impossible de joindre le serveur.");
    }
}

// --- 2. GESTION DES REQUÊTES (NOUVEAU) ---
async function chargerRequetesAdmin() {
    const listeRequetes = document.getElementById('admin-requests-list');
    if (!listeRequetes) return;

    try {
        const reponse = await fetch('http://localhost:3000/api/documents/requests');
        const requetes = await reponse.json();

        if (requetes.length === 0) {
            listeRequetes.innerHTML = '<p style="color: #666; font-style: italic;">Aucune demande pour le moment. Tout est à jour !</p>';
            return;
        }

        listeRequetes.innerHTML = '';

        requetes.forEach(req => {
            const ligne = document.createElement('div');
            ligne.style.display = 'flex';
            ligne.style.justifyContent = 'space-between';
            ligne.style.alignItems = 'center';
            ligne.style.padding = '15px';
            ligne.style.border = '1px solid #b8daff';
            ligne.style.borderRadius = '8px';
            ligne.style.backgroundColor = '#eef6ff'; // Fond bleu clair pour bien les distinguer
            ligne.style.marginBottom = '10px';

            const infoDiv = document.createElement('div');
            infoDiv.innerHTML = `
                <div style="font-size: 0.9rem; color: #555; margin-bottom: 5px;">
                    <strong style="color: #0056b3;">👤 ${req.author}</strong> a demandé :
                </div>
                <div style="font-size: 1.1rem; font-weight: 500; color: #333;">
                    📝 "${req.content}"
                </div>
            `;

            const boutonTraiter = document.createElement('button');
            boutonTraiter.textContent = '✔ Marquer comme traitée';
            boutonTraiter.style.backgroundColor = '#28a745';
            boutonTraiter.style.color = 'white';
            boutonTraiter.style.border = 'none';
            boutonTraiter.style.padding = '8px 15px';
            boutonTraiter.style.borderRadius = '6px';
            boutonTraiter.style.cursor = 'pointer';
            boutonTraiter.style.fontWeight = 'bold';
            boutonTraiter.style.transition = 'transform 0.2s';
            
            boutonTraiter.onmouseover = () => boutonTraiter.style.transform = 'scale(1.05)';
            boutonTraiter.onmouseout = () => boutonTraiter.style.transform = 'scale(1)';

            boutonTraiter.addEventListener('click', () => {
                supprimerRequete(req.id);
            });

            ligne.appendChild(infoDiv);
            ligne.appendChild(boutonTraiter);
            listeRequetes.appendChild(ligne);
        });
    } catch (erreur) {
        console.error("Erreur :", erreur);
        listeRequetes.innerHTML = '<p style="color: red;">Erreur de chargement des requêtes.</p>';
    }
}

async function supprimerRequete(id) {
    try {
        const reponse = await fetch(`http://localhost:3000/api/documents/requests/${id}`, { method: 'DELETE' });
        if (reponse.ok) chargerRequetesAdmin(); // Recharge la liste instantanément
        else alert("Erreur lors de la suppression de la requête.");
    } catch (erreur) {
        alert("Impossible de joindre le serveur.");
    }
}