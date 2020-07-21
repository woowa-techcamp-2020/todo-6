import { elements } from '../utils/createdElements';
import { isSameId, moveElement } from '../utils/handleElement';
import Handler from './handler';
import { deleteCard } from '../apis';

class CardHandler extends Handler {
    onMouseMove(event) {
        const { hoverCard } = elements;
        const fixCard = event.currentTarget;

        const cardSizeAndPos = fixCard.getBoundingClientRect();
        const limitTop = cardSizeAndPos.top + 15;
        const limitBottom = cardSizeAndPos.bottom;
        if (elements.hoverCard && !isSameId(fixCard, hoverCard)) {
            const eventY = event.clientY;
            if (limitTop < eventY && eventY < limitBottom) {
                if (Math.abs(limitTop - eventY) < Math.abs(limitBottom - eventY)) {
                    moveElement(fixCard, elements.hoverParentCard);
                } else {
                    moveElement(elements.hoverParentCard, fixCard);
                }
            }
        }
    }

    clickCardDelBtn(event) {
        let cardId;
        let listId;
        if (event.target.className === 'card-del-btn') {
            const curCard = event.target.closest('.card');
            cardId = curCard.getAttribute('data-id');
            listId = curCard.getAttribute('data-listid');
            deleteCard(listId, cardId).then(() => {
                curCard.parentNode.removeChild(curCard);
            });
        }
    }
}

export default CardHandler;
