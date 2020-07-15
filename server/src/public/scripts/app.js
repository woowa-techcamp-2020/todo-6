import { sum } from './math';
import '../scss/mainPage.scss';
import baeminImage from '../img/baemin.png';
// import './mainPage.scss';

window.addEventListener('DOMContentLoaded', () => { // DOM 생성 후 실행
    const el = document.querySelector('#app');
    el.innerHTML = `<h1>1 + 2 = ${sum()}</h1>
    <img src="${baeminImage}" alt="woowa" />`;
});

