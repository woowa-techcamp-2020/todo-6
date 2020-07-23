import { div } from '../utils/element';
import { getEventText } from '../utils/handleElement';

const timeType = {
    min: 60,
    hour: 60 * 60,
    day: 60 * 60 * 24,
};

export const userEvent = (event) => {
    const text = getEventText(event);
    const currentTime = new Date();
    const eventTime = new Date(event.created.slice(0, -1));
    const timeDiff = parseInt((currentTime - eventTime) / 1000) + 1;
    let timeText = '';
    if (timeDiff < timeType.min) {
        timeText += `${timeDiff} seconds ago`;
    } else if (timeDiff < timeType.hour) {
        const min = parseInt(timeDiff / timeType.min);
        timeText += `${min} minutes ago`;
    } else if (timeDiff < timeType.day) {
        const hour = parseInt(timeDiff / timeType.hour);
        timeText += `${hour} hours ago`;
    }

    return div({ className: 'user-action' },
        div({ className: 'user-action-contents' }, text),
        div({ className: 'user-action-time' }, timeText));
};
