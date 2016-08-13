(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("RegexQuery", [], factory);
	else if(typeof exports === 'object')
		exports["RegexQuery"] = factory();
	else
		root["RegexQuery"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	__webpack_require__(1);
	
	__webpack_require__(2);
	
	function isDOM(obj) {
		if ("HTMLElement" in window) {
			return obj && obj instanceof HTMLElement;
		}
		return !!(obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" && obj.nodeType === 1 && obj.nodeName);
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
			arg = Array.from(arg);
		}
	
		if (Array.isArray(arg)) {
			return arg.filter(isDOM);
		} else if (arg !== '' && (typeof arg === 'string' || arg instanceof String)) {
			return Array.from(document.querySelectorAll(arg));
		}
	
		throw new TypeError('The first param should be a selectorOrDomNode');
	}
	
	function openingTag(el) {
		// The following regex captures the contents of the elements opening tag
		// <div class="one"> -> `div class="one"`
		return el.outerHTML.match(/^<((?:[^>"]+|"[^"]*")+)>/)[1];
	}
	
	function test(el, regex, attr) {
		var content = attr ? el.getAttribute(attr) : openingTag(el);
		return regex.test(content);
	}
	
	function useFindOrFilter(all) {
		return all ? 'filter' : 'find';
	}
	
	function oneOrAll(findAll, regex, attrName) {
		verifyRegex(regex);
		verifyAttributeName(attrName);
	
		var findOrFilter = useFindOrFilter(findAll);
	
		return Array.from(document.querySelectorAll('*'))[findOrFilter](function (el) {
			return test(el, regex, attrName);
		});
	}
	
	function inside(findAll, selectorOrNodeListOrArrayOrElement, regex, attrName) {
		var arrayOfElements = normalizeSelectorOrNodeListOrArrayOrElement(selectorOrNodeListOrArrayOrElement);
	
		verifyRegex(regex);
		verifyAttributeName(attrName);
	
		var findOrFilter = useFindOrFilter(findAll);
	
		return arrayOfElements.map(function (el) {
			return Array.from(el.querySelectorAll('*'));
		}).reduce(function (a, b) {
			return a.concat(b);
		}, [])[findOrFilter](function (el) {
			return test(el, regex, attrName);
		});
	}
	
	function against(findAll, selectorOrNodeListOrArrayOrElement, regex, attrName) {
		var arrayOfElements = normalizeSelectorOrNodeListOrArrayOrElement(selectorOrNodeListOrArrayOrElement);
	
		verifyRegex(regex);
		verifyAttributeName(attrName);
	
		var findOrFilter = useFindOrFilter(findAll);
	
		return arrayOfElements[findOrFilter](function (el) {
			return test(el, regex, attrName);
		});
	}
	
	var QueryByRegex = {
		all: function all() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			return oneOrAll.apply(undefined, [true].concat(args));
		},
		one: function one() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}
	
			return oneOrAll.apply(undefined, [false].concat(args));
		}
	};
	
	QueryByRegex.all.inside = function () {
		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}
	
		return inside.apply(undefined, [true].concat(args));
	};
	QueryByRegex.all.against = function () {
		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}
	
		return against.apply(undefined, [true].concat(args));
	};
	
	QueryByRegex.one.inside = function () {
		for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
			args[_key5] = arguments[_key5];
		}
	
		return inside.apply(undefined, [false].concat(args)) || null;
	};
	QueryByRegex.one.against = function () {
		for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
			args[_key6] = arguments[_key6];
		}
	
		return against.apply(undefined, [false].concat(args)) || null;
	};
	
	exports.default = QueryByRegex;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	(function () {
		if (!Array.prototype.find) {
			Array.prototype.find = function (predicate) {
				'use strict';
	
				if (this == null) {
					throw new TypeError('Array.prototype.find called on null or undefined');
				}
				if (typeof predicate !== 'function') {
					throw new TypeError('predicate must be a function');
				}
				var list = Object(this);
				var length = list.length >>> 0;
				var thisArg = arguments[1];
				var value;
	
				for (var i = 0; i < length; i++) {
					value = list[i];
					if (predicate.call(thisArg, value, i, list)) {
						return value;
					}
				}
				return undefined;
			};
		}
	})();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	// Production steps of ECMA-262, Edition 6, 22.1.2.1
	// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
	if (!Array.from) {
		Array.from = function () {
			var toStr = Object.prototype.toString;
			var isCallable = function isCallable(fn) {
				return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
			};
			var toInteger = function toInteger(value) {
				var number = Number(value);
				if (isNaN(number)) {
					return 0;
				}
				if (number === 0 || !isFinite(number)) {
					return number;
				}
				return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
			};
			var maxSafeInteger = Math.pow(2, 53) - 1;
			var toLength = function toLength(value) {
				var len = toInteger(value);
				return Math.min(Math.max(len, 0), maxSafeInteger);
			};
	
			// The length property of the from method is 1.
			return function from(arrayLike /*, mapFn, thisArg */) {
				// 1. Let C be the this value.
				var C = this;
	
				// 2. Let items be ToObject(arrayLike).
				var items = Object(arrayLike);
	
				// 3. ReturnIfAbrupt(items).
				if (arrayLike == null) {
					throw new TypeError("Array.from requires an array-like object - not null or undefined");
				}
	
				// 4. If mapfn is undefined, then let mapping be false.
				var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
				var T;
				if (typeof mapFn !== 'undefined') {
					// 5. else
					// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
					if (!isCallable(mapFn)) {
						throw new TypeError('Array.from: when provided, the second argument must be a function');
					}
	
					// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
					if (arguments.length > 2) {
						T = arguments[2];
					}
				}
	
				// 10. Let lenValue be Get(items, "length").
				// 11. Let len be ToLength(lenValue).
				var len = toLength(items.length);
	
				// 13. If IsConstructor(C) is true, then
				// 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
				// 14. a. Else, Let A be ArrayCreate(len).
				var A = isCallable(C) ? Object(new C(len)) : new Array(len);
	
				// 16. Let k be 0.
				var k = 0;
				// 17. Repeat, while k < len… (also steps a - h)
				var kValue;
				while (k < len) {
					kValue = items[k];
					if (mapFn) {
						A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
					} else {
						A[k] = kValue;
					}
					k += 1;
				}
				// 18. Let putStatus be Put(A, "length", len, true).
				A.length = len;
				// 20. Return A.
				return A;
			};
		}();
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=regex-query.js.map