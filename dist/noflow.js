/*
   weak
 */

import React from 'react'; // peer-dependency
import mitt from 'mitt'; // DEPENDENCY #1
import PropTypes from 'prop-types'; // DEPENDENCY #2, sorta

if (!PropTypes) console.warn('<react-native-portal> no PropTypes available');

const oContextTypes = {
  portalSub: PropTypes.func,
  portalUnsub: PropTypes.func,
  portalSet: PropTypes.func,
  portalGet: PropTypes.func
};

export class PortalProvider extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.portals = new Map(), this.portalSub = (name, callback) => {
      const emitter = this._emitter;
      if (emitter) {
        emitter.on(name, callback);
      }
    }, this.portalUnsub = (name, callback) => {
      const emitter = this._emitter;
      if (emitter) {
        emitter.off(name, callback);
      }
    }, this.portalSet = (name, value) => {
      this.portals.set(name, value);
      if (this._emitter) {
        this._emitter.emit(name);
      }
    }, this.portalGet = name => this.portals.get(name) || null, _temp;
  }

  getChildContext() {
    return {
      portalSub: this.portalSub,
      portalUnsub: this.portalUnsub,
      portalSet: this.portalSet,
      portalGet: this.portalGet
    };
  }

  UNSAGE_componentWillMount() {
    this._emitter = new mitt();
  }

  componentWillUnmount() {
    this._emitter = null;
  }

  // 변경시 통지 요청 등록


  // 변경시 통지 요청 해제


  // 변경


  // 변경
  render() {
    return this.props.children;
  }
}

PortalProvider.childContextTypes = oContextTypes;
export class BlackPortal extends React.PureComponent {
  componentDidMount() {
    const { name, children } = this.props;
    const { portalSet } = this.context;
    portalSet && portalSet(name, children);
  }
  UNSAGE_componentWillReceiveProps(newProps) {
    const oldProps = this.props;
    const { name, children } = newProps;
    const { portalSet } = this.context;
    if (oldProps.children != newProps.children) {
      portalSet && portalSet(name, children);
    }
  }
  componentWillUnmount() {
    const { name } = this.props;
    const { portalSet } = this.context;
    portalSet && portalSet(name, null);
  }
  render() {
    const { name } = this.props;
    return null;
  }
}

BlackPortal.contextTypes = oContextTypes;
export class WhitePortal extends React.PureComponent {
  constructor(...args) {
    var _temp2;

    return _temp2 = super(...args), this.forceUpdater = () => this.forceUpdate(), _temp2;
  }

  UNSAGE_componentWillMount() {
    const { name } = this.props;
    const { portalSub } = this.context;
    portalSub && portalSub(name, this.forceUpdater);
  }
  componentWillUnmount() {
    const { name } = this.props;
    const { portalUnsub } = this.context;
    portalUnsub && portalUnsub(name, this.forceUpdater);
  }


  render() {
    const { name, children, childrenProps } = this.props;
    const { portalGet } = this.context;
    const portalChildren = portalGet && portalGet(name) || children;
    return (childrenProps && portalChildren ? React.cloneElement(React.Children.only(portalChildren), childrenProps) : portalChildren) || null;
  }
}
WhitePortal.contextTypes = oContextTypes;
