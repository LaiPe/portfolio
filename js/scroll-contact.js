document.addEventListener('DOMContentLoaded', function() {
    // Sélectionne le lien d'ancrage
    var ancre = document.getElementById('ancre-contact');

    // Ajoute un écouteur d'événements pour le clic
    ancre.addEventListener('click', function(event) {
        // Empêche le comportement par défaut du lien (ne pas recharger la page)
        event.preventDefault();

        // Récupère la hauteur totale de la page
        var hauteurPage = document.body.scrollHeight;

        // Fait défiler la page jusqu'en bas
        window.scrollTo({
            top: hauteurPage,
            behavior: 'smooth' // Défilement fluide
        });
    });
});
