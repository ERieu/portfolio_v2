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
    const timelineCards = document.querySelectorAll('.timeline-card');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const progressLine = document.querySelector('.progress-line');
    
    let currentIndex = 0;
    
    function updateTimeline(index) {
      timelinePoints.forEach((point, i) => {
        point.classList.toggle('active', i === index);
      });
      
      timelineCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
      });
      
      progressLine.style.width = `${index * 50}%`;
      
      prevArrow.disabled = index === 0;
      nextArrow.disabled = index === timelinePoints.length - 1;
      
      currentIndex = index;
    }
    
    timelinePoints.forEach((point, index) => {
      point.addEventListener('click', () => updateTimeline(index));
    });
    
    prevArrow.addEventListener('click', () => {
      if (currentIndex > 0) updateTimeline(currentIndex - 1);
    });
    
    nextArrow.addEventListener('click', () => {
      if (currentIndex < timelinePoints.length - 1) updateTimeline(currentIndex + 1);
    });
  });