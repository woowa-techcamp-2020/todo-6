import {div} from '../utils/element';
import '../../scss/card.scss';
import {showCardModal} from '../controller/cardModal';

export const showCard = (cards) => {
  const cardArray = cards.map((card) => div(
    {className: `card ${card.cardID}`, ondblclick: showCardModal },
    div({className: 'card-header-section'},
      div({className: 'card-title'}, card.cardText),
      div({className: 'card-del-btn'}, '✖')),
  ));
  // console.log(cardArray);
  return cardArray;
};


