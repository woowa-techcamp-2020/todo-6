import '../../scss/createCardArea.scss';
import { div, button, textarea } from '../utils/element';
import { initPage } from '../app';

export const clickAddCardBtn = (event) => {
    const inputCardContents = document.querySelector('.input-card-contents').value;

    // todo: post api to server
    fetch('/api/users/add', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({ cardText: inputCardContents }), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(() => {
            // todo: initPage 함수 실행
            // initPage()
        })
        .catch((error) => console.error('Error:', error));
};


export const writeTextArea = () => {
    const addBtn = document.querySelector('.add-btn');
    const inputCardContents = document.querySelector('.input-card-contents').value;
    if (inputCardContents.length > 0 && inputCardContents.length < 500) {
        addBtn.removeAttribute('disabled');
    } else {
        addBtn.setAttribute('disabled', 'true');
    }
};


