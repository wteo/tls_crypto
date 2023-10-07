// Toggle menu on hamburger click
document.querySelector('.nav__hamburger').addEventListener('click', function() {
    const menu = document.querySelector('.nav__menu');
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'flex' : 'none';
});

// Reset menu on window resize
window.addEventListener('resize', function() {
    const menu = document.querySelector('.nav__menu');
    if (window.innerWidth >= 751) {
        menu.style.display = 'flex'; // Show menu on desktop
    } else {
        menu.style.display = 'none'; // Hide menu on mobile
    }
});

