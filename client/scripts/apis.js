

export const postAddCard = (newCard) => {
  // todo: post api to server
  fetch('/api/users/add', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(newCard), // data can be `string` or {object}!
    headers: {'Content-Type': 'application/json'}})
    .then((res) => // todo : 리랜더링 함수넣기
    console.log(res.json())
     )
    .catch((error) => console.error('Error:', error));
};

