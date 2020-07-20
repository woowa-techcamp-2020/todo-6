import { div } from '../utils/element';
import '../../scss/card.scss';
import { showCardModal } from '../controller/cardModal';
import { cardHeaderOnMouseOverHandler, cardOnMouseOverHandler, cardOnMouseMoveHandler } from '../controller/cardHandler';

export const showCard = (cards) => {
    const cardArray = cards.map((card, index) => div(
        {
            className: 'card',
            dataset: { listId, id: card.cardID, type: 'card' },
            onmouseover: cardOnMouseOverHandler,
            onmousemove: cardOnMouseMoveHandler,
        },
        div({ className: 'card-header-section', onmouseover: cardHeaderOnMouseOverHandler },
            div({ className: 'card-header-left' },
                div({ className: 'card-icon' }, '📄'),
                div({ className: 'card-title', ondblclick: showCardModal }, `${card.cardText}`)),
            div({ className: 'card-del-btn' }, '✘')),
    ));
    return cardArray;
};
