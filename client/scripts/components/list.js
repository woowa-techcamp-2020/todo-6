import { div, button, textarea } from '../utils/element';
import '../../scss/list.scss';
import '../../scss/createCardArea.scss';
import { newCardSectionEl, writeTextArea } from './createCardArea';
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

// 카드생성 레이어
const newArea = () => div(
    { className: 'create-card-area'},
    textarea({
        className: 'input-card-contents', placeholder: 'Enter a note', oninput: writeTextArea, maxLength: '500',
    }),
    div({ className: 'btn-wrap' },
        button({ className: 'add-btn', disabled: true }, 'Add'),
        button({ className: 'cancel-btn' }, 'Cancel')),
);

const getCardWarp = (node) => node.childNodes[1].firstChild;

// 이벤트 전파-버블링 사용해서 카드드생성 레이어 보이게 하기
const listHandler = function (e) {
    if(e.target.className === 'add-card-btn') {
        const cardsWrap = getCardWarp(this);
        const canAreaAdd = cardsWrap.firstChild.className === 'card';
        if(canAreaAdd) {
            cardsWrap.insertBefore(newArea(), cardsWrap.firstChild);
            console.log(cardsWrap.firstChild.style.display)
        } else {
            cardsWrap.removeChild(cardsWrap.firstChild)
        }
    }
};


// 서버에서 받은 데이터로 리스트 그리기
const showList = (cardCount, listTitle, cards) => {
    const list = div({ className: 'list', onclick: listHandler },
        div({ className: 'list-header-section' },
            div({ className: 'list-header-left-wrap' },
                div({ className: 'cards-count' }, cardCount),
                div({ className: 'list-title' }, listTitle)),
            div({ className: 'list-header-right-wrap' },
                button({ className: 'add-card-btn' }, '+'),
                button({ className: 'list-details-btn' }, '='))),
        div({ className: 'list-body-section' },
            div(
                { className: 'cards-wrap' }, cardsNode(cards),
            )));

    const listsWrap = document.querySelector('.lists-wrap');
    const addList = document.querySelector('.add-list-btn');
    listsWrap.insertBefore(list, addList);
};



export default showList;