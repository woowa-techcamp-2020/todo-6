import { getUser, postUser } from './apis';

const btn = document.querySelector('.sign-in-btn');

btn.onclick = function (e) {
    const form = document.querySelector('form');
    const username = document.querySelector('.username').value;
    const password = document.querySelector('.password').value;

    if (isNaN(username)) {
        getUser(username)
            .then((user) => {
                console.log(user);
                document.cookie = 'id' + '=' + `${user.id}`;
                document.cookie = 'userID' + '=' + `${user.userID}`;
                form.submit();
            })
            .catch((err) => {
                postUser({
                    id: username,
                    password,
                }).then(() => {
                    alert('계정이 생성되었습니다');
                    document.cookie = 'id' + '=' + `${user.id}`;
                    document.cookie = 'userID' + '=' + `${user.userID}`;
                    form.submit();
                });
            });
    } else {
        alert('아이디에 문자도 추가해주세요');
    }
};
