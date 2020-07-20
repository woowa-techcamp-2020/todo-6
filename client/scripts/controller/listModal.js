export const showListModal = (e) => {
    const listTitle = e.target.textContent;
    const listModalSection = document.getElementById('list-modal-section');
    const listModalTitle = document.querySelector('.list-modal-header-title');
    const listModalInput = document.querySelector('.list-modal-input');
    const listModalCloseBtn = document.querySelector('.list-modal-close-btn');

    listModalSection.style.display = 'block';
    listModalTitle.innerText = `Edit ${listTitle}`;
    listModalInput.innerText = listTitle;

    listModalCloseBtn.addEventListener('click', () => {
        listModalSection.style.display = 'none';
    })
};
