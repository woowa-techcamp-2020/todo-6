import { postAddCard } from '../apis';
import { newCardArea } from '../components/newCardArea';

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

// 카드 입력 레이어에 인렵 후 Add버튼 클릭시 서버로 데이터 보내기
const listHandler = function (e) {
    const cur = e.target.className;
    if (curTarget === 'list') {
        const cardsWrap = getCardWarp(this); // this 사용해서 현재 리스트의 cards-wrap 잡음
        const canAreaAdd = cardsWrap.firstChild.className === 'card';
        if (canAreaAdd) {
            cardsWrap.insertBefore(newArea(), cardsWrap.firstChild);
        }
    }
};

export const cardAddBtnClickHandler = (e) => {
    listHandler();

    // const inputCardContentsEl = e.target.parentNode.previousSibling;
    // console.log(e.target.parentNode.previousSibling);
    // // 이벤트 전파로 list돔 잡아서 그 list의 ID잡아오기
    // // 서버에서 보낼내용들을 객체에 담음
    // const newCard = { listID, cardText: inputCardContentsEl.value };
    //
    // // todo : DB에 입력값 저장요청 post api쏘기
    // postAddCard(newCard.cardText); // 얘안테온 응답값으로 돔 그리기(카드 추가)
    // // 전체 리랜더링 하지말것 추가된 부분만 그리기
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
