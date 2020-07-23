import { elementToDraggable } from './dragHandler';
import {
    getListOrdersObj, setElementPos, setElementSize,
} from '../utils/handleElement';
import { elements } from '../utils/states';
import Handler from './handler';
import { deleteList, putUpdateCard, putUpdateOrder } from '../apis';
import changedList from '../utils/changedList';

class ListHandler extends Handler {
    onMouseDown(event) {
        const setHoverStyle = (element) => {
            element.style.position = 'absolute';
            element.style.pointerEvents = 'none';
        };

        const { target } = event;
        if (target?.dataset?.type === 'card') {
            const hovcerCard = target.cloneNode(true);
            hovcerCard.classList.add('hover-card');
            elements.hoverParentCard = target;
            elements.hoverCard = hovcerCard;
            setHoverStyle(hovcerCard);
            const cardSizeAndPos = target.getBoundingClientRect();
            setElementPos(hovcerCard, cardSizeAndPos.top, cardSizeAndPos.left);
            setElementSize(hovcerCard, cardSizeAndPos.width, cardSizeAndPos.height);

            elements.body.appendChild(hovcerCard);

            elementToDraggable(hovcerCard, event.clientX, event.clientY);
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
        deleteList(list.getAttribute('data-listid')).then(() => {
            alert('리스트를 삭제하시겠습니까 ?');
            listWrap.removeChild(list);
        });
    }

    // clickCreateListBtn(e) {
    //     console.log('d');
    // }
}

export default ListHandler;
