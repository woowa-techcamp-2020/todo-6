import { elements } from '../utils/states';
import {
    addEventToMenu,
    eventType,
    eventTypeID,
    getCardText,
    getListOrdersObj, getListText,
    isSameCardId, updateCardCount,
} from '../utils/handleElement';
import Handler from './handler';
import {
    deleteCard, getUser, putUpdateCard, putUpdateOrder,
} from '../apis';
import { getID, getUserID } from '../utils/handleCookie';

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
    }
};

const isLastElement = (element) => element.nextSibling === null;

class CardHandler extends Handler {
    onMouseMove(event) {
        const { hoverCard } = elements;
        const fixCard = event.currentTarget;

        const cardSizeAndPos = fixCard.getBoundingClientRect();
        const padding = 15;
        const limitTop = cardSizeAndPos.top + padding;
        const limitBottom = cardSizeAndPos.bottom;
        if (elements.hoverCard && !isSameCardId(fixCard, hoverCard)) {
            const eventY = event.clientY;
            const { hoverParentCard } = elements;
            if (limitTop < eventY && eventY < limitBottom) {
                if (isNearTop(limitTop, limitBottom, eventY) && !isLastElement(hoverParentCard)) {
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
            const deleteAlert = confirm('카드를 삭제하시겠습니까?');
            if (deleteAlert) {
                const curCard = event.target.closest('.card');
                cardId = curCard.getAttribute('data-cardid');
                listId = curCard.getAttribute('data-listid');
                // console.log(cardId, listId);
                const list = curCard.closest('.list');

                deleteCard(listId, cardId)
                    .then(() => {
                        const eventObj = {
                            userID: getUserID(),
                            id: getID(),

                            eventTypeID: eventTypeID.removeCard,
                            card: getCardText(curCard),
                            list: getListText(list),
                            typeName: eventType.removeCard,
                        };
                        addEventToMenu(eventObj);
                    })
                    .then(() => {
                        curCard.parentNode.removeChild(curCard);
                        putUpdateOrder(getListOrdersObj(listId));
                        updateCardCount(list);
                    });
            }
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
