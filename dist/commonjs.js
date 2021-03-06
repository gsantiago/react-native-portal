'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var mitt = _interopDefault(require('mitt'));
var PropTypes = _interopDefault(require('prop-types'));

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

/*
   weak
 */

if (!PropTypes) console.warn('<react-native-portal> no PropTypes available');

var oContextTypes = {
  portalSub: PropTypes.func,
  portalUnsub: PropTypes.func,
  portalSet: PropTypes.func,
  portalGet: PropTypes.func
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
//# sourceMappingURL=commonjs.js.map
