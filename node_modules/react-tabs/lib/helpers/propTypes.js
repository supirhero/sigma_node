'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.childrenPropType = childrenPropType;
exports.onSelectPropType = onSelectPropType;
exports.selectedIndexPropType = selectedIndexPropType;

var _childrenDeepMap = require('../helpers/childrenDeepMap');

var _Tab = require('../components/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabList = require('../components/TabList');

var _TabList2 = _interopRequireDefault(_TabList);

var _TabPanel = require('../components/TabPanel');

var _TabPanel2 = _interopRequireDefault(_TabPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function childrenPropType(props, propName, componentName) {
  var error = void 0;
  var tabsCount = 0;
  var panelsCount = 0;
  var tabListFound = false;
  var listTabs = [];
  var children = props[propName];

  (0, _childrenDeepMap.deepForEach)(children, function (child) {
    if (child.type === _TabList2.default) {
      if (child.props && child.props.children && _typeof(child.props.children) === 'object') {
        (0, _childrenDeepMap.deepForEach)(child.props.children, function (listChild) {
          return listTabs.push(listChild);
        });
      }

      if (tabListFound) {
        error = new Error("Found multiple 'TabList' components inside 'Tabs'. Only one is allowed.");
      }
      tabListFound = true;
    }
    if (child.type === _Tab2.default) {
      if (!tabListFound || listTabs.indexOf(child) === -1) {
        error = new Error("Found a 'Tab' component outside of the 'TabList' component. 'Tab' components have to be inside the 'TabList' component.");
      }
      tabsCount++;
    } else if (child.type === _TabPanel2.default) {
      panelsCount++;
    }
  });

  if (!error && tabsCount !== panelsCount) {
    error = new Error('There should be an equal number of \'Tab\' and \'TabPanel\' in `' + componentName + '`.' + ('Received ' + tabsCount + ' \'Tab\' and ' + panelsCount + ' \'TabPanel\'.'));
  }

  return error;
}

function onSelectPropType(props, propName, componentName, location, propFullName) {
  var prop = props[propName];
  var name = propFullName || propName;
  var error = null;

  if (prop && typeof prop !== 'function') {
    error = new Error('Invalid ' + location + ' `' + name + '` of type `' + (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) + '` supplied to `' + componentName + '`, expected `function`.');
  } else if (props.selectedIndex != null && prop == null) {
    error = new Error('The ' + location + ' `' + name + '` is marked as required in `' + componentName + '`, but its value is `undefined` or `null`.\n`onSelect` is required when `selectedIndex` is also set. Not doing so will make the tabs not do anything, as `selectedIndex` indicates that you want to handle the selected tab yourself.\nIf you only want to set the inital tab replace `selectedIndex` with `defaultIndex`.');
  }

  return error;
}

function selectedIndexPropType(props, propName, componentName, location, propFullName) {
  var prop = props[propName];
  var name = propFullName || propName;
  var error = null;

  if (prop != null && typeof prop !== 'number') {
    error = new Error('Invalid ' + location + ' `' + name + '` of type `' + (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) + '` supplied to `' + componentName + '`, expected `number`.');
  } else if (props.defaultIndex != null && prop != null) {
    return new Error('The ' + location + ' `' + name + '` cannot be used together with `defaultIndex` in `' + componentName + '`.\nEither remove `' + name + '` to let `' + componentName + '` handle the selected tab internally or remove `defaultIndex` to handle it yourself.');
  }

  return error;
}