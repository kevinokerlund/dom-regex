(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("QueryByRegex", [], factory);
	else if(typeof exports === 'object')
		exports["QueryByRegex"] = factory();
	else
		root["QueryByRegex"] = factory();
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// require('core-js/fn/array/from');
	// require('core-js/fn/array/find');
	
	function nodeListToArray(nodeList) {
		return [].slice.call(nodeList);
	}
	
	function findInArray(array, cb) {
		var length = array.length;
		for (var i = 0; i < length; i++) {
			if (cb(array[i])) {
				return array[i];
			}
		}
	}
	
	function getElements(attr) {
		var selector = attr ? '[' + attr + ']' : '*';
	
		return nodeListToArray(document.querySelectorAll(selector));
	}
	
	function openingTag(el) {
		// The following regex captures the contents of the elements opening tag
		// <div class="one"> -> `div class="one"`
		return el.outerHTML.match(/^<((?:[^>"]+|"[^"]*")+)>/)[1];
	}
	
	function test(el, attr, regex) {
		var content = attr ? el.getAttribute(attr) : openingTag(el);
		return regex.test(content);
	}
	
	var QueryByRegex = {
		one: function one(regex, attr) {
			return findInArray(getElements(attr), function (el) {
				return test(el, attr, regex);
			});
		},
		all: function all(regex, attr) {
			return getElements(attr).filter(function (el) {
				return test(el, attr, regex);
			});
		}
	};
	
	exports.default = QueryByRegex;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=query-by-regex.js.map