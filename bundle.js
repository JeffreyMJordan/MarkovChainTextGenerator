/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _drawing = __webpack_require__(1);

var makeChain = function makeChain(corpus) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var corpusArr = corpus.split(" ");
  var chain = {};
  for (var i = 0; i < corpusArr.length - n; i++) {
    var substr = corpusArr.slice(i, n + i).join(" ");
    var next = corpusArr[i + n];
    if (next) {
      if (chain[substr]) {
        chain[substr].push(next);
      } else {
        chain[substr] = [next];
      }
    }
  }
  var canvas = document.getElementById('canvas');
  var c = canvas.getContext('2d');

  (0, _drawing.drawRect)(c);
  return chain;
};

var assembleText = function assembleText(corpus) {
  var words = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var chain = makeChain(corpus, n);

  var sentence = "";
  var keys = Object.keys(chain);
  var key = keys[keys.length * Math.random() << 0];
  for (var i = 0; i < words; i++) {
    sentence += " " + key;
    var arr = chain[key];

    if (arr) {
      key = arr[Math.floor(Math.random() * arr.length)];
    } else {
      key = keys[Math.floor(Math.random() * keys.length)];
    }
  }
  return sentence;
};

window.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var corpus = e.target[0].value;
    var sentence = assembleText(corpus);
    console.log(sentence);
  });
});

// form.addEventListener('submit', () => {
//   console.log("here");
// });

// export default makeChain;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var drawRect = exports.drawRect = function drawRect(canvas) {
  canvas.fillStyle = "red";
  canvas.fillRect(100, 100, 400, 300);
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map