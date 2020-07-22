/**
 * reference: https://medium.com/hackernoon/how-i-converted-my-react-app-to-vanillajs-and-whether-or-not-it-was-a-terrible-idea-4b14b1b2faff
 */

export function appendText(element, text) {
    const textNode = document.createTextNode(text);
    element.appendChild(textNode);
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
    console.log(cards);
    cards.forEach((card) => {
        orders.push(card.dataset.cardid);
    });
    return {
        listID,
        orders: `[${orders}]`,
    };
};

/**
 *
 * @param{HTMLElement} left
 * @param{HTMLElement} right
 */
export const isSameCardId = (left, right) => left?.dataset?.cardid === right?.dataset?.cardid;
