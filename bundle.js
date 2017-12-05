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

  console.log(n);
  var corpusArr = corpus.split(" ");
  console.log(corpusArr);
  var chain = {};
  for (var i = 0; i < corpusArr.length - n; i++) {
    var substr = corpusArr.slice(i, n + i).join(" ");
    var next = corpusArr[n + i];
    if (next) {
      if (chain[substr]) {
        chain[substr].push(next);
      } else {
        chain[substr] = [next];
      }
    }
  }
  console.log(chain);
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
    console.log(key.split(" ")[n - 1]);
    sentence += " " + key.split(" ")[n - 1];
    var arr = chain[key];

    if (arr) {
      key = key.split(" ").slice(1).join(" ");
      key += " " + arr[Math.floor(Math.random() * arr.length)];
    } else {
      key = keys[Math.floor(Math.random() * keys.length)];
    }
  }
  return sentence;
};

var step = function step(chain, gram, nextWord) {
  var gramContainer = document.getElementById('gram');
  var keyMapContainer = document.getElementById('key-map');
  var textBox = document.getElementById('text-box');

  if (gram === undefined) {
    var keys = Object.keys(chain);
    gram = keys[keys.length * Math.random() << 0];
    console.log(gram);
    textBox.innerHTML += gram;
  } else {
    textBox.innerHTML += " " + nextWord;
  }
  gramContainer.innerHTML = gram;
  var arr = chain[gram];

  keyMapContainer.innerHTML = "[" + arr + "]";
  var nextGram = gram;
  if (arr) {
    nextGram = nextGram.split(" ").slice(1).join(" ");
    nextWord = arr[Math.floor(Math.random() * arr.length)];
    nextGram += " " + nextWord;
  } else {
    var _keys = Object.keys(chain);
    nextGram = _keys[_keys.length * Math.random() << 0];
    nextWord = nextGram;
  }
  if (nextGram[0] === " ") {
    nextGram = nextGram.slice(1);
  }
  return [nextGram, nextWord];
};

window.addEventListener('DOMContentLoaded', function () {

  var chain = undefined;
  var gram = undefined;
  var nextWord = undefined;
  var form = document.getElementById('form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var corpus = e.target[0].value;
    var n = parseInt(e.target[1].value);

    var sentence = assembleText(corpus, 50, n);
    var textBox = document.getElementById("text-box");

    textBox.innerHTML = sentence;
  });

  var button = document.getElementById('step');

  button.addEventListener('click', function (e) {
    e.preventDefault();
    var corpus = document.getElementById('form')[0].value;
    var n = parseInt(document.getElementById('form')[1].value);
    if (chain === undefined) {
      chain = makeChain(corpus, n);
    }

    var res = step(chain, gram, nextWord);

    gram = res[0];
    nextWord = res[1];
    console.log(gram);
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var drawChain = exports.drawChain = function drawChain(canvas, chain) {

  Object.keys(chain).forEach(function (key) {
    canvas;
  });
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map