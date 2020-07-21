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
