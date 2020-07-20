import { elementToDraggable } from './dragHandler';
import { setElementPos, setElementSize } from '../utils/handleElement';
import { elements } from '../utils/createdElements';
import Handler from './handler';

class ListHandler extends Handler {
    onMouseDown(event) {
        const setHoverStyle = (element) => {
            element.style.position = 'absolute';
            element.style.pointerEvents = 'none';
        };

        const { target } = event;
        if (target?.dataset?.type === 'card') {
            const hovcerCard = target.cloneNode(true);
            elements.hoverParentCard = target;
            elements.hoverCard = hovcerCard;
            setHoverStyle(hovcerCard);
            const cardSizeAndPos = target.getBoundingClientRect();
            setElementPos(hovcerCard, cardSizeAndPos.top, cardSizeAndPos.left);
            setElementSize(hovcerCard, cardSizeAndPos.width, cardSizeAndPos.height);

            elements.body.appendChild(hovcerCard);

            elementToDraggable(hovcerCard, event.clientX, event.clientY);
        }
    }

    onMouseOver(event) {
        const list = event.currentTarget;
        if (elements.hoverCard) {
            const listWithHover = elements.hoverParentCard.closest('.list');
            if (!list.isEqualNode(listWithHover)) {
                const cardWrap = list.querySelector('.cards-wrap');
                cardWrap.appendChild(elements.hoverParentCard);
            }
        }
    }
}

export default ListHandler;
