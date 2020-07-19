import {div, button} from '../utils/element';
import {createCardBtnHandler} from '../controller/createCard'
import '../../scss/list.scss';
import '../../scss/createCardArea.scss';
import showCard from './card';


// 서버에서 받은 데이터로 리스트 그리기
// user.ts파일참고
const showList = (cardCount, listTitle, listID, cards) => {

  const list = div({className: `list ${listID}`},
    div({className: 'list-header-section'},
      div({className: 'list-header-left-wrap'},
        div({className: 'cards-count'}, cardCount),
        div({className: 'list-title' }, listTitle)),
      div({className: 'list-header-right-wrap'},
        button({className: 'add-card-btn', onclick: createCardBtnHandler}, '+'),
        button({className: 'list-details-btn'}, '='))),
    div({className: 'list-body-section'},
      div(
        {className: 'cards-wrap'}, showCard(cards)
      )));

  const listsWrap = document.querySelector('.lists-wrap');
  const addList = document.querySelector('.add-list-btn');
  listsWrap.insertBefore(list, addList);

};


export default showList;