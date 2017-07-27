'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enhanceDataTable = require('./enhanceDataTable');

var _enhanceDataTable2 = _interopRequireDefault(_enhanceDataTable);

var _PartialTable = require('./PartialTable');

var _PartialTable2 = _interopRequireDefault(_PartialTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _enhanceDataTable2.default)(_PartialTable2.default);