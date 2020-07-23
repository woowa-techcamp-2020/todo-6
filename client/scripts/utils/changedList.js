import { putUpdateOrder } from '../apis';
import { getListOrdersObj, updateCardCount } from './handleElement';

class ChangedList {
    constructor() {
        this.state = {};
    }

    addChangedListsToState(...lists) {
        lists.forEach((list) => {
            this.state[list.dataset.listid] = list;
        });
    }

    updateCardsOrder() {
        const stateList = Object.values(this.state);
        stateList.forEach((list) => {
            putUpdateOrder(getListOrdersObj(list.dataset.listid));
            updateCardCount(list, 'drag');
        });
        this.state = {};
    }
}

const changedList = new ChangedList();

export default changedList;
