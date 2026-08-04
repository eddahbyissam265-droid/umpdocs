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