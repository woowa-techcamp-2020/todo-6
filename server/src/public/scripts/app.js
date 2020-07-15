// JS import
import { createElWithClass } from './utils/createElWithClass';

// SCSS import
import '../scss/mainPage.scss';
import '../scss/reset.scss';

const body = document.querySelector('.list-header-left-wrap');
body.appendChild(createElWithClass('div', 'test', '안녕하세요'));
