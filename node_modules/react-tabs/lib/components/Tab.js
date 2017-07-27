'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_CLASS = 'react-tabs__tab';

var Tab = function (_Component) {
  _inherits(Tab, _Component);

  function Tab() {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Tab.prototype.componentDidMount = function componentDidMount() {
    this.checkFocus();
  };

  Tab.prototype.componentDidUpdate = function componentDidUpdate() {
    this.checkFocus();
  };

  Tab.prototype.checkFocus = function checkFocus() {
    if (this.props.selected && this.props.focus) {
      this.node.focus();
    }
  };

  Tab.prototype.render = function render() {
    var _cx,
        _this2 = this;

    var _props = this.props,
        children = _props.children,
        className = _props.className,
        disabled = _props.disabled,
        disabledClassName = _props.disabledClassName,
        focus = _props.focus,
        id = _props.id,
        panelId = _props.panelId,
        selected = _props.selected,
        selectedClassName = _props.selectedClassName,
        tabRef = _props.tabRef,
        attributes = _objectWithoutProperties(_props, ['children', 'className', 'disabled', 'disabledClassName', 'focus', 'id', 'panelId', 'selected', 'selectedClassName', 'tabRef']);

    return _react2.default.createElement(
      'li',
      _extends({}, attributes, {
        className: (0, _classnames2.default)(className, (_cx = {}, _cx[selectedClassName] = selected, _cx[disabledClassName] = disabled, _cx)),
        ref: function ref(node) {
          _this2.node = node;
          if (tabRef) tabRef(node);
        },
        role: 'tab',
        id: id,
        'aria-selected': selected ? 'true' : 'false',
        'aria-disabled': disabled ? 'true' : 'false',
        'aria-controls': panelId,
        tabIndex: selected ? '0' : null
      }),
      children
    );
  };

  return Tab;
}(_react.Component);

Tab.defaultProps = {
  className: DEFAULT_CLASS,
  disabledClassName: DEFAULT_CLASS + '--disabled',
  focus: false,
  id: null,
  panelId: null,
  selected: false,
  selectedClassName: DEFAULT_CLASS + '--selected'
};
exports.default = Tab;
Tab.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool,
  disabledClassName: _propTypes2.default.string,
  focus: _propTypes2.default.bool, // private
  id: _propTypes2.default.string, // private
  panelId: _propTypes2.default.string, // private
  selected: _propTypes2.default.bool, // private
  selectedClassName: _propTypes2.default.string,
  tabRef: _propTypes2.default.func // private
} : {};