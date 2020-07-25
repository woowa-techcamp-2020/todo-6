import { postAddCard, putUpdateOrder } from '../apis';
import { newCardArea } from '../components/newCardArea';
import { newCard } from '../components/card';
import {
    addEventToMenu, eventType, eventTypeID, getListOrdersObj, updateCardCount,
} from '../utils/handleElement';
import { getID, getUserID } from '../utils/handleCookie';
// 카드 인풋레이어에 입력시 Add 버튼 활성화
export const writeTextArea = (e) => {
    const inputCardContents = e.target.value;
    const addBtn = e.target.nextSibling.childNodes[0];

    if (inputCardContents.length > 0 && inputCardContents.length < 500) {
        addBtn.removeAttribute('disabled');
    } else {
        addBtn.setAttribute('disabled', 'true');
    }
};

export const cardAddBtnClickHandler = (e) => {
    const list = e.target.closest('.list');
    const listID = list.getAttribute('data-listid');
    const inputCardContentsEl = e.target.parentNode.previousSibling;
    const cardText = inputCardContentsEl.value;
    const newCardInfo = { listID, cardText: inputCardContentsEl.value };

    postAddCard(newCardInfo).then((res) => {
        const card = newCard(res);
        const cardsWrap = e.target.closest('.cards-wrap');
        if (!cardsWrap.childNodes) {
            cardsWrap.appendChild(card);
        } else {
            cardsWrap.insertBefore(card, cardsWrap.firstChild.nextSibling);
        }
        updateCardCount(list);
        cardsWrap.firstChild.firstChild.value = '';
        e.target.setAttribute('disabled', 'true');
        putUpdateOrder(getListOrdersObj(listID));

        addEventToMenu({
            eventTypeID: eventTypeID.addCard,
            card: cardText,
            list: list.querySelector('.list-title').textContent,
            typeName: eventType.addCard,
        });
    });
};

// cancel 버튼 클릭시 카드생성 취소
export const cancelAddCardHandler = (e) => {
    const createCardArea = e.target.parentNode.parentNode;
    createCardArea.parentNode.removeChild(createCardArea);
};

export const createCardBtnHandler = function (e) {
    if (e.target.className === 'add-card-btn') {
        const cardsWrap = this.parentNode.parentNode.nextSibling.firstChild;
        if (cardsWrap.firstChild === null) {
            cardsWrap.appendChild(newCardArea());
        } else if ((cardsWrap.firstChild.className === 'card')) {
            cardsWrap.insertBefore(newCardArea(), cardsWrap.firstChild);
        } else {
            cardsWrap.removeChild(cardsWrap.firstChild);
        }
    }
};
