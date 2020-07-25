import { div, button } from '../utils/element';
import '../../scss/list.scss';
import '../../scss/cardInput.scss';
import { initCard } from './card';
import { createCardBtnHandler } from '../controller/createCardHandler';
import ListHandler, { listOnMouseDownHandler } from '../controller/listHandler';
import { showListModalHandler } from '../controller/listModalHandler';
import CardHandler from '../controller/cardHandler';
import { getUserID } from '../utils/handleCookie';

const isMyList = ({ isPrivate, userID }) => {
    if (isPrivate === 1 && userID !== getUserID()) return false;
    return true;
};

export const initList = (data) => {
    console.log(data);
    const listData = data;
    const listHandler = new ListHandler();
    const cardHandler = new CardHandler();

    if (!isMyList(listData)) return;

    const list = div({
        className: 'list',
        dataset: { listid: listData.listID, type: 'list', userid: listData.userID },
        onmousedown: listHandler.onMouseDown,
        onmouseover: listHandler.onMouseOver,
        onclick: cardHandler.clickCardDelBtn,
    },
    div({ className: 'list-header-section' },
        div({ className: 'list-header-left-wrap' },
            div({ className: 'cards-count' }, listData.cards.length),
            div({ className: 'list-title', ondblclick: showListModalHandler }, listData.listName)),
        div({ className: 'list-header-right-wrap' },
            button({ className: 'add-card-btn', onclick: createCardBtnHandler }, '✎'),
            button({ className: 'list-delete-btn', onclick: listHandler.clickDeleteList }, '✘'))),
    div({ className: 'list-body-section' },
        div(
            { className: 'cards-wrap', dataset: { wrapid: listData.listID } }, initCard(listData),
        )));

    const listsWrap = document.querySelector('.lists-wrap');
    const addList = document.querySelector('.add-list-btn');
    listsWrap.insertBefore(list, addList);
};

// export const addList = div({
//       className: 'list',
//       dataset: { listid: userData.listID, type: 'list' },
//       onmousedown: listHandler.onMouseDown,
//       onmouseover: listHandler.onMouseOver,
//       onclick: cardHandler.clickCardDelBtn,
//   },
//   div({ className: 'list-header-section' },
//     div({ className: 'list-header-left-wrap' },
//       div({ className: 'cards-count' }, userData.cards.length),
//       div({ className: 'list-title', ondblclick: showListModalHandler }, userData.listName)),
//     div({ className: 'list-header-right-wrap' },
//       button({ className: 'add-card-btn', onclick: createCardBtnHandler }, '✎'),
//       button({ className: 'list-delete-btn', onclick: listHandler.clickDeleteList }, '✘'))),
//   div({ className: 'list-body-section' },
//     div(
//       { className: 'cards-wrap', dataset: { wrapid: userData.listID } }, initCard(userData),
//     )));
