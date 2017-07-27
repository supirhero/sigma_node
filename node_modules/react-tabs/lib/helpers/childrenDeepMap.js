'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.deepMap = deepMap;
exports.deepForEach = deepForEach;

var _react = require('react');

var _Tab = require('../components/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabList = require('../components/TabList');

var _TabList2 = _interopRequireDefault(_TabList);

var _TabPanel = require('../components/TabPanel');

var _TabPanel2 = _interopRequireDefault(_TabPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isTabChild(child) {
  return child.type === _Tab2.default || child.type === _TabList2.default || child.type === _TabPanel2.default;
}

function deepMap(children, callback) {
  return _react.Children.map(children, function (child) {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (child === null) return null;

    if (isTabChild(child)) {
      return callback(child);
    }

    if (child.props && child.props.children && _typeof(child.props.children) === 'object') {
      // Clone the child that has children and map them too
      return (0, _react.cloneElement)(child, _extends({}, child.props, {
        children: deepMap(child.props.children, callback)
      }));
    }

    return child;
  });
}

function deepForEach(children, callback) {
  return _react.Children.forEach(children, function (child) {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (child === null) return;

    if (child.type === _Tab2.default || child.type === _TabPanel2.default) {
      callback(child);
    } else if (child.props && child.props.children && _typeof(child.props.children) === 'object') {
      if (child.type === _TabList2.default) callback(child);
      deepForEach(child.props.children, callback);
    }
  });
}