import 'polyfill-array-find.js';

function nodeListToArray(nodeList) {
	let array = [];
	let length = nodeList.length;
	for (let i = 0; i < length; i++) {
		array.push(nodeList[i]);
	}
	return array;
}

function isDOM(obj) {
	if ("HTMLElement" in window) {
		return (obj && obj instanceof HTMLElement);
	}
	return !!(obj && typeof obj === "object" && obj.nodeType === 1 && obj.nodeName);
}

function verifyRegex(possibleRegex) {
	if (possibleRegex instanceof RegExp) {
		return true;
	}
	throw new TypeError('The regex parameter must be a Regular Expression');
}

function verifyAttributeName(possibleAttribute) {
	if (!possibleAttribute || typeof possibleAttribute === 'string') {
		return true;
	}

	throw new TypeError('The attr parameter must be a non-empty String');
}

function normalizeSelectorOrNodeListOrArrayOrElement(arg) {

	if (isDOM(arg)) {
		return [arg];
	}

	if (arg instanceof NodeList) {
		arg = nodeListToArray(arg);
	}

	if (Array.isArray(arg)) {
		return arg.filter(isDOM);
	}
	else if (arg !== '' && (typeof arg === 'string' || arg instanceof String)) {
		return nodeListToArray(
			document.querySelectorAll(arg)
		)
	}

	throw new TypeError('The first param should be a selectorOrDomNode');
}

function openingTag(el) {
	// The following regex captures the contents of the elements opening tag
	// <div class="one"> -> `div class="one"`
	return el.outerHTML.match(/^<((?:[^>"]+|"[^"]*")+)>/)[1];
}

function test(el, regex, attr) {
	let content = (attr) ? el.getAttribute(attr) : openingTag(el);
	return regex.test(content);
}

function oneOrAll(findAll, regex, attrName) {
	verifyRegex(regex);
	verifyAttributeName(attrName);

	let method = (findAll) ? 'filter' : 'find';

	return nodeListToArray(document.querySelectorAll('*'))
		[method](el => test(el, regex, attrName));
}

function inside(findAll, selectorOrNodeListOrArrayOrElement, regex, attrName) {
	let arrayOfElements = normalizeSelectorOrNodeListOrArrayOrElement(
		selectorOrNodeListOrArrayOrElement
	);

	verifyRegex(regex);
	verifyAttributeName(attrName);

	let method = (findAll) ? 'filter' : 'find';

	return arrayOfElements
		.map(el => nodeListToArray(el.querySelectorAll('*')))
		.reduce((a, b) => a.concat(b), [])
		[method](el => test(el, regex, attrName));
}

function against(findAll, selectorOrNodeListOrArrayOrElement, regex, attrName) {
	let arrayOfElements = normalizeSelectorOrNodeListOrArrayOrElement(
		selectorOrNodeListOrArrayOrElement
	);

	verifyRegex(regex);
	verifyAttributeName(attrName);

	let method = (findAll) ? 'filter' : 'find';

	return arrayOfElements
		[method](el => test(el, regex, attrName));
}

const QueryByRegex = {
	all: (...args) => oneOrAll(true, ...args),
	one: (...args) => oneOrAll(false, ...args)
};

QueryByRegex.all.inside = (...args) => inside(true, ...args);
QueryByRegex.all.against = (...args) => against(true, ...args);

QueryByRegex.one.inside = (...args) => inside(false, ...args) || null;
QueryByRegex.one.against = (...args) => against(false, ...args) || null;

export default QueryByRegex;
