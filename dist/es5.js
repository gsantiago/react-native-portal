var ReactNativePortal = (function (exports,React) {
'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;

//      
// An event handler can take an optional event argument
// and should not return a value

// An array of all currently registered event handlers for a type

// A map of event types and their corresponding event handlers.


/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all) {
	all = all || Object.create(null);

	return {
		/**
   * Register an event handler for the given type.
   *
   * @param  {String} type	Type of event to listen for, or `"*"` for all events
   * @param  {Function} handler Function to call in response to given event
   * @memberOf mitt
   */
		on: function on(type, handler) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
   * Remove an event handler for the given type.
   *
   * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
   * @param  {Function} handler Handler function to remove
   * @memberOf mitt
   */
		off: function off(type, handler) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
   * Invoke all handlers for the given type.
   * If present, `"*"` handlers are invoked after type-matched handlers.
   *
   * @param {String} type  The event type to invoke
   * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
   * @memberof mitt
   */
		emit: function emit(type, evt) {
			(all[type] || []).map(function (handler) {
				handler(evt);
			});
			(all['*'] || []).map(function (handler) {
				handler(type, evt);
			});
		}
	};
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var index$1 = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var factoryWithThrowingShims = function factoryWithThrowingShims() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    invariant_1(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var index = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = factoryWithThrowingShims();
  }
});

/*
   weak
 */

if (!index) console.warn('<react-native-portal> no PropTypes available');

var oContextTypes = {
  portalSub: index.func,
  portalUnsub: index.func,
  portalSet: index.func,
  portalGet: index.func
};

var PortalProvider = function (_React$Component) {
  inherits(PortalProvider, _React$Component);

  function PortalProvider() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, PortalProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = PortalProvider.__proto__ || Object.getPrototypeOf(PortalProvider)).call.apply(_ref, [this].concat(args))), _this), _this.portals = new Map(), _this.portalSub = function (name, callback) {
      var emitter = _this._emitter;
      if (emitter) {
        emitter.on(name, callback);
      }
    }, _this.portalUnsub = function (name, callback) {
      var emitter = _this._emitter;
      if (emitter) {
        emitter.off(name, callback);
      }
    }, _this.portalSet = function (name, value) {
      _this.portals.set(name, value);
      if (_this._emitter) {
        _this._emitter.emit(name);
      }
    }, _this.portalGet = function (name) {
      return _this.portals.get(name) || null;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(PortalProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        portalSub: this.portalSub,
        portalUnsub: this.portalUnsub,
        portalSet: this.portalSet,
        portalGet: this.portalGet
      };
    }
  }, {
    key: 'UNSAGE_componentWillMount',
    value: function UNSAGE_componentWillMount() {
      this._emitter = new mitt();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._emitter = null;
    }

    // 변경시 통지 요청 등록


    // 변경시 통지 요청 해제


    // 변경

  }, {
    key: 'render',


    // 변경
    value: function render() {
      return this.props.children;
    }
  }]);
  return PortalProvider;
}(React.Component);

PortalProvider.childContextTypes = oContextTypes;
var BlackPortal = function (_React$PureComponent) {
  inherits(BlackPortal, _React$PureComponent);

  function BlackPortal() {
    classCallCheck(this, BlackPortal);
    return possibleConstructorReturn(this, (BlackPortal.__proto__ || Object.getPrototypeOf(BlackPortal)).apply(this, arguments));
  }

  createClass(BlackPortal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          name = _props.name,
          children = _props.children;
      var portalSet = this.context.portalSet;

      portalSet && portalSet(name, children);
    }
  }, {
    key: 'UNSAGE_componentWillReceiveProps',
    value: function UNSAGE_componentWillReceiveProps(newProps) {
      var oldProps = this.props;
      var name = newProps.name,
          children = newProps.children;
      var portalSet = this.context.portalSet;

      if (oldProps.children != newProps.children) {
        portalSet && portalSet(name, children);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var name = this.props.name;
      var portalSet = this.context.portalSet;

      portalSet && portalSet(name, null);
    }
  }, {
    key: 'render',
    value: function render() {
      var name = this.props.name;

      return null;
    }
  }]);
  return BlackPortal;
}(React.PureComponent);

BlackPortal.contextTypes = oContextTypes;
var WhitePortal = function (_React$PureComponent2) {
  inherits(WhitePortal, _React$PureComponent2);

  function WhitePortal() {
    var _ref2;

    var _temp2, _this3, _ret2;

    classCallCheck(this, WhitePortal);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = possibleConstructorReturn(this, (_ref2 = WhitePortal.__proto__ || Object.getPrototypeOf(WhitePortal)).call.apply(_ref2, [this].concat(args))), _this3), _this3.forceUpdater = function () {
      return _this3.forceUpdate();
    }, _temp2), possibleConstructorReturn(_this3, _ret2);
  }

  createClass(WhitePortal, [{
    key: 'UNSAGE_componentWillMount',
    value: function UNSAGE_componentWillMount() {
      var name = this.props.name;
      var portalSub = this.context.portalSub;

      portalSub && portalSub(name, this.forceUpdater);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var name = this.props.name;
      var portalUnsub = this.context.portalUnsub;

      portalUnsub && portalUnsub(name, this.forceUpdater);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          name = _props2.name,
          children = _props2.children,
          childrenProps = _props2.childrenProps;
      var portalGet = this.context.portalGet;

      var portalChildren = portalGet && portalGet(name) || children;
      return (childrenProps && portalChildren ? React.cloneElement(React.Children.only(portalChildren), childrenProps) : portalChildren) || null;
    }
  }]);
  return WhitePortal;
}(React.PureComponent);
WhitePortal.contextTypes = oContextTypes;

exports.PortalProvider = PortalProvider;
exports.BlackPortal = BlackPortal;
exports.WhitePortal = WhitePortal;

return exports;

}({},React));
//# sourceMappingURL=es5.js.map
