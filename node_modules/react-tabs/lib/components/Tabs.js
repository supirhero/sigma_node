'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes3 = require('../helpers/propTypes');

var _UncontrolledTabs = require('./UncontrolledTabs');

var _UncontrolledTabs2 = _interopRequireDefault(_UncontrolledTabs);

var _count = require('../helpers/count');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleSelected = function (index, last, event) {
      // Call change event handler
      if (typeof _this.props.onSelect === 'function') {
        // Check if the change event handler cancels the tab change
        if (_this.props.onSelect(index, last, event) === false) return;
      }

      var state = {
        // Set focus if the change was triggered from the keyboard
        focus: event.type === 'keydown'
      };

      if (Tabs.inUncontrolledMode(_this.props)) {
        // Update selected index
        state.selectedIndex = index;
      }

      _this.setState(state);
    };

    _this.state = Tabs.copyPropsToState(_this.props, {}, _this.props.defaultFocus);
    return _this;
  }

  Tabs.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    if (process.env.NODE_ENV !== 'production' && Tabs.inUncontrolledMode(newProps) !== Tabs.inUncontrolledMode(this.props)) {
      throw new Error('Switching between controlled mode (by using `selectedIndex`) and uncontrolled mode is not supported in `Tabs`.\nFor more information about controlled and uncontrolled mode of react-tabs see the README.');
    }
    // Use a transactional update to prevent race conditions
    // when reading the state in copyPropsToState
    // See https://github.com/reactjs/react-tabs/issues/51
    this.setState(function (state) {
      return Tabs.copyPropsToState(newProps, state);
    });
  };

  Tabs.inUncontrolledMode = function inUncontrolledMode(props) {
    return props.selectedIndex === null;
  };

  // preserve the existing selectedIndex from state.
  // If the state has not selectedIndex, default to the defaultIndex or 0
  Tabs.copyPropsToState = function copyPropsToState(props, state) {
    var focus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var newState = {
      focus: focus
    };

    if (Tabs.inUncontrolledMode(props)) {
      var maxTabIndex = (0, _count.getTabsCount)(props.children) - 1;
      var selectedIndex = null;

      if (state.selectedIndex != null) {
        selectedIndex = Math.min(state.selectedIndex, maxTabIndex);
      } else {
        selectedIndex = props.defaultIndex || 0;
      }
      newState.selectedIndex = selectedIndex;
    }

    return newState;
  };

  Tabs.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        defaultIndex = _props.defaultIndex,
        defaultFocus = _props.defaultFocus,
        props = _objectWithoutProperties(_props, ['children', 'defaultIndex', 'defaultFocus']);

    props.focus = this.state.focus;
    props.onSelect = this.handleSelected;

    if (this.state.selectedIndex != null) {
      props.selectedIndex = this.state.selectedIndex;
    }

    return _react2.default.createElement(
      _UncontrolledTabs2.default,
      props,
      children
    );
  };

  return Tabs;
}(_react.Component);

Tabs.defaultProps = {
  defaultFocus: false,
  forceRenderTabPanel: false,
  selectedIndex: null,
  defaultIndex: null
};
exports.default = Tabs;
Tabs.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes3.childrenPropType,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array, _propTypes2.default.object]),
  defaultFocus: _propTypes2.default.bool,
  defaultIndex: _propTypes2.default.number,
  disabledTabClassName: _propTypes2.default.string,
  forceRenderTabPanel: _propTypes2.default.bool,
  onSelect: _propTypes3.onSelectPropType,
  selectedIndex: _propTypes3.selectedIndexPropType,
  selectedTabClassName: _propTypes2.default.string,
  selectedTabPanelClassName: _propTypes2.default.string
} : {};