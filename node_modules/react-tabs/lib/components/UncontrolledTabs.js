'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uuid = require('../helpers/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _propTypes3 = require('../helpers/propTypes');

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabList = require('./TabList');

var _TabList2 = _interopRequireDefault(_TabList);

var _TabPanel = require('./TabPanel');

var _TabPanel2 = _interopRequireDefault(_TabPanel);

var _count = require('../helpers/count');

var _childrenDeepMap = require('../helpers/childrenDeepMap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Determine if a node from event.target is a Tab element
function isTabNode(node) {
  return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

// Determine if a tab node is disabled
function isTabDisabled(node) {
  return node.getAttribute('aria-disabled') === 'true';
}

var canUseActiveElement = !!(typeof window !== 'undefined' && window.document && window.document.activeElement);

var UncontrolledTabs = function (_Component) {
  _inherits(UncontrolledTabs, _Component);

  function UncontrolledTabs() {
    var _temp, _this, _ret;

    _classCallCheck(this, UncontrolledTabs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.tabNodes = [], _this.handleKeyDown = function (e) {
      if (_this.isTabFromContainer(e.target)) {
        var index = _this.props.selectedIndex;
        var preventDefault = false;

        if (e.keyCode === 37 || e.keyCode === 38) {
          // Select next tab to the left
          index = _this.getPrevTab(index);
          preventDefault = true;
        } else if (e.keyCode === 39 || e.keyCode === 40) {
          // Select next tab to the right
          index = _this.getNextTab(index);
          preventDefault = true;
        }

        // This prevents scrollbars from moving around
        if (preventDefault) {
          e.preventDefault();
        }

        _this.setSelected(index, e);
      }
    }, _this.handleClick = function (e) {
      var node = e.target;
      // eslint-disable-next-line no-cond-assign
      do {
        if (_this.isTabFromContainer(node)) {
          if (isTabDisabled(node)) {
            return;
          }

          var index = [].slice.call(node.parentNode.children).filter(isTabNode).indexOf(node);
          _this.setSelected(index, e);
          return;
        }
      } while ((node = node.parentNode) !== null);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  UncontrolledTabs.prototype.setSelected = function setSelected(index, event) {
    // Don't do anything if nothing has changed
    if (index === this.props.selectedIndex) return;
    // Check index boundary
    if (index < 0 || index >= this.getTabsCount()) return;

    // Call change event handler
    this.props.onSelect(index, this.props.selectedIndex, event);
  };

  UncontrolledTabs.prototype.getNextTab = function getNextTab(index) {
    var count = this.getTabsCount();

    // Look for non-disabled tab from index to the last tab on the right
    for (var i = index + 1; i < count; i++) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // If no tab found, continue searching from first on left to index
    for (var _i = 0; _i < index; _i++) {
      if (!isTabDisabled(this.getTab(_i))) {
        return _i;
      }
    }

    // No tabs are disabled, return index
    return index;
  };

  UncontrolledTabs.prototype.getPrevTab = function getPrevTab(index) {
    var i = index;

    // Look for non-disabled tab from index to first tab on the left
    while (i--) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // If no tab found, continue searching from last tab on right to index
    i = this.getTabsCount();
    while (i-- > index) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  };

  UncontrolledTabs.prototype.getTabsCount = function getTabsCount() {
    return (0, _count.getTabsCount)(this.props.children);
  };

  UncontrolledTabs.prototype.getPanelsCount = function getPanelsCount() {
    return (0, _count.getPanelsCount)(this.props.children);
  };

  UncontrolledTabs.prototype.getTab = function getTab(index) {
    return this.tabNodes['tabs-' + index];
  };

  UncontrolledTabs.prototype.getChildren = function getChildren() {
    var _this2 = this;

    var index = 0;
    var _props = this.props,
        children = _props.children,
        disabledTabClassName = _props.disabledTabClassName,
        focus = _props.focus,
        forceRenderTabPanel = _props.forceRenderTabPanel,
        selectedIndex = _props.selectedIndex,
        selectedTabClassName = _props.selectedTabClassName,
        selectedTabPanelClassName = _props.selectedTabPanelClassName;


    this.tabIds = this.tabIds || [];
    this.panelIds = this.panelIds || [];
    var diff = this.tabIds.length - this.getTabsCount();

    // Add ids if new tabs have been added
    // Don't bother removing ids, just keep them in case they are added again
    // This is more efficient, and keeps the uuid counter under control
    while (diff++ < 0) {
      this.tabIds.push((0, _uuid2.default)());
      this.panelIds.push((0, _uuid2.default)());
    }

    // Map children to dynamically setup refs
    return (0, _childrenDeepMap.deepMap)(children, function (child) {
      var result = child;

      // Clone TabList and Tab components to have refs
      if (child.type === _TabList2.default) {
        var listIndex = 0;

        // Figure out if the current focus in the DOM is set on a Tab
        // If it is we should keep the focus on the next selected tab
        var wasTabFocused = false;

        if (canUseActiveElement) {
          wasTabFocused = _react2.default.Children.toArray(child.props.children).filter(function (tab) {
            return tab.type === _Tab2.default;
          }).some(function (tab, i) {
            return document.activeElement === _this2.getTab(i);
          });
        }

        result = (0, _react.cloneElement)(child, {
          children: (0, _childrenDeepMap.deepMap)(child.props.children, function (tab) {
            var key = 'tabs-' + listIndex;
            var selected = selectedIndex === listIndex;

            var props = {
              tabRef: function tabRef(node) {
                _this2.tabNodes[key] = node;
              },
              id: _this2.tabIds[listIndex],
              panelId: _this2.panelIds[listIndex],
              selected: selected,
              focus: selected && (focus || wasTabFocused)
            };

            if (selectedTabClassName) props.selectedClassName = selectedTabClassName;
            if (disabledTabClassName) props.disabledClassName = disabledTabClassName;

            listIndex++;

            return (0, _react.cloneElement)(tab, props);
          })
        });
      } else if (child.type === _TabPanel2.default) {
        var props = {
          id: _this2.panelIds[index],
          tabId: _this2.tabIds[index],
          selected: selectedIndex === index
        };

        if (forceRenderTabPanel) props.forceRender = forceRenderTabPanel;
        if (selectedTabPanelClassName) props.selectedClassName = selectedTabPanelClassName;

        index++;

        result = (0, _react.cloneElement)(child, props);
      }

      return result;
    });
  };

  /**
   * Determine if a node from event.target is a Tab element for the current Tabs container.
   * If the clicked element is not a Tab, it returns false.
   * If it finds another Tabs container between the Tab and `this`, it returns false.
   */
  UncontrolledTabs.prototype.isTabFromContainer = function isTabFromContainer(node) {
    // return immediately if the clicked element is not a Tab.
    if (!isTabNode(node)) {
      return false;
    }

    // Check if the first occurrence of a Tabs container is `this` one.
    var nodeAncestor = node.parentElement;
    do {
      if (nodeAncestor === this.node) return true;else if (nodeAncestor.getAttribute('data-tabs')) break;

      nodeAncestor = nodeAncestor.parentElement;
    } while (nodeAncestor);

    return false;
  };

  UncontrolledTabs.prototype.render = function render() {
    var _this3 = this;

    // Delete all known props, so they don't get added to DOM
    var _props2 = this.props,
        children = _props2.children,
        className = _props2.className,
        disabledTabClassName = _props2.disabledTabClassName,
        focus = _props2.focus,
        forceRenderTabPanel = _props2.forceRenderTabPanel,
        onSelect = _props2.onSelect,
        selectedIndex = _props2.selectedIndex,
        selectedTabClassName = _props2.selectedTabClassName,
        selectedTabPanelClassName = _props2.selectedTabPanelClassName,
        attributes = _objectWithoutProperties(_props2, ['children', 'className', 'disabledTabClassName', 'focus', 'forceRenderTabPanel', 'onSelect', 'selectedIndex', 'selectedTabClassName', 'selectedTabPanelClassName']);

    return _react2.default.createElement(
      'div',
      _extends({}, attributes, {
        className: (0, _classnames2.default)(className),
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown,
        ref: function ref(node) {
          _this3.node = node;
        },
        'data-tabs': true
      }),
      this.getChildren()
    );
  };

  return UncontrolledTabs;
}(_react.Component);

UncontrolledTabs.defaultProps = {
  className: 'react-tabs',
  focus: false
};
exports.default = UncontrolledTabs;
UncontrolledTabs.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes3.childrenPropType,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array, _propTypes2.default.object]),
  disabledTabClassName: _propTypes2.default.string,
  focus: _propTypes2.default.bool,
  forceRenderTabPanel: _propTypes2.default.bool,
  onSelect: _propTypes2.default.func.isRequired,
  selectedIndex: _propTypes2.default.number.isRequired,
  selectedTabClassName: _propTypes2.default.string,
  selectedTabPanelClassName: _propTypes2.default.string
} : {};