import {div, button} from '../utils/element';
import {createCardBtnHandler} from '../controller/createCardController'
import '../../scss/list.scss';
import '../../scss/createCardArea.scss';
import cardsNode from './cardsNode';


// 서버에서 받은 데이터로 리스트 그리기
const showList = (cardCount, listTitle, cards) => {
  const list = div({className: 'list', onclick: createCardBtnHandler},
    div({className: 'list-header-section'},
      div({className: 'list-header-left-wrap'},
        div({className: 'cards-count'}, cardCount),
        div({className: 'list-title'}, listTitle)),
      div({className: 'list-header-right-wrap'},
        button({className: 'add-card-btn'}, '+'),
        button({className: 'list-details-btn'}, '='))),
    div({className: 'list-body-section'},
      div(
        {className: 'cards-wrap'}, cardsNode(cards),
      )));

  const listsWrap = document.querySelector('.lists-wrap');
  const addList = document.querySelector('.add-list-btn');
  listsWrap.insertBefore(list, addList);
};


export default showList;