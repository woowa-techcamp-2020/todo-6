import { initList } from './components/list';
import { getUserID } from './utils/handleCookie';

export const initPage = () => fetch(`/api/users/${getUserID()}`)
    .then((res) => res.json())
    .then((res) => {
        res.userData.data.forEach((data) => {
            initList(data);
        });
    });

export const postUser = (user) => fetch('/api/users', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(user), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' },
})
    .then((response) => response.json())
    // .then((json) => json)
    .catch((error) => console.error('Error:', error));

export const getUser = (id) => fetch(`/api/users/${id}`)
    .then((res) => res.json());
export const getEvents = () => fetch('/api/users/1/events')
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error));

export const postEvent = (event) => fetch(`/api/users/${getUserID()}/events`, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(event), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' },
})
    .then((response) => response.json())
    // .then((json) => json)
    .catch((error) => console.error('Error:', error));

export const putUpdateOrder = (list) => fetch(`/api/users/${getUserID()}/lists/${list.listID}/orders`,
    {
        method: 'PUT',
        body: JSON.stringify(list),
        headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error));

export const postAddCard = (newCard) => fetch(`/api/users/${getUserID()}/lists/${newCard.listID}/cards`, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(newCard), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' },
})
    .then((response) => response.json())
    // .then((json) => json)
    .catch((error) => console.error('Error:', error));

export const deleteCard = (listID, cardID) => fetch(`/api/users/${getUserID()}/lists/${listID}/cards/${cardID}`, {
    method: 'DELETE', // or 'PUT'
    // body: JSON.stringify(newCard), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' },
})
    .then((response) => console.log(response.status))
    .catch((error) => console.error('Error:', error));

export const putUpdateCard = (updatedCardObj) => fetch(`/api/users/${getUserID()}/lists/${updatedCardObj.listID}/cards/${updatedCardObj.cardID}`,
    {
        method: 'PUT',
        body: JSON.stringify(updatedCardObj),
        headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error));

// list apis
export const putUpdateList = (updatedCardObj) => fetch(`/api/users/${getUserID()}/lists/${updatedCardObj.listID}`,
    {
        method: 'PUT',
        body: JSON.stringify(updatedCardObj),
        headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error));

export const deleteList = (listID) => fetch(`/api/users/${getUserID()}/lists/${listID}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
})
    .then((response) => console.log(response.status))
    .catch((error) => console.error('Error:', error));

export const postAddList = (newCard) => fetch(`/api/users/${getUserID()}/lists`, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(newCard), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' },
})
    .then((response) => response.json())
// .then((json) => json)
    .catch((error) => console.error('Error:', error));
