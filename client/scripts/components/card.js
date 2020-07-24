import { div } from '../utils/element';
import '../../scss/card.scss';
import { showCardModalHandler } from '../controller/cardModalHandler';
import CardHandler from '../controller/cardHandler';
import { getCookie, getID } from '../utils/handleCookie';

export const cardHandler = new CardHandler();

const sortCards = (cards, orders) => {
    const sortedCards = [];
    const cardsObject = {};
    cards?.forEach((card) => {
        const key = card.cardID;
        cardsObject[key] = card;
    });
    orders?.forEach((order) => {
        sortedCards.push(cardsObject[order]);
    });
    return sortedCards;
};

export const initCard = (userData) => {
    const { cards, listID, orders } = userData;
    const sortedCards = sortCards(cards, orders);
    const cardArray = sortedCards.map((card) => div(
        {
            className: 'card',
            dataset: {
                listid: listID, cardid: card.cardID, type: 'card', userid: card.userID,
            },
            onmousemove: cardHandler.onMouseMove,
        },
        div({ className: 'card-header-section', onmouseover: cardHandler.blockPropagation },
            div({ className: 'card-header-left' },
                div({ className: 'card-icon' }, '📄'),
                div({ className: 'card-title', ondblclick: showCardModalHandler }, `${card.cardText}`)),
            div({ className: 'card-del-btn' }, '✘')),
        div({ className: 'card-body-section' }, `@${getID()}`),
    ));
    return cardArray;
};

// 카드 생성 post api후 받은 응답값으로 새로운 카드 추가하기
export const newCard = (res) => div(
    {
        className: 'card',
        dataset: {
            listid: res.listID, cardid: res.cardID, type: 'card', userid: getCookie('userID'),
        },
        onmousemove: cardHandler.onMouseMove,
    },
    div({ className: 'card-header-section', onmouseover: cardHandler.blockPropagation },
        div({ className: 'card-header-left' },
            div({ className: 'card-icon' }, '📄'),
            div({ className: 'card-title', ondblclick: showCardModalHandler }, `${res.cardText}`)),
        div({ className: 'card-del-btn' }, '✘')),
    div({ className: 'card-body-section' }, `@${getID()}`),

);
