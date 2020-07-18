import {button, div, textarea} from "../utils/element";
import {initPage} from "../app";
import {postAddCard} from "../apis"

// 카드 인풋레이어에 입력시 Add 버튼 활성화
const writeTextArea = (e) => {
  const inputCardContents = e.target.value;
  const addBtn = e.target.nextSibling.childNodes[0];

  if (inputCardContents.length > 0 && inputCardContents.length < 500) {
    addBtn.removeAttribute('disabled');
  } else {
    addBtn.setAttribute('disabled', 'true');
  }
};

const getTimeHandler = () => {
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth();
  const date = currentTime.getDate();

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  return `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`
};

// 카드 입력 레이어에 인렵 후 Add버튼 클릭시 서버로 데이터 보내기
const cardAddBtnClickHandler = (e) => {
  const inputCardContentsEl = e.target.parentNode.previousSibling;
  const registerTime = getTimeHandler();

  // 서버에서 보낼내용들을 객체에 담음
  const newCard = {cardText: inputCardContentsEl.value, createTime: registerTime};

  // todo : DB에 입력값 저장요청 post api쏘기
  // 1. DB에 저장되야할 데이터들-1.카드내용 2.시간저장하기 카드아이디?는 서버에서 정해지는 것 같다.명우님과 얘기해보기
  postAddCard(newCard.cardText);
};

// cancel 버튼 클릭시 카드생성 취소
const cancelAddCardHandler = (e) => {
  const createCardArea = e.target.parentNode.parentNode;
  createCardArea.parentNode.removeChild(createCardArea)
};

// 카드입력 레이어 열기
const newCardArea = () => div(
  {className: 'create-card-area'},
  textarea({
    className: 'input-card-contents', placeholder: 'Enter a note', maxLength: '500', oninput: writeTextArea
  }),
  div({className: 'btn-wrap'},
    button({className: 'add-btn', disabled: true, onclick: cardAddBtnClickHandler}, 'Add'),
    button({className: 'cancel-btn', onclick: cancelAddCardHandler}, 'Cancel')),
);

export const createCardBtnHandler = function (e) {
  if (e.target.className === 'add-card-btn') {
    let cardsWrap = this.parentNode.parentNode.nextSibling.firstChild;
    if (cardsWrap.firstChild.classList[0] === 'card') {
      cardsWrap.insertBefore(newCardArea(), cardsWrap.firstChild);
      console.log(cardsWrap.firstChild)
    } else {
      cardsWrap.removeChild(cardsWrap.firstChild)
    }
  }
};
