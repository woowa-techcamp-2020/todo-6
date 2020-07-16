// JS import
import newCardSectionEl from './components/list/createCardArea';

// SCSS import
import '../scss/mainPage.scss';
import '../scss/reset.scss';

const cardsWrap = document.querySelector('.cards-wrap');
const listBodySection = document.querySelector('.list-body-section');
listBodySection.insertBefore(newCardSectionEl, cardsWrap);



// const initData = [
//     {
//         listId: 'number',
//         listName: 'string',
//         cardsCount: 'number',
//         cards: [
//             {
//                 cardName: 'string',
//                 cardText: 'string',
//                 createTime: 'timeObj',
//             },
//         ],
//     },
//     {
//         listId: 'number',
//         listName: 'string',
//         cardsCount: 'number',
//         cards: [
//             {
//                 cardName: 'string',
//                 cardText: 'string',
//                 createTime: 'timeObj',
//             },
//         ],
//     },
// ];
