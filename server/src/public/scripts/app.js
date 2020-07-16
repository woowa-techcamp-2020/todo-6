// JS import
import showList from './components/list';

// SCSS import
import '../scss/mainPage.scss';
import '../scss/reset.scss';


const getInitData = new Promise((resolve, reject) => {
    fetch('/api/users/all').then((res) => {
        resolve(res.json());
    });
});

const initPage = () => {
    console.log('g');
    getInitData.then((res) => {
    		res.userData.data.forEach((data) => {
            showList(data.cards.length, data.listName, data.cards);
        });
    });
};

initPage();

//
