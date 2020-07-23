import { getUser } from './apis';

const btn = document.querySelector('.sign-in-btn');

btn.onclick = function (e) {
    const form = document.querySelector('form');
    const username = document.querySelector('.username').value;
    getUser(username)
        .then((user) => {
            document.cookie = 'id' + '=' + `${user.id}`;
            document.cookie = 'userID' + '=' + `${user.userID}`;
            form.submit();
        });
};
