import {
    addEventToMenu,
    eventType,
    eventTypeID,
    getUpdatedOrder,
    getCardText,
    getListOrdersObj,
    getListText,
    isCardType,
    setElementPos, getListOrder,
} from '../utils/handleElement';
import { elements } from '../utils/states';
import { putUpdateCard, putUpdateOrder, updateListOrder } from '../apis';
import changedList from '../utils/changedList';
import { getID, getUserID } from '../utils/handleCookie';

export default class ElementToDraggable {
    constructor(hoverCard, x, y) {
        this.hoverCard = hoverCard;
        this.beforeListID = hoverCard.dataset.listid;
        this.differX = 0;
        this.differY = 0;
        this.curX = 0;
        this.curY = 0;
        this.curX = x;
        this.curY = y;
        document.onmouseup = this.closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = this.elementDrag;
        elements.hoverParentElement.classList.add('under-hover-card');
        elements.listOrder = getListOrder(elements.hoverParentElement);
    }

    elementDrag = (event) => {
        event.preventDefault();

        this.differX = this.curX - event.clientX;
        this.differY = this.curY - event.clientY;
        this.curX = event.clientX;
        this.curY = event.clientY;

        const newTop = this.hoverCard.offsetTop - this.differY;
        const newLeft = this.hoverCard.offsetLeft - this.differX;
        setElementPos(this.hoverCard, newTop, newLeft);
    }

    removeHoverInfoInElements() {
        elements.hoverElement = null;
        elements.constructor = null;
        elements.listOrder = 0;
        elements.hoverParentElement.classList.remove('under-hover-card');
    }

    updateEvnet(list, hoverParentCard) {
        if (this.beforeListID !== this.listID) {
            const cardText = getCardText(hoverParentCard);
            const listTitle = getListText(list);
            const beforeList = document.querySelector(`[data-listid='${this.beforeListID}']`);
            const befreListTitle = getListText(beforeList);

            addEventToMenu({
                eventTypeID: eventTypeID.moveCard,
                card: cardText,
                list: listTitle,
                beforeList: befreListTitle,
                typeName: eventType.moveCard,
            });
        }
    }

    closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        this.hoverCard.remove();
        const { hoverParentElement } = elements;

        if (isCardType(hoverParentElement)) {
            try {
                const list = hoverParentElement.closest('.list');
                const listID = list.dataset.listid;
                this.listID = listID;
                hoverParentElement.dataset.listid = this.listID;
                changedList.addChangedListsToState(list);
                changedList.updateCardsOrder();
                putUpdateCard({
                    listID,
                    cardID: hoverParentElement.dataset.cardid,
                });
                this.updateEvnet(list, hoverParentElement);
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                updateListOrder();
            } catch (e) {
                console.log(e);
            }
        }

        this.removeHoverInfoInElements();
    }
}
