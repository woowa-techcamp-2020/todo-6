import { button, div } from '../utils/element';
import { showListModalHandler } from '../controller/listModalHandler';
import { createCardBtnHandler } from '../controller/createCardHandler';
import { initCard } from './card';
import listHandler from '../controller/listHandler';
import cardHandler from '../controller/cardHandler';

export const newList = (userData) => div({
    className: 'list',
    dataset: { listid: userData.listID, type: 'list' },
    onmousedown: listHandler.onMouseDown,
    onmouseover: listHandler.onMouseOver,
    onclick: cardHandler.clickCardDelBtn,
},
div({ className: 'list-header-section' },
    div({ className: 'list-header-left-wrap' },
        div({ className: 'cards-count' }, 0),
        div({ className: 'list-title', ondblclick: showListModalHandler }, userData.listName)),
    div({ className: 'list-header-right-wrap' },
        button({ className: 'add-card-btn', onclick: createCardBtnHandler }, '✎'),
        button({ className: 'list-delete-btn', onclick: listHandler.clickDeleteList }, '✘'))),
div({ className: 'list-body-section' },
    div(
        { className: 'cards-wrap', dataset: { wrapid: userData.listID } }, initCard(userData),
    )));
