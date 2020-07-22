import { elements } from '../utils/createdElements';

export const showListModalHandler = (e) => {
    elements.list = e.target.closest('.list');
    const listModalSection = document.getElementById('list-modal-section');
    const listModalTitle = document.querySelector('.list-modal-header-title');
    const listModalInput = document.querySelector('.list-modal-input');
    const updatedListObj = {
        listID: e.target.closest('.list').getAttribute('data-listid'),
        listName: e.target.textContent,
    };

    listModalSection.style.display = 'block';
    listModalTitle.innerText = `Edit ${updatedListObj.listName}`;
    listModalInput.value = updatedListObj.listName;
};
