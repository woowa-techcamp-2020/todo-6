import '../scss/index.scss';
import '../scss/reset.scss';
import '../scss/cardModal.scss';
import '../scss/listModal.scss';
import '../scss/menu.scss';
import './controller/menuEvents';
import { initPage, putUpdateList, postAddList } from './apis';
import { assignElements, elements } from './utils/states';
import CardHandler from './controller/cardHandler';
import { initEvents } from './initEvents';
import { newList } from './components/newList';

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
const listsWrap = document.querySelector('.lists-wrap');

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
    // console.log(listName);
    putUpdateList({ listID, listName })
        .then(() => {
            elements.list.querySelector('.list-title').value = listName;
            listModalSection.style.display = 'none';
            // 업뎃이 화면에 바로 반영이 아직 안된다.
        });
});

const addList = document.querySelector('.add-list-btn');
addList.addEventListener('click', () => {
    const listName = prompt('새 리스트의 이름을 입력해 주세요');
    postAddList({ userID: 1, listName }).then((res) => {
        // console.log(newList(res));
        listsWrap.insertBefore(newList(res), addList);
    });
});

initPage();
initEvents();
assignElements();
