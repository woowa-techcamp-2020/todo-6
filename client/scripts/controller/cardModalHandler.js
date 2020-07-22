import { elements } from '../utils/createdElements';

const cardModalInput = document.querySelector('.card-modal-input');

// card title dbclick
export const showCardModalHandler = (e) => {
    const cardModalSection = document.getElementById('card-modal-section');
    elements.card = e.target.closest('.card');
    cardModalSection.style.display = 'block';
    cardModalInput.value = e.target.textContent;
};
