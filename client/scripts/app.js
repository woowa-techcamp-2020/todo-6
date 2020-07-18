import '../scss/index.scss';
import '../scss/reset.scss';
import showList from './components/list';

import {showCardModal} from './components/cardModal';


// 에러처리도 해주
export const initPage = () => {
  return fetch('/api/users/all')
    .then((res) => res.json())
    .then((res) => {
      res.userData.data.forEach((data) => {
        showList(data.cards.length, data.listName, data.listID, data.cards);
      });
    });
};

initPage();

showCardModal()