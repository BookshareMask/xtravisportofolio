/* ==========================================================================
   Table des matières :
   1. Menu Hamburger Mobile
   2. Année dynamique dans le Footer
   3. Filtre du Portfolio
   4. Liens de navigation actifs au défilement
   5. Logique du formulaire de contact avec EmailJS
   6. Gestion de la modale vidéo (MODIFIÉE POUR VIMEO)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ... (Tout le code des sections 1 à 5 reste identique) ...
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
    /* 5. LOGIQUE DU FORMULAIRE DE CONTACT AVEC EMAILJS (inchangé)       */
    /* ================================================================= */
    (function() {
        emailjs.init({ publicKey: "w01jIYDLYupLg0XXv" });
    })();
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            emailjs.sendForm('service_ruxg9a6', 'template_iocmjcd', this)
                .then(function() {
                    alert('Message envoyé avec succès !');
                    contactForm.reset();
                }, function(error) {
                    alert('Une erreur est survenue. Veuillez réessayer.');
                    console.error('ERREUR EMAILJS :', error);
                });
        });
    }

    /* =================================================== */
    /* 6. MODIFIÉ : GESTION DE LA MODALE POUR VIMEO        */
    /* =================================================== */
    
    const modal = document.querySelector('.modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalContent = document.querySelector('.modal-content');
    const closeModalBtn = document.querySelector('.close-modal');
    
    const videoTriggers = document.querySelectorAll('.portfolio-item.motion, .portfolio-item.video');

    function openModal(embedSrc) {
        // MODIFIÉ : On crée un iframe pour Vimeo au lieu d'une balise video.
        // Les attributs 'allow' sont importants pour le plein écran et l'autoplay.
        modalContent.innerHTML = `<iframe src="${embedSrc}&autoplay=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        modal.classList.add('active');
        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
        modalContent.innerHTML = '';
    }

    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const embedPath = trigger.getAttribute('data-video-src');
            if (embedPath) {
                openModal(embedPath);
            }
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

});
