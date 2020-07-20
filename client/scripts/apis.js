import { showList } from './components/list';

export const initPage = () => fetch('/api/users/1')
    .then((res) => res.json())
    .then((res) => {
        res.userData.data.forEach((data) => {
            showList(data);
        });
    });

export const postAddCard = (newCard) => {
    fetch('/api/users/add', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(newCard), // data can be `string` or {object}!
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => // todo : 돔 잡아서 ..카드 추가
            console.log(res.json()))
        .catch((error) => console.error('Error:', error));
};
