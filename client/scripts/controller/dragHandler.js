import {
    addEventToMenu, eventType, eventTypeID, getCardText, getListOrdersObj, getListText, setElementPos,
} from '../utils/handleElement';
import { elements } from '../utils/states';
import { putUpdateCard, putUpdateOrder } from '../apis';
import changedList from '../utils/changedList';

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
        elements.hoverParentCard.classList.add('under-hover-card');
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
        elements.hoverCard = null;
        elements.constructor = null;
        elements.hoverParentCard.classList.remove('under-hover-card');
    }

    updateEvnet(list, hoverParentCard) {
        if (this.beforeListID !== this.listID) {
            const cardText = getCardText(hoverParentCard);
            const listTitle = getListText(list);
            const beforeList = document.querySelector(`[data-listid='${this.beforeListID}']`);
            const befreListTitle = getListText(beforeList);

            addEventToMenu({
                userID: 1,
                id: 'auddn6676',
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

        try {
            const { hoverParentCard } = elements;

            const list = hoverParentCard.closest('.list');
            const listID = list.dataset.listid;
            this.listID = listID;
            hoverParentCard.dataset.listid = this.listID;
            changedList.addChangedListsToState(list);
            changedList.updateCardsOrder();
            putUpdateCard({
                listID,
                cardID: hoverParentCard.dataset.cardid,
            });
            this.updateEvnet(list, hoverParentCard);
        } catch (e) {
            console.log(e);
        }
        this.removeHoverInfoInElements();
    }
}
