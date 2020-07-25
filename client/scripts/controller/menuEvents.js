const menuSection = document.getElementById('menu-section');
const menuBtn = document.querySelector('#menu-btn');
const menuCloseBtn = document.querySelector('.menu-close-btn');

menuBtn.addEventListener('click', () => {
    menuSection.style.display = 'block';
});

menuCloseBtn.addEventListener('click', () => {
    menuSection.style.display = 'none';
});
