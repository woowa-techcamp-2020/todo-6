import '../../../scss/listModal.scss';
import {createElWithClass} from '../../utils/createElWithClass';

const createListModal = function (){
	const newCardSectionEl = document.querySelector('.create-card-area');
	const inputCardContents = createElWithClass('input', 'input-card-contents','');
	const btnWrap = createElWithClass('div', 'btn-wrap','');
	const addBtn = createElWithClass('button', 'add-btn','Add');
	const cancelBtn = createElWithClass('button', 'cancel-btn','Cancel');

	inputCardContents.setAttribute('placeholder', 'Enter a note');
	newCardSectionEl.appendChild(inputCardContents);
	newCardSectionEl.appendChild(btnWrap);
	btnWrap.appendChild(addBtn);
	btnWrap.appendChild(cancelBtn);
}