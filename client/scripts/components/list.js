import { div, button } from '../utils/element';
import '../../scss/list.scss';
import '../../scss/cardInput.scss';
import { initCard } from './card';
import { createCardBtnHandler } from '../controller/createCardHandler';
import ListHandler, { listOnMouseDownHandler } from '../controller/listHandler';
import { showListModalHandler } from '../controller/listModalHandler';

// 서버에서 받은 데이터로 리스트 그리기
// user.ts파일참고
export const initList = (data) => {
    console.log(data);
    const userData = data;
    const listHandler = new ListHandler();
    const list = div({
        className: 'list',
        dataset: { id: userData.listID, type: 'list' },
        onmousedown: listHandler.onMouseDown,
        onmouseover: listHandler.onMouseOver,
    },
    div({ className: 'list-header-section' },
        div({ className: 'list-header-left-wrap' },
            div({ className: 'cards-count' }, userData.cards.length),
            div({ className: 'list-title', ondblclick: showListModalHandler }, userData.listName)),
        div({ className: 'list-header-right-wrap' },
            button({ className: 'add-card-btn', onclick: createCardBtnHandler }, '✎'),
            button({ className: 'list-details-btn' }, '⋯'))),
    div({ className: 'list-body-section' },
        div(
            { className: 'cards-wrap', dataset: { listid: userData.listID } }, initCard(userData.listID, userData.cards),
        )));

    const listsWrap = document.querySelector('.lists-wrap');
    const addList = document.querySelector('.add-list-btn');
    listsWrap.insertBefore(list, addList);
};

export default initList;
