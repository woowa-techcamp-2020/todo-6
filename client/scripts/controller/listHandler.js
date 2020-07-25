import ElementToDraggable from './dragHandler';
import {
    addEventToMenu, eventType, eventTypeID,
    getListText, isCardType, isListType, isSameListId, setElementPos, setElementSize, moveElement, getAllListsOrderObj,
} from '../utils/handleElement';
import { elements } from '../utils/states';
import Handler from './handler';
import { deleteList, updateUserOrder } from '../apis';
import changedList from '../utils/changedList';

class ListHandler extends Handler {
    startDrag(card) {
        const setHoverStyle = (element) => {
            element.style.position = 'absolute';
            element.style.pointerEvents = 'none';
        };

        const hovcerCard = card.cloneNode(true);
        hovcerCard.classList.add('hover-card');
        elements.hoverParentElement = card;
        elements.hoverElement = hovcerCard;
        setHoverStyle(hovcerCard);
        const cardSizeAndPos = card.getBoundingClientRect();
        setElementPos(hovcerCard, cardSizeAndPos.top, cardSizeAndPos.left);
        setElementSize(hovcerCard, cardSizeAndPos.width, cardSizeAndPos.height);

        elements.body.appendChild(hovcerCard);
        new ElementToDraggable(hovcerCard, event.clientX, event.clientY);
        // elementToDraggable(hovcerCard, event.clientX, event.clientY);
    }

    isDraggableCardSection(target) {
        const delBtnClassName = 'card-del-btn';
        const titleClassName = 'card-title';
        if (target.className === delBtnClassName
            || target.className === titleClassName) return false;

        const card = target.closest('.card');
        return card && card.dataset?.type === 'card';
    }

    isDraggableListSection(target) {
        const delBtnClassName = 'list-delete-btn';
        const titleClassName = 'list-title';
        const cardAddBtnClassName = 'add-card-btn';
        if (target.className === delBtnClassName
            || target.className === titleClassName
            || target.className === cardAddBtnClassName) return false;

        const list = target.closest('.list');
        const cardWrap = target.closest('.cards-wrap');
        return list !== null && cardWrap === null;
    }

    onMouseDown(event) {
        const { target } = event;

        if (this.isDraggableCardSection(target)) {
            const card = target.closest('.card');
            this.startDrag(card);
        } else if (this.isDraggableListSection(target)) {
            const list = target.closest('.list');
            this.startDrag(list);
        }
    }

    listCoverHandle(coveredList, eventX) {
        const isNearLeft = (midX, x) => midX - x > 0;
        const { hoverElement } = elements;
        const listSizeAndPos = coveredList.getBoundingClientRect();
        const limitLeft = listSizeAndPos.left;
        const limitRight = listSizeAndPos.right;
        const mid = (listSizeAndPos.right + listSizeAndPos.left) / 2;
        if (elements.hoverElement && !isSameListId(coveredList, hoverElement)) {
            const { hoverParentElement } = elements;
            if (limitLeft < eventX && eventX < limitRight) {
                const listType = 'list';
                if (isNearLeft(mid, eventX)) {
                    moveElement(coveredList, hoverParentElement, listType);
                } else {
                    moveElement(hoverParentElement, coveredList, listType);
                }
            }
        }
    }

    onMouseOver(event) {
        const list = event.currentTarget;
        if (elements.hoverElement) {
            const listWithHover = elements.hoverParentElement.closest('.list');
            if (!list.isEqualNode(listWithHover) && isCardType(elements.hoverElement)) {
                const cardWrap = list.querySelector('.cards-wrap');
                cardWrap.appendChild(elements.hoverParentElement);
                changedList.addChangedListsToState(list, listWithHover);
            } else if (isListType(elements.hoverElement)) {
                this.listCoverHandle(event.currentTarget, event.clientX);
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
                updateUserOrder(getAllListsOrderObj());
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
