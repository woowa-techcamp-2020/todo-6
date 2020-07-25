import { div } from './element';
import { userEvent } from '../components/userEvent';
import { postEvent, putUpdateOrder } from '../apis';
import { getID, getUserID } from './handleCookie';

/**
 * reference: https://medium.com/hackernoon/how-i-converted-my-react-app-to-vanillajs-and-whether-or-not-it-was-a-terrible-idea-4b14b1b2faff
 */
export const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;
export function appendText(element, text) {
    if (htmlTagRegex.test(text)) {
        element.innerHTML = text;
    } else {
        const textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }
}

export function appendArray(element, children) {
    children.forEach((child) => {
        if (Array.isArray(child)) {
            appendArray(element, child);
        } else if (child instanceof window.Element) {
            element.appendChild(child);
        } else if (typeof child === 'string' || typeof child === 'number') {
            appendText(element, child);
        }
    });
}

/**
 * @description set element styles
 * @param{HTMLElement} element
 * @param{Object} styles
 */
export function setStyles(element, styles) {
    if (!styles) {
        element.removeAttribute('styles');
        return;
    }

    Object.keys(styles).forEach((styleName) => {
    // check style in element
        if (styleName in element.style) {
            element.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
        } else {
            console.warn(`${styleName} is not a valid style for a <${element.tagName.toLowerCase()}>`);
        }
    });
}

/**
 * @description add data element
 * @link https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
 * @param{HTMLElement} element
 * @param{Object} dataAttributes
 */
export function setDataAttributes(element, dataAttributes) {
    Object.keys(dataAttributes).forEach((dataAttribute) => {
    // jsdom doesn't support element.dataset, so set them as named attributes
        element.setAttribute(`data-${dataAttribute}`, dataAttributes[dataAttribute]);
    });
}

/**
 * @description create element and append child
 * @pxfaram{string} type
 * @param{Object | Array | HTMLElement} firstChild
 * @param otherChildren
 * @returns {*}
 */
export function makeElement(type, firstChild, ...otherChildren) {
    const element = document.createElement(type);

    if (Array.isArray(firstChild)) {
        appendArray(element, firstChild);
    } else if (firstChild instanceof window.Element) {
        element.appendChild(firstChild);
    } else if (typeof firstChild === 'string' || typeof firstChild === 'number') {
        appendText(element, firstChild);
    } else if (typeof firstChild === 'object') {
    // set element property
        Object.keys(firstChild).forEach((propertyName) => {
            if (propertyName in element) {
                /**
                 * key : property name
                 * value : property value
                 */
                const value = firstChild[propertyName];
                if (propertyName === 'style') {
                    setStyles(element, value);
                } else if (propertyName === 'dataset') {
                    setDataAttributes(element, value);
                } else if (typeof value === 'function' || propertyName === 'className' || propertyName === 'draggable' || propertyName === 'disabled' || propertyName === 'placeholder' || propertyName === 'maxLength') {
                    element[propertyName] = value;
                }
            } else {
                console.warn(`${propertyName} is not a valid property of a <${type}>`);
            }
        });
    }

    if (otherChildren) appendArray(element, otherChildren);

    return element;
}

export const setElementPos = (element, top, left) => {
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
};

export const setElementSize = (element, width, height) => {
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
};

export const getListOrdersObj = (listID) => {
    const orders = [];
    const wrap = document.querySelector(`[data-wrapid='${listID}']`);
    const cards = wrap.querySelectorAll('.card');
    cards.forEach((card) => {
        orders.push(card.dataset.cardid);
    });
    return {
        listID,
        orders: `[${orders}]`,
    };
};

/**
 '1','move_list'
 '2','move_card'
 '3','update_list'
 '4','update_card'
 '5','remove_list'
 '6','remove_card'
 '7','add_list'
 '8','add_card'
 */
export const eventTypeID = {
    moveList: 1,
    moveCard: 2,
    updateList: 3,
    updateCard: 4,
    removeList: 5,
    removeCard: 6,
    addList: 7,
    addCard: 8,
};

export const eventType = {
    moveList: 'move_list',
    moveCard: 'move_card',
    updateList: 'update_list',
    updateCard: 'update_card',
    removeList: 'remove_list',
    removeCard: 'remove_card',
    addList: 'add_list',
    addCard: 'add_card',
};

// 1. moved the column 리스트 이름
// 2. moved 카드 이름 from 이전 리스트 to 현재 리스트
// 3. updated 리스트 이름
// 4. updated 카드이름
// 5. added 리스트 이름
// 6. added 카드 이름 to 리스트 이름
// 7. removed 리스트 이름
// 8. removed 카드 이름 from 리스트 이름
export const getEventText = (event) => {
    let text = `<span>@${event.id}</span> `;
    switch (event.typeName) {
    case eventType.moveList:
        break;
    case eventType.moveCard:
        text += `moved <span>${event.card}</span> from ${event.beforeList} to ${event.list}`;
        break;
    case eventType.updateList:
        text += `updated ${event.list}`;
        break;
    case eventType.updateCard:
        text += `updated <span>${event.card}</span> from ${event.list}`;
        break;
    case eventType.addList:
        text += `added ${event.list}`;
        break;
    case eventType.addCard:
        text += `added <span>${event.card}</span> to ${event.list}`;
        break;
    case eventType.removeList:
        text += `removed ${event.list}`;
        break;
    case eventType.removeCard:
        text += `removed <span>${event.card}</span> from ${event.list}`;
        break;
    default:
        break;
    }
    return text;
};

export const getSqlTime = () => new Date().toISOString().slice(0, 19).replace('T', ' ');

export const addEventToMenu = (event) => {
    const userInfo = {
        userID: getUserID(),
        id: getID(),
    };
    const containUserInfoEvent = { ...event, ...userInfo };
    postEvent(containUserInfoEvent)
        .then((res) => {
            const eventWrap = document.querySelector('.user-record-wrap');
            const newEvent = event;
            newEvent.created = res.created;
            if (eventWrap.hasChildNodes()) {
                eventWrap.insertBefore(userEvent(newEvent), eventWrap.firstElementChild);
            } else {
                eventWrap.appendChild(userEvent(newEvent));
            }
        });
};

export const updateCardCount = (list) => {
    const cardCount = list.querySelector('.cards-count');
    const cardWrap = list.querySelector('.cards-wrap');
    cardCount.textContent = cardWrap.querySelectorAll('.card').length;
};

export const getCardText = (card) => card.querySelector('.card-title').textContent;

export const getListText = (list) => list.querySelector('.list-title').textContent;

/**
 *
 * @param{HTMLElement} left
 * @param{HTMLElement} right
 */
export const isSameCardId = (left, right) => left?.dataset?.cardid === right?.dataset?.cardid;
