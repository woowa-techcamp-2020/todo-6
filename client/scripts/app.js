import '../scss/index.scss';
import '../scss/reset.scss';
import '../scss/cardModal.scss';
import '../scss/listModal.scss';
import '../scss/menu.scss';
import './controller/menuEvents';
import { initPage } from './apis';
import { initEvents } from './initEvents';
import { assignElements } from './utils/states';
import addEventToElements from './addEventToElements';

initPage();
initEvents();
addEventToElements();
assignElements();
