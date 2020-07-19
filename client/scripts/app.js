import '../scss/index.scss';
import '../scss/reset.scss';
import '../scss/cardModal.scss';
import '../scss/listModal.scss';
import '../scss/menu.scss';
import "./controller/menu";
import showList from './components/list';


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
