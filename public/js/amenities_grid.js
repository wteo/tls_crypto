// Handling the font-size for each category title
const categories = document.querySelectorAll('.location__amenities-category');

categories.forEach((category, index) => {
    if (index === 0) {
        category.style.fontSize = '3rem';
        category.style.right = '50px';
    } else {
        category.style.fontSize = '1.2rem';
    }
});