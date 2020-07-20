import '../../scss/cardInput.scss';
import { cardAddBtnClickHandler, cancelAddCardHandler, writeTextArea } from '../controller/createCardHandler';
import { button, div, textarea } from '../utils/element';

export const newCardArea = () => div(
    { className: 'create-card-area' },
    textarea({
        className: 'input-card-contents', placeholder: 'Enter a note', maxLength: '500', oninput: writeTextArea,
    }),
    div({ className: 'btn-wrap' },
        button({ className: 'add-btn', disabled: true, onclick: cardAddBtnClickHandler }, 'Add'),
        button({ className: 'cancel-btn', onclick: cancelAddCardHandler }, 'Cancel')),
);
