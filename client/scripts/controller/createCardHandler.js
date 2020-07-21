import { postAddCard } from '../apis';
import { newCardArea } from '../components/newCardArea';
import { newCard } from '../components/card';
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
    const listID = e.path.filter((node) => node.className === 'list')[0].getAttribute('data-id');
    const inputCardContentsEl = e.target.parentNode.previousSibling;
    const newCardInfo = { listID, cardText: inputCardContentsEl.value };

    // post api 후 ui 에도 새 카드 추가
    postAddCard(newCardInfo).then((res) => {
        const card = newCard(res);
        const cardsWrap = e.target.closest('.cards-wrap');
        cardsWrap.insertBefore(card, cardsWrap.firstCard);
        cardsWrap.firstChild.firstChild.value = '';
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

        if (cardsWrap.firstChild.classList[0] === 'card') {
            cardsWrap.insertBefore(newCardArea(), cardsWrap.firstChild);
        } else {
            cardsWrap.removeChild(cardsWrap.firstChild);
        }
    }
};
