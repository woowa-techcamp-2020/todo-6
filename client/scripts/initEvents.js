import { getEvents } from './apis';
import { userEvents } from './components/userEvents';

export const initEvents = () => {
    getEvents().then((events) => {
        const eventWrap = document.querySelector('.user-record-wrap');
        const eventNodeList = userEvents(events);
        eventNodeList.forEach((eventNode) => {
            eventWrap.appendChild(eventNode);
        });
    });
};
