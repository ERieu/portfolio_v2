// header and footer
function loadComponent(url, targetId) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Erreur de chargement (${response.status})`);
            return response.text();
        })
        .then(data => {
            document.getElementById(targetId).innerHTML = data;
        })
        .catch(error => {
            console.error(`Problème de chargement du composant: ${error}`);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header.html', 'header');
    loadComponent('footer.html', 'footer');
});

// Fonction pour ajouter un fond au header lors du défilement
window.addEventListener('scroll', function() {
    const header = document.querySelector('header.navbar');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});