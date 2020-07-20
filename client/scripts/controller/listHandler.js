import { elementToDraggable } from './dragHandler';
import { setElementPos, setElementSize } from '../utils/handleElement';
import { elements } from '../utils/createdElements';

export const listOnMouseDownHandler = (event) => {
    const setHoverStyle = (element) => {
        element.style.position = 'absolute';
        element.style.pointerEvents = 'none';
    };

    const { target } = event;
    if (target?.dataset?.type === 'card') {
        const hovcerCard = target.cloneNode(true);
        elements.hoverCard = hovcerCard;
        setHoverStyle(hovcerCard);
        const cardSizeAndPos = target.getBoundingClientRect();
        setElementPos(hovcerCard, cardSizeAndPos.top, cardSizeAndPos.left);
        setElementSize(hovcerCard, cardSizeAndPos.width, cardSizeAndPos.height);

        elements.body.appendChild(hovcerCard);

        elementToDraggable(hovcerCard, event.clientX, event.clientY);
    }
};
