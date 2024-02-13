document.addEventListener("DOMContentLoaded", function() {
    function handleIntersection(entries, observer) {
        const nav_projets = document.getElementById("nav_projets");
        const nav_apropos = document.getElementById("nav_apropos");
        const nav_contact = document.getElementById("nav_contact");
        
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // L'élément est visible dans la vue (viewport)
                if (nav_projets.classList.contains("selected")){
                    nav_projets.classList.remove("selected");
                }
                if (nav_apropos.classList.contains("selected")){
                    nav_apropos.classList.remove("selected");
                }
    
                if (!nav_contact.classList.contains("selected"))
                nav_contact.classList.add("selected");
            }
            else if (!entry.isIntersecting) {
        
                if (nav_contact.classList.contains("selected")){
                    nav_contact.classList.remove("selected");
                }
                
                if (nav_projets.classList.contains("page-subject")){
                    nav_projets.classList.add("selected");
                }
                if (nav_apropos.classList.contains("page-subject")){
                    nav_apropos.classList.add("selected");
                }
            }
        });
    }

    const options = {
        root: null, // Utilise la fenêtre comme racine de l'observation
        rootMargin: '0px', // Aucune marge supplémentaire
        threshold: 0.5 // Déclenche l'observation lorsque 50% de l'élément est visible
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const elementCible = document.getElementById("feuille-contact");
    observer.observe(elementCible);
});


