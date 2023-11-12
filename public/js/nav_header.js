const menu = document.querySelector('.nav__menu');
const hamburger = document.querySelector('#nav__hamburger');

// Toggle menu on hamburger click
hamburger.addEventListener('click', function() {
    menu.classList.toggle('active');
    if (menu.classList.contains('active')) {
        hamburger.innerText = 'X';
    } else {
        hamburger.innerText = '☰';
    }
});


// Reset menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth >= 751) {
        hamburger.innerText = '☰';
        menu.classList.remove('active');
    } else {
        hamburger.innerText = '☰';
        menu.classList.remove('active'); 
    }
});

