import { elements } from '../utils/createdElements';
import { changeOrder, isSameId, moveElement } from '../utils/handleElement';

export const cardOnMouseOverHandler = (event) => {
};

export const cardOnMouseMoveHandler = function (event) {
    const { hoverCard } = elements;
    const fixCard = event.currentTarget;

    const cardSizeAndPos = fixCard.getBoundingClientRect();
    const limitTop = cardSizeAndPos.top + 15;
    const limitBottom = cardSizeAndPos.bottom;
    if (elements.hoverCard && !isSameId(fixCard, hoverCard)) {
        const eventY = event.clientY;
        if (limitTop < eventY && eventY < limitBottom) {
            if (Math.abs(limitTop - eventY) < Math.abs(limitBottom - eventY)) {
                moveElement(fixCard, fixCard.previousElementSibling);
            } else {
                moveElement(fixCard.nextElementSibling, fixCard);
            }
        }
    }
};

export const cardHeaderOnMouseOverHandler = (event) => {
    event.stopPropagation();
};
