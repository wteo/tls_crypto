
document.querySelectorAll('.accordion__item').forEach(item => {
    item.addEventListener('click', () => {

        const header = item.querySelector('.accordion__header');
        const content = item.querySelector('.accordion__content');
        const icon = header.querySelector('i');
        console.log(header);

        if(header.classList.contains('active')) {
            header.classList.remove('active');
            content.classList.remove('active');
            icon.innerText = '+';
        } else {
            header.classList.add('active');
            content.classList.add('active');
            icon.innerText = '-';
        }
    });
});