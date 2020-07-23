import { div } from '../utils/element';
import '../../scss/menu.scss';
import { userEvent } from './userEvent'; // 수정필요할수도

export const userEvents = (events) => events.map((event) => userEvent(event));
