document.addEventListener('DOMContentLoaded', function() {
    var ancres = document.querySelectorAll('.ancre-contact');

    ancres.forEach(function(ancre){
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
});
    
