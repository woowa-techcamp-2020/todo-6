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


export const newCardSectionEl = () => {
    const cardsWrap = document.querySelector('.cards-wrap');
    const card = document.querySelector('.card');

    const newArea = div(
      {className: 'create-card-area'},
      textarea({
          className: 'input-card-contents', placeholder: 'Enter a note', oninput: writeTextArea, maxLength: '500',
      }),
      div({className: 'btn-wrap'},
        button({className: 'add-btn', disabled: true, onclick: clickAddCardBtn}, 'Add'),
        button({className: 'cancel-btn'}, 'Cancel')),
    );

    // const cardsWrap = document.querySelector('.cards-wrap');
    // const card = document.querySelector('.card');

    cardsWrap.insertBefore(newArea, card);
}



