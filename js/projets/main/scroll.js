const viewportHeight = window.innerHeight; //hauteur de la fenêtre (100vh)

const element = document.querySelector(':root');
const computedStyle = window.getComputedStyle(element);
let hauteurHeader = parseFloat(computedStyle.getPropertyValue('--size-header')); //hauteur du header (x vh)

hauteurHeader = viewportHeight * (hauteurHeader) / 100; //conversion vh en px

function smoothScroll(target, duration) {
    const targetPosition = target.offsetTop - hauteurHeader;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    function animation(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    // Fonction d'interpolation
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Utilisation de la fonction smoothScroll
const scrollSokoban = document.getElementById('scroll-sokoban');
const targetSokoban = document.getElementById('article-sokoban');
const scrollJazzCom = document.getElementById('scroll-jazz-com');
const targetJazzCom = document.getElementById('article-jazz-com');
const scrollLRDA = document.getElementById('scroll-lrda');
const targetLRDA = document.getElementById('article-lrda');

scrollSokoban.addEventListener('click', function() {
    smoothScroll(targetSokoban, 1000);
});

scrollJazzCom.addEventListener('click', function() {
    smoothScroll(targetJazzCom, 1000);
});

scrollLRDA.addEventListener('click', function() {
    smoothScroll(targetLRDA, 1000);
});