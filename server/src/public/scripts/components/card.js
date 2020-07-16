import { div, button } from '../utils/element';
import '../../scss/card.scss';
import { newCardSectionEl } from './createCardArea';

const addCardBtn = document.querySelector('.add-card-btn');
const listBodySection = document.querySelector('.list-body-section');

const showCard = (text) => div(
    { className: 'card' },
    div({ className: 'card-header-section' },
        div({ className: 'card-title' }, text),
        button({ className: 'card-del-btn' }, '✖')),
);



export default showCard;