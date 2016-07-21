// require('core-js/fn/array/from');
// require('core-js/fn/array/find');

function nodeListToArray(nodeList) {
	let array = [];
	let length = nodeList.length;
	for (let i = 0; i < length; i++) {
		array.push(nodeList[i]);
	}
	return array;
}

function findInArray(array, cb) {
	let length = array.length;
	for (let i = 0; i < length; i++) {
		if (cb(array[i])) {
			return array[i];
		}
	}
}

function getElements(attr) {
	let selector = (attr) ? `[${attr}]` : '*';

	return nodeListToArray(
		document.querySelectorAll(selector)
	);
}

function openingTag(el) {
	// The following regex captures the contents of the elements opening tag
	// <div class="one"> -> `div class="one"`
	return el.outerHTML.match(/^<((?:[^>"]+|"[^"]*")+)>/)[1];
}

function test(el, attr, regex) {
	let content = (attr) ? el.getAttribute(attr) : openingTag(el);
	return regex.test(content);
}

let QueryByRegex = {
	one: (regex, attr) => {
		return findInArray(getElements(attr), el => {
			return test(el, attr, regex);
		});
	},
	all: (regex, attr) => {
		return getElements(attr)
			.filter(el => {
				return test(el, attr, regex);
			})
	}
};

export default QueryByRegex;
