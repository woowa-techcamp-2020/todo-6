import {
    addEventToMenu, eventType, eventTypeID, getListOrdersObj, setElementPos,
} from '../utils/handleElement';
import { elements } from '../utils/states';
import { putUpdateCard, putUpdateOrder } from '../apis';
import changedList from '../utils/changedList';

export function elementToDraggable(element, x, y) {
    let differX = 0; let differY = 0; let curX = 0; let
        curY = 0;
    curX = x;
    curY = y;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;

    elements.hoverParentCard.classList.add('under-hover-card');

    function elementDrag(event) {
        event.preventDefault();

        differX = curX - event.clientX;
        differY = curY - event.clientY;
        curX = event.clientX;
        curY = event.clientY;

        const newTop = element.offsetTop - differY;
        const newLeft = element.offsetLeft - differX;
        setElementPos(element, newTop, newLeft);
    }

    function removeHoverInfoInElements() {
        elements.hoverCard = null;
        elements.constructor = null;
        elements.hoverParentCard.classList.remove('under-hover-card');
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        element.remove();

        try {
            const { hoverParentCard } = elements;

            const list = hoverParentCard.closest('.list');
            const listID = list.dataset.listid;
            hoverParentCard.dataset.listid = listID;
            changedList.addChangedListsToState(list);
            changedList.updateCardsOrder();
            putUpdateCard({
                listID,
                cardID: hoverParentCard.dataset.cardid,
            });
        } catch (e) {
        }
        removeHoverInfoInElements();
    }
}
