import { elementToDraggable } from './dragHandler';
import { setElementPos, setElementSize } from '../utils/handleElement';
import { elements } from '../utils/createdElements';

export const listOnMouseDownHandler = (event) => {
    const { target } = event;
    if (target?.dataset?.type === 'card') {
        const hovcerCard = target.cloneNode(true);
        hovcerCard.className = 'hover-card';
        hovcerCard.onmouseover = null;
        const cardSizeAndPos = target.getBoundingClientRect();
        setElementPos(hovcerCard, cardSizeAndPos.top, cardSizeAndPos.left);
        setElementSize(hovcerCard, cardSizeAndPos.width, cardSizeAndPos.height);

        elements.body.appendChild(hovcerCard);

        elementToDraggable(hovcerCard, event.clientX, event.clientY);
    }
    console.log(target?.dataset?.type);
};
