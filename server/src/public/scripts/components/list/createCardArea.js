import '../../../scss/createCardArea.scss';
import { div, button, input } from '../../utils/element';

const newCardSectionEl = div(
    { className: 'create-card-area' },
    input({
        className: 'input-card-contents', placeholder: 'Enter a note',
    }),
    div({ className: 'btn-wrap' },
        button({ className: 'add-btn' }, 'Add'),
        button({ className: 'cancel-btn' }, 'Cancel')),
);


export default newCardSectionEl;