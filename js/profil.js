const textes = [];
textes.push("profil \"Léo Peyronnet\"");
textes.push("competences \"Léo Peyronnet\"");
textes.push("autres \"Léo Peyronnet\"");

const intervalMin = 50; // Intervalle de temps minimal entre chaque caractère (en millisecondes)
const intervalMax = 200; // Intervalle de temps maximal entre chaque caractère (en millisecondes)

const commandes = [];
commandes.push(document.getElementById("commande_1"));
commandes.push(document.getElementById("commande_2"));
commandes.push(document.getElementById("commande_3"));
commandes.push(document.getElementById("commande_4"));

const reponses = [];
reponses.push(document.getElementById("reponse_1"));
reponses.push(document.getElementById("reponse_2"));
reponses.push(document.getElementById("reponse_3"));


function afficherCaractereSuivant(texte, commande, i, callback) {
    if (i < texte.length) {
        commande.textContent += texte.charAt(i);
        i++;
        const interval = Math.random() * (intervalMax - intervalMin) + intervalMin;
        setTimeout(afficherCaractereSuivant, interval, texte, commande, i, callback);
    } else {
        if (typeof callback === 'function') {
            callback(); // Appeler la fonction de rappel une fois l'animation terminée
        }
    }
}

function afficherReponse(reponse) {
    if (reponse.tagName == "LI"){
        reponse.style.display = "list-item";

    } else {
        reponse.style.display = "block";
    }

    // Parcourir tous les enfants de l'élément
    const enfants = reponse.children;
    for (let i = 0; i < enfants.length; i++) {
        const enfant = enfants[i];
        // Appeler récursivement la fonction pour chaque enfant
        afficherReponse(enfant);
    }
}

function cacherCurseur(commande, i){
    commande.style.setProperty("--affichCurseur"+i, "none");
}

function afficherBloc(i, callback) {
    commandes[i].style.display = "block";
    setTimeout(function() {
        afficherCaractereSuivant(textes[i], commandes[i], 0, function() {
            setTimeout(function() {
                afficherReponse(reponses[i]);
                cacherCurseur(commandes[i], i + 1);
                commandes[i + 1].style.display = "block";
                if (typeof callback === 'function') {
                    callback(); // Appeler la fonction de rappel une fois l'animation terminée
                }
            }, 1000);
        });
    }, 1000);
}

function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // L'élément est visible dans la vue (viewport)
            afficherBloc(0, function() {
                afficherBloc(1, function(){
                    afficherBloc(2);
                });
            });
            // Une fois que votre script est exécuté, vous pouvez arrêter l'observation si nécessaire
            observer.unobserve(entry.target);
        }
    });
}

const options = {
    root: null, // Utilise la fenêtre comme racine de l'observation
    rootMargin: '0px', // Aucune marge supplémentaire
    threshold: 0.5 // Déclenche l'observation lorsque 50% de l'élément est visible
};

const observer = new IntersectionObserver(handleIntersection, options);

const elementCible = document.getElementById("console");
observer.observe(elementCible);

