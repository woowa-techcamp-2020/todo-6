import { initList } from './components/list';

export const initPage = () => fetch('/api/users/1')
    .then((res) => res.json())
    .then((res) => {
        res.userData.data.forEach((data) => {
            initList(data);
        });
    });

export const putUpdateOrder = (list) => fetch(`/api/users/:userID/lists/${list.listID}/orders`,
    {
        method: 'PUT',
        body: JSON.stringify(list),
        headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error));

export const postAddCard = (newCard) => fetch(`/api/users/1/lists/${newCard.listID}/cards`, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(newCard), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' },
})
    .then((response) => response.json())
    // .then((json) => json)
    .catch((error) => console.error('Error:', error));

export const deleteCard = (listID, cardID) => fetch(`/api/users/1/lists/${listID}/cards/${cardID}`, {
    method: 'DELETE', // or 'PUT'
    // body: JSON.stringify(newCard), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' },
})
    .then((response) => console.log(response.status))
    .catch((error) => console.error('Error:', error));

export const putUpdateCard = (updatedCardObj) => fetch(`/api/users/:userID/lists/${updatedCardObj.listID}/cards/${updatedCardObj.cardID}`,
    {
        method: 'PUT',
        body: JSON.stringify(updatedCardObj),
        headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error));
