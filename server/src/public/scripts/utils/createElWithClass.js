/**
 * @file <Create new element>
 * @param element
 * @param className
 * @param text
 * @returns {Element}
 */
export function createElWithClass(element, className, text) {
	const el = document.createElement(element);

	el.className = className
	if (text.length) {
		el.innerText = text;
	}
	return el
}