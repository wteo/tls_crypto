// Toggle menu on hamburger click
document.querySelector('.nav__hamburger').addEventListener('click', function() {
    const menu = document.querySelector('.nav__menu');
    menu.classList.toggle('active');
});


// Reset menu on window resize
window.addEventListener('resize', function() {
    const menu = document.querySelector('.nav__menu');
    if (window.innerWidth >= 751) {
        menu.classList.remove('active');
    } else {
        menu.classList.remove('active'); 
    }
});

