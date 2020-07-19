import {button, div, textarea} from "../utils/element";
import '../../scss/cardModal.scss';

export const showCardModal = (cardContents) => {
  const cardModal = div({className: 'card-modal-section'},
    div({className: 'card-modal-layer'},
      div({className: 'card-modal-header-section'},
        div({className: 'card-modal-header-title'}, 'Edit note'),
        button({className: 'card-modal-close-btn'}, '✖')),
      div({className: 'card-modal-body-section'},
        div({className: 'card-modal-body-title'}, 'Note'),
        textarea({className: 'card-modal-input'},),
        button({className: 'card-modal-save-btn'}, 'Save note'))
    )
  );

  const mainPage = document.querySelector('.main-page');
  mainPage.appendChild(cardModal)
};