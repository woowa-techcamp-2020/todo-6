import { elements } from '../utils/createdElements';
import { isSameCardId } from '../utils/handleElement';
import Handler from './handler';
import { deleteCard, putUpdateCard } from '../apis';

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

    clickCardDelBtn(event) {
        let cardId;
        let listId;
        if (event.target.className === 'card-del-btn') {
            alert('카드를 삭제하시겠습니까?');
            const curCard = event.target.closest('.card');
            cardId = curCard.getAttribute('data-cardid');
            listId = curCard.getAttribute('data-listid');
            deleteCard(listId, cardId).then(() => {
                curCard.parentNode.removeChild(curCard);
            });
        }
    }

    // update api 날리고 받은 res로 돔작
    clickCardSaveBtn(updatedCardObj) {
        // put api요청 후
        putUpdateCard(updatedCardObj).then((res) => {
            const cardNode = document.querySelector(`[data-cardid='${updatedCardObj.cardID}']`);
            cardNode.querySelector('.card-title').textContent = res.cardText;
        });
    }
}

export default CardHandler;
