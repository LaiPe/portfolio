function afficherCaractereSuivant(texte, commande, i, callback) {
    const intervalMin = 50; // Intervalle de temps minimal entre chaque caractère (en millisecondes)
    const intervalMax = 200; // Intervalle de temps maximal entre chaque caractère (en millisecondes)
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
let spanTitle = document.getElementById("card-title");
afficherCaractereSuivant("Envoyez moi un message",spanTitle ,0);