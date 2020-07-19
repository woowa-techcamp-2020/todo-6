import {div} from '../utils/element';
import '../../scss/card.scss';
import {showCardModal} from '../controller/cardModal';

export const showCard = (cards) => {
    const cardArray = cards.map((card) => div(
        {className: `card ${card.cardID}`},
        div({className: 'card-header-section'},
            div({className: 'card-header-left'},
                div({className: 'card-icon'}, '📄'),
                div({className: 'card-title', ondblclick: showCardModal}, `${card.cardText}`)),
            div({className: 'card-del-btn'}, '✘')),
    ));
    // console.log(cardArray);
    return cardArray;
};
