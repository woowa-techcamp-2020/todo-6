import {button, div, textarea} from "../utils/element";

// 카드 인풋레이어에 입력시 Add 버튼 활성화
const writeTextArea = (e) => {
  const inputCardContents = e.target.value;
  const addBtn = e.target.nextSibling.childNodes[0];

  if (inputCardContents.length >= 1 && inputCardContents.length < 500) {
    addBtn.removeAttribute('disabled');
  } else {
    addBtn.setAttribute('disabled', 'true');
  }
};

// 카드 입력 레이어에 인렵 후 Add버튼 클릭시 서버로 데이터 보내기
const cardAddBtnClickHandler = (e) => {
  const inputCardContents = e.target.parentNode.previousSibling.value
  // todo : DB에 입력값 저장요청 post api쏘기
  // 현재 컬럼의 위치와 전송해야하는데 그것을 어떻게 알려주면 좋을까?
};

// cancel 버튼 클릭시 카드생성 취소
const cancelAddCardHandler = (e) => {
  const createCardArea = e.target.parentNode.parentNode;
  createCardArea.parentNode.removeChild(createCardArea)

}

// 카드입력 레이어 열기
const newCardArea = () => div(
  {className: 'create-card-area', },
  textarea({
    className: 'input-card-contents', placeholder: 'Enter a note', maxLength: '500',oninput: writeTextArea
  }),
  div({className: 'btn-wrap'},
    button({className: 'add-btn', disabled: true, onclick: cardAddBtnClickHandler}, 'Add'),
    button({className: 'cancel-btn', onclick: cancelAddCardHandler}, 'Cancel')),
);

// 현재 리스트 내의 card-wrap 잡기
const getCardWarp = (node) => node.childNodes[1].firstChild;

export const createCardBtnHandler = function (e) {
  if (e.target.className === 'add-card-btn') {
    const cardsWrap = getCardWarp(this);
    const canAreaAdd = cardsWrap.firstChild.className === 'card';
    if (canAreaAdd) {
      cardsWrap.insertBefore(newCardArea(), cardsWrap.firstChild);
    } else {
      cardsWrap.removeChild(cardsWrap.firstChild)
    }
  }
};
