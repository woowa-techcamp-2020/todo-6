import { div, button } from '../utils/element';


const cardsNode = (cards) => {
    const cardArray = cards.map((card) => div(
        { className: 'card' },
        div({ className: 'card-heade-section' },
            div({ className: 'card-title' }, card.cardText),
            div({ className: 'card-del-btn' }, '✖')),
    ));

    console.log(cardArray);

    return cardArray;
};



export default cardsNode;