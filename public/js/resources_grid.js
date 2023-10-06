// Handling the font-size for each group title
const groups = document.querySelectorAll('.coin__resources-group');

groups.forEach((group, index) => {
    if (index === 0) {
        group.style.fontSize = '3rem';
        group.style.right = '50px';
    } else {
        group.style.fontSize = '1.2rem';
    }
});