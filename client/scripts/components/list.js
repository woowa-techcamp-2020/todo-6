import { div, button } from '../utils/element';
import { createCardBtnHandler } from '../controller/createCard';
import '../../scss/list.scss';
import { listOnMouseDownHandler } from '../controller/listHandler';

import '../../scss/cardInput.scss';
import { showCard } from './card';
import { showListModal } from '../controller/listModal';

// 서버에서 받은 데이터로 리스트 그리기
// user.ts파일참고
const showList = (data) => {
    const userData = data;

    const list = div({ className: `list ${userData.listID}`, onmousedown: listOnMouseDownHandler },
        div({ className: 'list-header-section' },
            div({ className: 'list-header-left-wrap' },
                div({ className: 'cards-count' }, userData.cards.length),
                div({ className: 'list-title', ondblclick: showListModal }, userData.listName)),
            div({ className: 'list-header-right-wrap' },
                button({ className: 'add-card-btn', onclick: createCardBtnHandler }, '✎'),
                button({ className: 'list-details-btn' }, '⋯'))),
        div({ className: 'list-body-section' },
            div(
                { className: 'cards-wrap' }, showCard(userData.cards),
            )));

    const listsWrap = document.querySelector('.lists-wrap');
    const addList = document.querySelector('.add-list-btn');
    listsWrap.insertBefore(list, addList);
};

export default showList;
