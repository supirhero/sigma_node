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

var DEFAULT_CLASS = 'react-tabs__tab-panel';

var TabPanel = function (_Component) {
  _inherits(TabPanel, _Component);

  function TabPanel() {
    _classCallCheck(this, TabPanel);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TabPanel.prototype.render = function render() {
    var _cx;

    var _props = this.props,
        children = _props.children,
        className = _props.className,
        forceRender = _props.forceRender,
        id = _props.id,
        selected = _props.selected,
        selectedClassName = _props.selectedClassName,
        tabId = _props.tabId,
        attributes = _objectWithoutProperties(_props, ['children', 'className', 'forceRender', 'id', 'selected', 'selectedClassName', 'tabId']);

    return _react2.default.createElement(
      'div',
      _extends({}, attributes, {
        className: (0, _classnames2.default)(className, (_cx = {}, _cx[selectedClassName] = selected, _cx)),
        role: 'tabpanel',
        id: id,
        'aria-labelledby': tabId
      }),
      forceRender || selected ? children : null
    );
  };

  return TabPanel;
}(_react.Component);

TabPanel.defaultProps = {
  className: DEFAULT_CLASS,
  forceRender: false,
  selectedClassName: DEFAULT_CLASS + '--selected',
  style: {}
};
exports.default = TabPanel;
TabPanel.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.node,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array, _propTypes2.default.object]),
  forceRender: _propTypes2.default.bool,
  id: _propTypes2.default.string, // private
  selected: _propTypes2.default.bool, // private
  selectedClassName: _propTypes2.default.string,
  tabId: _propTypes2.default.string // private
} : {};