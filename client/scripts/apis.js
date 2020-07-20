import showList from './components/list';

export const initPage = () => fetch('/api/users/1')
    .then((res) => res.json())
    .then((res) => {
        res.userData.data.forEach((data) => {
            showList(data);
        });
    });

export const postAddCard = (newCard) => {
    // 카드정보 넘길떄 리스트정보,유저정도,카드정도
    // todo: post api to server
    fetch('/api/users/add', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(newCard), // data can be `string` or {object}!
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => // todo : 돔 잡아서 ..카드 추가
            console.log(res.json()))
        .catch((error) => console.error('Error:', error));
};
