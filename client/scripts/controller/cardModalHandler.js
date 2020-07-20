export const showCardModalHandler = (e) => {
    const cardModalSection = document.getElementById('card-modal-section');
    cardModalSection.style.display = 'block';

    const cardModalInput = document.querySelector('.card-modal-input');
    cardModalInput.innerText = e.target.textContent;

    const cardModalCloseBtn = document.querySelector('.card-modal-close-btn');
    cardModalCloseBtn.addEventListener('click', () => {
        cardModalSection.style.display = 'none';
    });
};
