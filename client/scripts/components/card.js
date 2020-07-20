import { div } from '../utils/element';
import '../../scss/card.scss';
import { showCardModal } from '../controller/cardModal';
import CardHandler from '../controller/cardHandler';

export const showCard = (cards) => {
    const cardHandler = new CardHandler();
    const cardArray = cards.map((card, index) => div(
        {
            className: `card ${card.cardID}`,
            dataset: { id: card.cardID, type: 'card' },
            onmousemove: cardHandler.onMouseMove,
        },
        div({ className: 'card-header-section', onmouseover: cardHandler.blockPropagation },
            div({ className: 'card-header-left' },
                div({ className: 'card-icon' }, '📄'),
                div({ className: 'card-title', ondblclick: showCardModal }, `${card.cardText}`)),
            div({ className: 'card-del-btn' }, '✘')),
    ));
    // console.log(cardArray);
    return cardArray;
};
