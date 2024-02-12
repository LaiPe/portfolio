const ancre_malt = document.getElementById('chg-malt');
const ancre_fiverr = document.getElementById('chg-fiverr');

ancre_malt.addEventListener('mouseenter', () => {
    const imgMalt = document.getElementById('logo-malt');
    imgMalt.src = './img/icons/malt_logo_color.png';
});
ancre_malt.addEventListener('mouseleave', () => {
    const imgMalt = document.getElementById('logo-malt');
    imgMalt.src = './img/icons/malt_logo_white.png';
});

ancre_fiverr.addEventListener('mouseenter', () => {
    const imgFiverr = document.getElementById('logo-fiverr');
    imgFiverr.src = './img/icons/fiverr_logo_color.png';
});
ancre_fiverr.addEventListener('mouseleave', () => {
    const imgFiverr = document.getElementById('logo-fiverr');
    imgFiverr.src = './img/icons/fiverr_logo_white.png';
});
