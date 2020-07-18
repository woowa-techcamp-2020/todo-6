import '../scss/mainPage.scss';
import '../scss/reset.scss';
import showList from './components/list';


export const initPage = () => {
  return fetch('/api/users/all')
    .then((res) => res.json())
    .then((res) => {
      res.userData.data.forEach((data) => {
        showList(data.cards.length, data.listName, data.cards);
      });
    });
};

initPage();

