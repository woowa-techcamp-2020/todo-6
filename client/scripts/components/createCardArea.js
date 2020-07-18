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

