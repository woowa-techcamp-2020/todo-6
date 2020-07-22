import CardHandler from './cardHandler';

const cardHandler = new CardHandler();

export const showCardModalHandler = (e) => {
    console.log(e.target);
    const cardModalSection = document.getElementById('card-modal-section');
    const cardModalInput = document.querySelector('.card-modal-input');
    const cardModalCloseBtn = document.querySelector('.card-modal-close-btn');

    cardModalSection.style.display = 'block';
    cardModalInput.value = e.target.textContent;
    cardModalCloseBtn.addEventListener('click', () => {
        // cardModalInput.value = '';
        cardModalSection.style.display = 'none';
    });

    const cardModalSaveBtn = document.querySelector('.card-modal-save-btn');
    const card = e.target.closest('.card');
    const listId = card.getAttribute('data-listid');
    const cardId = card.getAttribute('data-id');

    cardModalSaveBtn.addEventListener('click', () => {
        // cardHandler.clickCardSaveBtn(listId, cardId);
        cardModalInput.value = '';

        cardModalSection.style.display = 'none';
    });
};
