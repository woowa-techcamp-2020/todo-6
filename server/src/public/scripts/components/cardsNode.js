import { div } from '../utils/element';
import '../../scss/card.scss';


const cardsNode = (cards) => {
    const cardArray = cards.map((card) => div(
        { className: 'card' },
        div({ className: 'card-header-section' },
            div({ className: 'card-title' }, card.cardText),
            div({ className: 'card-del-btn' }, '✖')),
    ));

    console.log(cardArray);

    return cardArray;
};



export default cardsNode;