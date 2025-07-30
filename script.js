/* ==========================================================================
   Table des matières :
   1. Menu Hamburger Mobile
   2. Année dynamique dans le Footer
   3. Filtre du Portfolio (Isotope)
   4. Liens de navigation actifs au défilement
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

    /* =================================================== */
    /* 1. MENU HAMBURGER MOBILE                            */
    /* =================================================== */
    // Sélectionne les éléments du DOM nécessaires
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Ajoute un écouteur d'événement au clic sur le hamburger
    hamburger.addEventListener('click', () => {
        // Ajoute/retire la classe 'active' pour afficher/masquer le menu
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Ajoute un écouteur à chaque lien du menu pour fermer le menu lors du clic
    navLinks.forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));


    /* =================================================== */
    /* 2. ANNÉE DYNAMIQUE DANS LE FOOTER                   */
    /* =================================================== */
    // Met à jour automatiquement l'année du copyright
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    /* =================================================== */
    /* 3. FILTRE DU PORTFOLIO                              */
    /* =================================================== */
    // Note : Pour une performance optimale avec de nombreuses images,
    // une librairie comme Isotope.js est recommandée. Voici une version simple en pur JS.
    const filterContainer = document.querySelector('.portfolio-filters');
    const galleryItems = document.querySelectorAll('.portfolio-item');

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            // S'assure que l'on clique bien sur un bouton
            if (e.target.classList.contains('filter-btn')) {
                
                // Gère la classe 'active' sur les boutons de filtre
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                // Récupère la catégorie du filtre
                const filterValue = e.target.getAttribute('data-filter');

                // Parcourt tous les éléments de la galerie
                galleryItems.forEach(item => {
                    // Affiche l'élément s'il correspond au filtre, sinon le cache
                    if (item.classList.contains(filterValue.substring(1)) || filterValue === '*') {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    }


    /* =================================================== */
    /* 4. LIENS DE NAVIGATION ACTIFS AU DÉFILEMENT         */
    /* =================================================== */
    // Met en surbrillance le lien du menu correspondant à la section visible à l'écran
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Calcule la position de la section avec un décalage
            const sectionTop = current.offsetTop - 100;
            let sectionId = current.getAttribute('id');
            
            // Si la position de défilement est dans la plage de la section
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Ajoute la classe 'active' au lien de navigation correspondant
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
            } else {
                // Retire la classe 'active' des autres liens
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    });

});
