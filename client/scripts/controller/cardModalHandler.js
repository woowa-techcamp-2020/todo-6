import CardHandler from './cardHandler';

const cardHandler = new CardHandler();

export const showCardModalHandler = (e) => {
    const cardModalSection = document.getElementById('card-modal-section');
    cardModalSection.style.display = 'block';

    const cardModalInput = document.querySelector('.card-modal-input');
    cardModalInput.innerText = e.target.textContent;

    const cardModalCloseBtn = document.querySelector('.card-modal-close-btn');
    cardModalCloseBtn.addEventListener('click', () => {
        cardModalInput.innerText = '';
        cardModalSection.style.display = 'none';
    });

    const cardModalSaveBtn = document.querySelector('.card-modal-save-btn');
    const card = e.target.closest('.card');
    const listId = card.getAttribute('data-listid');
    const cardId = card.getAttribute('data-id');

    cardModalSaveBtn.addEventListener('click', () => {
        cardHandler.clickCardSaveBtn(listId, cardId);
    });
};
