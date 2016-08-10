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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	__webpack_require__(1);
	
	function nodeListToArray(nodeList) {
		var array = [];
		var length = nodeList.length;
		for (var i = 0; i < length; i++) {
			array.push(nodeList[i]);
		}
		return array;
	}
	
	function isDOM(obj) {
		if ("HTMLElement" in window) {
			return obj && obj instanceof HTMLElement;
		}
		return !!(obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj.nodeType === 1 && obj.nodeName);
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
		if (arg instanceof NodeList) {
			arg = nodeListToArray(arg);
		}
	
		if (Array.isArray(arg)) {
			return arg.filter(isDOM);
		} else if (arg !== '' && (typeof arg === 'string' || arg instanceof String)) {
			return nodeListToArray(document.querySelectorAll(arg));
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
	
	function setFindOrFilter(useFilter) {
		var oldFindOrFilter = Array.prototype._findOrFilter;
	
		var useThis = useFilter ? 'filter' : 'find';
	
		Array.prototype._findOrFilter = function () {
			Array.prototype._findOrFilter = oldFindOrFilter;
			return this[useThis].apply(this, arguments);
		};
	}
	
	function oneOrAll(findAll, regex, attrName) {
		verifyRegex(regex);
		verifyAttributeName(attrName);
	
		setFindOrFilter(findAll);
	
		return nodeListToArray(document.querySelectorAll('*'))._findOrFilter(function (el) {
			return test(el, regex, attrName);
		});
	}
	
	function inside(findAll, selectorOrNodeListOrArrayOrElement, regex, attrName) {
		var arrayOfElements = normalizeSelectorOrNodeListOrArrayOrElement(selectorOrNodeListOrArrayOrElement);
	
		verifyRegex(regex);
		verifyAttributeName(attrName);
	
		setFindOrFilter(findAll);
	
		return arrayOfElements.map(function (el) {
			return nodeListToArray(el.querySelectorAll('*'));
		}).reduce(function (a, b) {
			return a.concat(b);
		}, [])._findOrFilter(function (el) {
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
	
	QueryByRegex.one.inside = function () {
		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}
	
		return inside.apply(undefined, [false].concat(args)) || null;
	};
	
	exports.default = QueryByRegex;
	module.exports = exports["default"];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=regex-query.js.map