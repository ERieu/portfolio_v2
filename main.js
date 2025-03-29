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