// Récupération des références des éléments de la page par tuille
const tuilleLrda = {
    open: document.getElementById('open-lrda'),
    close: document.getElementById('close-lrda'),
    couverture: document.querySelector("#la-reussite-des-alliances .couverture")
};
const tuilleSokoban = {
    open: document.getElementById('open-sokoban'),
    close: document.getElementById('close-sokoban'),
    couverture: document.querySelector("#sokoban .couverture")
};
const tuilleJazzCom = {
    open: document.getElementById('open-jazz-com'),
    close: document.getElementById('close-jazz-com'),
    couverture: document.querySelector("#jazz-com .couverture")
};

// Fonctions métier
function cochageOpen(tuille) {
    if (tuille.open.checked) {
        tuille.close.checked = false;
    }
}
function cochageClose(tuille) {
    if (tuille.close.checked) {
        tuille.open.checked = false;
    }
}

function ouverture(tuille){
    if (tuille.open.checked) {
        tuille.couverture.classList.remove('fermee');
        tuille.couverture.classList.add('ouverte');
    }
}
function fermeture(tuille){
    if (tuille.close.checked) {
        tuille.couverture.classList.remove('ouverte');
        tuille.couverture.classList.add('fermee');
    }
}




// Ajout des écouteurs d'événements sur les checkboxes
tuilleLrda.open.addEventListener('change', function() {
    cochageOpen(tuilleLrda);
    ouverture(tuilleLrda);
});
tuilleLrda.close.addEventListener('change', function() {
    cochageClose(tuilleLrda);
    fermeture(tuilleLrda);
});

tuilleSokoban.open.addEventListener('change', function() {
    cochageOpen(tuilleSokoban);
    ouverture(tuilleSokoban);
});
tuilleSokoban.close.addEventListener('change', function() {
    cochageClose(tuilleSokoban);
    fermeture(tuilleSokoban);
});

tuilleJazzCom.open.addEventListener('change', function() {
    cochageOpen(tuilleJazzCom);
    ouverture(tuilleJazzCom);
});
tuilleJazzCom.close.addEventListener('change', function() {
    cochageClose(tuilleJazzCom);
    fermeture(tuilleJazzCom);
});