// require('core-js/fn/array/from');
// require('core-js/fn/array/find');

function nodeListToArray(nodeList) {
	return [].slice.call(nodeList);
}

function findInArray(array, cb) {
	let length = array.length;
	for (let i = 0; i < length; i++) {
		if (cb(array[i])) {
			return array[i];
		}
	}
}

function normalizeArgs(args) {
	let attr = null;
	let regex = args[0];

	if (args.length == 2 && args[1] instanceof RegExp) {
		attr = args[0];
		regex = args[1];
	}

	return {
		attr: attr,
		regex: regex
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
	one: (...args) => {
		args = normalizeArgs(args);

		return findInArray(getElements(args.attr), el => {
			return test(el, args.attr, args.regex);
		});
	},
	all: (...args) => {
		args = normalizeArgs(args);

		return getElements(args.attr)
			.filter(el => {
				return test(el, args.attr, args.regex);
			})
	}
};

export default QueryByRegex;
