// import { div, button, textarea } from '../utils/element';
// import '../../scss/list.scss';
// import '../../scss/createCardArea.scss';
// import { newCardSectionEl } from './createCardArea';
// import cardsNode from './cardsNode';
// // import showList from "./list";
//
//
// // 서버에서 받은 데이터로 리스트 그리기
// const showList = (cardCount, listTitle, cards) => {
//   const cardAddBtnClickHandler = () => {
//     const inputCardContents = document.querySelector('.input-card-contents').value;
//     console.log(inputCardContents)
//     // todo : DB에 입력값 저장요청 post api쏘기
//   };
//
//   const writeTextArea = (e) => {
//     console.log(e);
//     const addBtn = document.querySelector('.add-btn');
//     const inputCardContents = document.querySelector('.input-card-contents').value;
//     if (inputCardContents.length >= 1 && inputCardContents.length < 500) {
//       addBtn.removeAttribute('disabled');
//     } else {
//       addBtn.setAttribute('disabled', 'true');
//     }
//   };
//
//   const newCardArea = () => div(
//     { className: 'create-card-area'},
//     textarea({
//       className: 'input-card-contents', placeholder: 'Enter a note', oninput: writeTextArea, maxLength: '500',
//     }),
//     div({ className: 'btn-wrap' },
//       button({ className: 'add-btn', disabled: true , onclick: cardAddBtnClickHandler},  'Add'),
//       button({ className: 'cancel-btn' }, 'Cancel')),
//   );
//
//   const getCardWarp = (node) => node.childNodes[1].firstChild;
//
//
//   const createCardBtnHandler = function (e) {
//     // console.log(this.parentElement);
//     // const cardsWrap = this.document.querySelector('.cards-wrap');
//     // cardsWrap.insertBefore(newCardArea(), cardsWrap.firstChild);
//     // console.log(cardsWrap);
//
//     if(e.target.className === 'add-card-btn') {
//       const cardsWrap = getCardWarp(this);
//       const canAreaAdd = cardsWrap.firstChild.className === 'card';
//       if(canAreaAdd) {
//         cardsWrap.insertBefore(newCardArea(), cardsWrap.firstChild);
//         console.log(cardsWrap.firstChild.style.display)
//       } else {
//         cardsWrap.removeChild(cardsWrap.firstChild)
//       }
//     }
//   };
//
//   const list = div({ className: 'list', onclick: createCardBtnHandler },
//     div({ className: 'list-header-section' },
//       div({ className: 'list-header-left-wrap' },
//         div({ className: 'cards-count' }, cardCount),
//         div({ className: 'list-title' }, listTitle)),
//       div({ className: 'list-header-right-wrap' },
//         button({ className: 'add-card-btn' }, '+'),
//         button({ className: 'list-details-btn' }, '='))),
//     div({ className: 'list-body-section' },
//       div(
//         { className: 'cards-wrap' }, cardsNode(cards),
//       )));
//
//   const listsWrap = document.querySelector('.lists-wrap');
//   const addList = document.querySelector('.add-list-btn');
//   listsWrap.insertBefore(list, addList);
// };
//
//
// // 카드 목록에 카드 추가
// const clickAddCardBtnHandler = (() => {
//   let addCardBtnClick = true;
//   return () => {
//     const cardsWrap = document.querySelector('.cards-wrap');
//     if(addCardBtnClick) {
//       listBodySection.insertBefore(newCardSectionEl, cardsWrap);
//       addCardBtnClick = false;
//     } else {
//       listBodySection.removeChild(newCardSectionEl);
//       addCardBtnClick = true;
//     }
//   };
// })();
//
// // 카드 인풋레이어에 입력시 Add 버튼 활성화
// // showList.prototype.writeTextArea = (e) => {
// //   console.log(e);
// //   const addBtn = document.querySelector('.add-btn');
// //   const inputCardContents = document.querySelector('.input-card-contents').value;
// //   if (inputCardContents.length >= 1 && inputCardContents.length < 500) {
// //     addBtn.removeAttribute('disabled');
// //   } else {
// //     addBtn.setAttribute('disabled', 'true');
// //   }
// // };
//
// // 카드 입력 레이어에 인렵 후 Add버튼 클릭시 서버로 데이터 보내기
// // showList.prototype.cardAddBtnClickHandler = () => {
// //   const inputCardContents = document.querySelector('.input-card-contents').value;
// //   console.log(inputCardContents)
// //   // todo : DB에 입력값 저장요청 post api쏘기
// // };
//
// // 카드입력 레이어 열기
// // showList.prototype.newCardArea = () => div(
// //   { className: 'create-card-area'},
// //   textarea({
// //     className: 'input-card-contents', placeholder: 'Enter a note', oninput: this.writeTextArea, maxLength: '500',
// //   }),
// //   div({ className: 'btn-wrap' },
// //     button({ className: 'add-btn', disabled: true , onclick: this.cardAddBtnClickHandler},  'Add'),
// //     button({ className: 'cancel-btn' }, 'Cancel')),
// // );
//
//
//
//
// // 현재 리스트 내의 card-wrap 잡기
// // showList.prototype.getCardWarp = (node) => node.childNodes[1].firstChild;
//
// // 이벤트 전파-버블링 사용해서 카드드생성 레이어 보이게 하기
// // showList.prototype.createCardBtnHandler = function (e) {
// //   if(e.target.className === 'add-card-btn') {
// //     const cardsWrap = this.getCardWarp(this);
// //     const canAreaAdd = cardsWrap.firstChild.className === 'card';
// //     if(canAreaAdd) {
// //       cardsWrap.insertBefore(this.newCardArea(), cardsWrap.firstChild);
// //       console.log(cardsWrap.firstChild.style.display)
// //     } else {
// //       cardsWrap.removeChild(cardsWrap.firstChild)
// //     }
// //   }
// // };
//
// export default showList;