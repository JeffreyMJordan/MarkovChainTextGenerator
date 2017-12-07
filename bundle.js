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

var _jquery = __webpack_require__(2);

var $ = _interopRequireWildcard(_jquery);

var _hobbit = __webpack_require__(3);

var _hobbit2 = _interopRequireDefault(_hobbit);

var _hamlet = __webpack_require__(4);

var _hamlet2 = _interopRequireDefault(_hamlet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var makeChain = function makeChain(corpus) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  corpus = corpus.replace(/\n/g, " ");
  var corpusArr = corpus.split(" ");
  console.log(corpusArr);
  if (corpusArr.length === 1) {
    var obj = {};
    obj[corpusArr[0]] = [];
    return obj;
  }

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
  masterChain = chain;
  return chain;
};

var assembleText = function assembleText(corpus) {
  var words = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;


  console.log(words);
  var chain = makeChain(corpus, n);
  var sentence = "";
  var keys = Object.keys(chain);
  if (JSON.stringify(keys) === "[\"\"]") {
    return;
  }
  var key = keys[keys.length * Math.random() << 0];
  console.log(words);
  while (sentence.split(" ").filter(function (word) {
    return word != "";
  }).length < words) {

    console.log(chain);
    sentence += ' ' + key.split(" ")[n - 1];

    var arr = chain[key];

    if (arr) {
      key = key.split(" ").slice(1).join(" ");
      key += ' ' + arr[Math.floor(Math.random() * arr.length)];
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

    textBox.innerHTML += gram;
  } else {
    textBox.innerHTML += ' ' + nextWord;
  }
  gramContainer.innerHTML = gram;
  var arr = chain[gram];
  if (arr === undefined) {
    keyMapContainer.innerHTML = "[]";
  } else {
    keyMapContainer.innerHTML = '[' + arr.map(function (val) {
      return "\"" + val + "\" ";
    }) + ']';
  }

  var nextGram = gram;

  if (arr && arr.length > 0) {
    nextGram = nextGram.split(" ").slice(1).join(" ");
    nextWord = arr[Math.floor(Math.random() * arr.length)];
    nextGram += ' ' + nextWord;
  } else {

    var _keys = Object.keys(chain);
    console.log(_keys);
    var num = Math.floor(_keys.length * Math.random());
    console.log(num);
    nextGram = _keys[num];
    console.log(nextGram);
    nextWord = nextGram;
  }
  if (nextGram[0] === " ") {
    nextGram = nextGram.slice(1);
  }

  return [nextGram, nextWord];
};

var masterChain = undefined;

window.addEventListener('DOMContentLoaded', function () {
  var prevCorpus = undefined;
  var gram = undefined;
  var nextWord = undefined;
  var prevN = undefined;
  var form = document.getElementById('form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var corpus = e.target[0].value;
    var n = parseInt(e.target[1].value);
    var words = parseInt(e.target[2].value);
    var sentence = assembleText(corpus, words, n);
    var textBox = document.getElementById("text-box");
    console.log(textBox);
    textBox.innerHTML = sentence;
  });

  var button = document.getElementById('step');

  button.addEventListener('click', function (e) {
    e.preventDefault();
    var corpus = document.getElementById('form')[0].value;
    var n = parseInt(document.getElementById('form')[1].value);
    if (n != prevN || prevCorpus != corpus) {
      prevN = n;
      masterChain = makeChain(corpus, n);
    }

    var res = step(masterChain, gram, nextWord);

    gram = res[0];
    nextWord = res[1];
  });

  var shakes = document.getElementById('hobbit');
  shakes.addEventListener('click', function (e) {
    e.preventDefault();
    var textBox = document.getElementById("text-area");
    textBox.value = _hobbit2.default;
  });

  var ham = document.getElementById('hamlet');
  ham.addEventListener('click', function (e) {
    e.preventDefault();
    var textBox = document.getElementById("text-area");
    textBox.value = _hamlet2.default;
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var shakes="\nChapter I \nAN UNEXPECTED PARTY \nIn a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms \nand an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a \nhobbit-hole, and that means comfort. \nIt had a perfectly round door like a porthole, painted green, with a shiny yellow brass knob in the \nexact middle. The door opened on to a tube-shaped hall like a tunnel: a very comfortable tunnel \nwithout smoke, with panelled walls, and floors tiled and carpeted, provided with polished chairs, and \nlots and lots of pegs for hats and coats \u2014 the hobbit was fond of visitors. The tunnel wound on and on, \ngoing fairly but not quite straight into the side of the hill \u2014 The Hill, as all the people for many miles \nround called it \u2014 and many little round doors opened out of it, first on one side and then on another. No \ngoing upstairs for the hobbit: bedrooms, bathrooms, cellars, pantries (lots of these), wardrobes (he had \nwhole rooms devoted to clothes), kitchens, dining-rooms, all were on the same floor, and indeed on \nthe same passage. The best rooms were all on the left-hand side (going in), for these were the only \nones to have windows, deep-set round windows looking over his garden, and meadows beyond, sloping \ndown to the river. \nThis hobbit was a very well-to-do hobbit, and his name was Baggins. The Bagginses had lived in \nthe neighbourhood of The Hill for time out of mind, and people considered them very respectable, not \nonly because most of them were rich, but also because they never had any adventures or did anything \nunexpected: you could tell what a Baggins would say on any question without the bother of asking \nhim. This is a story of how a Baggins had an adventure, and found himself doing and saying things \naltogether unexpected. He may have lost the neighbours\u2019 respect, but he gained \u2014 well, you will see \nwhether he gained anything in the end. \nThe mother of our particular hobbit \u2014 what is a hobbit? I suppose hobbits need some description \nnowadays, since they have become rare and shy of the Big People, as they call us. They are (or were) a \nlittle people, about half our height, and smaller than the bearded Dwarves. Hobbits have no beards. \nThere is little or no magic about them, except the ordinary everyday sort which helps them to \ndisappear quietly and quickly when large stupid folk like you and me come blundering along, making \na noise like elephants which they can hear a mile off. They are inclined to be fat in the stomach; they \ndress in bright colours (chiefly green and yellow); wear no shoes, because their feet grow natural \nleathery soles and thick warm brown hair like the stuff on their heads (which is curly); have long \nclever brown fingers, good-natured faces, and laugh deep fruity laughs (especially after dinner, which \nthey have twice a day when they can get it). Now you know enough to go on with. As I was saying, the \nmother of this hobbit \u2014 of Bilbo Baggins, that is \u2014 was the famous Belladonna Took, one of the three \nremarkable daughters of the Old Took, head of the hobbits who lived across The Water, the small river \nthat ran at the foot of The Hill. It was often said (in other families) that long ago one of the Took \nancestors must have taken a fairy wife. That was, of course, absurd, but certainly there was still \nsomething not entirely hobbitlike about them, and once in a while members of the Took-clan would go \nand have adventures. They discreetly disappeared, and the family hushed it up; but the fact remained that the Tooks were not as respectable as the Bagginses, though they were undoubtedly richer. \nNot that Belladonna Took ever had any adventures after she became Mrs. Bungo Baggins. Bungo, \nthat was Bilbo\u2019s father, built the most luxurious hobbit-hole for her (and partly with her money) that \nwas to be found either under The Hill or over The Hill or across The Water, and there they remained to \nthe end of their days. Still it is probable that Bilbo, her only son, although he looked and behaved \nexactly like a second edition of his solid and comfortable father, got something a bit queer in his \nmake-up from the Took side, something that only waited for a chance to come out. The chance never \narrived, until Bilbo Baggins was grown up, being about fifty years old or so, and living in the beautiful \nhobbit-hole built by his father, which I have just described for you, until he had in fact apparently \nsettled down immovably. \nBy some curious chance one morning long ago in the quiet of the world, when there was less noise \nand more green, and the hobbits were still numerous and prosperous, and Bilbo Baggins was standing \nat his door after breakfast smoking an enormous long wooden pipe that reached nearly down to his \nwoolly toes (neatly brushed) \u2014 Gandalf came by. Gandalf ! If you had heard only a quarter of what I \nhave heard about him, and I have only heard very little of all there is to hear, you would be prepared \nfor any sort of remarkable tale. Tales and adventures sprouted up all over the place wherever he went, \nin the most extraordinary fashion. He had not been down that way under The Hill for ages and ages, \nnot since his friend the Old Took died, in fact, and the hobbits had almost forgotten what he looked \nlike. He had been away over The Hill and across The Water on businesses of his own since they were \nall small hobbit-boys and hobbit-girls. \nAll that the unsuspecting Bilbo saw that morning was an old man with a staff. He had a tall pointed \nblue hat, a long grey cloak, a silver scarf over which his long white beard hung down below his waist, \nand immense black boots. \n\u201CGood Morning!\u201D said Bilbo, and he meant it. The sun was shining, and the grass was very green. \nBut Gandalf looked at him from under long bushy eyebrows that stuck out further than the brim of his \nshady hat. \n\u201CWhat do you mean?\u201D he said. \u201CDo you wish me a good morning, or mean that it is a good morning \nwhether I want it or not; or that you feel good this morning; or that it is a morning to be good on?\u201D \n\u201CAll of them at once,\u201D said Bilbo. \u201CAnd a very fine morning for a pipe of tobacco out of doors, into \nthe bargain. If you have a pipe about you, sit down and have a fill of mine! There\u2019s no hurry, we have \nall the day before us!\u201D Then Bilbo sat down on a seat by his door, crossed his legs, and blew out a \nbeautiful grey ring of smoke that sailed up into the air without breaking and floated away over The \nHill. \n\u201CVery pretty!\u201D said Gandalf. \u201CBut I have no time to blow smoke-rings this morning. I am looking \nfor someone to share in an adventure that I am arranging, and it\u2019s very difficult to find anyone.\u201D \n\u201CI should think so \u2014 in these parts! We are plain quiet folk and have no use for adventures. Nasty \ndisturbing uncomfortable things! Make you late for dinner! I can\u2019t think what anybody sees in them,\u201D \nsaid our Mr. Baggins, and stuck one thumb behind his braces, and blew out another even bigger \nsmokering. Then he took out his morning letters, and began to read, pretending to take no more notice \nof the old man. He had decided that he was not quite his sort, and wanted him to go away. But the old \nman did not move. He stood leaning on his stick and gazing at the hobbit without saying anything, till \nBilbo got quite uncomfortable and even a little cross. \n\u201CGood morning!\u201D he said at last. \u201CWe don\u2019t want any adventures here, thank you! You might try \nover The Hill or across The Water.\u201D By this he meant that the conversation was at an end. \n\u201CWhat a lot of things you do use Good morning for!\u201D said Gandalf. \u201CNow you mean that you want \nto get rid of me, and that it won\u2019t be good till I move off.\u201D \n\u201CNot at all, not at all, my dear sir! Let me see, I don\u2019t think I know your name?\u201D \n\u201CYes, yes, my dear sir \u2014 and I do know your name, Mr. Bilbo Baggins. And you do know my name, \nthough you don\u2019t remember that I belong to it. I am Gandalf, and Gandalf means me! To think that I \nshould have lived to be good-morninged by Belladonna Took\u2019s son, as if I was selling buttons at the \ndoor!\u201D \n\u201CGandalf, Gandalf! Good gracious me! Not the wandering wizard that gave Old Took a pair of \nmagic diamond studs that fastened themselves and never came undone till ordered? Not the fellow \nwho used to tell such wonderful tales at parties, about dragons and goblins and giants and the rescue of \nprincesses and the unexpected luck of widows\u2019 sons? Not the man that used to make such particularly \nexcellent fireworks! I remember those! Old Took used to have them on Midsummer\u2019s Eve. Splendid! \nThey used to go up like great lilies and snapdragons and laburnums of fire and hang in the twilight all \nevening!\u201D You will notice already that Mr. Baggins was not quite so prosy as he liked to believe, also \nthat he was very fond of flowers. \u201CDear me!\u201D he went on. \u201CNot the Gandalf who was responsible for so \nmany quiet lads and lasses going off into the Blue for mad adventures? Anything from climbing trees \nto visiting elves \u2014 or sailing in ships, sailing to other shores! Bless me, life used to be quite inter \u2014 I \nmean, you used to upset things badly in these parts once upon a time. I beg your pardon, but I had no \nidea you were still in business.\u201D \n\u201CWhere else should I be?\u201D said the wizard. \u201CAll the same I am pleased to find you remember \nsomething about me. You seem to remember my fireworks kindly, at any rate, and that is not without \nhope. Indeed for your old grandfather Took\u2019s sake, and for the sake of poor Belladonna, I will give \nyou what you asked for.\u201D \n\u201CI beg your pardon, I haven\u2019t asked for anything!\u201D \n\u201CYes, you have! Twice now. My pardon. I give it you. In fact I will go so far as to send you on this \nadventure. Very amusing for me, very good for you \u2014 and profitable too, very likely, if you ever get \nover it.\u201D \n\u201CSorry! I don\u2019t want any adventures, thank you. Not today. Good morning! But please come to tea \n\u2014 any time you like! Why not tomorrow? Come tomorrow! Good bye!\u201D With that the hobbit turned \nand scuttled inside his round green door, and shut it as quickly as he dared, not to seem rude. Wizards \nafter all are wizards. \n\u201CWhat on earth did I ask him to tea for!\u201D he said to himself, as he went to the pantry. He had only \njust had breakfast, but he thought a cake or two and a drink of something would do him good after his \nfright. \nGandalf in the meantime was still standing outside the door, and laughing long but quietly. After a \nwhile he stepped up, and with the spike on his staff scratched a queer sign on the hobbit\u2019s beautiful \ngreen front-door. Then he strode away, just about the time when Bilbo was finishing his second cake \nand beginning to think that he had escaped adventures very well. \nThe next day he had almost forgotten about Gandalf. He did not remember things very well, unless \nhe put them down on his Engagement Tablet: like this: Gandalf Tea Wednesday. Yesterday he had \nbeen too flustered to do anything of the kind. \nJust before tea-time there came a tremendous ring on the front-door bell, and then he remembered! \nHe rushed and put on the kettle, and put out another cup and saucer, and an extra cake or two, and ran \nto the door. \n\u201CI am so sorry to keep you waiting!\u201D he was going to say, when he saw that it was not Gandalf at \nall. It was a dwarf with a blue beard tucked into a golden belt, and very bright eyes under his dark- \ngreen hood. As soon as the door was opened, he pushed inside, just as if he had been expected. \nHe hung his hooded cloak on the nearest peg, and \u201CDwalin at your service!\u201D he said with a low \nbow. \n\u201CBilbo Baggins at yours!\u201D said the hobbit, too surprised to ask any questions for the moment. When \nthe silence that followed had become uncomfortable, he added: \u201CI am just about to take tea; pray come \nand have some with me.\u201D A little stiff perhaps, but he meant it kindly. And what would you do, if an \nuninvited dwarf came and hung his things up in your hall without a word of explanation? \nThey had not been at table long, in fact they had hardly reached the third cake, when there came \nanother even louder ring at the bell. \n\u201CExcuse me!\u201D said the hobbit, and off he went to the door. \n\u201CSo you have got here at last!\u201D That was what he was going to say to Gandalf this time. But it was \nnot Gandalf. Instead there was a very old-looking dwarf on the step with a white beard and a scarlet \nhood; and he too hopped inside as soon as the door was open, just as if he had been invited. \n\u201CI see they have begun to arrive already,\u201D he said when he caught sight of Dwalin\u2019 s green hood \nhanging up. He hung his red one next to it, and \u201CBalin at your service!\u201D he said with his hand on his \nbreast. \n\u201CThank you!\u201D said Bilbo with a gasp. It was not the correct thing to say, but they have begun to \narrive had flustered him badly. He liked visitors, but he liked to know them before they arrived, and \nhe preferred to ask them himself. He had a horrible thought that the cakes might run short, and then he \n\u2014 as the host: he knew his duty and stuck to it however painful \u2014 he might have to go without. \n\u201CCome along in, and have some tea!\u201D he managed to say after taking a deep breath. \n\u201CA little beer would suit me better, if it is all the same to you, my good sir,\u201D said Balin with the \nwhite beard. \u201CBut I don\u2019t mind some cake \u2014 seed-cake, if you have any.\u201D \n\u201CLots!\u201D Bilbo found himself answering, to his own surprise; and he found himself scuttling off, \ntoo, to the cellar to fill a pint beer-mug, and then to a pantry to fetch two beautiful round seed-cakes \nwhich he had baked that afternoon for his after-supper morsel. \nWhen he got back Balin and Dwalin were talking at the table like old friends (as a matter of fact \nthey were brothers). Bilbo plumped down the beer and the cake in front of them, when loud came a \nring at the bell again, and then another ring. \n\u201CGandalf for certain this time,\u201D he thought as he puffed along the passage. But it was not. It was \ntwo more dwarves, both with blue hoods, silver belts, and yellow beards; and each of them carried a \nbag of tools and a spade. In they hopped, as soon as the door began to open \u2014 Bilbo was hardly \nsurprised at all. \n\u201CWhat can I do for you, my dwarves?\u201D he said. \n\u201CKili at your service!\u201D said the one. \u201CAnd Fili!\u201D added the other; and they both swept off their blue \nhoods and bowed. \n\u201CAt yours and your family\u2019s!\u201D replied Bilbo, remembering his manners this time. \n\u201CDwalin and Balin here already, I see,\u201D said Kili. \u201CLet us join the throng!\u201D \n\u201CThrong!\u201D thought Mr. Baggins. \u201CI don\u2019t like the sound of that. I really must sit down for a minute \nand collect my wits, and have a drink.\u201D He had only just had a sip \u2014 in the corner, while the four \ndwarves sat round the table, and talked about mines and gold and troubles with the goblins, and the \ndepredations of dragons, and lots of other things which he did not understand, and did not want to, for \nthey sounded much too adventurous \u2014 when, ding-dong-a-ling-dang, his bell rang again, as if some \nnaughty little hobbit-boy was trying to pull the handle off. \n\u201CSomeone at the door!\u201D he said, blinking. \n\u201CSome four, I should say by the sound,\u201D said Fili. \u201CBesides, we saw them coming along behind us \nin the distance.\u201D \nThe poor little hobbit sat down in the hall and put his head in his hands, and wondered what had \nhappened, and what was going to happen, and whether they would all stay to supper. Then the bell \nrang again louder than ever, and he had to run to the door. It was not four after all, it was five. Another \ndwarf had come along while he was wondering in the hall. He had hardly turned the knob, before they \nwere all inside, bowing and saying \u201Cat your service\u201D one after another. Dori, Nori, Ori, Oin, and Gloin \nwere their names; and very soon two purple hoods, a grey hood, a brown hood, and a white hood were \nhanging on the pegs, and off they marched with their broad hands stuck in their gold and silver belts to \njoin the others. Already it had almost become a throng. Some called for ale, and some for porter, and \none for coffee, and all of them for cakes; so the hobbit was kept very busy for a while. \nA big jug of coffee had just been set in the hearth, the seed-cakes were gone, and the dwarves were \nstarting on a round of buttered scones, when there came \u2014 a loud knock. Not a ring, but a hard rat-tat \non the hobbit\u2019s beautiful green door. Somebody was banging with a stick! \nBilbo rushed along the passage, very angry, and altogether bewildered and bewuthered \u2014 this was \nthe most awkward Wednesday he ever remembered. He pulled open the door with a jerk, and they all \nfell in, one on top of the other. More dwarves, four more! And there was Gandalf behind, leaning on \nhis staff and laughing. He had made quite a dent on the beautiful door; he had also, by the way, \nknocked out the secret mark that he had put there the morning before. \n\u201CCarefully! Carefully!\u201D he said. \u201CIt is not like you, Bilbo, to keep friends waiting on the mat, and \nthen open the door like a pop-gun! Let me introduce Bifur, Bofur, Bombur, and especially Thorin!\u201D \n\u201CAt your service!\u201D said Bifur, Bofur, and Bombur standing in a row. Then they hung up two yellow \nhoods and a pale green one; and also a sky-blue one with a long silver tassel. This last belonged to \nThorin, an enormously important dwarf, in fact no other than the great Thorin Oakenshield himself, \nwho was not at all pleased at falling flat on Bilbo\u2019s mat with Bifur, Bofur, and Bombur on top of him. \nFor one thing Bombur was immensely fat and heavy. Thorin indeed was very haughty, and said \nnothing about service; but poor Mr. Baggins said he was sorry so many times, that at last he grunted \n\u201Cpray don\u2019t mention it,\u201D and stopped frowning. \n\u201CNow we are all here!\u201D said Gandalf, looking at the row of thirteen hoods \u2014 the best detachable \nparty hoods \u2014 and his own hat hanging on the pegs. \u201CQuite a merry gathering! I hope there is \nsomething left for the late-comers to eat and drink! What\u2019s that? Tea! No thank you! A little red wine, \nI think for me.\u201D \n\u201CAnd for me,\u201D said Thorin. \n\u201CAnd raspberry jam and apple-tart,\u201D said Bifur. \n\u201CAnd mince-pies and cheese,\u201D said Bofur. \n\u201CAnd pork-pie and salad,\u201D said Bombur. \n\u201CAnd more cakes \u2014 and ale \u2014 and coffee, if you don\u2019t mind,\u201D called the other dwarves through the \ndoor. \n\u201CPut on a few eggs, there\u2019s a good fellow!\u201D Gandalf called after him, as the hobbit stumped off to \nthe pantries. \u201CAnd just bring out the cold chicken and pickles!\u201D \n\u201CSeems to know as much about the inside of my larders as I do myself!\u201D thought Mr. Baggins, who \nwas feeling positively flummoxed, and was beginning to wonder whether a most wretched adventure \nhad not come right into his house. By the time he had got all the bottles and dishes and knives and \nforks and glasses and plates and spoons and things piled up on big trays, he was getting very hot, and \nred in the face, and annoyed. \n\u201CConfusticate and bebother these dwarves!\u201D he said aloud. \u201CWhy don\u2019t they come and lend a \nhand?\u201D Lo and behold! there stood Balin and Dwalin at the door of the kitchen, and Fili and Kili \nbehind them, and before he could say knife they had whisked the trays and a couple of small tables \ninto the parlour and set out everything afresh. \nGandalf sat at the head of the party with the thirteen dwarves all round: and Bilbo sat on a stool at \nthe fireside, nibbling at a biscuit (his appetite was quite taken away), and trying to look as if this was \nall perfectly ordinary and not in the least an adventure. The dwarves ate and ate, and talked and talked, \nand time got on. At last they pushed their chairs back, and Bilbo made a move to collect the plates and \nglasses. \n\u201CI suppose you will all stay to supper?\u201D he said in his politest unpressing tones. \n\u201COf course!\u201D said Thorin. \u201CAnd after. We shan\u2019t get through the business till late, and we must \nhave some music first. Now to clear up!\u201D \nThereupon the twelve dwarves \u2014 not Thorin, he was too important, and stayed talking to Gandalf \u2014 \njumped to their feet, and made tall piles of all the things. Off they went, not waiting for trays, \nbalancing columns of plates, each with a bottle on the top, with one hand, while the hobbit ran after \nthem almost squeaking with fright: \u201Cplease be careful!\u201D and \u201Cplease, don\u2019t trouble! I can manage.\u201D But \nthe dwarves only started to sing: \nChip the glasses and crack the plates! \nBlunt the knives and bend the forks! \nThat\u2019s what Bilbo Baggins hates- \nSmash the bottles and burn the corks! \nCut the cloth and tread on the fat! \nPour the milk on the pantry floor! \nLeave the bones on the bedroom mat! \nSplash the wine on every door! \nDump the crocks in a boiling bowl; \nPound them up with a thumping pole; \nAnd when you\u2019ve finished, if any are whole, \nSend them down the hall to roll! \nThat\u2019s what Bilbo Baggins hates! \nSo, carefully! carefully with the plates! \nAnd of course they did none of these dreadful things, and everything was cleaned and put away safe \nas quick as lightning, while the hobbit was turning round and round in the middle of the kitchen trying \nto see what they were doing. Then they went back, and found Thorin with his feet on the fender \nsmoking a pipe. He was blowing the most enormous smoke-rings, and wherever he told one to go, it \nwent \u2014 up the chimney, or behind the clock on the mantelpiece, or under the table, or round and round \nthe ceiling; but wherever it went it was not quick enough to escape Gandalf. Pop! he sent a smaller \nsmoke-ring from his short clay-pipe straight through each one of Thorin\u2019 s. Then Gandalf\u2019s smoke-ring \nwould go green and come back to hover over the wizard\u2019s head. He had a cloud of them about him \nalready, and in the dim light it made him look strange and sorcerous. Bilbo stood still and watched \u2014 \nhe loved smoke-rings \u2014 and then he blushed to think how proud he had been yesterday morning of the \nsmoke-rings he had sent up the wind over The Hill. \n\u201CNow for some music!\u201D said Thorin. \u201CBring out the instruments!\u201D \nKili and Fili rushed for their bags and brought back little fiddles; Dori, Nori, and Ori brought out \nflutes from somewhere inside their coats; Bombur produced a drum from the hall; Bifur and Bofur \nwent out too, and came back with clarinets that they had left among the walking-sticks. Dwalin and \nBalin said: \u201CExcuse me, I left mine in the porch!\u201D \u201CJust bring mine in with you!\u201D said Thorin. They \ncame back with viols as big as themselves, and with Thorin\u2019 s harp wrapped in a green cloth. It was a \nbeautiful golden harp, and when Thorin struck it the music began all at once, so sudden and sweet that \nBilbo forgot everything else, and was swept away into dark lands under strange moons, far over The \nWater and very far from his hobbit-hole under The Hill. \nThe dark came into the room from the little window that opened in the side of The Hill; the \nfirelight flickered \u2014 it was April \u2014 and still they played on, while the shadow of Gandalf\u2019s beard \nwagged against the wall. \nThe dark filled all the room, and the fire died down, and the shadows were lost, and still they \nplayed on. And suddenly first one and then another began to sing as they played, deep-throated singing \nof the dwarves in the deep places of their ancient homes; and this is like a fragment of their song, if it \ncan be like their song without their music. \nFar over the misty mountains cold \nTo dungeons deep and caverns old \nWe must away ere break of day \nTo seek the pale enchanted gold. \nThe dwarves of yore made mighty spells, \nWhile hammers fell like ringing bells \nIn places deep, where dark things sleep, \nIn hollow halls beneath the fells. \nFor ancient king and elvish lord \nThere many a gleaming golden hoard \nThey shaped and wrought, and light they caught \nTo hide in gems on hilt of sword. \nOn silver necklaces they strung \nThe flowering stars, on crowns they hung \nThe dragon-fire, in twisted wire \nThey meshed the light of moon and sun. \nFar over the misty mountains cold \nTo dungeons deep and caverns old \nWe must away, ere break of day, \nTo claim our long-forgotten gold. \nGoblets they carved there for themselves \nAnd harps of gold; where no man delves \nThere lay they long, and many a song \nWas sung unheard by men or elves. \nThe pines were roaring on the height, \nThe winds were moaning in the night. \nThe fire was red, it flaming spread; \nThe trees like torches blazed with light. \nThe bells were ringing in the dale \nAnd men looked up with faces pale; \nThe dragon\u2019s ire more fierce than fire \nLaid low their towers and houses frail. \nThe mountain smoked beneath the moon; \nThe dwarves, they heard the tramp of doom. \nThey fled their hall to dying fall \nBeneath his feet, beneath the moon. \nFar over the misty mountains grim \nTo dungeons deep and caverns dim \nWe must away, ere break of day, \nTo win our harps and gold from him! \nAs they sang the hobbit felt the love of beautiful things made by hands and by cunning and by \nmagic moving through him, a fierce and a jealous love, the desire of the hearts of dwarves. Then \nsomething Tookish woke up inside him, and he wished to go and see the great mountains, and hear the \npine-trees and the waterfalls, and explore the caves, and wear a sword instead of a walking-stick. He \nlooked out of the window. The stars were out in a dark sky above the trees. He thought of the jewels of \nthe dwarves shining in dark caverns. Suddenly in the wood beyond The Water a flame leapt up \u2014 \nprobably somebody lighting a wood-fire \u2014 and he thought of plundering dragons settling on his quiet \nHill and kindling it all to flames. He shuddered; and very quickly he was plain Mr. Baggins of Bag- \nEnd, Under-Hill, again. \nHe got up trembling. He had less than half a mind to fetch the lamp, and more than half a mind to \npretend to, and go and hide behind the beer-barrels in the cellar, and not come out again until all the \ndwarves had gone away. Suddenly he found that the music and the singing had stopped, and they were \nall looking at him with eyes shining in the dark. \n\u201CWhere are you going?\u201D said Thorin, in a tone that seemed to show that he guessed both halves of \nthe hobbit\u2019s mind. \n\u201CWhat about a little light?\u201D said Bilbo apologetically. \n\u201CWe like the dark,\u201D said all the dwarves. \u201CDark for dark business! There are many hours before \ndawn.\u201D \n\u201COf course!\u201D said Bilbo, and sat down in a hurry. He missed the stool and sat in the fender, \nknocking over the poker and shovel with a crash. \n\u201CHush!\u201D said Gandalf. \u201CLet Thorin speak!\u201D And this is how Thorin began. \n\u201CGandalf, dwarves and Mr. Baggins! We are met together in the house of our friend and fellow \nconspirator, this most excellent and audacious hobbit \u2014 may the hair on his toes never fall out! all \npraise to his wine and ale! \u2014 \u201D He paused for breath and for a polite remark from the hobbit, but the \ncompliments were quite lost on poor Bilbo Baggins, who was wagging his mouth in protest at being \ncalled audacious and worst of all fellow conspirator, though no noise came out, he was so flummoxed. \nSo Thorin went on: \n\u201CWe are met to discuss our plans, our ways, means, policy and devices. We shall soon before the \nbreak of day start on our long journey, a journey from which some of us, or perhaps all of us (except \nour friend and counsellor, the ingenious wizard Gandalf) may never return. It is a solemn moment. \nOur object is, I take it, well known to us all. To the estimable Mr. Baggins, and perhaps to one or two \nof the younger dwarves (I think I should be right in naming Kili and Fili, for instance), the exact \nsituation at the moment may require a little brief explanation \u2014 \u201D \nThis was Thorin\u2019 s style. He was an important dwarf. If he had been allowed, he would probably \nhave gone on like this until he was out of breath, without telling any one there anything that was not \nknown already. But he was rudely interrupted. Poor Bilbo couldn\u2019t bear it any longer. At may never \nreturn he began to feel a shriek coming up inside, and very soon it burst out like the whistle of an \nengine coming out of a tunnel. All the dwarves sprang up, knocking over the table. Gandalf struck a \nblue light on the end of his magic staff, and in its firework glare the poor little hobbit could be seen \nkneeling on the hearth-rug, shaking like a jelly that was melting. Then he fell flat on the floor, and \nkept on calling out \u201Cstruck by lightning, struck by lightning!\u201D over and over again; and that was all \nthey could get out of him for a long time. So they took him and laid him out of the way on the \ndrawing-room sofa with a drink at his elbow, and they went back to their dark business. \n\u201CExcitable little fellow,\u201D said Gandalf, as they sat down again. \u201CGets funny queer fits, but he is one \nof the best, one of the best \u2014 as fierce as a dragon in a pinch.\u201D \nIf you have ever seen a dragon in a pinch, you will realize that this was only poetical exaggeration \napplied to any hobbit, even to Old Took\u2019s great-grand-uncle Bullroarer, who was so huge (for a \nhobbit) that he could ride a horse. He charged the ranks of the goblins of Mount Gram in the Battle of \nthe Green Fields, and knocked their king Golfimbul\u2019s head clean off with a wooden club. It sailed a \nhundred yards through the air and went down a rabbit-hole, and in this way the battle was won and the \ngame of Golf invented at the same moment. \nIn the meanwhile, however, Bullroarer\u2019 s gentler descendant was reviving in the drawing-room. \nAfter a while and a drink he crept nervously to the door of the parlour. This is what he heard, Gloin \nspeaking: \u201CHumph!\u201D (or some snort more or less like that). \u201CWill he do, do you think? It is all very \nwell for Gandalf to talk about this hobbit being fierce, but one shriek like that in a moment of \nexcitement would be enough to wake the dragon and all his relatives, and kill the lot of us. I think it \nsounded more like fright than excitement! In fact, if it had not been for the sign on the door, I should \nhave been sure we had come to the wrong house. As soon as I clapped eyes on the little fellow bobbing \nand puffing on the mat, I had my doubts. He looks more like a grocer than a burglar!\u201D \nThen Mr. Baggins turned the handle and went in. The Took side had won. He suddenly felt he \nwould go without bed and breakfast to be thought fierce. As for little fellow bobbing on the mat it \nalmost made him really fierce. Many a time afterwards the Baggins part regretted what he did now, \nand he said to himself: \u201CBilbo, you were a fool; you walked right in and put your foot in it.\u201D \n\u201CPardon me,\u201D he said, \u201Cif I have overheard words that you were saying. I don\u2019t pretend to \nunderstand what you are talking about, or your reference to burglars, but I think I am right in \nbelieving\u201D (this is what he called being on his dignity) \u201Cthat you think I am no good. I will show you. I \nhave no signs on my door \u2014 it was painted a week ago \u2014 , and I am quite sure you have come to the \nwrong house. As soon as I saw your funny faces on the door-step, I had my doubts. But treat it as the \nright one. Tell me what you want done, and I will try it, if I have to walk from here to the East of East \nand fight the wild Were-worms in the Last Desert. I had a great-great-great-grand-uncle once, \nBullroarer Took, and \u2014 \u201D \n\u201CYes, yes, but that was long ago,\u201D said Gloin. \u201CI was talking about you. And I assure you there is a \nmark on this door \u2014 the usual one in the trade, or used to be. Burglar wants a good job, plenty of \nExcitement and reasonable Reward, that\u2019s how it is usually read. You can say Expert Treasure-hunter \ninstead of Burglar if you like. Some of them do. It\u2019s all the same to us. Gandalf told us that there was \na man of the sort in these parts looking for a Job at once, and that he had arranged for a meeting here \nthis Wednesday tea-time.\u201D \n\u201COf course there is a mark,\u201D said Gandalf. \u201CI put it there myself. For very good reasons. You asked \nme to find the fourteenth man for your expedition, and I chose Mr. Baggins. Just let any one say I \nchose the wrong man or the wrong house, and you can stop at thirteen and have all the bad luck you \nlike, or go back to digging coal.\u201D \nHe scowled so angrily at Gloin that the dwarf huddled back in his chair; and when Bilbo tried to \nopen his mouth to ask a question, he turned and frowned at him and stuck out his bushy eyebrows, till \nBilbo shut his mouth tight with a snap. \u201CThat\u2019s right,\u201D said Gandalf. \u201CLet\u2019s have no more argument. I \nhave chosen Mr. Baggins and that ought to be enough for all of you. If I say he is a Burglar, a Burglar \nhe is, or will be when the time comes. There is a lot more in him than you guess, and a deal more than \nhe has any idea of himself. You may (possibly) all live to thank me yet. Now Bilbo, my boy, fetch the \nlamp, and let\u2019s have a little light on this!\u201D \nOn the table in the light of a big lamp with a red shade he spread a piece of parchment rather like a \nmap. \n\u201CThis was made by Thror, your grandfather, Thorin,\u201D he said in answer to the dwarves\u2019 excited \nquestions. \u201CIt is a plan of the Mountain.\u201D \n\u201CI don\u2019t see that this will help us much,\u201D said Thorin disappointedly after a glance. \u201CI remember \nthe Mountain well enough and the lands about it. And I know where Mirkwood is, and the Withered \nHeath where the great dragons bred.\u201D \n\u201CThere is a dragon marked in red on the Mountain,\u201D said Balin, \u201Cbut it will be easy enough to find \nhim without that, if ever we arrive there.\u201D \n\u201CThere is one point that you haven\u2019t noticed,\u201D said the wizard, \u201Cand that is the secret entrance. You \nsee that rune on the West side, and the hand pointing to it from the other runes? That marks a hidden \npassage to the Lower Halls.\u201D (Look at the map at the beginning of this book, and you will see there the \nrunes.) \n\u201CIt may have been secret once,\u201D said Thorin, \u201Cbut how do we know that it is secret any longer? Old \nSmaug has lived there long enough now to find out anything there is to know about those caves.\u201D \n\u201CHe may \u2014 but he can\u2019t have used it for years and years.\u201D \n\u201CWhy?\u201D \n\u201CBecause it is too small. \u2018 Five feet high the door and three may walk abreast \u2019 say the runes, but \nSmaug could not creep into a hole that size, not even when he was a young dragon, certainly not after \ndevouring so many of the dwarves and men of Dale.\u201D \n\u201CIt seems a great big hole to me,\u201D squeaked Bilbo (who had no experience of dragons and only of \nhobbit-holes). He was getting excited and interested again, so that he forgot to keep his mouth shut. \nHe loved maps, and in his hall there hung a large one of the Country Round with all his favourite \nwalks marked on it in red ink. \u201CHow could such a large door be kept secret from everybody outside, \napart from the dragon?\u201D he asked. He was only a little hobbit you must remember. \n\u201CIn lots of ways,\u201D said Gandalf. \u201CBut in what way this one has been hidden we don\u2019t know without \ngoing to see. From what it says on the map I should guess there is a closed door which has been made \nto look exactly like the side of the Mountain. That is the usual dwarves\u2019 method \u2014 I think that is right, \nisn\u2019t it?\u201D \n\u201CQuite right,\u201D said Thorin. \n\u201CAlso,\u201D went on Gandalf, \u201CI forgot to mention that with the map went a key, a small and curious \nkey. Here it is!\u201D he said, and handed to Thorin a key with a long barrel and intricate wards, made of \nsilver. \u201CKeep it safe!\u201D \n\u201CIndeed I will,\u201D said Thorin, and he fastened it upon a fine chain that hung about his neck and \nunder his jacket. \u201CNow things begin to look more hopeful. This news alters them much for the better. \nSo far we have had no clear idea what to do. We thought of going East, as quiet and careful as we \ncould, as far as the Long Lake. After that the trouble would begin \u2014 .\u201D \n\u201CA long time before that, if I know anything about the roads East,\u201D interrupted Gandalf. \n\u201CWe might go from there up along the River Running,\u201D went on Thorin taking no notice, \u201Cand so to \nthe ruins of Dale \u2014 the old town in the valley there, under the shadow of the Mountain. But we none of \nus liked the idea of the Front Gate. The river runs right out of it through the great cliff at the South of \nthe Mountain, and out of it comes the dragon too \u2014 far too often, unless he has changed his habits.\u201D \n\u201CThat would be no good,\u201D said the wizard, \u201Cnot without a mighty Warrior, even a Hero. I tried to \nfind one; but warriors are busy fighting one another in distant lands, and in this neighbourhood heroes \nare scarce, or simply not to be found. Swords in these parts are mostly blunt, and axes are used for \ntrees, and shields as cradles or dish-covers; and dragons are comfortably far-off (and therefore \nlegendary). That is why I settled on burglary \u2014 especially when I remembered the existence of a Side- \ndoor. And here is our little Bilbo Baggins, the burglar, the chosen and selected burglar. So now let\u2019s \nget on and make some plans.\u201D \n\u201CVery well then,\u201D said Thorin, \u201Csupposing the burglar-expert gives us some ideas or suggestions.\u201D \nHe turned with mock-politeness to Bilbo. \n\u201CFirst I should like to know a bit more about things,\u201D said he, feeling all confused and a bit shaky \ninside, but so far still Tookishly determined to go on with things. \u201CI mean about the gold and the \ndragon, and all that, and how it got there, and who it belongs to, and so on and further.\u201D \n\u201CBless me!\u201D said Thorin, \u201Chaven\u2019t you got a map? and didn\u2019t you hear our song? and haven\u2019t we \nbeen talking about all this for hours?\u201D \n\u201CAll the same, I should like it all plain and clear,\u201D said he obstinately, putting on his business \nmanner (usually reserved for people who tried to borrow money off him), and doing his best to appear \nwise and prudent and professional and live up to Gandalf\u2019s recommendation. \u201CAlso I should like to \nknow about risks, out-of-pocket expenses, time required and remuneration, and so forth\u201D \u2014 by which \nhe meant: \u201CWhat am I going to get out of it? and am I going to come back alive?\u201D \n\u201CO very well,\u201D said Thorin. \u201CLong ago in my grandfather Thror\u2019s time our family was driven out of \nthe far North, and came back with all their wealth and their tools to this Mountain on the map. It had \nbeen discovered by my far ancestor, Thrain the Old, but now they mined and they tunnelled and they \nmade huger halls and greater workshops \u2014 and in addition I believe they found a good deal of gold and \na great many jewels too. Anyway they grew immensely rich and famous, and my grandfather was King \nunder the Mountain again, and treated with great reverence by the mortal men, who lived to the South, \nand were gradually spreading up the Running River as far as the valley overshadowed by the \nMountain. They built the merry town of Dale there in those days. Kings used to send for our smiths, \nand reward even the least skillful most richly. Fathers would beg us to take their sons as apprentices, \nand pay us handsomely, especially in food-supplies, which we never bothered to grow or find for \nourselves. Altogether those were good days for us, and the poorest of us had money to spend and to \nlend, and leisure to make beautiful things just for the fun of it, not to speak of the most marvellous \nand magical toys, the like of which is not to be found in the world now-a-days. So my grandfather\u2019s \nhalls became full of armour and jewels and carvings and cups, and the toy market of Dale was the \nwonder of the North. \n\u201CUndoubtedly that was what brought the dragon. Dragons steal gold and jewels, you know, from \nmen and elves and dwarves, wherever they can find them; and they guard their plunder as long as they \nlive (which is practically for ever, unless they are killed), and never enjoy a brass ring of it. Indeed \nthey hardly know a good bit of work from a bad, though they usually have a good notion of the current \nmarket value; and they can\u2019t make a thing for themselves, not even mend a little loose scale of their \narmour. There were lots of dragons in the North in those days, and gold was probably getting scarce up \nthere, with the dwarves flying south or getting killed, and all the general waste and destruction that \ndragons make going from bad to worse. There was a most specially greedy, strong and wicked worm \ncalled Smaug. One day he flew up into the air and came south. The first we heard of it was a noise like \na hurricane coming from the North, and the pine-trees on the Mountain creaking and cracking in the \nwind. Some of the dwarves who happened to be outside (I was one luckily \u2014 a fine adventurous lad in \nthose days, always wandering about, and it saved my life that day) \u2014 well, from a good way off we saw \nthe dragon settle on our mountain in a spout of flame. Then he came down the slopes and when he \nreached the woods they all went up in fire. By that time all the bells were ringing in Dale and the \nwarriors were arming. The dwarves rushed out of their great gate; but there was the dragon waiting for \nthem. None escaped that way. The river rushed up in steam and a fog fell on Dale, and in the fog the \ndragon came on them and destroyed most of the warriors \u2014 the usual unhappy story, it was only too \ncommon in those days. Then he went back and crept in through the Front Gate and routed out all the \nhalls, and lanes, and tunnels, alleys, cellars, mansions and passages. After that there were no dwarves \nleft alive inside, and he took all their wealth for himself. Probably, for that is the dragons\u2019 way, he has \npiled it all up in a great heap far inside, and sleeps on it for a bed. Later he used to crawl out of the \ngreat gate and come by night to Dale, and carry away people, especially maidens, to eat, until Dale \nwas ruined, and all the people dead or gone. What goes on there now I don\u2019t know for certain, but I \ndon\u2019t suppose any one lives nearer to the Mountain than the far edge of the Long Lake now-a-days. \n\u201CThe few of us that were well outside sat and wept in hiding, and cursed Smaug; and there we were \nunexpectedly joined by my father and my grandfather with singed beards. They looked very grim but \nthey said very little. When I asked how they had got away, they told me to hold my tongue, and said \nthat one day in the proper time I should know. After that we went away, and we have had to earn our \nlivings as best we could up and down the lands, often enough sinking as low as blacksmith-work or \neven coalmining. But we have never forgotten our stolen treasure. And even now, when I will allow \nwe have a good bit laid by and are not so badly off\u201D \u2014 here Thorin stroked the gold chain round his \nneck \u2014 \u201Cwe still mean to get it back, and to bring our curses home to Smaug \u2014 if we can. \n\u201CI have often wondered about my father\u2019s and my grandfather\u2019s escape. I see now they must have \nhad a private Side-door which only they knew about. But apparently they made a map, and I should \nlike to know how Gandalf got hold of it, and why it did not come down to me, the rightful heir.\u201D \n\u201CI did not \u2018get hold of it,\u2019 I was given it,\u201D said the wizard. \u201CYour grandfather Thror was killed, you \nremember, in the mines of Moria by Azog the Goblin .\u201D \n\u201CCurse his name, yes,\u201D said Thorin. \n\u201CAnd Thrain your father went away on the twenty-first of April, a hundred years ago last Thursday, \nand has never been seen by you since-\u201D \n\u201CTrue, true,\u201D said Thorin. \n\u201CWell, your father gave me this to give to you; and if I have chosen my own time and way for \nhanding it over, you can hardly blame me, considering the trouble I had to find you. Your father could \nnot remember his own name when he gave me the paper, and he never told me yours; so on the whole I \nthink I ought to be praised and thanked! Here it is,\u201D said he handing the map to Thorin. \n\u201CI don\u2019t understand,\u201D said Thorin, and Bilbo felt he would have liked to say the same. The \nexplanation did not seem to explain. \n\u201CYour grandfather,\u201D said the wizard slowly and grimly, \u201Cgave the map to his son for safety before \nhe went to the mines of Moria. Your father went away to try his luck with the map after your \ngrandfather was killed; and lots of adventures of a most unpleasant sort he had, but he never got near \nthe Mountain. How he got there I don\u2019t know, but I found him a prisoner in the dungeons of the \nNecromancer.\u201D \n\u201CWhatever were you doing there?\u201D asked Thorin with a shudder, and all the dwarves shivered. \n\u201CNever you mind. I was finding things out, as usual; and a nasty dangerous business it was. Even I, \nGandalf, only just escaped. I tried to save your father, but it was too late. He was witless and \nwandering, and had forgotten almost everything except the map and the key.\u201D \n\u201CWe have long ago paid the goblins of Moria,\u201D said Thorin; \u201Cwe must give a thought to the \nNecromancer.\u201D \n\u201CDon\u2019t be absurd! He is an enemy far beyond the powers of all the dwarves put together, if they \ncould all be collected again from the four corners of the world. The one thing your father wished was \nfor his son to read the map and use the key. The dragon and the Mountain are more than big enough \ntasks for you!\u201D \n\u201CHear, hear!\u201D said Bilbo, and accidentally said it aloud. \n\u201CHear what?\u201D they all said turning suddenly towards him, and he was so flustered that he answered \n\u201CHear what I have got to say!\u201D \n\u201CWhat\u2019s that?\u201D they asked. \n\u201CWell, I should say that you ought to go East and have a look round. After all there is the Side- \ndoor, and dragons must sleep sometimes, I suppose. If you sit on the door-step long enough, I daresay \nyou will think of something. And well, don\u2019t you know, I think we have talked long enough for one \nnight, if you see what I mean. What about bed, and an early start, and all that? I will give you a good \nbreakfast before you go.\u201D \n\u201CBefore we go, I suppose you mean,\u201D said Thorin. \u201CAren\u2019t you the burglar? And isn\u2019t sitting on the \ndoor-step your job, not to speak of getting inside the door? But I agree about bed and breakfast. I like \nsix eggs with my ham, when starting on a journey: fried not poached, and mind you don\u2019t break \u2019em.\u201D \nAfter all the others had ordered their breakfasts without so much as a please (which annoyed Bilbo \nvery much), they all got up. The hobbit had to find room for them all, and filled all his spare-rooms \nand made beds on chairs and sofas, before he got them all stowed and went to his own little bed very \ntired and not altogether happy. One thing he did make his mind up about was not to bother to get up \nvery early and cook everybody else\u2019s wretched breakfast. The Tookishness was wearing off, and he \nwas not now quite so sure that he was going on any journey in the morning. \nAs he lay in bed he could hear Thorin still humming to himself in the best bedroom next to him: \nFar over the misty mountains cold \nTo dungeons deep and caverns old \nWe must away, ere break of day, \nTo find our long-forgotten gold. \nBilbo went to sleep with that in his ears, and it gave him very uncomfortable dreams. It was long \nafter the break of day, when he woke up. \nChapter II \nROAST MUTTON \nUp jumped Bilbo, and putting on his dressing-gown went into the dining-room. There he saw nobody, \nbut all the signs of a large and hurried breakfast. There was a fearful mess in the room, and piles of \nunwashed crocks in the kitchen. Nearly every pot and pan he possessed seemed to have been used. The \nwashing-up was so dismally real that Bilbo was forced to believe the party of the night before had not \nbeen part of his bad dreams, as he had rather hoped. Indeed he was really relieved after all to think \nthat they had all gone without him, and without bothering to wake him up (\u201Cbut with never a thank- \nyou\u201D he thought); and yet in a way he could not help feeling just a trifle disappointed. The feeling \nsurprised him. \n\u201CDon\u2019t be a fool, Bilbo Baggins!\u201D he said to himself, \u201Cthinking of dragons and all that outlandish \nnonsense at your age!\u201D So he put on an apron, lit fires, boiled water, and washed up. Then he had a \nnice little breakfast in the kitchen before turning out the dining-room. By that time the sun was \nshining; and the front door was open, letting in a warm spring breeze. Bilbo began to whistle loudly \nand to forget about the night before. In fact he was just sitting down to a nice little second breakfast in \nthe dining-room by the open window, when in walked Gandalf . \n\u201CMy dear fellow,\u201D said he, \u201Cwhenever are you going to come? What about an early start ? \u2014 and \nhere you are having breakfast, or whatever you call it, at half past ten! They left you the message, \nbecause they could not wait.\u201D \n\u201CWhat message?\u201D said poor Mr. Baggins all in a fluster. \n\u201CGreat Elephants!\u201D said Gandalf, \u201Cyou are not at all yourself this morning \u2014 you have never dusted \nthe mantelpiece!\u201D \n\u201CWhat\u2019s that got to do with it? I have had enough to do with washing up for fourteen!\u201D \n\u201CIf you had dusted the mantelpiece, you would have found this just under the clock,\u201D said Gandalf, \nhanding Bilbo a note (written, of course, on his own note-paper). \nThis is what he read: \n\u201CThorin and Company to Burglar Bilbo greeting! For your hospitality our sincerest thanks, and for \nyour offer of professional assistance our grateful acceptance. Terms: cash on delivery, up to and not \nexceeding one fourteenth of total profits (if any); all travelling expenses guaranteed in any event; \nfuneral expenses to be defrayed by us or our representatives, if occasion arises and the matter is not \notherwise arranged for. \n\u201CThinking it unnecessary to disturb your esteemed repose, we have proceeded in advance to make \nrequisite preparations, and shall await your respected person at the Green Dragon Inn, Bywater, at 11 \na.m. sharp. Trusting that you will be punctual, \n\u201C We have the honour to remain \n\u201C Yours deeply \n\u201C Thorin & Co.\u201D \n\u201CThat leaves you just ten minutes. You will have to run,\u201D said Gandalf. \n\u201CBut \u2014 said Bilbo. \n\u201CNo time for it,\u201D said the wizard. \n\u201CBut \u2014 ,\u201D said Bilbo again. \n\u201CNo time for that either! Off you go!\u201D \nTo the end of his days Bilbo could never remember how he found himself outside, without a hat, a \nwalking-stick or any money, or anything that he usually took when he went out; leaving his second \nbreakfast half-finished and quite unwashed-up, pushing his keys into Gandalf\u2019 s hands, and running as \nfast as his furry feet could carry him down the lane, past the great Mill, across The Water, and then on \nfor a mile or more. \nVery puffed he was, when he got to Bywater just on the stroke of eleven, and found he had come \nwithout a pocket-handkerchief! \n\u201CBravo!\u201D said Balin who was standing at the inn door looking out for him. \nJust then all the others came round the corner of the road from the village. They were on ponies, \nand each pony was slung about with all kinds of baggages, packages, parcels, and paraphernalia. There \nwas a very small pony, apparently for Bilbo. \n\u201CUp you two get, and off we go!\u201D said Thorin. \n\u201CI\u2019m awfully sorry,\u201D said Bilbo, \u201Cbut I have come without my hat, and I have left my pocket- \nhandkerchief behind, and I haven\u2019t got any money. I didn\u2019t get your note until after 10.45 to be \nprecise.\u201D \n\u201CDon\u2019t be precise,\u201D said Dwalin, \u201Cand don\u2019t worry! You will have to manage without pocket- \nhandkerchiefs, and a good many other things, before you get to the journey\u2019s end. As for a hat, I have \ngot a spare hood and cloak in my luggage.\u201D \nThat\u2019s how they all came to start, jogging off from the inn one fine morning just before May, on \nladen ponies; and Bilbo was wearing a dark-green hood (a little weather-stained) and a dark-green \ncloak borrowed from Dwalin. They were too large for him, and he looked rather comic. What his \nfather Bungo would have thought of him, I daren\u2019t think. His only comfort was he couldn\u2019t be \nmistaken for a dwarf, as he had no beard. \nThey had not been riding very long, when up came Gandalf very splendid on a white horse. He had \nbrought a lot of pocket-handkerchiefs, and Bilbo\u2019s pipe and tobacco. So after that the party went along \nvery merrily, and they told stories or sang songs as they rode forward all day, except of course when \nthey stopped for meals. These didn\u2019t come quite as often as Bilbo would have liked them, but still he \nbegan to feel that adventures were not so bad after all. \nAt first they had passed through hobbit-lands, a wide respectable country inhabited by decent folk, \nwith good roads, an inn or two, and now and then a dwarf or a farmer ambling by on business. Then \nthey came to lands where people spoke strangely, and sang songs Bilbo had never heard before. Now \nthey had gone on far into the Lone-lands, where there were no people left, no inns, and the roads grew \nsteadily worse. Not far ahead were dreary hills, rising higher and higher, dark with trees. On some of \nthem were old castles with an evil look, as if they had been built by wicked people. Everything seemed \ngloomy, for the weather that day had taken a nasty turn. Mostly it had been as good as May can be, can \nbe, even in merry tales, but now it was cold and wet. In the Lone-lands they had been obliged to camp \nwhen they could, but at least it had been dry. \n\u201CTo think it will soon be June!\u201D grumbled Bilbo, as he splashed along behind the others in a very \nmuddy track. It was after tea-time; it was pouring with rain, and had been all day; his hood was \ndripping into his eyes, his cloak was full of water; the pony was tired and stumbled on stones; the \nothers were too grumpy to talk. \u201CAnd I\u2019m sure the rain has got into the dry clothes and into the food- \nbags,\u201D thought Bilbo. \u201CBother burgling and everything to do with it! I wish I was at home in my nice \nhole by the fire, with the kettle just beginning to sing!\u201D It was not the last time that he wished that! \nStill the dwarves jogged on, never turning round or taking any notice of the hobbit. Somewhere \nbehind the grey clouds the sun must have gone down, for it began to get dark as they went down into a \ndeep valley with a river at the bottom. Wind got up, and willows along its banks bent and sighed. \nFortunately the road went over an ancient stone bridge, for the river, swollen with the rains, came \nrushing down from the hills and mountains in the north. \nIt was nearly night when they had crossed over. The wind broke up the grey clouds, and a \nwandering moon appeared above the hills between the flying rags. Then they stopped, and Thorin \nmuttered something about supper, \u201Cand where shall we get a dry patch to sleep on?\u201D Not until then did \nthey notice that Gandalf was missing. So far he had come all the way with them, never saying if he \nwas in the adventure or merely keeping them company for a while. He had eaten most, talked most, \nand laughed most. But now he simply was not there at all! \n\u201CJust when a wizard would have been most useful, too,\u201D groaned Dori and Nori (who shared the \nhobbit\u2019s views about regular meals, plenty and often). \nThey decided in the end that they would have to camp where they were. They moved to a clump of \ntrees, and though it was drier under them, the wind shook the rain off the leaves, and the drip, drip, \nwas most annoying. Also the mischief seemed to have got into the fire. Dwarves can make a fire \nalmost anywhere out of almost anything, wind or no wind; but they could not do it that night, not even \nOin and Gloin, who were specially good at it. \nThen one of the ponies took fright at nothing and bolted. He got into the river before they could \ncatch him; and before they could get him out again, Fili and Kili were nearly drowned, and all the \nbaggage that he carried was washed away off him. Of course it was mostly food, and there was mighty \nlittle left for supper, and less for breakfast. \nThere they all sat glum and wet and muttering, while Oin and Gloin went on trying to light the fire, \nand quarrelling about it. Bilbo was sadly reflecting that adventures are not all pony-rides in May- \nsunshine, when Balin, who was always their look-out man, said: \u201CThere\u2019s a light over there!\u201D There \nwas a hill some way off with trees on it, pretty thick in parts. Out of the dark mass of the trees they \ncould now see a light shining, a reddish comfortable-looking light, as it might be a fire or torches \ntwinkling. \nWhen they had looked at it for some while, they fell to arguing. Some said \u201Cno\u201D and some said \n\u201Cyes\u201D. Some said they could but go and see, and anything was better than little supper, less breakfast, \nand wet clothes all the night. \nOthers said: \u201CThese parts are none too well known, and are too near the mountains. Travellers \nseldom come this way now. The old maps are no use: things have changed for the worse and the road \nis unguarded. They have seldom even heard of the king round here, and the less inquisitive you are as \nyou go along, the less trouble you are likely to find.\u201D Some said: \u201CAfter all there are fourteen of us.\u201D \nOthers said: \u201CWhere has Gandalf got to?\u201D This remark was repeated by everybody. Then the rain \nbegan to pour down worse than ever, and Oin and Gloin began to fight. \nThat settled it. \u201CAfter all we have got a burglar with us,\u201D they said; and so they made off, leading \ntheir ponies (with all due and proper caution) in the direction of the light. They came to the hill and \nwere soon in the wood. Up the hill they went; but there was no proper path to be seen, such as might \nlead to a house or a farm; and do what they could they made a deal of rustling and crackling and \ncreaking (and a good deal of grumbling and dratting), as they went through the trees in the pitch dark. \nSuddenly the red light shone out very bright through the tree-trunks not far ahead. \n\u201CNow it is the burglar\u2019s turn,\u201D they said, meaning Bilbo. \u201CYou must go on and find out all about \nthat light, and what it is for, and if all is perfectly safe and canny,\u201D said Thorin to the hobbit. \u201CNow \nscuttle off, and come back quick, if all is well. If not, come back if you can! If you can\u2019t, hoot twice \nlike a barn-owl and once like a screech-owl, and we will do what we can.\u201D \nOff Bilbo had to go, before he could explain that he could not hoot even once like any kind of owl \nany more than fly like a bat. But at any rate hobbits can move quietly in woods, absolutely quietly. \nThey take a pride in it, and Bilbo had sniffed more than once at what he called \u201Call this dwarvish \nracket,\u201D as they went along, though I don\u2019t suppose you or I would have noticed anything at all on a \nwindy night, not if the whole cavalcade had passed two feet off. As for Bilbo walking primly towards \nthe red light, I don\u2019t suppose even a weasel would have stirred a whisker at it. So, naturally, he got \nright up to the fire \u2014 for fire it was \u2014 without disturbing anyone. And this is what he saw. \nThree very large persons sitting round a very large fire of beech-logs. They were toasting mutton \non long spits of wood, and licking the gravy off their fingers. There was a fine toothsome smell. Also \nthere was a barrel of good drink at hand, and they were drinking out of jugs. But they were trolls. \nObviously trolls. Even Bilbo, in spite of his sheltered life, could see that: from the great heavy faces \nof them, and their size, and the shape of their legs, not to mention their language, which was not \ndrawing-room fashion at all, at all. \n\u201CMutton yesterday, mutton today, and blimey, if it don\u2019t look like mutton again tomorrer,\u201D said \none of the trolls. \n\u201CNever a blinking bit of manflesh have we had for long enough,\u201D said a second. \u201CWhat the \u2019ell \nWilliam was a-thinkin\u2019 of to bring us into these parts at all, beats me \u2014 and the drink runnin\u2019 short, \nwhat\u2019s more,\u201D he said jogging the elbow of William, who was taking a pull at his jug. \nWilliam choked. \u201CShut yer mouth!\u201D he said as soon as he could. \u201CYer can\u2019t expect folk to stop here \nfor ever just to be et by you and Bert. You\u2019ve et a village and a half between yer, since we come down \nfrom the mountains. How much more d\u2019yer want? And time\u2019s been up our way, when yer\u2019d have said \n\u2018thank yer Bill\u2019 for a nice bit o\u2019 fat valley mutton like what this is.\u201D He took a big bite off a sheep\u2019s \nleg he was roasting, and wiped his lips on his sleeve. \nYes, I am afraid trolls do behave like that, even those with only one head each. After hearing all \nthis Bilbo ought to have done something at once. Either he should have gone back quietly and warned \nhis friends that there were three fair-sized trolls at hand in a nasty mood, quite likely to try roasted \ndwarf, or even pony, for a change; or else he should have done a bit of good quick burgling. A really \nfirst-class and legendary burglar would at this point have picked the trolls\u2019 pockets \u2014 it is nearly \nalways worth while, if you can manage it \u2014 , pinched the very mutton off the spits, purloined the beer, \nand walked off without their noticing him. Others more practical but with less professional pride \nwould perhaps have stuck a dagger into each of them before they observed it. Then the night could \nhave been spent cheerily. \nBilbo knew it. He had read of a good many things he had never seen or done. He was very much \nalarmed, as well as disgusted; he wished himself a hundred miles away, and yet \u2014 and yet somehow he \ncould not go straight back to Thorin and Company emptyhanded. So he stood and hesitated in the \nshadows. Of the various burglarious proceedings he had heard of picking the trolls\u2019 pockets seemed \nthe least difficult, so at last he crept behind a tree just behind William. \nBert and Tom went off to the barrel. William was having another drink. Then Bilbo plucked up \ncourage and put his little hand in William\u2019s enormous pocket. There was a purse in it, as big as a bag \nto Bilbo. \u201CHa!\u201D thought he, warming to his new work as he lifted it carefully out, \u201Cthis is a beginning!\u201D \nIt was! Trolls\u2019 purses are the mischief, and this was no exception. \u201C\u2019Ere, \u2019oo are you?\u201D it squeaked, \nas it left the pocket; and William turned round at once and grabbed Bilbo by the neck, before he could \nduck behind the tree. \n\u201CBlimey, Bert, look what I\u2019ve copped!\u201D said William. \n\u201CWhat is it?\u201D said the others coming up. \u201CLumme, if I knows! What are yer?\u201D \n\u201CBilbo Baggins, a bur \u2014 a hobbit,\u201D said poor Bilbo, shaking all over, and wondering how to make \nowl-noises before they throttled him. \n\u201CA burrahobbit?\u201D said they a bit startled. Trolls are slow in the uptake, and mighty suspicious about \nanything new to them. \n\u201CWhat\u2019s a burrahobbit got to do with my pocket, anyways?\u201D said William. \n\u201CAnd can yer cook \u2019em?\u201D said Tom. \n\u201CYer can try,\u201D said Bert, picking up a skewer. \n\u201CHe wouldn\u2019t make above a mouthful,\u201D said William, who had already had a fine supper, \u201Cnot \nwhen he was skinned and boned.\u201D \n\u201CP\u2019raps there are more like him round about, and we might make a pie,\u201D said Bert. \u201CHere you, are \nthere any more of your sort a-sneakin\u2019 in these here woods, yer nassty little rabbit,\u201D said he looking at \nthe hobbit\u2019s furry feet; and he picked him up by the toes and shook him. \n\u201CYes, lots,\u201D said Bilbo, before he remembered not to give his friends away. \u201CNo none at all, not \none,\u201D he said immediately afterwards. \n\u201CWhat d\u2019yer mean?\u201D said Bert, holding him right way up, by the hair this time. \n\u201CWhat I say,\u201D said Bilbo gasping. \u201CAnd please don\u2019t cook me, kind sirs! I am a good cook myself, \nand cook better than I cook, if you see what I mean. I\u2019ll cook beautifully for you, a perfectly beautiful \nbreakfast for you, if only you won\u2019t have me for supper.\u201D \n\u201CPoor little blighter,\u201D said William. He had already had as much supper as he could hold; also he \nhad had lots of beer. \u201CPoor little blighter! Let him go!\u201D \n\u201CNot till he says what he means by lots and none at all,\u201D said Bert. \u201CI don\u2019t want to have me throat \ncut in me sleep! Hold his toes in the fire, till he talks!\u201D \n\u201CI won\u2019t have it,\u201D said William. \u201CI caught him anyway.\u201D \n\u201CYou\u2019re a fat fool, William,\u201D said Bert, \u201Cas I\u2019ve said afore this evening.\u201D \n\u201CAnd you\u2019re a lout!\u201D \n\u201CAnd I won\u2019t take that from you, Bill Huggins,\u201D says Bert, and puts his fist in William\u2019s eye. \nThen there was a gorgeous row. Bilbo had just enough wits left, when Bert dropped him on the \nground, to scramble out of the way of their feet, before they were fighting like dogs, and calling one \nanother all sorts of perfectly true and applicable names in very loud voices. Soon they were locked in \none another\u2019s arms, and rolling nearly into the fire kicking and thumping, while Tom whacked at them \nboth with a branch to bring them to their senses \u2014 and that of course only made them madder than \never. \nThat would have been the time for Bilbo to have left. But his poor little feet had been very \nsquashed in Bert\u2019s big paw, and he had no breath in his body, and his head was going round; so there \nhe lay for a while panting, just outside the circle of firelight. \nRight in the middle of the fight up came Balin. The dwarves had heard noises from a distance, and \nafter waiting for some time for Bilbo to come back, or to hoot like an owl, they started off one by one \nto creep towards the light as quietly as they could. No sooner did Tom see Balin come into the light \nthan he gave an awful howl. Trolls simply detest the very sight of dwarves (uncooked). Bert and Bill \nstopped fighting immediately, and \u201Ca sack, Tom, quick!\u201D they said. Before Balin, who was wondering \nwhere in all this commotion Bilbo was, knew what was happening, a sack was over his head, and he \nwas down. \n\u201CThere\u2019s more to come yet,\u201D said Tom, \u201Cor I\u2019m mighty mistook. Lots and none at all, it is,\u201D said he. \n\u201CNo burrahobbits, but lots of these here dwarves. That\u2019s about the shape of it!\u201D \n\u201CI reckon you\u2019re right,\u201D said Bert, \u201Cand we\u2019d best get out of the light.\u201D \nAnd so they did. With sacks in their hands, that they used for carrying off mutton and other \nplunder, they waited in the shadows. As each dwarf came up and looked at the fire, and the spilled \njugs, and the gnawed mutton, in surprise, pop! went a nasty smelly sack over his head, and he was \ndown. Soon Dwalin lay by Balin, and Fili and Kili together, and Dori and Nori and Ori all in a heap, \nand Oin and Gloin and Bifur and Bofur and Bombur piled uncomfortably near the fire. \n\u201CThat\u2019ll teach \u2019em,\u201D said Tom; for Bifur and Bombur had given a lot of trouble, and fought like \nmad, as dwarves will when cornered. \nThorin came last \u2014 and he was not caught unawares. He came expecting mischief, and didn\u2019t need \nto see his friends\u2019 legs sticking out of sacks to tell him that things were not all well. He stood outside \nin the shadows some way off, and said: \u201CWhat\u2019s all this trouble? Who has been knocking my people \nabout?\u201D \n\u201CIt\u2019s trolls!\u201D said Bilbo from behind a tree. They had forgotten all about him. \u201CThey\u2019re hiding in \nthe bushes with sacks,\u201D said he. \n\u201CO! are they?\u201D said Thorin, and he jumped forward to the fire, before they could leap on him. He \ncaught up a big branch all on fire at one end; and Bert got that end in his eye before he could step \naside. That put him out of the battle for a bit. Bilbo did his best. He caught hold of Tom\u2019s leg \u2014 as well \nas he could, it was thick as a young tree-trunk \u2014 but he was sent spinning up into the top of some \nbushes, when Tom kicked the sparks up in Thorin\u2019 s face. \nThe Trolls \nTom got the branch in his teeth for that, and lost one of the front ones. It made him howl, I can tell \nyou. But just at that moment William came up behind and popped a sack right over Thorin\u2019s head and \ndown to his toes. And so the fight ended. A nice pickle they were all in now: all neatly tied up in \nsacks, with three angry trolls (and two with burns and bashes to remember) sitting by them, arguing \nwhether they should roast them slowly, or mince them fine and boil them, or just sit on them one by \none and squash them into jelly; and Bilbo up in a bush, with his clothes and his skin torn, not daring to \nmove for fear they should hear him. \nIt was just then that Gandalf came back. But no one saw him. The trolls had just decided to roast the \ndwarves now and eat them later \u2014 that was Bert\u2019s idea, and after a lot of argument they had all agreed \nto it. \n\u201CNo good roasting \u2019em now, it\u2019d take all night,\u201D said a voice. Bert thought it was William\u2019s. \n\u201CDon\u2019t start the argument all over again, Bill,\u201D he said, \u201Cor it will take all night.\u201D \n\u201CWho\u2019s a-arguing?\u201D said William, who thought it was Bert that had spoken. \n\u201CYou are,\u201D said Bert. \n\u201CYou\u2019re a liar,\u201D said William; and so the argument began all over again. In the end they decided to \nmince them fine and boil them. So they got a great black pot, and they took out their knives. \n\u201CNo good boiling \u2019em! We ain\u2019t got no water, and it\u2019s a long way to the well and all,\u201D said a voice. \nBert and William thought it was Tom\u2019s. \n\u201CShut up!\u201D said they, \u201Cor we\u2019ll never have done. And yer can fetch the water yerself, if yer say any \nmore.\u201D \n\u201CShut up yerself!\u201D said Tom, who thought it was William\u2019s voice. \u201CWho\u2019s arguing but you, I\u2019d like \nto know.\u201D \n\u201CYou\u2019re a booby,\u201D said William. \n\u201CBooby yerself!\u201D said Tom. \nAnd so the argument began all over again, and went on hotter than ever, until at last they decided to \nsit on the sacks one by one and squash them, and boil them next time. \n\u201CWho shall we sit on first?\u201D said the voice. \n\u201CBetter sit on the last fellow first,\u201D said Bert, whose eye had been damaged by Thorin. He thought \nTom was talking. \n\u201CDon\u2019t talk to yerself!\u201D said Tom. \u201CBut if you wants to sit on the last one, sit on him. Which is he?\u201D \n\u201CThe one with the yellow stockings,\u201D said Bert. \n\u201CNonsense, the one with the grey stockings,\u201D said a voice like William\u2019s. \n\u201CI made sure it was yellow,\u201D said Bert. \n\u201CYellow it was,\u201D said William. \n\u201CThen what did yer say it was grey for?\u201D said Bert. \n\u201CI never did. Tom said it.\u201D \n\u201CThat I never did!\u201D said Tom. \u201CIt was you.\u201D \n\u201CTwo to one, so shut yer mouth!\u201D said Bert. \n\u201CWho are you a-talkin\u2019 to?\u201D said William. \n\u201CNow stop it!\u201D said Tom and Bert together. \u201CThe night\u2019s gettin\u2019 on, and dawn comes early. Let\u2019s \nget on with it!\u201D \n\u201CDawn take you all, and be stone to you!\u201D said a voice that sounded like William\u2019s. But it wasn\u2019t. \nFor just at that moment the light came over the hill, and there was a mighty twitter in the branches. \nWilliam never spoke for he stood turned to stone as he stooped; and Bert and Tom were stuck like \nrocks as they looked at him. And there they stand to this day, all alone, unless the birds perch on them; \nfor trolls, as you probably know, must be underground before dawn, or they go back to the stuff of the \nmountains they are made of, and never move again. That is what had happened to Bert and Tom and \nWilliam. \n\u201CExcellent!\u201D said Gandalf, as he stepped from behind a tree, and helped Bilbo to climb down out of \na thorn-bush. Then Bilbo understood. It was the wizard\u2019s voice that had kept the trolls bickering and \nquarrelling, until the light came and made an end of them. \nThe next thing was to untie the sacks and let out the dwarves. They were nearly suffocated, and \nvery annoyed: they had not at all enjoyed lying there listening to the trolls making plans for roasting \nthem and squashing them and mincing them. They had to hear Bilbo\u2019s account of what had happened \nto him twice over, before they were satisfied. \n\u201CSilly time to go practising pinching and pocket-picking,\u201D said Bombur, \u201Cwhen what we wanted \nwas fire and food!\u201D \n\u201CAnd that\u2019s just what you wouldn\u2019t have got of those fellows without a struggle, in any case,\u201D said \nGandalf. \u201CAnyhow you are wasting time now. Don\u2019t you realize that the trolls must have a cave or a \nhole dug somewhere near to hide from the sun in? We must look into it!\u201D \nThey searched about, and soon found the marks of trolls\u2019 stony boots going away through the trees. \nThey followed the tracks up the hill, until hidden by bushes they came on a big door of stone leading \nto a cave. But they could not open it, not though they all pushed while Gandalf tried various \nincantations. \n\u201CWould this be any good?\u201D asked Bilbo, when they were getting tired and angry. \u201CI found it on the \nground where the trolls had their fight.\u201D He held out a largish key, though no doubt William had \nthought it very small and secret. It must have fallen out of his pocket, very luckily, before he was \nturned to stone. \n\u201CWhy on earth didn\u2019t you mention it before?\u201D they cried. Gandalf grabbed it and fitted it into the \nkeyhole. Then the stone door swung back with one big push, and they all went inside. There were \nbones on the floor and a nasty smell was in the air; but there was a good deal of food jumbled \ncarelessly on shelves and on the ground, among an untidy litter of plunder, of all sorts from brass \nbuttons to pots full of gold coins standing in a corner. There were lots of clothes, too, hanging on the \nwalls \u2014 too small for trolls, I am afraid they belonged to victims \u2014 and among them were several \nswords of various makes, shapes, and sizes. Two caught their eyes particularly, because of their \nbeautiful scabbards and jewelled hilts. \nGandalf and Thorin each took one of these; and Bilbo took a knife in a leather sheath. It would \nhave made only a tiny pocket-knife for a troll, but it was as good as a short sword for the hobbit. \n\u201CThese look like good blades,\u201D said the wizard, half drawing them and looking at them curiously. \n\u201CThey were not made by any troll, nor by any smith among men in these parts and days; but when we \ncan read the runes on them, we shall know more about them.\u201D \n\u201CLet\u2019s get out of this horrible smell!\u201D said Fili. So they carried out the pots of coins, and such food \nas was untouched and looked fit to eat, also one barrel of ale which was still full. By that time they felt \nlike breakfast, and being very hungry they did not turn their noses up at what they had got from the \ntrolls\u2019 larder. Their own provisions were very scanty. Now they had bread and cheese, and plenty of \nale, and bacon to toast in the embers of the fire. \nAfter that they slept, for their night had been disturbed; and they did nothing more till the \nafternoon. Then they brought up their ponies, and carried away the pots of gold, and buried them very \nsecretly not far from the track by the river, putting a great many spells over them, just in case they \never had the chance to come back and recover them. When that was done, they all mounted once more, \nand jogged along again on the path towards the East. \n\u201CWhere did you go to, if I may ask?\u201D said Thorin to Gandalf as they rode along. \n\u201CTo look ahead,\u201D said he. \n\u201CAnd what brought you back in the nick of time?\u201D \u201CLooking behind,\u201D said he. \n\u201CExactly!\u201D said Thorin; \u201Cbut could you be more plain?\u201D \n\u201CI went on to spy out our road. It will soon become dangerous and difficult. Also I was anxious \nabout replenishing our small stock of provisions. I had not gone very far, however, when I met a \ncouple of friends of mine from Rivendell.\u201D \n\u201CWhere\u2019s that?\u201D asked Bilbo. \n\u201CDon\u2019t interrupt!\u201D said Gandalf. \u201CYou will get there in a few days now, if we\u2019re lucky, and find out \nall about it. As I was saying I met two of Elrond\u2019s people. They were hurrying along for fear of the \ntrolls. It was they who told me that three of them had come down from the mountains and settled in \nthe woods not far from the road: they had frightened everyone away from the district, and they \nwaylaid strangers. \n\u201CI immediately had a feeling that I was wanted back. Looking behind I saw a fire in the distance \nand made for it. So now you know. Please be more careful, next time, or we shall never get \nanywhere ! \u201D \n\u201CThank you!\u201D said Thorin. \nChapter III \nA SHORT REST \nThey did not sing or tell stories that day, even though the weather improved; nor the next day, nor the \nday after. They had begun to feel that danger was not far away on either side. They camped under the \nstars, and their horses had more to eat than they had; for there was plenty of grass, but there was not \nmuch in their bags, even with what they had got from the trolls. One morning they forded a river at a \nwide shallow place full of the noise of stones and foam. The far bank was steep and slippery. When \nthey got to the top of it, leading their ponies, they saw that the great mountains had marched down \nvery near to them. Already they seemed only a day\u2019s easy journey from the feet of the nearest. Dark \nand drear it looked, though there were patches of sunlight on its brown sides, and behind its shoulders \nthe tips of snow-peaks gleamed. \n\u201CIs that The Mountain?\u201D asked Bilbo in a solemn voice, looking at it with round eyes. He had never \nseen a thing that looked so big before. \n\u201COf course not!\u201D said Balin. \u201CThat is only the beginning of the Misty Mountains, and we have got \nto get through, or over, or under those somehow, before we can come into Wilderland beyond. And it \nis a deal of a way even from the other side of them to the Lonely Mountain in the East where Smaug \nlies on our treasure.\u201D \n\u201CO!\u201D said Bilbo, and just at that moment he felt more tired than he ever remembered feeling \nbefore. He was thinking once again of his comfortable chair before the fire in his favourite sitting- \nroom in his hobbit-hole, and of the kettle singing. Not for the last time! \nNow Gandalf led the way. \u201CWe must not miss the road, or we shall be done for,\u201D he said. \u201CWe need \nfood, for one thing, and rest in reasonable safety \u2014 also it is very necessary to tackle the Misty \nMountains by the proper path, or else you will get lost in them, and have to come back and start at the \nbeginning again (if you ever get back at all).\u201D \nThey asked him where he was making for, and he answered: \u201CYou are come to the very edge of the \nWild, as some of you may know. Hidden somewhere ahead of us is the fair valley of Rivendell where \nElrond lives in the Last Homely House. I sent a message by my friends, and we are expected.\u201D \nThat sounded nice and comforting, but they had not got there yet, and it was not so easy as it \nsounds to find the Last Homely House west of the Mountains. There seemed to be no trees and no \nvalleys and no hills to break the ground in front of them, only one vast slope going slowly up and up to \nmeet the feet of the nearest mountain, a wide land the colour of heather and crumbling rock, with \npatches and slashes of grass-green and moss-green showing where water might be. \nMorning passed, afternoon came; but in all the silent waste there was no sign of any dwelling. They \nwere growing anxious, for they saw now that the house might be hidden almost anywhere between \nthem and the mountains. They came on unexpected valleys, narrow with steep sides, that opened \nsuddenly at their feet, and they looked down surprised to see trees below them and running water at \nthe bottom. There were gullies that they could almost leap over, but very deep with waterfalls in them. \nThere were dark ravines that one could neither jump over nor climb into. There were bogs, some of \nthem green pleasant places to look at, with flowers growing bright and tall; but a pony that walked \nthere with a pack on its back would never have come out again. \nIt was indeed a much wider land from the ford to the mountains than ever you would have guessed. \nBilbo was astonished. The only path was marked with white stones, some of which were small, and \nothers were half covered with moss or heather. Altogether it was a very slow business following the \ntrack, even guided by Gandalf, who seemed to know his way about pretty well. \nHis head and beard wagged this way and that as he looked for the stones, and they followed his \nlead, but they seemed no nearer to the end of the search when the day began to fail. Tea-time had long \ngone by, and it seemed supper-time would soon do the same. There were moths fluttering about, and \nthe light became very dim, for the moon had not risen. Bilbo\u2019s pony began to stumble over roots and \nstones. They came to the edge of a steep fall in the ground so suddenly that Gandalf\u2019 s horse nearly \nslipped down the slope. \n\u201CHere it is at last!\u201D he called, and the others gathered round him and looked over the edge. They \nsaw a valley far below. They could hear the voice of hurrying water in a rocky bed at the bottom; the \nscent of trees was in the air; and there was a light on the valley-side across the water. \nBilbo never forgot the way they slithered and slipped in the dusk down the steep zig-zag path into \nthe secret valley of Rivendell. The air grew warmer as they got lower, and the smell of the pine-trees \nmade him drowsy, so that every now and again he nodded and nearly fell off, or bumped his nose on \nthe pony\u2019s neck. Their spirits rose as they went down and down. The trees changed to beech and oak, \nand there was a comfortable feeling in the twilight. The last green had almost faded out of the grass, \nwhen they came at length to an open glade not far above the banks of the stream. \n\u201CHmmm! it smells like elves!\u201D thought Bilbo, and he looked up at the stars. They were burning \nbright and blue. Just then there came a burst of song like laughter in the trees: \nO! What are you doing, \nAnd where are you going? \nYour ponies need shoeing! \nThe river is flowing! \nO! tra-la-la-lally \nhere down in the valley! \nO! What are you seeking, \nAnd where are you making? \nThe faggots are reeking, \nThe bannocks are baking! \nO! tril-lil-lil-lolly \nthe valley is jolly, \nha! ha! \nO! Where are you going \nWith beards all a-wagging? \nNo knowing, no knowing \nWhat brings Mister Baggins \nAnd Balin and Dwalin \ndown into the valley \nin June \nha! ha! \nO! Will you be staying, \nOr will you be flying? \nYour ponies are straying! \nThe daylight is dying! \nTo fly would be folly, \nTo stay would be jolly \nAnd listen and hark \nTill the end of the dark \nto our tune \nha! ha! \nSo they laughed and sang in the trees; and pretty fair nonsense I daresay you think it. Not that they \nwould care; they would only laugh all the more if you told them so. They were elves of course. Soon \nBilbo caught glimpses of them as the darkness deepened. He loved elves, though he seldom met them; \nbut he was a little frightened of them too. Dwarves don\u2019t get on well with them. Even decent enough \ndwarves like Thorin and his friends think them foolish (which is a very foolish thing to think), or get \nannoyed with them. For some elves tease them and laugh at them, and most of all at their beards. \n\u201CWell, well!\u201D said a voice. \u201CJust look! Bilbo the hobbit on a pony, my dear! Isn\u2019t it delicious!\u201D \n\u201CMost astonishing wonderful!\u201D \nThen off they went into another song as ridiculous as the one I have written down in full. At last \none, a tall young fellow, came out from the trees and bowed to Gandalf and to Thorin. \n\u201CWelcome to the valley!\u201D he said. \n\u201CThank you!\u201D said Thorin a bit gruffly; but Gandalf was already off his horse and among the elves, \ntalking merrily with them. \n\u201CYou are a little out of your way,\u201D said the elf: \u201Cthat is, if you are making for the only path across \nthe water and to the house beyond. We will set you right, but you had best get on foot, until you are \nover the bridge. Are you going to stay a bit and sing with us, or will you go straight on? Supper is \npreparing over there,\u201D he said. \u201CI can smell the wood-fires for the cooking.\u201D \nTired as he was, Bilbo would have liked to stay a while. Elvish singing is not a thing to miss, in \nJune under the stars, not if you care for such things. Also he would have liked to have a few private \nwords with these people that seemed to know his names and all about him, although he had never seen \nthem before. He thought their opinion of his adventure might be interesting. Elves know a lot and are \nwondrous folk for news, and know what is going on among the peoples of the land, as quick as water \nflows, or quicker. \nBut the dwarves were all for supper as soon as possible just then, and would not stay. On they all \nwent, leading their ponies, till they were brought to a good path and so at last to the very brink of the \nriver. It was flowing fast and noisily, as mountain-streams do of a summer evening, when sun has \nbeen all day on the snow far up above. There was only a narrow bridge of stone without a parapet, as \nnarrow as a pony could well walk on; and over that they had to go, slow and careful, one by one, each \nleading his pony by the bridle. The elves had brought bright lanterns to the shore, and they sang a \nmerry song as the party went across. \n\u201CDon\u2019t dip your beard in the foam, father!\u201D they cried to Thorin, who was bent almost on to his \nhands and knees. \u201CIt is long enough without watering it.\u201D \n\u201CMind Bilbo doesn\u2019t eat all the cakes!\u201D they called. \u201CHe is too fat to get through key-holes yet!\u201D \n\u201CHush, hush! Good People! and good night!\u201D said Gandalf, who came last. \u201CValleys have ears, and \nsome elves have over merry tongues. Good night!\u201D \nAnd so at last they all came to the Last Homely House, and found its doors flung wide. \nNow it is a strange thing, but things that are good to have and days that are good to spend are soon \ntold about, and not much to listen to; while things that are uncomfortable, palpitating, and even \ngruesome, may make a good tale, and take a deal of telling anyway. They stayed long in that good \nhouse, fourteen days at least, and they found it hard to leave. Bilbo would gladly have stopped there \nfor ever and ever \u2014 even supposing a wish would have taken him right back to his hobbit-hole without \ntrouble. Yet there is little to tell about their stay. \nThe master of the house was an elf-friend \u2014 one of those people whose fathers came into the \nstrange stories before the beginning of History, the wars of the evil goblins and the elves and the first \nmen in the North. In those days of our tale there were still some people who had both elves and heroes \nof the North for ancestors, and Elrond the master of the house was their chief. \nHe was as noble and as fair in face as an elf-lord, as strong as a warrior, as wise as a wizard, as \nvenerable as a king of dwarves, and as kind as summer. He comes into many tales, but his part in the \nstory of Bilbo\u2019s great adventure is only a small one, though important, as you will see, if we ever get \nto the end of it. His house was perfect, whether you liked food, or sleep, or work, or story-telling, or \nsinging, or just sitting and thinking best, or a pleasant mixture of them all. Evil things did not come \ninto that valley. \nI wish I had time to tell you even a few of the tales or one or two of the songs that they heard in \nthat house. All of them, the ponies as well, grew refreshed and strong in a few days there. Their \nclothes were mended as well as their bruises, their tempers and their hopes. Their bags were filled \nwith food and provisions light to carry but strong to bring them over the mountain passes. Their plans \nwere improved with the best advice. So the time came to midsummer eve, and they were to go on \nagain with the early sun on midsummer morning. \nElrond knew all about runes of every kind. That day he looked at the swords they had brought from \nthe trolls\u2019 lair, and he said: \u201CThese are not troll-make. They are old swords, very old swords of the \nHigh Elves of the West, my kin. They were made in Gondolin for the Goblin-wars. They must have \ncome from a dragon\u2019s hoard or goblin plunder, for dragons and goblins destroyed that city many ages \nago. This, Thorin, the runes name Orcrist, the Goblin-cleaver in the ancient tongue of Gondolin; it was \na famous blade. This, Gandalf, was Glamdring, Foe-hammer that the king of Gondolin once wore. \nKeep them well!\u201D \n\u201CWhence did the trolls get them, I wonder?\u201D said Thorin looking at his sword with new interest. \n\u201CI could not say,\u201D said Elrond, \u201Cbut one may guess that your trolls had plundered other plunderers, \nor come on the remnants of old robberies in some hold in the mountains. I have heard that there are \nstill forgotten treasures of old to be found in the deserted caverns of the mines of Moria, since the \ndwarf and goblin war.\u201D \nThorin pondered these words. \u201CI will keep this sword in honour,\u201D he said. \u201CMay it soon cleave \ngoblins once again!\u201D \n\u201CA wish that is likely to be granted soon enough in the mountains!\u201D said Elrond. \u201CBut show me now \nyour map!\u201D \nHe took it and gazed long at it, and he shook his head; for if he did not altogether approve of \ndwarves and their love of gold, he hated dragons and their cruel wickedness, and he grieved to \nremember the ruin of the town of Dale and its merry bells, and the burned banks of the bright River \nRunning. The moon was shining in a broad silver crescent. He held up the map and the white light \nshone through it. \u201CWhat is this?\u201D he said. \u201CThere are moon-letters here, beside the plain runes which \nsay \u2018five feet high the door and three may walk abreast.\u2019\u201D \n\u201CWhat are moon-letters?\u201D asked the hobbit full of excitement. He loved maps, as I have told you \nbefore; and he also liked runes and letters and cunning handwriting, though when he wrote himself it \nwas a bit thin and spidery. \n\u201CMoon-letters are rune-letters, but you cannot see them,\u201D said Elrond, \u201Cnot when you look straight \nat them. They can only be seen when the moon shines behind them, and what is more, with the more \ncunning sort it must be a moon of the same shape and season as the day when they were written. The \ndwarves invented them and wrote them with silver pens, as your friends could tell you. These must \nhave been written on a midsummer\u2019s eve in a crescent moon, a long while ago.\u201D \n\u201CWhat do they say?\u201D asked Gandalf and Thorin together, a bit vexed perhaps that even Elrond \nshould have found this out first, though really there had not been a chance before, and there would not \nhave been another until goodness knows when. \n\u201C Stand by the grey stone when the thrush knocks. \u201D read Elrond, \u201Cand the setting sun with the last \nlight of Durin\u2019s Day will shine upon the key-hole.\u201D \n\u201CDurin, Durin!\u201D said Thorin. \u201CHe was the father of the fathers of the eldest race of Dwarves, the \nLongbeards, and my first ancestor: I am his heir.\u201D \n\u201CThen what is Durin\u2019s Day?\u201D asked Elrond. \n\u201CThe first day of the dwarves\u2019 New Year,\u201D said Thorin, \u201Cis as all should know the first day of the \nlast moon of Autumn on the threshold of Winter. We still call it Durin\u2019s Day when the last moon of \nAutumn and the sun are in the sky together. But this will not help us much, I fear, for it passes our \nskill in these days to guess when such a time will come again.\u201D \n\u201CThat remains to be seen,\u201D said Gandalf. \u201CIs there any more writing?\u201D \n\u201CNone to be seen by this moon,\u201D said Elrond, and he gave the map back to Thorin; and then they \nwent down to the water to see the elves dance and sing upon the midsummer\u2019s eve. \nThe next morning was a midsummer\u2019s morning as fair and fresh as could be dreamed: blue sky and \nnever a cloud, and the sun dancing on the water. Now they rode away amid songs of farewell and good \nspeed, with their hearts ready for more adventure, and with a knowledge of the road they must follow \nover the Misty Mountains to the land beyond. \nChapter IV \nOVER HILL AND UNDER HILL \nThere were many paths that led up into those mountains, and many passes over them. But most of the \npaths were cheats and deceptions and led nowhere or to bad ends; and most of the passes were infested \nby evil things and dreadful dangers. The dwarves and the hobbit, helped by the wise advice of Elrond \nand the knowledge and memory of Gandalf, took the right road to the right pass. \nLong days after they had climbed out of the valley and left the Last Homely House miles behind, \nthey were still going up and up and up. It was a hard path and a dangerous path, a crooked way and a \nlonely and a long. Now they could look back over the lands they had left, laid out behind them far \nbelow. Lar, far away in the West, where things were blue and faint, Bilbo knew there lay his own \ncountry of safe and comfortable things, and his little hobbit-hole. He shivered. It was getting bitter \ncold up here, and the wind came shrill among the rocks. Boulders, too, at times came galloping down \nthe mountain-sides, let loose by mid-day sun upon the snow, and passed among them (which was \nlucky), or over their heads (which was alarming). The nights were comfortless and chill, and they did \nnot dare to sing or talk too loud, for the echoes were uncanny, and the silence seemed to dislike being \nbroken \u2014 except by the noise of water and the wail of wind and the crack of stone. \n\u201CThe summer is getting on down below,\u201D thought Bilbo, \u201Cand haymaking is going on and picnics. \nThey will be harvesting and blackberrying, before we even begin to go down the other side at this \nrate.\u201D And the others were thinking equally gloomy thoughts, although when they had said good-bye to \nElrond in the high hope of a midsummer morning, they had spoken gaily of the passage of the \nmountains, and of riding swift across the lands beyond. They had thought of coming to the secret door \nin the Lonely Mountain, perhaps that very next last moon of Autumn \u2014 \u201Cand perhaps it will be Durin\u2019s \nDay\u201D they had said. Only Gandalf had shaken his head and said nothing. Dwarves had not passed that \nway for many years, but Gandalf had, and he knew how evil and danger had grown and thriven in the \nWild, since the dragons had driven men from the lands, and the goblins had spread in secret after the \nbattle of the Mines of Moria. Even the good plans of wise wizards like Gandalf and of good friends \nlike Elrond go astray sometimes when you are off on dangerous adventures over the Edge of the Wild; \nand Gandalf was a wise enough wizard to know it. \nHe knew that something unexpected might happen, and he hardly dared to hope that they would pass \nwithout fearful adventure over those great tall mountains with lonely peaks and valleys where no king \nruled. They did not. All was well, until one day they met a thunderstorm \u2014 more than a thunderstorm, a \nthunder-battle. You know how terrific a really big thunderstorm can be down in the land and in a \nriver-valley; especially at times when two great thunderstorms meet and clash. More terrible still are \nthunder and lightning in the mountains at night, when storms come up from East and West and make \nwar. The lightning splinters on the peaks, and rocks shiver, and great crashes split the air and go \nrolling and tumbling into every cave and hollow; and the darkness is filled with overwhelming noise \nand sudden light. \nBilbo had never seen or imagined anything of the kind. They were high up in a narrow place, with a \ndreadful fall into a dim valley at one side of them. There they were sheltering under a hanging rock for \nthe night, and he lay beneath a blanket and shook from head to toe. When he peeped out in the \nlightning-flashes, he saw that across the valley the stone-giants were out, and were hurling rocks at \none another for a game, and catching them, and tossing them down into the darkness where they \nsmashed among the trees far below, or splintered into little bits with a bang. Then came a wind and a \nrain, and the wind whipped the rain and the hail about in every direction, so that an overhanging rock \nwas no protection at all. Soon they were getting drenched and their ponies were standing with their \nheads down and their tails between their legs, and some of them were whinnying with fright. They \ncould hear the giants guffawing and shouting all over the mountainsides. \n\u201CThis won\u2019t do at all!\u201D said Thorin. \u201CIf we don\u2019t get blown off, or drowned, or struck by lightning, \nwe shall be picked up by some giant and kicked sky-high for a football.\u201D \nThe Mountain-path \n\u201CWell, if you know of anywhere better, take us there!\u201D said Gandalf, who was feeling very grumpy, \nand was far from happy about the giants himself. \nThe end of their argument was that they sent Fili and Kili to look for a better shelter. They had very \nsharp eyes, and being the youngest of the dwarves by some fifty years they usually got these sort of \njobs (when everybody could see that it was absolutely no use sending Bilbo). There is nothing like \nlooking, if you want to find something (or so Thorin said to the young dwarves). You certainly usually \nfind something, if you look, but it is not always quite the something you were after. So it proved on \nthis occasion. \nSoon Fili and Kili came crawling back, holding on to the rocks in the wind. \u201CWe have found a dry \ncave,\u201D they said, \u201Cnot far round the next corner; and ponies and all could get inside.\u201D \n\u201CHave you thoroughly explored it?\u201D said the wizard, who knew that caves up in the mountains were \nseldom unoccupied. \n\u201CYes, yes!\u201D they said, though everybody knew they could not have been long about it; they had \ncome back too quick. \u201CIt isn\u2019t all that big, and it does not go far back.\u201D \nThat, of course, is the dangerous part about caves: you don\u2019t know how far they go back, \nsometimes, or where a passage behind may lead to, or what is waiting for you inside. But now Fili and \nKili\u2019s news seemed good enough. So they all got up and prepared to move. The wind was howling and \nthe thunder still growling, and they had a business getting themselves and their ponies along. Still it \nwas not very far to go, and before long they came to a big rock standing out into the path. If you \nstepped behind, you found a low arch in the side of the mountain. There was just room to get the \nponies through with a squeeze, when they had been unpacked and unsaddled. As they passed under the \narch, it was good to hear the wind and the rain outside instead of all about them, and to feel safe from \nthe giants and their rocks. But the wizard was taking no risks. He lit up his wand \u2014 as he did that day in \nBilbo\u2019s dining-room that seemed so long ago, if you remember \u2014 , and by its light they explored the \ncave from end to end. \nIt seemed quite a fair size, but not too large and mysterious. It had a dry floor and some \ncomfortable nooks. At one end there was room for the ponies; and there they stood (mighty glad of the \nchange) steaming, and champing in their nosebags. Oin and Gloin wanted to light a fire at the door to \ndry their clothes, but Gandalf would not hear of it. So they spread out their wet things on the floor, and \ngot dry ones out of their bundles; then they made their blankets comfortable, got out their pipes and \nblew smoke rings, which Gandalf turned into different colours and set dancing up by the roof to amuse \nthem. They talked and talked, and forgot about the storm, and discussed what each would do with his \nshare of the treasure (when they got it, which at the moment did not seem so impossible); and so they \ndropped off to sleep one by one. And that was the last time that they used the ponies, packages, \nbaggages, tools and paraphernalia that they had brought with them. \nIt turned out a good thing that night that they had brought little Bilbo with them, after all. For, \nsomehow, he could not go to sleep for a long while; and when he did sleep, he had very nasty dreams. \nHe dreamed that a crack in the wall at the back of the cave got bigger and bigger, and opened wider \nand wider, and he was very afraid but could not call out or do anything but lie and look. Then he \ndreamed that the floor of the cave was giving way, and he was slipping \u2014 beginning to fall down, \ndown, goodness knows where to. \nAt that he woke up with a horrible start, and found that part of his dream was true. A crack had \nopened at the back of the cave, and was already a wide passage. He was just in time to see the last of \nthe ponies\u2019 tails disappearing into it. Of course he gave a very loud yell, as loud a yell as a hobbit can \ngive, which is surprising for their size. \nOut jumped the goblins, big goblins, great ugly-looking goblins, lots of goblins, before you could \nsay rocks and blocks. There were six to each dwarf, at least, and two even for Bilbo; and they were all \ngrabbed and carried through the crack, before you could say tinder and flint. But not Gandalf. Bilbo\u2019s \nyell had done that much good. It had wakened him up wide in a splintered second, and when goblins \ncame to grab him, there was a terrific flash like lightning in the cave, a smell like gunpowder, and \nseveral of them fell dead. \nThe crack closed with a snap, and Bilbo and the dwarves were on the wrong side of it! Where was \nGandalf? Of that neither they nor the goblins had any idea, and the goblins did not wait to find out. \nThey seized Bilbo and the dwarves and hurried them along. It was deep, deep, dark, such as only \ngoblins that have taken to living in the heart of the mountains can see through. The passages there \nwere crossed and tangled in all directions, but the goblins knew their way, as well as you do to the \nnearest post-office; and the way went down and down, and it was most horribly stuffy. The goblins \nwere very rough, and pinched unmercifully, and chuckled and laughed in their horrible stony voices; \nand Bilbo was more unhappy even than when the troll had picked him up by his toes. He wished again \nand again for his nice bright hobbit-hole. Not for the last time. \nNow there came a glimmer of a red light before them. The goblins began to sing, or croak, keeping \ntime with the flap of their flat feet on the stone, and shaking their prisoners as well. \nClap! Snap! the black crack! \nGrip, grab! Pinch, nab! \nAnd down down to Goblin-town \nYou go, my lad! \nClash, crash! Crush, smash! \nHammer and tongs! Knocker and gongs! Pound, pound, far underground! \nHo, ho! my lad! \nSwish, smack! Whip crack! \nBatter and beat! Yammer and bleat! Work, work! Nor dare to shirk, \nWhile Goblins quaff, and Goblins laugh, Round and round far underground \nBelow, my lad! \nIt sounded truly terrifying. The walls echoed to the clap, snap! and the crush, smash ! and to the \nugly laughter of their ho, ho! my lad! The general meaning of the song was only too plain; for now the \ngoblins took out whips and whipped them with a swish, smack!, and set them running as fast as they \ncould in front of them; and more than one of the dwarves were already yammering and bleating like \nanything, when they stumbled into a big cavern. \nIt was lit by a great red fire in the middle, and by torches along the walls, and it was full of goblins. \nThey all laughed and stamped and clapped their hands, when the dwarves (with poor little Bilbo at the \nback and nearest to the whips) came running in, while the goblin-drivers whooped and cracked their \nwhips behind. The ponies were already there huddled in a corner; and there were all the baggages and \npackages lying broken open, and being rummaged by goblins, and smelt by goblins, and fingered by \ngoblins, and quarrelled over by goblins. \nI am afraid that was the last they ever saw of those excellent little ponies, including a jolly sturdy \nlittle white fellow that Elrond had lent to Gandalf, since his horse was not suitable for the mountain- \npaths. For goblins eat horses and ponies and donkeys (and other much more dreadful things), and they \nare always hungry. Just now however the prisoners were thinking only of themselves. The goblins \nchained their hands behind their backs and linked them all together in a line, and dragged them to the \nfar end of the cavern with little Bilbo tugging at the end of the row. \nThere in the shadows on a large flat stone sat a tremendous goblin with a huge head, and armed \ngoblins were standing round him carrying the axes and the bent swords that they use. Now goblins are \ncruel, wicked, and bad-hearted. They make no beautiful things, but they make many clever ones. They \ncan tunnel and mine as well as any but the most skilled dwarves, when they take the trouble, though \nthey are usually untidy and dirty. Hammers, axes, swords, daggers, pickaxes, tongs, and also \ninstruments of torture, they make very well, or get other people to make to their design, prisoners and \nslaves that have to work till they die for want of air and light. It is not unlikely that they invented \nsome of the machines that have since troubled the world, especially the ingenious devices for killing \nlarge numbers of people at once, for wheels and engines and explosions always delighted them, and \nalso not working with their own hands more than they could help; but in those days and those wild \nparts they had not advanced (as it is called) so far. They did not hate dwarves especially, no more than \nthey hated everybody and everything, and particularly the orderly and prosperous; in some parts \nwicked dwarves had even made alliances with them. But they had a special grudge against Thorin\u2019 s \npeople, because of the war which you have heard mentioned, but which does not come into this tale; \nand anyway goblins don\u2019t care who they catch, as long as it is done smart and secret, and the prisoners \nare not able to defend themselves. \n\u201CWho are these miserable persons?\u201D said the Great Goblin. \n\u201CDwarves, and this!\u201D said one of the drivers, pulling at Bilbo\u2019s chain so that he fell forward onto \nhis knees. \u201CWe found them sheltering in our Front Porch.\u201D \n\u201CWhat do you mean by it?\u201D said the Great Goblin turning to Thorin. \u201CUp to no good, I\u2019ll warrant! \nSpying on the private business of my people, I guess! Thieves, I shouldn\u2019t be surprised to learn! \nMurderers and friends of Elves, not unlikely! Come! What have you got to say?\u201D \n\u201CThorin the dwarf at your service!\u201D he replied \u2014 it was merely a polite nothing. \u201COf the things \nwhich you suspect and imagine we had no idea at all. We sheltered from a storm in what seemed a \nconvenient cave and unused; nothing was further from our thoughts than inconveniencing goblins in \nany way whatever.\u201D That was true enough! \n\u201CUm!\u201D said the Great Goblin. \u201CSo you say! Might I ask what you were doing up in the mountains at \nall, and where you were coming from, and where you were going to? In fact I should like to know all \nabout you. Not that it will do you much good, Thorin Oakenshield, I know too much about your folk \nalready; but let\u2019s have the truth, or I will prepare something particularly uncomfortable for you!\u201D \n\u201CWe were on a journey to visit our relatives, our nephews and nieces, and first, second, and third \ncousins, and the other descendants of our grandfathers, who live on the East side of these truly \nhospitable mountains,\u201D said Thorin, not quite knowing what to say all at once in a moment, when \nobviously the exact truth would not do at all. \n\u201CHe is a liar, O truly tremendous one!\u201D said one of the drivers. \u201CSeveral of our people were struck \nby lightning in the cave, when we invited these creatures to come below; and they are as dead as \nstones. Also he has not explained this!\u201D He held out the sword which Thorin had worn, the sword \nwhich came from the Trolls\u2019 lair. \nThe Great Goblin gave a truly awful howl of rage when he looked at it, and all his soldiers gnashed \ntheir teeth, clashed their shields, and stamped. They knew the sword at once. It had killed hundreds of \ngoblins in its time, when the fair elves of Gondolin hunted them in the hills or did battle before their \nwalls. They had called it Orcrist, Goblin-cleaver, but the goblins called it simply Biter. They hated it \nand hated worse any one that carried it. \n\u201CMurderers and elf-friends!\u201D the Great Goblin shouted. \u201CSlash them! Beat them! Bite them! Gnash \nthem! Take them away to dark holes full of snakes, and never let them see the light again!\u201D He was in \nsuch a rage that he jumped off his seat and himself rushed at Thorin with his mouth open. \nJust at that moment all the lights in the cavern went out, and the great fire went off poof! into a \ntower of blue glowing smoke, right up to the roof, that scattered piercing white sparks all among the \ngoblins. \nThe yells and yammering, croaking, jibbering and jabbering; howls, growls and curses; shrieking \nand skriking, that followed were beyond description. Several hundred wild cats and wolves being \nroasted slowly alive together would not have compared with it. The sparks were burning holes in the \ngoblins, and the smoke that now fell from the roof made the air too thick for even their eyes to see \nthrough. Soon they were falling over one another and rolling in heaps on the floor, biting and kicking \nand fighting as if they had all gone mad. \nSuddenly a sword flashed in its own light. Bilbo saw it go right through the Great Goblin as he \nstood dumbfounded in the middle of his rage. He fell dead, and the goblin soldiers fled before the \nsword shrieking into the darkness. \nThe sword went back into its sheath. \u201CFollow me quick!\u201D said a voice fierce and quiet; and before \nBilbo understood what had happened he was trotting along again, as fast as he could trot, at the end of \nthe line, down more dark passages with the yells of the goblin-hall growing fainter behind him. A pale \nlight was leading them on. \n\u201CQuicker, quicker!\u201D said the voice. \u201CThe torches will soon be relit.\u201D \n\u201CHalf a minute!\u201D said Dori, who was at the back next to Bilbo, and a decent fellow. He made the \nhobbit scramble on his shoulders as best he could with his tied hands, and then off they all went at a \nrun, with a clink-clink of chains, and many a stumble, since they had no hands to steady themselves \nwith. Not for a long while did they stop, and by that time they must have been right down in the very \nmountain\u2019s heart. \nThen Gandalf lit up his wand. Of course it was Gandalf; but just then they were too busy to ask how \nhe got there. He took out his sword again, and again it flashed in the dark by itself. It burned with a \nrage that made it gleam if goblins were about; now it was bright as blue flame for delight in the killing \nof the great lord of the cave. It made no trouble whatever of cutting through the goblin-chains and \nsetting all the prisoners free as quickly as possible. This sword\u2019s name was Glamdring the Foe- \nhammer, if you remember. The goblins just called it Beater, and hated it worse than Biter if possible. \nOrcrist, too, had been saved; for \nGandalf had brought it along as well, snatching it from one of the terrified guards. Gandalf thought \nof most things; and though he could not do everything, he could do a great deal for friends in a tight \ncorner. \n\u201CAre we all here?\u201D said he, handing his sword back to Thorin with a bow. \u201CLet me see: one \u2014 that\u2019s \nThorin; two, three, four, five, six, seven, eight, nine, ten, eleven; where are Fili and Kili? Here they \nare! twelve, thirteen \u2014 and here\u2019s Mr. Baggins: fourteen! Well, well! it might be worse, and then again \nit might be a good deal better. No ponies, and no food, and no knowing quite where we are, and hordes \nof angry goblins just behind! On we go!\u201D \nOn they went. Gandalf was quite right: they began to hear goblin noises and horrible cries far \nbehind in the passages they had come through. That sent them on faster than ever, and as poor Bilbo \ncould not possibly go half as fast \u2014 for dwarves can roll along at a tremendous pace, I can tell you, \nwhen they have to \u2014 they took it in turn to carry him on their backs. \nStill goblins go faster than dwarves, and these goblins knew the way better (they had made the \npaths themselves), and were madly angry; so that do what they could the dwarves heard the cries and \nhowls getting closer and closer. Soon they could hear even the flap of the goblin feet, many many feet \nwhich seemed only just round the last corner. The blink of red torches could be seen behind them in \nthe tunnel they were following; and they were getting deadly tired. \n\u201CWhy, O why did I ever leave my hobbit-hole!\u201D said poor Mr. Baggins bumping up and down on \nBombur\u2019s back. \n\u201CWhy, O why did I ever bring a wretched little hobbit on a treasure hunt!\u201D said poor Bombur, who \nwas fat, and staggered along with the sweat dripping down his nose in his heat and terror. \nAt this point Gandalf fell behind, and Thorin with him. They turned a sharp corner. \u201CAbout turn!\u201D \nhe shouted. \u201CDraw your sword Thorin!\u201D \nThere was nothing else to be done; and the goblins did not like it. They came scurrying round the \ncorner in full cry, and found Goblin-cleaver, and Foe-hammer shining cold and bright right in their \nastonished eyes. The ones in front dropped their torches and gave one yell before they were killed. The \nones behind yelled still more, and leaped back knocking over those that were running after them. \n\u201CBiter and Beater!\u201D they shrieked; and soon they were all in confusion, and most of them were \nhustling back the way they had come. \nIt was quite a long while before any of them dared to turn that corner. By that time the dwarves had \ngone on again, a long, long, way on into the dark tunnels of the goblins\u2019 realm. When the goblins \ndiscovered that, they put out their torches and they slipped on soft shoes, and they chose out their very \nquickest runners with the sharpest ears and eyes. These ran forward, as swift as weasels in the dark, \nand with hardly any more noise than bats. \nThat is why neither Bilbo, nor the dwarves, nor even Gandalf heard them coming. Nor did they see \nthem. But they were seen by the goblins that ran silently up behind, for Gandalf was letting his wand \ngive out a faint light to help the dwarves as they went along. \nQuite suddenly Dori, now at the back again carrying Bilbo, was grabbed from behind in the dark. \nHe shouted and fell; and the hobbit rolled off his shoulders into the blackness, bumped his head on \nhard rock, and remembered nothing more. \nChapter V \nRIDDLES IN THE DARK \nWhen Bilbo opened his eyes, he wondered if he had; for it was just as dark as with them shut. No one \nwas anywhere near him. Just imagine his fright! He could hear nothing, see nothing, and he could feel \nnothing except the stone of the floor. \nVery slowly he got up and groped about on all fours, till he touched the wall of the tunnel; but \nneither up nor down it could he find anything: nothing at all, no sign of goblins, no sign of dwarves. \nHis head was swimming, and he was far from certain even of the direction they had been going in \nwhen he had his fall. He guessed as well as he could, and crawled along for a good way, till suddenly \nhis hand met what felt like a tiny ring of cold metal lying on the floor of the tunnel. It was a turning \npoint in his career, but he did not know it. He put the ring in his pocket almost without thinking; \ncertainly it did not seem of any particular use at the moment. He did not go much further, but sat down \non the cold floor and gave himself up to complete miserableness, for a long while. He thought of \nhimself frying bacon and eggs in his own kitchen at home \u2014 for he could feel inside that it was high \ntime for some meal or other; but that only made him miserabler. \nHe could not think what to do; nor could he think what had happened; or why he had been left \nbehind; or why, if he had been left behind, the goblins had not caught him; or even why his head was \nso sore. The truth was he had been lying quiet, out of sight and out of mind, in a very dark corner for a \nlong while. \nAfter some time he felt for his pipe. It was not broken, and that was something. Then he felt for his \npouch, and there was some tobacco in it, and that was something more. Then he felt for matches and \nhe could not find any at all, and that shattered his hopes completely. Just as well for him, as he agreed \nwhen he came to his senses. Goodness knows what the striking of matches and the smell of tobacco \nwould have brought on him out of dark holes in that horrible place. Still at the moment he felt very \ncrushed. But in slapping all his pockets and feeling all round himself for matches his hand came on \nthe hilt of his little sword \u2014 the little dagger that he got from the trolls, and that he had quite forgotten; \nnor fortunately had the goblins noticed it, as he wore it inside his breeches. \nNow he drew it out. It shone pale and dim before his eyes. \u201CSo it is an elvish blade, too,\u201D he \nthought; \u201Cand goblins are not very near, and yet not far enough.\u201D \nBut somehow he was comforted. It was rather splendid to be wearing a blade made in Gondolin for \nthe goblin-wars of which so many songs had sung; and also he had noticed that such weapons made a \ngreat impression on goblins that came upon them suddenly. \n\u201CGo back?\u201D he thought. \u201CNo good at all! Go sideways? Impossible! Go forward? Only thing to do! \nOn we go!\u201D So up he got, and trotted along with his little sword held in front of him and one hand \nfeeling the wall, and his heart all of a patter and a pitter. \nNow certainly Bilbo was in what is called a tight place. But you must remember it was not quite so \ntight for him as it would have been for me or for you. Hobbits are not quite like ordinary people; and \nafter all if their holes are nice cheery places and properly aired, quite different from the tunnels of the \ngoblins, still they are more used to tunnelling than we are, and they do not easily lose their sense of \ndirection underground \u2014 not when their heads have recovered from being bumped. Also they can move \nvery quietly, and hide easily, and recover wonderfully from falls and bruises, and they have a fund of \nwisdom and wise sayings that men have mostly never heard or have forgotten long ago. \nI should not have liked to have been in Mr. Baggins\u2019 place, all the same. The tunnel seemed to have \nno end. All he knew was that it was still going down pretty steadily and keeping in the same direction \nin spite of a twist and a turn or two. There were passages leading off to the side every now and then, as \nhe knew by the glimmer of his sword, or could feel with his hand on the wall. Of these he took no \nnotice, except to hurry past for fear of goblins or half-imagined dark things coming out of them. On \nand on he went, and down and down; and still he heard no sound of anything except the occasional \nwhirr of a bat by his ears, which startled him at first, till it became too frequent to bother about. I do \nnot know how long he kept on like this, hating to go on, not daring to stop, on, on, until he was tireder \nthan tired. It seemed like all the way to tomorrow and over it to the days beyond. \nSuddenly without any warning he trotted splash into water! Ugh! it was icy cold. That pulled him \nup sharp and short. He did not know whether it was just a pool in the path, or the edge of an \nunderground stream that crossed the passage, or the brink of a deep dark subterranean lake. The sword \nwas hardly shining at all. He stopped, and he could hear, when he listened hard, drops drip-drip- \ndripping from an unseen roof into the water below; but there seemed no other sort of sound. \n\u201CSo it is a pool or a lake, and not an underground river,\u201D he thought. Still he did not dare to wade \nout into the darkness. He could not swim; and he thought, too, of nasty slimy things, with big bulging \nblind eyes, wriggling in the water. There are strange things living in the pools and lakes in the hearts \nof mountains: fish whose fathers swam in, goodness only knows how many years ago, and never swam \nout again, while their eyes grew bigger and bigger and bigger from trying to see in the blackness; also \nthere are other things more slimy than fish. Even in the tunnels and caves the goblins have made for \nthemselves there are other things living unbeknown to them that have sneaked in from outside to lie \nup in the dark. Some of these caves, too, go back in their beginnings to ages before the goblins, who \nonly widened them and joined them up with passages, and the original owners are still there in odd \ncorners, slinking and nosing about. \nDeep down here by the dark water lived old Gollum, a small slimy creature. I don\u2019t know where he \ncame from, nor who or what he was. He was Gollum \u2014 as dark as darkness, except for two big round \npale eyes in his thin face. He had a little boat, and he rowed about quite quietly on the lake; for lake it \nwas, wide and deep and deadly cold. He paddled it with large feet dangling over the side, but never a \nripple did he make. Not he. He was looking out of his pale lamp-like eyes for blind fish, which he \ngrabbed with his long fingers as quick as thinking. He liked meat too. Goblin he thought good, when \nhe could get it; but he took care they never found him out. He just throttled them from behind, if they \never came down alone anywhere near the edge of the water, while he was prowling about. They very \nseldom did, for they had a feeling that something unpleasant was lurking down there, down at the very \nroots of the mountain. They had come on the lake, when they were tunnelling down long ago, and they \nfound they could go no further; so there their road ended in that direction, and there was no reason to \ngo that way \u2014 unless the Great Goblin sent them. Sometimes he took a fancy for fish from the lake, \nand sometimes neither goblin nor fish came back. \nActually Gollum lived on a slimy island of rock in the middle of the lake. He was watching Bilbo \nnow from the distance with his pale eyes like telescopes. Bilbo could not see him, but he was \nwondering a lot about Bilbo, for he could see that he was no goblin at all. \nGollum got into his boat and shot off from the island, while Bilbo was sitting on the brink \naltogether flummoxed and at the end of his way and his wits. Suddenly up came Gollum and \nwhispered and hissed: \n\u201CBless us and splash us, my precioussss! I guess it\u2019s a choice feast; at least a tasty morsel it\u2019d \nmake us, gollum!\u201D And when he said gollum he made a horrible swallowing noise in his throat. That is \nhow he got his name, though he always called himself \u2018my precious\u2019. \nThe hobbit jumped nearly out of his skin when the hiss came in his ears, and he suddenly saw the \npale eyes sticking out at him. \n\u201CWho are you?\u201D he said, thrusting his dagger in front of him. \n\u201CWhat iss he, my preciouss?\u201D whispered Gollum (who always spoke to himself through never \nhaving anyone else to speak to). This is what he had come to find out, for he was not really very \nhungry at the moment, only curious; otherwise he would have grabbed first and whispered afterwards. \n\u201CI am Mr. Bilbo Baggins. I have lost the dwarves and I have lost the wizard, and I don\u2019t know \nwhere I am; and I don\u2019t want to know, if only I can get away.\u201D \n\u201CWhat\u2019s he got in his handses?\u201D said Gollum, looking at the sword, which he did not quite like. \n\u201CA sword, a blade which came out of Gondolin!\u201D \u201CSssss\u201D said Gollum, and became quite polite. \n\u201CPraps ye sits here and chats with it a bitsy, my preciousss. It likes riddles, praps it does, does it?\u201D He \nwas anxious to appear friendly, at any rate for the moment, and until he found out more about the \nsword and the hobbit, whether he was quite alone really, whether he was good to eat, and whether \nGollum was really hungry. Riddles were all he could think of. Asking them, and sometimes guessing \nthem, had been the only game he had ever played with other funny creatures sitting in their holes in \nthe long, long ago, before he lost all his friends and was driven away, alone, and crept down, down, \ninto the dark under the mountains. \n\u201CVery well,\u201D said Bilbo, who was anxious to agree, until he found out more about the creature, \nwhether he was quite alone, whether he was fierce or hungry, and whether he was a friend of the \ngoblins. \n\u201CYou ask first,\u201D he said, because he had not had time to think of a riddle. \nSo Gollum hissed: \nWhat has roots as nobody sees, \nIs taller than trees, \nUp, up it goes, \nAnd yet never grows ? \n\u201CEasy!\u201D said Bilbo. \u201CMountain, I suppose.\u201D \n\u201CDoes it guess easy? It must have a competition with us, my preciouss! If precious asks, and it \ndoesn\u2019t answer, we eats it, my preciousss. If it asks us, and we doesn\u2019t answer, then we does what it \nwants, eh? We shows it the way out, yes!\u201D \n\u201CAll right!\u201D said Bilbo, not daring to disagree, and nearly bursting his brain to think of riddles that \ncould save him from being eaten. \nThirty white horses on a red hill, \nFirst they champ, \nThen they stamp, \nThen they stand still. \nThat was all he could think of to ask \u2014 the idea of eating was rather on his mind. It was rather an \nold one, too, and Gollum knew the answer as well as you do. \n\u201CChestnuts, chestnuts,\u201D he hissed. \u201CTeeth! teeth! my preciousss; but we has only six!\u201D Then he \nasked his second: \nVoiceless it cries, \nWingless flutters, \nToothless bites, \nMouthless mutters. \n\u201CHalf a moment!\u201D cried Bilbo, who was still thinking uncomfortably about eating. Fortunately he \nhad once heard something rather like this before, and getting his wits back he thought of the answer. \n\u201CWind, wind of course,\u201D he said, and he was so pleased that he made up one on the spot. \u201CThis\u2019ll \npuzzle the nasty little underground creature,\u201D he thought: \nAn eye in a blue face \nSaw an eye in a green face. \n\u201CThat eye is like to this eye \u201D \nSaid the first eye, \n\u201CBut in low place \nNot in high place. \u201D \n\u201CSs, ss, ss,\u201D said Gollum. He had been underground a long long time, and was forgetting this sort of \nthing. But just as Bilbo was beginning to hope that the wretch would not be able to answer, Gollum \nbrought up memories of ages and ages and ages before, when he lived with his grandmother in a hole \nin a bank by a river, \u201CSss, sss, my preciouss,\u201D he said. \u201CSun on the daisies it means, it does.\u201D \nBut these ordinary above ground everyday sort of riddles were tiring for him. Also they reminded \nhim of days when he had been less lonely and sneaky and nasty, and that put him out of temper. What \nis more they made him hungry; so this time he tried something a bit more difficult and more \nunpleasant: \nIt cannot be seen, cannot be felt, \nCannot be heard, cannot be smelt. \nIt lies behind stars and under hills, \nAnd empty holes it fills. \nIt comes first and follows after, \nEnds life, kills laughter. \nUnfortunately for Gollum Bilbo had heard that sort of thing before; and the answer was all round \nhim any way. \u201CDark!\u201D he said without even scratching his head or putting on his thinking cap. \nA box without hinges, key, or lid, \nYet golden treasure inside is hid, \nhe asked to gain time, until he could think of a really hard one. This he thought a dreadfully easy \nchestnut, though he had not asked it in the usual words. But it proved a nasty poser for Gollum. He \nhissed to himself, and still he did not answer; he whispered and spluttered. \nAfter some while Bilbo became impatient. \u201CWell, what is it?\u201D he said. \u201CThe answer\u2019s not a kettle \nboiling over, as you seem to think from the noise you are making.\u201D \n\u201CGive us a chance; let it give us a chance, my preciouss \u2014 ss \u2014 ss.\u201D \n\u201CWell,\u201D said Bilbo after giving him a long chance, \u201Cwhat about your guess?\u201D \nBut suddenly Gollum remembered thieving from nests long ago, and sitting under the river bank \nteaching his grandmother, teaching his grandmother to suck \u2014 \u201CEggses!\u201D he hissed. \u201CEggses it is!\u201D \nThen he asked: \nAlive without breath, \nAs cold as death; \nNever thirsty, ever drinking, \nAll in mail never clinking. \nHe also in his turn thought this was a dreadfully easy one, because he was always thinking of the \nanswer. But he could not remember anything better at the moment, he was so flustered by the egg- \nquestion. All the same it was a poser for poor Bilbo, who never had anything to do with the water if he \ncould help it. I imagine you know the answer, of course, or can guess it as easy as winking, since you \nare sitting comfortably at home and have not the danger of being eaten to disturb your thinking. Bilbo \nsat and cleared his throat once or twice, but no answer came. \nAfter a while Gollum began to hiss with pleasure to himself: \u201CIs it nice, my preciousss? Is it juicy? \nIs it scrumptiously crunchable?\u201D He began to peer at Bilbo out of the darkness. \n\u201CHalf a moment,\u201D said the hobbit shivering. \u201CI gave you a good long chance just now.\u201D \n\u201CIt must make haste, haste!\u201D said Gollum, beginning to climb out of his boat on to the shore to get \nat Bilbo. But when he put his long webby foot in the water, a fish jumped out in a fright and fell on \nBilbo\u2019s toes. \n\u201CUgh!\u201D he said, \u201Cit is cold and clammy!\u201D \u2014 and so he guessed. \u201CFish! fish!\u201D he cried. \u201CIt is fish!\u201D \nGollum was dreadfully disappointed; but Bilbo asked another riddle as quick as ever he could, so \nthat Gollum had to get back into his boat and think. \nNo-legs lay on one-leg, two-legs sat near on three-legs, four-legs got some. \nIt was not really the right time for this riddle, but Bilbo was in a hurry. Gollum might have had \nsome trouble guessing it, if he had asked it at another time. As it was, talking of fish, \u201Cno-legs\u201D was \nnot so very difficult, and after that the rest was easy. \u201CFish on a little table, man at table sitting on a \nstool, the cat has the bones\u201D that of course is the answer, and Gollum soon gave it. Then he thought the \ntime had come to ask something hard and horrible. This is what he said: \nThis thing all things devours : \nBirds, beasts, trees, flowers; \nGnaws iron, bites steel; \nGrinds hard stones to meal; \nSlays king, ruins town, \nAnd beats high mountain down. \nPoor Bilbo sat in the dark thinking of all the horrible names of all the giants and ogres he had ever \nheard told of in tales, but not one of them had done all these things. He had a feeling that the answer \nwas quite different and that he ought to know it, but he could not think of it. He began to get \nfrightened, and that is bad for thinking. Gollum began to get out of his boat. He flapped into the water \nand paddled to the bank; Bilbo could see his eyes coming towards him. His tongue seemed to stick in \nhis mouth; he wanted to shout out: \u201CGive me more time! Give me time!\u201D But all that came out with a \nsudden squeal was: \n\u201CTime! Time!\u201D \nBilbo was saved by pure luck. For that of course was the answer. \nGollum was disappointed once more; and now he was getting angry, and also tired of the game. It \nhad made him very hungry indeed. This time he did not go back to the boat. He sat down in the dark \nby Bilbo. That made the hobbit most dreadfully uncomfortable and scattered his wits. \n\u201CIt\u2019s got to ask uss a quesstion, my preciouss, yes, yess, yesss. Jusst one more question to guess, \nyes, yess,\u201D said Gollum. \nBut Bilbo simply could not think of any question with that nasty wet cold thing sitting next to him, \nand pawing and poking him. He scratched himself, he pinched himself; still he could not think of \nanything. \n\u201CAsk us! ask us!\u201D said Gollum. \nBilbo pinched himself and slapped himself; he gripped on his little sword; he even felt in his \npocket with his other hand. There he found the ring he had picked up in the passage and forgotten \nabout. \n\u201CWhat have I got in my pocket?\u201D he said aloud. He was talking to himself, but Gollum thought it \nwas a riddle, and he was frightfully upset. \n\u201CNot fair! not fair!\u201D he hissed. \u201CIt isn\u2019t fair, my precious, is it, to ask us what it\u2019s got in its nassty \nlittle pocketses?\u201D \nBilbo seeing what had happened and having nothing better to ask stuck to his question, \u201CWhat have \nI got in my pocket?\u201D he said louder. \n\u201CS-s-s-s-s,\u201D hissed Gollum. \u201CIt must give us three guesseses, my preciouss, three guesseses.\u201D \n\u201CVery well! Guess away!\u201D said Bilbo. \n\u201CHandses!\u201D said Gollum. \n\u201CWrong,\u201D said Bilbo, who had luckily just taken his hand out again. \u201CGuess again!\u201D \n\u201CS-s-s-s-s,\u201D said Gollum more upset than ever. He thought of all the things he kept in his own \npockets: fish-bones, goblins\u2019 teeth, wet shells, a bit of bat-wing, a sharp stone to sharpen his fangs on, \nand other nasty things. He tried to think what other people kept in their pockets. \n\u201CKnife!\u201D he said at last. \n\u201CWrong!\u201D said Bilbo, who had lost his some time ago. \u201CLast guess!\u201D \nNow Gollum was in a much worse state than when Bilbo had asked him the egg-question. He \nhissed and spluttered and rocked himself backwards and forwards, and slapped his feet on the floor, \nand wriggled and squirmed; but still he did not dare to waste his last guess. \n\u201CCome on!\u201D said Bilbo. \u201CI am waiting!\u201D He tried to sound bold and cheerful, but he did not feel at \nall sure how the game was going to end, whether Gollum guessed right or not. \n\u201CTime\u2019s up!\u201D he said. \n\u201CString, or nothing!\u201D shrieked Gollum, which was not quite fair \u2014 working in two guesses at once. \n\u201CBoth wrong,\u201D cried Bilbo very much relieved; and he jumped at once to his feet, put his back to \nthe nearest wall, and held out his little sword. He knew, of course, that the riddle-game was sacred and \nof immense antiquity, and even wicked creatures were afraid to cheat when they played at it. But he \nfelt he could not trust this slimy thing to keep any promise at a pinch. Any excuse would do for him to \nslide out of it. And after all that last question had not been a genuine riddle according to the ancient \nlaws. \nBut at any rate Gollum did not at once attack him. He could see the sword in Bilbo\u2019s hand. He sat \nstill, shivering and whispering. At last Bilbo could wait no longer. \n\u201CWell?\u201D he said. \u201CWhat about your promise? I want to go. You must show me the way.\u201D \n\u201CDid we say so, precious? Show the nassty little Baggins the way out, yes, yes. But what has it got \nin its pocketses, eh? Not string, precious, but not nothing. Oh no! gollum!\u201D \n\u201CNever you mind,\u201D said Bilbo. \u201CA promise is a promise.\u201D \n\u201CCross it is, impatient, precious,\u201D hissed Gollum. \u201CBut it must wait, yes it must. We can\u2019t go up the \ntunnels so hasty. We must go and get some things first, yes, things to help us.\u201D \n\u201CWell, hurry up!\u201D said Bilbo, relieved to think of Gollum going away. He thought he was just \nmaking an excuse and did not mean to come back. What was Gollum talking about? What useful thing \ncould he keep out on the dark lake? But he was wrong. Gollum did mean to come back. He was angry \nnow and hungry. And he was a miserable wicked creature, and already he had a plan. \nNot far away was his island, of which Bilbo knew nothing, and there in his hiding-place he kept a \nfew wretched oddments, and one very beautiful thing, very beautiful, very wonderful. He had a ring, a \ngolden ring, a precious ring. \n\u201CMy birthday-present!\u201D he whispered to himself, as he had often done in the endless dark days. \n\u201CThat\u2019s what we wants now, yes; we wants it!\u201D \nHe wanted it because it was a ring of power, and if you slipped that ring on your finger, you were \ninvisible; only in the full sunlight could you be seen, and then only by your shadow, and that would be \nshaky and faint. \n\u201CMy birthday-present! It came to me on my birthday, my precious.\u201D So he had always said to \nhimself. But who knows how Gollum came by that present, ages ago in the old days when such rings \nwere still at large in the world? Perhaps even the Master who ruled them could not have said. Gollum \nused to wear it at first, till it tired him; and then he kept it in a pouch next his skin, till it galled him; \nand now usually he hid it in a hole in the rock on his island, and was always going back to look at it. \nAnd still sometimes he put it on, when he could not bear to be parted from it any longer, or when he \nwas very, very, hungry, and tired of fish. Then he would creep along dark passages looking for stray \ngoblins. He might even venture into places where the torches were lit and made his eyes blink and \nsmart; for he would be safe. Oh yes, quite safe. No one would see him, no one would notice him, till \nhe had his fingers on their throat. Only a few hours ago he had worn it, and caught a small goblin-imp. \nHow it squeaked! He still had a bone or two left to gnaw, but he wanted something softer. \n\u201CQuite safe, yes,\u201D he whispered to himself. \u201CIt won\u2019t see us, will it, my precious? No. It won\u2019t see \nus, and its nassty little sword will be useless, yes quite.\u201D \nThat is what was in his wicked little mind, as he slipped suddenly from Bilbo\u2019s side, and flapped \nback to his boat, and went off into the dark. Bilbo thought he had heard the last of him. Still he waited \na while; for he had no idea how to find his way out alone. \nSuddenly he heard a screech. It sent a shiver down his back. Gollum was cursing and wailing away \nin the gloom, not very far off by the sound of it. He was on his island, scrabbling here and there, \nsearching and seeking in vain. \n\u201CWhere iss it? Where iss it?\u201D Bilbo heard him crying. \u201CLosst it is, my precious, lost, lost! Curse us \nand crush us, my precious is lost!\u201D \n\u201CWhat\u2019s the matter?\u201D Bilbo called. \u201CWhat have you lost?\u201D \n\u201CIt mustn\u2019t ask us,\u201D shrieked Gollum. \u201CNot its business, no, gollum! It\u2019s losst, gollum, gollum, \ngollum.\u201D \n\u201CWell, so am I,\u201D cried Bilbo, \u201Cand I want to get unlost. And I won the game, and you promised. So \ncome along! Come and let me out, and then go on with your looking!\u201D Utterly miserable as Gollum \nsounded, Bilbo could not find much pity in his heart, and he had a feeling that anything Gollum \nwanted so much could hardly be something good. \u201CCome along!\u201D he shouted. \n\u201CNo, not yet, precious!\u201D Gollum answered. \u201CWe must search for it, it\u2019s lost, gollum.\u201D \n\u201CBut you never guessed my last question, and you promised,\u201D said Bilbo. \n\u201CNever guessed!\u201D said Gollum. Then suddenly out of the gloom came a sharp hiss. \u201CWhat has it got \nin its pocketses? Tell us that. It must tell first.\u201D \nAs far as Bilbo knew, there was no particular reason why he should not tell. Gollum\u2019 s mind had \njumped to a guess quicker than his; naturally, for Gollum had brooded for ages on this one thing, and \nhe was always afraid of its being stolen. But Bilbo was annoyed at the delay. After all, he had won the \ngame, pretty fairly, at a horrible risk. \u201CAnswers were to be guessed not given,\u201D he said. \n\u201CBut it wasn\u2019t a fair question,\u201D said Gollum. \u201CNot a riddle, precious, no.\u201D \n\u201COh well, if it\u2019s a matter of ordinary questions,\u201D Bilbo replied, \u201Cthen I asked one first. What have \nyou lost? Tell me that!\u201D \n\u201CWhat has it got in its pocketses?\u201D The sound came hissing louder and sharper, and as he looked \ntowards it, to his alarm Bilbo now saw two small points of light peering at him. As suspicion grew in \nGollum\u2019 s mind, the light of his eyes burned with a pale flame. \n\u201CWhat have you lost?\u201D Bilbo persisted. \nBut now the light in Gollum\u2019 s eyes had become a green fire, and it was coming swiftly nearer. \nGollum was in his boat again, paddling wildly back to the dark shore; and such a rage of loss and \nsuspicion was in his heart that no sword had any more terror for him. \nBilbo could not guess what had maddened the wretched creature, but he saw that all was up, and \nthat Gollum meant to murder him at any rate. Just in time he turned and ran blindly back up the dark \npassage down which he had come, keeping close to the wall and feeling it with his left hand. \n\u201CWhat has it got in its pocketses?\u201D he heard the hiss loud behind him, and the splash as Gollum \nleapt from his boat. \u201CWhat have I, I wonder?\u201D he said to himself, as he panted and stumbled along. He \nput his left hand in his pocket. The ring felt very cold as it quietly slipped on to his groping forefinger. \nThe hiss was close behind him. He turned now and saw Gollum\u2019 s eyes like small green lamps \ncoming up the slope. Terrified he tried to run faster, but suddenly he struck his toes on a snag in the \nfloor, and fell flat with his little sword under him. \nIn a moment Gollum was on him. But before Bilbo could do anything, recover his breath, pick \nhimself up, or wave his sword, Gollum passed by, taking no notice of him, cursing and whispering as \nhe ran. \nWhat could it mean? Gollum could see in the dark. Bilbo could see the light of his eyes palely \nshining even from behind. Painfully he got up, and sheathed his sword, which was now glowing faintly \nagain, then very cautiously he followed. There seemed nothing else to do. It was no good crawling \nback down to Gollum\u2019 s water. Perhaps if he followed him, Gollum might lead him to some way of \nescape without meaning to. \n\u201CCurse it! curse it! curse it!\u201D hissed Gollum. \u201CCurse the Baggins! It\u2019s gone! What has it got in its \npocketses? Oh we guess, we guess, my precious. He\u2019s found it, yes he must have. My birthday- \npresent.\u201D \nBilbo pricked up his ears. He was at last beginning to guess himself. He hurried a little, getting as \nclose as he dared behind Gollum, who was still going quickly, not looking back, but turning his head \nfrom side to side, as Bilbo could see from the faint glimmer on the walls. \n\u201CMy birthday-present! Curse it! How did we lose it, my precious? Yes, that\u2019s it. When we came \nthis way last, when we twisted that nassty young squeaker. That\u2019s it. Curse it! It slipped from us, after \nall these ages and ages! It\u2019s gone, gollum.\u201D \nSuddenly Gollum sat down and began to weep, a whistling and gurgling sound horrible to listen to. \nBilbo halted and flattened himself against the tunnel-wall. After a while Gollum stopped weeping and \nbegan to talk. He seemed to be having an argument with himself. \n\u201CIt\u2019s no good going back there to search, no. We doesn\u2019t remember all the places we\u2019ve visited. \nAnd it\u2019s no use. The Baggins has got it in its pocketses; the nassty noser has found it, we says.\u201D \n\u201CWe guesses, precious, only guesses. We can\u2019t know till we find the nassty creature and squeezes \nit. But it doesn\u2019t know what the present can do, does it? It\u2019ll just keep it in its pocketses. It doesn\u2019t \nknow, and it can\u2019t go far. It\u2019s lost itself, the nassty nosey thing. It doesn\u2019t know the way out. It said \nso.\u201D \n\u201CIt said so, yes; but it\u2019s tricksy. It doesn\u2019t say what it means. It won\u2019t say what it\u2019s got in its \npocketses. It knows. It knows a way in, it must know a way out, yes. It\u2019s off to the back-door. To the \nback-door, that\u2019s it.\u201D \n\u201CThe goblinses will catch it then. It can\u2019t get out that way, precious.\u201D \n\u201CSsss, sss, gollum! Goblinses! Yes, but if it\u2019s got the present, our precious present, then goblinses \nwill get it, gollum! They\u2019ll find it, they\u2019ll find out what it does. We shan\u2019t ever be safe again, never, \ngollum! One of the goblinses will put it on, and then no one will see him. He\u2019ll be there but not seen. \nNot even our clever eyeses will notice him; and he\u2019ll come creepsy and tricksy and catch us, gollum, \ngollum!\u201D \n\u201CThen let\u2019s stop talking, precious, and make haste. If the Baggins has gone that way, we must go \nquick and see. Go! Not far now. Make haste!\u201D \nWith a spring Gollum got up and started shambling off at a great pace. Bilbo hurried after him, still \ncautiously, though his chief fear now was of tripping on another snag and falling with a noise. His \nhead was in a whirl of hope and wonder. It seemed that the ring he had was a magic ring: it made you \ninvisible! He had heard of such things, of course, in old old tales; but it was hard to believe that he \nreally had found one, by accident. Still there it was: Gollum with his bright eyes had passed him by, \nonly a yard to one side. \nOn they went, Gollum flip-flapping ahead, hissing and cursing; Bilbo behind going as softly as a \nhobbit can. Soon they came to places where, as Bilbo had noticed on the way down, side-passages \nopened, this way and that. Gollum began at once to count them. \n\u201COne left, yes. One right, yes. Two right, yes, yes. Two left, yes, yes.\u201D And so on and on. \nAs the count grew he slowed down, and he began to get shaky and weepy; for he was leaving the \nwater further and further behind, and he was getting afraid. Goblins might be about, and he had lost \nhis ring. At last he stopped by a low opening, on their left as they went up. \n\u201CSeven right, yes. Six left, yes!\u201D he whispered. \u201CThis is it. This is the way to the back-door, yes. \nHere\u2019s the passage!\u201D \nHe peered in, and shrank back. \u201CBut we dursn\u2019t go in, precious, no we dursn\u2019t. Goblinses down \nthere. Lots of goblinses. We smells them. Ssss!\u201D \n\u201CWhat shall we do? Curse them and crush them! We must wait here, precious, wait a bit and see.\u201D \nSo they came to a dead stop. Gollum had brought Bilbo to the way out after all, but Bilbo could not \nget in! There was Gollum sitting humped up right in the opening, and his eyes gleamed cold in his \nhead, as he swayed it from side to side between his knees. \nBilbo crept away from the wall more quietly than a mouse; but Gollum stiffened at once, and \nsniffed, and his eyes went green. He hissed softly but menacingly. He could not see the hobbit, but \nnow he was on the alert, and he had other senses that the darkness had sharpened: hearing and smell. \nHe seemed to be crouched right down with his flat hands splayed on the floor, and his head thrust out, \nnose almost to the stone. Though he was only a black shadow in the gleam of his own eyes, Bilbo \ncould see or feel that he was tense as a bowstring, gathered for a spring. \nBilbo almost stopped breathing, and went stiff himself. He was desperate. He must get away, out of \nthis horrible darkness, while he had any strength left. He must fight. He must stab the foul thing, put \nits eyes out, kill it. It meant to kill him. No, not a fair fight. He was invisible now. Gollum had no \nsword. Gollum had not actually threatened to kill him, or tried to yet. And he was miserable, alone, \nlost. A sudden understanding, a pity mixed with horror, welled up in Bilbo\u2019s heart: a glimpse of \nendless unmarked days without light or hope of betterment, hard stone, cold fish, sneaking and \nwhispering. All these thoughts passed in a flash of a second. He trembled. And then quite suddenly in \nanother flash, as if lifted by a new strength and resolve, he leaped. \nNo great leap for a man, but a leap in the dark. Straight over Gollum\u2019 s head he jumped, seven feet \nforward and three in the air; indeed, had he known it, he only just missed cracking his skull on the low \narch of the passage. \nGollum threw himself backwards, and grabbed as the hobbit flew over him, but too late: his hands \nsnapped on thin air, and Bilbo, falling fair on his sturdy feet, sped off down the new tunnel. He did not \nturn to see what Gollum was doing. There was a hissing and cursing almost at his heels at first, then it \nstopped. All at once there came a blood-curdling shriek, filled with hatred and despair. Gollum was \ndefeated. He dared go no further. He had lost: lost his prey, and lost, too, the only thing he had ever \ncared for, his precious. The cry brought Bilbo\u2019s heart to his mouth, but still he held on. Now faint as \nan echo, but menacing, the voice came behind: \n\u201CThief, thief, thief! Baggins! We hates it, we hates it, we hates it for ever!\u201D \nThen there was a silence. But that too seemed menacing to Bilbo. \u201CIf goblins are so near that he \nsmelt them,\u201D he thought, \u201Cthen they\u2019ll have heard his shrieking and cursing. Careful now, or this way \nwill lead you to worse things.\u201D \nThe passage was low and roughly made. It was not too difficult for the hobbit, except when, in \nspite of all care, he stubbed his poor toes again, several times, on nasty jagged stones in the floor. \u201CA \nbit low for goblins, at least for the big ones,\u201D thought Bilbo, not knowing that even the big ones, the \nores of the mountains, go along at a great speed stooping low with their hands almost on the ground. \nSoon the passage that had been sloping down began to go up again, and after a while it climbed \nsteeply. That slowed Bilbo down. But at last the slope stopped, the passage turned a corner and dipped \ndown again, and there, at the bottom of a short incline, he saw, filtering round another corner \u2014 a \nglimpse of light. Not red light, as of fire or lantern, but a pale out-of-doors sort of light. Then Bilbo \nbegan to run. \nScuttling as fast as his legs would carry him he turned the last corner and came suddenly right into \nan open space, where the light, after all that time in the dark, seemed dazzlingly bright. Really it was \nonly a leak of sunshine in through a doorway, where a great door, a stone door, was left standing open. \nBilbo blinked, and then suddenly he saw the goblins: goblins in full armour with drawn swords \nsitting just inside the door, and watching it with wide eyes, and watching the passage that led to it. \nThey were aroused, alert, ready for anything. \nThey saw him sooner than he saw them. Yes, they saw him. Whether it was an accident, or a last \ntrick of the ring before it took a new master, it was not on his finger. With yells of delight the goblins \nrushed upon him. \nA pang of fear and loss, like an echo of GollunTs misery, smote Bilbo, and forgetting even to draw \nhis sword he struck his hands into his pockets. And there was the ring still, in his left pocket, and it \nslipped on his finger. The goblins stopped short. They could not see a sign of him. He had vanished. \nThey yelled twice as loud as before, but not so delightedly. \n\u201CWhere is it?\u201D they cried. \n\u201CGo back up the passage!\u201D some shouted. \n\u201CThis way!\u201D some yelled. \u201CThat way!\u201D others yelled. \u201CLook out for the door,\u201D bellowed the captain. \nWhistles blew, armour clashed, swords rattled, goblins cursed and swore and ran hither and thither, \nfalling over one another and getting very angry. There was a terrible outcry, to-do, and disturbance. \nBilbo was dreadfully frightened, but he had the sense to understand what had happened and to \nsneak behind a big barrel which held drink for the goblin-guards, and so get out of the way and avoid \nbeing bumped into, trampled to death, or caught by feel. \n\u201CI must get to the door, I must get to the door!\u201D he kept on saying to himself, but it was a long time \nbefore he ventured to try. Then it was like a horrible game of blind-man\u2019s-buff. The place was full of \ngoblins running about, and the poor little hobbit dodged this way and that, was knocked over by a \ngoblin who could not make out what he had bumped into, scrambled away on all fours, slipped \nbetween the legs of the captain just in time, got up, and ran for the door. \nIt was still ajar, but a goblin had pushed it nearly to. Bilbo struggled but he could not move it. He \ntried to squeeze through the crack. He squeezed and squeezed, and he stuck! It was awful. His buttons \nhad got wedged on the edge of the door and the door-post. He could see outside into the open air: there \nwere a few steps running down into a narrow valley between tall mountains; the sun came out from \nbehind a cloud and shone bright on the outside of the door \u2014 but he could not get through. \nSuddenly one of the goblins inside shouted: \u201CThere is a shadow by the door. Something is outside!\u201D \nBilbo\u2019s heart jumped into his mouth. He gave a terrific squirm. Buttons burst off in all directions. \nHe was through, with a torn coat and waistcoat, leaping down the steps like a goat, while bewildered \ngoblins were still picking up his nice brass buttons on the doorstep. \nOf course they soon came down after him, hooting and hallooing, and hunting among the trees. But \nthey don\u2019t like the sun: it makes their legs wobble and their heads giddy. They could not find Bilbo \nwith the ring on, slipping in and out of the shadow of the trees, running quick and quiet, and keeping \nout of the sun; so soon they went back grumbling and cursing to guard the door. Bilbo had escaped. \nChapter VI \nOUT OF THE FRYING-PAN INTO THE FIRE \nBilbo had escaped the goblins, but he did not know where he was. He had lost hood, cloak, food, pony, \nhis buttons and his friends. He wandered on and on, till the sun began to sink westwards \u2014 behind the \nmountains. Their shadows fell across Bilbo\u2019s path, and he looked back. Then he looked forward and \ncould see before him only ridges and slopes falling towards lowlands and plains glimpsed \noccasionally between the trees. \n\u201CGood heavens!\u201D he exclaimed. \u201CI seem to have got right to the other side of the Misty Mountains, \nright to the edge of the Land Beyond! Where and O where can Gandalf and the dwarves have got to? I \nonly hope to goodness they are not still back there in the power of the goblins!\u201D \nHe still wandered on, out of the little high valley, over its edge, and down the slopes beyond; but \nall the while a very uncomfortable thought was growing inside him. He wondered whether he ought \nnot, now he had the magic ring, to go back into the horrible, horrible, tunnels and look for his friends. \nHe had just made up his mind that it was his duty, that he must turn back \u2014 and very miserable he felt \nabout it \u2014 when he heard voices. \nHe stopped and listened. It did not sound like goblins; so he crept forward carefully. He was on a \nstony path winding downwards with a rocky wall on the left hand; on the other side the ground sloped \naway and there were dells below the level of the path overhung with bushes and low trees. In one of \nthese dells under the bushes people were talking. \nHe crept still nearer, and suddenly he saw peering between two big boulders a head with a red hood \non: it was Balin doing look-out. He could have clapped and shouted for joy, but he did not. He had still \ngot the ring on, for fear of meeting something unexpected and unpleasant, and he saw that Balin was \nlooking straight at him without noticing him. \n\u201CI will give them all a surprise,\u201D he thought, as he crawled into the bushes at the edge of the dell. \nGandalf was arguing with the dwarves. They were discussing all that had happened to them in the \ntunnels, and wondering and debating what they were to do now. The dwarves were grumbling, and \nGandalf was saying that they could not possibly go on with their journey leaving Mr. Baggins in the \nhands of the goblins, without trying to find out if he was alive or dead, and without trying to rescue \nhim. \n\u201CAfter all he is my friend,\u201D said the wizard, \u201Cand not a bad little chap. I feel responsible for him. I \nwish to goodness you had not lost him.\u201D \nThe dwarves wanted to know why he had ever been brought at all, why he could not stick to his \nfriends and come along with them, and why the wizard had not chosen someone with more sense. \u201CHe \nhas been more trouble than use so far,\u201D said one. \u201CIf we have got to go back now into those \nabominable tunnels to look for him, then drat him, I say.\u201D \nGandalf answered angrily: \u201CI brought him, and I don\u2019t bring things that are of no use. Either you \nhelp me to look for him, or I go and leave you here to get out of the mess as best you can yourselves. \nIf we can only find him again, you will thank me before all is over. Whatever did you want to go and \ndrop him for, Dori?\u201D \n\u201CYou would have dropped him,\u201D said Dori, \u201Cif a goblin had suddenly grabbed your legs from \nbehind in the dark, tripped up your feet, and kicked you in the back!\u201D \n\u201CThen why didn\u2019t you pick him up again?\u201D \n\u201CGood heavens! Can you ask! Goblins fighting and biting in the dark, everybody falling over \nbodies and hitting one another! You nearly chopped off my head with Glamdring, and Thorin was \nstabbing here there and everywhere with Orcrist. All of a sudden you gave one of your blinding \nflashes, and we saw the goblins running back yelping. You shouted \u2018follow me everybody!\u2019 and \neverybody ought to have followed. We thought everybody had. There was no time to count, as you \nknow quite well, till we had dashed through the gate-guards, out of the lower door, and helter-skelter \ndown here. And here we are \u2014 without the burglar, confusticate him!\u201D \n\u201CAnd here\u2019s the burglar!\u201D said Bilbo stepping down into the middle of them, and slipping off the \nring. \nBless me, how they jumped! Then they shouted with surprise and delight. Gandalf was as \nastonished as any of them, but probably more pleased than all the others. He called to Balin and told \nhim what he thought of a look-out man who let people walk right into them like that without warning. \nIt is a fact that Bilbo\u2019s reputation went up a very great deal with the dwarves after this. If they had still \ndoubted that he was really a first-class burglar, in spite of Gandalf\u2019 s words, they doubted no longer. \nBalin was the most puzzled of all; but everyone said it was a very clever bit of work. \nIndeed Bilbo was so pleased with their praise that he just chuckled inside and said nothing \nwhatever about the ring; and when they asked him how he did it, he said: \u201COh, just crept along, you \nknow \u2014 very carefully and quietly.\u201D \n\u201CWell, it is the first time that even a mouse has crept along carefully and quietly under my very \nnose and not been spotted,\u201D said Balin, \u201Cand I take off my hood to you.\u201D Which he did. \n\u201CBalin at your service,\u201D said he. \n\u201CYour servant, Mr. Baggins,\u201D said Bilbo. \nThen they wanted to know all about his adventures after they had lost him, and he sat down and \ntold them everything \u2014 except about the finding of the ring (\u201Cnot just now\u201D he thought). They were \nparticularly interested in the riddle-competition, and shuddered most appreciatively at his description \nof Gollum. \n\u201CAnd then I couldn\u2019t think of any other question with him sitting beside me,\u201D ended Bilbo; \u201Cso I \nsaid \u2018what\u2019s in my pocket?\u2019 And he couldn\u2019t guess in three goes. So I said: \u2018what about your promise? \nShow me the way out! \u2019 But he came at me to kill me, and I ran, and fell over, and he missed me in the \ndark. Then I followed him, because I heard him talking to himself. He thought I really knew the way \nout, and so he was making for it. And then he sat down in the entrance, and I could not get by. So I \njumped over him and escaped, and ran down to the gate.\u201D \n\u201CWhat about the guards?\u201D they asked. \u201CWeren\u2019t there any?\u201D \n\u201CO yes! lots of them; but I dodged \u2019em. I got stuck in the door, which was only open a crack, and I \nlost lots of buttons,\u201D he said sadly looking at his torn clothes. \u201CBut I squeezed through all right \u2014 and \nhere I am.\u201D \nThe dwarves looked at him with quite a new respect, when he talked about dodging guards, \njumping over Gollum, and squeezing through, as if it was not very difficult or very alarming. \n\u201CWhat did I tell you?\u201D said Gandalf laughing. \u201CMr. Baggins has more about him than you guess.\u201D \nHe gave Bilbo a queer look from under his bushy eyebrows, as he said this, and the hobbit wondered if \nhe guessed at the part of his tale that he had left out. \nThen he had questions of his own to ask, for if Gandalf had explained it all by now to the dwarves, \nBilbo had not heard it. He wanted to know how the wizard had turned up again, and where they had all \ngot to now. \nThe wizard, to tell the truth, never minded explaining his cleverness more than once, so now he \ntold Bilbo that both he and Elrond had been well aware of the presence of evil goblins in that part of \nthe mountains. But their main gate used to come out on a different pass, one more easy to travel by, so \nthat they often caught people benighted near their gates. Evidently people had given up going that \nway, and the goblins must have opened their new entrance at the top of the pass the dwarves had taken, \nquite recently, because it had been found quite safe up to now. \n\u201CI must see if I can\u2019t find a more or less decent giant to block it up again,\u201D said Gandalf, \u201Cor soon \nthere will be no getting over the mountains at all.\u201D \nAs soon as Gandalf had heard Bilbo\u2019s yell he realized what had happened. In the flash which killed \nthe goblins that were grabbing him he had nipped inside the crack, just as it snapped to. He followed \nafter the drivers and prisoners right to the edge of the great hall, and there he sat down and worked up \nthe best magic he could in the shadows. \n\u201CA very ticklish business, it was,\u201D he said. \u201CTouch and go!\u201D \nBut, of course, Gandalf had made a special study of bewitchments with fire and lights (even the \nhobbit had never forgotten the magic fireworks at Old Took\u2019s midsummer-eve parties, as you \nremember). The rest we all know \u2014 except that Gandalf knew all about the back-door, as the goblins \ncalled the lower gate, where Bilbo lost his buttons. As a matter of fact it was well known to anybody \nwho was acquainted with this part of the mountains; but it took a wizard to keep his head in the \ntunnels and guide them in the right direction. \n\u201CThey made that gate ages ago,\u201D he said, \u201Cpartly for a way of escape, if they needed one; partly as a \nway out into the lands beyond, where they still come in the dark and do great damage. They guard it \nalways and no one has ever managed to block it up. They will guard it doubly after this,\u201D he laughed. \nAll the others laughed too. After all they had lost a good deal, but they had killed the Great Goblin \nand a great many others besides, and they had all escaped, so they might be said to have had the best \nof it so far. \nBut the wizard called them to their senses. \u201CWe must be getting on at once, now we are a little \nrested,\u201D he said. \u201CThey will be out after us in hundreds when night comes on; and already shadows are \nlengthening. They can smell our footsteps for hours and hours after we have passed. We must be miles \non before dusk. There will be a bit of moon, if it keeps fine, and that is lucky. Not that they mind the \nmoon much, but it will give us a little light to steer by.\u201D \n\u201CO yes!\u201D he said in answer to more questions from the hobbit. \u201CYou lose track of time inside \ngoblin-tunnels. Today\u2019s Thursday, and it was Monday night or Tuesday morning that we were \ncaptured. We have gone miles and miles, and come right down through the heart of the mountains, and \nare now on the other side \u2014 quite a short cut. But we are not at the point to which our pass would have \nbrought us; we are too far to the North, and have some awkward country ahead. And we are still pretty \nhigh up. Let\u2019s get on!\u201D \n\u201CI am dreadfully hungry,\u201D groaned Bilbo, who was suddenly aware that he had not had a meal since \nthe night before the night before last. Just think of that for a hobbit! His stomach felt all empty and \nloose and his legs all wobbly, now that the excitement was over. \n\u201CCan\u2019t help it,\u201D said Gandalf, \u201Cunless you like to go back and ask the goblins nicely to let you have \nyour pony back and your luggage.\u201D \n\u201CNo thank you!\u201D said Bilbo. \n\u201CVery well then, we must just tighten our belts and trudge on \u2014 or we shall be made into supper, \nand that will be much worse than having none ourselves.\u201D \nAs they went on Bilbo looked from side to side for something to eat; but the blackberries were still \nonly in flower, and of course there were no nuts, not even hawthorn-berries. He nibbled a bit of sorrel, \nand he drank from a small mountain-stream that crossed the path, and he ate three wild strawberries \nthat he found on its bank, but it was not much good. \nThey still went on and on. The rough path disappeared. The bushes, and the long grasses between \nthe boulders, the patches of rabbit-cropped turf, the thyme and the sage and the marjoram, and the \nyellow rockroses all vanished, and they found themselves at the top of a wide steep slope of fallen \nstones, the remains of a landslide. When they began to go down this, rubbish and small pebbles rolled \naway from their feet; soon larger bits of split stone went clattering down and started other pieces \nbelow them slithering and rolling; then lumps of rock were disturbed and bounded off, crashing down \nwith a dust and a noise. Before long the whole slope above them and below them seemed on the move, \nand they were sliding away, huddled all together, in a fearful confusion of slipping, rattling, cracking \nslabs and stones. \nIt was the trees at the bottom that saved them. They slid into the edge of a climbing wood of pines \nthat here stood right up the mountain slope from the deeper darker forests of the valleys below. Some \ncaught hold of the trunks and swung themselves into lower branches, some (like the little hobbit) got \nbehind a tree to shelter from the onslaught of the rocks. Soon the danger was over, the slide had \nstopped, and the last faint crashes could be heard as the largest of the disturbed stones went bounding \nand spinning among the bracken and the pine-roots far below. \n\u201CWell! that has got us on a bit,\u201D said Gandalf; \u201Cand even goblins tracking us will have a job to \ncome down here quietly.\u201D \n\u201CI daresay,\u201D grumbled Bombur; \u201Cbut they won\u2019t find it difficult to send stones bouncing down on \nour heads.\u201D The dwarves (and Bilbo) were feeling far from happy, and were rubbing their bruised and \ndamaged legs and feet. \n\u201CNonsense! We are going to turn aside here out of the path of the slide. We must be quick! Look at \nthe light!\u201D \nThe sun had long gone behind the mountains. Already the shadows were deepening about them, \nthough far away through the trees and over the black tops of those growing lower down they could still \nsee the evening lights on the plains beyond. They limped along now as fast as they were able down the \ngentle slopes of a pine forest in a slanting path leading steadily southwards. At times they were \npushing through a sea of bracken with tall fronds rising right above the hobbit\u2019s head; at times they \nwere marching along quiet as quiet over a floor of pine-needles; and all the while the forest-gloom got \nheavier and the forest-silence deeper. There was no wind that evening to bring even a sea-sighing into \nthe branches of the trees. \n\u201CMust we go any further?\u201D asked Bilbo, when it was so dark that he could only just see Thorin\u2019s beard \nwagging beside him, and so quiet that he could hear the dwarves\u2019 breathing like a loud noise. \u201CMy toes \nare all bruised and bent, and my legs ache, and my stomach is wagging like an empty sack.\u201D \n\u201CA bit further,\u201D said Gandalf. \nAfter what seemed ages further they came suddenly to an opening where no trees grew. The moon \nwas up and was shining into the clearing. Somehow it struck all of them as not at all a nice place, \nalthough there was nothing wrong to see. \nAll of a sudden they heard a howl away down hill, a long shuddering howl. It was answered by \nanother away to the right and a good deal nearer to them; then by another not far away to the left. It \nwas wolves howling at the moon, wolves gathering together! \nThere were no wolves living near Mr. Baggins\u2019 hole at home, but he knew that noise. He had had it \ndescribed to him often enough in tales. One of his elder cousins (on the Took side), who had been a \ngreat traveller, used to imitate it to frighten him. To hear it out in the forest under the moon was too \nmuch for Bilbo. Even magic rings are not much use against wolves \u2014 especially against the evil packs \nthat lived under the shadow of the goblin-infested mountains, over the Edge of the Wild on the borders \nof the unknown. Wolves of that sort smell keener than goblins, and do not need to see you to catch \nyou! \n\u201CWhat shall we do, what shall we do!\u201D he cried. \u201CEscaping goblins to be caught by wolves!\u201D he \nsaid, and it became a proverb, though we now say \u201Cout of the frying-pan into the fire\u201D in the same sort \nof uncomfortable situations. \n\u201CUp the trees quick!\u201D cried Gandalf; and they ran to the trees at the edge of the glade, hunting for \nthose that had branches fairly low, or were slender enough to swarm up. They found them as quick as \never they could, you can guess; and up they went as high as ever they could trust the branches. You \nwould have laughed (from a safe distance), if you had seen the dwarves sitting up in the trees with \ntheir beards dangling down, like old gentlemen gone cracked and playing at being boys. Fili and Kili \nwere at the top of a tall larch like an enormous Christmas tree. Dori, Nori, Ori, Oin, and Gloin were \nmore comfortable in a huge pine with regular branches sticking out at intervals like the spokes of a \nwheel. Bifur, Bofur, Bombur, and Thorin were in another. Dwalin and Balin had swarmed up a tall \nslender fir with few branches and were trying to find a place to sit in the greenery of the topmost \nboughs. Gandalf, who was a good deal taller than the others, had found a tree into which they could \nnot climb, a large pine standing at the very edge of the glade. He was quite hidden in its boughs, but \nyou could see his eyes gleaming in the moon as he peeped out. \nAnd Bilbo? He could not get into any tree, and was scuttling about from trunk to trunk, like a rabbit \nthat has lost its hole and has a dog after it. \n\u201CYou\u2019ve left the burglar behind again!\u201D said Nori to Dori looking down. \n\u201CI can\u2019t be always carrying burglars on my back,\u201D said Dori, \u201Cdown tunnels and up trees! What do \nyou think I am? A porter?\u201D \n\u201CHe\u2019ll be eaten if we don\u2019t do something,\u201D said Thorin, for there were howls all round them now, \ngetting nearer and nearer. \u201CDori!\u201D he called, for Dori was lowest down in the easiest tree, \u201Cbe quick, \nand give Mr. Baggins a hand up!\u201D \nDori was really a decent fellow in spite of his grumbling. Poor Bilbo could not reach his hand even \nwhen he climbed down to the bottom branch and hung his arm down as far as ever he could. So Dori \nactually climbed out of the tree and let Bilbo scramble up and stand on his back. \nJust at that moment the wolves trotted howling into the clearing. All of a sudden there were \nhundreds of eyes looking at them. Still Dori did not let Bilbo down. He waited till he had clambered \noff his shoulders into the branches, and then he jumped for the branches himself. Only just in time! A \nwolf snapped at his cloak as he swung up, and nearly got him. In a minute there was a whole pack of \nthem yelping all round the tree and leaping up at the trunk, with eyes blazing and tongues hanging out. \nBut even the wild Wargs (for so the evil wolves over the Edge of the Wild were named) cannot \nclimb trees. For a time they were safe. Luckily it was warm and not windy. Trees are not very \ncomfortable to sit in for long at any time; but in the cold and the wind, with wolves all round below \nwaiting for you, they can be perfectly miserable places. \nThis glade in the ring of trees was evidently a meeting-place of the wolves. More and more kept \ncoming in. They left guards at the foot of the tree in which Dori and Bilbo were, and then went \nsnuffling about till they had smelt out every tree that had anyone in it. These they guarded too, while \nall the rest (hundreds and hundreds it seemed) went and sat in a great circle in the glade; and in the \nmiddle of the circle was a great grey wolf. He spoke to them in the dreadful language of the Wargs. \nGandalf understood it. Bilbo did not, but it sounded terrible to him, and as if all their talk was about \ncruel and wicked things, as it was. Every now and then all the Wargs in the circle would answer their \ngrey chief all together, and their dreadful clamour almost made the hobbit fall out of his pine-tree. \nI will tell you what Gandalf heard, though Bilbo did not understand it. The Wargs and the goblins \noften helped one another in wicked deeds. Goblins do not usually venture very far from their \nmountains, unless they are driven out and are looking for new homes, or are marching to war (which I \nam glad to say has not happened for a long while). But in those days they sometimes used to go on \nraids, especially to get food or slaves to work for them. Then they often got the Wargs to help and \nshared the plunder with them. Sometimes they rode on wolves like men do on horses. Now it seemed \nthat a great goblin-raid had been planned for that very night. The Wargs had come to meet the goblins \nand the goblins were late. The reason, no doubt, was the death of the Great Goblin, and all the \nexcitement caused by the dwarves and Bilbo and the wizard, for whom they were probably still \nhunting. \nIn spite of the dangers of this far land bold men had of late been making their way back into it from \nthe South, cutting down trees, and building themselves places to live in among the more pleasant \nwoods in the valleys and along the river-shores. There were many of them, and they were brave and \nwell-armed, and even the Wargs dared not attack them if there were many together, or in the bright \nday. But now they had planned with the goblins\u2019 help to come by night upon some of the villages \nnearest the mountains. If their plan had been carried out, there would have been none left there next \nday; all would have been killed except the few the goblins kept from the wolves and carried back as \nprisoners to their caves. \nThis was dreadful talk to listen to, not only because of the brave woodmen and their wives and \nchildren, but also because of the danger which now threatened Gandalf and his friends. The Wargs \nwere angry and puzzled at finding them here in their very meeting-place. They thought they were \nfriends of the woodmen, and were come to spy on them, and would take news of their plans down into \nthe valleys, and then the goblins and the wolves would have to fight a terrible battle instead of \ncapturing prisoners and devouring people waked suddenly from their sleep. So the Wargs had no \nintention of going away and letting the people up the trees escape, at any rate not until morning. And \nlong before that, they said, goblin soldiers would be coming down from the mountains; and goblins \ncan climb trees, or cut them down. \nNow you can understand why Gandalf, listening to their growling and yelping, began to be \ndreadfully afraid, wizard though he was, and to feel that they were in a very bad place, and had not yet \nescaped at all. All the same he was not going to let them have it all their own way, though he could not \ndo very much stuck up in a tall tree with wolves all round on the ground below. He gathered the huge \npine-cones from the branches of the tree. Then he set one alight with bright blue fire, and threw it \nwhizzing down among the circle of the wolves. It struck one on the back, and immediately his shaggy \ncoat caught fire, and he was leaping to and fro yelping horribly. Then another came and another, one \nin blue flames, one in red, another in green. They burst on the ground in the middle of the circle and \nwent off in coloured sparks and smoke. A specially large one hit the chief wolf on the nose, and he \nleaped in the air ten feet, and then rushed round and round the circle biting and snapping even at the \nother wolves in his anger and fright. \nThe dwarves and Bilbo shouted and cheered. The rage of the wolves was terrible to see, and the \ncommotion they made filled all the forest. Wolves are afraid of fire at all times, but this was a most \nhorrible and uncanny fire. If a spark got in their coats it stuck and burned into them, and unless they \nrolled over quick they were soon all in flames. Very soon all about the glade wolves were rolling over \nand over to put out the sparks on their backs, while those that were burning were running about \nhowling and setting others alight, till their own friends chased them away and they fled off down the \nslopes crying and yammering and looking for water. \n\u201CWhat is all this uproar in the forest tonight?\u201D said the Lord of the Eagles. He was sitting, black in the \nmoonlight, on the top of a lonely pinnacle of rock at the eastern edge of the mountains. \u201CI hear \nwolves\u2019 voices! Are the goblins at mischief in the woods?\u201D \nHe swept up into the air, and immediately two of his guards from the rocks at either hand leaped up \nto follow him. They circled up in the sky and looked down upon the ring of the Wargs, a tiny spot far \nfar below. But eagles have keen eyes and can see small things at a great distance. The Lord of the \nEagles of the Misty Mountains had eyes that could look at the sun unblinking, and could see a rabbit \nmoving on the ground a mile below even in the moonlight. So though he could not see the people in \nthe trees, he could make out the commotion among the wolves and see the tiny flashes of fire, and \nhear the howling and yelping come up faint from far beneath him. Also he could see the glint of the \nmoon on goblin spears and helmets, as long lines of the wicked folk crept down the hillsides from \ntheir gate and wound into the wood. \nEagles are not kindly birds. Some are cowardly and cruel. But the ancient race of the northern \nmountains were the greatest of all birds; they were proud and strong and noble-hearted. They did not \nlove goblins, or fear them. When they took any notice of them at all (which was seldom, for they did \nnot eat such creatures), they swooped on them and drove them shrieking back to their caves, and \nstopped whatever wickedness they were doing. The goblins hated the eagles and feared them, but \ncould not reach their lofty seats, or drive them from the mountains. \nTonight the Lord of the Eagles was filled with curiosity to know what was afoot; so he summoned \nmany other eagles to him, and they flew away from the mountains, and slowly circling ever round and \nround they came down, down, down towards the ring of the wolves and the meeting-place of the \ngoblins. \nA very good thing too! Dreadful things had been going on down there. The wolves that had caught \nfire and fled into the forest had set it alight in several places. It was high summer, and on this eastern \nside of the mountains there had been little rain for some time. Yellowing bracken, fallen branches, \ndeep-piled pine-needles, and here and there dead trees, were soon in flames. All round the clearing of \nthe Wargs fire was leaping. But the wolf-guards did not leave the trees. Maddened and angry they \nwere leaping and howling round the trunks, and cursing the dwarves in their horrible language, with \ntheir tongues hanging out, and their eyes shining as red and fierce as the flames. \nThen suddenly goblins came running up yelling. They thought a battle with the woodmen was \ngoing on; but they soon learned what had really happened. Some of them actually sat down and \nlaughed. Others waved their spears and clashed the shafts against their shields. Goblins are not afraid \nof fire, and they soon had a plan which seemed to them most amusing. \nSome got all the wolves together in a pack. Some stacked fern and brushwood round the tree- \ntrunks. Others rushed round and stamped and beat, and beat and stamped, until nearly all the flames \nwere put out \u2014 but they did not put out the fire nearest to the trees where the dwarves were. That fire \nthey fed with leaves and dead branches and bracken. Soon they had a ring of smoke and flame all \nround the dwarves, a ring which they kept from spreading outwards; but it closed slowly in, till the \nrunning fire was licking the fuel piled under the trees. Smoke was in Bilbo\u2019s eyes, he could feel the \nheat of the flames; and through the reek he could see the goblins dancing round and round in a circle \nlike people round a midsummer bonfire. Outside the ring of dancing warriors with spears and axes \nstood the wolves at a respectful distance, watching and waiting. \nHe could hear the goblins beginning a horrible song: \nFifteen birds in five fir-trees, \ntheir feathers were fanned in a fiery breeze! \nBut, funny little birds, they had no wings! \nO what shall we do with the funny little things? Roast \u2019em alive, or stew them in a pot; \nfry them, boil them and eat them hot? \nThen they stopped and shouted out: \u201CFly away little birds! Fly away if you can! Come down little \nbirds, or you will get roasted in your nests! Sing, sing little birds! Why don\u2019t you sing?\u201D \n\u201CGo away! little boys!\u201D shouted Gandalf in answer. \u201CIt isn\u2019t bird-nesting time. Also naughty little \nboys that play with fire get punished.\u201D He said it to make them angry, and to show them he was not \nfrightened of them \u2014 though of course he was, wizard though he was. But they took no notice, and they \nwent on singing. \nBurn, burn tree and fern! \nShrivel and scorch! A fizzling torch \nTo light the night for our delight, \nYa hey! \nBake and toast \u2019em, fry and roast \u2019em! \ntill beards blaze, and eyes glaze; \ntill hair smells and skins crack, \nfat melts, and bones black \nin cinders lie \nbeneath the sky! \nSo dwarves shall die, \nand light the night for our delight, \nYa hey! \nYa-harri-hey! \nYa hoy! \nAnd with that Ya hoyl the flames were under Gandalf\u2019 s tree. In a moment it spread to the others. \nThe bark caught fire, the lower branches cracked. \nThen Gandalf climbed to the top of his tree. The sudden splendour flashed from his wand like \nlightning, as he got ready to spring down from on high right among the spears of the goblins. That \nwould have been the end of him, though he would probably have killed many of them as he came \nhurtling down like a thunderbolt. But he never leaped. \nJust at that moment the Lord of the Eagles swept down from above, seized him in his talons, and \nwas gone. \nThere was a howl of anger and surprise from the goblins. Loud cried the Lord of the Eagles, to whom \nGandalf had now spoken. Back swept the great birds that were with him, and down they came like \nhuge black shadows. The wolves yammered and gnashed their teeth; the goblins yelled and stamped \nwith rage, and flung their heavy spears in the air in vain. Over them swooped the eagles; the dark rush \nof their beating wings smote them to the floor or drove them far away; their talons tore at goblin \nfaces. Other birds flew to the tree-tops and seized the dwarves, who were scrambling up now as far as \nthey ever dared to go. \nPoor little Bilbo was very nearly left behind again! He just managed to catch hold of Dori\u2019s legs, as \nDori was borne off last of all; and up they went together above the tumult and the burning, Bilbo \nswinging in the air with his arms nearly breaking. \nNow far below the goblins and the wolves were scattering far and wide in the woods. A few eagles \nwere still circling and sweeping above the battleground. The flames about the trees sprang suddenly \nup above the highest branches. They went up in crackling fire. There was a sudden flurry of sparks and \nsmoke. Bilbo had escaped only just in time! \nSoon the light of the burning was faint below, a red twinkle on the black floor; and they were high \nup in the sky, rising all the time in strong sweeping circles. Bilbo never forgot that flight, clinging \nonto Dori\u2019s ankles. He moaned \u201Cmy arms, my arms!\u201D; but Dori groaned \u201Cmy poor legs, my poor legs!\u201D \nAt the best of times heights made Bilbo giddy. He used to turn queer if he looked over the edge of \nquite a little cliff; and he had never liked ladders, let alone trees (never having had to escape from \nwolves before). So you can imagine how his head swam now, when he looked down between his \ndangling toes and saw the dark lands opening wide underneath him, touched here and there with the \nlight of the moon on a hill-side rock or a stream in the plains. \nThe pale peaks of the mountains were coming nearer, moonlit spikes of rock sticking out of black \nshadows. Summer or not, it seemed very cold. He shut his eyes and wondered if he could hold on any \nlonger. Then he imagined what would happen if he did not. He felt sick. \nThe flight ended only just in time for him, just before his arms gave way. He loosed Dori\u2019s ankles \nwith a gasp and fell onto the rough platform of an eagle\u2019s eyrie. There he lay without speaking, and his \nthoughts were a mixture of surprise at being saved from the fire, and fear lest he fall off that narrow \nplace into the deep shadows on either side. He was feeling very queer indeed in his head by this time \nafter the dreadful adventures of the last three days with next to nothing to eat, and he found himself \nsaying aloud: \u201CNow I know what a piece of bacon feels like when it is suddenly picked out of the pan \non a fork and put back on the shelf!\u201D \n\u201CNo you don\u2019t!\u201D he heard Dori answering, \u201Cbecause the bacon knows that it will get back in the pan \nsooner or later; and it is to be hoped we shan\u2019t. Also eagles aren\u2019t forks!\u201D \n\u201CO no! Not a bit like storks \u2014 forks, I mean,\u201D said Bilbo sitting up and looking anxiously at the \neagle who was perched close by. He wondered what other nonsense he had been saying, and if the \neagle would think it rude. You ought not to be rude to an eagle, when you are only the size of a hobbit, \nand are up in his eyrie at night! \nThe eagle only sharpened his beak on a stone and trimmed his feathers and took no notice. \nSoon another eagle flew up. \u201CThe Lord of the Eagles bids you to bring your prisoners to the Great \nShelf,\u201D he cried and was off again. The other seized Dori in his claws and flew away with him into the \nnight leaving Bilbo all alone. He had just strength to wonder what the messenger had meant by \n\u2018prisoners,\u2019 and to begin to think of being torn up for supper like a rabbit, when his own turn came. \nThe eagle came back, seized him in his talons by the back of his coat, and swooped off. This time \nhe flew only a short way. Very soon Bilbo was laid down, trembling with fear, on a wide shelf of rock \non the mountain-side. There was no path down on to it save by flying; and no path down off it except \nby jumping over a precipice. There he found all the others sitting with their backs to the mountain \nwall. The Lord of the Eagles also was there and was speaking to Gandalf. \nIt seemed that Bilbo was not going to be eaten after all. The wizard and the eagle-lord appeared to \nknow one another slightly, and even to be on friendly terms. As a matter of fact Gandalf, who had \noften been in the mountains, had once rendered a service to the eagles and healed their lord from an \narrow-wound. So you see \u2018prisoners\u2019 had meant \u2018prisoners rescued from the goblins\u2019 only, and not \ncaptives of the eagles. As Bilbo listened to the talk of Gandalf he realized that at last they were going \nto escape really and truly from the dreadful mountains. He was discussing plans with the Great Eagle \nfor carrying the dwarves and himself and Bilbo far away and setting them down well on their journey \nacross the plains below. \nThe Misty Mountains Looking West from the Eyrie towards Goblin Gate \nThe Lord of the Eagles would not take them anywhere near where men lived. \u201CThey would shoot at \nus with their great bows of yew,\u201D he said, \u201Cfor they would think we were after their sheep. And at other \ntimes they would be right. No! we are glad to cheat the goblins of their sport, and glad to repay our \nthanks to you, but we will not risk ourselves for dwarves in the southward plains.\u201D \n\u201CVery well,\u201D said Gandalf. \u201CTake us where and as far as you will! We are already deeply obliged to \nyou. But in the meantime we are famished with hunger.\u201D \n\u201CI am nearly dead of it,\u201D said Bilbo in a weak little voice that nobody heard. \n\u201CThat can perhaps be mended,\u201D said the Lord of the Eagles. \nLater on you might have seen a bright fire on the shelf of rock and the figures of the dwarves round \nit cooking and making a fine roasting smell. The eagles had brought up dry boughs for fuel, and they \nhad brought rabbits, hares, and a small sheep. The dwarves managed all the preparations. Bilbo was \ntoo weak to help, and anyway he was not much good at skinning rabbits or cutting up meat, being used \nto having it delivered by the butcher all ready to cook. Gandalf, too, was lying down after doing his \npart in setting the fire going, since Oin and Gloin had lost their tinder-boxes. (Dwarves have never \ntaken to matches even yet.) \nSo ended the adventures of the Misty Mountains. Soon Bilbo\u2019s stomach was feeling full and \ncomfortable again, and he felt he could sleep contentedly, though really he would have liked a loaf and \nbutter better than bits of meat toasted on sticks. He slept curled up on the hard rock more soundly than \never he had done on his feather-bed in his own little hole at home. But all night he dreamed of his own \nhouse and wandered in his sleep into all his different rooms looking for something that he could not \nfind nor remember what it looked like. \nChapter VII \nQUEER LODGINGS \nThe next morning Bilbo woke up with the early sun in his eyes. He jumped up to look at the time and \nto go and put his kettle on \u2014 and found he was not home at all. So he sat down and wished in vain for a \nwash and a brush. He did not get either, nor tea nor toast nor bacon for his breakfast, only cold mutton \nand rabbit. And after that he had to get ready for a fresh start. \nThis time he was allowed to climb on to an eagle\u2019s back and cling between his wings. The air \nrushed over him and he shut his eyes. The dwarves were crying farewells and promising to repay the \nLord of the Eagles if ever they could, as off rose fifteen great birds from the mountain\u2019s side. The sun \nwas still close to the eastern edge of things. The morning was cool, and mists were in the valleys and \nhollows and twined here and there about the peaks and pinnacles of the hills. Bilbo opened an eye to \npeep and saw that the birds were already high up and the world was far away, and the mountains were \nfalling back behind them into the distance. He shut his eyes again and held on tighter. \n\u201CDon\u2019t pinch!\u201D said his eagle. \u201CYou need not be frightened like a rabbit, even if you look rather \nlike one. It is a fair morning with little wind. What is finer than flying?\u201D \nBilbo would have liked to say: \u201CA warm bath and late breakfast on the lawn afterwards;\u201D but he \nthought it better to say nothing at all, and to let go his clutch just a tiny bit. \nAfter a good while the eagles must have seen the point they were making for, even from their great \nheight, for they began to go down circling round in great spirals. They did this for a long while, and at \nlast the hobbit opened his eyes again. The earth was much nearer, and below them were trees that \nlooked like oaks and elms, and wide grass lands, and a river running through it all. But cropping out of \nthe ground, right in the path of the stream which looped itself about it, was a great rock, almost a hill \nof stone, like a last outpost of the distant mountains, or a huge piece cast miles into the plain by some \ngiant among giants. \nQuickly now to the top of this rock the eagles swooped one by one and set down their passengers. \n\u201CFarewell!\u201D they cried, \u201Cwherever you fare, till your eyries receive you at the journey\u2019s end!\u201D That \nis the polite thing to say among eagles. \n\u201CMay the wind under your wings bear you where the sun sails and the moon walks,\u201D answered \nGandalf, who knew the correct reply. \nAnd so they parted. And though the Lord of the Eagles became in after days the King of All Birds \nand wore a golden crown, and his fifteen chieftains golden collars (made of the gold that the dwarves \ngave them), Bilbo never saw them again \u2014 except high and far off in the battle of Five Armies. But as \nthat comes in at the end of this tale we will say no more about it just now. \nThere was a flat space on the top of the hill of stone and a well worn path with many steps leading \ndown it to the river, across which a ford of huge flat stones led to the grass-land beyond the stream. \nThere was a little cave (a wholesome one with a pebbly floor) at the foot of the steps and near the end \nof the stony ford. Here the party gathered and discussed what was to be done. \n\u201CI always meant to see you all safe (if possible) over the mountains,\u201D said the wizard, \u201Cand now by \ngood management and good luck I have done it. Indeed we are now a good deal further east than I ever \nmeant to come with you, for after all this is not my adventure. I may look in on it again before it is all \nover, but in the meanwhile I have some other pressing business to attend to.\u201D \nThe dwarves groaned and looked most distressed, and Bilbo wept. They had begun to think Gandalf \nwas going to come all the way and would always be there to help them out of difficulties. \u201CI am not \ngoing to disappear this very instant,\u201D said he. \u201CI can give you a day or two more. Probably I can help \nyou out of your present plight, and I need a little help myself. We have no food, and no baggage, and \nno ponies to ride; and you don\u2019t know where you are. Now I can tell you that. You are still some miles \nnorth of the path which we should have been following, if we had not left the mountain pass in a hurry. \nVery few people live in these parts, unless they have come here since I was last down this way, which \nis some years ago. But there is somebody that I know of, who lives not far away. That Somebody made \nthe steps on the great rock \u2014 the Carrock I believe he calls it. He does not come here often, certainly \nnot in the daytime, and it is no good waiting for him. In fact it would be very dangerous. We must go \nand find him; and if all goes well at our meeting, I think I shall be off and wish you like the eagles \n'farewell wherever you fare!\u2019\u201D \nThey begged him not to leave them. They offered him dragon-gold and silver and jewels, but he \nwould not change his mind. \u201CWe shall see, we shall see!\u201D he said, \u201Cand I think I have earned already \nsome of your dragon-gold \u2014 when you have got it.\u201D \nAfter that they stopped pleading. Then they took off their clothes and bathed in the river, which was \nshallow and clear and stony at the ford. When they had dried in the sun, which was now strong and \nwarm, they were refreshed, if still sore and a little hungry. Soon they crossed the ford (carrying the \nhobbit), and then began to march through the long green grass and down the lines of the wide-armed \noaks and the tall elms. \n\u201CAnd why is it called the Carrock?\u201D asked Bilbo as he went along at the wizard\u2019s side. \n\u201CHe called it the Carrock, because carrock is his word for it. He calls things like that carrocks, and \nthis one is the Carrock because it is the only one near his home and he knows it well.\u201D \n\u201CWho calls it? Who knows it?\u201D \n\u201CThe Somebody I spoke of \u2014 a very great person. You must all be very polite when I introduce you. \nI shall introduce you slowly, two by two, I think; and you must be careful not to annoy him, or heaven \nknows what will happen. He can be appalling when he is angry, though he is kind enough if humoured. \nStill I warn you he gets angry easily.\u201D \nThe dwarves all gathered round when they heard the wizard talking like this to Bilbo. \u201CIs that the \nperson you are taking us to now?\u201D they asked. \u201CCouldn\u2019t you find someone more easy-tempered? \nHadn\u2019t you better explain it all a bit clearer?\u201D \u2014 and so on. \n\u201CYes it certainly is! No I could not! And I was explaining very carefully,\u201D answered the wizard \ncrossly. \u201CIf you must know more, his name is Beorn. He is very strong, and he is a skin-changer.\u201D \n\u201CWhat! a furrier, a man that calls rabbits conies, when he doesn\u2019t turn their skins into squirrels?\u201D \nasked Bilbo. \n\u201CGood gracious heavens, no, no, NO, NO!\u201D said Gandalf. \u201CDon\u2019t be a fool Mr. Baggins if you can \nhelp it; and in the name of all wonder don\u2019t mention the word furrier again as long as you are within a \nhundred miles of his house, nor rug, cape, tippet, muff, nor any other such unfortunate word! He is a \nskin-changer. He changes his skin: sometimes he is a huge black bear, sometimes he is a great strong \nblack-haired man with huge arms and a great beard. I cannot tell you much more, though that ought to \nbe enough. Some say that he is a bear descended from the great and ancient bears of the mountains \nthat lived there before the giants came. Others say that he is a man descended from the first men who \nlived before Smaug or the other dragons came into this part of the world, and before the goblins came \ninto the hills out of the North. I cannot say, though I fancy the last is the true tale. He is not the sort of \nperson to ask questions of. \n\u201CAt any rate he is under no enchantment but his own. He lives in an oak-wood and has a great \nwooden house; and as a man he keeps cattle and horses which are nearly as marvellous as himself. \nThey work for him and talk to him. He does not eat them; neither does he hunt or eat wild animals. He \nkeeps hives and hives of great fierce bees, and lives most on cream and honey. As a bear he ranges far \nand wide. I once saw him sitting all alone on the top of the Carrock at night watching the moon \nsinking towards the Misty Mountains, and I heard him growl in the tongue of bears: The day will \ncome when they will perish and I shall go back! \u2019 That is why I believe he once came from the \nmountains himself.\u201D \nBilbo and the dwarves had now plenty to think about, and they asked no more questions. They still had \na long way to walk before them. Up slope and down dale they plodded. It grew very hot. Sometimes \nthey rested under the trees, and then Bilbo felt so hungry that he would have eaten acorns, if any had \nbeen ripe enough yet to have fallen to the ground. \nIt was the middle of the afternoon before they noticed that great patches of flowers had begun to \nspring up, all the same kinds growing together as if they had been planted. Especially there was \nclover, waving patches of cockscomb clover, and purple clover, and wide stretches of short white \nsweet honey-smelling clover. There was a buzzing and a whirring and a droning in the air. Bees were \nbusy everywhere. And such bees! Bilbo had never seen anything like them. \n\u201CIf one was to sting me,\u201D he thought, \u201CI should swell up as big again as lam!\u201D \nThey were bigger than hornets. The drones were bigger than your thumb, a good deal, and the \nbands of yellow on their deep black bodies shone like fiery gold. \n\u201CWe are getting near,\u201D said Gandalf. \u201CWe are on the edge of his bee-pastures.\u201D \nAfter a while they came to a belt of tall and very ancient oaks, and beyond these to a high thorn-hedge \nthrough which you could neither see nor scramble. \n\u201CYou had better wait here,\u201D said the wizard to the dwarves; \u201Cand when I call or whistle begin to \ncome after me \u2014 you will see the way I go \u2014 but only in pairs, mind, about five minutes between each \npair of you. Bombur is fattest and will do for two, he had better come alone and last. Come on Mr. \nBaggins! There is a gate somewhere round this way.\u201D And with that he went off along the hedge taking \nthe frightened hobbit with him. \nThey soon came to a wooden gate, high and broad, beyond which they could see gardens and a \ncluster of low wooden buildings, some thatched and made of unshaped logs: barns, stables, sheds, and \na long low wooden house. Inside on the southward side of the great hedge were rows and rows of hives \nwith bell-shaped tops made of straw. The noise of the giant bees flying to and fro and crawling in and \nout filled all the air. \nThe wizard and the hobbit pushed open the heavy creaking gate and went down a wide track \ntowards the house. Some horses, very sleek and well-groomed, trotted up across the grass and looked \nat them intently with very intelligent faces; then off they galloped to the buildings. \n\u201CThey have gone to tell him of the arrival of strangers,\u201D said Gandalf. \nSoon they reached a courtyard, three walls of which were formed by the wooden house and its two \nlong wings. In the middle there was lying a great oak-trunk with many lopped branches beside it. \nStanding near was a huge man with a thick black beard and hair, and great bare arms and legs with \nknotted muscles. He was clothed in a tunic of wool down to his knees, and was leaning on a large axe. \nThe horses were standing by him with their noses at his shoulder. \n\u201CUgh! here they are!\u201D he said to the horses. \u201CThey don\u2019t look dangerous. You can be off!\u201D He \nlaughed a great rolling laugh, put down his axe and came forward. \n\u201CWho are you and what do you want?\u201D he asked gruffly, standing in front of them and towering tall \nabove Gandalf. As for Bilbo he could easily have trotted through his legs without ducking his head to \nmiss the fringe of the man\u2019s brown tunic. \n\u201CI am Gandalf,\u201D said the wizard. \n\u201CNever heard of him,\u201D growled the man. \u201CAnd what\u2019s this little fellow?\u201D he said, stooping down to \nfrown at the hobbit with his bushy black eyebrows. \n\u201CThat is Mr. Baggins, a hobbit of good family and unimpeachable reputation,\u201D said Gandalf. Bilbo \nbowed. He had no hat to take off, and was painfully conscious of his many missing buttons. \u201CI am a \nwizard,\u201D continued Gandalf. \u201CI have heard of you, if you have not heard of me; but perhaps you have \nheard of my good cousin Radagast who lives near the Southern borders of Mirkwood?\u201D \n\u201CYes; not a bad fellow as wizards go, I believe. I used to see him now and again,\u201D said Beorn. \n\u201CWell, now I know who you are, or who you say you are. What do you want?\u201D \n\u201CTo tell you the truth, we have lost our luggage and nearly lost our way, and are rather in need of \nhelp, or at least of advice. I may say we have had rather a bad time with goblins in the mountains.\u201D \n\u201CGoblins?\u201D said the big man less gruffly. \u201CO ho, so you\u2019ve been having trouble with them have \nyou? What did you go near them for?\u201D \n\u201CWe did not mean to. They surprised us at night in a pass which we had to cross; we were coming \nout of the Lands over West into these countries \u2014 it is a long tale.\u201D \n\u201CThen you had better come inside and tell me some of it, if it won\u2019t take all day,\u201D said the man \nleading the way through a dark door that opened out of the courtyard into the house. \nFollowing him they found themselves in a wide hall with a fire-place in the middle. Though it was \nsummer there was a wood-fire burning and the smoke was rising to the blackened rafters in search of \nthe way out through an opening in the roof. They passed through this dim hall, lit only by the fire and \nthe hole above it, and came through another smaller door into a sort of veranda propped on wooden \nposts made of single tree-trunks. It faced south and was still warm and filled with the light of the \nwestering sun which slanted into it, and fell golden on the garden full of flowers that came right up to \nthe steps. \nHere th \nand lookec \nhalf of the \n\u201CI was coming over the mountains with a friend or two...\u201D said the wizard. \n\u201COr two? I can only see one, and a little one at that,\u201D said Beorn. \n\u201CWell to tell you the truth, I did not like to bother you with a lot of us, until I found out if you were \nbusy. I will give a call, if I may.\u201D \n\u201CGo on, call away!\u201D \nSo Gandalf gave a long shrill whistle, and presently Thorin and Dori came round the house by the \ngarden path and stood bowing low before them. \n\u201COne or three you meant, I see!\u201D said Beorn. \u201CBut these aren\u2019t hobbits, they are dwarves!\u201D \n\u201CThorin Oakenshield, at your service! Dori at your service!\u201D said the two dwarves bowing again. \n\u201CI don\u2019t need your service, thank you,\u201D said Beorn, \u201Cbut I expect you need mine. I am not over fond \nof dwarves; but if it is true you are Thorin (son of Thrain, son of Thror, I believe), and that your \ncompanion is respectable, and that you are enemies of goblins and are not up to any mischief in my \nlands \u2014 what are you up to, by the way?\u201D \n\u201CThey are on their way to visit the land of their fathers, away east beyond Mirkwood,\u201D put in \nGandalf, \u201Cand it is entirely an accident that we are in your lands at all. We were crossing by the High \nPass that should have brought us to the road that lies to the south of your country, when we were \nattacked by the evil goblins \u2014 as I was about to tell you.\u201D \n\u201CGo on telling, then!\u201D said Beorn, who was never very polite. \n\u201CThere was a terrible storm; the stone-giants were out hurling rocks, and at the head of the pass we \ntook refuge in a cave, the hobbit and I and several of our companions...\u201D \n\u201CDo you call two several?\u201D \n\u201CWell, no. As a matter of fact there were more than two.\u201D \n\u201CWhere are they? Killed, eaten, gone home?\u201D \u201CWell, no. They don\u2019t seem all to have come when I \nwhistled. Shy, I expect. You see, we are very much afraid that we are rather a lot for you to entertain.\u201D \n\u201CGo on, whistle again! I am in for a party, it seems, and one or two more won\u2019t make much \ndifference,\u201D growled Beorn. \nGandalf whistled again; but Nori and Ori were there almost before he had stopped, for, if you \nremember, Gandalf had told them to come in pairs every five minutes. \n\u201CHullo!\u201D said Beorn. \u201CYou came pretty quick \u2014 where were you hiding? Come on my jack-in-the- \nboxes!\u201D \n\u201CNori at your service, Ori at...\u201D they began; but Beorn interrupted them. \n\u201CThank you! When I want your help I will ask for it. Sit down, and let\u2019s get on with this tale, or it \nwill be supper-time before it is ended.\u201D \n\u201CAs soon as we were asleep,\u201D went on Gandalf, \u201Ca crack at the back of the cave opened; goblins \ncame out and grabbed the hobbit and the dwarves and our troop of ponies \u2014 \u201D \n\u201CTroop of ponies? What were you \u2014 a travelling circus? Or were you carrying lots of goods? Or do \nyou always call six a troop?\u201D \n\u201CO no! As a matter of fact there were more than six ponies, for there were more than six of us \u2014 and \nwell, here are two more!\u201D Just at that moment Balin and Dwalin appeared and bowed so low that their \nbeards swept the stone floor. The big man was frowning at first, but they did their best to be \nfrightfully polite, and kept on nodding and bending and bowing and waving their hoods before their \nknees (in proper dwarf-fashion), till he stopped frowning and burst into a chuckling laugh: they looked \nso comical. \n\u201CTroop, was right,\u201D he said. \u201CA fine comic one. Come in my merry men, and what are your names? \nI don\u2019t want your service just now, only your names; and then sit down and stop wagging!\u201D \n\u201CBalin and Dwalin,\u201D they said not daring to be offended, and sat flop on the floor looking rather \nsurprised. \n\u201CNow go on again!\u201D said Beorn to the wizard. \u201CWhere was I? O yes \u2014 I was not grabbed. I killed a \ngoblin or two with a flash \u2014 \u201D \n\u201CGood!\u201D growled Beorn. \u201CIt is some good being a wizard, then.\u201D \n\u201C \u2014 and slipped inside the crack before it closed. I followed down into the main hall, which was \ncrowded with goblins. The Great Goblin was there with thirty or forty armed guards. I thought to \nmyself \u2018even if they were not all chained together, what can a dozen do against so many?\u201D\u2019 \n\u201CA dozen! That\u2019s the first time I\u2019ve heard eight called a dozen. Or have you still got some more \njacks that haven\u2019t yet come out of their boxes?\u201D \n\u201CWell, yes, there seem to be a couple more here now \u2014 Fili and Kili, I believe,\u201D said Gandalf, as \nthese two now appeared and stood smiling and bowing. \n\u201CThat\u2019s enough!\u201D said Beorn. \u201CSit down and be quiet! Now go on, Gandalf!\u201D \nSo Gandalf went on with the tale, until he came to the fight in the dark, the discovery of the lower \ngate, and their horror when they found that Mr. Baggins had been mislaid. \u201CWe counted ourselves and \nfound that there was no hobbit. There were only fourteen of us left!\u201D \n\u201CFourteen! That\u2019s the first time I\u2019ve heard one from ten leave fourteen. You mean nine, or else you \nhaven\u2019t told me yet all the names of your party.\u201D \n\u201CWell, of course you haven\u2019t seen Oin and Gloin yet. And, bless me! here they are. I hope you will \nforgive them for bothering you.\u201D \n\u201CO let \u2019em all come! Hurry up! Come along, you two, and sit down! But look here, Gandalf, even \nnow we have only got yourself and ten dwarves and the hobbit that was lost. That only makes eleven \n(plus one mislaid) and not fourteen, unless wizards count differently to other people. But now please \nget on with the tale.\u201D Beorn did not show it more than he could help, but really he had begun to get \nvery interested. You see, in the old days he had known the very part of the mountains that Gandalf was \ndescribing. He nodded and he growled, when he heard of the hobbit\u2019s reappearance and of their \nscramble down the stone-slide and of the wolf-ring in the woods. \nWhen Gandalf came to their climbing into trees with the wolves all underneath, he got up and \nstrode about and muttered: \u201CI wish I had been there! I would have given them more than fireworks!\u201D \n\u201CWell,\u201D said Gandalf very glad to see that his tale was making a good impression, \u201CI did the best I \ncould. There we were with the wolves going mad underneath us and the forest beginning to blaze in \nplaces, when the goblins came down from the hills and discovered us. They yelled with delight and \nsang songs making fun of us. Fifteen birds in five fir-trees ...\u201D \n\u201CGood heavens!\u201D growled Beorn. \u201CDon\u2019t pretend that goblins can\u2019t count. They can. Twelve isn\u2019t \nfifteen and they know it.\u201D \n\u201CAnd so do I. There were Bifur and Bofur as well. I haven\u2019t ventured to introduce them before, but \nhere they are.\u201D \nIn came Bifur and Bofur. \u201CAnd me!\u201D gasped Bombur puffing up behind. He was fat, and also angry \nat being left till last. He refused to wait five minutes, and followed immediately after the other two. \n\u201CWell, now there are fifteen of you; and since goblins can count, I suppose that is all that there \nwere up the trees. Now perhaps we can finish this story without any more interruptions.\u201D Mr. Baggins \nsaw then how clever Gandalf had been. The interruptions had really made Beorn more interested in the \nstory, and the story had kept him from sending the dwarves off at once like suspicious beggars. He \nnever invited people into his house, if he could help it. He had very few friends and they lived a good \nway away; and he never invited more than a couple of these to his house at a time. Now he had got \nfifteen strangers sitting in his porch! \nBy the time the wizard had finished his tale and had told of the eagles\u2019 rescue and of how they had \nall been brought to the Carrock, the sun had fallen behind the peaks of the Misty Mountains and the \nshadows were long in Beorn\u2019s garden. \n\u201CA very good tale!\u201D said he. \u201CThe best I have heard for a long while. If all beggars could tell such a \ngood one, they might find me kinder. You may be making it all up, of course, but you deserve a supper \nfor the story all the same. Let\u2019s have something to eat!\u201D \n\u201CYes please!\u201D they all said together. \u201CThank you very much!\u201D \nInside the hall it was now quite dark. Beorn clapped his hands, and in trotted four beautiful white \nponies and several large long-bodied grey dogs. Beorn said something to them in a queer language like \nanimal noises turned into talk. They went out again and soon came back carrying torches in their \nmouths, which they lit at the fire and stuck in low brackets on the pillars of the hall about the central \nhearth. The dogs could stand on their hind-legs when they wished, and carry things with their fore- \nfeet. Quickly they got out boards and trestles from the side walls and set them up near the fire. \nThen baa \u2014 baa \u2014 baa! was heard, and in came some snow-white sheep led by a large coal-black \nram. One bore a white cloth embroidered at the edges with figures of animals; others bore on their \nbroad backs trays with bowls and platters and knives and wooden spoons, which the dogs took and \nquickly laid on the trestle-tables. These were very low, low enough even for Bilbo to sit at \ncomfortably. Beside them a pony pushed two low-seated benches with wide rush-bottoms and little \nshort thick legs for Gandalf and Thorin, while at the far end he put Beorn\u2019s big black chair of the same \nsort (in which he sat with his great legs stuck far out under the table). These were all the chairs he had \nin his hall, and he probably had them low like the tables for the convenience of the wonderful animals \nthat waited on him. What did the rest sit on? They were not forgotten. The other ponies came in \nrolling round drum-shaped sections of logs, smoothed and polished, and low enough even for Bilbo; so \nsoon they were all seated at Beorn\u2019s table, and the hall had not seen such a gathering for many a year. \nThere they had a supper, or a dinner, such as they had not had since they left the Last Homely \nHouse in the West and said good-bye to Elrond. The light of the torches and the fire flickered about \nthem, and on the table were two tall red beeswax candles. All the time they ate, Beorn in his deep \nrolling voice told tales of the wild lands on this side of the mountains, and especially of the dark and \ndangerous wood, that lay outstretched far to North and South a day\u2019s ride before them, barring their \nway to the East, the terrible forest of Mirkwood. \nThe dwarves listened and shook their beards, for they knew that they must soon venture into that \nforest and that after the mountains it was the worst of the perils they had to pass before they came to \nthe dragon\u2019s stronghold. When dinner was over they began to tell tales of their own, but Beorn seemed \nto be growing drowsy and paid little heed to them. They spoke most of gold and silver and jewels and \nthe making of things by smith-craft, and Beorn did not appear to care for such things: there were no \nthings of gold or silver in his hall, and few save the knives were made of metal at all. \nThey sat long at the table with their wooden drinking-bowls filled with mead. The dark night came \non outside. The fires in the middle of the hall were built with fresh logs and the torches were put out, \nand still they sat in the light of the dancing flames with the pillars of the house standing tall behind \nthem, and dark at the top like trees of the forest. Whether it was magic or not, it seemed to Bilbo that \nhe heard a sound like wind in the branches stirring in the rafters, and the hoot of owls. Soon he began \nto nod with sleep and the voices seemed to grow far away, until he woke with a start. \nThe great door had creaked and slammed. Beorn was gone. The dwarves were sitting cross-legged \non the floor round the fire, and presently they began to sing. Some of the verses were like this, but \nthere were many more, and their singing went on for a long while: \nThe wind was on the withered heath, \nbut in the forest stirred no leaf: \nthere shadows lay by night and day, \nand dark things silent crept beneath. \nThe wind came down from mountains cold, \nand like a tide it roared and rolled; \nthe branches groaned, the forest moaned, \nand leaves were laid upon the mould. \nThe wind went on from West to East; \nall movement in the forest ceased, \nbut shrill and harsh across the marsh \nits whistling voices were released. \nThe grasses hissed, their tassels bent, \nthe reeds were rattling \u2014 on it went \no\u2019er shaken pool under heavens cool \nwhere racing clouds were torn and rent. \nIt passed the lonely Mountain bare \nand swept above the dragon\u2019s lair: \nthere black and dark lay boulders stark \nand flying smoke was in the air. \nIt left the world and took its flight \nover the wide seas of the night. \nThe moon set sail upon the gale, \nand stars were fanned to leaping light. \nBilbo began to nod again. Suddenly up stood Gandalf. \n\u201CIt is time for us to sleep,\u201D he said, \u201C \u2014 for us, but not I think for Beorn. In this hall we can rest \nsound and safe, but I warn you all not to forget what Beorn said before he left us: you must not stray \noutside until the sun is up, on your peril.\u201D \nBilbo found that beds had already been laid at the side of the hall, on a sort of raised platform \nbetween the pillars and the outer wall. For him there was a little mattress of straw and woollen \nblankets. He snuggled into them very gladly, summertime though it was. The fire burned low and he \nfell asleep. Yet in the night he woke: the fire had now sunk to a few embers; the dwarves and Gandalf \nwere all asleep, to judge by their breathing; a splash of white on the floor came from the high moon, \nwhich was peering down through the smoke-hole in the roof. \nThere was a growling sound outside, and a noise as of some great animal scuffling at the door. \nBilbo wondered what it was, and whether it could be Beorn in enchanted shape, and if he would come \nin as a bear and kill them. He dived under the blankets and hid his head, and fell asleep again at last in \nspite of his fears. \nIt was full morning when he awoke. One of the dwarves had fallen over him in the shadows where he \nlay, and had rolled down with a bump from the platform on to the floor. It was Bofur, and he was \ngrumbling about it, when Bilbo opened his eyes. \n\u201CGet up lazybones,\u201D he said, \u201Cor there will be no breakfast left for you.\u201D \nUp jumped Bilbo. \u201CBreakfast!\u201D he cried. \u201CWhere is breakfast?\u201D \n\u201CMostly inside us,\u201D answered the other dwarves who were moving about the hall; \u201Cbut what is left \nis out on the veranda. We have been about looking for Beorn ever since the sun got up; but there is no \nsign of him anywhere, though we found breakfast laid as soon as we went out.\u201D \n\u201CWhere is Gandalf?\u201D asked Bilbo, moving off to find something to eat as quick as he could. \n\u201CO! out and about somewhere,\u201D they told him. But he saw no sign of the wizard all that day until \nthe evening. Just before sunset he walked into the hall, where the hobbit and the dwarves were having \nsupper, waited on by Beorn\u2019 s wonderful animals, as they had been all day. Of Beorn they had seen and \nheard nothing since the night before, and they were getting puzzled. \n\u201CWhere is our host, and where have you been all day yourself?\u201D they all cried. \n\u201COne question at a time \u2014 and none till after supper! I haven\u2019t had a bite since breakfast.\u201D \nAt last Gandalf pushed away his plate and jug \u2014 he had eaten two whole loaves (with masses of \nbutter and honey and clotted cream) and drunk at least a quart of mead \u2014 and he took out his pipe. \u201CI \nwill answer the second question first,\u201D he said, \u201C \u2014 but bless me! this is a splendid place for smoke \nrings!\u201D Indeed for a long time they could get nothing more out of him, he was so busy sending smoke \nrings dodging round the pillars of the hall, changing them into all sorts of different shapes and \ncolours, and setting them at last chasing one another out of the hole in the roof. They must have \nlooked very queer from outside, popping out into the air one after another, green, blue, red, silver- \ngrey, yellow, white; big ones, little ones; little ones dodging through big ones and joining into figure- \neights, and going off like a flock of birds into the distance. \n\u201CI have been picking out bear-tracks,\u201D he said at last. \u201CThere must have been a regular bears\u2019 \nmeeting outside here last night. I soon saw that Beorn could not have made them all: there were far \ntoo many of them, and they were of various sizes too. I should say there were little bears, large bears, \nordinary bears, and gigantic big bears, all dancing outside from dark to nearly dawn. They came from \nalmost every direction, except from the west over the river, from the Mountains. In that direction only \none set of footprints led \u2014 none coming, only ones going away from here. I followed these as far as the \nCarrock. There they disappeared into the river, but the water was too deep and strong beyond the rock \nfor me to cross. It is easy enough, as you remember, to get from this bank to the Carrock by the ford, \nbut on the other side is a cliff standing up from a swirling channel. I had to walk miles before I found \na place where the river was wide and shallow enough for me to wade and swim, and then miles back \nagain to pick up the tracks again. By that time it was too late for me to follow them far. They went \nstraight off in the direction of the pine-woods on the east side of the Misty Mountains, where we had \nour pleasant little party with the Wargs the night before last. And now I think I have answered your \nfirst question, too,\u201D ended Gandalf, and he sat a long while silent. \nBilbo thought he knew what the wizard meant. \u201CWhat shall we do,\u201D he cried, \u201Cif he leads all the \nWargs and the goblins down here? We shall all be caught and killed! I thought you said he was not a \nfriend of theirs.\u201D \n\u201CSo I did. And don\u2019t be silly! You had better go to bed, your wits are sleepy.\u201D \nThe hobbit felt quite crushed, and as there seemed nothing else to do he did go to bed; and while \nthe dwarves were still singing songs he dropped asleep, still puzzling his little head about Beorn, till \nhe dreamed a dream of hundreds of black bears dancing slow heavy dances round and round in the \nmoonlight in the courtyard. Then he woke up when everyone else was asleep, and he heard the same \nscraping, scuffling, snuffling, and growling as before. \nNext morning they were all wakened by Beorn himself. \u201CSo here you all are still!\u201D he said. He \npicked up the hobbit and laughed: \u201CNot eaten up by Wargs or goblins or wicked bears yet I see\u201D; and \nhe poked Mr. Baggins\u2019 waistcoat most disrespectfully. \u201CLittle bunny is getting nice and fat again on \nbread and honey,\u201D he chuckled. \u201CCome and have some more!\u201D \nSo they all went to breakfast with him. Beorn was most jolly for a change; indeed he seemed to be \nin a splendidly good humour and set them all laughing with his funny stories; nor did they have to \nwonder long where he had been or why he was so nice to them, for he told them himself. He had been \nover the river and right back up into the mountains \u2014 from which you can guess that he could travel \nquickly, in bear\u2019s shape at any rate. From the burnt wolf-glade he had soon found out that part of their \nstory was true; but he had found more than that: he had caught a Warg and a goblin wandering in the \nwoods. From these he had got news: the goblin patrols were still hunting with Wargs for the dwarves, \nand they were fiercely angry because of the death of the Great Goblin, and also because of the burning \nof the chief wolf\u2019s nose and the death from the wizard\u2019s fire of many of his chief servants. So much \nthey told him when he forced them, but he guessed there was more wickedness than this afoot, and \nthat a great raid of the whole goblin army with their wolf-allies into the lands shadowed by the \nmountains might soon be made to find the dwarves, or to take vengeance on the men and creatures that \nlived there, and who they thought must be sheltering them. \n\u201CIt was a good story, that of yours,\u201D said Beorn, \u201Cbut I like it still better now I am sure it is true. \nYou must forgive my not taking your word. If you lived near the edge of Mirkwood, you would take \nthe word of no one that you did not know as well as your brother or better. As it is, I can only say that \nI have hurried home as fast as I could to see that you were safe, and to offer you any help that I can. I \nshall think more kindly of dwarves after this. Killed the Great Goblin, killed the Great Goblin!\u201D he \nchuckled fiercely to himself. \n\u201CWhat did you do with the goblin and the Warg?\u201D asked Bilbo suddenly. \n\u201CCome and see!\u201D said Beorn, and they followed round the house. A goblin\u2019s head was stuck outside \nthe gate and a warg-skin was nailed to a tree just beyond. Beorn was a fierce enemy. But now he was \ntheir friend, and Gandalf thought it wise to tell him their whole story and the reason of their journey, \nso that they could get the most help he could offer. \nThis is what he promised to do for them. He would provide ponies for each of them, and a horse for \nGandalf, for their journey to the forest, and he would lade them with food to last them for weeks with \ncare, and packed so as to be as easy as possible to carry \u2014 nuts, flour, sealed jars of dried fruits, and \nred earthenware pots of honey, and twice-baked cakes that would keep good a long time, and on a little \nof which they could march far. The making of these was one of his secrets; but honey was in them, as \nin most of his foods, and they were good to eat, though they made one thirsty. Water, he said, they \nwould not need to carry this side of the forest, for there were streams and springs along the road. \u201CBut \nyour way through Mirkwood is dark, dangerous and difficult,\u201D he said. \u201CWater is not easy to find \nthere, nor food. The time is not yet come for nuts (though it may be past and gone indeed before you \nget to the other side), and nuts are about all that grows there fit for food; in there the wild things are \ndark, queer, and savage. I will provide you with skins for carrying water, and I will give you some \nbows and arrows. But I doubt very much whether anything you find in Mirkwood will be wholesome \nto eat or to drink. There is one stream there, I know, black and strong which crosses the path. That you \nshould neither drink of, nor bathe in; for I have heard that it carries enchantment and a great \ndrowsiness and forgetfulness. And in the dim shadows of that place I don\u2019t think you will shoot \nanything, wholesome or unwholesome, without straying from the path. That you MUST NOT do, for \nany reason. \n\u201CThat is all the advice I can give you. Beyond the edge of the forest I cannot help you much; you \nmust depend on your luck and your courage and the food I send with you. At the gate of the forest I \nmust ask you to send back my horse and my ponies. But I wish you all speed, and my house is open to \nyou, if ever you come back this way again.\u201D \nThey thanked him, of course, with many bows and sweepings of their hoods and with many an \u201Cat your \nservice, O master of the wide wooden halls!\u201D But their spirits sank at his grave words, and they all felt \nthat the adventure was far more dangerous than they had thought, while all the time, even if they \npassed all the perils of the road, the dragon was waiting at the end. \nAll that morning they were busy with preparations. Soon after midday they ate with Beorn for the \nlast time, and after the meal they mounted the steeds he was lending them, and bidding him many \nfarewells they rode off through his gate at a good pace. \nAs soon as they left his high hedges at the east of his fenced lands they turned north and then bore \nto the north-west. By his advice they were no longer making for the main forest-road to the south of \nhis land. Had they followed the pass, their path would have led them down a stream from the \nmountains that joined the great river miles south of the Carrock. At that point there was a deep ford \nwhich they might have passed, if they had still had their ponies, and beyond that a track led to the \nskirts of the wood and to the entrance of the old forest road. But Beorn had warned them that that way \nwas now often used by the goblins, while the forest-road itself, he had heard, was overgrown and \ndisused at the eastern end and led to impassable marshes where the paths had long been lost. Its \neastern opening had also always been far to the south of the Lonely Mountain, and would have left \nthem still with a long and difficult northward march when they got to the other side. North of the \nCarrock the edge of Mirkwood drew closer to the borders of the Great River, and though here the \nMountains too drew down nearer, Beorn advised them to take this way; for at a place a few days\u2019 ride \ndue north of the Carrock was the gate of a little-known pathway through Mirkwood that led almost \nstraight towards the Lonely Mountain. \n\u201CThe goblins,\u201D Beorn had said, \u201Cwill not dare to cross the Great River for a hundred miles north of \nthe Carrock nor to come near my house \u2014 it is well protected at night! \u2014 but I should ride fast; for if \nthey make their raid soon they will cross the river to the south and scour all the edge of the forest so as \nto cut you off, and Wargs run swifter than ponies. Still you are safer going north, even though you \nseem to be going back nearer to their strongholds; for that is what they will least expect, and they will \nhave the longer ride to catch you. Be off now as quick as you may!\u201D \nThat is why they were now riding in silence, galloping wherever the ground was grassy and \nsmooth, with the mountains dark on their left, and in the distance the line of the river with its trees \ndrawing ever closer. The sun had only just turned west when they started, and till evening it lay golden \non the land about them. It was difficult to think of pursuing goblins behind, and when they had put \nmany miles between them and Beorn\u2019 s house they began to talk and to sing again and to forget the \ndark forest-path that lay in front. But in the evening when the dusk came on and the peaks of the \nmountains glowered against the sunset they made a camp and set a guard, and most of them slept \nuneasily with dreams in which there came the howl of hunting wolves and the cries of goblins. \nStill the next morning dawned bright and fair again. There was an autumn-like mist white upon the \nground and the air was chill, but soon the sun rose red in the East and the mists vanished, and while \nthe shadows were still long they were off again. So they rode now for two more days, and all the while \nthey saw nothing save grass and flowers and birds and scattered trees, and occasionally small herds of \nred deer browsing or sitting at noon in the shade. Sometimes Bilbo saw the horns of the harts sticking \nup out of the long grass, and at first he thought they were the dead branches of trees. That third \nevening they were so eager to press on, for Beorn had said that they should reach the forest-gate early \non the fourth-day, that they rode still forward after dusk and into the night beneath the moon. As the \nlight faded Bilbo thought he saw away to the right, or to the left, the shadowy form of a great bear \nprowling along in the same direction. But if he dared to mention it to Gandalf, the wizard only said: \n\u201CHush! Take no notice!\u201D \nNext day they started before dawn, though their night had been short. As soon as it was light they \ncould see the forest coming as it were to meet them, or waiting for them like a black and frowning \nwall before them. The land began to slope up and up, and it seemed to the hobbit that a silence began \nto draw in upon them. Birds began to sing less. There were no more deer; not even rabbits were to be \nseen. By the afternoon they had reached the eaves of Mirkwood, and were resting almost beneath the \ngreat overhanging boughs of its outer trees. Their trunks were huge and gnarled, their branches \ntwisted, their leaves were dark and long. Ivy grew on them and trailed along the ground. \n\u201CWell, here is Mirkwood!\u201D said Gandalf. \u201CThe greatest of the forests of the Northern world. I hope \nyou like the look of it. Now you must send back these excellent ponies you have borrowed.\u201D \nThe dwarves were inclined to grumble at this, but the wizard told them they were fools. \u201CBeorn is \nnot as far off as you seem to think, and you had better keep your promises anyway, for he is a bad \nenemy. Mr. Baggins\u2019 eyes are sharper than yours, if you have not seen each night after dark a great \nbear going along with us or sitting far off in the moon watching our camps. Not only to guard you and \nguide you, but to keep an eye on the ponies too. Beorn may be your friend, but he loves his animals as \nhis children. You do not guess what kindness he has shown you in letting dwarves ride them so far and \nso fast, nor what would happen to you, if you tried to take them into the forest.\u201D \n\u201CWhat about the horse, then?\u201D said Thorin. \u201CYou don\u2019t mention sending that back.\u201D \n\u201CI don\u2019t, because I am not sending it.\u201D \n\u201CWhat about your promise then?\u201D \n\u201CI will look after that. I am not sending the horse back, I am riding it!\u201D \nThen they knew that Gandalf was going to leave them at the very edge of Mirkwood, and they were \nin despair. But nothing they could say would change his mind. \n\u201CNow we had this all out before, when we landed on the Carrock,\u201D he said. \u201CIt is no use arguing. I \nhave, as I told you, some pressing business away south; and I am already late through bothering with \nyou people. We may meet again before all is over, and then again of course we may not. That depends \non your luck and on your courage and sense; and I am sending Mr. Baggins with you. I have told you \nbefore that he has more about him than you guess, and you will find that out before long. So cheer up \nBilbo and don\u2019t look so glum. Cheer up Thorin and Company! This is your expedition after all. Think \nof the treasure at the end, and forget the forest and the dragon, at any rate until tomorrow morning!\u201D \nWhen tomorrow morning came he still said the same. So now there was nothing left to do but to \nfill their water-skins at a clear spring they found close to the forest-gate, and unpack the ponies. They \ndistributed the packages as fairly as they could, though Bilbo thought his lot was wearisomely heavy, \nand did not at all like the idea of trudging for miles and miles with all that on his back. \n\u201CDon\u2019t you worry!\u201D said Thorin. \u201CIt will get lighter all too soon. Before long I expect we shall all \nwish our packs heavier, when the food begins to run short.\u201D \nThen at last they said good-bye to their ponies and turned their heads for home. Off they trotted \ngaily, seeming very glad to put their tails towards the shadow of Mirkwood. As they went away Bilbo \ncould have sworn that a thing like a bear left the shadow of the trees and shambled off quickly after \nthem. \nNow Gandalf too said farewell. Bilbo sat on the ground feeling very unhappy and wishing he was \nbeside the wizard on his tall horse. He had gone just inside the forest after breakfast (a very poor one), \nand it had seemed as dark in there in the morning as at night, and very secret: \u201Ca sort of watching and \nwaiting feeling,\u201D he said to himself. \n\u201CGood-bye!\u201D said Gandalf to Thorin. \u201CAnd goodbye to you all, good-bye! Straight through the \nforest is your way now. Don\u2019t stray off the track! \u2014 if you do, it is a thousand to one you will never \nfind it again and never get out of Mirkwood; and then I don\u2019t suppose I, or any one else, will ever see \nyou again.\u201D \n\u201CDo we really have to go through?\u201D groaned the hobbit. \n\u201CYes, you do!\u201D said the wizard, \u201Cif you want to get to the other side. You must either go through or \ngive up your quest. And I am not going to allow you to back out now, Mr. Baggins. I am ashamed of \nyou for thinking of it. You have got to look after all these dwarves for me,\u201D he laughed. \n\u201CNo! no!\u201D said Bilbo. \u201CI didn\u2019t mean that. I meant, is there no way round?\u201D \n\u201CThere is, if you care to go two hundred miles or so out of your way north, and twice that south. \nBut you wouldn\u2019t get a safe path even then. There are no safe paths in this part of the world. \nRemember you are over the Edge of the Wild now, and in for all sorts of fun wherever you go. Before \nyou could get round Mirkwood in the North you would be right among the slopes of the Grey \nMountains, and they are simply stiff with goblins, hobgoblins, and ores of the worst description. \nBefore you could get round it in the South, you would get into the land of the Necromancer; and even \nyou, Bilbo, won\u2019t need me to tell you tales of that black sorcerer. I don\u2019t advise you to go anywhere \nnear the places overlooked by his dark tower! Stick to the forest-track, keep your spirits up, hope for \nthe best, and with a tremendous slice of luck you may come out one day and see the Long \nMarshes lying below you, and beyond them, high in the East, the Lonely Mountain where dear old \nSmaug lives, though I hope he is not expecting you.\u201D \n\u201CVery comforting you are to be sure,\u201D growled Thorin. \u201CGood-bye! If you won\u2019t come with us, you \nhad better get off without any more talk!\u201D \n\u201CGood-bye then, and really good-bye!\u201D said Gandalf, and he turned his horse and rode down into \nthe West. But he could not resist the temptation to have the last word. Before he had passed quite out \nof hearing he turned and put his hands to his mouth and called to them. They heard his voice come \nfaintly: \u201CGood-bye! Be good, take care of yourselves \u2014 and DON\u2019T LEAVE THE PATH!\u201D \nThen he galloped away and was soon lost to sight. \u201CO good-bye and go away!\u201D grunted the \ndwarves, all the more angry because they were really filled with dismay at losing him. Now began the \nmost dangerous part of all the journey. They each shouldered the heavy pack and the water-skin which \nwas their share, and turned from the light that lay on the lands outside and plunged into the forest. \nChapter VTIT \nFETES AND SPIDERS \nThey walked in single file. The entrance to the path was like a sort of arch leading into a gloomy \ntunnel made by two great trees that leant together, too old and strangled with ivy and hung with lichen \nto bear more than a few blackened leaves. The path itself was narrow and wound in and out among the \ntrunks. Soon the light at the gate was like a little bright hole far behind, and the quiet was so deep that \ntheir feet seemed to thump along while all the trees leaned over them and listened. \nAs their eyes became used to the dimness they could see a little way to either side in a sort of \ndarkened green glimmer. Occasionally a slender beam of sun that had the luck to slip in through some \nopening in the leaves far above, and still more luck in not being caught in the tangled boughs and \nmatted twigs beneath, stabbed down thin and bright before them. But this was seldom, and it soon \nceased altogether. \nThere were black squirrels in the wood. As Bilbo\u2019s sharp inquisitive eyes got used to seeing things \nhe could catch glimpses of them whisking off the path and scuttling behind tree-trunks. There were \nqueer noises too, grunts, scufflings, and hurryings in the undergrowth, and among the leaves that lay \npiled endlessly thick in places on the forest-floor; but what made the noises he could not see. The \nnastiest things they saw were the cobwebs: dark dense cobwebs with threads extraordinarily thick, \noften stretched from tree to tree, or tangled in the lower branches on either side of them. There were \nnone stretched across the path, but whether because some magic kept it clear, or for what other reason \nthey could not guess. \nIt was not long before they grew to hate the forest as heartily as they had hated the tunnels of the \ngoblins, and it seemed to offer even less hope of any ending. But they had to go on and on, long after \nthey were sick for a sight of the sun and of the sky, and longed for the feel of wind on their faces. \nThere was no movement of air down under the forest-roof, and it was everlastingly still and dark and \nstuffy. Even the dwarves felt it, who were used to tunnelling, and lived at times for long whiles \nwithout the light of the sun; but the hobbit, who liked holes to make a house in but not to spend \nsummer days in, felt that he was being slowly suffocated. \nThe nights were the worst. It then became pitch-dark \u2014 not what you call pitch-dark, but really \npitch: so black that you really could see nothing. Bilbo tried flapping his hand in front of his nose, but \nhe could not see it at all. Well, perhaps it is not true to say that they could see nothing: they could see \neyes. They slept all closely huddled together, and took it in turns to watch; and when it was Bilbo\u2019s \nturn he would see gleams in the darkness round them, and sometimes pairs of yellow or red or green \neyes would stare at him from a little distance, and then slowly fade and disappear and slowly shine out \nagain in another place. And sometimes they would gleam down from the branches just above him; and \nthat was most terrifying. But the eyes that he liked the least were horrible pale bulbous sort of eyes. \n\u201CInsect eyes,\u201D he thought, \u201Cnot animal eyes, only they are much too big.\u201D \nAlthough it was not yet very cold, they tried lighting watch-fires at night, but they soon gave that \nup. It seemed to bring hundreds and hundreds of eyes all round them, though the creatures, whatever \nthey were, were careful never to let their bodies show in the little flicker of the flames. Worse still it \nbrought thousands of dark-grey and black moths, some nearly as big as your hand, flapping and \nwhirring round their ears. They could not stand that, nor the huge bats, black as a top-hat, either; so \nthey gave up fires and sat at night and dozed in the enormous uncanny darkness. \nAll this went on for what seemed to the hobbit ages upon ages; and he was always hungry, for they \nwere extremely careful with their provisions. Even so, as days followed days, and still the forest \nseemed just the same, they began to get anxious. The food would not last for ever: it was in fact \nalready beginning to get low. They tried shooting at the squirrels, and they wasted many arrows before \nthey managed to bring one down on the path. But when they roasted it, it proved horrible to taste, and \nthey shot no more squirrels. \nThey were thirsty too, for they had none too much water, and in all the time they had seen neither \nspring nor stream. This was their state when one day they found their path blocked by a running water. \nIt flowed fast and strong but not very wide right across the way, and it was black, or looked it in the \ngloom. It was well that Beorn had warned them against it, or they would have drunk from it, whatever \nits colour, and filled some of their emptied skins at its bank. As it was they only thought of how to \ncross it without wetting themselves in its water. There had been a bridge of wood across, but it had \nrotted and fallen leaving only the broken posts near the bank. \nBilbo kneeling on the brink and peering forward cried: \u201CThere is a boat against the far bank! Now \nwhy couldn\u2019t it have been this side!\u201D \n\u201CHow far away do you think it is?\u201D asked Thorin, for by now they knew Bilbo had the sharpest eyes \namong them. \n\u201CNot at all far. I shouldn\u2019t think above twelve yards.\u201D \n\u201CTwelve yards! I should have thought it was thirty at least, but my eyes don\u2019t see as well as they \nused a hundred years ago. Still twelve yards is as good as a mile. We can\u2019t jump it, and we daren\u2019t try \nto wade or swim.\u201D \n\u201CCan any of you throw a rope?\u201D \n\u201CWhat\u2019s the good of that? The boat is sure to be tied up, even if we could hook it, which I doubt.\u201D \n\u201CI don\u2019t believe it is tied,\u201D said Bilbo, \u201Cthough of course I can\u2019t be sure in this light; but it looks to \nme as if it was just drawn up on the bank, which is low just there where the path goes down into the \nwater.\u201D \n\u201CDori is the strongest, but Fili is the youngest and still has the best sight,\u201D said Thorin. \u201CCome here \nFili, and see if you can see the boat Mr. Baggins is talking about.\u201D \nFili thought he could; so when he had stared a long while to get an idea of the direction, the others \nbrought him a rope. They had several with them, and on the end of the longest they fastened one of the \nlarge iron hooks they had used for catching their packs to the straps about their shoulders. Fili took \nthis in his hand, balanced it for a moment, and then flung it across the stream. \nSplash it fell in the water! \u201CNot far enough!\u201D said Bilbo who was peering forward. \u201CA couple of \nfeet and you would have dropped it on to the boat. Try again. I don\u2019t suppose the magic is strong \nenough to hurt you, if you just touch a bit of wet rope.\u201D \nFili picked up the hook when he had drawn it back, rather doubtfully all the same. This time he \nthrew it with great strength. \n\u201CSteady!\u201D said Bilbo, \u201Cyou have thrown it right into the wood on the other side now. Draw it back \ngently.\u201D Fili hauled the rope back slowly, and after a while Bilbo said: \u201CCarefully! It is lying on the \nboat; let\u2019s hope the hook will catch.\u201D \nIt did. The rope went taut, and Fili pulled in vain. Kili came to his help, and then Oin and Gloin. \nThey tugged and tugged, and suddenly they all fell over on their backs. Bilbo was on the look out, \nhowever, caught the rope, and with a piece of stick fended off the little black boat as it came rushing \nacross the stream. \u201CHelp!\u201D he shouted, and Balin was just in time to seize the boat before it floated off \ndown the current. \n\u201CIt was tied after all,\u201D said he, looking at the snapped painter that was still dangling from it. \u201CThat \nwas a good pull, my lads; and a good job that our rope was the stronger.\u201D \n\u201CWho\u2019ll cross first?\u201D asked Bilbo. \n\u201CI shall,\u201D said Thorin, \u201Cand you will come with me, and Fili and Balin. That\u2019s as many as the boat \nwill hold at a time. After that Kili and Oin and Gloin and Dori; next Ori and Nori, Bifur and Bofur; \nand last Dwalin and Bombur.\u201D \n\u201CI\u2019m always last and I don\u2019t like it,\u201D said Bombur. \u201CIt\u2019s somebody else\u2019s turn today.\u201D \n\u201CYou should not be so fat. As you are, you must be with the last and lightest boatload. Don\u2019t start \ngrumbling against orders, or something bad will happen to you.\u201D \n\u201CThere aren\u2019t any oars. How are you going to push the boat back to the far bank?\u201D asked the hobbit. \n\u201CGive me another length of rope and another hook,\u201D said Fili, and when they had got it ready, he \ncast it into the darkness ahead and as high as he could throw it. Since it did not fall down again, they \nsaw that it must have stuck in the branches. \u201CGet in now,\u201D said Fili, \u201Cand one of you haul on the rope \nthat is stuck in a tree on the other side. One of the others must keep hold of the hook we used at first, \nand when we are safe on the other side he can hook it on, and you can draw the boat back.\u201D \nIn this way they were all soon on the far bank safe across the enchanted stream. Dwalin had just \nscrambled out with the coiled rope on his arm, and Bombur (still grumbling) was getting ready to \nfollow, when something bad did happen. There was a flying sound of hooves on the path ahead. Out of \nthe gloom came suddenly the shape of a flying deer. It charged into the dwarves and bowled them \nover, then gathered itself for a leap. High it sprang and cleared the water with a mighty jump. But it \ndid not reach the other side in safety. Thorin was the only one who had kept his feet and his wits. As \nsoon as they had landed he had bent his bow and fitted an arrow in case any hidden guardian of the \nboat appeared. Now he sent a swift and sure shot into the leaping beast. As it reached the further bank \nit stumbled. The shadows swallowed it up, but they heard the sound of hooves quickly falter and then \ngo still. \nBefore they could shout in praise of the shot, however, a dreadful wail from Bilbo put all thoughts \nof venison out of their minds. \u201CBombur has fallen in! Bombur is drowning!\u201D he cried. It was only too \ntrue. Bombur had only one foot on the land when the hart bore down on him, and sprang over him. He \nhad stumbled, thrusting the boat away from the bank, and then toppled back into the dark water, his \nhands slipping off the slimy roots at the edge, while the boat span slowly off and disappeared. \nThey could still see his hood above the water when they ran to the bank. Quickly, they flung a rope \nwith a hook towards him. His hand caught it, and they pulled him to the shore. He was drenched from \nhair to boots, of course, but that was not the worst. When they laid him on the bank he was already fast \nasleep, with one hand clutching the rope so tight that they could not get it from his grasp; and fast \nasleep he remained in spite of all they could do. \nThey were still standing over him, cursing their ill luck, and Bombur\u2019 s clumsiness, and lamenting \nthe loss of the boat which made it impossible for them to go back and look for the hart, when they \nbecame aware of the dim blowing of horns in the wood and the sound as of dogs baying far off. Then \nthey all fell silent; and as they sat it seemed they could hear the noise of a great hunt going by to the \nnorth of the path, though they saw no sign of it. \nThere they sat for a long while and did not dare to make a move. Bombur slept on with a smile on \nhis fat face, as if he no longer cared for all the troubles that vexed them. Suddenly on the path ahead \nappeared some white deer, a hind and fawns as snowy white as the hart had been dark. They \nglimmered in the shadows. Before Thorin could cry out three of the dwarves had leaped to their feet \nand loosed off arrows from their bows. None seemed to find their mark. The deer turned and vanished \nin the trees as silently as they had come, and in vain the dwarves shot their arrows after them. \n\u201CStop! stop!\u201D shouted Thorin; but it was too late, the excited dwarves had wasted their last arrows, \nand now the bows that Beorn had given them were useless. \nThey were a gloomy party that night, and the gloom gathered still deeper on them in the following \ndays. They had crossed the enchanted stream; but beyond it the path seemed to straggle on just as \nbefore, and in the forest they could see no change. Yet if they had known more about it and considered \nthe meaning of the hunt and the white deer that had appeared upon their path, they would have known \nthat they were at last drawing towards the eastern edge, and would soon have come, if they could have \nkept up their courage and their hope, to thinner trees and places where the sunlight came again. \nBut they did not know this, and they were burdened with the heavy body of Bombur, which they \nhad to carry along with them as best they could, taking the wearisome task in turns of four each while \nthe others shared their packs. If these had not become all too light in the last few days, they would \nnever have managed it; but a slumbering and smiling Bombur was a poor exchange for packs filled \nwith food however heavy. In a few days a time came when there was practically nothing left to eat or \nto drink. Nothing wholesome could they see growing in the wood, only funguses and herbs with pale \nleaves and unpleasant smell. \nAbout four days from the enchanted stream they came to a part where most of the trees were \nbeeches. They were at first inclined to be cheered by the change, for here there was no undergrowth \nand the shadow was not so deep. There was a greenish light about them, and in places they could see \nsome distance to either side of the path. Yet the light only showed them endless lines of straight grey \ntrunks like the pillars of some huge twilight hall. There was a breath of air and a noise of wind, but it \nhad a sad sound. A few leaves came rustling down to remind them that outside autumn was coming on. \nTheir feet ruffled among the dead leaves of countless other autumns that drifted over the banks of the \npath from the deep red carpets of the forest. \nStill Bombur slept and they grew very weary. At times they heard disquieting laughter. Sometimes \nthere was singing in the distance too. The laughter was the laughter of fair voices not of goblins, and \nthe singing was beautiful, but it sounded eerie and strange, and they were not comforted, rather they \nhurried on from those parts with what strength they had left. \nTwo days later they found their path going downwards, and before long they were in a valley filled \nalmost entirely with a mighty growth of oaks. \n\u201CIs there no end to this accursed forest?\u201D said Thorin. \u201CSomebody must climb a tree and see if he \ncan get his head above the roof and have a look round. The only way is to choose the tallest tree that \noverhangs the path.\u201D \nOf course \u201Csomebody\u201D meant Bilbo. They chose him, because to be of any use the climber must get \nhis head above the topmost leaves, and so he must be light enough for the highest and slenderest \nbranches to bear him. Poor Mr. Baggins had never had much practice in climbing trees, but they \nhoisted him up into the lowest branches of an enormous oak that grew right out into the path, and up \nhe had to go as best he could. He pushed his way through the tangled twigs with many a slap in the \neye; he was greened and grimed from the old bark of the greater boughs; more than once he slipped \nand caught himself just in time; and at last, after a dreadful struggle in a difficult place where there \nseemed to be no convenient branches at all, he got near the top. All the time he was wondering \nwhether there were spiders in the tree, and how he was going to get down again (except by falling). \nIn the end he poked his head above the roof of leaves, and then he found spiders all right. But they \nwere only small ones of ordinary size, and they were after the butterflies. Bilbo\u2019s eyes were nearly \nblinded by the light. He could hear the dwarves shouting up at him from far below, but he could not \nanswer, only hold on and blink. The sun was shining brilliantly, and it was a long while before he \ncould bear it. When he could, he saw all round him a sea of dark green, ruffled here and there by the \nbreeze; and there were everywhere hundreds of butterflies. I expect they were a kind of \u201Cpurple \nemperor\u201D, a butterfly that loves the tops of oak-woods, but these were not purple at all, they were a \ndark dark velvety black without any markings to be seen. \nHe looked at the \u201Cblack emperors\u201D for a long time, and enjoyed the feel of the breeze in his hair \nand on his face; but at length the cries of the dwarves, who were now simply stamping with \nimpatience down below, reminded him of his real business. It was no good. Gaze as much as he might, \nhe could see no end to the trees and the leaves in any direction. His heart, that had been lightened by \nthe sight of the sun and the feel of the wind, sank back into his toes: there was no food to go back to \ndown below. \nActually, as I have told you, they were not far off the edge of the forest; and if Bilbo had had the \nsense to see it, the tree that he had climbed, though it was tall in itself, was standing near the bottom \nof a wide valley, so that from its top the trees seemed to swell up all round like the edges of a great \nbowl, and he could not expect to see how far the forest lasted. Still he did not see this, and he climbed \ndown full of despair. He got to the bottom again at last, scratched, hot, and miserable, and he could not \nsee anything in the gloom below when he got there. His report soon made the others as miserable as he \nwas. \n\u201CThe forest goes on for ever and ever and ever in all directions! Whatever shall we do? And what is \nthe use of sending a hobbit!\u201D they cried, as if it was his fault. They did not care tuppence about the \nbutterflies, and were only made more angry when he told them of the beautiful breeze, which they \nwere too heavy to climb up and feel. \nThat night they ate their very last scraps and crumbs of food; and next morning when they woke the \nfirst thing they noticed was that they were still gnawingly hungry, and the next thing was that it was \nraining and that here and there the drip of it was dropping heavily on the forest floor. That only \nreminded them that they were also parchingly thirsty, without doing anything to relieve them: you \ncannot quench a terrible thirst by standing under giant oaks and waiting for a chance drip to fall on \nyour tongue. The only scrap of comfort there was came unexpectedly from Bombur. \nHe woke up suddenly and sat up scratching his head. He could not make out where he was at all, \nnor why he felt so hungry; for he had forgotten everything that had happened since they started their \njourney that May morning long ago. The last thing that he remembered was the party at the hobbit\u2019s \nhouse, and they had great difficulty in making him believe their tale of all the many adventures they \nhad had since. \nWhen he heard that there was nothing to eat, he sat down and wept, for he felt very weak and \nwobbly in the legs. \u201CWhy ever did I wake up!\u201D he cried. \u201CI was having such beautiful dreams. I \ndreamed I was walking in a forest rather like this one, only lit with torches on the trees and lamps \nswinging from the branches and fires burning on the ground; and there was a great feast going on, \ngoing on for ever. A woodland king was there with a crown of leaves, and there was a merry singing, \nand I could not count or describe the things there were to eat and drink.\u201D \n\u201CYou need not try,\u201D said Thorin. \u201CIn fact if you can\u2019t talk about something else, you had better be \nsilent. We are quite annoyed enough with you as it is. If you hadn\u2019t waked up, we should have left you \nto your idiotic dreams in the forest; you are no joke to carry even after weeks of short commons.\u201D \nThere was nothing now to be done but to tighten the belts round their empty stomachs, and hoist \ntheir empty sacks and packs, and trudge along the track without any great hope of ever getting to the \nend before they lay down and died of starvation. This they did all that day, going very slowly and \nwearily; while Bombur kept on wailing that his legs would not carry him and that he wanted to lie \ndown and sleep. \n\u201CNo you don\u2019t!\u201D they said. \u201CLet your legs take their share, we have carried you far enough.\u201D \nAll the same he suddenly refused to go a step further and flung himself on the ground. \u201CGo on, if \nyou must,\u201D he said. \u201CI\u2019m just going to lie here and sleep and dream of food, if I can\u2019t get it any other \nway. I hope I never wake up again.\u201D \nAt that very moment Balin, who was a little way ahead, called out: \u201CWhat was that? I thought I saw \na twinkle of light in the forest.\u201D \nThey all looked, and a longish way off, it seemed, they saw a red twinkle in the dark; then another \nand another sprang out beside it. Even Bombur got up, and they hurried along then, not caring if it was \ntrolls or goblins. The light was in front of them and to the left of the path, and when at last they had \ndrawn level with it, it seemed plain that torches and fires were burning under the trees, but a good way \noff their track. \n\u201CIt looks as if my dreams were coming true,\u201D gasped Bombur puffing up behind. He wanted to rush \nstraight off into the wood after the lights. But the others remembered only too well the warnings of the \nwizard and of Beorn. \n\u201CA feast would be no good, if we never got back alive from it,\u201D said Thorin. \n\u201CBut without a feast we shan\u2019t remain alive much longer anyway,\u201D said Bombur, and Bilbo heartily \nagreed with him. They argued about it backwards and forwards for a long while, until they agreed at \nlength to send out a couple of spies, to creep near the lights and find out more about them. But then \nthey could not agree on who was to be sent: no one seemed anxious to run the chance of being lost and \nnever finding his friends again. In the end, in spite of warnings, hunger decided them, because Bombur \nkept on describing all the good things that were being eaten, according to his dream, in the woodland \nfeast; so they all left the path and plunged into the forest together. \nAfter a good deal of creeping and crawling they peered round the trunks and looked into a clearing \nwhere some trees had been felled and the ground levelled. There were many people there, elvish- \nlooking folk, all dressed in green and brown and sitting on sawn rings of the felled trees in a great \ncircle. There was a fire in their midst and there were torches fastened to some of the trees round about; \nbut most splendid sight of all: they were eating and drinking and laughing merrily. \nThe smell of the roast meats was so enchanting that, without waiting to consult one another, every \none of them got up and scrambled forwards into the ring with the one idea of begging for some food. \nNo sooner had the first stepped into the clearing than all the lights went out as if by magic. Somebody \nkicked the fire and it went up in rockets of glittering sparks and vanished. They were lost in a \ncompletely lightless dark and they could not even find one another, not for a long time at any rate. \nAfter blundering frantically in the gloom, falling over logs, bumping crash into trees, and shouting \nand calling till they must have waked everything in the forest for miles, at last they managed to gather \nthemselves in a bundle and count themselves by touch. By that time they had, of course, quite \nforgotten in what direction the path lay, and they were all hopelessly lost, at least till morning. \nThere was nothing for it but to settle down for the night where they were; they did not even dare to \nsearch on the ground for scraps of food for fear of becoming separated again. But they had not been \nlying long, and Bilbo was only just getting drowsy, when Dori, whose turn it was to watch first, said in \na loud whisper: \n\u201CThe lights are coming out again over there, and there are more than ever of them.\u201D \nUp they all jumped. There, sure enough, not far away were scores of twinkling lights, and they \nheard the voices and the laughter quite plainly. They crept slowly towards them, in a single line, each \ntouching the back of the one in front. When they got near Thorin said: \u201CNo rushing forward this time! \nNo one is to stir from hiding till I say. I shall send Mr. Baggins alone first to talk to them. They won\u2019t \nbe frightened of him \u2014 (\u2018What about me of them?\u2019 thought Bilbo) \u2014 and any way I hope they won\u2019t do \nanything nasty to him.\u201D \nWhen they got to the edge of the circle of lights they pushed Bilbo suddenly from behind. Before \nhe had time to slip on his ring, he stumbled forward into the full blaze of the fire and torches. It was \nno good. Out went all the lights again and complete darkness fell. \nIf it had been difficult collecting themselves before, it was far worse this time. And they simply \ncould not find the hobbit. Every time they counted themselves it only made thirteen. They shouted and \ncalled: \u201CBilbo Baggins! Hobbit! You dratted hobbit! Hi! hobbit, confusticate you, where are you?\u201D and \nother things of that sort, but there was no answer. \nThey were just giving up hope, when Dori stumbled across him by sheer luck. In the dark he fell \nover what he thought was a log, and he found it was the hobbit curled up fast asleep. It took a deal of \nshaking to wake him, and when he was awake he was not pleased at all. \n\u201CI was having such a lovely dream,\u201D he grumbled, \u201Call about having a most gorgeous dinner.\u201D \n\u201CGood heavens! he has gone like Bombur,\u201D they said. \u201CDon\u2019t tell us about dreams. Dream-dinners \naren\u2019t any good, and we can\u2019t share them.\u201D \n\u201CThey are the best I am likely to get in this beastly place,\u201D he muttered, as he lay down beside the \ndwarves and tried to go back to sleep and find his dream again. But that was not the last of the lights \nin the forest. Later when the night must have been getting old, Kili who was watching then, came and \nroused them all again, saying: \n\u201CThere\u2019s a regular blaze of light begun not far away \u2014 hundreds of torches and many fires must \nhave been lit suddenly and by magic. And hark to the singing and the harps!\u201D \nAfter lying and listening for a while, they found they could not resist the desire to go nearer and try \nonce more to get help. Up they got again; and this time the result was disastrous. The feast that they \nnow saw was greater and more magnificent than before; and at the head of a long line of feasters sat a \nwoodland king with a crown of leaves upon his golden hair, very much as Bombur had described the \nfigure in his dream. The elvish folk were passing bowls from hand to hand and across the fires, and \nsome were harping and many were singing. Their gleaming hair was twined with flowers; green and \nwhite gems glinted on their collars and their belts; and their faces and their songs were filled with \nmirth. Loud and clear and fair were those songs, and out stepped Thorin in to their midst. \nDead silence fell in the middle of a word. Out went all light. The fires leaped up in black smokes. \nAshes and cinders were in the eyes of the dwarves, and the wood was filled again with their clamour \nand their cries. \nBilbo found himself running round and round (as he thought) and calling and calling: \u201CDori, Nori, \nOri, Oin, Gloin, Lili, Kili, Bombur, Bifur, Bofur, Dwalin, Balin, Thorin Oakenshield,\u201D while people he \ncould not see or feel were doing the same all round him (with an occasional \u201CBilbo!\u201D thrown in). But \nthe cries of the others got steadily further and fainter, and though after a while it seemed to him they \nchanged to yells and cries for help in the far distance, all noise at last died right away, and he was left \nalone in complete silence and darkness. \nThat was one of his most miserable moments. But he soon made up his mind that it was no good \ntrying to do anything till day came with some little light, and quite useless to go blundering about \ntiring himself out with no hope of any breakfast to revive him. So he sat himself down with his back to \na tree, and not for the last time fell to thinking of his far-distant hobbit-hole with its beautiful pantries. \nHe was deep in thoughts of bacon and eggs and toast and butter when he felt something touch him. \nSomething like a strong sticky string was against his left hand, and when he tried to move he found \nthat his legs were already wrapped in the same stuff, so that when he got up he fell over. \nThen the great spider, who had been busy tying him up while he dozed, came from behind him and \ncame at him. He could only see the thing\u2019s eyes, but he could feel its hairy legs as it struggled to wind \nits abominable threads round and round him. It was lucky that he had come to his senses in time. Soon \nhe would not have been able to move at all. As it was, he had a desperate fight before he got free. He \nbeat the creature off with his hands \u2014 it was trying to poison him to keep him quiet, as small spiders \ndo to flies \u2014 until he remembered his sword and drew it out. Then the spider jumped back, and he had \ntime to cut his legs loose. After that it was his turn to attack. The spider evidently was not used to \nthings that carried such stings at their sides, or it would have hurried away quicker. Bilbo came at it \nbefore it could disappear and stuck it with his sword right in the eyes. Then it went mad and leaped \nand danced and flung out its legs in horrible jerks, until he killed it with another stroke; and then he \nfell down and remembered nothing more for a long while. \nThere was the usual dim grey light of the forest-day about him when he came to his senses. The \nspider lay dead beside him, and his sword-blade was stained black. Somehow the killing of the giant \nspider, all alone by himself in the dark without the help of the wizard or the dwarves or of anyone else, \nmade a great difference to Mr. Baggins. He felt a different person, and much fiercer and bolder in \nspite of an empty stomach, as he wiped his sword on the grass and put it back into its sheath. \n\u201CI will give you a name,\u201D he said to it, \u201Cand I shall call you Sting.\u201D \nAfter that he set out to explore. The forest was grim and silent, but obviously he had first of all to \nlook for his friends, who were not likely to be very far off, unless they had been made prisoners by the \nelves (or worse things). Bilbo felt that it was unsafe to shout, and he stood a long while wondering in \nwhat direction the path lay, and in what direction he should go first to look for the dwarves. \n\u201CO! why did we not remember Beorn\u2019s advice, and Gandalf\u2019s!\u201D he lamented. \u201CWhat a mess we are \nin now! We! I only wish it was we: it is horrible being all alone.\u201D \nIn the end he made as good a guess as he could at the direction from which the cries for help had \ncome in the night \u2014 and by luck (he was born with a good share of it) he guessed more or less right, as \nyou will see. Having made up his mind he crept along as cleverly as he could. Hobbits are clever at \nquietness, especially in woods, as I have already told you; also Bilbo had slipped on his ring before he \nstarted. That is why the spiders neither saw nor heard him coming. \nHe had picked his way stealthily for some distance, when he noticed a place of dense black shadow \nahead of him, black even for that forest, like a patch of midnight that had never been cleared away. As \nhe drew nearer, he saw that it was made by spider-webs one behind and over and tangled with another. \nSuddenly he saw, too, that there were spiders huge and horrible sitting in the branches above him, and \nring or no ring he trembled with fear lest they should discover him. Standing behind a tree he watched \na group of them for some time, and then in the silence and stillness of the wood he realised that these \nloathsome creatures were speaking one to another. Their voices were a sort of thin creaking and \nhissing, but he could make out many of the words that they said. They were talking about the dwarves! \n\u201CIt was a sharp struggle, but worth it,\u201D said one. \u201CWhat nasty thick skins they have to be sure, but \nI\u2019ll wager there is good juice inside.\u201D \n\u201CAye, they\u2019ll make fine eating, when they\u2019ve hung a bit,\u201D said another. \n\u201CDon\u2019t hang \u2019em too long,\u201D said a third. \u201CThey\u2019re not as fat as they might be. Been feeding none \ntoo well of late, I should guess.\u201D \n\u201CKill \u2019em, I say,\u201D hissed a fourth; \u201Ckill \u2019em now and hang \u2019em dead for a while.\u201D \n\u201CThey\u2019re dead now, I\u2019ll warrant,\u201D said the first. \u201CThat they are not. I saw one a-struggling just now. \nJust coming round again, I should say, after a bee-autiful sleep. I\u2019ll show you.\u201D \nWith that one of the fat spiders ran along a rope till it came to a dozen bundles hanging in a row \nfrom a high branch. Bilbo was horrified, now that he noticed them for the first time dangling in the \nshadows, to see a dwarvish foot sticking out of the bottoms of some of the bundles, or here and there \nthe tip of a nose, or a bit of beard or of a hood. \nTo the fattest of these bundles the spider went \u2014 \u201CIt is poor old Bombur, I\u2019ll bet,\u201D thought Bilbo \u2014 \nand nipped hard at the nose that stuck out. There was a muffled yelp inside, and a toe shot up and \nkicked the spider straight and hard. There was life in Bombur still. There was a noise like the kicking \nof a flabby football, and the enraged spider fell off the branch, only catching itself with its own thread \njust in time. \nThe others laughed. \u201CYou were quite right,\u201D they said, \u201Cthe meat\u2019s alive and kicking!\u201D \n\u201CI\u2019ll soon put an end to that,\u201D hissed the angry spider climbing back onto the branch. \nBilbo saw that the moment had come when he must do something. He could not get up at the brutes \nand he had nothing to shoot with; but looking about he saw that in this place there were many stones \nlying in what appeared to be a now dry little watercourse. Bilbo was a pretty fair shot with a stone, and \nit did not take him long to find a nice smooth egg-shaped one that fitted his hand cosily. As a boy he \nused to practise throwing stones at things, until rabbits and squirrels, and even birds, got out of his \nway as quick as lightning if they saw him stoop; and even grownup he had still spent a deal of his time \nat quoits, dart-throwing, shooting at the wand, bowls, ninepins and other quiet games of the aiming \nand throwing sort \u2014 indeed he could do lots of things, besides blowing smoke-rings, asking riddles and \ncooking, that I haven\u2019t had time to tell you about. There is no time now. While he was picking up \nstones, the spider had reached Bombur, and soon he would have been dead. At that moment Bilbo \nthrew. The stone struck the spider plunk on the head, and it dropped senseless off the tree, flop to the \nground, with all its legs curled up. \nThe next stone went whizzing through a big web, snapping its cords, and taking off the spider \nsitting in the middle of it, whack, dead. After that there was a deal of commotion in the spider-colony, \nand they forgot the dwarves for a bit, I can tell you. They could not see Bilbo, but they could make a \ngood guess at the direction from which the stones were coming. As quick as lightning they came \nrunning and swinging towards the hobbit, flinging out their long threads in all directions, till the air \nseemed full of waving snares. \nBilbo, however, soon slipped away to a different place. The idea came to him to lead the furious \nspiders further and further away from the dwarves, if he could; to make them curious, excited and \nangry all at once. When about fifty had gone off to the place where he had stood before, he threw some \nmore stones at these, and at others that had stopped behind; then dancing among the trees he began to \nsing a song to infuriate them and bring them all after him, and also to let the dwarves hear his voice. \nThis is what he sang: \nOld fat spider spinning in a tree! \nOld fat spider can\u2019t see me! \nAttercop! Attercop! \nWon\u2019t you stop, \nStop your spinning and look for me? \nOld Tomnoddy, all big body, \nOld Tomnoddy can\u2019t spy me! \nAttercop! Attercop! \nDown you drop! \nYou\u2019ll never catch me up your tree! \nNot very good perhaps, but then you must remember that he had to make it up himself, on the spur \nof a very awkward moment. It did what he wanted any way. As he sang he threw some more stones \nand stamped. Practically all the spiders in the place came after him: some dropped to the ground, \nothers raced along the branches, swung from tree to tree, or cast new ropes across the dark spaces. \nThey made for his noise far quicker than he had expected. They were frightfully angry. Quite apart \nfrom the stones no spider has ever liked being called Attercop, and Tomnoddy of course is insulting to \nanybody. \nOff Bilbo scuttled to a fresh place, but several of the spiders had run now to different points in the \nglade where they lived, and were busy spinning webs across all the spaces between the tree-stems. \nVery soon the hobbit would be caught in a thick fence of them all round him \u2014 that at least was the \nspiders\u2019 idea. Standing now in the middle of the hunting and spinning insects Bilbo plucked up his \ncourage and began a new song: \nLazy Lob and crazy Cob \nare weaving webs to wind me. \nI am far more sweet than other meat, \nbut still they cannot find me! \nHere am I, naughty little fly; \nyou are fat and lazy. \nYou cannot trap me, though you try, \nin your cobwebs crazy. \nWith that he turned and found that the last space between two tall trees had been closed with a web \n\u2014 but luckily not a proper web, only great strands of double-thick spider-rope run hastily backwards \nand forwards from trunk to trunk. Out came his little sword. He slashed the threads to pieces and went \noff singing. \nThe spiders saw the sword, though I don\u2019t suppose they knew what it was, and at once the whole lot \nof them came hurrying after the hobbit along the ground and the branches, hairy legs waving, nippers \nand spinners snapping, eyes popping, full of froth and rage. They followed him into the forest until \nBilbo had gone as far as he dared. Then quieter than a mouse he stole back. \nHe had precious little time, he knew, before the spiders were disgusted and came back to their trees \nwhere the dwarves were hung. In the meanwhile he had to rescue them. The worst part of the job was \ngetting up on to the long branch where the bundles were dangling. I don\u2019t suppose he would have \nmanaged it, if a spider had not luckily left a rope hanging down; with its help, though it stuck to his \nhand and hurt him, he scrambled up \u2014 only to meet an old slow wicked fat-bodied spider who had \nremained behind to guard the prisoners, and had been busy pinching them to see which was the juiciest \nto eat. It had thought of starting the feast while the others were away, but Mr. Baggins was in a hurry, \nand before the spider knew what was happening it felt his sting and rolled off the branch dead. \nBilbo\u2019s next job was to loose a dwarf. What was he to do? If he cut the string which hung him up, \nthe wretched dwarf would tumble thump to the ground a good way below. Wriggling along the branch \n(which made all the poor dwarves dance and dangle like ripe fruit) he reached the first bundle. \n\u201CFili or Kili,\u201D he thought by the tip of a blue hood sticking out at the top. \u201CMost likely Fili,\u201D he \nthought by the tip of a long nose poking out of the winding threads. He managed by leaning over to cut \nmost of the strong sticky threads that bound him round, and then, sure enough, with a kick and a \nstruggle most of Fili emerged. I am afraid Bilbo actually laughed at the sight of him jerking his stiff \narms and legs as he danced on the spider-string under his armpits, just like one of those funny toys \nbobbing on a wire. \nSomehow or other Fili was got on to the branch, and then he did his best to help the hobbit, \nalthough he was feeling very sick and ill from spider-poison, and from hanging most of the night and \nthe next day wound round and round with only his nose to breathe through. It took him ages to get the \nbeastly stuff out of his eyes and eyebrows, and as for his beard, he had to cut most of it off. Well, \nbetween them they started to haul up first one dwarf and then another and slash them free. None of \nthem were better off than Fili, and some of them were worse. Some had hardly been able to breathe at \nall (long noses are sometimes useful you see) and some had been more poisoned. \nIn this way they rescued Kili, Bifur, Bofur, Dori and Nori. Poor old Bombur was so exhausted \u2014 he \nwas the fattest and had been constantly pinched and poked \u2014 that he just rolled off the branch and fell \nplop on to the ground, fortunately on to leaves, and lay there. But there were still five dwarves hanging \nat the end of the branch when the spiders began to come back, more full of rage than ever. \nBilbo immediately went to the end of the branch nearest the tree-trunk and kept back those that \ncrawled up. He had taken off his ring when he rescued Fili and forgotten to put it on again, so now \nthey all began to splutter and hiss: \n\u201CNow we see you, you nasty little creature! We will eat you and leave your bones and skin hanging \non a tree. Ugh! he\u2019s got a sting has he? Well, we\u2019ll get him all the same, and then we\u2019ll hang him head \ndownwards for a day or two.\u201D \nWhile this was going on, the other dwarves were working at the rest of the captives, and cutting at \nthe threads with their knives. Soon all would be free, though it was not clear what would happen after \nthat. The spiders had caught them pretty easily the night before, but that had been unawares and in the \ndark. This time there looked like being a horrible battle. \nSuddenly Bilbo noticed that some of the spiders had gathered round old Bombur on the floor, and \nhad tied him up again and were dragging him away. He gave a shout and slashed at the spiders in front \nof him. They quickly gave way, and he scrambled and fell down the tree right into the middle of those \non the ground. His little sword was something new in the way of stings for them. How it darted to and \nfro! It shone with delight as he stabbed at them. Half a dozen were killed before the rest drew off and \nleft Bombur to Bilbo. \n\u201CCome down! Come down!\u201D he shouted to the dwarves on the branch. \u201CDon\u2019t stay up there and be \nnetted!\u201D For he saw spiders swarming up all the neighbouring trees, and crawling along the boughs \nabove the heads of the dwarves. \nDown the dwarves scrambled or jumped or dropped, eleven all in a heap, most of them very shaky \nand little use on their legs. There they were at last, twelve of them counting poor old Bombur, who \nwas being propped up on either side by his cousin Bifur, and his brother Bofur; and Bilbo was dancing \nabout and waving his Sting; and hundreds of angry spiders were goggling at them all round and about \nand above. It looked pretty hopeless. \nThen the battle began. Some of the dwarves had knives, and some had sticks, and all of them could \nget at stones; and Bilbo had his elvish dagger. Again and again the spiders were beaten off, and many \nof them were killed. But it could not go on for long. Bilbo was nearly tired out; only four of the \ndwarves were able to stand firmly, and soon they would all be overpowered like weary flies. Already \nthe spiders were beginning to weave their webs all round them again from tree to tree. \nIn the end Bilbo could think of no plan except to let the dwarves into the secret of his ring. He was \nrather sorry about it, but it could not be helped. \n\u201CI am going to disappear,\u201D he said. \u201CI shall draw the spiders off, if I can; and you must keep \ntogether and make in the opposite direction. To the left there, that is more or less the way towards the \nplace where we last saw the elf-fires.\u201D \nIt was difficult to get them to understand, what with their dizzy heads, and the shouts, and the \nwhacking of sticks and the throwing of stones; but at last Bilbo felt he could delay no longer \u2014 the \nspiders were drawing their circle ever closer. He suddenly slipped on his ring, and to the great \nastonishment of the dwarves he vanished. \nSoon there came the sound of \u201CLazy Lob\u201D and \u201CAttercop\u201D from among the trees away on the right. \nThat upset the spiders greatly. They stopped advancing, and some went off in the direction of the \nvoice. \u201CAttercop\u201D made them so angry that they lost their wits. Then Balin, who had grasped Bilbo\u2019s \nplan better than the rest, led an attack. The dwarves huddled together in a knot, and sending a shower \nof stones they drove at the spiders on the left, and burst through the ring. Away behind them now the \nshouting and singing suddenly stopped. \nHoping desperately that Bilbo had not been caught the dwarves went on. Not fast enough, though. \nThey were sick and weary, and they could not go much better than a hobble and a wobble, though \nmany of the spiders were close behind. Every now and then they had to turn and fight the creatures \nthat were overtaking them; and already some spiders were in the trees above them and throwing down \ntheir long clinging threads. \nThings were looking pretty bad again, when suddenly Bilbo reappeared, and charged into the \nastonished spiders unexpectedly from the side. \n\u201CGo on! Go on!\u201D he shouted. \u201CI will do the stinging!\u201D \nAnd he did. He darted backwards and forwards, slashing at spider-threads, hacking at their legs, \nand stabbing at their fat bodies if they came too near. The spiders swelled with rage, and spluttered \nand frothed, and hissed out horrible curses; but they had become mortally afraid of Sting, and dared \nnot come very near, now that it had come back. So curse as they would, their prey moved slowly but \nsteadily away. It was a most terrible business, and seemed to take hours. But at last, just when Bilbo \nfelt that he could not lift his hand for a single stroke more, the spiders suddenly gave it up, and \nfollowed them no more, but went back disappointed to their dark colony. \nThe dwarves then noticed that they had come to the edge of a ring where elf-fires had been. \nWhether it was one of those they had seen the night before, they could not tell. But it seemed that \nsome good magic lingered in such spots, which the spiders did not like. At any rate here the light was \ngreener, and the boughs less thick and threatening, and they had a chance to rest and draw breath. \nThere they lay for some time, puffing and panting. But very soon they began to ask questions. They \nhad to have the whole vanishing business carefully explained, and the finding of the ring interested \nthem so much that for a while they forgot their own troubles. Balin in particular insisted on having the \nGollum story, riddles and all, told all over again, with the ring in its proper place. But after a time the \nlight began to fail, and then other questions were asked. Where were they, and where was their path, \nand where was there any food, and what were they going to do next? These questions they asked over \nand over again, and it was from little Bilbo that they seemed to expect to get the answers. From which \nyou can see that they had changed their opinion of Mr. Baggins very much, and had begun to have a \ngreat respect for him (as Gandalf had said they would). Indeed they really expected him to think of \nsome wonderful plan for helping them, and were not merely grumbling. They knew only too well that \nthey would soon all have been dead, if it had not been for the hobbit; and they thanked him many \ntimes. Some of them even got up and bowed right to the ground before him, though they fell over with \nthe effort, and could not get on their legs again for some time. Knowing the truth about the vanishing \ndid not lessen their opinion of Bilbo at all; for they saw that he had some wits, as well as luck and a \nmagic ring \u2014 and all three are very useful possessions. In fact they praised him so much that Bilbo \nbegan to feel there really was something of a bold adventurer about himself after all, though he would \nhave felt a lot bolder still, if there had been anything to eat. \nBut there was nothing, nothing at all; and none of them were fit to go and look for anything, or to \nsearch for the lost path. The lost path! No other idea would come into Bilbo\u2019s tired head. He just sat \nstaring in front of him at the endless trees; and after a while they all fell silent again. All except Balin. \nLong after the others had stopped talking and shut their eyes, he kept on muttering and chuckling to \nhimself. \n\u201CGollum! Well I\u2019m blest! So that\u2019s how he sneaked past me, is it? Now I know! Just crept quietly \nalong did you, Mr. Baggins? Buttons all over the doorstep! Good old Bilbo \u2014 Bilbo \u2014 Bilbo \u2014 bo \u2014 bo \n\u2014 bo \u2014 \u201D And then he fell asleep, and there was complete silence for a long while. \nAll of a sudden Dwalin opened an eye, and looked round at them. \u201CWhere is Thorin?\u201D he asked. \nIt was a terrible shock. Of course there were only thirteen of them, twelve dwarves and the hobbit. \nWhere indeed was Thorin? They wondered what evil fate had befallen him, magic or dark monsters; \nand shuddered as they lay lost in the forest. There they dropped off one by one into uncomfortable \nsleep full of horrible dreams, as evening wore to black night; and there we must leave them for the \npresent, too sick and weary to set guards or to take turns at watching. \nThorin had been caught much faster than they had. You remember Bilbo falling like a log into \nsleep, as he stepped into a circle of light? The next time it had been Thorin who stepped forward, and \nas the lights went out he fell like a stone enchanted. All the noise of the dwarves lost in the night, their \ncries as the spiders caught them and bound them, and all the sounds of the battle next day, had passed \nover him unheard. Then the Wood-elves had come to him, and bound him, and carried him away. \nThe feasting people were Wood-elves, of course. These are not wicked folk. If they have a fault it \nis distrust of strangers. Though their magic was strong, even in those days they were wary. They \ndiffered from the High Elves of the West, and were more dangerous and less wise. For most of them \n(together with their scattered relations in the hills and mountains) were descended from the ancient \ntribes that never went to Faerie in the West. There the Fight-elves and the Deep-elves and the Sea- \nelves went and lived for ages, and grew fairer and wiser and more learned, and invented their magic \nand their cunning craft in the making of beautiful and marvellous things, before some came back into \nthe Wide World. In the Wide World the Wood-elves lingered in the twilight of our Sun and Moon, but \nloved best the stars; and they wandered in the great forests that grew tall in lands that are now lost. \nThey dwelt most often by the edges of the woods, from which they could escape at times to hunt, or to \nride and run over the open lands by moonlight or starlight; and after the coming of Men they took ever \nmore and more to the gloaming and the dusk. Still elves they were and remain, and that is Good \nPeople. \nIn a great cave some miles within the edge of Mirkwood on its eastern side there lived at this time \ntheir greatest king. Before his huge doors of stone a river ran out of the heights of the forest and \nflowed on and out into the marshes at the feet of the high wooded lands. This great cave, from which \ncountless smaller ones opened out on every side, wound far underground and had many passages and \nwide halls; but it was lighter and more wholesome than any goblin-dwelling, and neither so deep nor \nso dangerous. In fact the subjects of the king mostly lived and hunted in the open woods, and had \nhouses or huts on the ground and in the branches. The beeches were their favourite trees. The king\u2019s \ncave was his palace, and the strong place of his treasure, and the fortress of his people against their \nenemies. \nIt was also the dungeon of his prisoners. So to the cave they dragged Thorin \u2014 not too gently, for \nthey did not love dwarves, and thought he was an enemy. In ancient days they had had wars with some \nof the dwarves, whom they accused of stealing their treasure. It is only fair to say that the dwarves \ngave a different account, and said that they only took what was their due, for the elf-king had \nbargained with them to shape his raw gold and silver, and had afterwards refused to give them their \npay. If the elf-king had a weakness it was for treasure, especially for silver and white gems; and \nthough his hoard was rich, he was ever eager for more, since he had not yet as great a treasure as other \nelf-lords of old. His people neither mined nor worked metals or jewels, nor did they bother much with \ntrade or with tilling the earth. All this was well known to every dwarf, though Thorin\u2019 s family had had \nnothing to do with the old quarrel I have spoken of. Consequently Thorin was angry at their treatment \nof him, when they took their spell off him and he came to his senses; and also he was determined that \nno word of gold or jewels should be dragged out of him. \nThe king looked sternly on Thorin, when he was brought before him, and asked him many \nquestions. But Thorin would only say that he was starving. \n\u201CWhy did you and your folk three times try to attack my people at their merrymaking?\u201D asked the \nking. \n\u201CWe did not attack them,\u201D answered Thorin; \u201Cwe came to beg, because we were starving.\u201D \n\u201CWhere are your friends now, and what are they doing?\u201D \n\u201CI don\u2019t know, but I expect starving in the forest.\u201D \n\u201CWhat were you doing in the forest?\u201D \n\u201CBooking for food and drink, because we were starving.\u201D \n\u201CBut what brought you into the forest at all?\u201D asked the king angrily. \nAt that Thorin shut his mouth and would not say another word. \n\u201CVery well!\u201D said the king. \u201CTake him away and keep him safe, until he feels inclined to tell the \ntruth, even if he waits a hundred years.\u201D \nThen the elves put thongs on him, and shut him in one of the inmost caves with strong wooden \ndoors, and left him. They gave him food and drink, plenty of both, if not very fine; for Wood-elves \nwere not goblins, and were reasonably well-behaved even to their worst enemies, when they captured \nthem. The giant spiders were the only living things that they had no mercy upon. \nThere in the king\u2019s dungeon poor Thorin lay; and after he had got over his thankfulness for bread \nand meat and water, he began to wonder what had become of his unfortunate friends. It was not very \nlong before he discovered; but that belongs to the next chapter and the beginning of another adventure \nin which the hobbit again showed his usefulness. \nChapter IX \nBARRELS OUT OF BOND \nThe day after the battle with the spiders Bilbo and the dwarves made one last despairing effort to find \na way out before they died of hunger and thirst. They got up and staggered on in the direction which \neight out of the thirteen of them guessed to be the one in which the path lay; but they never found out \nif they were right. Such day as there ever was in the forest was fading once more into the blackness of \nnight, when suddenly out sprang the light of many torches all round them, like hundreds of red stars. \nOut leaped Wood-elves with their bows and spears and called the dwarves to halt. \nThere was no thought of a fight. Even if the dwarves had not been in such a state that they were \nactually glad to be captured, their small knives, the only weapons they had, would have been of no use \nagainst the arrows of the elves that could hit a bird\u2019s eye in the dark. So they simply stopped dead and \nsat down and waited \u2014 all except Bilbo, who popped on his ring and slipped quickly to one side. That \nis why, when the elves bound the dwarves in a long line, one behind the other, and counted them, they \nnever found or counted the hobbit. \nNor did they hear or feel him trotting along well behind their torch-light as they led off their \nprisoners into the forest. Each dwarf was blindfold, but that did not make much difference, for even \nBilbo with the use of his eyes could not see where they were going, and neither he nor the others knew \nwhere they had started from anyway. Bilbo had all he could do to keep up with the torches, for the \nelves were making the dwarves go as fast as ever they could, sick and weary as they were. The king \nhad ordered them to make haste. Suddenly the torches stopped, and the hobbit had just time to catch \nthem up before they began to cross the bridge. This was the bridge that led across the river to the \nking\u2019s doors. The water flowed dark and swift and strong beneath; and at the far end were gates before \nthe mouth of a huge cave that ran into the side of a steep slope covered with trees. There the great \nbeeches came right down to the bank, till their feet were in the stream. \nAcross the bridge the elves thrust their prisoners, but Bilbo hesitated in the rear. He did not at all \nlike the look of the cavern-mouth, and he only made up his mind not to desert his friends just in time \nto scuttle over at the heels of the last elves, before the great gates of the king closed behind them with \na clang. \nInside the passages were lit with red torch-light, and the elf-guards sang as they marched along the \ntwisting, crossing, and echoing paths. These were not like those of the goblin-cities; they were \nsmaller, less deep underground, and filled with a cleaner air. In a great hall with pillars hewn out of \nthe living stone sat the Elvenking on a chair of carven wood. On his head was a crown of berries and \nred leaves, for the autumn was come again. In the spring he wore a crown of woodland flowers. In his \nhand he held a carven staff of oak. \nThe prisoners were brought before him; and though he looked grimly at them, he told his men to \nunbind them, for they were ragged and weary. \u201CBesides they need no ropes in here,\u201D said he. \u201CThere is \nno escape from my magic doors for those who are once brought inside.\u201D \nLong and searchingly he questioned the dwarves about their doings, and where they were going to, \nand where they were coming from; but he got little more news out of them than out of Thorin. They \nwere surly and angry and did not even pretend to be polite. \n\u201CWhat have we done, O king?\u201D said Balin, who was the eldest left. \u201CIs it a crime to be lost in the \nforest, to be hungry and thirsty, to be trapped by spiders? Are the spiders your tame beasts or your \npets, if killing them makes you angry?\u201D \nSuch a question of course made the king angrier than ever, and he answered: \u201CIt is a crime to \nwander in my realm without leave. Do you forget that you were in my kingdom, using the road that \nmy people made? Did you not three times pursue and trouble my people in the forest and rouse the \nspiders with your riot and clamour? After all the disturbance you have made I have a right to know \nwhat brings you here, and if you will not tell me now, I will keep you all in prison until you have \nlearned sense and manners!\u201D \nThen he ordered the dwarves each to be put in a separate cell and to be given food and drink, but \nnot to be allowed to pass the doors of their little prisons, until one at least of them was willing to tell \nhim all he wanted to know. But he did not tell them that Thorin was also a prisoner with him. It was \nBilbo who found that out. \nPoor Mr. Baggins \u2014 it was a weary long time that he lived in that place all alone, and always in hiding, \nnever daring to take off his ring, hardly daring to sleep, even tucked away in the darkest and remotest \ncorners he could find. For something to do he took to wandering about the Elvenking\u2019s palace. Magic \nshut the gates, but he could sometimes get out, if he was quick. Companies of the Wood-elves, \nsometimes with the king at their head, would from time to time ride out to hunt, or to other business in \nthe woods and in the lands to the East. Then if Bilbo was very nimble, he could slip out just behind \nthem; though it was a dangerous thing to do. More than once he was nearly caught in the doors, as they \nclashed together when the last elf passed; yet he did not dare to march among them because of his \nshadow (altogether thin and wobbly as it was in torchlight), or for fear of being bumped into and \ndiscovered. And when he did go out, which was not very often, he did no good. He did not wish to \ndesert the dwarves, and indeed he did not know where in the world to go without them. He could not \nkeep up with the hunting elves all the time they were out, so he never discovered the ways out of the \nwood, and was left to wander miserably in the forest, terrified of losing himself, until a chance came \nof returning. He was hungry too outside, for he was no hunter; but inside the caves he could pick up a \nliving of some sort by stealing food from store or table when no one was at hand. \n\u201CI am like a burglar that can\u2019t get away, but must go on miserably burgling the same house day \nafter day,\u201D he thought. \u201CThis is the dreariest and dullest part of all this wretched, tiresome, \nuncomfortable adventure! I wish I was back in my hobbit-hole by my own warm fireside with the \nlamp shining!\u201D He often wished, too, that he could get a message for help sent to the wizard, but that \nof course was quite impossible; and he soon realized that if anything was to be done, it would have to \nbe done by Mr. Baggins, alone and unaided. \nEventually, after a week or two of this sneaking sort of life, by watching and following the guards \nand taking what chances he could, he managed to find out where each dwarf was kept. He found all \ntheir twelve cells in different parts of the palace, and after a time he got to know his way about very \nwell. What was his surprise one day to overhear some of the guards talking and to learn that there was \nanother dwarf in prison too, in a specially deep dark place. He guessed at once, of course, that that was \nThorin; and after a while he found that his guess was right. At last after many difficulties he managed \nto find the place when no one was about, and to have a word with the chief of the dwarves. \nThorin was too wretched to be angry any longer at his misfortunes, and was even beginning to \nthink of telling the king all about his treasure and his quest (which shows how low-spirited he had \nbecome), when he heard Bilbo\u2019s little voice at his keyhole. He could hardly believe his ears. Soon \nhowever he made up his mind that he could not be mistaken, and he came to the door and had a long \nwhispered talk with the hobbit on the other side. \nSo it was that Bilbo was able to take secretly Thorin\u2019 s message to each of the other imprisoned \ndwarves, telling them that Thorin their chief was also in prison close at hand, and that no one was to \nreveal their errand to the king, not yet, nor before Thorin gave the word. For Thorin had taken heart \nagain hearing how the hobbit had rescued his companions from the spiders, and was determined once \nmore not to ransom himself with promises to the king of a share in the treasure, until all hope of \nescaping in any other way had disappeared; until in fact the remarkable Mr. Invisible Baggins (of \nwhom he began to have a very high opinion indeed) had altogether failed to think of something clever. \nThe other dwarves quite agreed when they got the message. They all thought their own shares in \nthe treasure (which they quite regarded as theirs, in spite of their plight and the still unconquered \ndragon) would suffer seriously if the Wood-elves claimed part of it, and they all trusted Bilbo. Just \nwhat Gandalf had said would happen, you see. Perhaps that was part of his reason for going off and \nleaving them. \nBilbo, however, did not feel nearly so hopeful as they did. He did not like being depended on by \neveryone, and he wished he had the wizard at hand. But that was no use: probably all the dark distance \nof Mirkwood lay between them. He sat and thought and thought, until his head nearly burst, but no \nbright idea would come. One invisible ring was a very fine thing, but it was not much good among \nfourteen. But of course, as you have guessed, he did rescue his friends in the end, and this is how it \nhappened. \nOne day, nosing and wandering about, Bilbo discovered a very interesting thing: the great gates \nwere not the only entrance to the caves. A stream flowed under part of the lowest regions of the \npalace, and joined the Forest River some way further to the east, beyond the steep slope out of which \nthe main mouth opened. Where this underground watercourse came forth from the hillside there was a \nwater-gate. There the rocky roof came down close to the surface of the stream, and from it a portcullis \ncould be dropped right to the bed of the river to prevent anyone coming in or out that way. But the \nportcullis was often open, for a good deal of traffic went out and in by the water-gate. If anyone had \ncome in that way, he would have found himself in a dark rough tunnel leading deep into the heart of \nthe hill; but at one point where it passed under the caves the roof had been cut away and covered with \ngreat oaken trapdoors. These opened upwards into the king\u2019s cellars. There stood barrels, and barrels, \nand barrels; for the Wood-elves, and especially their king, were very fond of wine, though no vines \ngrew in those parts. The wine, and other goods, were brought from far away, from their kinsfolk in the \nSouth, or from the vineyards of Men in distant lands. \nHiding behind one of the largest barrels Bilbo discovered the trapdoors and their use, and lurking \nthere, listening to the talk of the king\u2019s servants, he learned how the wine and other goods came up the \nrivers, or over land, to the Long Lake. It seemed a town of Men still throve there, built out on bridges \nfar into the water as a protection against enemies of all sorts, and especially against the dragon of the \nMountain. From Lake-town the barrels were brought up the Forest River. Often they were just tied \ntogether like big rafts and poled or rowed up the stream; sometimes they were loaded on to flat boats. \nWhen the barrels were empty the elves cast them through the trapdoors, opened the water-gate, and \nout the barrels floated on the stream, bobbing along, until they were carried by the current to a place \nfar down the river where the bank jutted out, near to the very eastern edge of Mirkwood. There they \nwere collected and tied together and floated back to Lake-town, which stood close to the point where \nthe Forest River flowed into the Long Lake. \nFor some time Bilbo sat and thought about this water-gate, and wondered if it could be used for the \nescape of his friends, and at last he had the desperate beginnings of a plan. \nThe evening meal had been taken to the prisoners. The guards were tramping away down the \npassages taking the torchlight with them and leaving everything in darkness. Then Bilbo heard the \nking\u2019s butler bidding the chief of the guards good-night. \n\u201CNow come with me,\u201D he said, \u201Cand taste the new wine that has just come in. I shall be hard at \nwork tonight clearing the cellars of the empty wood, so let us have a drink first to help the labour.\u201D \n\u201CVery good,\u201D laughed the chief of the guards. \u201CTil taste with you, and see if it is fit for the king\u2019s \ntable. There is a feast tonight and it would not do to send up poor stuff!\u201D \nWhen he heard this Bilbo was all in a flutter, for he saw that luck was with him and he had a chance at \nonce to try his desperate plan. He followed the two elves, until they entered a small cellar and sat \ndown at a table on which two large flagons were set. Soon they began to drink and laugh merrily. Luck \nof an unusual kind was with Bilbo then. It must be potent wine to make a wood-elf drowsy; but this \nwine, it would seem, was the heady vintage of the great gardens of Dorwinion, not meant for his \nsoldiers or his servants, but for the king\u2019s feasts only, and for smaller bowls not for the butler\u2019s great \nflagons. \nVery soon the chief guard nodded his head, then he laid it on the table and fell fast asleep. The \nbutler went on talking and laughing to himself for a while without seeming to notice, but soon his \nhead too nodded to the table, and he fell asleep and snored beside his friend. Then in crept the hobbit. \nVery soon the chief guard had no keys, but Bilbo was trotting as fast as he could along the passages \ntowards the cells. The great bunch seemed very heavy to his arms, and his heart was often in his \nmouth, in spite of his ring, for he could not prevent the keys from making every now and then a loud \nclink and clank, which put him all in a tremble. \nFirst he unlocked Balin\u2019 s door, and locked it again carefully as soon as the dwarf was outside. \nBalin was most surprised, as you can imagine; but glad as he was to get out of his wearisome little \nstone room, he wanted to stop and ask questions, and know what Bilbo was going to do, and all about \nit. \n\u201CNo time now!\u201D said the hobbit. \u201CYou just follow me! We must all keep together and not risk \ngetting separated. All of us must escape or none, and this is our last chance. If this is found out, \ngoodness knows where the king will put you next, with chains on your hands and feet too, I expect. \nDon\u2019t argue, there\u2019s a good fellow!\u201D \nThen off he went from door to door, until his following had grown to twelve \u2014 none of them any \ntoo nimble, what with the dark, and what with their long imprisonment. Bilbo\u2019s heart thumped every \ntime one of them bumped into another, or grunted or whispered in the dark. \u201CDrat this dwarvish \nracket!\u201D he said to himself. But all went well, and they met no guards. As a matter of fact there was a \ngreat autumn feast in the woods that night, and in the halls above. Nearly all the king\u2019s folk were \nmerrymaking. \nAt last after much blundering they came to Thorin\u2019s dungeon, far down in a deep place and \nfortunately not far from the cellars. \n\u201CUpon my word!\u201D said Thorin, when Bilbo whispered to him to come out and join his friends, \n\u201CGandalf spoke true, as usual! A pretty fine burglar you make, it seems, when the time comes. I am \nsure we are all for ever at your service, whatever happens after this. But what comes next?\u201D \nBilbo saw that the time had come to explain his idea, as far as he could; but he did not feel at all \nsure how the dwarves would take it. His fears were quite justified, for they did not like it a bit, and \nstarted grumbling loudly in spite of their danger. \n\u201CWe shall be bruised and battered to pieces, and drowned too, for certain!\u201D they muttered. \u201CWe \nthought you had got some sensible notion, when you managed to get hold of the keys. This is a mad \nidea!\u201D \n\u201CVery well!\u201D said Bilbo very downcast, and also rather annoyed. \u201CCome along back to your nice \ncells, and I will lock you all in again, and you can sit there comfortably and think of a better plan \u2014 but \nI don\u2019t suppose I shall ever get hold of the keys again, even if I feel inclined to try.\u201D \nThat was too much for them, and they calmed down. In the end, of course, they had to do just what \nBilbo suggested, because it was obviously impossible for them to try and find their way into the upper \nhalls, or to fight their way out of gates that closed by magic; and it was no good grumbling in the \npassages until they were caught again. So following the hobbit, down into the lowest cellars they \ncrept. They passed a door through which the chief guard and the butler could be seen still happily \nsnoring with smiles upon their faces. The wine of Dorwinion brings deep and pleasant dreams. There \nwould be a different expression on the face of the chief guard next day, even though Bilbo, before they \nwent on, stole in and kind-heartedly put the keys back on his belt. \n\u201CThat will save him some of the trouble he is in for,\u201D said Mr. Baggins to himself. \u201CHe wasn\u2019t a \nbad fellow, and quite decent to the prisoners. It will puzzle them all too. They will think we had a very \nstrong magic to pass through all those locked doors and disappear. Disappear! We have got to get busy \nvery quick, if that is to happen!\u201D \nBalin was told off to watch the guard and the butler and give warning if they stirred. The rest went into \nthe adjoining cellar with the trapdoors. There was little time to lose. Before long, as Bilbo knew, some \nelves were under orders to come down and help the butler get the empty barrels through the doors into \nthe stream. These were in fact already standing in rows in the middle of the floor waiting to be pushed \noff. Some of them were wine-barrels, and these were not much use, as they could not easily be opened \nat the end without a deal of noise, nor could they easily be secured again. But among them were \nseveral others, which had been used for bringing other stuffs, butter, apples, and all sorts of things, to \nthe king\u2019s palace. \nThey soon found thirteen with room enough for a dwarf in each. In fact some were too roomy, and \nas they climbed in the dwarves thought anxiously of the shaking and the bumping they would get \ninside, though Bilbo did his best to find straw and other stuff to pack them in as cosily as could be \nmanaged in a short time. At last twelve dwarves were stowed. Thorin had given a lot of trouble, and \nturned and twisted in his tub and grumbled like a large dog in a small kennel; while Balin, who came \nlast, made a great fuss about his air-holes and said he was stifling, even before his lid was on. Bilbo \nhad done what he could to close holes in the sides of the barrels, and to fix on all the lids as safely as \ncould be managed, and now he was left alone again, running round putting the finishing touches to the \npacking, and hoping against hope that his plan would come off. \nIt had not been done a bit too soon. Only a minute or two after Balin\u2019 s lid had been fitted on there \ncame the sound of voices and the flicker of lights. A number of elves came laughing and talking into \nthe cellars and singing snatches of song. They had left a merry feast in one of the halls and were bent \non returning as soon as they could. \n\u201CWhere\u2019s old Galion, the butler?\u201D said one. \u201CI haven\u2019t seen him at the tables tonight. He ought to \nbe here now to show us what is to be done.\u201D \n\u201CI shall be angry if the old slowcoach is late,\u201D said another. \u201CI have no wish to waste time down \nhere while the song is up!\u201D \n\u201CHa, ha!\u201D came a cry. \u201CHere\u2019s the old villain with his head on a jug! He\u2019s been having a little feast \nall to himself and his friend the captain.\u201D \n\u201CShake him! Wake him!\u201D shouted the others impatiently. \nGalion was not at all pleased at being shaken or wakened, and still less at being laughed at. \u201CYou\u2019re \nall late,\u201D he grumbled. \u201CHere am I waiting and waiting down here, while you fellows drink and make \nmerry and forget your tasks. Small wonder if I fall asleep from weariness!\u201D \n\u201CSmall wonder,\u201D said they, \u201Cwhen the explanation stands close at hand in a jug! Come give us a \ntaste of your sleeping-draught before we fall to! No need to wake the turnkey yonder. He has had his \nshare by the looks of it.\u201D \nThen they drank once round and became mighty merry all of a sudden. But they did not quite lose \ntheir wits. \u201CSave us, Galion!\u201D cried some, \u201Cyou began your feasting early and muddled your wits! You \nhave stacked some full casks here instead of the empty ones, if there is anything in weight.\u201D \n\u201CGet on with the work!\u201D growled the butler. \u201CThere is nothing in the feeling of weight in an idle \ntoss-pot\u2019s arms. These are the ones to go and no others. Do as I say!\u201D \n\u201CVery well, very well,\u201D they answered rolling the barrels to the opening. \u201COn your head be it, if the \nking\u2019s full buttertubs and his best wine is pushed into the river for the Lake-men to feast on for \nnothing!\u201D \nRoll \u2014 roll \u2014 roll \u2014 roll, \nroll-roll-rolling down the hole! \nHeave ho! Splash plump! \nDown they go, down they bump! \nSo they sang as first one barrel and then another rumbled to the dark opening and was pushed over \ninto the cold water some feet below. Some were barrels really empty, some were tubs neatly packed \nwith a dwarf each; but down they all went, one after another, with many a clash and a bump, thudding \non top of ones below, smacking into the water, jostling against the walls of the tunnel, knocking into \none another, and bobbing away down the current. \nIt was just at this moment that Bilbo suddenly discovered the weak point in his plan. Most likely \nyou saw it some time ago and have been laughing at him; but I don\u2019t suppose you would have done \nhalf as well yourselves in his place. Of course he was not in a barrel himself, nor was there anyone to \npack him in, even if there had been a chance! It looked as if he would certainly lose his friends this \ntime (nearly all of them had already disappeared through the dark trap-door), and get utterly left \nbehind and have to stay lurking as a permanent burglar in the elf-caves for ever. For even if he could \nhave escaped through the upper gates at once, he had precious small chance of ever finding the \ndwarves again. He did not know the way by land to the place where the barrels were collected. He \nwondered what on earth would happen to them without him; for he had not had time to tell the \ndwarves all that he had learned, or what he had meant to do, once they were out of the wood. \nWhile all these thoughts were passing through his mind, the elves being very merry began to sing a \nsong round the river-door. Some had already gone to haul on the ropes which pulled up the portcullis \nat the water-gate so as to let out the barrels as soon as they were all afloat below. \nDown the swift dark stream you go \nBack to lands you once did know! \nLeave the halls and caverns deep, \nLeave the northern mountains steep, \nWhere the forest wide and dim \nStoops in shadow grey and grim! \nFloat beyond the world of trees \nOut into the whispering breeze, \nPast the rushes, past the reeds, \nPast the marsh \u2019 s waving weeds, \nThrough the mist that riseth white \nUp from mere and pool at night! \nFollow, follow stars that leap \nUp the heavens cold and steep; \nTurn when dawn comes over land, \nOver rapid, over sand, \nSouth away! and South away! \nSeek the sunlight and the day, \nBack to pasture, back to mead, \nWhere the kine and oxen feed! \nBack to gardens on the hills \nWhere the berry swells and fills \nUnder sunlight, under day! \nSouth away! and South away! \nDown the swift dark stream you go \nBack to lands you once did know! \nNow the very last barrel was being rolled to the doors! In despair and not knowing what else to do, \npoor little Bilbo caught hold of it and was pushed over the edge with it. Down into the water he fell, \nsplash! into the cold dark water with the barrel on top of him. \nHe came up again spluttering and clinging to the wood like a rat, but for all his efforts he could not \nscramble on top. Every time he tried, the barrel rolled round and ducked him under again. It was really \nempty, and floated light as a cork. Though his ears were full of water, he could hear the elves still \nsinging in the cellar above. Then suddenly the trap-doors fell to with a boom and their voices faded \naway. He was in the dark tunnel floating in icy water, all alone \u2014 for you cannot count friends that are \nall packed up in barrels. \nVery soon a grey patch came in the darkness ahead. He heard the creak of the water-gate being \nhauled up, and he found that he was in the midst of a bobbing and bumping mass of casks and tubs all \npressing together to pass under the arch and get out into the open stream. He had as much as he could \ndo to prevent himself from being hustled and battered to bits; but at last the jostling crowd began to \nbreak up and swing off, one by one, under the stony arch and away. Then he saw that it would have \nbeen no good even if he had managed to get astride his barrel, for there was no room to spare, not even \nfor a hobbit, between its top and the suddenly stooping roof where the gate was. \nOut they went under the overhanging branches of the trees on either bank. Bilbo wondered what the \ndwarves were feeling and whether a lot of water was getting into their tubs. Some of those that bobbed \nalong by him in the gloom seemed pretty low in the water, and he guessed that these had dwarves \ninside. \n\u201CI do hope I put the lids on tight enough!\u201D he thought, but before long he was worrying too much \nabout himself to remember the dwarves. He managed to keep his head above the water, but he was \nshivering with the cold, and he wondered if he would die of it before the luck turned, and how much \nlonger he would be able to hang on, and whether he should risk the chance of letting go and trying to \nswim to the bank. \nThe luck turned all right before long: the eddying current carried several barrels close ashore at one \npoint and there for a while they stuck against some hidden root. Then Bilbo took the opportunity of \nscrambling up the side of his barrel while it was held steady against another. Up he crawled like a \ndrowned rat, and lay on the top spread out to keep the balance as best he could. The breeze was cold \nbut better than the water, and he hoped he would not suddenly roll off again when they started off once \nmore. \nBefore long the barrels broke free again and turned and twisted off down the stream, and out into \nthe main current. Then he found it quite as difficult to stick on as he had feared; but he managed it \nsomehow, though it was miserably uncomfortable. Luckily he was very light, and the barrel was a \ngood big one and being rather leaky had now shipped a small amount of water. All the same it was like \ntrying to ride, without bridle or stirrups, a round-bellied pony that was always thinking of rolling on \nthe grass. \nIn this way at last Mr. Baggins came to a place where the trees on either hand grew thinner. He \ncould see the paler sky between them. The dark river opened suddenly wide, and there it was joined to \nthe main water of the Forest River flowing down in haste from the king\u2019s great doors. There was a dim \nsheet of water no longer overshadowed, and on its sliding surface there were dancing and broken \nreflections of clouds and of stars. Then the hurrying water of the Forest River swept all the company \nof casks and tubs away to the north bank, in which it had eaten out a wide bay. This had a shingly \nshore under hanging banks and was walled at the eastern end by a little jutting cape of hard rock. On \nthe shallow shore most of the barrels ran aground, though a few went on to bump against the stony \npier. \nThere were people on the look-out on the banks. They quickly poled and pushed all the barrels \ntogether into the shallows, and when they had counted them they roped them together and left them \ntill the morning. Poor dwarves! Bilbo was not badly off now. He slipped from his barrel and waded \nashore, and then sneaked along to some huts that he could see near the water\u2019s edge. He no longer \nthought twice about picking up a supper uninvited if he got the chance, he had been obliged to do it for \nso long, and he knew now only too well what it was to be really hungry, not merely politely interested \nin the dainties of a well-filled larder. Also he had caught a glimpse of a fire through the trees, and that \nappealed to him with his dripping and ragged clothes clinging to him cold and clammy. \nThere is no need to tell you much of his adventures that night, for now we are drawing near the end of \nthe eastward journey and coming to the last and greatest adventure, so we must hurry on. Of course \nhelped by his magic ring he got on very well at first, but he was given away in the end by his wet \nfootsteps and the trail of drippings that he left wherever he went or sat; and also he began to snivel, \nand wherever he tried to hide he was found out by the terrific explosions of his suppressed sneezes. \nVery soon there was a fine commotion in the village by the riverside; but Bilbo escaped into the \nwoods carrying a loaf and a leather bottle of wine and a pie that did not belong to him. The rest of the \nnight he had to pass wet as he was and far from a fire, but the bottle helped him to do that, and he \nactually dozed a little on some dry leaves, even though the year was getting late and the air was chilly. \nHe woke again with a specially loud sneeze. It was already grey morning, and there was a merry \nracket down by the river. They were making up a raft of barrels, and the raft-elves would soon be \nsteering it off down the stream to Lake-town. Bilbo sneezed again. He was no longer dripping but he \nfelt cold all over. He scrambled down as fast as his stiff legs would take him and managed just in time \nto get on to the mass of casks without being noticed in the general bustle. Luckily there was no sun at \nthe time to cast an awkward shadow, and for a mercy he did not sneeze again for a good while. \nThere was a mighty pushing of poles. The elves that were standing in the shallow water heaved and \nshoved. The barrels now all lashed together creaked and fretted. \n\u201CThis is a heavy load!\u201D some grumbled. \u201CThey float too deep \u2014 some of these are never empty. If \nthey had come ashore in the daylight, we might have had a look inside,\u201D they said. \n\u201CNo time now!\u201D cried the raftman. \u201CShove off!\u201D And off they went at last, slowly at first, until they \nhad passed the point of rock where other elves stood to fend them off with poles, and then quicker and \nquicker as they caught the main stream and went sailing away down, down towards the Lake. \nThey had escaped the dungeons of the king and were through the wood, but whether alive or dead \nstill remains to be seen. \nChapter X \nA WARM WELCOME \nThe day grew lighter and warmer as they floated along. After a while the river rounded a steep \nshoulder of land that came down upon their left. Under its rocky feet like an inland cliff the deepest \nstream had flowed lapping and bubbling. Suddenly the cliff fell away. The shores sank. The trees \nended. Then Bilbo saw a sight: \nThe lands opened wide about him, filled with the waters of the river which broke up and wandered \nin a hundred winding courses, or halted in marshes and pools dotted with isles on every side; but still a \nstrong water flowed on steadily through the midst. And far away, its dark head in a torn cloud, there \nloomed the Mountain! Its nearest neighbours to the North-East and the tumbled land that joined it to \nthem could not be seen. All alone it rose and looked across the marshes to the forest. The Lonely \nMountain! Bilbo had come far and through many adventures to see it, and now he did not like the look \nof it in the least. \nAs he listened to the talk of the raftmen and pieced together the scraps of information they let fall, \nhe soon realized that he was very fortunate ever to have seen it at all, even from this distance. Dreary \nas had been his imprisonment and unpleasant as was his position (to say nothing of the poor dwarves \nunderneath him) still, he had been more lucky than he had guessed. The talk was all of the trade that \ncame and went on the waterways and the growth of the traffic on the river, as the roads out of the East \ntowards Mirkwood vanished or fell into disuse; and of the bickerings of the Lake-men and the Wood- \nelves about the upkeep of the Forest River and the care of the banks. Those lands had changed much \nsince the days when dwarves dwelt in the Mountain, days which most people now remembered only as \na very shadowy tradition. They had changed even in recent years, and since the last news that Gandalf \nhad had of them. Great floods and rains had swollen the waters that flowed east; and there had been an \nearthquake or two (which some were inclined to attribute to the dragon \u2014 alluding to him chiefly with \na curse and an ominous nod in the direction of the Mountain). The marshes and bogs had spread wider \nand wider on either side. Paths had vanished, and many a rider and wanderer too, if they had tried to \nfind the lost ways across. The elf-road through the wood which the dwarves had followed on the \nadvice of Beorn now came to a doubtful and little used end at the eastern edge of the forest; only the \nriver offered any longer a safe way from the skirts of Mirkwood in the North to the mountain- \nshadowed plains beyond, and the river was guarded by the Wood-elves\u2019 king. \nSo you see Bilbo had come in the end by the only road that was any good. It might have been some \ncomfort to Mr. Baggins shivering on the barrels, if he had known that news of this had reached \nGandalf far away and given him great anxiety, and that he was in fact finishing his other business \n(which does not come into this tale) and getting ready to come in search of Thorin\u2019s company. But \nBilbo did not know it. \nAll he knew was that the river seemed to go on and on and on for ever, and he was hungry, and had \na nasty cold in the nose, and did not like the way the Mountain seemed to frown at him and threaten \nhim as it drew ever nearer. After a while, however, the river took a more southerly course and the \nMountain receded again, and at last, late in the day the shores grew rocky, the river gathered all its \nwandering waters together into a deep and rapid flood, and they swept along at great speed. \nThe sun had set when turning with another sweep towards the East the forest-river rushed into the \nLong Lake. There it had a wide mouth with stony clifflike gates at either side whose feet were piled \nwith shingles. The Long Lake! Bilbo had never imagined that any water that was not the sea could \nlook so big. It was so wide that the opposite shores looked small and far, but it was so long that its \nnortherly end, which pointed towards the Mountain, could not be seen at all. Only from the map did \nBilbo know that away up there, where the stars of the Wain were already twinkling, the Running River \ncame down into the lake from Dale and with the Lorest River filled with deep waters what must once \nhave been a great deep rocky valley. At the southern end the doubled waters poured out again over \nhigh waterfalls and ran away hurriedly to unknown lands. In the still evening air the noise of the falls \ncould be heard like a distant roar. \nNot far from the mouth of the Lorest River was the strange town he heard the elves speak of in the \nking\u2019s cellars. It was not built on the shore, though there were a few huts and buildings there, but right \nout on the surface of the lake, protected from the swirl of the entering river by a promontory of rock \nwhich formed a calm bay. A great bridge made of wood ran out to where on huge piles made of forest \ntrees was built a busy wooden town, not a town of elves but of Men, who still dared to dwell here \nunder the shadow of the distant dragon-mountain. They still throve on the trade that came up the great \nriver from the South and was carted past the falls to their town; but in the great days of old, when Dale \nin the North was rich and prosperous, they had been wealthy and powerful, and there had been fleets of \nboats on the waters, and some were filled with gold and some with warriors in armour, and there had \nbeen wars and deeds which were now only a legend. The rotting piles of a greater town could still be \nseen along the shores when the waters sank in a drought. \nBut men remembered little of all that, though some still sang old songs of the dwarf-kings of the \nMountain, Thror and Thrain of the race of Durin, and of the coming of the Dragon, and the fall of the \nlords of Dale. Some sang too that Thror and Thrain would come back one day and gold would flow in \nrivers, through the mountain-gates, and all that land would be filled with new song and new laughter. \nBut this pleasant legend did not much affect their daily business. \nAs soon as the raft of barrels came in sight boats rowed out from the piles of the town, and voices \nhailed the raft-steerers. Then ropes were cast and oars were pulled, and soon the raft was drawn out of \nthe current of the Forest River and towed away round the high shoulder of rock into the little bay of \nLake-town. There it was moored not far from the shoreward head of the great bridge. Soon men would \ncome up from the South and take some of the casks away, and others they would fill with goods they \nhad brought to be taken back up the stream to the Wood-elves\u2019 home. In the meanwhile the barrels \nwere left afloat while the elves of the raft and the boatmen went to feast in Lake-town. \nThey would have been surprised, if they could have seen what happened down by the shore, after \nthey had gone and the shades of night had fallen. First of all a barrel was cut loose by Bilbo and \npushed to the shore and opened. Groans came from inside, and out crept a most unhappy dwarf. Wet \nstraw was in his draggled beard; he was so sore and stiff, so bruised and buffeted he could hardly stand \nor stumble through the shallow water to lie groaning on the shore. He had a famished and a savage \nlook like a dog that has been chained and forgotten in a kennel for a week. It was Thorin, but you \ncould only have told it by his golden chain, and by the colour of his now dirty and tattered sky-blue \nhood with its tarnished silver tassel. It was some time before he would be even polite to the hobbit. \n\u201CWell, are you alive or are you dead?\u201D asked Bilbo quite crossly. Perhaps he had forgotten that he \nhad had at least one good meal more than the dwarves, and also the use of his arms and legs, not to \nspeak of a greater allowance of air. \u201CAre you still in prison, or are you free? If you want food, and if \nyou want to go on with this silly adventure \u2014 it\u2019s yours after all and not mine \u2014 you had better slap \nyour arms and rub your legs and try and help me get the others out while there is a chance!\u201D \nThorin of course saw the sense of this, so after a few more groans he got up and helped the hobbit \nas well as he could. In the darkness floundering in the cold water they had a difficult and very nasty \njob finding which were the right barrels. Knocking outside and calling only discovered about six \ndwarves that could answer. These were unpacked and helped ashore where they sat or lay muttering \nand moaning; they were so soaked and bruised and cramped that they could hardly yet realize their \nrelease or be properly thankful for it. \nDwalin and Balin were two of the most unhappy, and it was no good asking them to help. Bifur and \nBofur were less knocked about and drier, but they lay down and would do nothing. Fili and Kili, \nhowever, who were young (for dwarves) and had also been packed more neatly with plenty of straw \ninto smaller casks, came out more or less smiling, with only a bruise or two and a stiffness that soon \nwore off. \n\u201CI hope I never smell the smell of apples again!\u201D said Fili. \u201CMy tub was full of it. To smell apples \neverlastingly when you can scarcely move and are cold and sick with hunger is maddening. I could eat \nanything in the wide world now, for hours on end \u2014 but not an apple!\u201D \nWith the willing help of Fili and Kili, Thorin and Bilbo at last discovered the remainder of the \ncompany and got them out. Poor fat Bombur was asleep or senseless; Dori, Nori, Ori, Oin and Gloin \nwere waterlogged and seemed only half alive; they all had to be carried one by one and laid helpless \non the shore. \n\u201CWell! Here we are!\u201D said Thorin. \u201CAnd I suppose we ought to thank our stars and Mr. Baggins. I \nam sure he has a right to expect it, though I wish he could have arranged a more comfortable journey. \nStill \u2014 all very much at your service once more, Mr. Baggins. No doubt we shall feel properly grateful, \nwhen we are fed and recovered. In the meanwhile what next?\u201D \n\u201CI suggest Lake-town,\u201D said Bilbo. \u201CWhat else is there?\u201D \nNothing else could, of course, be suggested; so leaving the others Thorin and Fili and Kili and the \nhobbit went along the shore to the great bridge. There were guards at the head of it, but they were not \nkeeping very careful watch, for it was so long since there had been any real need. Except for \noccasional squabbles about river-tolls they were friends with the Wood-elves. Other folk were far \naway; and some of the younger people in the town openly doubted the existence of any dragon in the \nmountain, and laughed at the greybeards and gammers who said that they had seen him flying in the \nsky in their young days. That being so it is not surprising that the guards were drinking and laughing \nby a fire in their hut, and did not hear the noise of the unpacking of the dwarves or the footsteps of the \nfour scouts. Their astonishment was enormous when Thorin Oakenshield stepped in through the door. \n\u201CWho are you and what do you want?\u201D they shouted leaping to their feet and groping for weapons. \n\u201CThorin son of Thrain son of Thror King under the Mountain!\u201D said the dwarf in a loud voice, and \nhe looked it, in spite of his torn clothes and draggled hood. The gold gleamed on his neck and waist; \nhis eyes were dark and deep. \u201CI have come back. I wish to see the Master of your town!\u201D \nThen there was tremendous excitement. Some of the more foolish ran out of the hut as if they \nexpected the Mountain to go golden in the night and all the waters of the lake turn yellow right away. \nThe captain of the guard came forward. \n\u201CAnd who are these?\u201D he asked, pointing to Fili and Kili and Bilbo. \n\u201CThe sons of my father\u2019s daughter,\u201D answered Thorin, \u201CFili and Kili of the race of Durin, and Mr. \nBaggins who has travelled with us out of the West.\u201D \n\u201CIf you come in peace lay down your arms!\u201D said the captain. \n\u201CWe have none,\u201D said Thorin, and it was true enough: their knives had been taken from them by the \nwood-elves, and the great sword Orcrist too. Bilbo had his short sword, hidden as usual, but he said \nnothing about that. \u201CWe have no need of weapons, who return at last to our own as spoken of old. Nor \ncould we fight against so many. Take us to your master!\u201D \n\u201CHe is at feast,\u201D said the captain. \n\u201CThen all the more reason for taking us to him,\u201D burst in Fili, who was getting impatient at these \nsolemnities. \u201CWe are worn and famished after our long road and we have sick comrades. Now make \nhaste and let us have no more words, or your master may have something to say to you.\u201D \n\u201CFollow me then,\u201D said the captain, and with six men about them he led them over the bridge \nthrough the gates and into the market-place of the town. This was a wide circle of quiet water \nsurrounded by the tall piles on which were built the greater houses, and by long wooden quays with \nmany steps and ladders going down to the surface of the lake. From one great hall shone many lights \nand there came the sound of many voices. They passed its doors and stood blinking in the light \nlooking at long tables filled with folk. \n\u201CI am Thorin son of Thrain son of Thror King under the Mountain! I return!\u201D cried Thorin in a loud \nvoice from the door, before the captain could say anything. \nAll leaped to their feet. The Master of the town sprang from his great chair. But none rose in \ngreater surprise than the raft-men of the elves who were sitting at the lower end of the hall. Pressing \nforward before the Master\u2019s table they cried: \n\u201CThese are prisoners of our king that have escaped, wandering vagabond dwarves that could not \ngive any good account of themselves, sneaking through the woods and molesting our people!\u201D \n\u201CIs this true?\u201D asked the Master. As a matter of fact he thought it far more likely than the return of \nthe King under the Mountain, if any such person had ever existed. \n\u201CIt is true that we were wrongfully waylaid by the Elvenking and imprisoned without cause as we \njourneyed back to our own land,\u201D answered Thorin. \u201CBut lock nor bar may hinder the homecoming \nspoken of old. Nor is this town in the Wood-elves\u2019 realm. I speak to the Master of the town of the Men \nof the Lake, not to the raft-men of the king.\u201D \nThen the Master hesitated and looked from one to the other. The Elvenking was very powerful in \nthose parts and the Master wished for no enmity with him, nor did he think much of old songs, giving \nhis mind to trade and tolls, to cargoes and gold, to which habit he owed his position. Others were of \ndifferent mind, however, and quickly the matter was settled without him. The news had spread from \nthe doors of the hall like fire through all the town. People were shouting inside the hall and outside it. \nThe quays were thronged with hurrying feet. Some began to sing snatches of old songs concerning the \nreturn of the King under the Mountain; that it was Thror\u2019s grandson not Thror himself that had come \nback did not bother them at all. Others took up the song and it rolled loud and high over the lake. \nThe King beneath the mountains, \nThe King of carven stone, \nThe lord of silver fountains \nShall come into his own! \nHis crown shall be upholden, \nHis harp shall be restrung, \nHis halls shall echo golden \nTo songs of yore re-sung. \nThe woods shall wave on mountains \nAnd grass beneath the sun; \nHis wealth shall flow in fountains \nAnd the rivers golden run. \nThe streams shall run in gladness, \nThe lakes shall shine and burn, \nAll sorrow fail and sadness \nAt the Mountain-king\u2019s return! \nSo they sang, or very like that, only there was a great deal more of it, and there was much shouting \nas well as the music of harps and of fiddles mixed up with it. Indeed such excitement had not been \nknown in the town in the memory of the oldest grandfather. The Wood-elves themselves began to \nwonder greatly and even to be afraid. They did not know of course how Thorin had escaped, and they \nbegan to think their king might have made a serious mistake. As for the Master he saw there was \nnothing else for it but to obey the general clamour, for the moment at any rate, and to pretend to \nbelieve that Thorin was what he said. So he gave up to him his own great chair and set Fili and Kili \nbeside him in places of honour. Even Bilbo was given a seat at the high table, and no explanation of \nwhere he came in \u2014 no songs had alluded to him even in the obscurest way \u2014 was asked for in the \ngeneral bustle. \nSoon afterwards the other dwarves were brought into the town amid scenes of astonishing \nenthusiasm. They were all doctored and fed and housed and pampered in the most delightful and \nsatisfactory fashion. A large house was given up to Thorin and his company; boats and rowers were \nput at their service; and crowds sat outside and sang songs all day, or cheered if any dwarf showed so \nmuch as his nose. \nSome of the songs were old ones; but some of them were quite new and spoke confidently of the \nsudden death of the dragon and of cargoes of rich presents coming down the river to Lake-town. These \nwere inspired largely by the Master and they did not particularly please the dwarves, but in the \nmeantime they were well contented and they quickly grew fat and strong again. Indeed within a week \nthey were quite recovered, fitted out in fine cloth of their proper colours, with beards combed and \ntrimmed, and proud steps. Thorin looked and walked as if his kingdom was already regained and \nSmaug chopped up into little pieces. \nThen, as he had said, the dwarves\u2019 good feeling towards the little hobbit grew stronger every day. \nThere were no more groans or grumbles. They drank his health, and they patted him on the back, and \nthey made a great fuss of him; which was just as well, for he was not feeling particularly cheerful. He \nhad not forgotten the look of the Mountain, nor the thought of the dragon, and he had besides a \nshocking cold. For three days he sneezed and coughed, and he could not go out, and even after that his \nspeeches at banquets were limited to \u201CThag you very buch.\u201D \nIn the meanwhile the Wood-elves had gone back up the Forest River with their cargoes, and there was \ngreat excitement in the king\u2019s palace. I have never heard what happened to the chief of the guards and \nthe butler. Nothing of course was ever said about keys or barrels while the dwarves stayed in Lake- \ntown, and Bilbo was careful never to become invisible. Still, I daresay, more was guessed than was \nknown, though doubtless Mr. Baggins remained a bit of a mystery. In any case the king knew now the \ndwarves\u2019 errand, or thought he did, and he said to himself: \n\u201CVery well! We\u2019ll see! No treasure will come back through Mirkwood without my having \nsomething to say in the matter. But I expect they will all come to a bad end, and serve them right!\u201D He \nat any rate did not believe in dwarves fighting and killing dragons like Smaug, and he strongly \nsuspected attempted burglary or something like it \u2014 which shows he was a wise elf and wiser than the \nmen of the town, though not quite right, as we shall see in the end. He sent out his spies about the \nshores of the lake and as far northward towards the Mountain as they would go, and waited. \nAt the end of a fortnight Thorin began to think of departure. While the enthusiasm still lasted in the \ntown was the time to get help. It would not do to let everything cool down with delay. So he spoke to \nthe Master and his councillors and said that soon he and his company must go on towards the \nMountain. \nThen for the first time the Master was surprised and a little frightened; and he wondered if Thorin \nwas after all really a descendant of the old kings. He had never thought that the dwarves would \nactually dare to approach Smaug, but believed they were frauds who would sooner or later be \ndiscovered and be turned out. He was wrong. Thorin, of course, was really the grandson of the King \nunder the Mountain, and there is no knowing what a dwarf will not dare and do for revenge or the \nrecovery of his own. \nBut the Master was not sorry at all to let them go. They were expensive to keep, and their arrival \nhad turned things into a long holiday in which business was at a standstill. \u201CLet them go and bother \nSmaug, and see how he welcomes them!\u201D he thought. \u201CCertainly, O Thorin Thrain\u2019s son Thror\u2019s son!\u201D \nwas what he said. \u201CYou must claim your own. The hour is at hand, spoken of old. What help we can \noffer shall be yours, and we trust to your gratitude when your kingdom is regained.\u201D \nSo one day, although autumn was now getting far on, and winds were cold, and leaves were falling \nfast, three large boats left Lake-town, laden with rowers, dwarves, Mr. Baggins, and many provisions. \nHorses and ponies had been sent round by circuitous paths to meet them at their appointed landing- \nplace. The Master and his councillors bade them farewell from the great steps of the town-hall that \nwent down to the lake. People sang on the quays and out of windows. The white oars dipped and \nsplashed, and off they went north up the lake on the last stage of their long journey. The only person \nthoroughly unhappy was Bilbo. \nChapter XI \nON THE DOORSTEP \nIn two days going they rowed right up the Long Lake and passed out into the River Running, and now \nthey could all see the Lonely Mountain towering grim and tall before them. The stream was strong and \ntheir going slow. At the end of the third day, some miles up the river, they drew in to the left or \nwestern bank and disembarked. Here they were joined by the horses with other provisions and \nnecessaries and the ponies for their own use that had been sent to meet them. They packed what they \ncould on the ponies and the rest was made into a store under a tent, but none of the men of the town \nwould stay with them even for the night so near the shadow of the Mountain. \n\u201CNot at any rate until the songs have come true!\u201D said they. It was easier to believe in the Dragon \nand less easy to believe in Thorin in these wild parts. Indeed their stores had no need of any guard, for \nall the land was desolate and empty. So their escort left them, making off swiftly down the river and \nthe shoreward paths, although the night was already drawing on. \nThey spent a cold and lonely night and their spirits fell. The next day they set out again. Balin and \nBilbo rode behind, each leading another pony heavily laden beside him; the others were some way \nahead picking out a slow road, for there were no paths. They made north-west, slanting away from the \nRiver Running, and drawing ever nearer and nearer to a great spur of the Mountain that was flung out \nsouthwards towards them. \nIt was a weary journey, and a quiet and stealthy one. There was no laughter or song or sound of \nharps, and the pride and hopes which had stirred in their hearts at the singing of old songs by the lake \ndied away to a plodding gloom. They knew that they were drawing near to the end of their journey, \nand that it might be a very horrible end. The land about them grew bleak and barren, though once, as \nThorin told them, it had been green and fair. There was little grass, and before long there was neither \nbush nor tree, and only broken and blackened stumps to speak of ones long vanished. They were come \nto the Desolation of the Dragon, and they were come at the waning of the year. \nThey reached the skirts of the Mountain all the same without meeting any danger or any sign of the \nDragon other than the wilderness he had made about his lair. The Mountain lay dark and silent before \nthem and ever higher above them. They made their first camp on the western side of the great southern \nspur, which ended in a height called Ravenhill. On this there had been an old watch-post; but they \ndared not climb it yet, it was too exposed. \nBefore setting out to search the western spurs of the Mountain for the hidden door, on which all \ntheir hopes rested, Thorin sent out a scouting expedition to spy out the land to the South where the \nFront \nGate stood. For this purpose he chose Balin and Fili and Kili, and with them went Bilbo. They \nmarched under the grey and silent cliffs to the feet of Ravenhill. There the river, after winding a wide \nloop over the valley of Dale, turned from the Mountain on its road to the Lake, flowing swift and \nnoisily. Its bank was bare and rocky, tall and steep above the stream; and gazing out from it over the \nnarrow water, foaming and splashing among many boulders, they could see in the wide valley \nshadowed by the Mountain\u2019s arms the grey ruins of ancient houses, towers, and walls. \n\u201CThere lies all that is left of Dale,\u201D said Balin. \u201CThe mountain\u2019s sides were green with woods and \nall the sheltered valley rich and pleasant in the days when the bells rang in that town.\u201D He looked both \nsad and grim as he said this: he had been one of Thorin\u2019s companions on the day the Dragon came. \nThey did not dare to follow the river much further towards the Gate; but they went on beyond the \nend of the southern spur, until lying hidden behind a rock they could look out and see the dark \ncavernous opening in a great cliff -wall between the arms of the Mountain. Out of it the waters of the \nRunning River sprang; and out of it too there came a steam and a dark smoke. Nothing moved in the \nwaste, save the vapour and the water, and every now and again a black and ominous crow. The only \nsound was the sound of the stony water, and every now and again the harsh croak of a bird. Balin \nshuddered. \n\u201CLet us return!\u201D he said. \u201CWe can do no good here! And I don\u2019t like these dark birds, they look like \nspies of evil.\u201D \nThe Front Gate. \n\u201CThe dragon is still alive and in the halls under the Mountain then \u2014 or I imagine so from the \nsmoke,\u201D said the hobbit. \n\u201CThat does not prove it,\u201D said Balin, \u201Cthough I don\u2019t doubt you are right. But he might be gone \naway some time, or he might be lying out on the mountain-side keeping watch, and still I expect \nsmokes and steams would come out of the gates: all the halls within must be filled with his foul reek.\u201D \nWith such gloomy thoughts, followed ever by croaking crows above them, they made their weary way \nback to the camp. Only in June they had been guests in the fair house of Elrond, and though autumn \nwas now crawling towards winter that pleasant time now seemed years ago. They were alone in the \nperilous waste without hope of further help. They were at the end of their journey, but as far as ever, it \nseemed, from the end of their quest. None of them had much spirit left. \nNow strange to say Mr. Baggins had more than the others. He would often borrow Thorin\u2019s map \nand gaze at it, pondering over the runes and the message of the moon-letters Elrond had read. It was he \nthat made the dwarves begin the dangerous search on the western slopes for the secret door. They \nmoved their camp then to a long valley, narrower than the great dale in the South where the Gates of \nthe river stood, and walled with lower spurs of the Mountain. Two of these here thrust forward west \nfrom the main mass in long steep-sided ridges that fell ever downwards towards the plain. On this \nwestern side there were fewer signs of the dragon\u2019s marauding feet, and there was some grass for their \nponies. From this western camp, shadowed all day by cliff and wall until the sun began to sink towards \nthe forest, day by day they toiled in parties searching for paths up the mountain-side. If the map was \ntrue, somewhere high above the cliff at the valley\u2019s head must stand the secret door. Day by day they \ncame back to their camp without success. \nBut at last unexpectedly they found what they were seeking. Fili and Kili and the hobbit went back \none day down the valley and scrambled among the tumbled rocks at its southern corner. About \nmidday, creeping behind a great stone that stood alone like a pillar, Bilbo came on what looked like \nrough steps going upwards. Following these excitedly he and the dwarves found traces of a narrow \ntrack, often lost, often rediscovered, that wandered on to the top of the southern ridge and brought \nthem at last to a still narrower ledge, which turned north across the face of the Mountain. Booking \ndown they saw that they were at the top of the cliff at the valley\u2019s head and were gazing down on to \ntheir own camp below. Silently, clinging to the rocky wall on their right, they went in single file along \nthe ledge, till the wall opened and they turned into a little steep-walled bay, grassy-floored, still and \nquiet. Its entrance which they had found could not be seen from below because of the overhang of the \ncliff, nor from further off because it was so small that it looked like a dark crack and no more. It was \nnot a cave and was open to the sky above; but at its inner end a flat wall rose up that in the lower part, \nclose to the ground, was as smooth and upright as masons\u2019 work, but without a joint or crevice to be \nseen. No sign was there of post or lintel or threshold, nor any sign of bar or bolt or key-hole; yet they \ndid not doubt that they had found the door at last. \nThey beat on it, they thrust and pushed at it, they implored it to move, they spoke fragments of \nbroken spells of opening, and nothing stirred. At last tired out they rested on the grass at its feet, and \nthen at evening began their long climb down. \nThere was excitement in the camp that night. In the morning they prepared to move once more. Only \nBofur and Bombur were left behind to guard the ponies and such stores as they had brought with them \nfrom the river. The others went down the valley and up the newly found path, and so to the narrow \nledge. Along this they could carry no bundles or packs, so narrow and breathless was it, with a fall of a \nhundred and fifty feet beside them on to sharp rocks below; but each of them took a good coil of rope \nwound tight about his waist, and so at last without mishap they reached the little grassy bay. \nThere they made their third camp, hauling up what they needed from below with their ropes. Down \nthe same way they were able occasionally to lower one of the more active dwarves, such as Kili, to \nexchange such news as there was, or to take a share in the guard below, while Bofur was hauled up to \nthe higher camp. Bombur would not come up either the rope or the path. \n\u201CI am too fat for such fly-walks,\u201D he said. \u201CI should turn dizzy and tread on my beard, and then you \nwould be thirteen again. And the knotted ropes are too slender for my weight.\u201D Luckily for him that \nwas not true, as you will see. \nIn the meanwhile some of them explored the ledge beyond the opening and found a path that led \nhigher and higher on to the mountain; but they did not dare to venture very far that way, nor was there \nmuch use in it. Out up there a silence reigned, broken by no bird or sound except that of the wind in \nthe crannies of stone. They spoke low and never called or sang, for danger brooded in every rock. The \nothers who were busy with the secret of the door had no more success. They were too eager to trouble \nabout the runes or the moon-letters, but tried without resting to discover where exactly in the smooth \nface of the rock the door was hidden. They had brought picks and tools of many sorts from Lake-town, \nand at first they tried to use these. But when they struck the stone the handles splintered and jarred \ntheir arms cruelly, and the steel heads broke or bent like lead. Mining work, they saw clearly, was no \ngood against the magic that had shut this door; and they grew terrified, too, of the echoing noise. \nBilbo found sitting on the doorstep lonesome and wearisome \u2014 there was not a doorstep, of course, \nreally, but they used to call the little grassy space between the wall and the opening the \u201Cdoorstep\u201D in \nfun, remembering Bilbo\u2019s words long ago at the unexpected party in his hobbit-hole, when he said \nthey could sit on the doorstep till they thought of something. And sit and think they did, or wandered \naimlessly about, and glummer and glummer they became. \nTheir spirits had risen a little at the discovery of the path, but now they sank into their boots; and \nyet they would not give it up and go away. The hobbit was no longer much brighter than the dwarves. \nHe would do nothing but sit with his back to the rock-face and stare away west through the opening, \nover the cliff, over the wide lands to the black wall of Mirkwood, and to the distances beyond, in \nwhich he sometimes thought he could catch glimpses of the Misty Mountains small and far. If the \ndwarves asked him what he was doing he answered: \n\u201CYou said sitting on the doorstep and thinking would be my job, not to mention getting inside, so I \nam sitting and thinking.\u201D But I am afraid he was not thinking much of the job, but of what lay beyond \nthe blue distance, the quiet Western Land and the Hill and his hobbit-hole under it. \nA large grey stone lay in the centre of the grass and he stared moodily at it or watched the great \nsnails. They seemed to love the little shut-in bay with its walls of cool rock, and there were many of \nthem of huge size crawling slowly and stickily along its sides. \n\u201CTomorrow begins the last week of autumn,\u201D said Thorin one day. \n\u201CAnd winter comes after autumn,\u201D said Bifur. \u201CAnd next year after that,\u201D said Dwalin, \u201Cand our \nbeards will grow till they hang down the cliff to the valley before anything happens here. What is our \nburglar doing for us? Since he has got an invisible ring, and ought to be a specially excellent \nperformer now, I am beginning to think he might go through the Front Gate and spy things out a bit!\u201D \nBilbo heard this \u2014 the dwarves were on the rocks just above the enclosure where he was sitting \u2014 \nand \u201CGood Gracious!\u201D he thought, \u201Cso that is what they are beginning to think, is it? It is always poor \nme that has to get them out of their difficulties, at least since the wizard left. Whatever am I going to \ndo? I might have known that something dreadful would happen to me in the end. I don\u2019t think I could \nbear to see the unhappy valley of Dale again, and as for that steaming gate! ! !\u201D \nThat night he was very miserable and hardly slept. Next day the dwarves all went wandering off in \nvarious directions; some were exercising the ponies down below, some were roving about the \nmountain-side. All day Bilbo sat gloomily in the grassy bay gazing at the stone, or out west through \nthe narrow opening. He had a queer feeling that he was waiting for something. \u201CPerhaps the wizard \nwill suddenly come back today,\u201D he thought. \nIf he lifted his head he could see a glimpse of the distant forest. As the sun turned west there was a \ngleam of yellow upon its far roof, as if the light caught the last pale leaves. Soon he saw the orange \nball of the sun sinking towards the level of his eyes. He went to the opening and there pale and faint \nwas a thin new moon above the rim of Earth. \nAt that very moment he heard a sharp crack behind him. There on the grey stone in the grass was \nan enormous thrush, nearly coal black, its pale yellow breast freckled with dark spots. Crack! It had \ncaught a snail and was knocking it on the stone. Crack! Crack! \nSuddenly Bilbo understood. Forgetting all danger he stood on the ledge and hailed the dwarves, \nshouting and waving. Those that were nearest came tumbling over the rocks and as fast as they could \nalong the ledge to him, wondering what on earth was the matter; the others shouted to be hauled up the \nropes (except Bombur, of course: he was asleep). \nQuickly Bilbo explained. They all fell silent: the hobbit standing by the grey stone, and the \ndwarves with wagging beards watching impatiently. The sun sank lower and lower, and their hopes \nfell. It sank into a belt of reddened cloud and disappeared. The dwarves groaned, but still Bilbo stood \nalmost without moving. The little moon was dipping to the horizon. Evening was coming on. Then \nsuddenly when their hope was lowest a red ray of the sun escaped like a finger through a rent in the \ncloud. A gleam of light came straight through the opening into the bay and fell on the smooth rock- \nface. The old thrush, who had been watching from a high perch with beady eyes and head cocked on \none side, gave a sudden trill. There was a loud crack. A flake of rock split from the wall and fell. A \nhole appeared suddenly about three feet from the ground. \nQuickly, trembling lest the chance should fade, the dwarves rushed to the rock and pushed \u2014 in \nvain. \n\u201CThe key! The key!\u201D cried Bilbo. \u201CWhere is Thorin?\u201D \nThorin hurried up. \n\u201CThe key!\u201D shouted Bilbo. \u201CThe key that went with the map! Try it now while there is still time!\u201D \nThen Thorin stepped up and drew the key on its chain from round his neck. He put it to the hole. It \nfitted and it turned! Snap! The gleam went out, the sun sank, the moon was gone, and evening sprang \ninto the sky. \nNow they all pushed together, and slowly a part of the rock-wall gave way. Long straight cracks \nappeared and widened. A door five feet high and three broad was outlined, and slowly without a sound \nswung inwards. It seemed as if darkness flowed out like a vapour from the hole in the mountain-side, \nand deep darkness in which nothing could be seen lay before their eyes, a yawning mouth leading in \nand down. \nChapter XII \nINSIDE INFORMATION \nFor a long time the dwarves stood in the dark before the door and debated, until at last Thorin spoke: \n\u201CNow is the time for our esteemed Mr. Baggins, who has proved himself a good companion on our \nlong road, and a hobbit full of courage and resource far exceeding his size, and if I may say so \npossessed of good luck far exceeding the usual allowance \u2014 now is the time for him to perform the \nservice for which he was included in our Company; now is the time for him to earn his Reward.\u201D \nYou are familiar with Thorin\u2019 s style on important occasions, so I will not give you any more of it, \nthough he went on a good deal longer than this. It certainly was an important occasion, but Bilbo felt \nimpatient. By now he was quite familiar with Thorin too, and he knew what he was driving at. \n\u201CIf you mean you think it is my job to go into the secret passage first, O Thorin Thrain\u2019s son \nOakenshield, may your beard grow ever longer,\u201D he said crossly, \u201Csay so at once and have done! I \nmight refuse. I have got you out of two messes already, which were hardly in the original bargain, so \nthat I am, I think, already owed some reward. But Third time pays for all\u2019 as my father used to say, \nand somehow I don\u2019t think I shall refuse. Perhaps I have begun to trust my luck more than I used to in \nthe old days\u201D \u2014 he meant last spring before he left his own house, but it seemed centuries ago \u2014 \u201Cbut \nanyway I think I will go and have a peep at once and get it over. Now who is coming with me?\u201D \nHe did not expect a chorus of volunteers, so he was not disappointed. Fili and Kili looked \nuncomfortable and stood on one leg, but the others made no pretence of offering \u2014 except old Balin, \nthe lookout man, who was rather fond of the hobbit. He said he would come inside at least and perhaps \na bit of the way too, ready to call for help if necessary. \nThe most that can be said for the dwarves is this: they intended to pay Bilbo really handsomely for \nhis services; they had brought him to do a nasty job for them, and they did not mind the poor little \nfellow doing it if he would; but they would all have done their best to get him out of trouble, if he got \ninto it, as they did in the case of the trolls at the beginning of their adventures before they had any \nparticular reasons for being grateful to him. There it is: dwarves are not heroes, but calculating folk \nwith a great idea of the value of money; some are tricky and treacherous and pretty bad lots; some are \nnot, but are decent enough people like Thorin and Company, if you don\u2019t expect too much. \nThe stars were coming out behind him in a pale sky barred with black when the hobbit crept through \nthe enchanted door and stole into the Mountain. It was far easier going than he expected. This was no \ngoblin entrance, or rough wood-elves\u2019 cave. It was a passage made by dwarves, at the height of their \nwealth and skill: straight as a ruler, smooth-floored and smooth-sided, going with a gentle never- \nvarying slope direct \u2014 to some distant end in the blackness below. \nAfter a while Balin bade Bilbo \u201CGood luck!\u201D and stopped where he could still see the faint outline \nof the door, and by a trick of the echoes of the tunnel hear the rustle of the whispering voices of the \nothers just outside. Then the hobbit slipped on his ring, and warned by the echoes to take more than \nhobbit\u2019s care to make no sound, he crept noiselessly down, down, down into the dark. He was \ntrembling with fear, but his little face was set and grim. Already he was a very different hobbit from \nthe one that had run out without a pocket-handkerchief from Bag-End long ago. He had not had a \npocket-handkerchief for ages. He loosened his dagger in its sheath, tightened his belt, and went on. \n\u201CNow you are in for it at last, Bilbo Baggins,\u201D he said to himself. \u201CYou went and put your foot right in \nit that night of the party, and now you have got to pull it out and pay for it! Dear me, what a fool I was \nand am!\u201D said the least Tookish part of him. \u201CI have absolutely no use for dragon-guarded treasures, \nand the whole lot could stay here for ever, if only I could wake up and find this beastly tunnel was my \nown front-hall at home ! \u201D \nHe did not wake up of course, but went still on and on, till all sign of the door behind had faded \naway. He was altogether alone. Soon he thought it was beginning to feel warm. \u201CIs that a kind of a \nglow I seem to see coming right ahead down there?\u201D he thought. \nIt was. As he went forward it grew and grew, till there was no doubt about it. It was a red light \nsteadily getting redder and redder. Also it was now undoubtedly hot in the tunnel. Wisps of vapour \nfloated up and past him and he began to sweat. A sound, too, began to throb in his ears, a sort of \nbubbling like the noise of a large pot galloping on the fire, mixed with a rumble as of a gigantic tom- \ncat purring. This grew to the unmistakable gurgling noise of some vast animal snoring in its sleep \ndown there in the red glow in front of him. \nIt was at this point that Bilbo stopped. Going on from there was the bravest thing he ever did. The \ntremendous things that happened afterwards were as nothing compared to it. He fought the real battle \nin the tunnel alone, before he ever saw the vast danger that lay in wait. At any rate after a short halt go \non he did; and you can picture him coming to the end of the tunnel, an opening of much the same size \nand shape as the door above. Through it peeps the hobbit\u2019s little head. Before him lies the great \nbottom-most cellar or dungeon-hall of the ancient dwarves right at the Mountain\u2019s root. It is almost \ndark so that its vastness can only be dimly guessed, but rising from the near side of the rocky floor \nthere is a great glow. The glow of Smaug! \nThere he lay, a vast red-golden dragon, fast asleep; a thrumming came from his jaws and nostrils, and \nwisps of smoke, but his fires were low in slumber. Beneath him, under all his limbs and his huge \ncoiled tail, and about him on all sides stretching away across the unseen floors, lay countless piles of \nprecious things, gold wrought and unwrought, gems and jewels, and silver red-stained in the ruddy \nlight. \nSmaug lay, with wings folded like an immeasurable bat, turned partly on one side, so that the \nhobbit could see his underparts and his long pale belly crusted with gems and fragments of gold from \nhis long lying on his costly bed. Behind him where the walls were nearest could dimly be seen coats of \nmail, helms and axes, swords and spears hanging; and there in rows stood great jars and vessels filled \nwith a wealth that could not be guessed. \nTo say that Bilbo\u2019s breath was taken away is no description at all. There are no words left to \nexpress his staggerment, since Men changed the language that they learned of elves in the days when \nall the world was wonderful. Bilbo had heard tell and sing of dragon-hoards before, but the splendour, \nthe lust, the glory of such treasure had never yet come home to him. His heart was filled and pierced \nwith enchantment and with the desire of dwarves; and he gazed motionless, almost forgetting the \nfrightful guardian, at the gold beyond price and count. \nHe gazed for what seemed an age, before drawn almost against his will, he stole from the shadow of \nthe doorway, across the floor to the nearest edge of the mounds of treasure. Above him the sleeping \ndragon lay, a dire menace even in his sleep. He grasped a great two-handled cup, as heavy as he could \ncarry, and cast one fearful eye upwards. Smaug stirred a wing, opened a claw, the rumble of his \nsnoring changed its note. \nThen Bilbo fled. But the dragon did not wake \u2014 not yet \u2014 but shifted into other dreams of greed and \nviolence, lying there in his stolen hall while the little hobbit toiled back up the long tunnel. His heart \nwas beating and a more fevered shaking was in his legs than when he was going down, but still he \nclutched the cup, and his chief thought was: \u201CI\u2019ve done it! This will show them. 'More like a grocer \nthan a burglar\u2019 indeed! Well, we\u2019ll hear no more of that.\u201D \nNor did he. Balin was overjoyed to see the hobbit again, and as delighted as he was surprised. He \npicked Bilbo up and carried him out into the open air. It was midnight and clouds had covered the \nstars, but Bilbo lay with his eyes shut, gasping and taking pleasure in the feel of the fresh air again, \nand hardly noticing the excitement of the dwarves, or how they praised him and patted him on the \nback and put themselves and all their families for generations to come at his service. \nThe dwarves were still passing the cup from hand to hand and talking delightedly of the recovery of \ntheir treasure, when suddenly a vast rumbling woke in the mountain underneath as if it was an old \nvolcano that had made up its mind to start eruptions once again. The door behind them was pulled \nnearly to, and blocked from closing with a stone, but up the long tunnel came the dreadful echoes, \nfrom far down in the depths, of a bellowing and a trampling that made the ground beneath them \ntremble. \nThen the dwarves forgot their joy and their confident boasts of a moment before and cowered down \nin fright. Smaug was still to be reckoned with. It does not do to leave a live dragon out of your \ncalculations, if you live near him. Dragons may not have much real use for all their wealth, but they \nknow it to an ounce as a rule, especially after long possession; and Smaug was no exception. He had \npassed from an uneasy dream (in which a warrior, altogether insignificant in size but provided with a \nbitter sword and great courage, figured most unpleasantly) to a doze, and from a doze to wide waking. \nThere was a breath of strange air in his cave. Could there be a draught from that little hole? He had \nnever felt quite happy about it, though it was so small, and now he glared at it in suspicion and \nwondered why he had never blocked it up. Of late he had half fancied he had caught the dim echoes of \na knocking sound from far above that came down through it to his lair. He stirred and stretched forth \nhis neck to sniff. Then he missed the cup! \nThieves! Fire! Murder! Such a thing had not happened since first he came to the Mountain! His \nrage passes description \u2014 the sort of rage that is only seen when rich folk that have more than they can \nenjoy suddenly lose something that they have long had but have never before used or wanted. His fire \nbelched forth, the hall smoked, he shook the mountain-roots. He thrust his head in vain at the little \nhole, and then coiling his length together, roaring like thunder underground, he sped from his deep lair \nthrough its great door, out into the huge passages of the mountain-palace and up towards the Front \nGate. \nTo hunt the whole mountain till he had caught the thief and had torn and trampled him was his one \nthought. He issued from the Gate, the waters rose in fierce whistling steam, and up he soared blazing \ninto the air and settled on the mountain-top in a spout of green and scarlet flame. The dwarves heard \nthe awful rumour of his flight, and they crouched against the walls of the grassy terrace cringing under \nboulders, hoping somehow to escape the frightful eyes of the hunting dragon. \nThere they would have all been killed, if it had not been for Bilbo once again. \u201CQuick! Quick!\u201D he \ngasped. \u201CThe door! The tunnel! It\u2019s no good here.\u201D \nRoused by these words they were just about to creep inside the tunnel when Bifur gave a cry: \u201CMy \ncousins! Bombur and Bofur \u2014 we have forgotten them, they are down in the valley!\u201D \n\u201CThey will be slain, and all our ponies too, and all our stores lost,\u201D moaned the others. \u201CWe can do \nnothing.\u201D \n\u201CNonsense!\u201D said Thorin, recovering his dignity. \u201CWe cannot leave them. Get inside Mr. Baggins \nand Balin, and you two Fili and Kili \u2014 the dragon shan\u2019t have all of us. Now you others, where are the \nropes? Be quick!\u201D \nThose were perhaps the worst moments they had been through yet. The horrible sounds of Smaug\u2019s \nanger were echoing in the stony hollows far above; at any moment he might come blazing down or fly \nwhirling round and find them there, near the perilous cliff\u2019s edge hauling madly on the ropes. Up \ncame Bofur, and still all was safe. Up came Bombur, puffing and blowing while the ropes creaked, and \nstill all was safe. Up came some tools and bundles of stores, and then danger was upon them. \nA whirring noise was heard. A red light touched the points of standing rocks. The dragon came. \nThey had barely time to fly back to the tunnel, pulling and dragging in their bundles, when Smaug \ncame hurtling from the North, licking the mountain-sides with flame, beating his great wings with a \nnoise like a roaring wind. His hot breath shrivelled the grass before the door, and drove in through the \ncrack they had left and scorched them as they lay hid. Flickering fires leaped up and black rock- \nshadows danced. Then darkness fell as he passed again. The ponies screamed with terror, burst their \nropes and galloped wildly off. The dragon swooped and turned to pursue them, and was gone. \n\u201CThat\u2019ll be the end of our poor beasts!\u201D said Thorin. \u201CNothing can escape Smaug once he sees it. \nHere we are and here we shall have to stay, unless any one fancies tramping the long open miles back \nto the river with Smaug on the watch!\u201D \nIt was not a pleasant thought! They crept further down the tunnel, and there they lay and shivered \nthough it was warm and stuffy, until dawn came pale through the crack of the door. Every now and \nagain through the night they could hear the roar of the flying dragon grow and then pass and fade, as \nhe hunted round and round the mountain-sides. \nHe guessed from the ponies, and from the traces of the camps he had discovered, that men had \ncome up from the river and the lake and had scaled the mountain-side from the valley where the \nponies had been standing; but the door withstood his searching eye, and the little high-walled bay had \nkept out his fiercest flames. Long he had hunted in vain till the dawn chilled his wrath and he went \nback to his golden couch to sleep \u2014 and to gather new strength. He would not forget or forgive the \ntheft, not if a thousand years turned him to smouldering stone, but he could afford to wait. Slow and \nsilent he crept back to his lair and half closed his eyes. \nWhen morning came the terror of the dwarves grew less. They realized that dangers of this kind \nwere inevitable in dealing with such a guardian, and that it was no good giving up their quest yet. Nor \ncould they get away just now, as Thorin had pointed out. Their ponies were lost or killed, and they \nwould have to wait some time before Smaug relaxed his watch sufficiently for them to dare the long \nway on foot. Luckily they had saved enough of their stores to last them still for some time. \nThey debated long on what was to be done, but they could think of no way of getting rid of Smaug \n\u2014 which had always been a weak point in their plans, as Bilbo felt inclined to point out. Then as is the \nnature of folk that are thoroughly perplexed, they began to grumble at the hobbit, blaming him for \nwhat had at first so pleased them: for bringing away a cup and stirring up Smaug\u2019 s wrath so soon. \n\u201CWhat else do you suppose a burglar is to do?\u201D asked Bilbo angrily. \u201CI was not engaged to kill \ndragons, that is warrior\u2019s work, but to steal treasure. I made the best beginning I could. Did you expect \nme to trot back with the whole hoard of Thror on my back? If there is any grumbling to be done, I \nthink I might have a say. You ought to have brought five hundred burglars not one. I am sure it \nreflects great credit on your grandfather, but you cannot pretend that you ever made the vast extent of \nhis wealth clear to me. I should want hundreds of years to bring it all up, if I was fifty times as big, \nand Smaug as tame as a rabbit.\u201D \nAfter that of course the dwarves begged his pardon. \u201CWhat then do you propose we should do, Mr. \nBaggins?\u201D asked Thorin politely. \n\u201CI have no idea at the moment \u2014 if you mean about removing the treasure. That obviously depends \nentirely on some new turn of luck and the getting rid of Smaug. Getting rid of dragons is not at all in \nmy line, but I will do my best to think about it. Personally I have no hopes at all, and wish I was safe \nback at home.\u201D \n\u201CNever mind that for the moment! What are we to do now, to-day?\u201D \n\u201CWell, if you really want my advice, I should say we can do nothing but stay where we are. By day \nwe can no doubt creep out safely enough to take the air. Perhaps before long one or two could be \nchosen to go back to the store by the river and replenish our supplies. But in the meanwhile everyone \nought to be well inside the tunnel by night. \n\u201CNow I will make you an offer. I have got my ring and will creep down this very noon \u2014 then if \never Smaug ought to be napping \u2014 and see what he is up to. Perhaps something will turn up. \u2018Every \nworm has his weak spot,\u2019 as my father used to say, though I am sure it was not from personal \nexperience.\u201D \nNaturally the dwarves accepted the offer eagerly. Already they had come to respect little Bilbo. \nNow he had become the real leader in their adventure. He had begun to have ideas and plans of his \nown. When midday came he got ready for another j ourney down into the Mountain. He did not like it \nof course, but it was not so bad now he knew, more or less, what was in front of him. Had he known \nmore about dragons and their wily ways, he might have been more frightened and less hopeful of \ncatching this one napping. \nThe sun was shining when he started, but it was as dark as night in the tunnel. The light from the \ndoor, almost closed, soon faded as he went down. So silent was his going that smoke on a gentle wind \ncould hardly have surpassed it, and he was inclined to feel a bit proud of himself as he drew near the \nlower door. There was only the very faintest glow to be seen. \n\u201COld Smaug is weary and asleep,\u201D he thought. \u201CHe can\u2019t see me and he won\u2019t hear me. Cheer up \nBilbo!\u201D He had forgotten or had never heard about dragons\u2019 sense of smell. It is also an awkward fact \nthat they can keep half an eye open watching while they sleep, if they are suspicious. \nSmaug certainly looked fast asleep, almost dead and dark, with scarcely a snore more than a whiff \nof unseen steam, when Bilbo peeped once more from the entrance. He was just about to step out on to \nthe floor when he caught a sudden thin and piercing ray of red from under the drooping lid of Smaug\u2019 s \nleft eye. He was only pretending to sleep! He was watching the tunnel entrance! Hurriedly Bilbo \nstepped back and blessed the luck of his ring. Then Smaug spoke. \n\u201CWell, thief! I smell you and I feel your air. I hear your breath. Come along! Help yourself again, \nthere is plenty and to spare!\u201D \nBut Bilbo was not quite so unlearned in dragon-lore as all that, and if Smaug hoped to get him to \ncome nearer so easily he was disappointed. \u201CNo thank you, O Smaug the Tremendous!\u201D he replied. \n\u201CI did not come for presents. I only wished to have a look at you and see if you were truly as great \nas tales say. I did not believe them.\u201D \n\u201CDo you now?\u201D said the dragon somewhat flattered, even though he did not believe a word of it. \n\u201CTruly songs and tales fall utterly short of the reality, O Smaug the Chiefest and Greatest of \nCalamities,\u201D replied Bilbo. \n\u201CYou have nice manners for a thief and a liar,\u201D said the dragon. \u201CYou seem familiar with my name, \nbut I don\u2019t seem to remember smelling you before. Who are you and where do you come from, may I \nask?\u201D \n\u201CYou may indeed! I come from under the hill, and under the hills and over the hills my paths led. \nAnd through the air. I am he that walks unseen.\u201D \n\u201CSo I can well believe,\u201D said Smaug, \u201Cbut that is hardly your usual name.\u201D \n\u201CI am the clue-finder, the web-cutter, the stinging fly. I was chosen for the lucky number.\u201D \n\u201CLovely titles!\u201D sneered the dragon. \u201CBut lucky numbers don\u2019t always come off.\u201D \n\u201CI am he that buries his friends alive and drowns them and draws them alive again from the water. I \ncame from the end of a bag, but no bag went over me.\u201D \n\u201CThese don\u2019t sound so creditable,\u201D scoffed Smaug. \u201CI am the friend of bears and the guest of \neagles. I am Ringwinner and Luckwearer; and I am Barrel-rider,\u201D went on Bilbo beginning to be \npleased with his riddling. \n\u201CThat\u2019s better!\u201D said Smaug. \u201CBut don\u2019t let your imagination run away with you!\u201D \nThis of course is the way to talk to dragons, if you don\u2019t want to reveal your proper name (which is \nwise), and don\u2019t want to infuriate them by a flat refusal (which is also very wise). No dragon can resist \nthe fascination of riddling talk and of wasting time trying to understand it. There was a lot here which \nSmaug did not understand at all (though I expect you do, since you know all about Bilbo\u2019s adventures \nto which he was referring), but he thought he understood enough, and he chuckled in his wicked \ninside. \n\u201CI thought so last night,\u201D he smiled to himself. \u201CLake-men, some nasty scheme of those miserable \ntub-trading Lake-men, or I\u2019m a lizard. I haven\u2019t been down that way for an age and an age; but I will \nsoon alter that!\u201D \n\u201CVery well, O Barrel-rider!\u201D he said aloud. \u201CMaybe Barrel was your pony\u2019s name; and maybe not, \nthough it was fat enough. You may walk unseen, but you did not walk all the way. Let me tell you I ate \nsix ponies last night and I shall catch and eat all the others before long. In return for the excellent \nmeal I will give you one piece of advice for your good: don\u2019t have more to do with dwarves than you \ncan help!\u201D \n\u201CDwarves!\u201D said Bilbo in pretended surprise. \u201CDon\u2019t talk to me!\u201D said Smaug. \u201CI know the smell \n(and taste) of dwarf \u2014 no one better. Don\u2019t tell me that I can eat a dwarf-ridden pony and not know it! \nYou\u2019ll come to a bad end, if you go with such friends, Thief Barrel-rider. I don\u2019t mind if you go back \nand tell them so from me.\u201D But he did not tell Bilbo that there was one smell he could not make out at \nall, hobbit-smell; it was quite outside his experience and puzzled him mightily. \n\u201CI suppose you got a fair price for that cup last night?\u201D he went on. \u201CCome now, did you? Nothing \nat all! Well, that\u2019s just like them. And I suppose they are skulking outside, and your job is to do all the \ndangerous work and get what you can when I\u2019m not looking \u2014 for them? And you will get a fair share? \nDon\u2019t you believe it! If you get off alive, you will be lucky.\u201D \nBilbo was now beginning to feel really uncomfortable. Whenever Smaug\u2019s roving eye, seeking for \nhim in the shadows, flashed across him, he trembled, and an unaccountable desire seized hold of him \nto rush out and reveal himself and tell all the truth to Smaug. In fact he was in grievous danger of \ncoming under the dragon-spell. But plucking up courage he spoke again. \n\u201CYou don\u2019t know everything, O Smaug the Mighty,\u201D said he. \u201CNot gold alone brought us hither.\u201D \n\u201CHa! Ha! You admit the 'us\u2019\u201D laughed Smaug. \u201CWhy not say 'us fourteen\u2019 and be done with it, Mr. \nLucky Number? I am pleased to hear that you had other business in these parts besides my gold. In \nthat case you may, perhaps, not altogether waste your time. \n\u201CI don\u2019t know if it has occurred to you that, even if you could steal the gold bit by bit \u2014 a matter of \na hundred years or so \u2014 you could not get it very far? Not much use on the mountain-side? Not much \nuse in the forest? Bless me! Had you never thought of the catch? A fourteenth share, I suppose, or \nsomething like it, those were the terms, eh? But what about delivery? What about cartage? What about \narmed guards and tolls?\u201D And Smaug laughed aloud. He had a wicked and a wily heart, and he knew \nhis guesses were not far out, though he suspected that the Lake-men were at the back of the plans, and \nthat most of the plunder was meant to stop there in the town by the shore that in his young days had \nbeen called Esgaroth. \nYou will hardly believe it, but poor Bilbo was really very taken aback. So far all his thoughts and \nenergies had been concentrated on getting to the Mountain and finding the entrance. He had never \nbothered to wonder how the treasure was to be removed, certainly never how any part of it that might \nfall to his share was to be brought back all the way to Bag-End Under-Hill. \nNow a nasty suspicion began to grow in his mind \u2014 had the dwarves forgotten this important point \ntoo, or were they laughing in their sleeves at him all the time? That is the effect that dragon-talk has \non the inexperienced. Bilbo of course ought to have been on his guard; but Smaug had rather an \noverwhelming personality. \n\u201CI tell you,\u201D he said, in an effort to remain loyal to his friends and to keep his end up, \u201Cthat gold \nwas only an afterthought with us. We came over hill and under hill, by wave and wind, for Revenge. \nSurely, O Smaug the unassessably wealthy, you must realize that your success has made you some \nbitter enemies?\u201D \nThen Smaug really did laugh \u2014 a devastating sound which shook Bilbo to the floor, while far up in \nthe tunnel the dwarves huddled together and imagined that the hobbit had come to a sudden and a \nnasty end. \n\u201CRevenge!\u201D he snorted, and the light of his eyes lit the hall from floor to ceiling like scarlet \nlightning. \u201CRevenge! The King under the Mountain is dead and where are his kin that dare seek \nrevenge? Girion Lord of Dale is dead, and I have eaten his people like a wolf among sheep, and where \nare his sons\u2019 sons that dare approach me? I kill where I wish and none dare resist. I laid low the \nwarriors of old and their like is not in the world today. Then I was but young and tender. Now I am old \nand strong, strong, strong, Thief in the Shadows!\u201D he gloated. \u201CMy armour is like tenfold shields, my \nteeth are swords, my claws spears, the shock of my tail a thunderbolt, my wings a hurricane, and my \nbreath death!\u201D \n\u201CI have always understood,\u201D said Bilbo in a frightened squeak, \u201Cthat dragons were softer \nunderneath, especially in the region of the \u2014 er \u2014 chest; but doubtless one so fortified has thought of \nthat.\u201D \nThe dragon stopped short in his boasting. \u201CYour information is antiquated,\u201D he snapped. \u201CI am \narmoured above and below with iron scales and hard gems. No blade can pierce me.\u201D \n\u201CI might have guessed it,\u201D said Bilbo. \u201CTruly there can nowhere be found the equal of Lord Smaug \nthe Impenetrable. What magnificence to possess a waistcoat of fine diamonds!\u201D \n\u201CYes, it is rare and wonderful, indeed,\u201D said Smaug absurdly pleased. He did not know that the \nhobbit had already caught a glimpse of his peculiar under-covering on his previous visit, and was \nitching for a closer view for reasons of his own. The dragon rolled over. \u201CLook!\u201D he said. \u201CWhat do \nyou say to that?\u201D \n\u201CDazzlingly marvellous! Perfect! Flawless! Staggering!\u201D exclaimed Bilbo aloud, but what he \nthought inside was: \u201COld fool! Why, there is a large patch in the hollow of his left breast as bare as a \nsnail out of its shell!\u201D \nAfter he had seen that Mr. Baggins\u2019 one idea was to get away. \u201CWell, I really must not detain Your \nMagnificence any longer,\u201D he said, \u201Cor keep you from much needed rest. Ponies take some catching, I \nbelieve, after a long start. And so do burglars,\u201D he added as a parting shot, as he darted back and fled \nup the tunnel. \nIt was an unfortunate remark, for the dragon spouted terrific flames after him, and fast though he \nsped up the slope, he had not gone nearly far enough to be comfortable before the ghastly head of \nSmaug was thrust against the opening behind. Luckily the whole head and jaws could not squeeze in, \nbut the nostrils sent forth fire and vapour to pursue him, and he was nearly overcome, and stumbled \nblindly on in great pain and fear. He had been feeling rather pleased with the cleverness of his \nconversation with Smaug, but his mistake at the end shook him into better sense. \n\u201CNever laugh at live dragons, Bilbo you fool!\u201D he said to himself, and it became a favourite saying \nof his later, and passed into a proverb. \u201CYou aren\u2019t nearly through this adventure yet,\u201D he added, and \nthat was pretty true as well. \nThe afternoon was turning into evening when he came out again and stumbled and fell in a faint on the \n\u2018doorstep\u2019. The dwarves revived him, and doctored his scorches as well as they could; but it was a \nlong time before the hair on the back of his head and his heels grew properly again: it had all been \nsinged and frizzled right down to the skin. In the meanwhile his friends did their best to cheer him up; \nand they were eager for his story, especially wanting to know why the dragon had made such an awful \nnoise, and how Bilbo had escaped. \nBut the hobbit was worried and uncomfortable, and they had difficulty in getting anything out of \nhim. On thinking things over he was now regretting some of the things he had said to the dragon, and \nwas not eager to repeat them. The old thrush was sitting on a rock near by with his head cocked on one \nside, listening to all that was said. It shows what an ill temper Bilbo was in: he picked up a stone and \nthrew it at the thrush, which merely fluttered aside and came back. \n\u201CDrat the bird!\u201D said Bilbo crossly. \u201CI believe he is listening, and I don\u2019t like the look of him.\u201D \n\u201CLeave him alone!\u201D said Thorin. \u201CThe thrushes are good and friendly \u2014 this is a very old bird \nindeed, and is maybe the last left of the ancient breed that used to live about here, tame to the hands of \nmy father and grandfather. They were a long-lived and magical race, and this might even be one of \nthose that were alive then, a couple of hundreds of years or more ago. The Men of Dale used to have \nthe trick of understanding their language, and used them for messengers to fly to the Men of the Lake \nand elsewhere.\u201D \n\u201CWell, he\u2019ll have news to take to Lake-town all right, if that is what he is after,\u201D said Bilbo; \n\u201Cthough I don\u2019t suppose there are any people left there that trouble with thrush-language.\u201D \n\u201CWhy what has happened?\u201D cried the dwarves. \u201CDo get on with your tale!\u201D \nSo Bilbo told them all he could remember, and he confessed that he had a nasty feeling that the \ndragon guessed too much from his riddles added to the camps and the ponies. \u201CI am sure he knows we \ncame from Lake-town and had help from there; and I have a horrible feeling that his next move may \nbe in that direction. I wish to goodness I had never said that about Barrel-rider; it would make even a \nblind rabbit in these parts think of the Lake-men.\u201D \n\u201CWell, well! It cannot be helped, and it is difficult not to slip in talking to a dragon, or so I have \nalways heard,\u201D said Balin anxious to comfort him. \u201CI think you did very well, if you ask me \u2014 you \nfound out one very useful thing at any rate, and got home alive, and that is more than most can say \nwho have had words with the likes of Smaug. It may be a mercy and a blessing yet to know of the bare \npatch in the old Worm\u2019s diamond waistcoat.\u201D \nThat turned the conversation, and they all began discussing dragon-slayings historical, dubious, \nand mythical, and the various sorts of stabs and jabs and undercuts, and the different arts devices and \nstratagems by which they had been accomplished. The general opinion was that catching a dragon \nnapping was not as easy as it sounded, and the attempt to stick one or prod one asleep was more likely \nto end in disaster than a bold frontal attack. All the while they talked the thrush listened, till at last \nwhen the stars began to peep forth, it silently spread its wings and flew away. And all the while they \ntalked and the shadows lengthened Bilbo became more and more unhappy and his foreboding grew. \nAt last he interrupted them. \u201CI am sure we are very unsafe here,\u201D he said, \u201Cand I don\u2019t see the point \nof sitting here. The dragon has withered all the pleasant green, and anyway the night has come and it is \ncold. But I feel it in my bones that this place will be attacked again. Smaug knows now how I came \ndown to his hall, and you can trust him to guess where the other end of the tunnel is. He will break all \nthis side of the Mountain to bits, if necessary, to stop up our entrance, and if we are smashed with it \nthe better he will like it.\u201D \n\u201CYou are very gloomy, Mr. Baggins!\u201D said Thorin. \u201CWhy has not Smaug blocked the lower end, \nthen, if he is so eager to keep us out? He has not, or we should have heard him.\u201D \n\u201CI don\u2019t know, I don\u2019t know \u2014 because at first he wanted to try and lure me in again, I suppose, and \nnow perhaps because he is waiting till after tonight\u2019s hunt, or because he does not want to damage his \nbedroom if he can help it \u2014 but I wish you would not argue. Smaug will be coming out at any minute \nnow, and our only hope is to get well in the tunnel and shut the door.\u201D \nHe seemed so much in earnest that the dwarves at last did as he said, though they delayed shutting \nthe door \u2014 it seemed a desperate plan, for no one knew whether or how they could get it open again \nfrom the inside, and the thought of being shut in a place from which the only way out led through the \ndragon\u2019s lair was not one they liked. Also everything seemed quite quiet, both outside and down the \ntunnel. So for a longish while they sat inside not far down from the half-open door and went on \ntalking. \nThe talk turned to the dragon\u2019s wicked words about the dwarves. Bilbo wished he had never heard \nthem, or at least that he could feel quite certain that the dwarves now were absolutely honest when \nthey declared that they had never thought at all about what would happen after the treasure had been \nwon. \u201CWe knew it would be a desperate venture,\u201D said Thorin, \u201Cand we know that still; and I still think \nthat when we have won it will be time enough to think what to do about it. As for your share, Mr. \nBaggins, I assure you we are more than grateful and you shall choose your own fourteenth, as soon as \nwe have anything to divide. I am sorry if you are worried about transport, and I admit the difficulties \nare great \u2014 the lands have not become less wild with the passing of time, rather the reverse \u2014 but we \nwill do whatever we can for you, and take our share of the cost when the time comes. Believe me or \nnot as you like!\u201D \nFrom that the talk turned to the great hoard itself and to the things that Thorin and Balin \nremembered. They wondered if they were still lying there unharmed in the hall below: the spears that \nwere made for the armies of the great King Bladorthin (long since dead), each had a thrice-forged \nhead and their shafts were inlaid with cunning gold, but they were never delivered or paid for; shields \nmade for warriors long dead; the great golden cup of Thror, two-handed, hammered and carven with \nbirds and flowers whose eyes and petals were of jewels; coats of mail gilded and silvered and \nimpenetrable; the necklace of Girion, Lord of Dale, made of five hundred emeralds green as grass, \nwhich he gave for the arming of his eldest son in a coat of dwarf-linked rings the like of which had \nnever been made before, for it was wrought of pure silver to the power and strength of triple steel. But \nfairest of all was the great white gem, which the dwarves had found beneath the roots of the Mountain, \nthe Heart of the Mountain, the Arkenstone of Thrain. \n\u201CThe Arkenstone! The Arkenstone!\u201D murmured Thorin in the dark, half dreaming with his chin \nupon his knees. \u201CIt was like a globe with a thousand facets; it shone like silver in the firelight, like \nwater in the sun, like snow under the stars, like rain upon the Moon!\u201D \nBut the enchanted desire of the hoard had fallen from Bilbo. All through their talk he was only half \nlistening to them. He sat nearest to the door with one ear cocked for any beginnings of a sound \nwithout, his other was alert for echoes beyond the murmurs of the dwarves, for any whisper of a \nmovement from far below. \nDarkness grew deeper and he grew ever more uneasy. \u201CShut the door!\u201D he begged them, \u201CI fear that \ndragon in my marrow. I like this silence far less than the uproar of last night. Shut the door before it is \ntoo late!\u201D \nSomething in his voice gave the dwarves an uncomfortable feeling. Slowly Thorin shook off his \ndreams and getting up he kicked away the stone that wedged the door. Then they thrust upon it, and it \nclosed with a snap and a clang. No trace of a keyhole was there left on the inside. They were shut in \nthe Mountain! \nAnd not a moment too soon. They had hardly gone any distance down the tunnel when a blow \nsmote the side of the Mountain like the crash of battering-rams made of forest oaks and swung by \ngiants. The rock boomed, the walls cracked and stones fell from the roof on their heads. What would \nhave happened if the door had still been open I don\u2019t like to think. They fled further down the tunnel \nglad to be still alive, while behind them outside they heard the roar and rumble of Smaug\u2019s fury. He \nwas breaking rocks to pieces, smashing wall and cliff with the lashings of his huge tail, till their little \nlofty camping ground, the scorched grass, the thrush\u2019s stone, the snail-covered walls, the narrow \nledge, and all disappeared in a jumble of smithereens, and an avalanche of splintered stones fell over \nthe cliff into the valley below. \nSmaug had left his lair in silent stealth, quietly soared into the air, and then floated heavy and slow \nin the dark like a monstrous crow, down the wind towards the west of the Mountain, in the hopes of \ncatching unawares something or somebody there, and of spying the outlet to the passage which the \nthief had used. This was the outburst of his wrath when he could find nobody and see nothing, even \nwhere he guessed the outlet must actually be. \nAfter he had let off his rage in this way he felt better and he thought in his heart that he would not \nbe troubled again from that direction. In the meanwhile he had further vengeance to take. \u201CBarrel- \nrider!\u201D he snorted. \u201CYour feet came from the waterside and up the water you came without a doubt. I \ndon\u2019t know your smell, but if you are not one of those men of the Lake, you had their help. They shall \nsee me and remember who is the real King under the Mountain!\u201D \nHe rose in fire and went away south towards the Running River. \nChapter XTIT \nNOT AT HOME \nIn the meanwhile, the dwarves sat in darkness, and utter silence fell about them. Little they ate and \nlittle they spoke. They could not count the passing of time; and they scarcely dared to move, for the \nwhisper of their voices echoed and rustled in the tunnel. If they dozed, they woke still to darkness and \nto silence going on unbroken. At last after days and days of waiting, as it seemed, when they were \nbecoming choked and dazed for want of air, they could bear it no longer. They would almost have \nwelcomed sounds from below of the dragon\u2019s return. In the silence they feared some cunning devilry \nof his, but they could not sit there for ever. \nThorin spoke: \u201CLet us try the door!\u201D he said. \u201CI must feel the wind on my face soon or die. I think I \nwould rather be smashed by Smaug in the open than suffocate in here!\u201D So several of the dwarves got \nup and groped back to where the door had been. But they found that the upper end of the tunnel had \nbeen shattered and blocked with broken rock. Neither key nor the magic it had once obeyed would \never open that door again. \n\u201CWe are trapped!\u201D they groaned. \u201CThis is the end. We shall die here.\u201D \nBut somehow, just when the dwarves were most despairing, Bilbo felt a strange lightening of the \nheart, as if a heavy weight had gone from under his waistcoat. \n\u201CCome, come!\u201D he said. \u201C\u2018While there\u2019s life there\u2019s hope!\u2019 as my father used to say, and \u2018Third \ntime pays for all.\u2019 I am going down the tunnel once again. I have been that way twice, when I knew \nthere was a dragon at the other end, so I will risk a third visit when I am no longer sure. Anyway the \nonly way out is down. And I think this time you had better all come with me.\u201D \nIn desperation they agreed, and Thorin was the first to go forward by Bilbo\u2019s side. \n\u201CNow do be careful!\u201D whispered the hobbit, \u201Cand as quiet as you can be! There may be no Smaug at \nthe bottom, but then again there may be. Don\u2019t let us take any unnecessary risks!\u201D \nDown, down they went. The dwarves could not, of course, compare with the hobbit in real stealth, \nand they made a deal of puffing and shuffling which echoes magnified alarmingly; but though every \nnow and again Bilbo in fear stopped and listened, not a sound stirred below. Near the bottom, as well \nas he could judge, Bilbo slipped on his ring and went ahead. But he did not need it: the darkness was \ncomplete, and they were all invisible, ring or no ring. In fact so black was it that the hobbit came to \nthe opening unexpectedly, put his hand on air, stumbled forward, and rolled headlong into the hall! \nThere he lay face downwards on the floor and did not dare to get up, or hardly even to breathe. But \nnothing moved. There was not a gleam of light \u2014 unless, as it seemed to him, when at last he slowly \nraised his head, there was a pale white glint, above him and far off in the gloom. But certainly it was \nnot a spark of dragon-fire, though the worm-stench was heavy in the place, and the taste of vapour was \non his tongue. \nAt length Mr. Baggins could bear it no longer. \u201CConfound you, Smaug, you worm!\u201D he squeaked \naloud. \u201CStop playing hide-and-seek! Give me a light, and then eat me, if you can catch me!\u201D \nFaint echoes ran round the unseen hall, but there was no answer. \nBilbo got up, and found that he did not know in what direction to turn. \n\u201CNow I wonder what on earth Smaug is playing at,\u201D he said. \u201CHe is not at home today (or tonight, \nor whatever it is), I do believe. If Oin and Gloin have not lost their tinder-boxes, perhaps we can make \na little light, and have a look round before the luck turns.\u201D \n\u201CLight!\u201D he cried. \u201CCan anybody make a light?\u201D \nThe dwarves, of course, were very alarmed when Bilbo fell forward down the step with a bump into \nthe hall, and they sat huddled just where he had left them at the end of the tunnel. \n\u201CSh! sh!\u201D they hissed, when they heard his voice; and though that helped the hobbit to find out \nwhere they were, it was some time before he could get anything else out of them. But in the end, when \nBilbo actually began to stamp on the floor, and screamed out \u201Clight!\u201D at the top of his shrill voice, \nThorin gave way, and Oin and Gloin were sent back to their bundles at the top of the tunnel. \nAfter a while a twinkling gleam showed them returning, Oin with a small pine-torch alight in his \nhand, and Gloin with a bundle of others under his arm. Quickly Bilbo trotted to the door and took the \ntorch; but he could not persuade the dwarves to light the others or to come and join him yet. As Thorin \ncarefully explained, Mr. Baggins was still officially their expert burglar and investigator. If he liked to \nrisk a light, that was his affair. They would wait in the tunnel for his report. So they sat near the door \nand watched. \nThey saw the little dark shape of the hobbit start across the floor holding his tiny light aloft. Every \nnow and again, while he was still near enough, they caught a glint and a tinkle as he stumbled on some \ngolden thing. The light grew smaller as he wandered away into the vast hall; then it began to rise \ndancing into the air. Bilbo was climbing the great mound of treasure. Soon he stood upon the top, and \nstill went on. Then they saw him halt and stoop for a moment; but they did not know the reason. \nIt was the Arkenstone, the Heart of the Mountain. So Bilbo guessed from Thorin\u2019 s description; but \nindeed there could not be two such gems, even in so marvellous a hoard, even in all the world. Ever as \nhe climbed, the same white gleam had shone before him and drawn his feet towards it. Slowly it grew \nto a little globe of pallid light. Now as he came near, it was tinged with a flickering sparkle of many \ncolours at the surface, reflected and splintered from the wavering light of his torch. At last he looked \ndown upon it, and he caught his breath. The great jewel shone before his feet of its own inner light, \nand yet, cut and fashioned by the dwarves, who had dug it from the heart of the mountain long ago, it \ntook all light that fell upon it and changed it into ten thousand sparks of white radiance shot with \nglints of the rainbow. \nSuddenly Bilbo\u2019s arm went towards it drawn by its enchantment. His small hand would not close \nabout it, for it was a large and heavy gem; but he lifted it, shut his eyes, and put it in his deepest \npocket. \n\u201CNow I am a burglar indeed!\u201D thought he. \u201CBut I suppose I must tell the dwarves about it \u2014 some \ntime. They did say I could pick and choose my own share; and I think I would choose this, if they took \nall the rest!\u201D All the same he had an uncomfortable feeling that the picking and choosing had not \nreally been meant to include this marvellous gem, and that trouble would yet come of it. \nNow he went on again. Down the other side of the great mound he climbed, and the spark of his \ntorch vanished from the sight of the watching dwarves. But soon they saw it far away in the distance \nagain. Bilbo was crossing the floor of the hall. \nHe went on, until he came to the great doors at the further side, and there a draught of air refreshed \nhim, but it almost puffed out his light. He peeped timidly through, and caught a glimpse of great \npassages and of the dim beginnings of wide stairs going up into the gloom. And still there was no sight \nnor sound of Smaug. He was just going to turn and go back, when a black shape swooped at him, and \nbrushed his face. He squeaked and started, stumbled backwards and fell. His torch dropped head \ndownwards and went out! \n\u201COnly a bat, I suppose and hope!\u201D he said miserably. \u201CBut now what am I to do? Which is East, \nSouth, North, or West?\u201D \n\u201CThorin! Balin! Oin! Gloin! Fili! Kili!\u201D he cried as loud as he could \u2014 it seemed a thin little noise \nin the wide blackness. \u201CThe light\u2019s gone out! Someone come and find me and help me!\u201D For the \nmoment his courage had failed altogether. \nFaintly the dwarves heard his small cries, though the only word they could catch was \u201Chelp!\u201D \n\u201CNow what on earth or under it has happened?\u201D said Thorin. \u201CCertainly not the dragon, or he would \nnot go on squeaking.\u201D \nThey waited a moment or two, and still there were no dragon-noises, no sound at all in fact but \nBilbo\u2019s distant voice. \u201CCome, one of you, get another light or two!\u201D Thorin ordered. \u201CIt seems we have \ngot to go and help our burglar.\u201D \n\u201CIt is about our turn to help,\u201D said Balin, \u201Cand I am quite willing to go. Anyway I expect it is safe \nfor the moment.\u201D \nGloin lit several more torches, and then they all crept out, one by one, and went along the wall as \nhurriedly as they could. It was not long before they met Bilbo himself coming back towards them. His \nwits had quickly returned as soon as he saw the twinkle of their lights. \n\u201COnly a bat and a dropped torch, nothing worse!\u201D he said in answer to their questions. Though they \nwere much relieved, they were inclined to be grumpy at being frightened for nothing; but what they \nwould have said, if he had told them at that moment about the Arkenstone, I don\u2019t know. The mere \nfleeting glimpses of treasure which they had caught as they went along had rekindled all the fire of \ntheir dwarvish hearts; and when the heart of a dwarf, even the most respectable, is wakened by gold \nand by jewels, he grows suddenly bold, and he may become fierce. \nThe dwarves indeed no longer needed any urging. All were now eager to explore the hall while they \nhad the chance, and willing to believe that, for the present, Smaug was away from home. Each now \ngripped a lighted torch; and as they gazed, first on one side and then on another, they forgot fear and \neven caution. They spoke aloud, and cried out to one another, as they lifted old treasures from the \nmound or from the wall and held them in the light, caressing and fingering them. \nFili and Kili were almost in merry mood, and finding still hanging there many golden harps strung \nwith silver they took them and struck them; and being magical (and also untouched by the dragon, \nwho had small interest in music) they were still in tune. The dark hall was filled with a melody that \nhad long been silent. But most of the dwarves were more practical: they gathered gems and stuffed \ntheir pockets, and let what they could not carry fall back through their fingers with a sigh. Thorin was \nnot least among these; but always he searched from side to side for something which he could not \nfind. It was the Arkenstone; but he spoke of it yet to no one. \nNow the dwarves took down mail and weapons from the walls, and armed themselves. Royal \nindeed did Thorin look, clad in a coat of gold-plated rings, with a silver-hafted axe in a belt crusted \nwith scarlet stones. \n\u201CMr. Baggins!\u201D he cried. \u201CHere is the first payment of your reward! Cast off your old coat and put \non this!\u201D \nWith that he put on Bilbo a small coat of mail, wrought for some young elf-prince long ago. It was \nof silver-steel, which the elves call mithril, and with it went a belt of pearls and crystals. A light helm \nof figured leather, strengthened beneath with hoops of steel, and studded about the brim with white \ngems, was set upon the hobbit\u2019s head. \n\u201CI feel magnificent,\u201D he thought; \u201Cbut I expect I look rather absurd. How they would laugh on the \nHill at home! Still I wish there was a looking-glass handy!\u201D \nAll the same Mr. Baggins kept his head more clear of the bewitchment of the hoard than the \ndwarves did. Long before the dwarves were tired of examining the treasures, he became weary of it \nand sat down on the floor; and he began to wonder nervously what the end of it all would be. \u201CI would \ngive a good many of these precious goblets,\u201D he thought, \u201Cfor a drink of something cheering out of one \nof Beorn\u2019s wooden bowls!\u201D \n\u201CThorin!\u201D he cried aloud. \u201CWhat next? We are armed, but what good has any armour ever been \nbefore against Smaug the Dreadful? This treasure is not yet won back. We are not looking for gold yet, \nbut for a way of escape; and we have tempted luck too long!\u201D \n\u201CYou speak the truth!\u201D answered Thorin, recovering his wits. \u201CLet us go! I will guide you. Not in a \nthousand years should I forget the ways of this palace.\u201D Then he hailed the others, and they gathered \ntogether, and holding their torches above their heads they passed through the gaping doors, not \nwithout many a backward glance of longing. \nTheir glittering mail they had covered again with their old cloaks and their bright helms with their \ntattered hoods, and one by one they walked behind Thorin, a line of little lights in the darkness that \nhalted often, listening in fear once more for any rumour of the dragon\u2019s coming. \nThough all the old adornments were long mouldered or destroyed, and though all was befouled and \nblasted with the comings and goings of the monster, Thorin knew every passage and every turn. They \nclimbed long stairs, and turned and went down wide echoing ways, and turned again and climbed yet \nmore stairs, and yet more stairs again. These were smooth, cut out of the living rock broad and fair; \nand up, up, the dwarves went, and they met no sign of any living thing, only furtive shadows that fled \nfrom the approach of their torches fluttering in the draughts. \nThe steps were not made, all the same, for hobbit-legs, and Bilbo was just feeling that he could go \non no longer, when suddenly the roof sprang high and far beyond the reach of their torch-light. A \nwhite glimmer could be seen coming through some opening far above, and the air smelt sweeter. \nBefore them light came dimly through great doors, that hung twisted on their hinges and half burnt. \n\u201CThis is the great chamber of Thror,\u201D said Thorin; \u201Cthe hall of feasting and of council. Not far off \nnow is the Front Gate.\u201D \nThey passed through the ruined chamber. Tables were rotting there; chairs and benches were lying \nthere overturned, charred and decaying. Skulls and bones were upon the floor among flagons and \nbowls and broken drinking-horns and dust. As they came through yet more doors at the further end, a \nsound of water fell upon their ears, and the grey light grew suddenly more full. \n\u201CThere is the birth of the Running River,\u201D said Thorin. \u201CFrom here it hastens to the Gate. Let us \nfollow it!\u201D \nOut of a dark opening in a wall of rock there issued a boiling water, and it flowed swirling in a \nnarrow channel, carved and made straight and deep by the cunning of ancient hands. Beside it ran a \nstone-paved road, wide enough for many men abreast. Swiftly along this they ran, and round a wide- \nsweeping turn \u2014 and behold! before them stood the broad light of day. In front there rose a tall arch, \nstill showing the fragments of old carven work within, worn and splintered and blackened though it \nwas. A misty sun sent its pale light between the arms of the Mountain, and beams of gold fell on the \npavement at the threshold. \nA whirl of bats frightened from slumber by their smoking torches flurried over them; as they \nsprang forward their feet slithered on stones rubbed smooth and slimed by the passing of the dragon. \nNow before them the water fell noisily outward and foamed down towards the valley. They flung their \npale torches to the ground, and stood gazing out with dazzled eyes. They were come to the Front Gate, \nand were looking out upon Dale. \n\u201CWell!\u201D said Bilbo, \u201CI never expected to be looking out of this door. And I never expected to be so \npleased to see the sun again, and to feel the wind on my face. But, ow! this wind is cold!\u201D \nIt was. A bitter easterly breeze blew with a threat of oncoming winter. It swirled over and round the \narms of the Mountain into the valley, and sighed among the rocks. After their long time in the stewing \ndepths of the dragon-haunted caverns, they shivered in the sun. \nSuddenly Bilbo realized that he was not only tired but also very hungry indeed. \u201CIt seems to be late \nmorning,\u201D he said, \u201Cand so I suppose it is more or less breakfast-time \u2014 if there is any breakfast to \nhave. But I don\u2019t feel that Smaug\u2019s front doorstep is the safest place for a meal. Do let\u2019s go \nsomewhere where we can sit quiet for a bit!\u201D \n\u201CQuite right!\u201D said Balin. \u201CAnd I think I know which way we should go: we ought to make for the \nold look-out post at the South-West corner of the Mountain.\u201D \n\u201CHow far is that?\u201D asked the hobbit. \n\u201CFive hours march, I should think. It will be rough going. The road from the Gate along the left \nedge of the stream seems all broken up. But look down there! The river loops suddenly east across \nDale in front of the ruined town. At that point there was once a bridge, leading to steep stairs that \nclimbed up the right bank, and so to a road running towards Ravenhill. There is (or was) a path that \nleft the road and climbed up to the post. A hard climb, too, even if the old steps are still there.\u201D \n\u201CDear me!\u201D grumbled the hobbit. \u201CMore walking and more climbing without breakfast! I wonder \nhow many breakfasts, and other meals, we have missed inside that nasty clockless, timeless hole?\u201D \nAs a matter of fact two nights and the day between had gone by (and not altogether without food) \nsince the dragon smashed the magic door, but Bilbo had quite lost count, and it might have been one \nnight or a week of nights for all he could tell. \n\u201CCome, come!\u201D said Thorin laughing \u2014 his spirits had begun to rise again, and he rattled the \nprecious stones in his pockets. \u201CDon\u2019t call my palace a nasty hole! You wait till it has been cleaned \nand redecorated!\u201D \n\u201CThat won\u2019t be till Smaug\u2019s dead,\u201D said Bilbo glumly. \u201CIn the meanwhile where is he? I would give \na good breakfast to know. I hope he is not up on the Mountain looking down at us!\u201D \nThat idea disturbed the dwarves mightily, and they quickly decided that Bilbo and Balin were right. \n\u201CWe must move away from here,\u201D said Dori. \u201CI feel as if his eyes were on the back of my head.\u201D \n\u201CIt\u2019s a cold lonesome place,\u201D said Bombur. \u201CThere may be drink, but I see no sign of food. A \ndragon would always be hungry in such parts.\u201D \n\u201CCome on! Come on!\u201D cried the others. \u201CLet us follow Balin\u2019 s path!\u201D \nUnder the rocky wall to the right there was no path, so on they trudged among the stones on the left \nside of the river, and the emptiness and desolation soon sobered even Thorin again. The bridge that \nBalin had spoken of they found long fallen, and most of its stones were now only boulders in the \nshallow noisy stream; but they forded the water without much difficulty, and found the ancient steps, \nand climbed the high bank. After going a short way they struck the old road, and before long came to a \ndeep dell sheltered among the rocks; there they rested for a while and had such a breakfast as they \ncould, chiefly cram and water. (If you want to know what cram is, I can only say that I don\u2019t know the \nrecipe; but it is biscuitish, keeps good indefinitely, is supposed to be sustaining, and is certainly not \nentertaining, being in fact very uninteresting except as a chewing exercise. It was made by the Lake- \nmen for long journeys.) \nAfter that they went on again; and now the road struck westwards and left the river, and the great \nshoulder of the south-pointing mountain-spur drew ever nearer. At length they reached the hill path. It \nscrambled steeply up, and they plodded slowly one behind the other, till at last in the late afternoon \nthey came to the top of the ridge and saw the wintry sun going downwards to the West. \nHere they found a flat place without a wall on three sides, but backed to the North by a rocky face \nin which there was an opening like a door. From that door there was a wide view East and South and \nWest. \n\u201CHere,\u201D said Balin, \u201Cin the old days we used always to keep watchmen, and that door behind leads \ninto a rockhewn chamber that was made here as a guardroom. There were several places like it round \nthe Mountain. But there seemed small need for watching in the days of our prosperity, and the guards \nwere made over comfortable, perhaps \u2014 otherwise we might have had longer warning of the coming of \nthe dragon, and things might have been different. Still, here we can now lie hid and sheltered for a \nwhile, and can see much without being seen.\u201D \n\u201CNot much use, if we have been seen coming here,\u201D said Dori, who was always looking up towards \nthe Mountain\u2019s peak, as if he expected to see Smaug perched there like a bird on a steeple. \n\u201CWe must take our chance of that,\u201D said Thorin. \u201CWe can go no further to-day.\u201D \n\u201CHear, hear!\u201D cried Bilbo, and flung himself on the ground. \nIn the rock-chamber there would have been room for a hundred, and there was a small chamber \nfurther in, more removed from the cold outside. It was quite deserted; not even wild animals seemed \nto have used it in all the days of Smaug\u2019 s dominion. There they laid their burdens; and some threw \nthemselves down at once and slept, but the others sat near the outer door and discussed their plans. In \nall their talk they came perpetually back to one thing: where was Smaug? They looked West and there \nwas nothing, and East there was nothing, and in the South there was no sign of the dragon, but there \nwas a gathering of very many birds. At that they gazed and wondered; but they were no nearer \nunderstanding it, when the first cold stars came out. \nChapter XTV \nFIRE AND WATER \nNow if you wish, like the dwarves, to hear news of Smaug, you must go back again to the evening \nwhen he smashed the door and flew off in rage, two days before. \nThe men of the lake-town Esgaroth were mostly indoors, for the breeze was from the black East \nand chill, but a few were walking on the quays, and watching, as they were fond of doing, the stars \nshine out from the smooth patches of the lake as they opened in the sky. From their town the Lonely \nMountain was mostly screened by the low hills at the far end of the lake, through a gap in which the \nRunning River came down from the North. Only its high peak could they see in clear weather, and \nthey looked seldom at it, for it was ominous and drear even in the light of morning. Now it was lost \nand gone, blotted in the dark. \nSuddenly it flickered back to view; a brief glow touched it and faded. \n\u201CLook!\u201D said one. \u201CThe lights again! Last night the watchmen saw them start and fade from \nmidnight until dawn. Something is happening up there.\u201D \n\u201CPerhaps the King under the Mountain is forging gold,\u201D said another. \u201CIt is long since he went \nNorth. It is time the songs began to prove themselves again.\u201D \n\u201CWhich king?\u201D said another with a grim voice. \u201CAs like as not it is the marauding fire of the \nDragon, the only king under the Mountain we have ever known.\u201D \n\u201CYou are always foreboding gloomy things!\u201D said the others. \u201CAnything from floods to poisoned \nfish. Think of something cheerful!\u201D \nThen suddenly a great light appeared in the low place in the hills and the northern end of the lake \nturned golden. \u201CThe King beneath the Mountain!\u201D they shouted. \u201CHis wealth is like the Sun, his silver \nlike a fountain, his rivers golden run! The river is running gold from the Mountain!\u201D they cried, and \neverywhere windows were opening and feet were hurrying. \nThere was once more a tremendous excitement and enthusiasm. But the grim-voiced fellow ran \nhotfoot to the Master. \u201CThe dragon is coming or I am a fool!\u201D he cried. \u201CCut the bridges! To arms! To \narms!\u201D \nThen warning trumpets were suddenly sounded, and echoed along the rocky shores. The cheering \nstopped and the joy was turned to dread. So it was that the dragon did not find them quite unprepared. \nBefore long, so great was his speed, they could see him as a spark of fire rushing towards them and \ngrowing ever huger and more bright, and not the most foolish doubted that the prophecies had gone \nrather wrong. Still they had a little time. Every vessel in the town was filled with water, every warrior \nwas armed, every arrow and dart was ready, and the bridge to the land was thrown down and \ndestroyed, before the roar of Smaug\u2019 s terrible approach grew loud, and the lake rippled red as fire \nbeneath the awful beating of his wings. Amid shrieks and wailing and the shouts of men he came over \nthem, swept towards the bridges and was foiled! The bridge was gone, and his enemies were on an \nisland in deep water \u2014 too deep and dark and cool for his liking. If he plunged into it, a vapour and a \nsteam would arise enough to cover all the land with a mist for days; but the lake was mightier than he, \nit would quench him before he could pass through. \nRoaring he swept back over the town. A hail of dark arrows leaped up and snapped and rattled on \nhis scales and jewels, and their shafts fell back kindled by his breath burning and hissing into the lake. \nNo fireworks you ever imagined equalled the sights that night. At the twanging of the bows and the \nshrilling of the trumpets the dragon\u2019s wrath blazed to its height, till he was blind and mad with it. No \none had dared to give battle to him for many an age; nor would they have dared now, if it had not been \nfor the grim-voiced man (Bard was his name), who ran to and fro cheering on the archers and urging \nthe Master to order them to fight to the last arrow. \nFire leaped from the dragon\u2019s jaws. He circled for a while high in the air above them lighting all \nthe lake; the trees by the shores shone like copper and like blood with leaping shadows of dense black \nat their feet. Then down he swooped straight through the arrow-storm, reckless in his rage, taking no \nheed to turn his scaly sides towards his foes, seeking only to set their town ablaze. \nFire leaped from thatched roofs and wooden beam-ends as he hurtled down and past and round \nagain, though all had been drenched with water before he came. Once more water was flung by a \nhundred hands wherever a spark appeared. Back swirled the dragon. A sweep of his tail and the roof of \nthe Great House crumbled and smashed down. Flames unquenchable sprang high into the night. \nAnother swoop and another, and another house and then another sprang afire and fell; and still no \narrow hindered Smaug or hurt him more than a fly from the marshes. \nAlready men were jumping into the water on every side. Women and children were being huddled into \nladen boats in the market-pool. Weapons were flung down. There was mourning and weeping, where \nbut a little time ago the old songs of mirth to come had been sung about the dwarves. Now men cursed \ntheir names. The Master himself was turning to his great gilded boat, hoping to row away in the \nconfusion and save himself. Soon all the town would be deserted and burned down to the surface of \nthe lake. \nThat was the dragon\u2019s hope. They could all get into boats for all he cared. There he could have fine \nsport hunting them, or they could stop till they starved. Let them try to get to land and he would be \nready. Soon he would set all the shoreland woods ablaze and wither every field and pasture. Just now \nhe was enjoying the sport of town-baiting more than he had enjoyed anything for years. \nBut there was still a company of archers that held their ground among the burning houses. Their \ncaptain was Bard, grim-voiced and grim-faced, whose friends had accused him of prophesying floods \nand poisoned fish, though they knew his worth and courage. He was a descendant in long line of \nGirion, Lord of Dale, whose wife and child had escaped down the Running River from the ruin long \nago. Now he shot with a great yew bow, till all his arrows but one were spent. The flames were near \nhim. His companions were leaving him. He bent his bow for the last time. \nSuddenly out of the dark something fluttered to his shoulder. He started \u2014 but it was only an old \nthrush. Unafraid it perched by his ear and it brought him news. Marvelling he found he could \nunderstand its tongue, for he was of the race of Dale. \n\u201CWait! Wait!\u201D it said to him. \u201CThe moon is rising. Look for the hollow of the left breast as he flies \nand turns above you!\u201D And while Bard paused in wonder it told him of tidings up in the Mountain and \nof all that it had heard. \nThen Bard drew his bow-string to his ear. The dragon was circling back, flying low, and as he came \nthe moon rose above the eastern shore and silvered his great wings. \n\u201CArrow!\u201D said the bowman. \u201CBlack arrow! I have saved you to the last. You have never failed me \nand always I have recovered you. I had you from my father and he from of old. If ever you came from \nthe forges of the true king under the Mountain, go now and speed well!\u201D \nThe dragon swooped once more lower than ever, and as he turned and dived down his belly \nglittered white with sparkling fires of gems in the moon \u2014 but not in one place. The great bow \ntwanged. The black arrow sped straight from the string, straight for the hollow by the left breast where \nthe foreleg was flung wide. In it smote and vanished, barb, shaft and feather, so fierce was its flight. \nWith a shriek that deafened men, felled trees and split stone, Smaug shot spouting into the air, turned \nover and crashed down from on high in ruin. \nFull on the town he fell. His last throes splintered it to sparks and gledes. The lake roared in. A vast \nsteam leaped up, white in the sudden dark under the moon. There was a hiss, a gushing whirl, and then \nsilence. And that was the end of Smaug and Esgaroth, but not of Bard. \nThe waxing moon rose higher and higher and the wind grew loud and cold. It twisted the white fog \ninto bending pillars and hurrying clouds and drove it off to the West to scatter in tattered shreds over \nthe marshes before Mirkwood. Then the many boats could be seen dotted dark on the surface of the \nlake, and down the wind came the voices of the people of Esgaroth lamenting their lost town and \ngoods and ruined houses. But they had really much to be thankful for, had they thought of it, though it \ncould hardly be expected that they should just then: three quarters of the people of the town had at \nleast escaped alive; their woods and fields and pastures and cattle and most of their boats remained \nundamaged; and the dragon was dead. What that meant they had not yet realized. \nThey gathered in mournful crowds upon the western shores, shivering in the cold wind, and their \nfirst complaints and anger were against the Master, who had left the town so soon, while some were \nstill willing to defend it. \n\u201CHe may have a good head for business \u2014 especially his own business,\u201D some murmured, \u201Cbut he is \nno good when anything serious happens!\u201D And they praised the courage of Bard and his last mighty \nshot. \u201CIf only he had not been killed,\u201D they all said, \u201Cwe would make him a king. Bard the Dragon- \nshooter of the line of Girion! Alas that he is lost!\u201D \nAnd in the very midst of their talk a tall figure stepped from the shadows. He was drenched with \nwater, his black hair hung wet over his face and shoulders, and a fierce light was in his eyes. \n\u201CBard is not lost!\u201D he cried. \u201CHe dived from Esgaroth, when the enemy was slain. I am Bard, of the \nline of Girion; I am the slayer of the dragon!\u201D \n\u201CKing Bard! King Bard!\u201D they shouted; but the Master ground his chattering teeth. \n\u201CGirion was lord of Dale, not king of Esgaroth,\u201D he said. \u201CIn the Lake-town we have always elected \nmasters from among the old and wise, and have not endured the rule of mere fighting men. Let 'King \nBard\u2019 go back to his own kingdom \u2014 Dale is now freed by his valour, and nothing hinders his return. \nAnd any that wish can go with him, if they prefer the cold stones under the shadow of the Mountain to \nthe green shores of the lake. The wise will stay here and hope to rebuild our town, and enjoy again in \ntime its peace and riches.\u201D \n\u201CWe will have King Bard!\u201D the people near at hand shouted in reply. \u201CWe have had enough of the \nold men and the money-counters!\u201D And people further off took up the cry: \u201CUp the Bowman, and down \nwith Moneybags,\u201D till the clamour echoed along the shore. \n\u201CI am the last man to undervalue Bard the Bowman,\u201D said the Master warily (for Bard now stood \nclose beside him). \u201CHe has tonight earned an eminent place in the roll of the benefactors of our town; \nand he is worthy of many imperishable songs. But, why O People?\u201D \u2014 and here the Master rose to his \nfeet and spoke very loud and clear \u2014 \u201CWhy do I get all your blame? For what fault am I to be deposed? \nWho aroused the dragon from his slumber, I might ask? Who obtained of us rich gifts and ample help, \nand led us to believe that old songs could come true? Who played on our soft hearts and our pleasant \nfancies? What sort of gold have they sent down the river to reward us? Dragon-fire and ruin! From \nwhom should we claim the recompense of our damage, and aid for our widows and orphans?\u201D \nAs you see, the Master had not got his position for nothing. The result of his words was that for the \nmoment the people quite forgot their idea of a new king, and turned their angry thoughts towards \nThorin and his company. Wild and bitter words were shouted from many sides; and some of those who \nhad before sung the old songs loudest, were now heard as loudly crying that the dwarves had stirred \nthe dragon up against them deliberately! \n\u201CFools!\u201D said Bard. \u201CWhy waste words and wrath on those unhappy creatures? Doubtless they \nperished first in fire, before Smaug came to us.\u201D Then even as he was speaking, the thought came into \nhis heart of the fabled treasure of the Mountain lying without guard or owner, and he fell suddenly \nsilent. He thought of the Master\u2019s words, and of Dale rebuilt, and filled with golden bells, if he could \nbut find the men. \nAt length he spoke again: \u201CThis is no time for angry words, Master, or for considering weighty \nplans of change. There is work to do. I serve you still \u2014 though after a while I may think again of your \nwords and go North with any that will follow me.\u201D \nThen he strode off to help in the ordering of the camps and in the care of the sick and the wounded. \nBut the Master scowled at his back as he went, and remained sitting on the ground. He thought much \nbut said little, unless it was to call loudly for men to bring him fire and food. \nNow everywhere Bard went he found talk running like fire among the people concerning the vast \ntreasure that was now unguarded. Men spoke of the recompense for all their harm that they would \nsoon get from it, and wealth over and to spare with which to buy rich things from the South; and it \ncheered them greatly in their plight. That was as well, for the night was bitter and miserable. Shelters \ncould be contrived for few (the Master had one) and there was little food (even the Master went short). \nMany took ill of wet and cold and sorrow that night, and afterwards died, who had escaped uninjured \nfrom the ruin of the town; and in the days that followed there was much sickness and great hunger. \nMeanwhile Bard took the lead, and ordered things as he wished, though always in the Master\u2019s \nname, and he had a hard task to govern the people and direct the preparations for their protection and \nhousing. Probably most of them would have perished in the winter that now hurried after autumn, if \nhelp had not been to hand. But help came swiftly; for Bard at once had speedy messengers sent up the \nriver to the Forest to ask the aid of the King of the Elves of the Wood, and these messengers had found \na host already on the move, although it was then only the third day after the fall of Smaug. \nThe Elvenking had received news from his own messengers and from the birds that loved his folk, \nand already knew much of what had happened. Very great indeed was the commotion among all things \nwith wings that dwelt on the borders of the Desolation of the Dragon. The air was filled with circling \nflocks, and their swift-flying messengers flew here and there across the sky. Above the borders of the \nForest there was whistling, crying and piping. Far over Mirkwood tidings spread: \u201CSmaug is dead!\u201D \nLeaves rustled and startled ears were lifted. Even before the Elvenking rode forth the news had passed \nwest right to the pinewoods of the Misty Mountains; Beorn had heard it in his wooden house, and the \ngoblins were at council in their caves. \n\u201CThat will be the last we shall hear of Thorin Oakenshield, I fear,\u201D said the king. \u201CHe would have \ndone better to have remained my guest. It is an ill wind, all the same,\u201D he added, \u201Cthat blows no one \nany good.\u201D For he too had not forgotten the legend of the wealth of Thror. So it was that Bard\u2019s \nmessengers found him now marching with many spearmen and bowmen; and crows were gathered \nthick above him, for they thought that war was awakening again, such as had not been in those parts \nfor a long age. \nBut the king, when he received the prayers of Bard, had pity, for he was the lord of a good and \nkindly people; so turning his march, which had at first been direct towards the Mountain, he hastened \nnow down the river to the Long Lake. He had not boats or rafts enough for his host, and they were \nforced to go the slower way by foot; but great store of goods he sent ahead by water. Still elves are \nlight-footed, and though they were not in these days much used to the marches and the treacherous \nlands between the Forest and the Lake, their going was swift. Only five days after the death of the \ndragon they came upon the shores and looked on the ruins of the town. Their welcome was good, as \nmay be expected, and the men and their Master were ready to make any bargain for the future in return \nfor the Elvenking\u2019s aid. \nTheir plans were soon made. With the women and the children, the old and the unfit, the Master \nremained behind; and with him were some men of crafts and many skilled elves; and they busied \nthemselves felling trees, and collecting the timber sent down from the Forest. Then they set about \nraising many huts by the shore against the oncoming winter; and also under the Master\u2019s direction \nthey began the planning of a new town, designed more fair and large even than before, but not in the \nsame place. They removed northward higher up the shore; for ever after they had a dread of the water \nwhere the dragon lay. He would never again return to his golden bed, but was stretched cold as stone, \ntwisted upon the floor of the shallows. There for ages his huge bones could be seen in calm weather \namid the ruined piles of the old town. But few dared to cross the cursed spot, and none dared to dive \ninto the shivering water or recover the precious stones that fell from his rotting carcase. \nBut all the men of arms who were still able, and the most of the Elvenking\u2019s array, got ready to \nmarch north to the Mountain. It was thus that in eleven days from the ruin of the town the head of \ntheir host passed the rock-gates at the end of the lake and came into the desolate lands. \nChapter XV \nTHE GATHERING OF THE CLOUDS \nNow we will return to Bilbo and the dwarves. All night one of them had watched, but when morning \ncame they had not heard or seen any sign of danger. But ever more thickly the birds were gathering. \nTheir companies came flying from the South; and the crows that still lived about the Mountain were \nwheeling and crying unceasingly above. \n\u201CSomething strange is happening,\u201D said Thorin. \u201CThe time has gone for the autumn wanderings; \nand these are birds that dwell always in the land; there are starlings and flocks of finches; and far off \nthere are many carrion birds as if a battle were afoot!\u201D \nSuddenly Bilbo pointed: \u201CThere is that old thrush again!\u201D he cried. \u201CHe seems to have escaped, \nwhen Smaug smashed the mountain-side, but I don\u2019t suppose the snails have!\u201D \nSure enough the old thrush was there, and as Bilbo pointed, he flew towards them and perched on a \nstone near by. Then he fluttered his wings and sang; then he cocked his head on one side, as if to \nlisten; and again he sang, and again he listened. \n\u201CI believe he is trying to tell us something,\u201D said Balin; \u201Cbut I cannot follow the speech of such \nbirds, it is very quick and difficult. Can you make it out Baggins?\u201D \n\u201CNot very well,\u201D said Bilbo (as a matter of fact, he could make nothing of it at all); \u201Cbut the old \nfellow seems very excited.\u201D \n\u201CI only wish he was a raven!\u201D said Balin. \n\u201CI thought you did not like them! You seemed very shy of them, when we came this way before.\u201D \n\u201CThose were crows! And nasty suspicious-looking creatures at that, and rude as well. You must \nhave heard the ugly names they were calling after us. But the ravens are different. There used to be \ngreat friendship between them and the people of Thror; and they often brought us secret news, and \nwere rewarded with such bright things as they coveted to hide in their dwellings. \n\u201CThey live many a year, and their memories are long, and they hand on their wisdom to their \nchildren. I knew many among the ravens of the rocks when I was a dwarf-lad. This very height was \nonce named Ravenhill, because there was a wise and famous pair, old Care and his wife, that lived \nhere above the guard-chamber. But I don\u2019t suppose that any of that ancient breed linger here now.\u201D \nNo sooner had he finished speaking than the old thrush gave a loud call, and immediately flew \naway. \n\u201CWe may not understand him, but that old bird understands us, I am sure,\u201D said Balin. \u201CKeep watch \nnow, and see what happens!\u201D \nBefore long there was a fluttering of wings, and back came the thrush; and with him came a most \ndecrepit old bird. He was getting blind, he could hardly fly, and the top of his head was bald. He was \nan aged raven of great size. He alighted stiffly on the ground before them, slowly flapped his wings, \nand bobbed towards Thorin. \n\u201CO Thorin son of Thrain, and Balin son of Fundin,\u201D he croaked (and Bilbo could understand what \nhe said, for he used ordinary language and not bird-speech). \u201CI am Roac son of Care. Care is dead, but \nhe was well known to you once. It is a hundred years and three and fifty since I came out of the egg, \nbut I do not forget what my father told me. Now I am the chief of the great ravens of the Mountain. \nWe are few, but we remember still the king that was of old. Most of my people are abroad, for there \nare great tidings in the South \u2014 some are tidings of joy to you, and some you will not think so good. \n\u201CBehold! the birds are gathering back again to the Mountain and to Dale from South and East and \nWest, for word has gone out that Smaug is dead!\u201D \n\u201CDead! Dead?\u201D shouted the dwarves. \u201CDead! Then we have been in needless fear \u2014 and the treasure \nis ours!\u201D They all sprang up and began to caper about for joy. \n\u201CYes, dead,\u201D said Roac. \u201CThe thrush, may his feathers never fall, saw him die, and we may trust his \nwords. He saw him fall in battle with the men of Esgaroth the third night back from now at the rising \nof the moon.\u201D \nIt was some time before Thorin could bring the dwarves to be silent and listen to the raven\u2019s news. \nAt length when he had told all the tale of the battle he went on: \n\u201CSo much for joy, Thorin Oakenshield. You may go back to your halls in safety; all the treasure is \nyours \u2014 for the moment. But many are gathering hither beside the birds. The news of the death of the \nguardian has already gone far and wide, and the legend of the wealth of Thror has not lost in the \ntelling during many years; many are eager for a share of the spoil. Already a host of the elves is on the \nway, and carrion birds are with them hoping for battle and slaughter. By the lake men murmur that \ntheir sorrows are due to the dwarves; for they are homeless and many have died, and Smaug has \ndestroyed their town. They too think to find amends from your treasure, whether you are alive or dead. \n\u201CYour own wisdom must decide your course; but thirteen is small remnant of the great folk of \nDurin that once dwelt here, and now are scattered far. If you will listen to my counsel, you will not \ntrust the Master of the Lake-men, but rather him that shot the dragon with his bow. Bard is he, of the \nrace of Dale, of the line of Girion; he is a grim man but true. We would see peace once more among \ndwarves and men and elves after the long desolation; but it may cost you dear in gold. I have spoken.\u201D \nThen Thorin burst forth in anger: \u201COur thanks, Roac Care\u2019s son. You and your people shall not be \nforgotten. But none of our gold shall thieves take or the violent carry off while we are alive. If you \nwould earn our thanks still more, bring us news of any that draw near. Also I would beg of you, if any \nof you are still young and strong of wing, that you would send messengers to our kin in the mountains \nof the North, both west from here and east, and tell them of our plight. But go specially to my cousin \nDain in the Iron Hills, for he has many people well-armed, and dwells nearest to this place. Bid him \nhasten!\u201D \n\u201CI will not say if this counsel be good or bad,\u201D croaked Roac, \u201Cbut I will do what can be done.\u201D \nThen off he slowly flew. \n\u201CBack now to the Mountain!\u201D cried Thorin. \u201CWe have little time to lose.\u201D \n\u201CAnd little food to use!\u201D cried Bilbo, always practical on such points. In any case he felt that the \nadventure was, properly speaking, over with the death of the dragon \u2014 in which he was much mistaken \n\u2014 and he would have given most of his share of the profits for the peaceful winding up of these \naffairs. \n\u201CBack to the Mountain!\u201D cried the dwarves as if they had not heard him; so back he had to go with \nthem. \nAs you have heard some of the events already, you will see that the dwarves still had some days before \nthem. They explored the caverns once more, and found, as they expected, that only the Front Gate \nremained open; all the other gates (except, of course, the small secret door) had long ago been broken \nand blocked by Smaug, and no sign of them remained. So now they began to labour hard in fortifying \nthe main entrance, and in making a new path that led from it. Tools were to be found in plenty that the \nminers and quarriers and builders of old had used; and at such work the dwarves were still very \nskilled. \nAs they worked the ravens brought them constant tidings. In this way they learned that the \nElvenking had turned aside to the Lake, and they still had a breathing space. Better still, they heard \nthat three of their ponies had escaped and were wandering wild far down the banks of the Running \nRiver, not far from where the rest of their stores had been left. So while the others went on with their \nwork, Fili and Kili were sent, guided by a raven, to find the ponies and bring back all they could. \nThey were four days gone, and by that time they knew that the joined armies of the Lake-men and \nthe Elves were hurrying toward the Mountain. But now their hopes were higher; for they had food for \nsome weeks with care \u2014 chiefly cram, of course, and they were very tired of it; but cram is much better \nthan nothing \u2014 and already the gate was blocked with a wall of squared stones laid dry, but very thick \nand high, across the opening. There were holes in the wall through which they could see (or shoot), but \nno entrance. They climbed in or out with ladders, and hauled stuff up with ropes. For the issuing of the \nstream they had contrived a small low arch under the new wall; but near the entrance they had so \naltered the narrow bed that a wide pool stretched from the mountain- wall to the head of the fall over \nwhich the stream went towards Dale. Approach to the Gate was now only possible, without swimming, \nalong a narrow ledge of the cliff, to the right as one looked outwards from the wall. The ponies they \nhad brought only to the head of the steps above the old bridge, and unloading them there had bidden \nthem return to their masters and sent them back riderless to the South. \nThere came a night when suddenly there were many lights as of fires and torches away south in Dale \nbefore them. \n\u201CThey have come!\u201D called Balin. \u201CAnd their camp is very great. They must have come into the \nvalley under the cover of dusk along both banks of the river.\u201D \nThat night the dwarves slept little. The morning was still pale when they saw a company \napproaching. From behind their wall they watched them come up to the valley\u2019 s head and climb \nslowly up. Before long they could see that both men of the lake armed as if for war and elvish bowmen \nwere among them. At length the foremost of these climbed the tumbled rocks and appeared at the top \nof the falls; and very great was their surprise to see the pool before them and the Gate blocked with a \nwall of new-hewn stone. \nAs they stood pointing and speaking to one another Thorin hailed them: \u201CWho are you,\u201D he called \nin a very loud voice, \u201Cthat come as if in war to the gates of Thorin son of Thrain, King under the \nMountain, and what do you desire?\u201D \nBut they answered nothing. Some turned swiftly back, and the others after gazing for a while at the \nGate and its defences soon followed them. That day the camp was moved to the east of the river, right \nbetween the arms of the Mountain. The rocks echoed then with voices and with song, as they had not \ndone for many a day. There was the sound, too, of elven-harps and of sweet music; and as it echoed up \ntowards them it seemed that the chill of the air was warmed, and they caught faintly the fragrance of \nwoodland flowers blossoming in spring. \nThen Bilbo longed to escape from the dark fortress and to go down and join in the mirth and \nfeasting by the fires. Some of the younger dwarves were moved in their hearts, too, and they muttered \nthat they wished things had fallen out otherwise and that they might welcome such folk as friends; but \nThorin scowled. \nThen the dwarves themselves brought forth harps and instruments regained from the hoard, and \nmade music to soften his mood; but their song was not as elvish song, and was much like the song \nthey had sung long before in Bilbo\u2019s little hobbit-hole. \nUnder the Mountain dark and tall \nThe King has come unto his hall! \nHis foe is dead, the Worm of Dread, \nAnd ever so his foes shall fall. \nThe sword is sharp, the spear is long, \nThe arrow swift, the Gate is strong; \nThe heart is bold that looks on gold; \nThe dwarves no more shall suffer wrong. \nThe dwarves of yore made mighty spells, \nWhile hammers fell like ringing bells \nIn places deep, where dark things sleep, \nIn hollow halls beneath the fells. \nOn silver necklaces they strung \nThe light of stars, on crowns they hung \nThe dragon-fire, from twisted wire \nThe melody of harps they wrung. \nThe mountain throne once more is freed! \nO! wandering folk, the summons heed! Come haste! \nCome haste! across the waste! \nThe king of friend and kin has need. \nNow call we over mountains cold, \n\u2018Come back unto the caverns old\u2019! \nHere at the Gates the king awaits, \nHis hands are rich with gems and gold. \nThe king is come unto his hall \nUnder the Mountain dark and tall. \nThe Worm of Dread is slain and dead, \nAnd ever so our foes shall fall! \nThis song appeared to please Thorin, and he smiled again and grew merry; and he began reckoning \nthe distance to the Iron Hills and how long it would be before Dain could reach the Lonely Mountain, \nif he had set out as soon as the message reached him. But Bilbo\u2019s heart fell, both at the song and the \ntalk: they sounded much too warlike. \nThe next morning early a company of spearmen was seen crossing the river, and marching up the \nvalley. They bore with them the green banner of the Elvenking and the blue banner of the Lake, and \nthey advanced until they stood right before the wall at the Gate. \nAgain Thorin hailed them in a loud voice: \u201CWho are you that come armed for war to the gates of \nThorin son of Thrain, King under the Mountain?\u201D This time he was answered. \nA tall man stood forward, dark of hair and grim of face, and he cried: \u201CHail Thorin! Why do you \nfence yourself like a robber in his hold? We are not yet foes, and we rejoice that you are alive beyond \nour hope. We came expecting to find none living here; yet now that we are met there is matter for a \nparley and a council.\u201D \n\u201CWho are you, and of what would you parley?\u201D \n\u201CI am Bard, and by my hand was the dragon slain and your treasure delivered. Is that not a matter \nthat concerns you? Moreover I am by right descent the heir of Girion of Dale, and in your hoard is \nmingled much of the wealth of his halls and towns, which of old Smaug stole. Is not that a matter of \nwhich we may speak? Further in his last battle Smaug destroyed the dwellings of the men of Esgaroth, \nand I am yet the servant of their Master. I would speak for him and ask whether you have no thought \nfor the sorrow and misery of his people. They aided you in your distress, and in recompense you have \nthus far brought ruin only, though doubtless undesigned.\u201D \nNow these were fair words and true, if proudly and grimly spoken; and Bilbo thought that Thorin \nwould at once admit what justice was in them. He did not, of course, expect that any one would \nremember that it was he who discovered all by himself the dragon\u2019s weak spot; and that was just as \nwell, for no one ever did. But also he did not reckon with the power that gold has upon which a dragon \nhas long brooded, nor with dwarvish hearts. Long hours in the past days Thorin had spent in the \ntreasury, and the lust of it was heavy on him. Though he had hunted chiefly for the Arkenstone, yet he \nhad an eye for many another wonderful thing that was lying there, about which were wound old \nmemories of the labours and the sorrows of his race. \n\u201CYou put your worst cause last and in the chief place,\u201D Thorin answered. \u201CTo the treasure of my \npeople no man has a claim, because Smaug who stole it from us also robbed him of life or home. The \ntreasure was not his that his evil deeds should be amended with a share of it. The price of the goods \nand the assistance that we received of the Lake-men we will fairly pay \u2014 in due time. But nothing will \nwe give, not even a loaf\u2019s worth, under threat of force. While an armed host lies before our doors, we \nlook on you as foes and thieves. \n\u201CIt is in my mind to ask what share of their inheritance you would have paid to our kindred, had \nyou found the hoard unguarded and us slain.\u201D \n\u201CA just question,\u201D replied Bard. \u201CBut you are not dead, and we are not robbers. Moreover the \nwealthy may have pity beyond right on the needy that befriended them when they were in want. And \nstill my other claims remain unanswered.\u201D \n\u201CI will not parley, as I have said, with armed men at my gate. Nor at all with the people of the \nElvenking, whom I remember with small kindness. In this debate they have no place. Begone now ere \nour arrows fly! And if you would speak with me again, first dismiss the elvish host to the woods where \nit belongs, and then return, laying down your arms before you approach the threshold.\u201D \n\u201CThe Elvenking is my friend, and he has succoured the people of the Lake in their need, though \nthey had no claim but friendship on him,\u201D answered Bard. \u201CWe will give you time to repent your \nwords. Gather your wisdom ere we return!\u201D Then he departed and went back to the camp. \nEre many hours were past, the banner-bearers returned, and trumpeters stood forth and blew a \nblast: \n\u201CIn the name of Esgaroth and the Forest,\u201D one cried, \u201Cwe speak unto Thorin Thrain\u2019s son \nOakenshield, calling himself the King under the Mountain, and we bid him consider well the claims \nthat have been urged, or be declared our foe. At the least he shall deliver one twelfth portion of the \ntreasure unto Bard, as the dragon-slayer, and as the heir of Girion. From that portion Bard will himself \ncontribute to the aid of Esgaroth; but if Thorin would have the friendship and honour of the lands \nabout, as his sires had of old, then he will give also somewhat of his own for the comfort of the men of \nthe Lake.\u201D \nThen Thorin seized a bow of horn and shot an arrow at the speaker. It smote into his shield and \nstuck there quivering. \n\u201CSince such is your answer,\u201D he called in return, \u201CI declare the Mountain besieged. You shall not \ndepart from it, until you call on your side for a truce and a parley. We will bear no weapons against \nyou, but we leave you to your gold. You may eat that, if you will!\u201D \nWith that the messengers departed swiftly, and the dwarves were left to consider their case. So \ngrim had Thorin become, that even if they had wished, the others would not have dared to find fault \nwith him; but indeed most of them seemed to share his mind \u2014 except perhaps old fat Bombur and Fili \nand Kili. Bilbo, of course, disapproved of the whole turn of affairs. He had by now had more than \nenough of the Mountain, and being besieged inside it was not at all to his taste. \n\u201CThe whole place still stinks of dragon,\u201D he grumbled to himself, \u201Cand it makes me sick. And cram \nis beginning simply to stick in my throat.\u201D \nChapter XVT \nA THIEF TN THE NIGHT \nNow the days passed slowly and wearily. Many of the dwarves spent their time piling and ordering the \ntreasure; and now Thorin spoke of the Arkenstone of Thrain, and bade them eagerly to look for it in \nevery corner. \n\u201CFor the Arkenstone of my father,\u201D he said, \u201Cis worth more than a river of gold in itself, and to me \nit is beyond price. That stone of all the treasure I name unto myself, and I will be avenged on anyone \nwho finds it and withholds it.\u201D \nBilbo heard these words and he grew afraid, wondering what would happen, if the stone was found \n\u2014 wrapped in an old bundle of tattered oddments that he used as a pillow. All the same he did not \nspeak of it, for as the weariness of the days grew heavier, the beginnings of a plan had come into his \nlittle head. \nThings had gone on like this for some time, when the ravens brought news that Dain and more than \nfive hundred dwarves, hurrying from the Iron Hills, were now within about two days\u2019 march of Dale, \ncoming from the North-East. \n\u201CBut they cannot reach the Mountain unmarked,\u201D said Roac, \u201Cand I fear lest there be battle in the \nvalley. I do not call this counsel good. Though they are a grim folk, they are not likely to overcome \nthe host that besets you; and even if they did so, what will you gain? Winter and snow is hastening \nbehind them. How shall you be fed without the friendship and goodwill of the lands about you? The \ntreasure is likely to be your death, though the dragon is no more!\u201D \nBut Thorin was not moved. \u201CWinter and snow will bite both men and elves,\u201D he said, \u201Cand they \nmay find their dwelling in the waste grievous to bear. With my friends behind them and winter upon \nthem, they will perhaps be in softer mood to parley with.\u201D \nThat night Bilbo made up his mind. The sky was black and moonless. As soon as it was full dark, \nhe went to a corner of an inner chamber just within the gate and drew from his bundle a rope, and also \nthe Arkenstone wrapped in a rag. Then he climbed to the top of the wall. Only Bombur was there, for \nit was his turn to watch, and the dwarves kept only one watchman at a time. \n\u201CIt is mighty cold!\u201D said Bombur. \u201CI wish we could have a fire up here as they have in the camp!\u201D \n\u201CIt is warm enough inside,\u201D said Bilbo. \n\u201CI daresay; but I am bound here till midnight,\u201D grumbled the fat dwarf. \u201CA sorry business \naltogether. Not that I venture to disagree with Thorin, may his beard grow ever longer; yet he was ever \na dwarf with a stiff neck.\u201D \n\u201CNot as stiff as my legs,\u201D said Bilbo. \u201CI am tired of stairs and stone passages. I would give a good \ndeal for the feel of grass at my toes.\u201D \n\u201CI would give a good deal for the feel of a strong drink in my throat, and for a soft bed after a good \nsupper!\u201D \n\u201CI can\u2019t give you those, while the siege is going on. \nBut it is long since I watched, and I will take your turn for you, if you like. There is no sleep in me \ntonight.\u201D \n\u201CYou are a good fellow, Mr. Baggins, and I will take your offer kindly. If there should be anything \nto note, rouse me first, mind you! I will lie in the inner chamber to the left, not far away.\u201D \n\u201COff you go!\u201D said Bilbo. \u201CI will wake you at midnight, and you can wake the next watchman.\u201D \nAs soon as Bombur had gone, Bilbo put on his ring, fastened his rope, slipped down over the wall, \nand was gone. He had about five hours before him. Bombur would sleep (he could sleep at any time, \nand ever since the adventure in the forest he was always trying to recapture the beautiful dreams he \nhad then); and all the others were busy with Thorin. It was unlikely that any, even Fili or Kili, would \ncome out on the wall until it was their turn. \nIt was very dark, and the road after a while, when he left the newly made path and climbed down \ntowards the lower course of the stream, was strange to him. At last he came to the bend where he had \nto cross the water, if he was to make for the camp, as he wished. The bed of the stream was there \nshallow but already broad, and fording it in the dark was not easy for the little hobbit. He was nearly \nacross when he missed his footing on a round stone and fell into the cold water with a splash. He had \nbarely scrambled out on the far bank, shivering and spluttering, when up came elves in the gloom with \nbright lanterns and searched for the cause of the noise. \n\u201CThat was no fish!\u201D one said. \u201CThere is a spy about. Hide your lights! They will help him more than \nus, if it is that queer little creature that is said to be their servant.\u201D \n\u201CServant, indeed!\u201D snorted Bilbo; and in the middle of his snort he sneezed loudly, and the elves \nimmediately gathered towards the sound. \n\u201CLet\u2019s have a light!\u201D he said. \u201CI am here, if you want me!\u201D and he slipped off his ring, and popped \nfrom behind a rock. \nThey seized him quickly, in spite of their surprise. \u201CWho are you? Are you the dwarves\u2019 hobbit? \nWhat are you doing? How did you get so far past our sentinels?\u201D they asked one after another. \n\u201CI am Mr. Bilbo Baggins,\u201D he answered, \u201Ccompanion of Thorin, if you want to know. I know your \nking well by sight, though perhaps he doesn\u2019t know me to look at. But Bard will remember me, and it \nis Bard I particularly want to see.\u201D \n\u201CIndeed!\u201D said they, \u201Cand what may be your business?\u201D \n\u201CWhatever it is, it\u2019s my own, my good elves. But if you wish ever to get back to your own woods \nfrom this cold cheerless place,\u201D he answered shivering, \u201Cyou will take me along quick to a fire, where \nI can dry \u2014 and then you will let me speak to your chiefs as quick as may be. I have only an hour or \ntwo to spare.\u201D \nThat is how it came about that some two hours after his escape from the Gate, Bilbo was sitting beside \na warm fire in front of a large tent, and there sat too, gazing curiously at him, both the Elvenking and \nBard. A hobbit in elvish armour, partly wrapped in an old blanket, was something new to them. \n\u201CReally you know,\u201D Bilbo was saying in his best business manner, \u201Cthings are impossible. \nPersonally I am tired of the whole affair. I wish I was back in the West in my own home, where folk \nare more reasonable. But I have an interest in this matter \u2014 one fourteenth share, to be precise, \naccording to a letter, which fortunately I believe I have kept.\u201D He drew from a pocket in his old jacket \n(which he still wore over his mail), crumpled and much folded, Thorin\u2019 s letter that had been put under \nthe clock on his mantelpiece in May! \n\u201CA share in the profits, mind you,\u201D he went on. \u201CI am aware of that. Personally I am only too ready \nto consider all your claims carefully, and deduct what is right from the total before putting in my own \nclaim. However you don\u2019t know Thorin Oakenshield as well as I do now. I assure you, he is quite \nready to sit on a heap of gold and starve, as long as you sit here.\u201D \n\u201CWell, let him!\u201D said Bard. \u201CSuch a fool deserves to starve.\u201D \n\u201CQuite so,\u201D said Bilbo. \u201CI see your point of view. At the same time winter is coming on fast. Before \nlong you will be having snow and what not, and supplies will be difficult \u2014 even for elves I imagine. \nAlso there will be other difficulties. You have not heard of Dain and the dwarves of the Iron Hills?\u201D \n\u201CWe have, a long time ago; but what has he got to do with us?\u201D asked the king. \n\u201CI thought as much. I see I have some information you have not got. Dain, I may tell you, is now \nless than two days\u2019 march off, and has at least five hundred grim dwarves with him \u2014 a good many of \nthem have had experience in the dreadful dwarf and goblin wars, of which you have no doubt heard. \nWhen they arrive there may be serious trouble.\u201D \n\u201CWhy do you tell us this? Are you betraying your friends, or are you threatening us?\u201D asked Bard \ngrimly. \n\u201CMy dear Bard!\u201D squeaked Bilbo. \u201CDon\u2019t be so hasty! I never met such suspicious folk! I am \nmerely trying to avoid trouble for all concerned. Now I will make you an offer! !\u201D \n\u201CLet us hear it!\u201D they said. \n\u201CYou may see it!\u201D said he. \u201CIt is this!\u201D and he drew forth the Arkenstone, and threw away the \nwrapping. \nThe Elvenking himself, whose eyes were used to things of wonder and beauty, stood up in \namazement. Even Bard gazed marvelling at it in silence. It was as if a globe had been filled with \nmoonlight and hung before them in a net woven of the glint of frosty stars. \n\u201CThis is the Arkenstone of Thrain,\u201D said Bilbo, \u201Cthe Heart of the Mountain; and it is also the heart \nof Thorin. He values it above a river of gold. I give it to you. It will aid you in your bargaining.\u201D Then \nBilbo, not without a shudder, not without a glance of longing, handed the marvellous stone to Bard, \nand he held it in his hand, as though dazed. \n\u201CBut how is it yours to give?\u201D he asked at last with an effort. \n\u201CO well!\u201D said the hobbit uncomfortably. \u201CIt isn\u2019t exactly; but, well, I am willing to let it stand \nagainst all my claim, don\u2019t you know. I may be a burglar \u2014 or so they say: personally I never really \nfelt like one \u2014 but I am an honest one, I hope, more or less. Anyway I am going back now, and the \ndwarves can do what they like to me. I hope you will find it useful.\u201D \nThe Elvenking looked at Bilbo with a new wonder. \u201CBilbo Baggins!\u201D he said. \u201CYou are more \nworthy to wear the armour of elf-princes than many that have looked more comely in it. But I wonder \nif Thorin Oakenshield will see it so. I have more knowledge of dwarves in general than you have \nperhaps. I advise you to remain with us, and here you shall be honoured and thrice welcome.\u201D \n\u201CThank you very much I am sure,\u201D said Bilbo with a bow. \u201CBut I don\u2019t think I ought to leave my \nfriends like this, after all we have gone through together. And I promised to wake old Bombur at \nmidnight, too! Really I must be going, and quickly.\u201D \nNothing they could say would stop him; so an escort was provided for him, and as he went both the \nking and Bard saluted him with honour. As they passed through the camp an old man, wrapped in a \ndark cloak, rose from a tent door where he was sitting and came towards them. \n\u201CWell done! Mr. Baggins!\u201D he said, clapping Bilbo on the back. \u201CThere is always more about you \nthan anyone expects!\u201D It was Gandalf. \nFor the first time for many a day Bilbo was really delighted. But there was no time for all the \nquestions that he immediately wished to ask. \n\u201CAll in good time!\u201D said Gandalf. \u201CThings are drawing towards the end now, unless I am mistaken. \nThere is an unpleasant time just in front of you; but keep your heart up! You may come through all \nright. There is news brewing that even the ravens have not heard. Good night!\u201D \nPuzzled but cheered, Bilbo hurried on. He was guided to a safe ford and set across dry, and then he \nsaid farewell to the elves and climbed carefully back towards the Gate. Great weariness began to come \nover him; but it was well before midnight when he clambered up the rope again \u2014 it was still where he \nhad left it. He untied it and hid it, and then he sat down on the wall and wondered anxiously what \nwould happen next. \nAt midnight he woke up Bombur; and then in turn rolled himself up in his corner, without listening \nto the old dwarf\u2019s thanks (which he felt he had hardly earned). He was soon fast asleep forgetting all \nhis worries till the morning. As a matter of fact he was dreaming of eggs and bacon. \nChapter XVTI \nTHE CLOUDS BURST \nNext day the trumpets rang early in the camp. Soon a single runner was seen hurrying along the \nnarrow path. At a distance he stood and hailed them, asking whether Thorin would now listen to \nanother embassy, since new tidings had come to hand, and matters were changed. \n\u201CThat will be Dain!\u201D said Thorin when he heard. \u201CThey will have got wind of his coming. I thought \nthat would alter their mood! Bid them come few in number and weaponless, and I will hear,\u201D he called \nto the messenger. \nAbout midday the banners of the Forest and the Lake were seen to be borne forth again. A company \nof twenty was approaching. At the beginning of the narrow way they laid aside sword and spear, and \ncame on towards the Gate. Wondering, the dwarves saw that among them were both Bard and the \nElvenking, before whom an old man wrapped in cloak and hood bore a strong casket of iron-bound \nwood. \n\u201CHail Thorin!\u201D said Bard. \u201CAre you still of the same mind?\u201D \n\u201CMy mind does not change with the rising and setting of a few suns,\u201D answered Thorin. \u201CDid you \ncome to ask me idle questions? Still the elf-host has not departed as I bade! Till then you come in vain \nto bargain with me.\u201D \n\u201CIs there then nothing for which you would yield any of your gold?\u201D \n\u201CNothing that you or your friends have to offer.\u201D \n\u201CWhat of the Arkenstone of Thrain?\u201D said he, and at the same moment the old man opened the \ncasket and held aloft the jewel. The light leapt from his hand, bright and white in the morning. \nThen Thorin was stricken dumb with amazement and confusion. No one spoke for a long while. \nThorin at length broke the silence, and his voice was thick with wrath. \u201CThat stone was my father\u2019s, \nand is mine,\u201D he said. \u201CWhy should I purchase my own?\u201D But wonder overcame him and he added: \n\u201CBut how came you by the heirloom of my house \u2014 if there is need to ask such a question of thieves?\u201D \n\u201CWe are not thieves,\u201D Bard answered. \u201CYour own we will give back in return for our own.\u201D \n\u201CHow came you by it?\u201D shouted Thorin in gathering rage. \n\u201CI gave it to them!\u201D squeaked Bilbo, who was peering over the wall, by now in a dreadful fright. \n\u201CYou! You!\u201D cried Thorin, turning upon him and grasping him with both hands. \u201CYou miserable \nhobbit! You undersized \u2014 burglar!\u201D he shouted at a loss for words, and he shook poor Bilbo like a \nrabbit. \n\u201CBy the beard of Durin! I wish I had Gandalf here! Curse him for his choice of you! May his beard \nwither! As for you I will throw you to the rocks!\u201D he cried and lifted Bilbo in his arms. \n\u201CStay! Your wish is granted!\u201D said a voice. The old man with the casket threw aside his hood and \ncloak. \u201CHere is Gandalf! And none too soon it seems. If you don\u2019t like my Burglar, please don\u2019t \ndamage him. \nPut him down, and listen first to what he has to say!\u201D \n\u201CYou all seem in league!\u201D said Thorin dropping Bilbo on the top of the wall. \u201CNever again will I \nhave dealings with any wizard or his friends. What have you to say, you descendant of rats?\u201D \n\u201CDear me! Dear me!\u201D said Bilbo. \u201CI am sure this is all very uncomfortable. You may remember \nsaying that I might choose my own fourteenth share? Perhaps I took it too literally \u2014 I have been told \nthat dwarves are sometimes politer in word than in deed. The time was, all the same, when you \nseemed to think that I had been of some service. Descendant of rats, indeed! Is this all the service of \nyou and your family that I was promised, Thorin? Take it that I have disposed of my share as I wished, \nand let it go at that!\u201D \n\u201CI will,\u201D said Thorin grimly. \u201CAnd I will let you go at that \u2014 and may we never meet again!\u201D Then \nhe turned and spoke over the wall. \u201CI am betrayed,\u201D he said. \u201CIt was rightly guessed that I could not \nforbear to redeem the Arkenstone, the treasure of my house. For it I will give one fourteenth share of \nthe hoard in silver and gold, setting aside the gems; but that shall be accounted the promised share of \nthis traitor, and with that reward he shall depart, and you can divide it as you will. He will get little \nenough, I doubt not. Take him, if you wish him to live; and no friendship of mine goes with him. \n\u201CGet down now to your friends!\u201D he said to Bilbo, \u201Cor I will throw you down.\u201D \n\u201CWhat about the gold and silver?\u201D asked Bilbo. \u201CThat shall follow after, as can be arranged,\u201D said \nhe. \u201CGet down!\u201D \n\u201CUntil then we keep the stone,\u201D cried Bard. \n\u201CYou are not making a very splendid figure as King under the Mountain,\u201D said Gandalf. \u201CBut things \nmay change yet.\u201D \n\u201CThey may indeed,\u201D said Thorin. And already, so strong was the bewilderment of the treasure upon \nhim, he was pondering whether by the help of Dain he might not recapture the Arkenstone and \nwithhold the share of the reward. \nAnd so Bilbo was swung down from the wall, and departed with nothing for all his trouble, except \nthe armour which Thorin had given him already. More than one of the dwarves in their hearts felt \nshame and pity at his going. \n\u201CFarewell!\u201D he cried to them. \u201CWe may meet again as friends.\u201D \n\u201CBe off!\u201D called Thorin. \u201CYou have mail upon you, which was made by my folk, and is too good for \nyou. It cannot be pierced by arrows; but if you do not hasten, I will sting your miserable feet. So be \nswift!\u201D \n\u201CNot so hasty!\u201D said Bard. \u201CWe will give you until tomorrow. At noon we will return, and see if \nyou have brought from the hoard the portion that is to be set against the stone. If that is done without \ndeceit, then we will depart, and the elf-host will go back to the Forest. In the meanwhile farewell!\u201D \nWith that they went back to the camp; but Thorin sent messengers by Roac telling Dain of what \nhad passed, and bidding him come with wary speed. \nThat day passed and the night. The next day the wind shifted west, and the air was dark and gloomy. \nThe morning was still early when a cry was heard in the camp. Runners came in to report that a host of \ndwarves had appeared round the eastern spur of the Mountain and was now hastening to Dale. Dain \nhad come. He had hurried on through the night, and so had come upon them sooner than they had \nexpected. Each one of his folk was clad in a hauberk of steel mail that hung to his knees, and his legs \nwere covered with hose of a fine and flexible metal mesh, the secret of whose making was possessed \nby Dain\u2019s people. The dwarves are exceedingly strong for their height, but most of these were strong \neven for dwarves. In battle they wielded heavy two-handed mattocks; but each of them had also a \nshort broad sword at his side and a roundshield slung at his back. Their beards were forked and plaited \nand thrust into their belts. Their caps were of iron and they were shod with iron, and their faces were \ngrim. \nTrumpets called men and elves to arms. Before long the dwarves could be seen coming up the \nvalley at a great pace. They halted between the river and the eastern spur; but a few held on their way, \nand crossing the river drew near the camp; and there they laid down their weapons and held up their \nhands in sign of peace. Bard went out to meet them, and with him went Bilbo. \n\u201CWe are sent from Dain son of Nain,\u201D they said when questioned. \u201CWe are hastening to our \nkinsmen in the Mountain, since we learn that the kingdom of old is renewed. But who are you that sit \nin the plain as foes before defended walls?\u201D This, of course, in the polite and rather old-fashioned \nlanguage of such occasions, meant simply: \u201CYou have no business here. We are going on, so make \nway or we shall fight you!\u201D They meant to push on between the Mountain and the loop of the river; for \nthe narrow land there did not seem to be strongly guarded. \nBard, of course, refused to allow the dwarves to go straight on to the Mountain. He was determined \nto wait until the gold and silver had been brought out in exchange for the Arkenstone; for he did not \nbelieve that this would be done, if once the fortress was manned with so large and warlike a company. \nThey had brought with them a great store of supplies; for the dwarves can carry very heavy burdens, \nand nearly all of Dain\u2019s folk, in spite of their rapid march, bore huge packs on their backs in addition \nto their weapons. They would stand a siege for weeks, and by that time yet more dwarves might come, \nand yet more, for Thorin had many relatives. Also they would be able to reopen and guard some other \ngate, so that the besiegers would have to encircle the whole mountain; and for that they had not \nsufficient numbers. \nThese were, in fact, precisely their plans (for the raven-messengers had been busy between Thorin \nand Dain); but for the moment the way was barred, so after angry words the dwarf-messengers retired \nmuttering in their beards. Bard then sent messengers at once to the Gate; but they found no gold or \npayment. Arrows came forth as soon as they were within shot, and they hastened back in dismay. In \nthe camp all was now astir, as if for battle; for the dwarves of Dain were advancing along the eastern \nbank. \n\u201CFools!\u201D laughed Bard, \u201Cto come thus beneath the Mountain\u2019s arm! They do not understand war \nabove ground, whatever they may know of battle in the mines. There are many of our archers and \nspearmen now hidden in the rocks upon their right flank. Dwarf-mail may be good, but they will soon \nbe hard put to it. Let us set on them now from both sides, before they are fully rested!\u201D \nBut the Elvenking said: \u201CLong will I tarry, ere I begin this war for gold. The dwarves cannot pass \nus, unless we will, or do anything that we cannot mark. Let us hope still for something that will bring \nreconciliation. Our advantage in numbers will be enough, if in the end it must come to unhappy \nblows.\u201D \nBut he reckoned without the dwarves. The knowledge that the Arkenstone was in the hands of the \nbesiegers burned in their thoughts; also they guessed the hesitation of Bard and his friends, and \nresolved to strike while they debated. \nSuddenly without a signal they sprang silently forward to attack. Bows twanged and arrows \nwhistled; battle was about to be joined. \nStill more suddenly a darkness came on with dreadful swiftness! A black cloud hurried over the \nsky. Winter thunder on a wild wind rolled roaring up and rumbled in the Mountain, and lightning lit \nits peak. And beneath the thunder another blackness could be seen whirling forward; but it did not \ncome with the wind, it came from the North, like a vast cloud of birds, so dense that no light could be \nseen between their wings. \n\u201CHalt!\u201D cried Gandalf, who appeared suddenly, and stood alone, with arms uplifted, between the \nadvancing dwarves and the ranks awaiting them. \u201CHalt!\u201D he called in a voice like thunder, and his staff \nblazed forth with a flash like the lightning. \u201CDread has come upon you all! Alas! it has come more \nswiftly than I guessed. The Goblins are upon you! Bolg- of the North is coming, O Dain! whose father \nyou slew in Moria. Behold! the bats are above his army like a sea of locusts. They ride upon wolves \nand Wargs are in their train!\u201D \nAmazement and confusion fell upon them all. Even as Gandalf had been speaking the darkness \ngrew. The dwarves halted and gazed at the sky. The elves cried out with many voices. \n\u201CCome!\u201D called Gandalf. \u201CThere is yet time for council. Let Dain son of Nain come swiftly to us!\u201D \nSo began a battle that none had expected; and it was called the Battle of Five Armies, and it was very \nterrible. Upon one side were the Goblins and the Wild Wolves, and upon the other were Elves and \nMen and Dwarves. This is how it fell out. Ever since the fall of the Great Goblin of the Misty \nMountains the hatred of their race for the dwarves had been rekindled to fury. Messengers had passed \nto and fro between all their cities, colonies and strongholds; for they resolved now to win the \ndominion of the North. Tidings they had gathered in secret ways; and in all the mountains there was a \nforging and an arming. Then they marched and gathered by hill and valley, going ever by tunnel or \nunder dark, until around and beneath the great mountain Gundabad of the North, where was their \ncapital, a vast host was assembled ready to sweep down in time of storm unawares \nupon the South. Then they learned of the death of Smaug, and joy was in their hearts; and they \nhastened night after night through the mountains, and came thus at last on a sudden from the North \nhard on the heels of Dain. Not even the ravens knew of their coming until they came out in the broken \nlands which divided the Lonely Mountain from the hills behind. How much Gandalf knew cannot be \nsaid, but it is plain that he had not expected this sudden assault. \nThis is the plan that he made in council with the Elven-king and with Bard; and with Dain, for the \ndwarf-lord now joined them: the Goblins were the foes of all, and at their coming all other quarrels \nwere forgotten. Their only hope was to lure the goblins into the valley between the arms of the \nMountain; and themselves to man the great spurs that struck south and east. Yet this would be \nperilous, if the goblins were in sufficient numbers to overrun the Mountain itself, and so attack them \nalso from behind and above; but there was no time to make any other plan, or to summon any help. \nSoon the thunder passed, rolling away to the South-East; but the bat-cloud came, flying lower, over \nthe shoulder of the Mountain, and whirled above them shutting out the light and filling them with \ndread. \n\u201CTo the Mountain!\u201D called Bard. \u201CTo the Mountain! Let us take our places while there is yet time!\u201D \nOn the Southern spur, in its lower slopes and in the rocks at its feet, the Elves were set; on the \nEastern spur were men and dwarves. But Bard and some of the nimblest of men and elves climbed to \nthe height of the Eastern shoulder to gain a view to the North. Soon they could see the lands before the \nMountain\u2019s feet black with a hurrying multitude. Ere long the vanguard swirled round the spur\u2019s end \nand came rushing into Dale. These were the swiftest wolf-riders, and already their cries and howls rent \nthe air afar. A few brave men were strung before them to make a feint of resistance, and many there \nfell before the rest drew back and fled to either side. As Gandalf had hoped, the goblin army had \ngathered behind the resisted vanguard, and poured now in rage into the valley, driving wildly up \nbetween the arms of the Mountain, seeking for the foe. Their banners were countless, black and red, \nand they came on like a tide in fury and disorder. \nIt was a terrible battle. The most dreadful of all Bilbo\u2019s experiences, and the one which at the time \nhe hated most \u2014 which is to say it was the one he was most proud of, and most fond of recalling long \nafterwards, although he was quite unimportant in it. Actually I may say he put on his ring early in the \nbusiness, and vanished from sight, if not from all danger. A magic ring of that sort is not a complete \nprotection in a goblin charge, nor does it stop flying arrows and wild spears; but it does help in getting \nout of the way, and it prevents your head from being specially chosen for a sweeping stroke by a \ngoblin swordsman. \nThe elves were the first to charge. Their hatred for the goblins is cold and bitter. Their spears and \nswords shone in the gloom with a gleam of chill flame, so deadly was the wrath of the hands that held \nthem. As soon as the host of their enemies was dense in the valley, they sent against it a shower of \narrows, and each flickered as it fled as if with stinging fire. Behind the arrows a thousand of their \nspearmen leapt down and charged. The yells were deafening. The rocks were stained black with goblin \nblood. \nJust as the goblins were recovering from the onslaught and the elf-charge was halted, there rose \nfrom across the valley a deep-throated roar. With cries of \u201CMoria!\u201D and \u201CDain, Dain!\u201D the dwarves of \nthe Iron Hills plunged in, wielding their mattocks, upon the other side; and beside them came the men \nof the Lake with long swords. \nPanic came upon the Goblins; and even as they turned to meet this new attack, the elves charged \nagain with renewed numbers. Already many of the goblins were flying back down the river to escape \nfrom the trap; and many of their own wolves were turning upon them and rending the dead and the \nwounded. Victory seemed at hand, when a cry rang out on the heights above. \nGoblins had scaled the Mountain from the other side and already many were on the slopes above \nthe Gate, and others were streaming down recklessly, heedless of those that fell screaming from cliff \nand precipice, to attack the spurs from above. Each of these could be reached by paths that ran down \nfrom the main mass of the Mountain in the centre; and the defenders had too few to bar the way for \nlong. Victory now vanished from hope. They had only stemmed the first onslaught of the black tide. \nDay drew on. The goblins gathered again in the valley. There a host of Wargs came ravening and \nwith them came the bodyguard of Bolg, goblins of huge size with scimitars of steel. Soon actual \ndarkness was coming into a stormy sky; while still the great bats swirled about the heads and ears of \nelves and men, or fastened vampire-like on the stricken. Now Bard was fighting to defend the Eastern \nspur, and yet giving slowly back; and the elf-lords were at bay about their king upon the southern arm, \nnear to the watch-post on Ravenhill. \nSuddenly there was a great shout, and from the Gate came a trumpet call. They had forgotten \nThorin! Part of the wall, moved by levers, fell outward with a crash into the pool. Out leapt the King \nunder the Mountain, and his companions followed him. Hood and cloak were gone; they were in \nshining armour, and red light leapt from their eyes. In the gloom the great dwarf gleamed like gold in \na dying fire. \nRocks were hurled down from on high by the goblins above; but they held on, leapt down to the \nfalls\u2019 foot, and rushed forward to battle. Wolf and rider fell or fled before them. Thorin wielded his \naxe with mighty strokes, and nothing seemed to harm him. \n\u201CTo me! To me! Elves and Men! To me! O my kinsfolk!\u201D he cried, and his voice shook like a horn \nin the valley. \nDown, heedless of order, rushed all the dwarves of Dain to his help. Down too came many of the \nLake-men, for Bard could not restrain them; and out upon the other side came many of the spearmen \nof the elves. Once again the goblins were stricken in the valley; and they were piled in heaps till Dale \nwas dark and hideous with their corpses. The Wargs were scattered and Thorin drove right against the \nbodyguard of Bolg. But he could not pierce their ranks. \nAlready behind him among the goblin dead lay many men and many dwarves, and many a fair elf \nthat should have lived yet long ages merrily in the wood. And as the valley widened his onset grew \never slower. His numbers were too few. His flanks were unguarded. Soon the attackers were attacked, \nand they were forced into a great ring, facing every way, hemmed all about with goblins and wolves \nreturning to the assault. The bodyguard of Bolg came howling against them, and drove in upon their \nranks like waves upon cliffs of sand. Their friends could not help them, for the assault from the \nMountain was renewed with redoubled force, and upon either side men and elves were being slowly \nbeaten down. \nOn all this Bilbo looked with misery. He had taken his stand on Ravenhill among the Elves \u2014 partly \nbecause there was more chance of escape from that point, and partly (with the more Tookish part of \nhis mind) because if he was going to be in a last desperate stand, he preferred on the whole to defend \nthe Elvenking. Gandalf, too, I may say, was there, sitting on the ground as if in deep thought, \npreparing, I suppose, some last blast of magic before the end. \nThat did not seem far off. \u201CIt will not be long now,\u201D thought Bilbo, \u201Cbefore the goblins win the \nGate, and we are all slaughtered or driven down and captured. Really it is enough to make one weep, \nafter all one has gone through. I would rather old Smaug had been left with all the wretched treasure, \nthan that these vile creatures should get it, and poor old Bombur, and Balin and Fili and Kili and all \nthe rest come to a bad end; and Bard too, and the Lake-men and the merry elves. Misery me! I have \nheard songs of many battles, and I have always understood that defeat may be glorious. It seems very \nuncomfortable, not to say distressing. I wish I was well out of it.\u201D \nThe clouds were torn by the wind, and a red sunset slashed the West. Seeing the sudden gleam in \nthe gloom Bilbo looked round. He gave a great cry: he had seen a sight that made his heart leap, dark \nshapes small yet majestic against the distant glow. \n\u201CThe Eagles! The Eagles!\u201D he shouted. \u201CThe Eagles are coming!\u201D \nBilbo\u2019s eyes were seldom wrong. The eagles were coming down the wind, line after line, in such a \nhost as must have gathered from all the eyries of the North. \n\u201CThe Eagles! the Eagles!\u201D Bilbo cried, dancing and waving his arms. If the elves could not see him \nthey could hear him. Soon they too took up the cry, and it echoed across the valley. Many wondering \neyes looked up, though as yet nothing could be seen except from the southern shoulders of the \nMountain. \n\u201CThe Eagles!\u201D cried Bilbo once more, but at that moment a stone hurtling from above smote \nheavily on his helm, and he fell with a crash and knew no more. \nChapter XVTIT \nTHE RETURN TOURNEY \nWhen Bilbo came to himself, he was literally by himself. He was lying on the flat stones of Ravenhill, \nand no one was near. A cloudless day, but cold, was broad above him. He was shaking, and as chilled \nas stone, but his head burned with fire. \n\u201CNow I wonder what has happened?\u201D he said to himself. \u201CAt any rate I am not yet one of the fallen \nheroes; but I suppose there is still time enough for that!\u201D \nHe sat up painfully. Looking into the valley he could see no living goblins. After a while as his \nhead cleared a little, he thought he could see elves moving in the rocks below. He rubbed his eyes. \nSurely there was a camp still in the plain some distance off; and there was a coming and going about \nthe Gate? Dwarves seemed to be busy removing the wall. But all was deadly still. There was no call \nand no echo of a song. Sorrow seemed to be in the air. \n\u201CVictory after all, I suppose!\u201D he said, feeling his aching head. \u201CWell, it seems a very gloomy \nbusiness.\u201D \nSuddenly he was aware of a man climbing up and coming towards him. \n\u201CHullo there!\u201D he called with a shaky voice. \u201CHullo there! What news?\u201D \n\u201CWhat voice is it that speaks among the stones?\u201D said the man halting and peering about him not \nfar from where Bilbo sat. \nThen Bilbo remembered his ring! \u201CWell I\u2019m blessed!\u201D said he. \u201CThis invisibility has its drawbacks \nafter all. Otherwise I suppose I might have spent a warm and comfortable night in bed!\u201D \n\u201CIt\u2019s me, Bilbo Baggins, companion of Thorin!\u201D he cried, hurriedly taking off the ring. \n\u201CIt is well that I have found you!\u201D said the man striding forward. \u201CYou are needed and we have \nlooked for you long. You would have been numbered among the dead, who are many, if Gandalf the \nwizard had not said that your voice was last heard in this place. I have been sent to look here for the \nlast time. Are you much hurt?\u201D \n\u201CA nasty knock on the head, I think,\u201D said Bilbo. \u201CBut I have a helm and a hard skull. All the same \nI feel sick and my legs are like straws.\u201D \n\u201CI will carry you down to the camp in the valley,\u201D said the man, and picked him lightly up. \nThe man was swift and sure-footed. It was not long before Bilbo was set down before a tent in \nDale; and there stood Gandalf, with his arm in a sling. Even the wizard had not escaped without a \nwound; and there were few unharmed in all the host. \nWhen Gandalf saw Bilbo, he was delighted. \u201CBaggins!\u201D he exclaimed. \u201CWell I never! Alive after \nall \u2014 I am glad! I began to wonder if even your luck would see you through! A terrible business, and it \nnearly was disastrous. But other news can wait. Come!\u201D he said more gravely. \u201CYou are called for;\u201D \nand leading the hobbit he took him within the tent. \n\u201CHail! Thorin,\u201D he said as he entered. \u201CI have brought him.\u201D \nThere indeed lay Thorin Oakenshield, wounded with many wounds, and his rent armour and \nnotched axe were cast upon the floor. He looked up as Bilbo came beside him. \n\u201CFarewell, good thief,\u201D he said. \u201CI go now to the halls of waiting to sit beside my fathers, until the \nworld is renewed. Since I leave now all gold and silver, and go where it is of little worth, I wish to part \nin friendship from you, and I would take back my words and deeds at the Gate.\u201D \nBilbo knelt on one knee filled with sorrow. \u201CFarewell, King under the Mountain!\u201D he said. \u201CThis is \na bitter adventure, if it must end so; and not a mountain of gold can amend it. Yet I am glad that I have \nshared in your perils \u2014 that has been more than any Baggins deserves.\u201D \n\u201CNo!\u201D said Thorin. \u201CThere is more in you of good than you know, child of the kindly West. Some \ncourage and some wisdom, blended in measure. If more of us valued food and cheer and song above \nhoarded gold, it would be a merrier world. But sad or merry, I must leave it now. Farewell!\u201D \nThen Bilbo turned away, and he went by himself, and sat alone wrapped in a blanket, and, whether \nyou believe it or not, he wept until his eyes were red and his voice was hoarse. He was a kindly little \nsoul. Indeed it was long before he had the heart to make a joke again. \u201CA mercy it is,\u201D he said at last to \nhimself, \u201Cthat I woke up when I did. I wish Thorin were living, but I am glad that we parted in \nkindness. You are a fool, Bilbo Baggins, and you made a great mess of that business with the stone; \nand there was a battle, in spite of all your efforts to buy peace and quiet, but I suppose you can hardly \nbe blamed for that.\u201D \nAll that had happened after he was stunned, Bilbo learned later; but it gave him more sorrow than joy, \nand he was now weary of his adventure. He was aching in his bones for the homeward journey. That, \nhowever, was a little delayed, so in the meantime I will tell something of events. The Eagles had long \nhad suspicion of the goblins\u2019 mustering; from their watchfulness the movements in the mountains \ncould not be altogether hid. So they too had gathered in great numbers, under the great Eagle of the \nMisty Mountains; and at length smelling battle from afar they had come speeding down the gale in the \nnick of time. They it was who dislodged the goblins from the mountain-slopes, casting them over \nprecipices, or driving them down shrieking and bewildered among their foes. It was not long before \nthey had freed the Lonely Mountain, and elves and men on either side of the valley could come at last \nto the help of the battle below. \nBut even with the Eagles they were still outnumbered. In that last hour Beorn himself had appeared \n\u2014 no one knew how or from where. He came alone, and in bear\u2019s shape; and he seemed to have grown \nalmost to giant-size in his wrath. \nThe roar of his voice was like drums and guns; and he tossed wolves and goblins from his path like \nstraws and feathers. He fell upon their rear, and broke like a clap of thunder through the ring. The \ndwarves were making a stand still about their lords upon a low rounded hill. Then Beorn stooped and \nlifted Thorin, who had fallen pierced with spears, and bore him out of the fray. \nSwiftly he returned and his wrath was redoubled, so that nothing could withstand him, and no \nweapon seemed to bite upon him. He scattered the bodyguard, and pulled down Bolg himself and \ncrushed him. Then dismay fell on the Goblins and they fled in all directions. But weariness left their \nenemies with the coming of new hope, and they pursued them closely, and prevented most of them \nfrom escaping where they could. They drove many of them into the Running River, and such as fled \nsouth or west they hunted into the marshes about the Forest River; and there the greater part of the last \nfugitives perished, while those that came hardly to the Wood-elves\u2019 realm were there slain, or drawn \nin to die deep in the trackless dark of Mirkwood. Songs have said that three parts of the goblin \nwarriors of the North perished on that day, and the mountains had peace for many a year. \nVictory had been assured before the fall of night; but the pursuit was still on foot, when Bilbo \nreturned to the camp; and not many were in the valley save the more grievously wounded. \n\u201CWhere are the Eagles?\u201D he asked Gandalf that evening, as he lay wrapped in many warm blankets. \n\u201CSome are in the hunt,\u201D said the wizard, \u201Cbut most have gone back to their eyries. They would not \nstay here, and departed with the first light of morning. Dain has crowned their chief with gold, and \nsworn friendship with them forever.\u201D \n\u201CI am sorry. I mean, I should have liked to see them again,\u201D said Bilbo sleepily; \u201Cperhaps I shall \nsee them on the way home. I suppose I shall be going home soon?\u201D \n\u201CAs soon as you like,\u201D said the wizard. \nActually it was some days before Bilbo really set out. They buried Thorin deep beneath the \nMountain, and Bard laid the Arkenstone upon his breast. \n\u201CThere let it lie till the Mountain falls!\u201D he said. \u201CMay it bring good fortune to all his folk that \ndwell here after!\u201D \nUpon his tomb the Elvenking then laid Orcrist, the elvish sword that had been taken from Thorin in \ncaptivity. It is said in songs that it gleamed ever in the dark if foes approached, and the fortress of the \ndwarves could not be taken by surprise. There now Dain son of Nain took up his abode, and he became \nKing under the Mountain, and in time many other dwarves gathered to his throne in the ancient halls. \nOf the twelve companions of Thorin, ten remained. Fili and Kili had fallen defending him with shield \nand body, for he was their mother\u2019s elder brother. The others remained with Dain; for Dain dealt his \ntreasure well. \nThere was, of course, no longer any question of dividing the hoard in such shares as had been \nplanned, to Balin and Dwalin, and Dori and Nori and Ori, and Oin and Gloin, and Bifur and Bofur and \nBombur \u2014 or to Bilbo. Yet a fourteenth share of all the silver and gold, wrought and unwrought, was \ngiven up to Bard; for Dain said: \u201CWe will honour the agreement of the dead, and he has now the \nArkenstone in his keeping.\u201D \nEven a fourteenth share was wealth exceedingly great, greater than that of many mortal kings. \nFrom that treasure Bard sent much gold to the Master of Lake-town; and he rewarded his followers \nand friends freely. To the Elvenking he gave the emeralds of Girion, such jewels as he most loved, \nwhich Dain had restored to him. \nTo Bilbo he said: \u201CThis treasure is as much yours as it is mine; though old agreements cannot \nstand, since so many have a claim in its winning and defence. Yet even though you were willing to lay \naside all your claim, I should wish that the words of Thorin, of which he repented, should not prove \ntrue: that we should give you little. I would reward you most richly of all.\u201D \n\u201CVery kind of you,\u201D said Bilbo. \u201CBut really it is a relief to me. How on earth should I have got all \nthat treasure home without war and murder all along the way, I don\u2019t know. And I don\u2019t know what I \nshould have done with it when I got home. I am sure it is better in your hands.\u201D \nIn the end he would only take two small chests, one filled with silver, and the other with gold, such \nas one strong pony could carry. \u201CThat will be quite as much as I can manage,\u201D said he. \nAt last the time came for him to say good-bye to his friends. \u201CFarewell, Balin!\u201D he said; \u201Cand \nfarewell, Dwalin; and farewell Dori, Nori, Ori, Oin, Gloin, Bifur, Bofur, and Bombur! May your \nbeards never grow thin!\u201D And turning towards the Mountain he added: \u201CFarewell Thorin Oakenshield! \nAnd Fili and Kili! May your memory never fade!\u201D \nThen the dwarves bowed low before their Gate, but words stuck in their throats. \u201CGood-bye and \ngood luck, wherever you fare!\u201D said Balin at last. \u201CIf ever you visit us again, when our halls are made \nfair once more, then the feast shall indeed be splendid!\u201D \n\u201CIf ever you are passing my way,\u201D said Bilbo, \u201Cdon\u2019t wait to knock! Tea is at four; but any of you \nare welcome at any time ! \u201D \nThen he turned away. \nThe elf-host was on the march; and if it was sadly lessened, yet many were glad, for now the northern \nworld would be merrier for many a long day. The dragon was dead, and the goblins overthrown, and \ntheir hearts looked forward after winter to a spring of joy. \nGandalf and Bilbo rode behind the Elvenking, and beside them strode Beorn, once again in man\u2019s \nshape, and he laughed and sang in a loud voice upon the road. So they went on until they drew near to \nthe borders of Mirkwood, to the north of the place where the Forest River ran out. Then they halted, \nfor the wizard and Bilbo would not enter the wood, even though the king bade them stay a while in his \nhalls. They intended to go along the edge of the forest, and round its northern end in the waste that lay \nbetween it and the beginning of the Grey Mountains. It was a long and cheerless road, but now that the \ngoblins were crushed, it seemed safer to them than the dreadful pathways under the trees. Moreover \nBeorn was going that way too. \n\u201CFarewell! O Elvenking!\u201D said Gandalf. \u201CMerry be the greenwood, while the world is yet young! \nAnd merry be all your folk!\u201D \n\u201CFarewell! O Gandalf!\u201D said the king. \u201CMay you ever appear where you are most needed and least \nexpected! The oftener you appear in my halls the better shall I be pleased!\u201D \n\u201CI beg of you,\u201D said Bilbo stammering and standing on one foot, \u201Cto accept this gift!\u201D and he \nbrought out a necklace of silver and pearls that Dain had given him at their parting. \n\u201CIn what way have I earned such a gift, O hobbit?\u201D said the king. \n\u201CWell, er, I thought, don\u2019t you know,\u201D said Bilbo rather confused, \u201Cthat, er, some little return \nshould be made for your, er, hospitality. I mean even a burglar has his feelings. I have drunk much of \nyour wine and eaten much of your bread.\u201D \n\u201CI will take your gift, O Bilbo the Magnificent!\u201D said the king gravely. \u201CAnd I name you elf-friend \nand blessed. May your shadow never grow less (or stealing would be too easy)! Farewell!\u201D \nThen the elves turned towards the Forest, and Bilbo started on his long road home. \nHe had many hardships and adventures before he got back. The Wild was still the Wild, and there \nwere many other things in it in those days beside goblins; but he was well guided and well guarded \u2014 \nthe wizard was with him, and Beorn for much of the way \u2014 and he was never in great danger again. \nAnyway by midwinter Gandalf and Bilbo had come all the way back, along both edges of the Forest, to \nthe doors of Beorn\u2019 s house; and there for a while they both stayed. Yule-tide was warm and merry \nthere; and men came from far and wide to feast at Beorn\u2019 s bidding. The goblins of the Misty \nMountains were now few and terrified, and hidden in the deepest holes they could find; and the Wargs \nhad vanished from the woods, so that men went abroad without fear. Beorn indeed became a great \nchief afterwards in those regions and ruled a wide land between the mountains and the wood; and it is \nsaid that for many generations the men of his line had the power of taking bear\u2019s shape, and some \nwere grim men and bad, but most were in heart like Beorn, if less in size and strength. In their day the \nlast goblins were hunted from the Misty Mountains and a new peace came over the edge of the Wild. \nIt was spring, and a fair one with mild weathers and a bright sun, before Bilbo and Gandalf took \ntheir leave at last of Beorn, and though he longed for home, Bilbo left with regret, for the flowers of \nthe gardens of Beorn were in springtime no less marvellous than in high summer. \nAt last they came up the long road, and reached the very pass where the goblins had captured them \nbefore. But they came to that high point at morning, and looking backward they saw a white sun \nshining over the outstretched lands. There behind lay Mirkwood, blue in the distance, and darkly green \nat the nearer edge even in the spring. There far away was the Lonely Mountain on the edge of eyesight. \nOn its highest peak snow yet unmelted was gleaming pale. \n\u201CSo comes snow after fire, and even dragons have their ending!\u201D said Bilbo, and he turned his back \non his adventure. The Tookish part was getting very tired, and the Baggins was daily getting stronger. \n\u201CI wish now only to be in my own armchair!\u201D he said. \nChapter XTX \nTHE LAST STAGE \nIt was on May the First that the two came back at last to the brink of the valley of Rivendell, where \nstood the Last (or the First) Homely House. Again it was evening, their ponies were tired, especially \nthe one that carried the baggage; and they all felt in need of rest. As they rode down the steep path, \nBilbo heard the elves still singing in the trees, as if they had not stopped since he left; and as soon as \nthe riders came down into the lower glades of the wood they burst into a song of much the same kind \nas before. This is something like it: \nThe dragon is withered, \nHis bones are now crumbled; \nHis armour is shivered, \nHis splendour is humbled! \nThough sword shall be rusted, \nAnd throne and crown perish \nWith strength that men trusted \nAnd wealth that they cherish, \nHere grass is still growing, \nAnd leaves are yet swinging, \nThe white water flowing, \nAnd elves are yet singing \nCome! Tra-la-la-lally! \nCome back to the valley! \nThe stars are far brighter \nThan gems without measure, \nThe moon is far whiter \nThan silver in treasure; \nThe fire is more shining \nOn hearth in the gloaming \nThan gold won by mining, \nSo why go a-roaming? \nO! Tra-la-la-lally \nCome back to the Valley. \nO! Where are you going, \nSo late in returning? \nThe river is flowing, \nThe stars are all burning! \nO! Whither so laden, \nSo sad and so dreary? \nHere elf and elf-maiden \nNow welcome the weary \nWith Tra-la-la-lally \nCome back to the Valley, \nTra-la-la-lally \nFa-la-la-lally \nFa-la! \nThen the elves of the valley came out and greeted them and led them across the water to the house \nof Elrond. There a warm welcome was made them, and there were many eager ears that evening to \nhear the tale of their adventures. Gandalf it was who spoke, for Bilbo was fallen quiet and drowsy. \nMost of the tale he knew, for he had been in it, and had himself told much of it to the wizard on their \nhomeward way or in the house of Beorn; but every now and again he would open one eye, and listen, \nwhen a part of the story which he did not yet know came in. \nIt was in this way that he learned where Gandalf had been to; for he overheard the words of the \nwizard to Elrond. It appeared that Gandalf had been to a great council of the white wizards, masters of \nlore and good magic; and that they had at last driven the Necromancer from his dark hold in the south \nof Mirkwood. \n\u201CEre long now,\u201D Gandalf was saying, \u201Cthe Forest will grow somewhat more wholesome. The North \nwill be freed from that horror for many long years, I hope. Yet I wish he were banished from the \nworld!\u201D \n\u201CIt would be well indeed,\u201D said Elrond; \u201Cbut I fear that will not come about in this age of the world, \nor for many after.\u201D \nWhen the tale of their journeyings was told, there were other tales, and yet more tales, tales of long \nago, and tales of new things, and tales of no time at all, till Bilbo\u2019s head fell forward on his chest, and \nhe snored comfortably in a corner. \nHe woke to find himself in a white bed, and the moon shining through an open window. Below it \nmany elves were singing loud and clear on the banks of the stream. \nSing all ye joyful, now sing all together! \nThe wind\u2019s in the tree-top, the wind\u2019s in the heather; \nThe stars are in blossom, the moon is in flower, \nAnd bright are the windows of Night in her tower. \nDance all ye joyful, now dance all together! \nSoft is the grass, and let foot be like feather! \nThe river is silver, the shadows are fleeting; \nMerry is May-time, and merry our meeting. \nSing we now softly, and dreams let us weave him! \nWind him in slumber and there let us leave him! \nThe wanderer sleepeth. Now soft be his pillow! Lullaby! \nLullaby! Alder and Willow! \nSigh no more Pine, till the wind of the morn! \nFall Moon! Dark be the land! \nHush! Hush! Oak, Ash, and Thorn! \nHushed be all water, till dawn is at hand! \n\u201CWell, Merry People!\u201D said Bilbo looking out. \u201CWhat time by the moon is this? Your lullaby would \nwaken a drunken goblin! Yet I thank you.\u201D \n\u201CAnd your snores would waken a stone dragon \u2014 yet we thank you,\u201D they answered with laughter. \n\u201CIt is drawing towards dawn, and you have slept now since the night\u2019s beginning. Tomorrow, perhaps, \nyou will be cured of weariness.\u201D \n\u201CA little sleep does a great cure in the house of Elrond,\u201D said he; \u201Cbut I will take all the cure I can \nget. A second good night, fair friends!\u201D And with that he went back to bed and slept till late morning. \nWeariness fell from him soon in that house, and he had many a merry jest and dance, early and \nlate, with the elves of the valley. Yet even that place could not long delay him now, and he thought \nalways of his own home. After a week, therefore, he said farewell to Elrond, and giving him such \nsmall gifts as he would accept, he rode away with Gandalf . \nEven as they left the valley the sky darkened in the West before them, and wind and rain came up \nto meet them. \n\u201CMerry is May-time!\u201D said Bilbo, as the rain beat into his face. \u201CBut our back is to legends and we \nare coming home. I suppose this is the first taste of it.\u201D \n\u201CThere is a long road yet,\u201D said Gandalf. \n\u201CBut it is the last road,\u201D said Bilbo. \nThey came to the river that marked the very edge of the borderland of the Wild, and to the ford \nbeneath the steep bank, which you may remember. The water was swollen both with the melting of the \nsnows at the approach of summer, and with the daylong rain; but they crossed with some difficulty, \nand pressed forward, as evening fell, on the last stage of their journey. \nThis was much as it had been before, except that the company was smaller, and more silent; also \nthis time there were no trolls. At each point on the road Bilbo recalled the happenings and the words \nof a year ago \u2014 it seemed to him more like ten \u2014 so that, of course, he quickly noted the place where \nthe pony had fallen in the river, and they had turned aside for their nasty adventure with Tom and Bert \nand Bill. \nNot far from the road they found the gold of the trolls, which they had buried, still hidden and \nuntouched. \u201CI have enough to last me my time,\u201D said Bilbo, when they had dug it up. \u201CYou had better \ntake this, Gandalf. I daresay you can find a use for it.\u201D \n\u201CIndeed I can!\u201D said the wizard. \u201CBut share and share alike! You may find you have more needs \nthan you expect.\u201D \nSo they put the gold in bags and slung them on the ponies, who were not at all pleased about it. \nAfter that their going was slower, for most of the time they walked. But the land was green and there \nwas much grass through which the hobbit strolled along contentedly. He mopped his face with a red \nsilk handkerchief \u2014 no! not a single one of his own had survived, he had borrowed this one from \nElrond \u2014 for now June had brought summer, and the weather was bright and hot again. \nAs all things come to an end, even this story, a day came at last when they were in sight of the \ncountry where Bilbo had been born and bred, where the shapes of the land and of the trees were as well \nknown to him as his hands and toes. Coming to a rise he could see his own Hill in the distance, and he \nstopped suddenly and said: \nRoads go ever ever on, \nOver rock and under tree, \nBy caves where never sun has shone, \nBy streams that never find the sea; \nOver snow by winter sown, \nAnd through the merry flowers of June, \nOver grass and over stone, \nAnd under mountains in the moon. \nRoads go ever ever on \nUnder cloud and under star, \nYet feet that wandering have gone \nTurn at last to home afar. \nEyes that fire and sword have seen \nAnd horror in the halls of stone \nLook at last on meadows green \nAnd trees and hills they long have known. \nGandalf looked at him. \u201CMy dear Bilbo!\u201D he said. \u201CSomething is the matter with you! You are not \nthe hobbit that you were.\u201D \nAnd so they crossed the bridge and passed the mill by the river and came right back to Bilbo\u2019s own \ndoor. \n\u201CBless me! What\u2019s going on?\u201D he cried. There was a great commotion, and people of all sorts, \nrespectable and unrespectable, were thick round the door, and many were going in and out \u2014 not even \nwiping their feet on the mat, as Bilbo noticed with annoyance. \nIf he was surprised, they were more surprised still. He had arrived back in the middle of an \nauction! There was a large notice in black and red hung on the gate, stating that on June the Twenty- \nsecond Messrs Grubb, Grubb, and Burrowes would sell by auction the effects of the late Bilbo Baggins \nEsquire, of Bag-End, Underhill, Hobbiton. Sale to commence at ten o\u2019clock sharp. It was now nearly \nlunchtime, and most of the things had already been sold, for various prices from next to nothing to old \nsongs (as is not unusual at auctions). Bilbo\u2019s cousins the Sackville-Bagginses were, in fact, busy \nmeasuring his rooms to see if their own furniture would fit. In short Bilbo was \u201CPresumed Dead\u201D, and \nnot everybody that said so was sorry to find the presumption wrong. \nThe return of Mr. Bilbo Baggins created quite a disturbance, both under the Hill and over the Hill, \nand across the Water; it was a great deal more than a nine days\u2019 wonder. The legal bother, indeed, \nlasted for years. It was quite a long time before Mr. Baggins was in fact admitted to be alive again. \nThe people who had got specially good bargains at the Sale took a deal of convincing; and in the end \nto save time Bilbo had to buy back quite a lot of his own furniture. Many of his silver spoons \nmysteriously disappeared and were never accounted for. Personally he suspected the Sackville- \nBagginses. On their side they never admitted that the returned Baggins was genuine, and they were not \non friendly terms with Bilbo ever after. They really had wanted to live in his nice hobbit-hole so very \nmuch. \nIndeed Bilbo found he had lost more than spoons \u2014 he had lost his reputation. It is true that for ever \nafter he remained an elf-friend, and had the honour of dwarves, wizards, and all such folk as ever \npassed that way; but he was no longer quite respectable. He was in fact held by all the hobbits of the \nneighbourhood to be 'queer 5 \u2014 except by his nephews and nieces on the Took side, but even they were \nnot encouraged in their friendship by their elders. \nI am sorry to say he did not mind. He was quite content; and the sound of the kettle on his hearth \nwas ever after more musical than it had been even in the quiet days before the Unexpected Party. His \nsword he hung over the mantelpiece. His coat of mail was arranged on a stand in the hall (until he lent \nit to a Museum). His gold and silver was largely spent in presents, both useful and extravagant \u2014 \nwhich to a certain extent accounts for the affection of his nephews and his nieces. His magic ring he \nkept a great secret, for he chiefly used it when unpleasant callers came. \nHe took to writing poetry and visiting the elves; and though many shook their heads and touched \ntheir foreheads and said \u201CPoor old Baggins!\u201D and though few believed any of his tales, he remained \nvery happy to the end of his days, and those were extraordinarily long. \nOne autumn evening some years afterwards Bilbo was sitting in his study writing his memoirs \u2014 he \nthought of calling them \u201CThere and Back Again, a Hobbit\u2019s Holiday\u201D \u2014 when there was a ring at the \ndoor. It was Gandalf and a dwarf; and the dwarf was actually Balin. \n\u201CCome in! Come in!\u201D said Bilbo, and soon they were settled in chairs by the fire. If Balin noticed \nthat Mr. Baggins\u2019 waistcoat was more extensive (and had real gold buttons), Bilbo also noticed that \nBalin\u2019 s beard was several inches longer, and his jewelled belt was of great magnificence. \nThey fell to talking of their times together, of course, and Bilbo asked how things were going in the \nlands of the Mountain. It seemed they were going very well. Bard had rebuilt the town in Dale and \nmen had gathered to him from the Lake and from South and West, and all the valley had become tilled \nagain and rich, and the desolation was now filled with birds and blossoms in spring and fruit and \nfeasting in autumn. And Lake-town was refounded and was more prosperous than ever, and much \nwealth went up and down the Running River; and there was friendship in those parts between elves \nand dwarves and men. \npeople, but being of the kind that easily catches such disease he fell under the dragon-sickness, and \ntook most of the gold and fled with it, and died of starvation in the Waste, deserted by his \ncompanions. \n\u201CThe new Master is of wiser kind,\u201D said Balin, \u201Cand very popular, for, of course, he gets most of \nthe credit for the present prosperity. They are making songs which say that in his day the rivers run \nwith gold.\u201D \n\u201CThen the prophecies of the old songs have turned out to be true, after a fashion!\u201D said Bilbo. \n\u201COf course!\u201D said Gandalf. \u201CAnd why should not they prove true? Surely you don\u2019t disbelieve the \nprophecies, because you had a hand in bringing them about yourself? You don\u2019t really suppose, do \nyou, that all your adventures and escapes were managed by mere luck, just for your sole bene-fit? You \nare a very fine person, Mr. Baggins, and I am very fond of you; but you are only quite a little fellow in \na wide world after all!\u201D \n\u201CThank goodness!\u201D said Bilbo laughing, and handed him the tobacco-jar.";exports.default=shakes;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var hamlet = "THE TRAGEDY OF HAMLET, PRINCE OF DENMARK\nby William Shakespeare\n\nDramatis Personae\nClaudius, King of Denmark.\nMarcellus, Officer.\nHamlet, son to the former, and nephew to the present king.\nPolonius, Lord Chamberlain.\nHoratio, friend to Hamlet.\nLaertes, son to Polonius.\nVoltemand, courtier.\nCornelius, courtier.\nRosencrantz, courtier.\nGuildenstern, courtier.\nOsric, courtier.\nA Gentleman, courtier.\nA Priest.\nMarcellus, officer.\nBernardo, officer.\nFrancisco, a soldier\nReynaldo, servant to Polonius.\nPlayers.\nTwo Clowns, gravediggers.\nFortinbras, Prince of Norway.\nA Norwegian Captain.\nEnglish Ambassadors.\nGetrude, Queen of Denmark, mother to Hamlet.\nOphelia, daughter to Polonius.\nGhost of Hamlet's Father.\nLords, ladies, Officers, Soldiers, Sailors, Messengers, Attendants.\n\n\nSCENE.- Elsinore.\nACT I. Scene I.\nElsinore. A platform before the Castle.\nEnter two Sentinels-[first,] Francisco, [who paces up and down\nat his post; then] Bernardo, [who approaches him].\nBer. Who's there.?\nFran. Nay, answer me. Stand and unfold yourself.\nBer. Long live the King!\nFran. Bernardo?\nBer. He.\nFran. You come most carefully upon your hour.\nBer. 'Tis now struck twelve. Get thee to bed, Francisco.\nFran. For this relief much thanks. 'Tis bitter cold,\nAnd I am sick at heart.\nBer. Have you had quiet guard?\nFran. Not a mouse stirring.\nBer. Well, good night.\nIf you do meet Horatio and Marcellus,\nThe rivals of my watch, bid them make haste.\nEnter Horatio and Marcellus.\nFran. I think I hear them. Stand, ho! Who is there?\nHor. Friends to this ground.\nMar. And liegemen to the Dane.\nFran. Give you good night.\nMar. O, farewell, honest soldier.\nWho hath reliev'd you?\nFran. Bernardo hath my place.\nGive you good night. Exit.\nMar. Holla, Bernardo!\nBer. Say-\nWhat, is Horatio there ?\nHor. A piece of him.\nBer. Welcome, Horatio. Welcome, good Marcellus.\nMar. What, has this thing appear'd again to-night?\nBer. I have seen nothing.\nMar. Horatio says 'tis but our fantasy,\nAnd will not let belief take hold of him\nTouching this dreaded sight, twice seen of us.\nTherefore I have entreated him along,\nWith us to watch the minutes of this night,\nThat, if again this apparition come,\nHe may approve our eyes and speak to it.\nHor. Tush, tush, 'twill not appear.\nBer. Sit down awhile,\nAnd let us once again assail your ears,\nThat are so fortified against our story,\nWhat we two nights have seen.\nHor. Well, sit we down,\nAnd let us hear Bernardo speak of this.\nBer. Last night of all,\nWhen yond same star that's westward from the pole\nHad made his course t' illume that part of heaven\nWhere now it burns, Marcellus and myself,\nThe bell then beating one-\nEnter Ghost.\nMar. Peace! break thee off! Look where it comes again!\nBer. In the same figure, like the King that's dead.\nMar. Thou art a scholar; speak to it, Horatio.\nBer. Looks it not like the King? Mark it, Horatio.\nHor. Most like. It harrows me with fear and wonder.\nBer. It would be spoke to.\nMar. Question it, Horatio.\nHor. What art thou that usurp'st this time of night\nTogether with that fair and warlike form\nIn which the majesty of buried Denmark\nDid sometimes march? By heaven I charge thee speak!\nMar. It is offended.\nBer. See, it stalks away!\nHor. Stay! Speak, speak! I charge thee speak!\nExit Ghost.\nMar. 'Tis gone and will not answer.\nBer. How now, Horatio? You tremble and look pale.\nIs not this something more than fantasy?\nWhat think you on't?\nHor. Before my God, I might not this believe\nWithout the sensible and true avouch\nOf mine own eyes.\nMar. Is it not like the King?\nHor. As thou art to thyself.\nSuch was the very armour he had on\nWhen he th' ambitious Norway combated.\nSo frown'd he once when, in an angry parle,\nHe smote the sledded Polacks on the ice.\n'Tis strange.\nMar. Thus twice before, and jump at this dead hour,\nWith martial stalk hath he gone by our watch.\nHor. In what particular thought to work I know not;\nBut, in the gross and scope of my opinion,\nThis bodes some strange eruption to our state.\nMar. Good now, sit down, and tell me he that knows,\nWhy this same strict and most observant watch\nSo nightly toils the subject of the land,\nAnd why such daily cast of brazen cannon\nAnd foreign mart for implements of war;\nWhy such impress of shipwrights, whose sore task\nDoes not divide the Sunday from the week.\nWhat might be toward, that this sweaty haste\nDoth make the night joint-labourer with the day?\nWho is't that can inform me?\nHor. That can I.\nAt least, the whisper goes so. Our last king,\nWhose image even but now appear'd to us,\nWas, as you know, by Fortinbras of Norway,\nThereto prick'd on by a most emulate pride,\nDar'd to the combat; in which our valiant Hamlet\n(For so this side of our known world esteem'd him)\nDid slay this Fortinbras; who, by a seal'd compact,\nWell ratified by law and heraldry,\nDid forfeit, with his life, all those his lands\nWhich he stood seiz'd of, to the conqueror;\nAgainst the which a moiety competent\nWas gaged by our king; which had return'd\nTo the inheritance of Fortinbras,\nHad he been vanquisher, as, by the same comart\nAnd carriage of the article design'd,\nHis fell to Hamlet. Now, sir, young Fortinbras,\nOf unimproved mettle hot and full,\nHath in the skirts of Norway, here and there,\nShark'd up a list of lawless resolutes,\nFor food and diet, to some enterprise\nThat hath a stomach in't; which is no other,\nAs it doth well appear unto our state,\nBut to recover of us, by strong hand\nAnd terms compulsatory, those foresaid lands\nSo by his father lost; and this, I take it,\nIs the main motive of our preparations,\nThe source of this our watch, and the chief head\nOf this post-haste and romage in the land.\nBer. I think it be no other but e'en so.\nWell may it sort that this portentous figure\nComes armed through our watch, so like the King\nThat was and is the question of these wars.\nHor. A mote it is to trouble the mind's eye.\nIn the most high and palmy state of Rome,\nA little ere the mightiest Julius fell,\nThe graves stood tenantless, and the sheeted dead\nDid squeak and gibber in the Roman streets;\nAs stars with trains of fire, and dews of blood,\nDisasters in the sun; and the moist star\nUpon whose influence Neptune's empire stands\nWas sick almost to doomsday with eclipse.\nAnd even the like precurse of fierce events,\nAs harbingers preceding still the fates\nAnd prologue to the omen coming on,\nHave heaven and earth together demonstrated\nUnto our climature and countrymen.\nEnter Ghost again.\nBut soft! behold! Lo, where it comes again!\nI'll cross it, though it blast me.- Stay illusion!\nSpreads his arms.\nIf thou hast any sound, or use of voice,\nSpeak to me.\nIf there be any good thing to be done,\nThat may to thee do ease, and, race to me,\nSpeak to me.\nIf thou art privy to thy country's fate,\nWhich happily foreknowing may avoid,\nO, speak!\nOr if thou hast uphoarded in thy life\nExtorted treasure in the womb of earth\n(For which, they say, you spirits oft walk in death),\nThe cock crows.\nSpeak of it! Stay, and speak!- Stop it, Marcellus!\nMar. Shall I strike at it with my partisan?\nHor. Do, if it will not stand.\nBer. 'Tis here!\nHor. 'Tis here!\nMar. 'Tis gone!\nExit Ghost.\nWe do it wrong, being so majestical,\nTo offer it the show of violence;\nFor it is as the air, invulnerable,\nAnd our vain blows malicious mockery.\nBer. It was about to speak, when the cock crew.\nHor. And then it started, like a guilty thing\nUpon a fearful summons. I have heard\nThe cock, that is the trumpet to the morn,\nDoth with his lofty and shrill-sounding throat\nAwake the god of day; and at his warning,\nWhether in sea or fire, in earth or air,\nTh' extravagant and erring spirit hies\nTo his confine; and of the truth herein\nThis present object made probation.\nMar. It faded on the crowing of the cock.\nSome say that ever, 'gainst that season comes\nWherein our Saviour's birth is celebrated,\nThe bird of dawning singeth all night long;\nAnd then, they say, no spirit dare stir abroad,\nThe nights are wholesome, then no planets strike,\nNo fairy takes, nor witch hath power to charm,\nSo hallow'd and so gracious is the time.\nHor. So have I heard and do in part believe it.\nBut look, the morn, in russet mantle clad,\nWalks o'er the dew of yon high eastward hill.\nBreak we our watch up; and by my advice\nLet us impart what we have seen to-night\nUnto young Hamlet; for, upon my life,\nThis spirit, dumb to us, will speak to him.\nDo you consent we shall acquaint him with it,\nAs needful in our loves, fitting our duty?\nLet's do't, I pray; and I this morning know\nWhere we shall find him most conveniently. Exeunt.\n\nScene II.\nElsinore. A room of state in the Castle.\nFlourish. [Enter Claudius, King of Denmark, Gertrude the Queen, Hamlet,\nPolonius, Laertes and his sister Ophelia, [Voltemand, Cornelius,]\nLords Attendant.\nKing. Though yet of Hamlet our dear brother's death\nThe memory be green, and that it us befitted\nTo bear our hearts in grief, and our whole kingdom\nTo be contracted in one brow of woe,\nYet so far hath discretion fought with nature\nThat we with wisest sorrow think on him\nTogether with remembrance of ourselves.\nTherefore our sometime sister, now our queen,\nTh' imperial jointress to this warlike state,\nHave we, as 'twere with a defeated joy,\nWith an auspicious, and a dropping eye,\nWith mirth in funeral, and with dirge in marriage,\nIn equal scale weighing delight and dole,\nTaken to wife; nor have we herein barr'd\nYour better wisdoms, which have freely gone\nWith this affair along. For all, our thanks.\nNow follows, that you know, young Fortinbras,\nHolding a weak supposal of our worth,\nOr thinking by our late dear brother's death\nOur state to be disjoint and out of frame,\nColleagued with this dream of his advantage,\nHe hath not fail'd to pester us with message\nImporting the surrender of those lands\nLost by his father, with all bands of law,\nTo our most valiant brother. So much for him.\nNow for ourself and for this time of meeting.\nThus much the business is: we have here writ\nTo Norway, uncle of young Fortinbras,\nWho, impotent and bedrid, scarcely hears\nOf this his nephew's purpose, to suppress\nHis further gait herein, in that the levies,\nThe lists, and full proportions are all made\nOut of his subject; and we here dispatch\nYou, good Cornelius, and you, Voltemand,\nFor bearers of this greeting to old Norway,\nGiving to you no further personal power\nTo business with the King, more than the scope\nOf these dilated articles allow. [Gives a paper.]\nFarewell, and let your haste commend your duty.\nCor., Volt. In that, and all things, will we show our duty.\nKing. We doubt it nothing. Heartily farewell.\nExeunt Voltemand and Cornelius.\nAnd now, Laertes, what's the news with you?\nYou told us of some suit. What is't, Laertes?\nYou cannot speak of reason to the Dane\nAnd lose your voice. What wouldst thou beg, Laertes,\nThat shall not be my offer, not thy asking?\nThe head is not more native to the heart,\nThe hand more instrumental to the mouth,\nThan is the throne of Denmark to thy father.\nWhat wouldst thou have, Laertes?\nLaer. My dread lord,\nYour leave and favour to return to France;\nFrom whence though willingly I came to Denmark\nTo show my duty in your coronation,\nYet now I must confess, that duty done,\nMy thoughts and wishes bend again toward France\nAnd bow them to your gracious leave and pardon.\nKing. Have you your father's leave? What says Polonius?\nPol. He hath, my lord, wrung from me my slow leave\nBy laboursome petition, and at last\nUpon his will I seal'd my hard consent.\nI do beseech you give him leave to go.\nKing. Take thy fair hour, Laertes. Time be thine,\nAnd thy best graces spend it at thy will!\nBut now, my cousin Hamlet, and my son-\nHam. [aside] A little more than kin, and less than kind!\nKing. How is it that the clouds still hang on you?\nHam. Not so, my lord. I am too much i' th' sun.\nQueen. Good Hamlet, cast thy nighted colour off,\nAnd let thine eye look like a friend on Denmark.\nDo not for ever with thy vailed lids\nSeek for thy noble father in the dust.\nThou know'st 'tis common. All that lives must die,\nPassing through nature to eternity.\nHam. Ay, madam, it is common.\nQueen. If it be,\nWhy seems it so particular with thee?\nHam. Seems, madam, Nay, it is. I know not 'seems.'\n'Tis not alone my inky cloak, good mother,\nNor customary suits of solemn black,\nNor windy suspiration of forc'd breath,\nNo, nor the fruitful river in the eye,\nNor the dejected havior of the visage,\nTogether with all forms, moods, shapes of grief,\n'That can denote me truly. These indeed seem,\nFor they are actions that a man might play;\nBut I have that within which passeth show-\nThese but the trappings and the suits of woe.\nKing. 'Tis sweet and commendable in your nature, Hamlet,\nTo give these mourning duties to your father;\nBut you must know, your father lost a father;\nThat father lost, lost his, and the survivor bound\nIn filial obligation for some term\nTo do obsequious sorrow. But to persever\nIn obstinate condolement is a course\nOf impious stubbornness. 'Tis unmanly grief;\nIt shows a will most incorrect to heaven,\nA heart unfortified, a mind impatient,\nAn understanding simple and unschool'd;\nFor what we know must be, and is as common\nAs any the most vulgar thing to sense,\nWhy should we in our peevish opposition\nTake it to heart? Fie! 'tis a fault to heaven,\nA fault against the dead, a fault to nature,\nTo reason most absurd, whose common theme\nIs death of fathers, and who still hath cried,\nFrom the first corse till he that died to-day,\n'This must be so.' We pray you throw to earth\nThis unprevailing woe, and think of us\nAs of a father; for let the world take note\nYou are the most immediate to our throne,\nAnd with no less nobility of love\nThan that which dearest father bears his son\nDo I impart toward you. For your intent\nIn going back to school in Wittenberg,\nIt is most retrograde to our desire;\nAnd we beseech you, bend you to remain\nHere in the cheer and comfort of our eye,\nOur chiefest courtier, cousin, and our son.\nQueen. Let not thy mother lose her prayers, Hamlet.\nI pray thee stay with us, go not to Wittenberg.\nHam. I shall in all my best obey you, madam.\nKing. Why, 'tis a loving and a fair reply.\nBe as ourself in Denmark. Madam, come.\nThis gentle and unforc'd accord of Hamlet\nSits smiling to my heart; in grace whereof,\nNo jocund health that Denmark drinks to-day\nBut the great cannon to the clouds shall tell,\nAnd the King's rouse the heaven shall bruit again,\nRespeaking earthly thunder. Come away.\nFlourish. Exeunt all but Hamlet.\nHam. O that this too too solid flesh would melt,\nThaw, and resolve itself into a dew!\nOr that the Everlasting had not fix'd\nHis canon 'gainst self-slaughter! O God! God!\nHow weary, stale, flat, and unprofitable\nSeem to me all the uses of this world!\nFie on't! ah, fie! 'Tis an unweeded garden\nThat grows to seed; things rank and gross in nature\nPossess it merely. That it should come to this!\nBut two months dead! Nay, not so much, not two.\nSo excellent a king, that was to this\nHyperion to a satyr; so loving to my mother\nThat he might not beteem the winds of heaven\nVisit her face too roughly. Heaven and earth!\nMust I remember? Why, she would hang on him\nAs if increase of appetite had grown\nBy what it fed on; and yet, within a month-\nLet me not think on't! Frailty, thy name is woman!-\nA little month, or ere those shoes were old\nWith which she followed my poor father's body\nLike Niobe, all tears- why she, even she\n(O God! a beast that wants discourse of reason\nWould have mourn'd longer) married with my uncle;\nMy father's brother, but no more like my father\nThan I to Hercules. Within a month,\nEre yet the salt of most unrighteous tears\nHad left the flushing in her galled eyes,\nShe married. O, most wicked speed, to post\nWith such dexterity to incestuous sheets!\nIt is not, nor it cannot come to good.\nBut break my heart, for I must hold my tongue!\nEnter Horatio, Marcellus, and Bernardo.\nHor. Hail to your lordship!\nHam. I am glad to see you well.\nHoratio!- or I do forget myself.\nHor. The same, my lord, and your poor servant ever.\nHam. Sir, my good friend- I'll change that name with you.\nAnd what make you from Wittenberg, Horatio?\nMarcellus?\nMar. My good lord!\nHam. I am very glad to see you.- [To Bernardo] Good even, sir.-\nBut what, in faith, make you from Wittenberg?\nHor. A truant disposition, good my lord.\nHam. I would not hear your enemy say so,\nNor shall you do my ear that violence\nTo make it truster of your own report\nAgainst yourself. I know you are no truant.\nBut what is your affair in Elsinore?\nWe'll teach you to drink deep ere you depart.\nHor. My lord, I came to see your father's funeral.\nHam. I prithee do not mock me, fellow student.\nI think it was to see my mother's wedding.\nHor. Indeed, my lord, it followed hard upon.\nHam. Thrift, thrift, Horatio! The funeral bak'd meats\nDid coldly furnish forth the marriage tables.\nWould I had met my dearest foe in heaven\nOr ever I had seen that day, Horatio!\nMy father- methinks I see my father.\nHor. O, where, my lord?\nHam. In my mind's eye, Horatio.\nHor. I saw him once. He was a goodly king.\nHam. He was a man, take him for all in all.\nI shall not look upon his like again.\nHor. My lord, I think I saw him yesternight.\nHam. Saw? who?\nHor. My lord, the King your father.\nHam. The King my father?\nHor. Season your admiration for a while\nWith an attent ear, till I may deliver\nUpon the witness of these gentlemen,\nThis marvel to you.\nHam. For God's love let me hear!\nHor. Two nights together had these gentlemen\n(Marcellus and Bernardo) on their watch\nIn the dead vast and middle of the night\nBeen thus encount'red. A figure like your father,\nArmed at point exactly, cap-a-pe,\nAppears before them and with solemn march\nGoes slow and stately by them. Thrice he walk'd\nBy their oppress'd and fear-surprised eyes,\nWithin his truncheon's length; whilst they distill'd\nAlmost to jelly with the act of fear,\nStand dumb and speak not to him. This to me\nIn dreadful secrecy impart they did,\nAnd I with them the third night kept the watch;\nWhere, as they had deliver'd, both in time,\nForm of the thing, each word made true and good,\nThe apparition comes. I knew your father.\nThese hands are not more like.\nHam. But where was this?\nMar. My lord, upon the platform where we watch'd.\nHam. Did you not speak to it?\nHor. My lord, I did;\nBut answer made it none. Yet once methought\nIt lifted up it head and did address\nItself to motion, like as it would speak;\nBut even then the morning cock crew loud,\nAnd at the sound it shrunk in haste away\nAnd vanish'd from our sight.\nHam. 'Tis very strange.\nHor. As I do live, my honour'd lord, 'tis true;\nAnd we did think it writ down in our duty\nTo let you know of it.\nHam. Indeed, indeed, sirs. But this troubles me.\nHold you the watch to-night?\nBoth [Mar. and Ber.] We do, my lord.\nHam. Arm'd, say you?\nBoth. Arm'd, my lord.\nHam. From top to toe?\nBoth. My lord, from head to foot.\nHam. Then saw you not his face?\nHor. O, yes, my lord! He wore his beaver up.\nHam. What, look'd he frowningly.\nHor. A countenance more in sorrow than in anger.\nHam. Pale or red?\nHor. Nay, very pale.\nHam. And fix'd his eyes upon you?\nHor. Most constantly.\nHam. I would I had been there.\nHor. It would have much amaz'd you.\nHam. Very like, very like. Stay'd it long?\nHor. While one with moderate haste might tell a hundred.\nBoth. Longer, longer.\nHor. Not when I saw't.\nHam. His beard was grizzled- no?\nHor. It was, as I have seen it in his life,\nA sable silver'd.\nHam. I will watch to-night.\nPerchance 'twill walk again.\nHor. I warr'nt it will.\nHam. If it assume my noble father's person,\nI'll speak to it, though hell itself should gape\nAnd bid me hold my peace. I pray you all,\nIf you have hitherto conceal'd this sight,\nLet it be tenable in your silence still;\nAnd whatsoever else shall hap to-night,\nGive it an understanding but no tongue.\nI will requite your loves. So, fare you well.\nUpon the platform, 'twixt eleven and twelve,\nI'll visit you.\nAll. Our duty to your honour.\nHam. Your loves, as mine to you. Farewell.\nExeunt [all but Hamlet].\nMy father's spirit- in arms? All is not well.\nI doubt some foul play. Would the night were come!\nTill then sit still, my soul. Foul deeds will rise,\nThough all the earth o'erwhelm them, to men's eyes.\nExit.\n\nScene III.\nElsinore. A room in the house of Polonius.\nEnter Laertes and Ophelia.\nLaer. My necessaries are embark'd. Farewell.\nAnd, sister, as the winds give benefit\nAnd convoy is assistant, do not sleep,\nBut let me hear from you.\nOph. Do you doubt that?\nLaer. For Hamlet, and the trifling of his favour,\nHold it a fashion, and a toy in blood;\nA violet in the youth of primy nature,\nForward, not permanent- sweet, not lasting;\nThe perfume and suppliance of a minute;\nNo more.\nOph. No more but so?\nLaer. Think it no more.\nFor nature crescent does not grow alone\nIn thews and bulk; but as this temple waxes,\nThe inward service of the mind and soul\nGrows wide withal. Perhaps he loves you now,\nAnd now no soil nor cautel doth besmirch\nThe virtue of his will; but you must fear,\nHis greatness weigh'd, his will is not his own;\nFor he himself is subject to his birth.\nHe may not, as unvalued persons do,\nCarve for himself, for on his choice depends\nThe safety and health of this whole state,\nAnd therefore must his choice be circumscrib'd\nUnto the voice and yielding of that body\nWhereof he is the head. Then if he says he loves you,\nIt fits your wisdom so far to believe it\nAs he in his particular act and place\nMay give his saying deed; which is no further\nThan the main voice of Denmark goes withal.\nThen weigh what loss your honour may sustain\nIf with too credent ear you list his songs,\nOr lose your heart, or your chaste treasure open\nTo his unmast'red importunity.\nFear it, Ophelia, fear it, my dear sister,\nAnd keep you in the rear of your affection,\nOut of the shot and danger of desire.\nThe chariest maid is prodigal enough\nIf she unmask her beauty to the moon.\nVirtue itself scopes not calumnious strokes.\nThe canker galls the infants of the spring\nToo oft before their buttons be disclos'd,\nAnd in the morn and liquid dew of youth\nContagious blastments are most imminent.\nBe wary then; best safety lies in fear.\nYouth to itself rebels, though none else near.\nOph. I shall th' effect of this good lesson keep\nAs watchman to my heart. But, good my brother,\nDo not as some ungracious pastors do,\nShow me the steep and thorny way to heaven,\nWhiles, like a puff'd and reckless libertine,\nHimself the primrose path of dalliance treads\nAnd recks not his own rede.\nLaer. O, fear me not!\nEnter Polonius.\nI stay too long. But here my father comes.\nA double blessing is a double grace;\nOccasion smiles upon a second leave.\nPol. Yet here, Laertes? Aboard, aboard, for shame!\nThe wind sits in the shoulder of your sail,\nAnd you are stay'd for. There- my blessing with thee!\nAnd these few precepts in thy memory\nLook thou character. Give thy thoughts no tongue,\nNor any unproportion'd thought his act.\nBe thou familiar, but by no means vulgar:\nThose friends thou hast, and their adoption tried,\nGrapple them unto thy soul with hoops of steel;\nBut do not dull thy palm with entertainment\nOf each new-hatch'd, unfledg'd comrade. Beware\nOf entrance to a quarrel; but being in,\nBear't that th' opposed may beware of thee.\nGive every man thine ear, but few thy voice;\nTake each man's censure, but reserve thy judgment.\nCostly thy habit as thy purse can buy,\nBut not express'd in fancy; rich, not gaudy;\nFor the apparel oft proclaims the man,\nAnd they in France of the best rank and station\nAre most select and generous, chief in that.\nNeither a borrower nor a lender be;\nFor loan oft loses both itself and friend,\nAnd borrowing dulls the edge of husbandry.\nThis above all- to thine own self be true,\nAnd it must follow, as the night the day,\nThou canst not then be false to any man.\nFarewell. My blessing season this in thee!\nLaer. Most humbly do I take my leave, my lord.\nPol. The time invites you. Go, your servants tend.\nLaer. Farewell, Ophelia, and remember well\nWhat I have said to you.\nOph. 'Tis in my memory lock'd,\nAnd you yourself shall keep the key of it.\nLaer. Farewell. Exit.\nPol. What is't, Ophelia, he hath said to you?\nOph. So please you, something touching the Lord Hamlet.\nPol. Marry, well bethought!\n'Tis told me he hath very oft of late\nGiven private time to you, and you yourself\nHave of your audience been most free and bounteous.\nIf it be so- as so 'tis put on me,\nAnd that in way of caution- I must tell you\nYou do not understand yourself so clearly\nAs it behooves my daughter and your honour.\nWhat is between you? Give me up the truth.\nOph. He hath, my lord, of late made many tenders\nOf his affection to me.\nPol. Affection? Pooh! You speak like a green girl,\nUnsifted in such perilous circumstance.\nDo you believe his tenders, as you call them?\nOph. I do not know, my lord, what I should think,\nPol. Marry, I will teach you! Think yourself a baby\nThat you have ta'en these tenders for true pay,\nWhich are not sterling. Tender yourself more dearly,\nOr (not to crack the wind of the poor phrase,\nRunning it thus) you'll tender me a fool.\nOph. My lord, he hath importun'd me with love\nIn honourable fashion.\nPol. Ay, fashion you may call it. Go to, go to!\nOph. And hath given countenance to his speech, my lord,\nWith almost all the holy vows of heaven.\nPol. Ay, springes to catch woodcocks! I do know,\nWhen the blood burns, how prodigal the soul\nLends the tongue vows. These blazes, daughter,\nGiving more light than heat, extinct in both\nEven in their promise, as it is a-making,\nYou must not take for fire. From this time\nBe something scanter of your maiden presence.\nSet your entreatments at a higher rate\nThan a command to parley. For Lord Hamlet,\nBelieve so much in him, that he is young,\nAnd with a larger tether may he walk\nThan may be given you. In few, Ophelia,\nDo not believe his vows; for they are brokers,\nNot of that dye which their investments show,\nBut mere implorators of unholy suits,\nBreathing like sanctified and pious bawds,\nThe better to beguile. This is for all:\nI would not, in plain terms, from this time forth\nHave you so slander any moment leisure\nAs to give words or talk with the Lord Hamlet.\nLook to't, I charge you. Come your ways.\nOph. I shall obey, my lord.\nExeunt.\n\nScene IV.\nElsinore. The platform before the Castle.\nEnter Hamlet, Horatio, and Marcellus.\nHam. The air bites shrewdly; it is very cold.\nHor. It is a nipping and an eager air.\nHam. What hour now?\nHor. I think it lacks of twelve.\nMar. No, it is struck.\nHor. Indeed? I heard it not. It then draws near the season\nWherein the spirit held his wont to walk.\nA flourish of trumpets, and two pieces go off.\nWhat does this mean, my lord?\nHam. The King doth wake to-night and takes his rouse,\nKeeps wassail, and the swagg'ring upspring reels,\nAnd, as he drains his draughts of Rhenish down,\nThe kettledrum and trumpet thus bray out\nThe triumph of his pledge.\nHor. Is it a custom?\nHam. Ay, marry, is't;\nBut to my mind, though I am native here\nAnd to the manner born, it is a custom\nMore honour'd in the breach than the observance.\nThis heavy-headed revel east and west\nMakes us traduc'd and tax'd of other nations;\nThey clip us drunkards and with swinish phrase\nSoil our addition; and indeed it takes\nFrom our achievements, though perform'd at height,\nThe pith and marrow of our attribute.\nSo oft it chances in particular men\nThat, for some vicious mole of nature in them,\nAs in their birth,- wherein they are not guilty,\nSince nature cannot choose his origin,-\nBy the o'ergrowth of some complexion,\nOft breaking down the pales and forts of reason,\nOr by some habit that too much o'erleavens\nThe form of plausive manners, that these men\nCarrying, I say, the stamp of one defect,\nBeing nature's livery, or fortune's star,\nTheir virtues else- be they as pure as grace,\nAs infinite as man may undergo-\nShall in the general censure take corruption\nFrom that particular fault. The dram of e'il\nDoth all the noble substance often dout To his own scandal.\nEnter Ghost.\nHor. Look, my lord, it comes!\nHam. Angels and ministers of grace defend us!\nBe thou a spirit of health or goblin damn'd,\nBring with thee airs from heaven or blasts from hell,\nBe thy intents wicked or charitable,\nThou com'st in such a questionable shape\nThat I will speak to thee. I'll call thee Hamlet,\nKing, father, royal Dane. O, answer me?\nLet me not burst in ignorance, but tell\nWhy thy canoniz'd bones, hearsed in death,\nHave burst their cerements; why the sepulchre\nWherein we saw thee quietly inurn'd,\nHath op'd his ponderous and marble jaws\nTo cast thee up again. What may this mean\nThat thou, dead corse, again in complete steel,\nRevisits thus the glimpses of the moon,\nMaking night hideous, and we fools of nature\nSo horridly to shake our disposition\nWith thoughts beyond the reaches of our souls?\nSay, why is this? wherefore? What should we do?\nGhost beckons Hamlet.\nHor. It beckons you to go away with it,\nAs if it some impartment did desire\nTo you alone.\nMar. Look with what courteous action\nIt waves you to a more removed ground.\nBut do not go with it!\nHor. No, by no means!\nHam. It will not speak. Then will I follow it.\nHor. Do not, my lord!\nHam. Why, what should be the fear?\nI do not set my life at a pin's fee;\nAnd for my soul, what can it do to that,\nBeing a thing immortal as itself?\nIt waves me forth again. I'll follow it.\nHor. What if it tempt you toward the flood, my lord,\nOr to the dreadful summit of the cliff\nThat beetles o'er his base into the sea,\nAnd there assume some other, horrible form\nWhich might deprive your sovereignty of reason\nAnd draw you into madness? Think of it.\nThe very place puts toys of desperation,\nWithout more motive, into every brain\nThat looks so many fadoms to the sea\nAnd hears it roar beneath.\nHam. It waves me still.\nGo on. I'll follow thee.\nMar. You shall not go, my lord.\nHam. Hold off your hands!\nHor. Be rul'd. You shall not go.\nHam. My fate cries out\nAnd makes each petty artire in this body\nAs hardy as the Nemean lion's nerve.\n[Ghost beckons.]\nStill am I call'd. Unhand me, gentlemen.\nBy heaven, I'll make a ghost of him that lets me!-\nI say, away!- Go on. I'll follow thee.\nExeunt Ghost and Hamlet.\nHor. He waxes desperate with imagination.\nMar. Let's follow. 'Tis not fit thus to obey him.\nHor. Have after. To what issue wail this come?\nMar. Something is rotten in the state of Denmark.\nHor. Heaven will direct it.\nMar. Nay, let's follow him.\nExeunt.\n\nScene V.\nElsinore. The Castle. Another part of the fortifications.\nEnter Ghost and Hamlet.\nHam. Whither wilt thou lead me? Speak! I'll go no further.\nGhost. Mark me.\nHam. I will.\nGhost. My hour is almost come,\nWhen I to sulph'rous and tormenting flames\nMust render up myself.\nHam. Alas, poor ghost!\nGhost. Pity me not, but lend thy serious hearing\nTo what I shall unfold.\nHam. Speak. I am bound to hear.\nGhost. So art thou to revenge, when thou shalt hear.\nHam. What?\nGhost. I am thy father's spirit,\nDoom'd for a certain term to walk the night,\nAnd for the day confin'd to fast in fires,\nTill the foul crimes done in my days of nature\nAre burnt and purg'd away. But that I am forbid\nTo tell the secrets of my prison house,\nI could a tale unfold whose lightest word\nWould harrow up thy soul, freeze thy young blood,\nMake thy two eyes, like stars, start from their spheres,\nThy knotted and combined locks to part,\nAnd each particular hair to stand an end\nLike quills upon the fretful porpentine.\nBut this eternal blazon must not be\nTo ears of flesh and blood. List, list, O, list!\nIf thou didst ever thy dear father love-\nHam. O God!\nGhost. Revenge his foul and most unnatural murther.\nHam. Murther?\nGhost. Murther most foul, as in the best it is;\nBut this most foul, strange, and unnatural.\nHam. Haste me to know't, that I, with wings as swift\nAs meditation or the thoughts of love,\nMay sweep to my revenge.\nGhost. I find thee apt;\nAnd duller shouldst thou be than the fat weed\nThat rots itself in ease on Lethe wharf,\nWouldst thou not stir in this. Now, Hamlet, hear.\n'Tis given out that, sleeping in my orchard,\nA serpent stung me. So the whole ear of Denmark\nIs by a forged process of my death\nRankly abus'd. But know, thou noble youth,\nThe serpent that did sting thy father's life\nNow wears his crown.\nHam. O my prophetic soul!\nMy uncle?\nGhost. Ay, that incestuous, that adulterate beast,\nWith witchcraft of his wit, with traitorous gifts-\nO wicked wit and gifts, that have the power\nSo to seduce!- won to his shameful lust\nThe will of my most seeming-virtuous queen.\nO Hamlet, what a falling-off was there,\nFrom me, whose love was of that dignity\nThat it went hand in hand even with the vow\nI made to her in marriage, and to decline\nUpon a wretch whose natural gifts were poor\nTo those of mine!\nBut virtue, as it never will be mov'd,\nThough lewdness court it in a shape of heaven,\nSo lust, though to a radiant angel link'd,\nWill sate itself in a celestial bed\nAnd prey on garbage.\nBut soft! methinks I scent the morning air.\nBrief let me be. Sleeping within my orchard,\nMy custom always of the afternoon,\nUpon my secure hour thy uncle stole,\nWith juice of cursed hebona in a vial,\nAnd in the porches of my ears did pour\nThe leperous distilment; whose effect\nHolds such an enmity with blood of man\nThat swift as quicksilverr it courses through\nThe natural gates and alleys of the body,\nAnd with a sudden vigour it doth posset\nAnd curd, like eager droppings into milk,\nThe thin and wholesome blood. So did it mine;\nAnd a most instant tetter bark'd about,\nMost lazar-like, with vile and loathsome crust\nAll my smooth body.\nThus was I, sleeping, by a brother's hand\nOf life, of crown, of queen, at once dispatch'd;\nCut off even in the blossoms of my sin,\nUnhous'led, disappointed, unanel'd,\nNo reckoning made, but sent to my account\nWith all my imperfections on my head.\nHam. O, horrible! O, horrible! most horrible!\nGhost. If thou hast nature in thee, bear it not.\nLet not the royal bed of Denmark be\nA couch for luxury and damned incest.\nBut, howsoever thou pursuest this act,\nTaint not thy mind, nor let thy soul contrive\nAgainst thy mother aught. Leave her to heaven,\nAnd to those thorns that in her bosom lodge\nTo prick and sting her. Fare thee well at once.\nThe glowworm shows the matin to be near\nAnd gins to pale his uneffectual fire.\nAdieu, adieu, adieu! Remember me. Exit.\nHam. O all you host of heaven! O earth! What else?\nAnd shall I couple hell? Hold, hold, my heart!\nAnd you, my sinews, grow not instant old,\nBut bear me stiffly up. Remember thee?\nAy, thou poor ghost, while memory holds a seat\nIn this distracted globe. Remember thee?\nYea, from the table of my memory\nI'll wipe away all trivial fond records,\nAll saws of books, all forms, all pressures past\nThat youth and observation copied there,\nAnd thy commandment all alone shall live\nWithin the book and volume of my brain,\nUnmix'd with baser matter. Yes, by heaven!\nO most pernicious woman!\nO villain, villain, smiling, damned villain!\nMy tables! Meet it is I set it down\nThat one may smile, and smile, and be a villain;\nAt least I am sure it may be so in Denmark. [Writes.]\nSo, uncle, there you are. Now to my word:\nIt is 'Adieu, adieu! Remember me.'\nI have sworn't.\nHor. (within) My lord, my lord!\nEnter Horatio and Marcellus.\nMar. Lord Hamlet!\nHor. Heaven secure him!\nHam. So be it!\nMar. Illo, ho, ho, my lord!\nHam. Hillo, ho, ho, boy! Come, bird, come.\nMar. How is't, my noble lord?\nHor. What news, my lord?\nMar. O, wonderful!\nHor. Good my lord, tell it.\nHam. No, you will reveal it.\nHor. Not I, my lord, by heaven!\nMar. Nor I, my lord.\nHam. How say you then? Would heart of man once think it?\nBut you'll be secret?\nBoth. Ay, by heaven, my lord.\nHam. There's neer a villain dwelling in all Denmark\nBut he's an arrant knave.\nHor. There needs no ghost, my lord, come from the grave\nTo tell us this.\nHam. Why, right! You are in the right!\nAnd so, without more circumstance at all,\nI hold it fit that we shake hands and part;\nYou, as your business and desires shall point you,\nFor every man hath business and desire,\nSuch as it is; and for my own poor part,\nLook you, I'll go pray.\nHor. These are but wild and whirling words, my lord.\nHam. I am sorry they offend you, heartily;\nYes, faith, heartily.\nHor. There's no offence, my lord.\nHam. Yes, by Saint Patrick, but there is, Horatio,\nAnd much offence too. Touching this vision here,\nIt is an honest ghost, that let me tell you.\nFor your desire to know what is between us,\nO'ermaster't as you may. And now, good friends,\nAs you are friends, scholars, and soldiers,\nGive me one poor request.\nHor. What is't, my lord? We will.\nHam. Never make known what you have seen to-night.\nBoth. My lord, we will not.\nHam. Nay, but swear't.\nHor. In faith,\nMy lord, not I.\nMar. Nor I, my lord- in faith.\nHam. Upon my sword.\nMar. We have sworn, my lord, already.\nHam. Indeed, upon my sword, indeed.\nGhost cries under the stage.\nGhost. Swear.\nHam. Aha boy, say'st thou so? Art thou there, truepenny?\nCome on! You hear this fellow in the cellarage.\nConsent to swear.\nHor. Propose the oath, my lord.\nHam. Never to speak of this that you have seen.\nSwear by my sword.\nGhost. [beneath] Swear.\nHam. Hic et ubique? Then we'll shift our ground.\nCome hither, gentlemen,\nAnd lay your hands again upon my sword.\nNever to speak of this that you have heard:\nSwear by my sword.\nGhost. [beneath] Swear by his sword.\nHam. Well said, old mole! Canst work i' th' earth so fast?\nA worthy pioner! Once more remove, good friends.\"\nHor. O day and night, but this is wondrous strange!\nHam. And therefore as a stranger give it welcome.\nThere are more things in heaven and earth, Horatio,\nThan are dreamt of in your philosophy.\nBut come!\nHere, as before, never, so help you mercy,\nHow strange or odd soe'er I bear myself\n(As I perchance hereafter shall think meet\nTo put an antic disposition on),\nThat you, at such times seeing me, never shall,\nWith arms encumb'red thus, or this head-shake,\nOr by pronouncing of some doubtful phrase,\nAs 'Well, well, we know,' or 'We could, an if we would,'\nOr 'If we list to speak,' or 'There be, an if they might,'\nOr such ambiguous giving out, to note\nThat you know aught of me- this is not to do,\nSo grace and mercy at your most need help you,\nSwear.\nGhost. [beneath] Swear.\n[They swear.]\nHam. Rest, rest, perturbed spirit! So, gentlemen,\nWith all my love I do commend me to you;\nAnd what so poor a man as Hamlet is\nMay do t' express his love and friending to you,\nGod willing, shall not lack. Let us go in together;\nAnd still your fingers on your lips, I pray.\nThe time is out of joint. O cursed spite\nThat ever I was born to set it right!\nNay, come, let's go together.\nExeunt.\n\nAct II. Scene I.\nElsinore. A room in the house of Polonius.\nEnter Polonius and Reynaldo.\nPol. Give him this money and these notes, Reynaldo.\nRey. I will, my lord.\nPol. You shall do marvell's wisely, good Reynaldo,\nBefore You visit him, to make inquire\nOf his behaviour.\nRey. My lord, I did intend it.\nPol. Marry, well said, very well said. Look you, sir,\nEnquire me first what Danskers are in Paris;\nAnd how, and who, what means, and where they keep,\nWhat company, at what expense; and finding\nBy this encompassment and drift of question\nThat they do know my son, come you more nearer\nThan your particular demands will touch it.\nTake you, as 'twere, some distant knowledge of him;\nAs thus, 'I know his father and his friends,\nAnd in part him.' Do you mark this, Reynaldo?\nRey. Ay, very well, my lord.\nPol. 'And in part him, but,' you may say, 'not well.\nBut if't be he I mean, he's very wild\nAddicted so and so'; and there put on him\nWhat forgeries you please; marry, none so rank\nAs may dishonour him- take heed of that;\nBut, sir, such wanton, wild, and usual slips\nAs are companions noted and most known\nTo youth and liberty.\nRey. As gaming, my lord.\nPol. Ay, or drinking, fencing, swearing, quarrelling,\nDrabbing. You may go so far.\nRey. My lord, that would dishonour him.\nPol. Faith, no, as you may season it in the charge.\nYou must not put another scandal on him,\nThat he is open to incontinency.\nThat's not my meaning. But breathe his faults so quaintly\nThat they may seem the taints of liberty,\nThe flash and outbreak of a fiery mind,\nA savageness in unreclaimed blood,\nOf general assault.\nRey. But, my good lord-\nPol. Wherefore should you do this?\nRey. Ay, my lord,\nI would know that.\nPol. Marry, sir, here's my drift,\nAnd I believe it is a fetch of warrant.\nYou laying these slight sullies on my son\nAs 'twere a thing a little soil'd i' th' working,\nMark you,\nYour party in converse, him you would sound,\nHaving ever seen in the prenominate crimes\nThe youth you breathe of guilty, be assur'd\nHe closes with you in this consequence:\n'Good sir,' or so, or 'friend,' or 'gentleman'-\nAccording to the phrase or the addition\nOf man and country-\nRey. Very good, my lord.\nPol. And then, sir, does 'a this- 'a does- What was I about to say?\nBy the mass, I was about to say something! Where did I leave?\nRey. At 'closes in the consequence,' at 'friend or so,' and\ngentleman.'\nPol. At 'closes in the consequence'- Ay, marry!\nHe closes thus: 'I know the gentleman.\nI saw him yesterday, or t'other day,\nOr then, or then, with such or such; and, as you say,\nThere was 'a gaming; there o'ertook in's rouse;\nThere falling out at tennis'; or perchance,\n'I saw him enter such a house of sale,'\nVidelicet, a brothel, or so forth.\nSee you now-\nYour bait of falsehood takes this carp of truth;\nAnd thus do we of wisdom and of reach,\nWith windlasses and with assays of bias,\nBy indirections find directions out.\nSo, by my former lecture and advice,\nShall you my son. You have me, have you not\nRey. My lord, I have.\nPol. God b' wi' ye, fare ye well!\nRey. Good my lord! [Going.]\nPol. Observe his inclination in yourself.\nRey. I shall, my lord.\nPol. And let him ply his music.\nRey. Well, my lord.\nPol. Farewell!\nExit Reynaldo.\nEnter Ophelia.\nHow now, Ophelia? What's the matter?\nOph. O my lord, my lord, I have been so affrighted!\nPol. With what, i' th' name of God I\nOph. My lord, as I was sewing in my closet,\nLord Hamlet, with his doublet all unbrac'd,\nNo hat upon his head, his stockings foul'd,\nUngart'red, and down-gyved to his ankle;\nPale as his shirt, his knees knocking each other,\nAnd with a look so piteous in purport\nAs if he had been loosed out of hell\nTo speak of horrors- he comes before me.\nPol. Mad for thy love?\nOph. My lord, I do not know,\nBut truly I do fear it.\nPol. What said he?\nOph. He took me by the wrist and held me hard;\nThen goes he to the length of all his arm,\nAnd, with his other hand thus o'er his brow,\nHe falls to such perusal of my face\nAs he would draw it. Long stay'd he so.\nAt last, a little shaking of mine arm,\nAnd thrice his head thus waving up and down,\nHe rais'd a sigh so piteous and profound\nAs it did seem to shatter all his bulk\nAnd end his being. That done, he lets me go,\nAnd with his head over his shoulder turn'd\nHe seem'd to find his way without his eyes,\nFor out o' doors he went without their help\nAnd to the last bended their light on me.\nPol. Come, go with me. I will go seek the King.\nThis is the very ecstasy of love,\nWhose violent property fordoes itself\nAnd leads the will to desperate undertakings\nAs oft as any passion under heaven\nThat does afflict our natures. I am sorry.\nWhat, have you given him any hard words of late?\nOph. No, my good lord; but, as you did command,\nI did repel his letters and denied\nHis access to me.\nPol. That hath made him mad.\nI am sorry that with better heed and judgment\nI had not quoted him. I fear'd he did but trifle\nAnd meant to wrack thee; but beshrew my jealousy!\nBy heaven, it is as proper to our age\nTo cast beyond ourselves in our opinions\nAs it is common for the younger sort\nTo lack discretion. Come, go we to the King.\nThis must be known; which, being kept close, might move\nMore grief to hide than hate to utter love.\nCome.\nExeunt.\nScene II.\nElsinore. A room in the Castle.\nFlourish. [Enter King and Queen, Rosencrantz and Guildenstern, cum aliis.\nKing. Welcome, dear Rosencrantz and Guildenstern.\nMoreover that we much did long to see you,\nThe need we have to use you did provoke\nOur hasty sending. Something have you heard\nOf Hamlet's transformation. So I call it,\nSith nor th' exterior nor the inward man\nResembles that it was. What it should be,\nMore than his father's death, that thus hath put him\nSo much from th' understanding of himself,\nI cannot dream of. I entreat you both\nThat, being of so young clays brought up with him,\nAnd since so neighbour'd to his youth and haviour,\nThat you vouchsafe your rest here in our court\nSome little time; so by your companies\nTo draw him on to pleasures, and to gather\nSo much as from occasion you may glean,\nWhether aught to us unknown afflicts him thus\nThat, open'd, lies within our remedy.\nQueen. Good gentlemen, he hath much talk'd of you,\nAnd sure I am two men there are not living\nTo whom he more adheres. If it will please you\nTo show us so much gentry and good will\nAs to expend your time with us awhile\nFor the supply and profit of our hope,\nYour visitation shall receive such thanks\nAs fits a king's remembrance.\nRos. Both your Majesties\nMight, by the sovereign power you have of us,\nPut your dread pleasures more into command\nThan to entreaty.\nGuil. But we both obey,\nAnd here give up ourselves, in the full bent,\nTo lay our service freely at your feet,\nTo be commanded.\nKing. Thanks, Rosencrantz and gentle Guildenstern.\nQueen. Thanks, Guildenstern and gentle Rosencrantz.\nAnd I beseech you instantly to visit\nMy too much changed son.- Go, some of you,\nAnd bring these gentlemen where Hamlet is.\nGuil. Heavens make our presence and our practices\nPleasant and helpful to him!\nQueen. Ay, amen!\nExeunt Rosencrantz and Guildenstern, [with some\nAttendants].\nEnter Polonius.\nPol. Th' ambassadors from Norway, my good lord,\nAre joyfully return'd.\nKing. Thou still hast been the father of good news.\nPol. Have I, my lord? Assure you, my good liege,\nI hold my duty as I hold my soul,\nBoth to my God and to my gracious king;\nAnd I do think- or else this brain of mine\nHunts not the trail of policy so sure\nAs it hath us'd to do- that I have found\nThe very cause of Hamlet's lunacy.\nKing. O, speak of that! That do I long to hear.\nPol. Give first admittance to th' ambassadors.\nMy news shall be the fruit to that great feast.\nKing. Thyself do grace to them, and bring them in.\n[Exit Polonius.]\nHe tells me, my dear Gertrude, he hath found\nThe head and source of all your son's distemper.\nQueen. I doubt it is no other but the main,\nHis father's death and our o'erhasty marriage.\nKing. Well, we shall sift him.\nEnter Polonius, Voltemand, and Cornelius.\nWelcome, my good friends.\nSay, Voltemand, what from our brother Norway?\nVolt. Most fair return of greetings and desires.\nUpon our first, he sent out to suppress\nHis nephew's levies; which to him appear'd\nTo be a preparation 'gainst the Polack,\nBut better look'd into, he truly found\nIt was against your Highness; whereat griev'd,\nThat so his sickness, age, and impotence\nWas falsely borne in hand, sends out arrests\nOn Fortinbras; which he, in brief, obeys,\nReceives rebuke from Norway, and, in fine,\nMakes vow before his uncle never more\nTo give th' assay of arms against your Majesty.\nWhereon old Norway, overcome with joy,\nGives him three thousand crowns in annual fee\nAnd his commission to employ those soldiers,\nSo levied as before, against the Polack;\nWith an entreaty, herein further shown,\n[Gives a paper.]\nThat it might please you to give quiet pass\nThrough your dominions for this enterprise,\nOn such regards of safety and allowance\nAs therein are set down.\nKing. It likes us well;\nAnd at our more consider'd time we'll read,\nAnswer, and think upon this business.\nMeantime we thank you for your well-took labour.\nGo to your rest; at night we'll feast together.\nMost welcome home! Exeunt Ambassadors.\nPol. This business is well ended.\nMy liege, and madam, to expostulate\nWhat majesty should be, what duty is,\nWhy day is day, night is night, and time is time.\nWere nothing but to waste night, day, and time.\nTherefore, since brevity is the soul of wit,\nAnd tediousness the limbs and outward flourishes,\nI will be brief. Your noble son is mad.\nMad call I it; for, to define true madness,\nWhat is't but to be nothing else but mad?\nBut let that go.\nQueen. More matter, with less art.\nPol. Madam, I swear I use no art at all.\nThat he is mad, 'tis true: 'tis true 'tis pity;\nAnd pity 'tis 'tis true. A foolish figure!\nBut farewell it, for I will use no art.\nMad let us grant him then. And now remains\nThat we find out the cause of this effect-\nOr rather say, the cause of this defect,\nFor this effect defective comes by cause.\nThus it remains, and the remainder thus.\nPerpend.\nI have a daughter (have while she is mine),\nWho in her duty and obedience, mark,\nHath given me this. Now gather, and surmise.\n[Reads] the letter.\n'To the celestial, and my soul's idol, the most beautified\nOphelia,'-\nThat's an ill phrase, a vile phrase; 'beautified' is a vile\nphrase.\nBut you shall hear. Thus:\n[Reads.]\n'In her excellent white bosom, these, &c.'\nQueen. Came this from Hamlet to her?\nPol. Good madam, stay awhile. I will be faithful. [Reads.]\n'Doubt thou the stars are fire;\nDoubt that the sun doth move;\nDoubt truth to be a liar;\nBut never doubt I love.\n'O dear Ophelia, I am ill at these numbers; I have not art to\nreckon my groans; but that I love thee best, O most best, believe\nit. Adieu.\n'Thine evermore, most dear lady, whilst this machine is to him,\nHAMLET.'\nThis, in obedience, hath my daughter shown me;\nAnd more above, hath his solicitings,\nAs they fell out by time, by means, and place,\nAll given to mine ear.\nKing. But how hath she\nReceiv'd his love?\nPol. What do you think of me?\nKing. As of a man faithful and honourable.\nPol. I would fain prove so. But what might you think,\nWhen I had seen this hot love on the wing\n(As I perceiv'd it, I must tell you that,\nBefore my daughter told me), what might you,\nOr my dear Majesty your queen here, think,\nIf I had play'd the desk or table book,\nOr given my heart a winking, mute and dumb,\nOr look'd upon this love with idle sight?\nWhat might you think? No, I went round to work\nAnd my young mistress thus I did bespeak:\n'Lord Hamlet is a prince, out of thy star.\nThis must not be.' And then I prescripts gave her,\nThat she should lock herself from his resort,\nAdmit no messengers, receive no tokens.\nWhich done, she took the fruits of my advice,\nAnd he, repulsed, a short tale to make,\nFell into a sadness, then into a fast,\nThence to a watch, thence into a weakness,\nThence to a lightness, and, by this declension,\nInto the madness wherein now he raves,\nAnd all we mourn for.\nKing. Do you think 'tis this?\nQueen. it may be, very like.\nPol. Hath there been such a time- I would fain know that-\nThat I have Positively said ''Tis so,'\nWhen it prov'd otherwise.?\nKing. Not that I know.\nPol. [points to his head and shoulder] Take this from this, if this\nbe otherwise.\nIf circumstances lead me, I will find\nWhere truth is hid, though it were hid indeed\nWithin the centre.\nKing. How may we try it further?\nPol. You know sometimes he walks four hours together\nHere in the lobby.\nQueen. So he does indeed.\nPol. At such a time I'll loose my daughter to him.\nBe you and I behind an arras then.\nMark the encounter. If he love her not,\nAnd he not from his reason fall'n thereon\nLet me be no assistant for a state,\nBut keep a farm and carters.\nKing. We will try it.\nEnter Hamlet, reading on a book.\nQueen. But look where sadly the poor wretch comes reading.\nPol. Away, I do beseech you, both away\nI'll board him presently. O, give me leave.\nExeunt King and Queen, [with Attendants].\nHow does my good Lord Hamlet?\nHam. Well, God-a-mercy.\nPol. Do you know me, my lord?\nHam. Excellent well. You are a fishmonger.\nPol. Not I, my lord.\nHam. Then I would you were so honest a man.\nPol. Honest, my lord?\nHam. Ay, sir. To be honest, as this world goes, is to be one man\npick'd out of ten thousand.\nPol. That's very true, my lord.\nHam. For if the sun breed maggots in a dead dog, being a god\nkissing carrion- Have you a daughter?\nPol. I have, my lord.\nHam. Let her not walk i' th' sun. Conception is a blessing, but not\nas your daughter may conceive. Friend, look to't.\nPol. [aside] How say you by that? Still harping on my daughter. Yet\nhe knew me not at first. He said I was a fishmonger. He is far\ngone, far gone! And truly in my youth I suff'red much extremity\nfor love- very near this. I'll speak to him again.- What do you\nread, my lord?\nHam. Words, words, words.\nPol. What is the matter, my lord?\nHam. Between who?\nPol. I mean, the matter that you read, my lord.\nHam. Slanders, sir; for the satirical rogue says here that old men\nhave grey beards; that their faces are wrinkled; their eyes\npurging thick amber and plum-tree gum; and that they have a\nplentiful lack of wit, together with most weak hams. All which,\nsir, though I most powerfully and potently believe, yet I hold it\nnot honesty to have it thus set down; for you yourself, sir,\nshould be old as I am if, like a crab, you could go backward.\nPol. [aside] Though this be madness, yet there is a method in't.-\nWill You walk out of the air, my lord?\nHam. Into my grave?\nPol. Indeed, that is out o' th' air. [Aside] How pregnant sometimes\nhis replies are! a happiness that often madness hits on, which\nreason and sanity could not so prosperously be delivered of. I\nwill leave him and suddenly contrive the means of meeting between\nhim and my daughter.- My honourable lord, I will most humbly take\nmy leave of you.\nHam. You cannot, sir, take from me anything that I will more\nwillingly part withal- except my life, except my life, except my\nlife,\nEnter Rosencrantz and Guildenstern.\nPol. Fare you well, my lord.\nHam. These tedious old fools!\nPol. You go to seek the Lord Hamlet. There he is.\nRos. [to Polonius] God save you, sir!\nExit [Polonius].\nGuil. My honour'd lord!\nRos. My most dear lord!\nHam. My excellent good friends! How dost thou, Guildenstern? Ah,\nRosencrantz! Good lads, how do ye both?\nRos. As the indifferent children of the earth.\nGuil. Happy in that we are not over-happy.\nOn Fortune's cap we are not the very button.\nHam. Nor the soles of her shoe?\nRos. Neither, my lord.\nHam. Then you live about her waist, or in the middle of her\nfavours?\nGuil. Faith, her privates we.\nHam. In the secret parts of Fortune? O! most true! she is a\nstrumpet. What news ?\nRos. None, my lord, but that the world's grown honest.\nHam. Then is doomsday near! But your news is not true. Let me\nquestion more in particular. What have you, my good friends,\ndeserved at the hands of Fortune that she sends you to prison\nhither?\nGuil. Prison, my lord?\nHam. Denmark's a prison.\nRos. Then is the world one.\nHam. A goodly one; in which there are many confines, wards, and\ndungeons, Denmark being one o' th' worst.\nRos. We think not so, my lord.\nHam. Why, then 'tis none to you; for there is nothing either good\nor bad but thinking makes it so. To me it is a prison.\nRos. Why, then your ambition makes it one. 'Tis too narrow for your\nmind.\nHam. O God, I could be bounded in a nutshell and count myself a\nking of infinite space, were it not that I have bad dreams.\nGuil. Which dreams indeed are ambition; for the very substance of\nthe ambitious is merely the shadow of a dream.\nHam. A dream itself is but a shadow.\nRos. Truly, and I hold ambition of so airy and light a quality that\nit is but a shadow's shadow.\nHam. Then are our beggars bodies, and our monarchs and outstretch'd\nheroes the beggars' shadows. Shall we to th' court? for, by my\nfay, I cannot reason.\nBoth. We'll wait upon you.\nHam. No such matter! I will not sort you with the rest of my\nservants; for, to speak to you like an honest man, I am most\ndreadfully attended. But in the beaten way of friendship, what\nmake you at Elsinore?\nRos. To visit you, my lord; no other occasion.\nHam. Beggar that I am, I am even poor in thanks; but I thank you;\nand sure, dear friends, my thanks are too dear a halfpenny. Were\nyou not sent for? Is it your own inclining? Is it a free\nvisitation? Come, deal justly with me. Come, come! Nay, speak.\nGuil. What should we say, my lord?\nHam. Why, anything- but to th' purpose. You were sent for; and\nthere is a kind of confession in your looks, which your modesties\nhave not craft enough to colour. I know the good King and Queen\nhave sent for you.\nRos. To what end, my lord?\nHam. That you must teach me. But let me conjure you by the rights\nof our fellowship, by the consonancy of our youth, by the\nobligation of our ever-preserved love, and by what more dear a\nbetter proposer could charge you withal, be even and direct with\nme, whether you were sent for or no.\nRos. [aside to Guildenstern] What say you?\nHam. [aside] Nay then, I have an eye of you.- If you love me, hold\nnot off.\nGuil. My lord, we were sent for.\nHam. I will tell you why. So shall my anticipation prevent your\ndiscovery, and your secrecy to the King and Queen moult no\nfeather. I have of late- but wherefore I know not- lost all my\nmirth, forgone all custom of exercises; and indeed, it goes so\nheavily with my disposition that this goodly frame, the earth,\nseems to me a sterile promontory; this most excellent canopy, the\nair, look you, this brave o'erhanging firmament, this majestical\nroof fretted with golden fire- why, it appeareth no other thing\nto me than a foul and pestilent congregation of vapours. What a\npiece of work is a man! how noble in reason! how infinite in\nfaculties! in form and moving how express and admirable! in\naction how like an angel! in apprehension how like a god! the\nbeauty of the world, the paragon of animals! And yet to me what\nis this quintessence of dust? Man delights not me- no, nor woman\nneither, though by your smiling you seem to say so.\nRos. My lord, there was no such stuff in my thoughts.\nHam. Why did you laugh then, when I said 'Man delights not me'?\nRos. To think, my lord, if you delight not in man, what lenten\nentertainment the players shall receive from you. We coted them\non the way, and hither are they coming to offer you service.\nHam. He that plays the king shall be welcome- his Majesty shall\nhave tribute of me; the adventurous knight shall use his foil and\ntarget; the lover shall not sigh gratis; the humorous man shall\nend his part in peace; the clown shall make those laugh whose\nlungs are tickle o' th' sere; and the lady shall say her mind\nfreely, or the blank verse shall halt fort. What players are\nthey?\nRos. Even those you were wont to take such delight in, the\ntragedians of the city.\nHam. How chances it they travel? Their residence, both in\nreputation and profit, was better both ways.\nRos. I think their inhibition comes by the means of the late\ninnovation.\nHam. Do they hold the same estimation they did when I was in the\ncity? Are they so follow'd?\nRos. No indeed are they not.\nHam. How comes it? Do they grow rusty?\nRos. Nay, their endeavour keeps in the wonted pace; but there is,\nsir, an eyrie of children, little eyases, that cry out on the top\nof question and are most tyrannically clapp'd fort. These are now\nthe fashion, and so berattle the common stages (so they call\nthem) that many wearing rapiers are afraid of goosequills and\ndare scarce come thither.\nHam. What, are they children? Who maintains 'em? How are they\nescoted? Will they pursue the quality no longer than they can\nsing? Will they not say afterwards, if they should grow\nthemselves to common players (as it is most like, if their means\nare no better), their writers do them wrong to make them exclaim\nagainst their own succession.\nRos. Faith, there has been much to do on both sides; and the nation\nholds it no sin to tarre them to controversy. There was, for a\nwhile, no money bid for argument unless the poet and the player\nwent to cuffs in the question.\nHam. Is't possible?\nGuil. O, there has been much throwing about of brains.\nHam. Do the boys carry it away?\nRos. Ay, that they do, my lord- Hercules and his load too.\nHam. It is not very strange; for my uncle is King of Denmark, and\nthose that would make mows at him while my father lived give\ntwenty, forty, fifty, a hundred ducats apiece for his picture in\nlittle. 'Sblood, there is something in this more than natural, if\nphilosophy could find it out.\nFlourish for the Players.\nGuil. There are the players.\nHam. Gentlemen, you are welcome to Elsinore. Your hands, come! Th'\nappurtenance of welcome is fashion and ceremony. Let me comply\nwith you in this garb, lest my extent to the players (which I\ntell you must show fairly outwards) should more appear like\nentertainment than yours. You are welcome. But my uncle-father\nand aunt-mother are deceiv'd.\nGuil. In what, my dear lord?\nHam. I am but mad north-north-west. When the wind is southerly I\nknow a hawk from a handsaw.\n\nEnter Polonius.\nPol. Well be with you, gentlemen!\nHam. Hark you, Guildenstern- and you too- at each ear a hearer!\nThat great baby you see there is not yet out of his swaddling\nclouts.\nRos. Happily he's the second time come to them; for they say an old\nman is twice a child.\nHam. I will prophesy he comes to tell me of the players. Mark it.-\nYou say right, sir; a Monday morning; twas so indeed.\nPol. My lord, I have news to tell you.\nHam. My lord, I have news to tell you. When Roscius was an actor in\nRome-\nPol. The actors are come hither, my lord.\nHam. Buzz, buzz!\nPol. Upon my honour-\nHam. Then came each actor on his ass-\nPol. The best actors in the world, either for tragedy, comedy,\nhistory, pastoral, pastoral-comical, historical-pastoral,\ntragical-historical, tragical-comical-historical-pastoral; scene\nindividable, or poem unlimited. Seneca cannot be too heavy, nor\nPlautus too light. For the law of writ and the liberty, these are\nthe only men.\nHam. O Jephthah, judge of Israel, what a treasure hadst thou!\nPol. What treasure had he, my lord?\nHam. Why,\n'One fair daughter, and no more,\nThe which he loved passing well.'\nPol. [aside] Still on my daughter.\nHam. Am I not i' th' right, old Jephthah?\nPol. If you call me Jephthah, my lord, I have a daughter that I\nlove passing well.\nHam. Nay, that follows not.\nPol. What follows then, my lord?\nHam. Why,\n'As by lot, God wot,'\nand then, you know,\n\n'It came to pass, as most like it was.'\nThe first row of the pious chanson will show you more; for look\nwhere my abridgment comes.\nEnter four or five Players.\nYou are welcome, masters; welcome, all.- I am glad to see thee\nwell.- Welcome, good friends.- O, my old friend? Why, thy face is\nvalanc'd since I saw thee last. Com'st' thou to' beard me in\nDenmark?- What, my young lady and mistress? By'r Lady, your\nladyship is nearer to heaven than when I saw you last by the\naltitude of a chopine. Pray God your voice, like a piece of\nuncurrent gold, be not crack'd within the ring.- Masters, you are\nall welcome. We'll e'en to't like French falconers, fly at\nanything we see. We'll have a speech straight. Come, give us a\ntaste of your quality. Come, a passionate speech.\n1. Play. What speech, my good lord?\nHam. I heard thee speak me a speech once, but it was never acted;\nor if it was, not above once; for the play, I remember, pleas'd\nnot the million, 'twas caviary to the general; but it was (as I\nreceiv'd it, and others, whose judgments in such matters cried in\nthe top of mine) an excellent play, well digested in the scenes,\nset down with as much modesty as cunning. I remember one said\nthere were no sallets in the lines to make the matter savoury,\nnor no matter in the phrase that might indict the author of\naffectation; but call'd it an honest method, as wholesome as\nsweet, and by very much more handsome than fine. One speech in't\nI chiefly lov'd. 'Twas AEneas' tale to Dido, and thereabout of it\nespecially where he speaks of Priam's slaughter. If it live in\nyour memory, begin at this line- let me see, let me see:\n'The rugged Pyrrhus, like th' Hyrcanian beast-'\n'Tis not so; it begins with Pyrrhus:\n'The rugged Pyrrhus, he whose sable arms,\nBlack as his purpose, did the night resemble\nWhen he lay couched in the ominous horse,\nHath now this dread and black complexion smear'd\nWith heraldry more dismal. Head to foot\nNow is be total gules, horridly trick'd\nWith blood of fathers, mothers, daughters, sons,\nBak'd and impasted with the parching streets,\nThat lend a tyrannous and a damned light\nTo their lord's murther. Roasted in wrath and fire,\nAnd thus o'ersized with coagulate gore,\nWith eyes like carbuncles, the hellish Pyrrhus\nOld grandsire Priam seeks.'\nSo, proceed you.\nPol. Fore God, my lord, well spoken, with good accent and good\ndiscretion.\n1. Play. 'Anon he finds him,\nStriking too short at Greeks. His antique sword,\nRebellious to his arm, lies where it falls,\nRepugnant to command. Unequal match'd,\nPyrrhus at Priam drives, in rage strikes wide;\nBut with the whiff and wind of his fell sword\nTh' unnerved father falls. Then senseless Ilium,\nSeeming to feel this blow, with flaming top\nStoops to his base, and with a hideous crash\nTakes prisoner Pyrrhus' ear. For lo! his sword,\nWhich was declining on the milky head\nOf reverend Priam, seem'd i' th' air to stick.\nSo, as a painted tyrant, Pyrrhus stood,\nAnd, like a neutral to his will and matter,\nDid nothing.\nBut, as we often see, against some storm,\nA silence in the heavens, the rack stand still,\nThe bold winds speechless, and the orb below\nAs hush as death- anon the dreadful thunder\nDoth rend the region; so, after Pyrrhus' pause,\nAroused vengeance sets him new awork;\nAnd never did the Cyclops' hammers fall\nOn Mars's armour, forg'd for proof eterne,\nWith less remorse than Pyrrhus' bleeding sword\nNow falls on Priam.\nOut, out, thou strumpet Fortune! All you gods,\nIn general synod take away her power;\nBreak all the spokes and fellies from her wheel,\nAnd bowl the round nave down the hill of heaven,\nAs low as to the fiends!\nPol. This is too long.\nHam. It shall to the barber's, with your beard.- Prithee say on.\nHe's for a jig or a tale of bawdry, or he sleeps. Say on; come to\nHecuba.\n1. Play. 'But who, O who, had seen the mobled queen-'\nHam. 'The mobled queen'?\nPol. That's good! 'Mobled queen' is good.\n1. Play. 'Run barefoot up and down, threat'ning the flames\nWith bisson rheum; a clout upon that head\nWhere late the diadem stood, and for a robe,\nAbout her lank and all o'erteemed loins,\nA blanket, in the alarm of fear caught up-\nWho this had seen, with tongue in venom steep'd\n'Gainst Fortune's state would treason have pronounc'd.\nBut if the gods themselves did see her then,\nWhen she saw Pyrrhus make malicious sport\nIn Mincing with his sword her husband's limbs,\nThe instant burst of clamour that she made\n(Unless things mortal move them not at all)\nWould have made milch the burning eyes of heaven\nAnd passion in the gods.'\nPol. Look, whe'r he has not turn'd his colour, and has tears in's\neyes. Prithee no more!\nHam. 'Tis well. I'll have thee speak out the rest of this soon.-\nGood my lord, will you see the players well bestow'd? Do you\nhear? Let them be well us'd; for they are the abstract and brief\nchronicles of the time. After your death you were better have a\nbad epitaph than their ill report while you live.\nPol. My lord, I will use them according to their desert.\nHam. God's bodykins, man, much better! Use every man after his\ndesert, and who should scape whipping? Use them after your own\nhonour and dignity. The less they deserve, the more merit is in\nyour bounty. Take them in.\nPol. Come, sirs.\nHam. Follow him, friends. We'll hear a play to-morrow.\nExeunt Polonius and Players [except the First].\nDost thou hear me, old friend? Can you play 'The Murther of\nGonzago'?\n1. Play. Ay, my lord.\nHam. We'll ha't to-morrow night. You could, for a need, study a\nspeech of some dozen or sixteen lines which I would set down and\ninsert in't, could you not?\n1. Play. Ay, my lord.\nHam. Very well. Follow that lord- and look you mock him not.\n[Exit First Player.]\nMy good friends, I'll leave you till night. You are welcome to\nElsinore.\nRos. Good my lord!\nHam. Ay, so, God b' wi' ye!\n[Exeunt Rosencrantz and Guildenstern\nNow I am alone.\nO what a rogue and peasant slave am I!\nIs it not monstrous that this player here,\nBut in a fiction, in a dream of passion,\nCould force his soul so to his own conceit\nThat, from her working, all his visage wann'd,\nTears in his eyes, distraction in's aspect,\nA broken voice, and his whole function suiting\nWith forms to his conceit? And all for nothing!\nFor Hecuba!\nWhat's Hecuba to him, or he to Hecuba,\nThat he should weep for her? What would he do,\nHad he the motive and the cue for passion\nThat I have? He would drown the stage with tears\nAnd cleave the general ear with horrid speech;\nMake mad the guilty and appal the free,\nConfound the ignorant, and amaze indeed\nThe very faculties of eyes and ears.\nYet I,\nA dull and muddy-mettled rascal, peak\nLike John-a-dreams, unpregnant of my cause,\nAnd can say nothing! No, not for a king,\nUpon whose property and most dear life\nA damn'd defeat was made. Am I a coward?\nWho calls me villain? breaks my pate across?\nPlucks off my beard and blows it in my face?\nTweaks me by th' nose? gives me the lie i' th' throat\nAs deep as to the lungs? Who does me this, ha?\n'Swounds, I should take it! for it cannot be\nBut I am pigeon-liver'd and lack gall\nTo make oppression bitter, or ere this\nI should have fatted all the region kites\nWith this slave's offal. Bloody bawdy villain!\nRemorseless, treacherous, lecherous, kindless villain!\nO, vengeance!\nWhy, what an ass am I! This is most brave,\nThat I, the son of a dear father murther'd,\nPrompted to my revenge by heaven and hell,\nMust (like a whore) unpack my heart with words\nAnd fall a-cursing like a very drab,\nA scullion!\nFie upon't! foh! About, my brain! Hum, I have heard\nThat guilty creatures, sitting at a play,\nHave by the very cunning of the scene\nBeen struck so to the soul that presently\nThey have proclaim'd their malefactions;\nFor murther, though it have no tongue, will speak\nWith most miraculous organ, I'll have these Players\nPlay something like the murther of my father\nBefore mine uncle. I'll observe his looks;\nI'll tent him to the quick. If he but blench,\nI know my course. The spirit that I have seen\nMay be a devil; and the devil hath power\nT' assume a pleasing shape; yea, and perhaps\nOut of my weakness and my melancholy,\nAs he is very potent with such spirits,\nAbuses me to damn me. I'll have grounds\nMore relative than this. The play's the thing\nWherein I'll catch the conscience of the King. Exit.\n\n\nACT III. Scene I.\nElsinore. A room in the Castle.\nEnter King, Queen, Polonius, Ophelia, Rosencrantz, Guildenstern, and Lords.\nKing. And can you by no drift of circumstance\nGet from him why he puts on this confusion,\nGrating so harshly all his days of quiet\nWith turbulent and dangerous lunacy?\nRos. He does confess he feels himself distracted,\nBut from what cause he will by no means speak.\nGuil. Nor do we find him forward to be sounded,\nBut with a crafty madness keeps aloof\nWhen we would bring him on to some confession\nOf his true state.\nQueen. Did he receive you well?\nRos. Most like a gentleman.\nGuil. But with much forcing of his disposition.\nRos. Niggard of question, but of our demands\nMost free in his reply.\nQueen. Did you assay him\nTo any pastime?\nRos. Madam, it so fell out that certain players\nWe o'erraught on the way. Of these we told him,\nAnd there did seem in him a kind of joy\nTo hear of it. They are here about the court,\nAnd, as I think, they have already order\nThis night to play before him.\nPol. 'Tis most true;\nAnd he beseech'd me to entreat your Majesties\nTo hear and see the matter.\nKing. With all my heart, and it doth much content me\nTo hear him so inclin'd.\nGood gentlemen, give him a further edge\nAnd drive his purpose on to these delights.\nRos. We shall, my lord.\nExeunt Rosencrantz and Guildenstern.\nKing. Sweet Gertrude, leave us too;\nFor we have closely sent for Hamlet hither,\nThat he, as 'twere by accident, may here\nAffront Ophelia.\nHer father and myself (lawful espials)\nWill so bestow ourselves that, seeing unseen,\nWe may of their encounter frankly judge\nAnd gather by him, as he is behav'd,\nIf't be th' affliction of his love, or no,\nThat thus he suffers for.\nQueen. I shall obey you;\nAnd for your part, Ophelia, I do wish\nThat your good beauties be the happy cause\nOf Hamlet's wildness. So shall I hope your virtues\nWill bring him to his wonted way again,\nTo both your honours.\nOph. Madam, I wish it may.\n[Exit Queen.]\nPol. Ophelia, walk you here.- Gracious, so please you,\nWe will bestow ourselves.- [To Ophelia] Read on this book,\nThat show of such an exercise may colour\nYour loneliness.- We are oft to blame in this,\n'Tis too much prov'd, that with devotion's visage\nAnd pious action we do sugar o'er\nThe Devil himself.\nKing. [aside] O, 'tis too true!\nHow smart a lash that speech doth give my conscience!\nThe harlot's cheek, beautied with plast'ring art,\nIs not more ugly to the thing that helps it\nThan is my deed to my most painted word.\nO heavy burthen!\nPol. I hear him coming. Let's withdraw, my lord.\nExeunt King and Polonius].\nEnter Hamlet.\nHam. To be, or not to be- that is the question:\nWhether 'tis nobler in the mind to suffer\nThe slings and arrows of outrageous fortune\nOr to take arms against a sea of troubles,\nAnd by opposing end them. To die- to sleep-\nNo more; and by a sleep to say we end\nThe heartache, and the thousand natural shocks\nThat flesh is heir to. 'Tis a consummation\nDevoutly to be wish'd. To die- to sleep.\nTo sleep- perchance to dream: ay, there's the rub!\nFor in that sleep of death what dreams may come\nWhen we have shuffled off this mortal coil,\nMust give us pause. There's the respect\nThat makes calamity of so long life.\nFor who would bear the whips and scorns of time,\nTh' oppressor's wrong, the proud man's contumely,\nThe pangs of despis'd love, the law's delay,\nThe insolence of office, and the spurns\nThat patient merit of th' unworthy takes,\nWhen he himself might his quietus make\nWith a bare bodkin? Who would these fardels bear,\nTo grunt and sweat under a weary life,\nBut that the dread of something after death-\nThe undiscover'd country, from whose bourn\nNo traveller returns- puzzles the will,\nAnd makes us rather bear those ills we have\nThan fly to others that we know not of?\nThus conscience does make cowards of us all,\nAnd thus the native hue of resolution\nIs sicklied o'er with the pale cast of thought,\nAnd enterprises of great pith and moment\nWith this regard their currents turn awry\nAnd lose the name of action.- Soft you now!\nThe fair Ophelia!- Nymph, in thy orisons\nBe all my sins rememb'red.\nOph. Good my lord,\nHow does your honour for this many a day?\nHam. I humbly thank you; well, well, well.\nOph. My lord, I have remembrances of yours\nThat I have longed long to re-deliver.\nI pray you, now receive them.\nHam. No, not I!\nI never gave you aught.\nOph. My honour'd lord, you know right well you did,\nAnd with them words of so sweet breath compos'd\nAs made the things more rich. Their perfume lost,\nTake these again; for to the noble mind\nRich gifts wax poor when givers prove unkind.\nThere, my lord.\nHam. Ha, ha! Are you honest?\nOph. My lord?\nHam. Are you fair?\nOph. What means your lordship?\nHam. That if you be honest and fair, your honesty should admit no\ndiscourse to your beauty.\nOph. Could beauty, my lord, have better commerce than with honesty?\nHam. Ay, truly; for the power of beauty will sooner transform\nhonesty from what it is to a bawd than the force of honesty can\ntranslate beauty into his likeness. This was sometime a paradox,\nbut now the time gives it proof. I did love you once.\nOph. Indeed, my lord, you made me believe so.\nHam. You should not have believ'd me; for virtue cannot so\ninoculate our old stock but we shall relish of it. I loved you\nnot.\nOph. I was the more deceived.\nHam. Get thee to a nunnery! Why wouldst thou be a breeder of\nsinners? I am myself indifferent honest, but yet I could accuse\nme of such things that it were better my mother had not borne me.\nI am very proud, revengeful, ambitious; with more offences at my\nbeck than I have thoughts to put them in, imagination to give\nthem shape, or time to act them in. What should such fellows as I\ndo, crawling between earth and heaven? We are arrant knaves all;\nbelieve none of us. Go thy ways to a nunnery. Where's your\nfather?\nOph. At home, my lord.\nHam. Let the doors be shut upon him, that he may play the fool\nnowhere but in's own house. Farewell.\nOph. O, help him, you sweet heavens!\nHam. If thou dost marry, I'll give thee this plague for thy dowry:\nbe thou as chaste as ice, as pure as snow, thou shalt not escape\ncalumny. Get thee to a nunnery. Go, farewell. Or if thou wilt\nneeds marry, marry a fool; for wise men know well enough what\nmonsters you make of them. To a nunnery, go; and quickly too.\nFarewell.\nOph. O heavenly powers, restore him!\nHam. I have heard of your paintings too, well enough. God hath\ngiven you one face, and you make yourselves another. You jig, you\namble, and you lisp; you nickname God's creatures and make your\nwantonness your ignorance. Go to, I'll no more on't! it hath made\nme mad. I say, we will have no moe marriages. Those that are\nmarried already- all but one- shall live; the rest shall keep as\nthey are. To a nunnery, go. Exit.\nOph. O, what a noble mind is here o'erthrown!\nThe courtier's, scholar's, soldier's, eye, tongue, sword,\nTh' expectancy and rose of the fair state,\nThe glass of fashion and the mould of form,\nTh' observ'd of all observers- quite, quite down!\nAnd I, of ladies most deject and wretched,\nThat suck'd the honey of his music vows,\nNow see that noble and most sovereign reason,\nLike sweet bells jangled, out of tune and harsh;\nThat unmatch'd form and feature of blown youth\nBlasted with ecstasy. O, woe is me\nT' have seen what I have seen, see what I see!\nEnter King and Polonius.\nKing. Love? his affections do not that way tend;\nNor what he spake, though it lack'd form a little,\nWas not like madness. There's something in his soul\nO'er which his melancholy sits on brood;\nAnd I do doubt the hatch and the disclose\nWill be some danger; which for to prevent,\nI have in quick determination\nThus set it down: he shall with speed to England\nFor the demand of our neglected tribute.\nHaply the seas, and countries different,\nWith variable objects, shall expel\nThis something-settled matter in his heart,\nWhereon his brains still beating puts him thus\nFrom fashion of himself. What think you on't?\nPol. It shall do well. But yet do I believe\nThe origin and commencement of his grief\nSprung from neglected love.- How now, Ophelia?\nYou need not tell us what Lord Hamlet said.\nWe heard it all.- My lord, do as you please;\nBut if you hold it fit, after the play\nLet his queen mother all alone entreat him\nTo show his grief. Let her be round with him;\nAnd I'll be plac'd so please you, in the ear\nOf all their conference. If she find him not,\nTo England send him; or confine him where\nYour wisdom best shall think.\nKing. It shall be so.\nMadness in great ones must not unwatch'd go. Exeunt.\n\nScene II.\nElsinore. hall in the Castle.\nEnter Hamlet and three of the Players.\nHam. Speak the speech, I pray you, as I pronounc'd it to you,\ntrippingly on the tongue. But if you mouth it, as many of our\nplayers do, I had as live the town crier spoke my lines. Nor do\nnot saw the air too much with your hand, thus, but use all\ngently; for in the very torrent, tempest, and (as I may say)\nwhirlwind of your passion, you must acquire and beget a\ntemperance that may give it smoothness. O, it offends me to the\nsoul to hear a robustious periwig-pated fellow tear a passion to\ntatters, to very rags, to split the cars of the groundlings, who\n(for the most part) are capable of nothing but inexplicable dumb\nshows and noise. I would have such a fellow whipp'd for o'erdoing\nTermagant. It out-herods Herod. Pray you avoid it.\nPlayer. I warrant your honour.\nHam. Be not too tame neither; but let your own discretion be your\ntutor. Suit the action to the word, the word to the action; with\nthis special observance, that you o'erstep not the modesty of\nnature: for anything so overdone is from the purpose of playing,\nwhose end, both at the first and now, was and is, to hold, as\n'twere, the mirror up to nature; to show Virtue her own feature,\nscorn her own image, and the very age and body of the time his\nform and pressure. Now this overdone, or come tardy off, though\nit make the unskilful laugh, cannot but make the judicious\ngrieve; the censure of the which one must in your allowance\no'erweigh a whole theatre of others. O, there be players that I\nhave seen play, and heard others praise, and that highly (not to\nspeak it profanely), that, neither having the accent of\nChristians, nor the gait of Christian, pagan, nor man, have so\nstrutted and bellowed that I have thought some of Nature's\njourneymen had made men, and not made them well, they imitated\nhumanity so abominably.\nPlayer. I hope we have reform'd that indifferently with us, sir.\nHam. O, reform it altogether! And let those that play your clowns\nspeak no more than is set down for them. For there be of them\nthat will themselves laugh, to set on some quantity of barren\nspectators to laugh too, though in the mean time some necessary\nquestion of the play be then to be considered. That's villanous\nand shows a most pitiful ambition in the fool that uses it. Go\nmake you ready.\nExeunt Players.\nEnter Polonius, Rosencrantz, and Guildenstern.\nHow now, my lord? Will the King hear this piece of work?\nPol. And the Queen too, and that presently.\nHam. Bid the players make haste, [Exit Polonius.] Will you two\nhelp to hasten them?\nBoth. We will, my lord. Exeunt they two.\nHam. What, ho, Horatio!\nEnter Horatio.\nHor. Here, sweet lord, at your service.\nHam. Horatio, thou art e'en as just a man\nAs e'er my conversation cop'd withal.\nHor. O, my dear lord!\nHam. Nay, do not think I flatter;\nFor what advancement may I hope from thee,\nThat no revenue hast but thy good spirits\nTo feed and clothe thee? Why should the poor be flatter'd?\nNo, let the candied tongue lick absurd pomp,\nAnd crook the pregnant hinges of the knee\nWhere thrift may follow fawning. Dost thou hear?\nSince my dear soul was mistress of her choice\nAnd could of men distinguish, her election\nHath scald thee for herself. For thou hast been\nAs one, in suff'ring all, that suffers nothing;\nA man that Fortune's buffets and rewards\nHast ta'en with equal thanks; and blest are those\nWhose blood and judgment are so well commingled\nThat they are not a pipe for Fortune's finger\nTo sound what stop she please. Give me that man\nThat is not passion's slave, and I will wear him\nIn my heart's core, ay, in my heart of heart,\nAs I do thee. Something too much of this I\nThere is a play to-night before the King.\nOne scene of it comes near the circumstance,\nWhich I have told thee, of my father's death.\nI prithee, when thou seest that act afoot,\nEven with the very comment of thy soul\nObserve my uncle. If his occulted guilt\nDo not itself unkennel in one speech,\nIt is a damned ghost that we have seen,\nAnd my imaginations are as foul\nAs Vulcan's stithy. Give him heedful note;\nFor I mine eyes will rivet to his face,\nAnd after we will both our judgments join\nIn censure of his seeming.\nHor. Well, my lord.\nIf he steal aught the whilst this play is playing,\nAnd scape detecting, I will pay the theft.\nSound a flourish. [Enter Trumpets and Kettledrums. Danish\nmarch. [Enter King, Queen, Polonius, Ophelia, Rosencrantz,\nGuildenstern, and other Lords attendant, with the Guard\ncarrying torches.\nHam. They are coming to the play. I must be idle.\nGet you a place.\nKing. How fares our cousin Hamlet?\nHam. Excellent, i' faith; of the chameleon's dish. I eat the air,\npromise-cramm'd. You cannot feed capons so.\nKing. I have nothing with this answer, Hamlet. These words are not\nmine.\nHam. No, nor mine now. [To Polonius] My lord, you play'd once\ni' th' university, you say?\nPol. That did I, my lord, and was accounted a good actor.\nHam. What did you enact?\nPol. I did enact Julius Caesar; I was kill'd i' th' Capitol; Brutus\nkill'd me.\nHam. It was a brute part of him to kill so capital a calf there. Be\nthe players ready.\nRos. Ay, my lord. They stay upon your patience.\nQueen. Come hither, my dear Hamlet, sit by me.\nHam. No, good mother. Here's metal more attractive.\nPol. [to the King] O, ho! do you mark that?\nHam. Lady, shall I lie in your lap?\n[Sits down at Ophelia's feet.]\nOph. No, my lord.\nHam. I mean, my head upon your lap?\nOph. Ay, my lord.\nHam. Do you think I meant country matters?\nOph. I think nothing, my lord.\nHam. That's a fair thought to lie between maids' legs.\nOph. What is, my lord?\nHam. Nothing.\nOph. You are merry, my lord.\nHam. Who, I?\nOph. Ay, my lord.\nHam. O God, your only jig-maker! What should a man do but be merry?\nFor look you how cheerfully my mother looks, and my father died\nwithin 's two hours.\nOph. Nay 'tis twice two months, my lord.\nHam. So long? Nay then, let the devil wear black, for I'll have a\nsuit of sables. O heavens! die two months ago, and not forgotten\nyet? Then there's hope a great man's memory may outlive his life\nhalf a year. But, by'r Lady, he must build churches then; or else\nshall he suffer not thinking on, with the hobby-horse, whose\nepitaph is 'For O, for O, the hobby-horse is forgot!'\nHautboys play. The dumb show enters.\nEnter a King and a Queen very lovingly; the Queen embracing\nhim and he her. She kneels, and makes show of protestation\nunto him. He takes her up, and declines his head upon her\nneck. He lays him down upon a bank of flowers. She, seeing\nhim asleep, leaves him. Anon comes in a fellow, takes off his\ncrown, kisses it, pours poison in the sleeper's ears, and\nleaves him. The Queen returns, finds the King dead, and makes\npassionate action. The Poisoner with some three or four Mutes,\ncomes in again, seem to condole with her. The dead body is\ncarried away. The Poisoner wooes the Queen with gifts; she\nseems harsh and unwilling awhile, but in the end accepts\nhis love.\nExeunt.\nOph. What means this, my lord?\nHam. Marry, this is miching malhecho; it means mischief.\nOph. Belike this show imports the argument of the play.\nEnter Prologue.\nHam. We shall know by this fellow. The players cannot keep counsel;\nthey'll tell all.\nOph. Will he tell us what this show meant?\nHam. Ay, or any show that you'll show him. Be not you asham'd to\nshow, he'll not shame to tell you what it means.\nOph. You are naught, you are naught! I'll mark the play.\nPro. For us, and for our tragedy,\nHere stooping to your clemency,\nWe beg your hearing patiently. [Exit.]\nHam. Is this a prologue, or the posy of a ring?\nOph. 'Tis brief, my lord.\nHam. As woman's love.\nEnter [two Players as] King and Queen.\nKing. Full thirty times hath Phoebus' cart gone round\nNeptune's salt wash and Tellus' orbed ground,\nAnd thirty dozed moons with borrowed sheen\nAbout the world have times twelve thirties been,\nSince love our hearts, and Hymen did our hands,\nUnite comutual in most sacred bands.\nQueen. So many journeys may the sun and moon\nMake us again count o'er ere love be done!\nBut woe is me! you are so sick of late,\nSo far from cheer and from your former state.\nThat I distrust you. Yet, though I distrust,\nDiscomfort you, my lord, it nothing must;\nFor women's fear and love holds quantity,\nIn neither aught, or in extremity.\nNow what my love is, proof hath made you know;\nAnd as my love is siz'd, my fear is so.\nWhere love is great, the littlest doubts are fear;\nWhere little fears grow great, great love grows there.\nKing. Faith, I must leave thee, love, and shortly too;\nMy operant powers their functions leave to do.\nAnd thou shalt live in this fair world behind,\nHonour'd, belov'd, and haply one as kind\nFor husband shalt thou-\nQueen. O, confound the rest!\nSuch love must needs be treason in my breast.\nWhen second husband let me be accurst!\nNone wed the second but who killed the first.\nHam. [aside] Wormwood, wormwood!\nQueen. The instances that second marriage move\nAre base respects of thrift, but none of love.\nA second time I kill my husband dead\nWhen second husband kisses me in bed.\nKing. I do believe you think what now you speak;\nBut what we do determine oft we break.\nPurpose is but the slave to memory,\nOf violent birth, but poor validity;\nWhich now, like fruit unripe, sticks on the tree,\nBut fill unshaken when they mellow be.\nMost necessary 'tis that we forget\nTo pay ourselves what to ourselves is debt.\nWhat to ourselves in passion we propose,\nThe passion ending, doth the purpose lose.\nThe violence of either grief or joy\nTheir own enactures with themselves destroy.\nWhere joy most revels, grief doth most lament;\nGrief joys, joy grieves, on slender accident.\nThis world is not for aye, nor 'tis not strange\nThat even our loves should with our fortunes change;\nFor 'tis a question left us yet to prove,\nWhether love lead fortune, or else fortune love.\nThe great man down, you mark his favourite flies,\nThe poor advanc'd makes friends of enemies;\nAnd hitherto doth love on fortune tend,\nFor who not needs shall never lack a friend,\nAnd who in want a hollow friend doth try,\nDirectly seasons him his enemy.\nBut, orderly to end where I begun,\nOur wills and fates do so contrary run\nThat our devices still are overthrown;\nOur thoughts are ours, their ends none of our own.\nSo think thou wilt no second husband wed;\nBut die thy thoughts when thy first lord is dead.\nQueen. Nor earth to me give food, nor heaven light,\nSport and repose lock from me day and night,\nTo desperation turn my trust and hope,\nAn anchor's cheer in prison be my scope,\nEach opposite that blanks the face of joy\nMeet what I would have well, and it destroy,\nBoth here and hence pursue me lasting strife,\nIf, once a widow, ever I be wife!\nHam. If she should break it now!\nKing. 'Tis deeply sworn. Sweet, leave me here awhile.\nMy spirits grow dull, and fain I would beguile\nThe tedious day with sleep.\nQueen. Sleep rock thy brain,\n[He] sleeps.\nAnd never come mischance between us twain!\nExit.\nHam. Madam, how like you this play?\nQueen. The lady doth protest too much, methinks.\nHam. O, but she'll keep her word.\nKing. Have you heard the argument? Is there no offence in't?\nHam. No, no! They do but jest, poison in jest; no offence i' th'\nworld.\nKing. What do you call the play?\nHam. 'The Mousetrap.' Marry, how? Tropically. This play is the\nimage of a murther done in Vienna. Gonzago is the duke's name;\nhis wife, Baptista. You shall see anon. 'Tis a knavish piece of\nwork; but what o' that? Your Majesty, and we that have free\nsouls, it touches us not. Let the gall'd jade winch; our withers\nare unwrung.\nEnter Lucianus.\n\nThis is one Lucianus, nephew to the King.\nOph. You are as good as a chorus, my lord.\nHam. I could interpret between you and your love, if I could see\nthe puppets dallying.\nOph. You are keen, my lord, you are keen.\nHam. It would cost you a groaning to take off my edge.\nOph. Still better, and worse.\nHam. So you must take your husbands.- Begin, murtherer. Pox, leave\nthy damnable faces, and begin! Come, the croaking raven doth\nbellow for revenge.\nLuc. Thoughts black, hands apt, drugs fit, and time agreeing;\nConfederate season, else no creature seeing;\nThou mixture rank, of midnight weeds collected,\nWith Hecate's ban thrice blasted, thrice infected,\nThy natural magic and dire property\nOn wholesome life usurp immediately.\nPours the poison in his ears.\nHam. He poisons him i' th' garden for's estate. His name's Gonzago.\nThe story is extant, and written in very choice Italian. You\nshall see anon how the murtherer gets the love of Gonzago's wife.\nOph. The King rises.\nHam. What, frighted with false fire?\nQueen. How fares my lord?\nPol. Give o'er the play.\nKing. Give me some light! Away!\nAll. Lights, lights, lights!\nExeunt all but Hamlet and Horatio.\nHam. Why, let the strucken deer go weep,\nThe hart ungalled play;\nFor some must watch, while some must sleep:\nThus runs the world away.\nWould not this, sir, and a forest of feathers- if the rest of my\nfortunes turn Turk with me-with two Provincial roses on my raz'd\nshoes, get me a fellowship in a cry of players, sir?\nHor. Half a share.\nHam. A whole one I!\nFor thou dost know, O Damon dear,\nThis realm dismantled was\nOf Jove himself; and now reigns here\nA very, very- pajock.\nHor. You might have rhym'd.\nHam. O good Horatio, I'll take the ghost's word for a thousand\npound! Didst perceive?\nHor. Very well, my lord.\nHam. Upon the talk of the poisoning?\nHor. I did very well note him.\nHam. Aha! Come, some music! Come, the recorders!\nFor if the King like not the comedy,\nWhy then, belike he likes it not, perdy.\nCome, some music!\nEnter Rosencrantz and Guildenstern.\nGuil. Good my lord, vouchsafe me a word with you.\nHam. Sir, a whole history.\nGuil. The King, sir-\nHam. Ay, sir, what of him?\nGuil. Is in his retirement, marvellous distemper'd.\nHam. With drink, sir?\nGuil. No, my lord; rather with choler.\nHam. Your wisdom should show itself more richer to signify this to\nthe doctor; for me to put him to his purgation would perhaps\nplunge him into far more choler.\nGuil. Good my lord, put your discourse into some frame, and start\nnot so wildly from my affair.\nHam. I am tame, sir; pronounce.\nGuil. The Queen, your mother, in most great affliction of spirit\nhath sent me to you.\nHam. You are welcome.\nGuil. Nay, good my lord, this courtesy is not of the right breed.\nIf it shall please you to make me a wholesome answer, I will do\nyour mother's commandment; if not, your pardon and my return\nshall be the end of my business.\nHam. Sir, I cannot.\nGuil. What, my lord?\nHam. Make you a wholesome answer; my wit's diseas'd. But, sir, such\nanswer is I can make, you shall command; or rather, as you say,\nmy mother. Therefore no more, but to the matter! My mother, you\nsay-\nRos. Then thus she says: your behaviour hath struck her into\namazement and admiration.\nHam. O wonderful son, that can so stonish a mother! But is there no\nsequel at the heels of this mother's admiration? Impart.\nRos. She desires to speak with you in her closet ere you go to bed.\nHam. We shall obey, were she ten times our mother. Have you any\nfurther trade with us?\nRos. My lord, you once did love me.\nHam. And do still, by these pickers and stealers!\nRos. Good my lord, what is your cause of distemper? You do surely\nbar the door upon your own liberty, if you deny your griefs to\nyour friend.\nHam. Sir, I lack advancement.\nRos. How can that be, when you have the voice of the King himself\nfor your succession in Denmark?\nHam. Ay, sir, but 'while the grass grows'- the proverb is something\nmusty.\nEnter the Players with recorders.\nO, the recorders! Let me see one. To withdraw with you- why do\nyou go about to recover the wind of me, as if you would drive me\ninto a toil?\nGuil. O my lord, if my duty be too bold, my love is too unmannerly.\nHam. I do not well understand that. Will you play upon this pipe?\nGuil. My lord, I cannot.\nHam. I pray you.\nGuil. Believe me, I cannot.\nHam. I do beseech you.\nGuil. I know, no touch of it, my lord.\nHam. It is as easy as lying. Govern these ventages with your\nfingers and thumbs, give it breath with your mouth, and it will\ndiscourse most eloquent music. Look you, these are the stops.\nGuil. But these cannot I command to any utt'rance of harmony. I\nhave not the skill.\nHam. Why, look you now, how unworthy a thing you make of me! You\nwould play upon me; you would seem to know my stops; you would\npluck out the heart of my mystery; you would sound me from my\nlowest note to the top of my compass; and there is much music,\nexcellent voice, in this little organ, yet cannot you make it\nspeak. 'Sblood, do you think I am easier to be play'd on than a\npipe? Call me what instrument you will, though you can fret me,\nyou cannot play upon me.\nEnter Polonius.\nGod bless you, sir!\nPol. My lord, the Queen would speak with you, and presently.\nHam. Do you see yonder cloud that's almost in shape of a camel?\nPol. By th' mass, and 'tis like a camel indeed.\nHam. Methinks it is like a weasel.\nPol. It is back'd like a weasel.\nHam. Or like a whale.\nPol. Very like a whale.\nHam. Then will I come to my mother by-and-by.- They fool me to the\ntop of my bent.- I will come by-and-by.\nPol. I will say so. Exit.\nHam. 'By-and-by' is easily said.- Leave me, friends.\n[Exeunt all but Hamlet.]\n'Tis now the very witching time of night,\nWhen churchyards yawn, and hell itself breathes out\nContagion to this world. Now could I drink hot blood\nAnd do such bitter business as the day\nWould quake to look on. Soft! now to my mother!\nO heart, lose not thy nature; let not ever\nThe soul of Nero enter this firm bosom.\nLet me be cruel, not unnatural;\nI will speak daggers to her, but use none.\nMy tongue and soul in this be hypocrites-\nHow in my words somever she be shent,\nTo give them seals never, my soul, consent! Exit.\n\nScene III.\nA room in the Castle.\nEnter King, Rosencrantz, and Guildenstern.\nKing. I like him not, nor stands it safe with us\nTo let his madness range. Therefore prepare you;\nI your commission will forthwith dispatch,\nAnd he to England shall along with you.\nThe terms of our estate may not endure\nHazard so near us as doth hourly grow\nOut of his lunacies.\nGuil. We will ourselves provide.\nMost holy and religious fear it is\nTo keep those many many bodies safe\nThat live and feed upon your Majesty.\nRos. The single and peculiar life is bound\nWith all the strength and armour of the mind\nTo keep itself from noyance; but much more\nThat spirit upon whose weal depends and rests\nThe lives of many. The cesse of majesty\nDies not alone, but like a gulf doth draw\nWhat's near it with it. It is a massy wheel,\nFix'd on the summit of the highest mount,\nTo whose huge spokes ten thousand lesser things\nAre mortis'd and adjoin'd; which when it falls,\nEach small annexment, petty consequence,\nAttends the boist'rous ruin. Never alone\nDid the king sigh, but with a general groan.\nKing. Arm you, I pray you, to th', speedy voyage;\nFor we will fetters put upon this fear,\nWhich now goes too free-footed.\nBoth. We will haste us.\nExeunt Gentlemen.\nEnter Polonius.\nPol. My lord, he's going to his mother's closet.\nBehind the arras I'll convey myself\nTo hear the process. I'll warrant she'll tax him home;\nAnd, as you said, and wisely was it said,\n'Tis meet that some more audience than a mother,\nSince nature makes them partial, should o'erhear\nThe speech, of vantage. Fare you well, my liege.\nI'll call upon you ere you go to bed\nAnd tell you what I know.\nKing. Thanks, dear my lord.\nExit [Polonius].\nO, my offence is rank, it smells to heaven;\nIt hath the primal eldest curse upon't,\nA brother's murther! Pray can I not,\nThough inclination be as sharp as will.\nMy stronger guilt defeats my strong intent,\nAnd, like a man to double business bound,\nI stand in pause where I shall first begin,\nAnd both neglect. What if this cursed hand\nWere thicker than itself with brother's blood,\nIs there not rain enough in the sweet heavens\nTo wash it white as snow? Whereto serves mercy\nBut to confront the visage of offence?\nAnd what's in prayer but this twofold force,\nTo be forestalled ere we come to fall,\nOr pardon'd being down? Then I'll look up;\nMy fault is past. But, O, what form of prayer\nCan serve my turn? 'Forgive me my foul murther'?\nThat cannot be; since I am still possess'd\nOf those effects for which I did the murther-\nMy crown, mine own ambition, and my queen.\nMay one be pardon'd and retain th' offence?\nIn the corrupted currents of this world\nOffence's gilded hand may shove by justice,\nAnd oft 'tis seen the wicked prize itself\nBuys out the law; but 'tis not so above.\nThere is no shuffling; there the action lies\nIn his true nature, and we ourselves compell'd,\nEven to the teeth and forehead of our faults,\nTo give in evidence. What then? What rests?\nTry what repentance can. What can it not?\nYet what can it when one cannot repent?\nO wretched state! O bosom black as death!\nO limed soul, that, struggling to be free,\nArt more engag'd! Help, angels! Make assay.\nBow, stubborn knees; and heart with strings of steel,\nBe soft as sinews of the new-born babe!\nAll may be well. He kneels.\nEnter Hamlet.\nHam. Now might I do it pat, now he is praying;\nAnd now I'll do't. And so he goes to heaven,\nAnd so am I reveng'd. That would be scann'd.\nA villain kills my father; and for that,\nI, his sole son, do this same villain send\nTo heaven.\nWhy, this is hire and salary, not revenge!\nHe took my father grossly, full of bread,\nWith all his crimes broad blown, as flush as May;\nAnd how his audit stands, who knows save heaven?\nBut in our circumstance and course of thought,\n'Tis heavy with him; and am I then reveng'd,\nTo take him in the purging of his soul,\nWhen he is fit and seasoned for his passage?\nNo.\nUp, sword, and know thou a more horrid hent.\nWhen he is drunk asleep; or in his rage;\nOr in th' incestuous pleasure of his bed;\nAt gaming, swearing, or about some act\nThat has no relish of salvation in't-\nThen trip him, that his heels may kick at heaven,\nAnd that his soul may be as damn'd and black\nAs hell, whereto it goes. My mother stays.\nThis physic but prolongs thy sickly days. Exit.\nKing. [rises] My words fly up, my thoughts remain below.\nWords without thoughts never to heaven go. Exit.\n\nScene IV.\nThe Queen's closet.\nEnter Queen and Polonius.\nPol. He will come straight. Look you lay home to him.\nTell him his pranks have been too broad to bear with,\nAnd that your Grace hath screen'd and stood between\nMuch heat and him. I'll silence me even here.\nPray you be round with him.\nHam. (within) Mother, mother, mother!\nQueen. I'll warrant you; fear me not. Withdraw; I hear him coming.\n[Polonius hides behind the arras.]\nEnter Hamlet.\nHam. Now, mother, what's the matter?\nQueen. Hamlet, thou hast thy father much offended.\nHam. Mother, you have my father much offended.\nQueen. Come, come, you answer with an idle tongue.\nHam. Go, go, you question with a wicked tongue.\nQueen. Why, how now, Hamlet?\nHam. What's the matter now?\nQueen. Have you forgot me?\nHam. No, by the rood, not so!\nYou are the Queen, your husband's brother's wife,\nAnd (would it were not so!) you are my mother.\nQueen. Nay, then I'll set those to you that can speak.\nHam. Come, come, and sit you down. You shall not budge I\nYou go not till I set you up a glass\nWhere you may see the inmost part of you.\nQueen. What wilt thou do? Thou wilt not murther me?\nHelp, help, ho!\nPol. [behind] What, ho! help, help, help!\nHam. [draws] How now? a rat? Dead for a ducat, dead!\n[Makes a pass through the arras and] kills Polonius.\nPol. [behind] O, I am slain!\nQueen. O me, what hast thou done?\nHam. Nay, I know not. Is it the King?\nQueen. O, what a rash and bloody deed is this!\nHam. A bloody deed- almost as bad, good mother,\nAs kill a king, and marry with his brother.\nQueen. As kill a king?\nHam. Ay, lady, it was my word.\n[Lifts up the arras and sees Polonius.]\nThou wretched, rash, intruding fool, farewell!\nI took thee for thy better. Take thy fortune.\nThou find'st to be too busy is some danger.\nLeave wringing of your hinds. Peace! sit you down\nAnd let me wring your heart; for so I shall\nIf it be made of penetrable stuff;\nIf damned custom have not braz'd it so\nThat it is proof and bulwark against sense.\nQueen. What have I done that thou dar'st wag thy tongue\nIn noise so rude against me?\nHam. Such an act\nThat blurs the grace and blush of modesty;\nCalls virtue hypocrite; takes off the rose\nFrom the fair forehead of an innocent love,\nAnd sets a blister there; makes marriage vows\nAs false as dicers' oaths. O, such a deed\nAs from the body of contraction plucks\nThe very soul, and sweet religion makes\nA rhapsody of words! Heaven's face doth glow;\nYea, this solidity and compound mass,\nWith tristful visage, as against the doom,\nIs thought-sick at the act.\nQueen. Ay me, what act,\nThat roars so loud and thunders in the index?\nHam. Look here upon th's picture, and on this,\nThe counterfeit presentment of two brothers.\nSee what a grace was seated on this brow;\nHyperion's curls; the front of Jove himself;\nAn eye like Mars, to threaten and command;\nA station like the herald Mercury\nNew lighted on a heaven-kissing hill:\nA combination and a form indeed\nWhere every god did seem to set his seal\nTo give the world assurance of a man.\nThis was your husband. Look you now what follows.\nHere is your husband, like a mildew'd ear\nBlasting his wholesome brother. Have you eyes?\nCould you on this fair mountain leave to feed,\nAnd batten on this moor? Ha! have you eyes\nYou cannot call it love; for at your age\nThe heyday in the blood is tame, it's humble,\nAnd waits upon the judgment; and what judgment\nWould step from this to this? Sense sure you have,\nElse could you not have motion; but sure that sense\nIs apoplex'd; for madness would not err,\nNor sense to ecstacy was ne'er so thrall'd\nBut it reserv'd some quantity of choice\nTo serve in such a difference. What devil was't\nThat thus hath cozen'd you at hoodman-blind?\nEyes without feeling, feeling without sight,\nEars without hands or eyes, smelling sans all,\nOr but a sickly part of one true sense\nCould not so mope.\nO shame! where is thy blush? Rebellious hell,\nIf thou canst mutine in a matron's bones,\nTo flaming youth let virtue be as wax\nAnd melt in her own fire. Proclaim no shame\nWhen the compulsive ardour gives the charge,\nSince frost itself as actively doth burn,\nAnd reason panders will.\nQueen. O Hamlet, speak no more!\nThou turn'st mine eyes into my very soul,\nAnd there I see such black and grained spots\nAs will not leave their tinct.\nHam. Nay, but to live\nIn the rank sweat of an enseamed bed,\nStew'd in corruption, honeying and making love\nOver the nasty sty!\nQueen. O, speak to me no more!\nThese words like daggers enter in mine ears.\nNo more, sweet Hamlet!\nHam. A murtherer and a villain!\nA slave that is not twentieth part the tithe\nOf your precedent lord; a vice of kings;\nA cutpurse of the empire and the rule,\nThat from a shelf the precious diadem stole\nAnd put it in his pocket!\nQueen. No more!\nEnter the Ghost in his nightgown.\nHam. A king of shreds and patches!-\nSave me and hover o'er me with your wings,\nYou heavenly guards! What would your gracious figure?\nQueen. Alas, he's mad!\nHam. Do you not come your tardy son to chide,\nThat, laps'd in time and passion, lets go by\nTh' important acting of your dread command?\nO, say!\nGhost. Do not forget. This visitation\nIs but to whet thy almost blunted purpose.\nBut look, amazement on thy mother sits.\nO, step between her and her fighting soul\nConceit in weakest bodies strongest works.\nSpeak to her, Hamlet.\nHam. How is it with you, lady?\nQueen. Alas, how is't with you,\nThat you do bend your eye on vacancy,\nAnd with th' encorporal air do hold discourse?\nForth at your eyes your spirits wildly peep;\nAnd, as the sleeping soldiers in th' alarm,\nYour bedded hairs, like life in excrements,\nStart up and stand an end. O gentle son,\nUpon the beat and flame of thy distemper\nSprinkle cool patience! Whereon do you look?\nHam. On him, on him! Look you how pale he glares!\nHis form and cause conjoin'd, preaching to stones,\nWould make them capable.- Do not look upon me,\nLest with this piteous action you convert\nMy stern effects. Then what I have to do\nWill want true colour- tears perchance for blood.\nQueen. To whom do you speak this?\nHam. Do you see nothing there?\nQueen. Nothing at all; yet all that is I see.\nHam. Nor did you nothing hear?\nQueen. No, nothing but ourselves.\nHam. Why, look you there! Look how it steals away!\nMy father, in his habit as he liv'd!\nLook where he goes even now out at the portal!\nExit Ghost.\nQueen. This is the very coinage of your brain.\nThis bodiless creation ecstasy\nIs very cunning in.\nHam. Ecstasy?\nMy pulse as yours doth temperately keep time\nAnd makes as healthful music. It is not madness\nThat I have utt'red. Bring me to the test,\nAnd I the matter will reword; which madness\nWould gambol from. Mother, for love of grace,\nLay not that flattering unction to your soul\nThat not your trespass but my madness speaks.\nIt will but skin and film the ulcerous place,\nWhiles rank corruption, mining all within,\nInfects unseen. Confess yourself to heaven;\nRepent what's past; avoid what is to come;\nAnd do not spread the compost on the weeds\nTo make them ranker. Forgive me this my virtue;\nFor in the fatness of these pursy times\nVirtue itself of vice must pardon beg-\nYea, curb and woo for leave to do him good.\nQueen. O Hamlet, thou hast cleft my heart in twain.\nHam. O, throw away the worser part of it,\nAnd live the purer with the other half,\nGood night- but go not to my uncle's bed.\nAssume a virtue, if you have it not.\nThat monster, custom, who all sense doth eat\nOf habits evil, is angel yet in this,\nThat to the use of actions fair and good\nHe likewise gives a frock or livery,\nThat aptly is put on. Refrain to-night,\nAnd that shall lend a kind of easiness\nTo the next abstinence; the next more easy;\nFor use almost can change the stamp of nature,\nAnd either [master] the devil, or throw him out\nWith wondrous potency. Once more, good night;\nAnd when you are desirous to be blest,\nI'll blessing beg of you.- For this same lord,\nI do repent; but heaven hath pleas'd it so,\nTo punish me with this, and this with me,\nThat I must be their scourge and minister.\nI will bestow him, and will answer well\nThe death I gave him. So again, good night.\nI must be cruel, only to be kind;\nThus bad begins, and worse remains behind.\nOne word more, good lady.\nQueen. What shall I do?\nHam. Not this, by no means, that I bid you do:\nLet the bloat King tempt you again to bed;\nPinch wanton on your cheek; call you his mouse;\nAnd let him, for a pair of reechy kisses,\nOr paddling in your neck with his damn'd fingers,\nMake you to ravel all this matter out,\nThat I essentially am not in madness,\nBut mad in craft. 'Twere good you let him know;\nFor who that's but a queen, fair, sober, wise,\nWould from a paddock, from a bat, a gib\nSuch dear concernings hide? Who would do so?\nNo, in despite of sense and secrecy,\nUnpeg the basket on the house's top,\nLet the birds fly, and like the famous ape,\nTo try conclusions, in the basket creep\nAnd break your own neck down.\nQueen. Be thou assur'd, if words be made of breath,\nAnd breath of life, I have no life to breathe\nWhat thou hast said to me.\nHam. I must to England; you know that?\nQueen. Alack,\nI had forgot! 'Tis so concluded on.\nHam. There's letters seal'd; and my two schoolfellows,\nWhom I will trust as I will adders fang'd,\nThey bear the mandate; they must sweep my way\nAnd marshal me to knavery. Let it work;\nFor 'tis the sport to have the enginer\nHoist with his own petar; and 't shall go hard\nBut I will delve one yard below their mines\nAnd blow them at the moon. O, 'tis most sweet\nWhen in one line two crafts directly meet.\nThis man shall set me packing.\nI'll lug the guts into the neighbour room.-\nMother, good night.- Indeed, this counsellor\nIs now most still, most secret, and most grave,\nWho was in life a foolish peating knave.\nCome, sir, to draw toward an end with you.\nGood night, mother.\n[Exit the Queen. Then] Exit Hamlet, tugging in\nPolonius.\n\n\nACT IV. Scene I.\nElsinore. A room in the Castle.\nEnter King and Queen, with Rosencrantz and Guildenstern.\nKing. There's matter in these sighs. These profound heaves\nYou must translate; 'tis fit we understand them.\nWhere is your son?\nQueen. Bestow this place on us a little while.\n[Exeunt Rosencrantz and Guildenstern.]\nAh, mine own lord, what have I seen to-night!\nKing. What, Gertrude? How does Hamlet?\nQueen. Mad as the sea and wind when both contend\nWhich is the mightier. In his lawless fit\nBehind the arras hearing something stir,\nWhips out his rapier, cries 'A rat, a rat!'\nAnd in this brainish apprehension kills\nThe unseen good old man.\nKing. O heavy deed!\nIt had been so with us, had we been there.\nHis liberty is full of threats to all-\nTo you yourself, to us, to every one.\nAlas, how shall this bloody deed be answer'd?\nIt will be laid to us, whose providence\nShould have kept short, restrain'd, and out of haunt\nThis mad young man. But so much was our love\nWe would not understand what was most fit,\nBut, like the owner of a foul disease,\nTo keep it from divulging, let it feed\nEven on the pith of life. Where is he gone?\nQueen. To draw apart the body he hath kill'd;\nO'er whom his very madness, like some ore\nAmong a mineral of metals base,\nShows itself pure. He weeps for what is done.\nKing. O Gertrude, come away!\nThe sun no sooner shall the mountains touch\nBut we will ship him hence; and this vile deed\nWe must with all our majesty and skill\nBoth countenance and excuse. Ho, Guildenstern!\nEnter Rosencrantz and Guildenstern.\n\nFriends both, go join you with some further aid.\nHamlet in madness hath Polonius slain,\nAnd from his mother's closet hath he dragg'd him.\nGo seek him out; speak fair, and bring the body\nInto the chapel. I pray you haste in this.\nExeunt [Rosencrantz and Guildenstern].\nCome, Gertrude, we'll call up our wisest friends\nAnd let them know both what we mean to do\nAnd what's untimely done. [So haply slander-]\nWhose whisper o'er the world's diameter,\nAs level as the cannon to his blank,\nTransports his poisoned shot- may miss our name\nAnd hit the woundless air.- O, come away!\nMy soul is full of discord and dismay.\nExeunt.\n\nScene II.\nElsinore. A passage in the Castle.\nEnter Hamlet.\nHam. Safely stow'd.\nGentlemen. (within) Hamlet! Lord Hamlet!\nHam. But soft! What noise? Who calls on Hamlet? O, here they come.\nEnter Rosencrantz and Guildenstern.\nRos. What have you done, my lord, with the dead body?\nHam. Compounded it with dust, whereto 'tis kin.\nRos. Tell us where 'tis, that we may take it thence\nAnd bear it to the chapel.\nHam. Do not believe it.\nRos. Believe what?\nHam. That I can keep your counsel, and not mine own. Besides, to be\ndemanded of a sponge, what replication should be made by the son\nof a king?\nRos. Take you me for a sponge, my lord?\nHam. Ay, sir; that soaks up the King's countenance, his rewards,\nhis authorities. But such officers do the King best service in\nthe end. He keeps them, like an ape, in the corner of his jaw;\nfirst mouth'd, to be last Swallowed. When he needs what you have\nglean'd, it is but squeezing you and, sponge, you shall be dry\nagain.\nRos. I understand you not, my lord.\nHam. I am glad of it. A knavish speech sleeps in a foolish ear.\nRos. My lord, you must tell us where the body is and go with us to\nthe King.\nHam. The body is with the King, but the King is not with the body.\nThe King is a thing-\nGuil. A thing, my lord?\nHam. Of nothing. Bring me to him. Hide fox, and all after.\nExeunt.\n\nScene III.\nElsinore. A room in the Castle.\nEnter King.\nKing. I have sent to seek him and to find the body.\nHow dangerous is it that this man goes loose!\nYet must not we put the strong law on him.\nHe's lov'd of the distracted multitude,\nWho like not in their judgment, but their eyes;\nAnd where 'tis so, th' offender's scourge is weigh'd,\nBut never the offence. To bear all smooth and even,\nThis sudden sending him away must seem\nDeliberate pause. Diseases desperate grown\nBy desperate appliance are reliev'd,\nOr not at all.\nEnter Rosencrantz.\nHow now O What hath befall'n?\nRos. Where the dead body is bestow'd, my lord,\nWe cannot get from him.\nKing. But where is he?\nRos. Without, my lord; guarded, to know your pleasure.\nKing. Bring him before us.\nRos. Ho, Guildenstern! Bring in my lord.\nEnter Hamlet and Guildenstern [with Attendants].\nKing. Now, Hamlet, where's Polonius?\nHam. At supper.\nKing. At supper? Where?\nHam. Not where he eats, but where he is eaten. A certain\nconvocation of politic worms are e'en at him. Your worm is your\nonly emperor for diet. We fat all creatures else to fat us, and\nwe fat ourselves for maggots. Your fat king and your lean beggar\nis but variable service- two dishes, but to one table. That's the\nend.\nKing. Alas, alas!\nHam. A man may fish with the worm that hath eat of a king, and eat\nof the fish that hath fed of that worm.\nKing. What dost thou mean by this?\nHam. Nothing but to show you how a king may go a progress through\nthe guts of a beggar.\nKing. Where is Polonius?\nHam. In heaven. Send thither to see. If your messenger find him not\nthere, seek him i' th' other place yourself. But indeed, if you\nfind him not within this month, you shall nose him as you go up\nthe stair, into the lobby.\nKing. Go seek him there. [To Attendants.]\nHam. He will stay till you come.\n[Exeunt Attendants.]\nKing. Hamlet, this deed, for thine especial safety,-\nWhich we do tender as we dearly grieve\nFor that which thou hast done,- must send thee hence\nWith fiery quickness. Therefore prepare thyself.\nThe bark is ready and the wind at help,\nTh' associates tend, and everything is bent\nFor England.\nHam. For England?\nKing. Ay, Hamlet.\nHam. Good.\nKing. So is it, if thou knew'st our purposes.\nHam. I see a cherub that sees them. But come, for England!\nFarewell, dear mother.\nKing. Thy loving father, Hamlet.\nHam. My mother! Father and mother is man and wife; man and wife is\none flesh; and so, my mother. Come, for England!\nExit.\nKing. Follow him at foot; tempt him with speed aboard.\nDelay it not; I'll have him hence to-night.\nAway! for everything is seal'd and done\nThat else leans on th' affair. Pray you make haste.\nExeunt Rosencrantz and Guildenstern]\nAnd, England, if my love thou hold'st at aught,-\nAs my great power thereof may give thee sense,\nSince yet thy cicatrice looks raw and red\nAfter the Danish sword, and thy free awe\nPays homage to us,- thou mayst not coldly set\nOur sovereign process, which imports at full,\nBy letters congruing to that effect,\nThe present death of Hamlet. Do it, England;\nFor like the hectic in my blood he rages,\nAnd thou must cure me. Till I know 'tis done,\nHowe'er my haps, my joys were ne'er begun. Exit.\n\n\nScene IV.\nNear Elsinore.\nEnter Fortinbras with his Army over the stage.\nFor. Go, Captain, from me greet the Danish king.\nTell him that by his license Fortinbras\nCraves the conveyance of a promis'd march\nOver his kingdom. You know the rendezvous.\nif that his Majesty would aught with us,\nWe shall express our duty in his eye;\nAnd let him know so.\nCapt. I will do't, my lord.\nFor. Go softly on.\nExeunt [all but the Captain].\nEnter Hamlet, Rosencrantz, [Guildenstern,] and others.\nHam. Good sir, whose powers are these?\nCapt. They are of Norway, sir.\nHam. How purpos'd, sir, I pray you?\nCapt. Against some part of Poland.\nHam. Who commands them, sir?\nCapt. The nephew to old Norway, Fortinbras.\nHam. Goes it against the main of Poland, sir,\nOr for some frontier?\nCapt. Truly to speak, and with no addition,\nWe go to gain a little patch of ground\nThat hath in it no profit but the name.\nTo pay five ducats, five, I would not farm it;\nNor will it yield to Norway or the Pole\nA ranker rate, should it be sold in fee.\nHam. Why, then the Polack never will defend it.\nCapt. Yes, it is already garrison'd.\nHam. Two thousand souls and twenty thousand ducats\nWill not debate the question of this straw.\nThis is th' imposthume of much wealth and peace,\nThat inward breaks, and shows no cause without\nWhy the man dies.- I humbly thank you, sir.\nCapt. God b' wi' you, sir. [Exit.]\nRos. Will't please you go, my lord?\nHam. I'll be with you straight. Go a little before.\n[Exeunt all but Hamlet.]\nHow all occasions do inform against me\nAnd spur my dull revenge! What is a man,\nIf his chief good and market of his time\nBe but to sleep and feed? A beast, no more.\nSure he that made us with such large discourse,\nLooking before and after, gave us not\nThat capability and godlike reason\nTo fust in us unus'd. Now, whether it be\nBestial oblivion, or some craven scruple\nOf thinking too precisely on th' event,-\nA thought which, quarter'd, hath but one part wisdom\nAnd ever three parts coward,- I do not know\nWhy yet I live to say 'This thing's to do,'\nSith I have cause, and will, and strength, and means\nTo do't. Examples gross as earth exhort me.\nWitness this army of such mass and charge,\nLed by a delicate and tender prince,\nWhose spirit, with divine ambition puff'd,\nMakes mouths at the invisible event,\nExposing what is mortal and unsure\nTo all that fortune, death, and danger dare,\nEven for an eggshell. Rightly to be great\nIs not to stir without great argument,\nBut greatly to find quarrel in a straw\nWhen honour's at the stake. How stand I then,\nThat have a father klll'd, a mother stain'd,\nExcitements of my reason and my blood,\nAnd let all sleep, while to my shame I see\nThe imminent death of twenty thousand men\nThat for a fantasy and trick of fame\nGo to their graves like beds, fight for a plot\nWhereon the numbers cannot try the cause,\nWhich is not tomb enough and continent\nTo hide the slain? O, from this time forth,\nMy thoughts be bloody, or be nothing worth! Exit.\n\n\nScene V.\nElsinore. A room in the Castle.\nEnter Horatio, Queen, and a Gentleman.\nQueen. I will not speak with her.\nGent. She is importunate, indeed distract.\nHer mood will needs be pitied.\nQueen. What would she have?\nGent. She speaks much of her father; says she hears\nThere's tricks i' th' world, and hems, and beats her heart;\nSpurns enviously at straws; speaks things in doubt,\nThat carry but half sense. Her speech is nothing,\nYet the unshaped use of it doth move\nThe hearers to collection; they aim at it,\nAnd botch the words up fit to their own thoughts;\nWhich, as her winks and nods and gestures yield them,\nIndeed would make one think there might be thought,\nThough nothing sure, yet much unhappily.\nHor. 'Twere good she were spoken with; for she may strew\nDangerous conjectures in ill-breeding minds.\nQueen. Let her come in.\n[Exit Gentleman.]\n[Aside] To my sick soul (as sin's true nature is)\nEach toy seems Prologue to some great amiss.\nSo full of artless jealousy is guilt\nIt spills itself in fearing to be spilt.\nEnter Ophelia distracted.\nOph. Where is the beauteous Majesty of Denmark?\nQueen. How now, Ophelia?\nOph. (sings)\nHow should I your true-love know\nFrom another one?\nBy his cockle bat and' staff\nAnd his sandal shoon.\nQueen. Alas, sweet lady, what imports this song?\nOph. Say you? Nay, pray You mark.\n(Sings) He is dead and gone, lady,\nHe is dead and gone;\nAt his head a grass-green turf,\nAt his heels a stone.\nO, ho!\nQueen. Nay, but Ophelia-\nOph. Pray you mark.\n(Sings) White his shroud as the mountain snow-\nEnter King.\nQueen. Alas, look here, my lord!\nOph. (Sings)\nLarded all with sweet flowers;\nWhich bewept to the grave did not go\nWith true-love showers.\nKing. How do you, pretty lady?\nOph. Well, God dild you! They say the owl was a baker's daughter.\nLord, we know what we are, but know not what we may be. God be at\nyour table!\nKing. Conceit upon her father.\nOph. Pray let's have no words of this; but when they ask, you what\nit means, say you this:\n(Sings) To-morrow is Saint Valentine's day,\nAll in the morning bedtime,\nAnd I a maid at your window,\nTo be your Valentine.\nThen up he rose and donn'd his clo'es\nAnd dupp'd the chamber door,\nLet in the maid, that out a maid\nNever departed more.\nKing. Pretty Ophelia!\nOph. Indeed, la, without an oath, I'll make an end on't!\n[Sings] By Gis and by Saint Charity,\nAlack, and fie for shame!\nYoung men will do't if they come to't\nBy Cock, they are to blame.\nQuoth she, 'Before you tumbled me,\nYou promis'd me to wed.'\nHe answers:\n'So would I 'a' done, by yonder sun,\nAn thou hadst not come to my bed.'\nKing. How long hath she been thus?\nOph. I hope all will be well. We must be patient; but I cannot\nchoose but weep to think they would lay him i' th' cold ground.\nMy brother shall know of it; and so I thank you for your good\ncounsel. Come, my coach! Good night, ladies. Good night, sweet\nladies. Good night, good night. Exit\nKing. Follow her close; give her good watch, I pray you.\n[Exit Horatio.]\nO, this is the poison of deep grief; it springs\nAll from her father's death. O Gertrude, Gertrude,\nWhen sorrows come, they come not single spies.\nBut in battalions! First, her father slain;\nNext, Your son gone, and he most violent author\nOf his own just remove; the people muddied,\nThick and and unwholesome in their thoughts and whispers\nFor good Polonius' death, and we have done but greenly\nIn hugger-mugger to inter him; Poor Ophelia\nDivided from herself and her fair-judgment,\nWithout the which we are Pictures or mere beasts;\nLast, and as such containing as all these,\nHer brother is in secret come from France;\nAnd wants not buzzers to infect his ear\nFeeds on his wonder, keep, himself in clouds,\nWith pestilent speeches of his father's death,\nWherein necessity, of matter beggar'd,\nWill nothing stick Our person to arraign\nIn ear and ear. O my dear Gertrude, this,\nLike to a murd'ring piece, in many places\nGive, me superfluous death. A noise within.\nQueen. Alack, what noise is this?\nKing. Where are my Switzers? Let them guard the door.\nEnter a Messenger.\nWhat is the matter?\nMess. Save Yourself, my lord:\nThe ocean, overpeering of his list,\nEats not the flats with more impetuous haste\nThan Young Laertes, in a riotous head,\nO'erbears Your offices. The rabble call him lord;\nAnd, as the world were now but to begin,\nAntiquity forgot, custom not known,\nThe ratifiers and props of every word,\nThey cry 'Choose we! Laertes shall be king!'\nCaps, hands, and tongues applaud it to the clouds,\n'Laertes shall be king! Laertes king!'\nA noise within.\nQueen. How cheerfully on the false trail they cry!\nO, this is counter, you false Danish dogs!\nKing. The doors are broke.\nEnter Laertes with others.\nLaer. Where is this king?- Sirs, staid you all without.\nAll. No, let's come in!\nLaer. I pray you give me leave.\nAll. We will, we will!\nLaer. I thank you. Keep the door. [Exeunt his Followers.]\nO thou vile king,\nGive me my father!\nQueen. Calmly, good Laertes.\nLaer. That drop of blood that's calm proclaims me bastard;\nCries cuckold to my father; brands the harlot\nEven here between the chaste unsmirched brows\nOf my true mother.\nKing. What is the cause, Laertes,\nThat thy rebellion looks so giantlike?\nLet him go, Gertrude. Do not fear our person.\nThere's such divinity doth hedge a king\nThat treason can but peep to what it would,\nActs little of his will. Tell me, Laertes,\nWhy thou art thus incens'd. Let him go, Gertrude.\nSpeak, man.\nLaer. Where is my father?\nKing. Dead.\nQueen. But not by him!\nKing. Let him demand his fill.\nLaer. How came he dead? I'll not be juggled with:\nTo hell, allegiance! vows, to the blackest devil\nConscience and grace, to the profoundest pit!\nI dare damnation. To this point I stand,\nThat both the world, I give to negligence,\nLet come what comes; only I'll be reveng'd\nMost throughly for my father.\nKing. Who shall stay you?\nLaer. My will, not all the world!\nAnd for my means, I'll husband them so well\nThey shall go far with little.\nKing. Good Laertes,\nIf you desire to know the certainty\nOf your dear father's death, is't writ in Your revenge\nThat swoopstake you will draw both friend and foe,\nWinner and loser?\nLaer. None but his enemies.\nKing. Will you know them then?\nLaer. To his good friends thus wide I'll ope my arms\nAnd, like the kind life-rend'ring pelican,\nRepast them with my blood.\nKing. Why, now You speak\nLike a good child and a true gentleman.\nThat I am guiltless of your father's death,\nAnd am most sensibly in grief for it,\nIt shall as level to your judgment pierce\nAs day does to your eye.\nA noise within: 'Let her come in.'\nLaer. How now? What noise is that?\nEnter Ophelia.\nO heat, dry up my brains! Tears seven times salt\nBurn out the sense and virtue of mine eye!\nBy heaven, thy madness shall be paid by weight\nTill our scale turn the beam. O rose of May!\nDear maid, kind sister, sweet Ophelia!\nO heavens! is't possible a young maid's wits\nShould be as mortal as an old man's life?\nNature is fine in love, and where 'tis fine,\nIt sends some precious instance of itself\nAfter the thing it loves.\nOph. (sings)\nThey bore him barefac'd on the bier\n(Hey non nony, nony, hey nony)\nAnd in his grave rain'd many a tear.\nFare you well, my dove!\nLaer. Hadst thou thy wits, and didst persuade revenge,\nIt could not move thus.\nOph. You must sing 'A-down a-down, and you call him a-down-a.' O,\nhow the wheel becomes it! It is the false steward, that stole his\nmaster's daughter.\nLaer. This nothing's more than matter.\nOph. There's rosemary, that's for remembrance. Pray you, love,\nremember. And there is pansies, that's for thoughts.\nLaer. A document in madness! Thoughts and remembrance fitted.\nOph. There's fennel for you, and columbines. There's rue for you,\nand here's some for me. We may call it herb of grace o' Sundays.\nO, you must wear your rue with a difference! There's a daisy. I\nwould give you some violets, but they wither'd all when my father\ndied. They say he made a good end.\n[Sings] For bonny sweet Robin is all my joy.\nLaer. Thought and affliction, passion, hell itself,\nShe turns to favour and to prettiness.\nOph. (sings)\nAnd will he not come again?\nAnd will he not come again?\nNo, no, he is dead;\nGo to thy deathbed;\nHe never will come again.\nHis beard was as white as snow,\nAll flaxen was his poll.\nHe is gone, he is gone,\nAnd we cast away moan.\nGod 'a'mercy on his soul!\nAnd of all Christian souls, I pray God. God b' wi', you.\nExit.\nLaer. Do you see this, O God?\nKing. Laertes, I must commune with your grief,\nOr you deny me right. Go but apart,\nMake choice of whom your wisest friends you will,\nAnd they shall hear and judge 'twixt you and me.\nIf by direct or by collateral hand\nThey find us touch'd, we will our kingdom give,\nOur crown, our life, and all that we call ours,\nTo you in satisfaction; but if not,\nBe you content to lend your patience to us,\nAnd we shall jointly labour with your soul\nTo give it due content.\nLaer. Let this be so.\nHis means of death, his obscure funeral-\nNo trophy, sword, nor hatchment o'er his bones,\nNo noble rite nor formal ostentation,-\nCry to be heard, as 'twere from heaven to earth,\nThat I must call't in question.\nKing. So you shall;\nAnd where th' offence is let the great axe fall.\nI pray you go with me.\nExeunt\n\n\nScene VI.\nElsinore. Another room in the Castle.\nEnter Horatio with an Attendant.\nHor. What are they that would speak with me?\nServant. Seafaring men, sir. They say they have letters for you.\nHor. Let them come in.\n[Exit Attendant.]\nI do not know from what part of the world\nI should be greeted, if not from Lord Hamlet.\nEnter Sailors.\nSailor. God bless you, sir.\nHor. Let him bless thee too.\nSailor. 'A shall, sir, an't please him. There's a letter for you,\nsir,- it comes from th' ambassador that was bound for England- if\nyour name be Horatio, as I am let to know it is.\nHor. (reads the letter) 'Horatio, when thou shalt have overlook'd\nthis, give these fellows some means to the King. They have\nletters for him. Ere we were two days old at sea, a pirate of\nvery warlike appointment gave us chase. Finding ourselves too\nslow of sail, we put on a compelled valour, and in the grapple I\nboarded them. On the instant they got clear of our ship; so I\nalone became their prisoner. They have dealt with me like thieves\nof mercy; but they knew what they did: I am to do a good turn for\nthem. Let the King have the letters I have sent, and repair thou\nto me with as much speed as thou wouldst fly death. I have words\nto speak in thine ear will make thee dumb; yet are they much too\nlight for the bore of the matter. These good fellows will bring\nthee where I am. Rosencrantz and Guildenstern hold their course\nfor England. Of them I have much to tell thee. Farewell.\n'He that thou knowest thine, HAMLET.'\nCome, I will give you way for these your letters,\nAnd do't the speedier that you may direct me\nTo him from whom you brought them. Exeunt.\n\n\nScene VII.\nElsinore. Another room in the Castle.\nEnter King and Laertes.\nKing. Now must your conscience my acquittance seal,\nAnd You must put me in your heart for friend,\nSith you have heard, and with a knowing ear,\nThat he which hath your noble father slain\nPursued my life.\nLaer. It well appears. But tell me\nWhy you proceeded not against these feats\nSo crimeful and so capital in nature,\nAs by your safety, wisdom, all things else,\nYou mainly were stirr'd up.\nKing. O, for two special reasons,\nWhich may to you, perhaps, seein much unsinew'd,\nBut yet to me they are strong. The Queen his mother\nLives almost by his looks; and for myself,-\nMy virtue or my plague, be it either which,-\nShe's so conjunctive to my life and soul\nThat, as the star moves not but in his sphere,\nI could not but by her. The other motive\nWhy to a public count I might not go\nIs the great love the general gender bear him,\nWho, dipping all his faults in their affection,\nWould, like the spring that turneth wood to stone,\nConvert his gives to graces; so that my arrows,\nToo slightly timber'd for so loud a wind,\nWould have reverted to my bow again,\nAnd not where I had aim'd them.\nLaer. And so have I a noble father lost;\nA sister driven into desp'rate terms,\nWhose worth, if praises may go back again,\nStood challenger on mount of all the age\nFor her perfections. But my revenge will come.\nKing. Break not your sleeps for that. You must not think\nThat we are made of stuff so flat and dull\nThat we can let our beard be shook with danger,\nAnd think it pastime. You shortly shall hear more.\nI lov'd your father, and we love ourself,\nAnd that, I hope, will teach you to imagine-\nEnter a Messenger with letters.\nHow now? What news?\nMess. Letters, my lord, from Hamlet:\nThis to your Majesty; this to the Queen.\nKing. From Hamlet? Who brought them?\nMess. Sailors, my lord, they say; I saw them not.\nThey were given me by Claudio; he receiv'd them\nOf him that brought them.\nKing. Laertes, you shall hear them.\nLeave us.\nExit Messenger.\n[Reads]'High and Mighty,-You shall know I am set naked on your\nkingdom. To-morrow shall I beg leave to see your kingly eyes;\nwhen I shall (first asking your pardon thereunto) recount the\noccasion of my sudden and more strange return.\n'HAMLET.'\nWhat should this mean? Are all the rest come back?\nOr is it some abuse, and no such thing?\nLaer. Know you the hand?\nKing. 'Tis Hamlet's character. 'Naked!'\nAnd in a postscript here, he says 'alone.'\nCan you advise me?\nLaer. I am lost in it, my lord. But let him come!\nIt warms the very sickness in my heart\nThat I shall live and tell him to his teeth,\n'Thus didest thou.'\nKing. If it be so, Laertes\n(As how should it be so? how otherwise?),\nWill you be rul'd by me?\nLaer. Ay my lord,\nSo you will not o'errule me to a peace.\nKing. To thine own peace. If he be now return'd\nAs checking at his voyage, and that he means\nNo more to undertake it, I will work him\nTo exploit now ripe in my device,\nUnder the which he shall not choose but fall;\nAnd for his death no wind\nBut even his mother shall uncharge the practice\nAnd call it accident.\nLaer. My lord, I will be rul'd;\nThe rather, if you could devise it so\nThat I might be the organ.\nKing. It falls right.\nYou have been talk'd of since your travel much,\nAnd that in Hamlet's hearing, for a quality\nWherein they say you shine, Your sun of parts\nDid not together pluck such envy from him\nAs did that one; and that, in my regard,\nOf the unworthiest siege.\nLaer. What part is that, my lord?\nKing. A very riband in the cap of youth-\nYet needfull too; for youth no less becomes\nThe light and careless livery that it wears\nThin settled age his sables and his weeds,\nImporting health and graveness. Two months since\nHere was a gentleman of Normandy.\nI have seen myself, and serv'd against, the French,\nAnd they can well on horseback; but this gallant\nHad witchcraft in't. He grew unto his seat,\nAnd to such wondrous doing brought his horse\nAs had he been incorps'd and demi-natur'd\nWith the brave beast. So far he topp'd my thought\nThat I, in forgery of shapes and tricks,\nCome short of what he did.\nLaer. A Norman was't?\nKing. A Norman.\nLaer. Upon my life, Lamound.\nKing. The very same.\nLaer. I know him well. He is the broach indeed\nAnd gem of all the nation.\nKing. He made confession of you;\nAnd gave you such a masterly report\nFor art and exercise in your defence,\nAnd for your rapier most especially,\nThat he cried out 'twould be a sight indeed\nIf one could match you. The scrimers of their nation\nHe swore had neither motion, guard, nor eye,\nIf you oppos'd them. Sir, this report of his\nDid Hamlet so envenom with his envy\nThat he could nothing do but wish and beg\nYour sudden coming o'er to play with you.\nNow, out of this-\nLaer. What out of this, my lord?\nKing. Laertes, was your father dear to you?\nOr are you like the painting of a sorrow,\nA face without a heart,'\nLaer. Why ask you this?\nKing. Not that I think you did not love your father;\nBut that I know love is begun by time,\nAnd that I see, in passages of proof,\nTime qualifies the spark and fire of it.\nThere lives within the very flame of love\nA kind of wick or snuff that will abate it;\nAnd nothing is at a like goodness still;\nFor goodness, growing to a plurisy,\nDies in his own too-much. That we would do,\nWe should do when we would; for this 'would' changes,\nAnd hath abatements and delays as many\nAs there are tongues, are hands, are accidents;\nAnd then this 'should' is like a spendthrift sigh,\nThat hurts by easing. But to the quick o' th' ulcer!\nHamlet comes back. What would you undertake\nTo show yourself your father's son in deed\nMore than in words?\nLaer. To cut his throat i' th' church!\nKing. No place indeed should murther sanctuarize;\nRevenge should have no bounds. But, good Laertes,\nWill you do this? Keep close within your chamber.\nWill return'd shall know you are come home.\nWe'll put on those shall praise your excellence\nAnd set a double varnish on the fame\nThe Frenchman gave you; bring you in fine together\nAnd wager on your heads. He, being remiss,\nMost generous, and free from all contriving,\nWill not peruse the foils; so that with ease,\nOr with a little shuffling, you may choose\nA sword unbated, and, in a pass of practice,\nRequite him for your father.\nLaer. I will do't!\nAnd for that purpose I'll anoint my sword.\nI bought an unction of a mountebank,\nSo mortal that, but dip a knife in it,\nWhere it draws blood no cataplasm so rare,\nCollected from all simples that have virtue\nUnder the moon, can save the thing from death\nThis is but scratch'd withal. I'll touch my point\nWith this contagion, that, if I gall him slightly,\nIt may be death.\nKing. Let's further think of this,\nWeigh what convenience both of time and means\nMay fit us to our shape. If this should fall,\nAnd that our drift look through our bad performance.\n'Twere better not assay'd. Therefore this project\nShould have a back or second, that might hold\nIf this did blast in proof. Soft! let me see.\nWe'll make a solemn wager on your cunnings-\nI ha't!\nWhen in your motion you are hot and dry-\nAs make your bouts more violent to that end-\nAnd that he calls for drink, I'll have prepar'd him\nA chalice for the nonce; whereon but sipping,\nIf he by chance escape your venom'd stuck,\nOur purpose may hold there.- But stay, what noise,\nEnter Queen.\nHow now, sweet queen?\nQueen. One woe doth tread upon another's heel,\nSo fast they follow. Your sister's drown'd, Laertes.\nLaer. Drown'd! O, where?\nQueen. There is a willow grows aslant a brook,\nThat shows his hoar leaves in the glassy stream.\nThere with fantastic garlands did she come\nOf crowflowers, nettles, daisies, and long purples,\nThat liberal shepherds give a grosser name,\nBut our cold maids do dead men's fingers call them.\nThere on the pendant boughs her coronet weeds\nClamb'ring to hang, an envious sliver broke,\nWhen down her weedy trophies and herself\nFell in the weeping brook. Her clothes spread wide\nAnd, mermaid-like, awhile they bore her up;\nWhich time she chaunted snatches of old tunes,\nAs one incapable of her own distress,\nOr like a creature native and indued\nUnto that element; but long it could not be\nTill that her garments, heavy with their drink,\nPull'd the poor wretch from her melodious lay\nTo muddy death.\nLaer. Alas, then she is drown'd?\nQueen. Drown'd, drown'd.\nLaer. Too much of water hast thou, poor Ophelia,\nAnd therefore I forbid my tears; but yet\nIt is our trick; nature her custom holds,\nLet shame say what it will. When these are gone,\nThe woman will be out. Adieu, my lord.\nI have a speech of fire, that fain would blaze\nBut that this folly douts it. Exit.\nKing. Let's follow, Gertrude.\nHow much I had to do to calm his rage I\nNow fear I this will give it start again;\nTherefore let's follow.\nExeunt.\n\n\nACT V. Scene I.\nElsinore. A churchyard.\nEnter two Clowns, [with spades and pickaxes].\nClown. Is she to be buried in Christian burial when she wilfully\nseeks her own salvation?\nOther. I tell thee she is; therefore make her grave straight.\nThe crowner hath sate on her, and finds it Christian burial.\nClown. How can that be, unless she drown'd herself in her own\ndefence?\nOther. Why, 'tis found so.\nClown. It must be se offendendo; it cannot be else. For here lies\nthe point: if I drown myself wittingly, it argues an act; and an\nact hath three branches-it is to act, to do, and to perform;\nargal, she drown'd herself wittingly.\nOther. Nay, but hear you, Goodman Delver!\nClown. Give me leave. Here lies the water; good. Here stands the\nman; good. If the man go to this water and drown himself, it is,\nwill he nill he, he goes- mark you that. But if the water come to\nhim and drown him, he drowns not himself. Argal, he that is not\nguilty of his own death shortens not his own life.\nOther. But is this law?\nClown. Ay, marry, is't- crowner's quest law.\nOther. Will you ha' the truth an't? If this had not been a\ngentlewoman, she should have been buried out o' Christian burial.\nClown. Why, there thou say'st! And the more pity that great folk\nshould have count'nance in this world to drown or hang themselves\nmore than their even-Christen. Come, my spade! There is no\nancient gentlemen but gard'ners, ditchers, and grave-makers. They\nhold up Adam's profession.\nOther. Was he a gentleman?\nClown. 'A was the first that ever bore arms.\nOther. Why, he had none.\nClown. What, art a heathen? How dost thou understand the Scripture?\nThe Scripture says Adam digg'd. Could he dig without arms? I'll\nput another question to thee. If thou answerest me not to the\npurpose, confess thyself-\nOther. Go to!\nClown. What is he that builds stronger than either the mason, the\nshipwright, or the carpenter?\nOther. The gallows-maker; for that frame outlives a thousand\ntenants.\nClown. I like thy wit well, in good faith. The gallows does well.\nBut how does it well? It does well to those that do ill. Now,\nthou dost ill to say the gallows is built stronger than the\nchurch. Argal, the gallows may do well to thee. To't again, come!\nOther. Who builds stronger than a mason, a shipwright, or a\ncarpenter?\nClown. Ay, tell me that, and unyoke.\nOther. Marry, now I can tell!\nClown. To't.\nOther. Mass, I cannot tell.\nEnter Hamlet and Horatio afar off.\nClown. Cudgel thy brains no more about it, for your dull ass will\nnot mend his pace with beating; and when you are ask'd this\nquestion next, say 'a grave-maker.' The houses he makes lasts\ntill doomsday. Go, get thee to Yaughan; fetch me a stoup of\nliquor.\n[Exit Second Clown.]\n[Clown digs and] sings.\nIn youth when I did love, did love,\nMethought it was very sweet;\nTo contract- O- the time for- a- my behove,\nO, methought there- a- was nothing- a- meet.\nHam. Has this fellow no feeling of his business, that he sings at\ngrave-making?\nHor. Custom hath made it in him a Property of easiness.\nHam. 'Tis e'en so. The hand of little employment hath the daintier\nsense.\nClown. (sings)\nBut age with his stealing steps\nHath clawed me in his clutch,\nAnd hath shipped me intil the land,\nAs if I had never been such.\n[Throws up a skull.]\n\nHam. That skull had a tongue in it, and could sing once. How the\nknave jowls it to the ground,as if 'twere Cain's jawbone, that\ndid the first murther! This might be the pate of a Politician,\nwhich this ass now o'erreaches; one that would circumvent God,\nmight it not?\nHor. It might, my lord.\nHam. Or of a courtier, which could say 'Good morrow, sweet lord!\nHow dost thou, good lord?' This might be my Lord Such-a-one, that\nprais'd my Lord Such-a-one's horse when he meant to beg it- might\nit not?\nHor. Ay, my lord.\nHam. Why, e'en so! and now my Lady Worm's, chapless, and knock'd\nabout the mazzard with a sexton's spade. Here's fine revolution,\nand we had the trick to see't. Did these bones cost no more the\nbreeding but to play at loggets with 'em? Mine ache to think\non't.\nClown. (Sings)\nA pickaxe and a spade, a spade,\nFor and a shrouding sheet;\nO, a Pit of clay for to be made\nFor such a guest is meet.\nThrows up [another skull].\nHam. There's another. Why may not that be the skull of a lawyer?\nWhere be his quiddits now, his quillets, his cases, his tenures,\nand his tricks? Why does he suffer this rude knave now to knock\nhim about the sconce with a dirty shovel, and will not tell him\nof his action of battery? Hum! This fellow might be in's time a\ngreat buyer of land, with his statutes, his recognizances, his\nfines, his double vouchers, his recoveries. Is this the fine of\nhis fines, and the recovery of his recoveries, to have his fine\npate full of fine dirt? Will his vouchers vouch him no more of\nhis purchases, and double ones too, than the length and breadth\nof a pair of indentures? The very conveyances of his lands will\nscarcely lie in this box; and must th' inheritor himself have no\nmore, ha?\nHor. Not a jot more, my lord.\nHam. Is not parchment made of sheepskins?\nHor. Ay, my lord, And of calveskins too.\nHam. They are sheep and calves which seek out assurance in that. I\nwill speak to this fellow. Whose grave's this, sirrah?\nClown. Mine, sir.\n[Sings] O, a pit of clay for to be made\nFor such a guest is meet.\nHam. I think it be thine indeed, for thou liest in't.\nClown. You lie out on't, sir, and therefore 'tis not yours.\nFor my part, I do not lie in't, yet it is mine.\nHam. Thou dost lie in't, to be in't and say it is thine. 'Tis for\nthe dead, not for the quick; therefore thou liest.\nClown. 'Tis a quick lie, sir; 'twill away again from me to you.\nHam. What man dost thou dig it for?\nClown. For no man, sir.\nHam. What woman then?\nClown. For none neither.\nHam. Who is to be buried in't?\nClown. One that was a woman, sir; but, rest her soul, she's dead.\nHam. How absolute the knave is! We must speak by the card, or\nequivocation will undo us. By the Lord, Horatio, this three years\nI have taken note of it, the age is grown so picked that the toe\nof the peasant comes so near the heel of the courtier he galls\nhis kibe.- How long hast thou been a grave-maker?\nClown. Of all the days i' th' year, I came to't that day that our\nlast king Hamlet overcame Fortinbras.\nHam. How long is that since?\nClown. Cannot you tell that? Every fool can tell that. It was the\nvery day that young Hamlet was born- he that is mad, and sent\ninto England.\nHam. Ay, marry, why was be sent into England?\nClown. Why, because 'a was mad. 'A shall recover his wits there;\nor, if 'a do not, 'tis no great matter there.\nHam. Why?\nClown. 'Twill not he seen in him there. There the men are as mad as\nhe.\nHam. How came he mad?\nClown. Very strangely, they say.\nHam. How strangely?\nClown. Faith, e'en with losing his wits.\nHam. Upon what ground?\nClown. Why, here in Denmark. I have been sexton here, man and boy\nthirty years.\nHam. How long will a man lie i' th' earth ere he rot?\nClown. Faith, if 'a be not rotten before 'a die (as we have many\npocky corses now-a-days that will scarce hold the laying in, I\nwill last you some eight year or nine year. A tanner will last\nyou nine year.\nHam. Why he more than another?\nClown. Why, sir, his hide is so tann'd with his trade that 'a will\nkeep out water a great while; and your water is a sore decayer of\nyour whoreson dead body. Here's a skull now. This skull hath lien\nyou i' th' earth three-and-twenty years.\nHam. Whose was it?\nClown. A whoreson, mad fellow's it was. Whose do you think it was?\nHam. Nay, I know not.\nClown. A pestilence on him for a mad rogue! 'A pour'd a flagon of\nRhenish on my head once. This same skull, sir, was Yorick's\nskull, the King's jester.\nHam. This?\nClown. E'en that.\nHam. Let me see. [Takes the skull.] Alas, poor Yorick! I knew him,\nHoratio. A fellow of infinite jest, of most excellent fancy. He\nhath borne me on his back a thousand tunes. And now how abhorred\nin my imagination it is! My gorge rises at it. Here hung those\nlips that I have kiss'd I know not how oft. Where be your gibes\nnow? your gambols? your songs? your flashes of merriment that\nwere wont to set the table on a roar? Not one now, to mock your\nown grinning? Quite chap- fall'n? Now get you to my lady's\nchamber, and tell her, let her paint an inch thick, to this\nfavour she must come. Make her laugh at that. Prithee, Horatio,\ntell me one thing.\nHor. What's that, my lord?\nHam. Dost thou think Alexander look'd o' this fashion i' th' earth?\nHor. E'en so.\nHam. And smelt so? Pah!\n[Puts down the skull.]\nHor. E'en so, my lord.\nHam. To what base uses we may return, Horatio! Why may not\nimagination trace the noble dust of Alexander till he find it\nstopping a bunghole?\nHor. 'Twere to consider too curiously, to consider so.\nHam. No, faith, not a jot; but to follow him thither with modesty\nenough, and likelihood to lead it; as thus: Alexander died,\nAlexander was buried, Alexander returneth into dust; the dust is\nearth; of earth we make loam; and why of that loam (whereto he\nwas converted) might they not stop a beer barrel?\nImperious Caesar, dead and turn'd to clay,\nMight stop a hole to keep the wind away.\nO, that that earth which kept the world in awe\nShould patch a wall t' expel the winter's flaw!\nBut soft! but soft! aside! Here comes the King-\nEnter [priests with] a coffin [in funeral procession], King,\nQueen, Laertes, with Lords attendant.]\nThe Queen, the courtiers. Who is this they follow?\nAnd with such maimed rites? This doth betoken\nThe corse they follow did with desp'rate hand\nFordo it own life. 'Twas of some estate.\nCouch we awhile, and mark.\n[Retires with Horatio.]\nLaer. What ceremony else?\nHam. That is Laertes,\nA very noble youth. Mark.\nLaer. What ceremony else?\nPriest. Her obsequies have been as far enlarg'd\nAs we have warranty. Her death was doubtful;\nAnd, but that great command o'ersways the order,\nShe should in ground unsanctified have lodg'd\nTill the last trumpet. For charitable prayers,\nShards, flints, and pebbles should be thrown on her.\nYet here she is allow'd her virgin crants,\nHer maiden strewments, and the bringing home\nOf bell and burial.\nLaer. Must there no more be done?\nPriest. No more be done.\nWe should profane the service of the dead\nTo sing a requiem and such rest to her\nAs to peace-parted souls.\nLaer. Lay her i' th' earth;\nAnd from her fair and unpolluted flesh\nMay violets spring! I tell thee, churlish priest,\nA minist'ring angel shall my sister be\nWhen thou liest howling.\nHam. What, the fair Ophelia?\nQueen. Sweets to the sweet! Farewell.\n[Scatters flowers.]\nI hop'd thou shouldst have been my Hamlet's wife;\nI thought thy bride-bed to have deck'd, sweet maid,\nAnd not have strew'd thy grave.\nLaer. O, treble woe\nFall ten times treble on that cursed head\nWhose wicked deed thy most ingenious sense\nDepriv'd thee of! Hold off the earth awhile,\nTill I have caught her once more in mine arms.\nLeaps in the grave.\nNow pile your dust upon the quick and dead\nTill of this flat a mountain you have made\nT' o'ertop old Pelion or the skyish head\nOf blue Olympus.\nHam. [comes forward] What is he whose grief\nBears such an emphasis? whose phrase of sorrow\nConjures the wand'ring stars, and makes them stand\nLike wonder-wounded hearers? This is I,\nHamlet the Dane. [Leaps in after Laertes.\nLaer. The devil take thy soul!\n[Grapples with him].\nHam. Thou pray'st not well.\nI prithee take thy fingers from my throat;\nFor, though I am not splenitive and rash,\nYet have I in me something dangerous,\nWhich let thy wisdom fear. Hold off thy hand!\nKing. Pluck thein asunder.\nQueen. Hamlet, Hamlet!\nAll. Gentlemen!\nHor. Good my lord, be quiet.\n[The Attendants part them, and they come out of the\ngrave.]\nHam. Why, I will fight with him upon this theme\nUntil my eyelids will no longer wag.\nQueen. O my son, what theme?\nHam. I lov'd Ophelia. Forty thousand brothers\nCould not (with all their quantity of love)\nMake up my sum. What wilt thou do for her?\nKing. O, he is mad, Laertes.\nQueen. For love of God, forbear him!\nHam. 'Swounds, show me what thou't do.\nWoo't weep? woo't fight? woo't fast? woo't tear thyself?\nWoo't drink up esill? eat a crocodile?\nI'll do't. Dost thou come here to whine?\nTo outface me with leaping in her grave?\nBe buried quick with her, and so will I.\nAnd if thou prate of mountains, let them throw\nMillions of acres on us, till our ground,\nSingeing his pate against the burning zone,\nMake Ossa like a wart! Nay, an thou'lt mouth,\nI'll rant as well as thou.\nQueen. This is mere madness;\nAnd thus a while the fit will work on him.\nAnon, as patient as the female dove\nWhen that her golden couplets are disclos'd,\nHis silence will sit drooping.\nHam. Hear you, sir!\nWhat is the reason that you use me thus?\nI lov'd you ever. But it is no matter.\nLet Hercules himself do what he may,\nThe cat will mew, and dog will have his day.\nExit.\nKing. I pray thee, good Horatio, wait upon him.\nExit Horatio.\n[To Laertes] Strengthen your patience in our last night's speech.\nWe'll put the matter to the present push.-\nGood Gertrude, set some watch over your son.-\nThis grave shall have a living monument.\nAn hour of quiet shortly shall we see;\nTill then in patience our proceeding be.\nExeunt.\n\nScene II.\nElsinore. A hall in the Castle.\nEnter Hamlet and Horatio.\nHam. So much for this, sir; now shall you see the other.\nYou do remember all the circumstance?\nHor. Remember it, my lord!\nHam. Sir, in my heart there was a kind of fighting\nThat would not let me sleep. Methought I lay\nWorse than the mutinies in the bilboes. Rashly-\nAnd prais'd be rashness for it; let us know,\nOur indiscretion sometime serves us well\nWhen our deep plots do pall; and that should learn us\nThere's a divinity that shapes our ends,\nRough-hew them how we will-\nHor. That is most certain.\nHam. Up from my cabin,\nMy sea-gown scarf'd about me, in the dark\nGrop'd I to find out them; had my desire,\nFinger'd their packet, and in fine withdrew\nTo mine own room again; making so bold\n(My fears forgetting manners) to unseal\nTheir grand commission; where I found, Horatio\n(O royal knavery!), an exact command,\nLarded with many several sorts of reasons,\nImporting Denmark's health, and England's too,\nWith, hoo! such bugs and goblins in my life-\nThat, on the supervise, no leisure bated,\nNo, not to stay the finding of the axe,\nMy head should be struck off.\nHor. Is't possible?\nHam. Here's the commission; read it at more leisure.\nBut wilt thou bear me how I did proceed?\nHor. I beseech you.\nHam. Being thus benetted round with villanies,\nOr I could make a prologue to my brains,\nThey had begun the play. I sat me down;\nDevis'd a new commission; wrote it fair.\nI once did hold it, as our statists do,\nA baseness to write fair, and labour'd much\nHow to forget that learning; but, sir, now\nIt did me yeoman's service. Wilt thou know\nTh' effect of what I wrote?\nHor. Ay, good my lord.\nHam. An earnest conjuration from the King,\nAs England was his faithful tributary,\nAs love between them like the palm might flourish,\nAs peace should still her wheaten garland wear\nAnd stand a comma 'tween their amities,\nAnd many such-like as's of great charge,\nThat, on the view and knowing of these contents,\nWithout debatement further, more or less,\nHe should the bearers put to sudden death,\nNot shriving time allow'd.\nHor. How was this seal'd?\nHam. Why, even in that was heaven ordinant.\nI had my father's signet in my purse,\nwhich was the model of that Danish seal;\nFolded the writ up in the form of th' other,\nSubscrib'd it, gave't th' impression, plac'd it safely,\nThe changeling never known. Now, the next day\nWas our sea-fight; and what to this was sequent\nThou know'st already.\nHor. So Guildenstern and Rosencrantz go to't.\nHam. Why, man, they did make love to this employment!\nThey are not near my conscience; their defeat\nDoes by their own insinuation grow.\n'Tis dangerous when the baser nature comes\nBetween the pass and fell incensed points\nOf mighty opposites.\nHor. Why, what a king is this!\nHam. Does it not, thinks't thee, stand me now upon-\nHe that hath kill'd my king, and whor'd my mother;\nPopp'd in between th' election and my hopes;\nThrown out his angle for my Proper life,\nAnd with such coz'nage- is't not perfect conscience\nTo quit him with this arm? And is't not to be damn'd\nTo let this canker of our nature come\nIn further evil?\nHor. It must be shortly known to him from England\nWhat is the issue of the business there.\nHam. It will be short; the interim is mine,\nAnd a man's life is no more than to say 'one.'\nBut I am very sorry, good Horatio,\nThat to Laertes I forgot myself,\nFor by the image of my cause I see\nThe portraiture of his. I'll court his favours.\nBut sure the bravery of his grief did put me\nInto a tow'ring passion.\nHor. Peace! Who comes here?\nEnter young Osric, a courtier.\nOsr. Your lordship is right welcome back to Denmark.\nHam. I humbly thank you, sir. [Aside to Horatio] Dost know this\nwaterfly?\nHor. [aside to Hamlet] No, my good lord.\nHam. [aside to Horatio] Thy state is the more gracious; for 'tis a\nvice to know him. He hath much land, and fertile. Let a beast be\nlord of beasts, and his crib shall stand at the king's mess. 'Tis\na chough; but, as I say, spacious in the possession of dirt.\nOsr. Sweet lord, if your lordship were at leisure, I should impart\na thing to you from his Majesty.\nHam. I will receive it, sir, with all diligence of spirit. Put your\nbonnet to his right use. 'Tis for the head.\nOsr. I thank your lordship, it is very hot.\nHam. No, believe me, 'tis very cold; the wind is northerly.\nOsr. It is indifferent cold, my lord, indeed.\nHam. But yet methinks it is very sultry and hot for my complexion.\nOsr. Exceedingly, my lord; it is very sultry, as 'twere- I cannot\ntell how. But, my lord, his Majesty bade me signify to you that\nhe has laid a great wager on your head. Sir, this is the matter-\nHam. I beseech you remember.\n[Hamlet moves him to put on his hat.]\nOsr. Nay, good my lord; for mine ease, in good faith. Sir, here is\nnewly come to court Laertes; believe me, an absolute gentleman,\nfull of most excellent differences, of very soft society and\ngreat showing. Indeed, to speak feelingly of him, he is the card\nor calendar of gentry; for you shall find in him the continent of\nwhat part a gentleman would see.\nHam. Sir, his definement suffers no perdition in you; though, I\nknow, to divide him inventorially would dozy th' arithmetic of\nmemory, and yet but yaw neither in respect of his quick sail.\nBut, in the verity of extolment, I take him to be a soul of great\narticle, and his infusion of such dearth and rareness as, to make\ntrue diction of him, his semblable is his mirror, and who else\nwould trace him, his umbrage, nothing more.\nOsr. Your lordship speaks most infallibly of him.\nHam. The concernancy, sir? Why do we wrap the gentleman in our more\nrawer breath\nOsr. Sir?\nHor [aside to Hamlet] Is't not possible to understand in another\ntongue? You will do't, sir, really.\nHam. What imports the nomination of this gentleman\nOsr. Of Laertes?\nHor. [aside] His purse is empty already. All's golden words are\nspent.\nHam. Of him, sir.\nOsr. I know you are not ignorant-\nHam. I would you did, sir; yet, in faith, if you did, it would not\nmuch approve me. Well, sir?\nOsr. You are not ignorant of what excellence Laertes is-\nHam. I dare not confess that, lest I should compare with him in\nexcellence; but to know a man well were to know himself.\nOsr. I mean, sir, for his weapon; but in the imputation laid on him\nby them, in his meed he's unfellowed.\nHam. What's his weapon?\nOsr. Rapier and dagger.\nHam. That's two of his weapons- but well.\nOsr. The King, sir, hath wager'd with him six Barbary horses;\nagainst the which he has impon'd, as I take it, six French\nrapiers and poniards, with their assigns, as girdle, hangers, and\nso. Three of the carriages, in faith, are very dear to fancy,\nvery responsive to the hilts, most delicate carriages, and of\nvery liberal conceit.\nHam. What call you the carriages?\nHor. [aside to Hamlet] I knew you must be edified by the margent\nere you had done.\nOsr. The carriages, sir, are the hangers.\nHam. The phrase would be more germane to the matter if we could\ncarry cannon by our sides. I would it might be hangers till then.\nBut on! Six Barbary horses against six French swords, their\nassigns, and three liberal-conceited carriages: that's the French\nbet against the Danish. Why is this all impon'd, as you call it?\nOsr. The King, sir, hath laid that, in a dozen passes between\nyourself and him, he shall not exceed you three hits; he hath\nlaid on twelve for nine, and it would come to immediate trial\nif your lordship would vouchsafe the answer.\nHam. How if I answer no?\nOsr. I mean, my lord, the opposition of your person in trial.\nHam. Sir, I will walk here in the hall. If it please his Majesty,\nit is the breathing time of day with me. Let the foils be\nbrought, the gentleman willing, and the King hold his purpose,\nI will win for him if I can; if not, I will gain nothing but my\nshame and the odd hits.\nOsr. Shall I redeliver you e'en so?\nHam. To this effect, sir, after what flourish your nature will.\nOsr. I commend my duty to your lordship.\nHam. Yours, yours. [Exit Osric.] He does well to commend it\nhimself; there are no tongues else for's turn.\nHor. This lapwing runs away with the shell on his head.\nHam. He did comply with his dug before he suck'd it. Thus has he,\nand many more of the same bevy that I know the drossy age dotes\non, only got the tune of the time and outward habit of encounter-\na kind of yesty collection, which carries them through and\nthrough the most fann'd and winnowed opinions; and do but blow\nthem to their trial-the bubbles are out,\nEnter a Lord.\nLord. My lord, his Majesty commended him to you by young Osric, who\nbrings back to him, that you attend him in the hall. He sends to\nknow if your pleasure hold to play with Laertes, or that you will\ntake longer time.\nHam. I am constant to my purposes; they follow the King's pleasure.\nIf his fitness speaks, mine is ready; now or whensoever, provided\nI be so able as now.\nLord. The King and Queen and all are coming down.\nHam. In happy time.\nLord. The Queen desires you to use some gentle entertainment to\nLaertes before you fall to play.\nHam. She well instructs me.\n[Exit Lord.]\nHor. You will lose this wager, my lord.\nHam. I do not think so. Since he went into France I have been in\ncontinual practice. I shall win at the odds. But thou wouldst not\nthink how ill all's here about my heart. But it is no matter.\nHor. Nay, good my lord -\nHam. It is but foolery; but it is such a kind of gaingiving as\nwould perhaps trouble a woman.\nHor. If your mind dislike anything, obey it. I will forestall their\nrepair hither and say you are not fit.\nHam. Not a whit, we defy augury; there's a special providence in\nthe fall of a sparrow. If it be now, 'tis not to come', if it be\nnot to come, it will be now; if it be not now, yet it will come:\nthe readiness is all. Since no man knows aught of what he leaves,\nwhat is't to leave betimes? Let be.\nEnter King, Queen, Laertes, Osric, and Lords, with other\nAttendants with foils and gauntlets.\nA table and flagons of wine on it.\nKing. Come, Hamlet, come, and take this hand from me.\n[The King puts Laertes' hand into Hamlet's.]\nHam. Give me your pardon, sir. I have done you wrong;\nBut pardon't, as you are a gentleman.\nThis presence knows,\nAnd you must needs have heard, how I am punish'd\nWith sore distraction. What I have done\nThat might your nature, honour, and exception\nRoughly awake, I here proclaim was madness.\nWas't Hamlet wrong'd Laertes? Never Hamlet.\nIf Hamlet from himself be taken away,\nAnd when he's not himself does wrong Laertes,\nThen Hamlet does it not, Hamlet denies it.\nWho does it, then? His madness. If't be so,\nHamlet is of the faction that is wrong'd;\nHis madness is poor Hamlet's enemy.\nSir, in this audience,\nLet my disclaiming from a purpos'd evil\nFree me so far in your most generous thoughts\nThat I have shot my arrow o'er the house\nAnd hurt my brother.\nLaer. I am satisfied in nature,\nWhose motive in this case should stir me most\nTo my revenge. But in my terms of honour\nI stand aloof, and will no reconcilement\nTill by some elder masters of known honour\nI have a voice and precedent of peace\nTo keep my name ungor'd. But till that time\nI do receive your offer'd love like love,\nAnd will not wrong it.\nHam. I embrace it freely,\nAnd will this brother's wager frankly play.\nGive us the foils. Come on.\nLaer. Come, one for me.\nHam. I'll be your foil, Laertes. In mine ignorance\nYour skill shall, like a star i' th' darkest night,\nStick fiery off indeed.\nLaer. You mock me, sir.\nHam. No, by this bad.\nKing. Give them the foils, young Osric. Cousin Hamlet,\nYou know the wager?\nHam. Very well, my lord.\nYour Grace has laid the odds o' th' weaker side.\nKing. I do not fear it, I have seen you both;\nBut since he is better'd, we have therefore odds.\nLaer. This is too heavy; let me see another.\nHam. This likes me well. These foils have all a length?\nPrepare to play.\nOsr. Ay, my good lord.\nKing. Set me the stoups of wine upon that table.\nIf Hamlet give the first or second hit,\nOr quit in answer of the third exchange,\nLet all the battlements their ordnance fire;\nThe King shall drink to Hamlet's better breath,\nAnd in the cup an union shall he throw\nRicher than that which four successive kings\nIn Denmark's crown have worn. Give me the cups;\nAnd let the kettle to the trumpet speak,\nThe trumpet to the cannoneer without,\nThe cannons to the heavens, the heaven to earth,\n'Now the King drinks to Hamlet.' Come, begin.\nAnd you the judges, bear a wary eye.\nHam. Come on, sir.\nLaer. Come, my lord. They play.\nHam. One.\nLaer. No.\nHam. Judgment!\nOsr. A hit, a very palpable hit.\nLaer. Well, again!\nKing. Stay, give me drink. Hamlet, this pearl is thine;\nHere's to thy health.\n[Drum; trumpets sound; a piece goes off [within].\nGive him the cup.\nHam. I'll play this bout first; set it by awhile.\nCome. (They play.) Another hit. What say you?\nLaer. A touch, a touch; I do confess't.\nKing. Our son shall win.\nQueen. He's fat, and scant of breath.\nHere, Hamlet, take my napkin, rub thy brows.\nThe Queen carouses to thy fortune, Hamlet.\nHam. Good madam!\nKing. Gertrude, do not drink.\nQueen. I will, my lord; I pray you pardon me. Drinks.\nKing. [aside] It is the poison'd cup; it is too late.\nHam. I dare not drink yet, madam; by-and-by.\nQueen. Come, let me wipe thy face.\nLaer. My lord, I'll hit him now.\nKing. I do not think't.\nLaer. [aside] And yet it is almost against my conscience.\nHam. Come for the third, Laertes! You but dally.\npray You Pass with your best violence;\nI am afeard You make a wanton of me.\nLaer. Say you so? Come on. Play.\nOsr. Nothing neither way.\nLaer. Have at you now!\n[Laertes wounds Hamlet; then] in scuffling, they\nchange rapiers, [and Hamlet wounds Laertes].\nKing. Part them! They are incens'd.\nHam. Nay come! again! The Queen falls.\nOsr. Look to the Queen there, ho!\nHor. They bleed on both sides. How is it, my lord?\nOsr. How is't, Laertes?\nLaer. Why, as a woodcock to mine own springe, Osric.\nI am justly kill'd with mine own treachery.\nHam. How does the Queen?\nKing. She sounds to see them bleed.\nQueen. No, no! the drink, the drink! O my dear Hamlet!\nThe drink, the drink! I am poison'd. [Dies.]\nHam. O villany! Ho! let the door be lock'd.\nTreachery! Seek it out.\n[Laertes falls.]\nLaer. It is here, Hamlet. Hamlet, thou art slain;\nNo medicine in the world can do thee good.\nIn thee there is not half an hour of life.\nThe treacherous instrument is in thy hand,\nUnbated and envenom'd. The foul practice\nHath turn'd itself on me. Lo, here I lie,\nNever to rise again. Thy mother's poison'd.\nI can no more. The King, the King's to blame.\nHam. The point envenom'd too?\nThen, venom, to thy work. Hurts the King.\nAll. Treason! treason!\nKing. O, yet defend me, friends! I am but hurt.\nHam. Here, thou incestuous, murd'rous, damned Dane,\nDrink off this potion! Is thy union here?\nFollow my mother. King dies.\nLaer. He is justly serv'd.\nIt is a poison temper'd by himself.\nExchange forgiveness with me, noble Hamlet.\nMine and my father's death come not upon thee,\nNor thine on me! Dies.\nHam. Heaven make thee free of it! I follow thee.\nI am dead, Horatio. Wretched queen, adieu!\nYou that look pale and tremble at this chance,\nThat are but mutes or audience to this act,\nHad I but time (as this fell sergeant, Death,\nIs strict in his arrest) O, I could tell you-\nBut let it be. Horatio, I am dead;\nThou liv'st; report me and my cause aright\nTo the unsatisfied.\nHor. Never believe it.\nI am more an antique Roman than a Dane.\nHere's yet some liquor left.\nHam. As th'art a man,\nGive me the cup. Let go! By heaven, I'll ha't.\nO good Horatio, what a wounded name\n(Things standing thus unknown) shall live behind me!\nIf thou didst ever hold me in thy heart,\nAbsent thee from felicity awhile,\nAnd in this harsh world draw thy breath in pain,\nTo tell my story. [March afar off, and shot within.]\nWhat warlike noise is this?\nOsr. Young Fortinbras, with conquest come from Poland,\nTo the ambassadors of England gives\nThis warlike volley.\nHam. O, I die, Horatio!\nThe potent poison quite o'ercrows my spirit.\nI cannot live to hear the news from England,\nBut I do prophesy th' election lights\nOn Fortinbras. He has my dying voice.\nSo tell him, with th' occurrents, more and less,\nWhich have solicited- the rest is silence. Dies.\nHor. Now cracks a noble heart. Good night, sweet prince,\nAnd flights of angels sing thee to thy rest!\n[March within.]\nWhy does the drum come hither?\nEnter Fortinbras and English Ambassadors, with Drum,\nColours, and Attendants.\nFort. Where is this sight?\nHor. What is it you will see?\nIf aught of woe or wonder, cease your search.\nFort. This quarry cries on havoc. O proud Death,\nWhat feast is toward in thine eternal cell\nThat thou so many princes at a shot\nSo bloodily hast struck.\nAmbassador. The sight is dismal;\nAnd our affairs from England come too late.\nThe ears are senseless that should give us bearing\nTo tell him his commandment is fulfill'd\nThat Rosencrantz and Guildenstern are dead.\nWhere should We have our thanks?\nHor. Not from his mouth,\nHad it th' ability of life to thank you.\nHe never gave commandment for their death.\nBut since, so jump upon this bloody question,\nYou from the Polack wars, and you from England,\nAre here arriv'd, give order that these bodies\nHigh on a stage be placed to the view;\nAnd let me speak to the yet unknowing world\nHow these things came about. So shall You hear\nOf carnal, bloody and unnatural acts;\nOf accidental judgments, casual slaughters;\nOf deaths put on by cunning and forc'd cause;\nAnd, in this upshot, purposes mistook\nFall'n on th' inventors' heads. All this can I\nTruly deliver.\nFort. Let us haste to hear it,\nAnd call the noblest to the audience.\nFor me, with sorrow I embrace my fortune.\nI have some rights of memory in this kingdom\nWhich now, to claim my vantage doth invite me.\nHor. Of that I shall have also cause to speak,\nAnd from his mouth whose voice will draw on more.\nBut let this same be presently perform'd,\nEven while men's minds are wild, lest more mischance\nOn plots and errors happen.\nFort. Let four captains\nBear Hamlet like a soldier to the stage;\nFor he was likely, had he been put on,\nTo have prov'd most royally; and for his passage\nThe soldiers' music and the rites of war\nSpeak loudly for him.\nTake up the bodies. Such a sight as this\nBecomes the field but here shows much amiss.\nGo, bid the soldiers shoot.\nExeunt marching; after the which a peal of ordnance\nare shot off. \nTHE END";
exports.default = hamlet;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map