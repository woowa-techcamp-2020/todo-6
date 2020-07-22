import { elements } from '../utils/createdElements';
import { isSameCardId } from '../utils/handleElement';
import Handler from './handler';

const isNearTop = (top, bottom, eventY) => Math.abs(top - eventY) < Math.abs(bottom - eventY);

/**
 *
 * @param{HTMLElement} left
 * @param{HTMLElement} right
 */
const moveElement = (beUpElement, beDownElement) => {
    try {
        const cardsWrap = beUpElement.closest('.cards-wrap');
        cardsWrap.insertBefore(beUpElement, beDownElement);
    } catch (err) {
        console.log(err);
    }
};

const isLastElement = (element) => element.nextSibling === null;

class CardHandler extends Handler {
    onMouseMove(event) {
        const { hoverCard } = elements;
        const fixCard = event.currentTarget;

        const cardSizeAndPos = fixCard.getBoundingClientRect();
        const limitTop = cardSizeAndPos.top + 15;
        const limitBottom = cardSizeAndPos.bottom;
        if (elements.hoverCard && !isSameCardId(fixCard, hoverCard)) {
            const eventY = event.clientY;
            const { hoverParentCard } = elements;
            if (limitTop < eventY && eventY < limitBottom) {
                if (isNearTop(limitTop, limitBottom, eventY) && !isLastElement(hoverParentCard)) {
                    console.log(isLastElement(hoverParentCard));
                    moveElement(fixCard, hoverParentCard);
                } else {
                    moveElement(hoverParentCard, fixCard);
                }
            }
        }
    }
}

export default CardHandler;
