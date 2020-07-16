import { div, button } from '../utils/element';
import '../../scss/list.scss';
import { newCardSectionEl } from './createCardArea';
import cardsNode from './cardsNode';

const clickbtnHandler = (() => {
    let addCardBtnClick = true;
    return () => {
        const cardsWrap = document.querySelector('.cards-wrap');
        if(addCardBtnClick) {
            listBodySection.insertBefore(newCardSectionEl, cardsWrap);
            addCardBtnClick = false;
        } else {
            listBodySection.removeChild(newCardSectionEl);
            addCardBtnClick = true;
        }
    };
})();

const showList = (cardCount, listTitle, cards) => {
    const list = div(
        { className: 'list' },
        div({ className: 'list-header-section' },
            div({ className: 'list-header-left-wrap' },
                div({ className: 'cards-count' }, cardCount),
                div({ className: 'list-title' }, listTitle)),
            div({ className: 'list-header-right-wrap' },
                button({ className: 'add-card-btn', onclick: clickbtnHandler }, '+'),
                button({ className: 'list-details-btn' }, '=')),
            div({ className: 'list-body-section' },
                div(
                    { className: 'cards-wrap' },
                    cardsNode(cards),
                ))),
    );

    const listsWrap = document.querySelector('.lists-wrap');
    const addList = document.querySelector('.add-list');
    listsWrap.insertBefore(list, addList);
};



export default showList;