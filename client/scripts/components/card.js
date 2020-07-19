import {div} from '../utils/element';
import '../../scss/card.scss';
import {showCardModal} from './cardModal'

const showCard = (cards) => {
  const cardArray = cards.map((card) => div(
    {className: `card ${card.cardID}`, ondblclick: showCardModal },
    div({className: 'card-header-section'},
      div({className: 'card-title'}, card.cardText),
      div({className: 'card-del-btn'}, '✖')),
  ));
  // console.log(cardArray);
  return cardArray;
};


export default showCard;