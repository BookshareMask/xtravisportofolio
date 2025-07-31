/* ==========================================================================
   Table des matières :
   1. Menu Hamburger Mobile
   2. Année dynamique dans le Footer
   3. Filtre du Portfolio
   4. Liens de navigation actifs au défilement
   5. NOUVEAU : Logique du formulaire de contact avec EmailJS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

    /* =================================================== */
    /* 1. MENU HAMBURGER MOBILE (inchangé)                 */
    /* =================================================== */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    /* =================================================== */
    /* 2. ANNÉE DYNAMIQUE DANS LE FOOTER (inchangé)        */
    /* =================================================== */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* =================================================== */
    /* 3. FILTRE DU PORTFOLIO (inchangé)                   */
    /* =================================================== */
    const filterContainer = document.querySelector('.portfolio-filters');
    const galleryItems = document.querySelectorAll('.portfolio-item');

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                const filterValue = e.target.getAttribute('data-filter');
                galleryItems.forEach(item => {
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
    /* 4. LIENS DE NAVIGATION ACTIFS AU DÉFILEMENT (inchangé) */
    /* =================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            let sectionId = current.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    });


    /* ================================================================= */
    /* 5. NOUVEAU : LOGIQUE DU FORMULAIRE DE CONTACT AVEC EMAILJS        */
    /* ================================================================= */
    
    // On initialise EmailJS avec votre Clé Publique
    (function() {
        emailjs.init({
          publicKey: "w01jIYDLYupLg0XXv", // <-- Remplacez par VOTRE Public Key
        });
    })();

    // On sélectionne le formulaire et on ajoute un écouteur d'événement
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // On empêche le comportement par défaut du formulaire (qui est de recharger la page)
            event.preventDefault();

            // On utilise la méthode sendForm de EmailJS
            emailjs.sendForm('service_ruxg9a6', 'template_iocmjcd', this)
                .then(function() {
                    // Ce code s'exécute si l'email est envoyé avec succès
                    alert('Message envoyé avec succès !');
                    // On vide les champs du formulaire
                    contactForm.reset();
                }, function(error) {
                    // Ce code s'exécute s'il y a une erreur
                    alert('Une erreur est survenue. Veuillez réessayer.');
                    console.error('ERREUR EMAILJS :', error);
                });
        });
    }

});
