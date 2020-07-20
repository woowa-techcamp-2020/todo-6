import { div } from '../utils/element';
import '../../scss/card.scss';
import { showCardModal } from '../controller/cardModal';
import { cardOnMouseOverHandler } from '../controller/cardHandler';

export const showCard = (listId, cards) => {
    const cardArray = cards.map((card) => div(
        {
            className: 'card',
            dataset: { listId, id: card.cardID, type: 'card' },
            onmouseover: cardOnMouseOverHandler,
        },
        div({ className: 'card-header-section' },
            div({ className: 'card-header-left' },
                div({ className: 'card-icon' }, '📄'),
                div({ className: 'card-title', ondblclick: showCardModal }, `${card.cardText}`)),
            div({ className: 'card-del-btn' }, '✘')),
    ));
    return cardArray;
};
