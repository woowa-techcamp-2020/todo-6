import '../scss/index.scss';
import '../scss/reset.scss';
import '../scss/cardModal.scss';
import '../scss/listModal.scss';
import '../scss/menu.scss';
import './controller/menuEvents';
import { initPage, putUpdateList } from './apis';
import { assignElements, elements } from './utils/createdElements';
import CardHandler from './controller/cardHandler';

// card nodes
const cardModalSection = document.getElementById('card-modal-section');
const cardModalCloseBtn = document.querySelector('.card-modal-close-btn');
const cardModalSaveBtn = document.querySelector('.card-modal-save-btn');
const cardHandler = new CardHandler();
const cardModalInput = document.querySelector('.card-modal-input');

// list nodes
const listModalSection = document.getElementById('list-modal-section');
const listModalCloseBtn = document.querySelector('.list-modal-close-btn');
const listModalUpdateBtn = document.querySelector('.list-modal-update-btn');
const listModalInput = document.querySelector('.list-modal-input');
const listDeleteBtn = document.querySelector('.list-delete-btn');

// card events
cardModalCloseBtn.addEventListener('click', () => {
    cardModalSection.style.display = 'none';
});

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

// card events
listModalCloseBtn.addEventListener('click', () => {
    listModalSection.style.display = 'none';
});

listModalUpdateBtn.addEventListener('click', () => {
    const listID = elements.list.getAttribute('data-listid');
    const listName = listModalInput.value;
    console.log(listName);
    putUpdateList({ listID, listName })
        .then(() => {
            elements.list.querySelector('.list-title').value = listName;
            listModalSection.style.display = 'none';
            // 업뎃이 화면에 바로 반영이 아직 안된다.
        });
});

initPage();
assignElements();
