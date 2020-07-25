import ElementToDraggable from './dragHandler';
import {
    addEventToMenu, eventType, eventTypeID,
    getListOrdersObj, getListText, setElementPos, setElementSize,
} from '../utils/handleElement';
import { elements } from '../utils/states';
import Handler from './handler';
import { deleteList, putUpdateCard, putUpdateOrder } from '../apis';
import changedList from '../utils/changedList';
import { getID, getUserID } from '../utils/handleCookie';

class ListHandler extends Handler {
    onMouseDown(event) {
        const setHoverStyle = (element) => {
            element.style.position = 'absolute';
            element.style.pointerEvents = 'none';
        };

        const { target } = event;
        const delBtnClassName = 'card-del-btn';
        const titleClassName = 'card-title';

        if (target.className === delBtnClassName || target.className === titleClassName) return;

        const card = target.closest('.card');
        console.log(target);

        if (card && card.dataset?.type === 'card') {
            const hovcerCard = card.cloneNode(true);
            hovcerCard.classList.add('hover-card');
            elements.hoverParentCard = card;
            elements.hoverCard = hovcerCard;
            setHoverStyle(hovcerCard);
            const cardSizeAndPos = card.getBoundingClientRect();
            setElementPos(hovcerCard, cardSizeAndPos.top, cardSizeAndPos.left);
            setElementSize(hovcerCard, cardSizeAndPos.width, cardSizeAndPos.height);

            elements.body.appendChild(hovcerCard);
            new ElementToDraggable(hovcerCard, event.clientX, event.clientY);
            // elementToDraggable(hovcerCard, event.clientX, event.clientY);
        }
    }

    onMouseOver(event) {
        const list = event.currentTarget;
        if (elements.hoverCard) {
            const listWithHover = elements.hoverParentCard.closest('.list');
            if (!list.isEqualNode(listWithHover)) {
                const cardWrap = list.querySelector('.cards-wrap');
                cardWrap.appendChild(elements.hoverParentCard);
                changedList.addChangedListsToState(list, listWithHover);
            }
        }
    }

    clickDeleteList(e) {
        const list = e.target.closest('.list');
        const listWrap = list.parentNode;
        const listName = confirm('리스트를 삭제하시겠습니까?');
        if (listName) {
            deleteList(list.getAttribute('data-listid')).then(() => {
                // alert('리스트를 삭제하시겠습니까 ?');
                listWrap.removeChild(list);
                addEventToMenu({
                    eventTypeID: eventTypeID.removeList,
                    list: getListText(list),
                    typeName: eventType.removeList,
                });
            });
        }
    }

    // clickCreateListBtn(e) {
    //     console.log('d');
    // }
}

export default ListHandler;
