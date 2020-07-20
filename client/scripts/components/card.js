import { div } from '../utils/element';
import '../../scss/card.scss';
import { showCardModalHandler } from '../controller/cardModalHandler';
import CardHandler from '../controller/cardHandler';

const cardHandler = new CardHandler();

export const initCard = (listID, cards) => {
    const cardArray = cards.map((card) => div(
        {
            className: 'card',
            dataset: { listid: listID, id: card.cardID, type: 'card' },
            onmousemove: cardHandler.onMouseMove,
        },
        div({ className: 'card-header-section', onmouseover: cardHandler.blockPropagation },
            div({ className: 'card-header-left' },
                div({ className: 'card-icon' }, '📄'),
                div({ className: 'card-title', ondblclick: showCardModalHandler }, `${card.cardText}`)),
            div({ className: 'card-del-btn' }, '✘')),
    ));
    return cardArray;
};

// 카드 생성 post api후 받은 응답값으로 새로운 카드 추가하기
export const newCard = (res) => div(
    {
        className: 'card',
        dataset: { listid: res.listID, id: res.cardID, type: 'card' },
        onmousemove: cardHandler.onMouseMove,
    },
    div({ className: 'card-header-section', onmouseover: cardHandler.blockPropagation },
        div({ className: 'card-header-left' },
            div({ className: 'card-icon' }, '📄'),
            div({ className: 'card-title', ondblclick: showCardModalHandler }, `${res.cardText}`)),
        div({ className: 'card-del-btn' }, '✘')),
);
