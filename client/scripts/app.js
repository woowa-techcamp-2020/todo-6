import '../scss/index.scss';
import '../scss/reset.scss';
import '../scss/cardModal.scss';
import '../scss/listModal.scss';
import '../scss/menu.scss';
import './controller/menuEvents';
import { initPage } from './apis';
import { assignElements, elements } from './utils/createdElements';
import CardHandler from './controller/cardHandler';

const cardModalSection = document.getElementById('card-modal-section');
const cardModalCloseBtn = document.querySelector('.card-modal-close-btn');
const cardModalSaveBtn = document.querySelector('.card-modal-save-btn');
const cardHandler = new CardHandler();
const cardModalInput = document.querySelector('.card-modal-input');

cardModalCloseBtn.addEventListener('click', () => {
    cardModalSection.style.display = 'none';
});

// save click
cardModalSaveBtn.addEventListener('click', () => {
    const { card } = elements;
    const listID = card.getAttribute('data-listid');
    const cardID = card.getAttribute('data-cardid');
    const cardText = cardModalInput.value;
    const updatedCardObj = { listID, cardID, cardText };

    cardHandler.clickCardSaveBtn(updatedCardObj);
    cardModalSection.style.display = 'none';
    elements.card = null;
});

initPage();
assignElements();
