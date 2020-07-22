import { button, div, textarea } from '../utils/element';
import '../../scss/cardModal.scss';

export const showCardModal = (cardContents) => {
    const cardModal = div(
        { className: 'card-modal-layer' },
        div({ className: 'card-modal-header-section' },
            div({ className: 'card-modal-header-title' }),
            button({ className: 'card-modal-close-btn' })),
        div({ className: 'card-modal-body-section' },
            div({ className: 'card-modal-body-title' }),
            textarea({ className: 'card-contents-revise-textarea' }, cardContents),
            button({ className: 'card-modal-save-btn' })),
    );

    const mainPage = document.querySelector('.main-page');
    mainPage.appendChild(cardModal);
};
