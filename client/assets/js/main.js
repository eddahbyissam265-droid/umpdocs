// On attend que la page soit complètement chargée
document.addEventListener('DOMContentLoaded', () => {
    fetchDocuments();
});

// Fonction pour récupérer et afficher les documents
async function fetchDocuments() {
    const grid = document.getElementById('documentsGrid');
    
    // Message d'attente pendant que le serveur cherche
    grid.innerHTML = '<p style="text-align:center; grid-column: 1 / -1;">⏳ Chargement des documents en cours...</p>';

    try {
        // On interroge ton serveur (qui va lui-même interroger Supabase)
        const response = await fetch('/api/documents');
        
        if (!response.ok) {
            throw new Error('Erreur de connexion au serveur');
        }
        
        const documents = await response.json();
        
        // On vide le message de chargement
        grid.innerHTML = '';

        // Si la base de données est vide
        if (documents.length === 0) {
            grid.innerHTML = '<p style="text-align:center; grid-column: 1 / -1;">Aucun document n\'est encore disponible. Soyez le premier à en ajouter un !</p>';
            return;
        }

        // On crée une belle carte pour chaque document trouvé
        documents.forEach(doc => {
            const card = document.createElement('div');
            card.className = 'document-card';
            
            card.innerHTML = `
                <div class="card-icon">📄</div>
                <h3 class="card-title">${doc.title}</h3>
                <span class="card-badge">${doc.module}</span>
                <div class="card-actions">
                    <a href="${doc.file_path}" target="_blank" class="btn-view">Consulter le PDF</a>
                </div>
            `;
            
            grid.appendChild(card);
        });

    } catch (error) {
        console.error('Erreur:', error);
        grid.innerHTML = '<p style="color: red; text-align:center; grid-column: 1 / -1;">❌ Impossible de charger les documents pour le moment.</p>';
    }
}