'use strict';

exports.__esModule = true;
exports.getTabsCount = getTabsCount;
exports.getPanelsCount = getPanelsCount;

var _childrenDeepMap = require('../helpers/childrenDeepMap');

var _Tab = require('../components/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabPanel = require('../components/TabPanel');

var _TabPanel2 = _interopRequireDefault(_TabPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTabsCount(children) {
  var tabCount = 0;
  (0, _childrenDeepMap.deepForEach)(children, function (child) {
    if (child.type === _Tab2.default) tabCount++;
  });

  return tabCount;
}

function getPanelsCount(children) {
  var panelCount = 0;
  (0, _childrenDeepMap.deepForEach)(children, function (child) {
    if (child.type === _TabPanel2.default) panelCount++;
  });

  return panelCount;
}