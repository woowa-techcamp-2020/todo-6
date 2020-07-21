import { initList } from './components/list';

export const initPage = () => fetch('/api/users/1')
    .then((res) => res.json())
    .then((res) => {
        res.userData.data.forEach((data) => {
            initList(data);
        });
    });

export const postAddCard = (newCard) => fetch(`/api/users/1/lists/${newCard.listID}/cards`, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(newCard), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' },
})
    .then((response) => response.json())
    // .then((json) => json)
    .catch((error) => console.error('Error:', error));

export const deleteCard = (listId, cardId) => fetch(`/api/users/1/lists/${listId}/cards/${cardId}`, {
    method: 'DELETE', // or 'PUT'
    // body: JSON.stringify(newCard), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' },
})
    .then((response) => console.log(response.status))
    .catch((error) => console.error('Error:', error));

export const putUpdateCard = (newCard) => fetch(`/api/users/:userID/lists/${listID}/cards/${cardID}`, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(newCard), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' },
})
    .then((response) => response.json())
// .then((json) => json)
    .catch((error) => console.error('Error:', error));
