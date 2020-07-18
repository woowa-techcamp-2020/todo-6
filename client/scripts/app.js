// eslint-disable-next-line import/no-cycle
import showList from './components/list';

// SCSS import
import '../scss/mainPage.scss';
import '../scss/reset.scss';


export const fetchInitData = () => {
    fetch('/api/users/all').then((res) => resolve(res.json()));
    };


export const initPage = () => {
  fetchInitData.then((res) => {
    res.userData.data.forEach((data) => {
      showList(data.cards.length, data.listName, data.cards);
    });
  });
};

initPage();

