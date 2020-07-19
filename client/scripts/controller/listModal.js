export const showListModal = (e) => {
  const listTitle = e.target.textContent;
  const listModalSection = document.getElementById('list-modal-section');
  const listModalTitle = document.querySelector('.list-modal-header-title');
  const listModalInput = document.querySelector('.list-modal-input');
  console.log(listModalInput.value)

  listModalSection.style.display = 'block';
  listModalTitle.innerText = `Edit ${listTitle}`;
  listModalInput.innerText = listTitle;
};
