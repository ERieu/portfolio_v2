// header and footer
function loadComponent(url, targetId) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Erreur de chargement (${response.status})`);
            return response.text();
        })
        .then(data => {
            document.getElementById(targetId).innerHTML = data;
            
            // Si c'est le header qui vient d'être chargé, on applique la logique de navigation active
            if (targetId === 'header') {
                setActiveNavLink();
            }
        })
        .catch(error => {
            console.error(`Problème de chargement du composant: ${error}`);
        });
}

// Fonction pour définir le lien actif dans la navigation
function setActiveNavLink() {
    // Obtenir le chemin de la page actuelle
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Sélectionner tous les liens de navigation
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Retirer la classe 'active' de tous les liens
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });
    
    // Ajouter la classe 'active' au lien correspondant à la page actuelle
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
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

document.addEventListener('DOMContentLoaded', function() {
    const timelinePoints = document.querySelectorAll('.timeline-point');
    const timelineMiniPoints = document.querySelectorAll('.timeline-point-mini');
    const allPoints = [...document.querySelectorAll('.timeline-point, .timeline-point-mini')];
    const timelineCards = document.querySelectorAll('.timeline-card');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const progressLine = document.querySelector('.progress-line');
    
    let currentIndex = 0;
    
    function updateTimeline(index) {
      // Mise à jour des points principaux
      timelinePoints.forEach((point, i) => {
        point.classList.toggle('active', getMainPointIndex(index) === i);
      });
      
      // Mise à jour des mini points
      timelineMiniPoints.forEach((point, i) => {
        const miniPointIndex = timelinePoints.length + i;
        point.classList.toggle('active', index === miniPointIndex);
      });
      
      // Mise à jour des cartes (uniquement pour les points principaux)
      if (isMainPoint(index)) {
        timelineCards.forEach((card, i) => {
          card.classList.toggle('active', getMainPointIndex(index) === i);
        });
      }
      
      // Mise à jour de la ligne de progression (25% par mini-point)
      const progressPercentage = (index / (allPoints.length - 1)) * 100;
      progressLine.style.width = `${progressPercentage}%`;
      
      // Activation/désactivation des flèches
      prevArrow.disabled = index === 0;
      nextArrow.disabled = index === allPoints.length - 1;
      
      currentIndex = index;
    }
    
    // Fonction pour vérifier si l'index correspond à un point principal
    function isMainPoint(index) {
      return index < timelinePoints.length || index % 2 === 0;
    }
    
    // Fonction pour obtenir l'index du point principal correspondant
    function getMainPointIndex(index) {
      if (index < timelinePoints.length) return index;
      // Pour les mini-points, déterminer à quel point principal ils sont associés
      return Math.floor(index / 2);
    }
    
    // Ajout d'écouteurs d'événements pour tous les points
    allPoints.forEach((point, index) => {
      point.addEventListener('click', () => {
        updateTimeline(index);
        
        // Si c'est un mini-point, afficher la carte du point principal le plus proche
        if (!isMainPoint(index)) {
          const mainPointIndex = index < timelinePoints.length ? index : Math.ceil(index / 2);
          
          timelineCards.forEach((card, i) => {
            card.classList.toggle('active', i === mainPointIndex);
          });
        }
      });
    });
    
    // Gestion des flèches
    prevArrow.addEventListener('click', () => {
      if (currentIndex > 0) updateTimeline(currentIndex - 1);
    });
    
    nextArrow.addEventListener('click', () => {
      if (currentIndex < allPoints.length - 1) updateTimeline(currentIndex + 1);
    });
    
    // Initialisation
    updateTimeline(0);
});