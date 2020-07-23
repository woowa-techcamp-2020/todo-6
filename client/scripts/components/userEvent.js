import { div } from '../utils/element';
import { getEventText } from '../utils/handleElement';

export const userEvent = (event) => {
    const text = getEventText(event);
    return div({ className: 'user-action' },
        div({ className: 'user-action-contents' }, text),
        div({ className: 'user-action-time' }, '@blair moved the column 하는중'));
};
