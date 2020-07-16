const attributeExceptions = [
    'role',
    'dataset',
    'd',
    'r',
    'cx',
    'cy',
    'width',
    'height',
    'viewBox',
    'fill',
];

function appendText(el, text) {
    const textNode = document.createTextNode(text);
    el.appendChild(textNode);
}

function appendArray(el, children) {
    children.forEach((child) => {
        if (Array.isArray(child)) {
            appendArray(el, child);
        } else if (child instanceof window.Element) {
            el.appendChild(child);
        } else if (typeof child === 'string' || typeof child === 'number') {
            appendText(el, child);
        }
    });
}

function setStyles(el, styles) {
    if (!styles) {
        el.removeAttribute('styles');
        return;
    }

    Object.keys(styles).forEach((styleName) => {
        if (styleName in el.style) {
            el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
        } else {
            console.warn(`${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`);
        }
    });
}

function setDataAttributes(el, dataAttributes) {
    Object.keys(dataAttributes).forEach((dataAttribute) => {
        // jsdom doesn't support element.dataset, so set them as named attributes
        el.setAttribute(`data-${dataAttribute}`, dataAttributes[dataAttribute]);
    });
}

function isSvg(type) {
    return ['path', 'svg', 'circle'].includes(type);
}

function makeElement(type, textOrPropsOrChild, ...otherChildren) {
    const el = isSvg(type)
        ? document.createElementNS(SVG_NAMESPACE, type)
        : document.createElement(type);

    if (Array.isArray(textOrPropsOrChild)) {
        appendArray(el, textOrPropsOrChild);
    } else if (textOrPropsOrChild instanceof window.Element) {
        el.appendChild(textOrPropsOrChild);
    } else if (typeof textOrPropsOrChild === 'string' || typeof textOrPropsOrChild === 'number') {
        appendText(el, textOrPropsOrChild);
    } else if (typeof textOrPropsOrChild === 'object') {
        Object.keys(textOrPropsOrChild).forEach((propName) => {
            if (propName in el || attributeExceptions.includes(propName)) {
                const value = textOrPropsOrChild[propName];

                if (propName === 'style') {
                    setStyles(el, value);
                } else if (propName === 'dataset') {
                    setDataAttributes(el, value);
                } else if (typeof value === 'function' || propName === 'className') {
                    el[propName] = value; // e.g. onclick
                } else if (value) {
                    el.setAttribute(propName, value); // need this for SVG elements
                }
            } else {
                console.warn(`${propName} is not a valid property of a <${type}>`);
            }
        });
    }

    if (otherChildren) appendArray(el, otherChildren);

    return el;
}

export const a = (...args) => makeElement('a', ...args);
export const input = (...args) => makeElement('input', ...args);
export const button = (...args) => makeElement('button', ...args);
export const div = (...args) => makeElement('div', ...args);
export const h1 = (...args) => makeElement('h1', ...args);
export const h2 = (...args) => makeElement('h2', ...args);
export const h3 = (...args) => makeElement('h3', ...args);
export const header = (...args) => makeElement('header', ...args);
export const p = (...args) => makeElement('p', ...args);
export const span = (...args) => makeElement('span', ...args);
export const ul = (...args) => makeElement('ul', ...args);
export const li = (...args) => makeElement('li', ...args);
export const img = (...args) => makeElement('img', ...args);
export const form = (...args) => makeElement('form', ...args);
export const select = (...args) => makeElement('select', ...args);
export const option = (...args) => makeElement('option', ...args);
export const label = (...args) => makeElement('label', ...args);
export const script = (...args) => makeElement('script', ...args);
export const textarea = (...args) => makeElement('textarea', ...args);


