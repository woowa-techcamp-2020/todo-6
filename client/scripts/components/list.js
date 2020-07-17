import { div, button, textarea } from '../utils/element';
import '../../scss/list.scss';
import '../../scss/createCardArea.scss';
import { clickAddCardBtn, newCardSectionEl, writeTextArea } from './createCardArea';
import cardsNode from './cardsNode';

// 카드 목록에 카드 추가
const clickAddCardBtnHandler = (() => {
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

const newArea = () => div(
    { className: 'create-card-area' },
    textarea({
        className: 'input-card-contents', placeholder: 'Enter a note', oninput: writeTextArea, maxLength: '500',
    }),
    div({ className: 'btn-wrap' },
        button({ className: 'add-btn', disabled: true }, 'Add'),
        button({ className: 'cancel-btn' }, 'Cancel')),
);

const getCardWarp = (node) => node.childNodes[1].firstChild;

const listHandler = function (e) {
    if(e.target.className === 'add-card-btn') {
        const cardsWrap = getCardWarp(this);
        const canAreaAdd = cardsWrap.firstChild.className === 'card';
        if(canAreaAdd) {
            console.log(this.childNodes[1].firstChild.firstChild);
            cardsWrap.insertBefore(newArea(), cardsWrap.firstChild);
        }
    }
};


const showList = (cardCount, listTitle, cards) => {
    const list = div({ className: 'list', onclick: listHandler },
        div({ className: 'list-header-section' },
            div({ className: 'list-header-left-wrap' },
                div({ className: 'cards-count' }, cardCount),
                div({ className: 'list-title' }, listTitle)),
            div({ className: 'list-header-right-wrap' },
                button({ className: 'add-card-btn', onclick: newCardSectionEl }, '+'),
                button({ className: 'list-details-btn' }, '='))),
        div({ className: 'list-body-section' },
            div(
                { className: 'cards-wrap' }, newArea, cardsNode(cards),
            )));


    const listsWrap = document.querySelector('.lists-wrap');
    const addList = document.querySelector('.add-list');
    listsWrap.insertBefore(list, addList);
};



export default showList;