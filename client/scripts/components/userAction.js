import {div} from '../utils/element';
import '../../scss/menu.scss'; // 수정필요할수도

export const userAction = () => { // 서버에서 내용받기
    div({className: 'user-action'},
        div({className: 'user-action-contents'}, '@blair moved the column 하는중'),
        div({className: 'user-action-time'},'@blair moved the column 하는중'))
};
