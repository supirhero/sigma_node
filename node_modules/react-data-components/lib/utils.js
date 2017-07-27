'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sort = sort;
exports.filter = filter;
exports.containsIgnoreCase = containsIgnoreCase;

var _orderBy = require('lodash/orderBy');

var _orderBy2 = _interopRequireDefault(_orderBy);

var _some = require('lodash/some');

var _some2 = _interopRequireDefault(_some);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sort(_ref, data) {
  var prop = _ref.prop,
      order = _ref.order;

  return (0, _orderBy2.default)(data, prop, order === 'descending' ? 'desc' : 'asc');
}

function filter(filters, filterValues, data) {
  var filterAndVals = {};
  for (var _key in filterValues) {
    filterAndVals[_key] = {
      value: filterValues[_key],
      filter: filters[_key].filter,
      prop: filters[_key].prop
    };
  }

  return data.filter(function (row) {
    return (0, _some2.default)(filterAndVals, function (_ref2) {
      var filter = _ref2.filter,
          value = _ref2.value,
          prop = _ref2.prop;
      return !prop ? (0, _some2.default)(row, filter.bind(null, value)) : filter(value, row[key]);
    });
  });
}

function containsIgnoreCase(a, b) {
  a = String(a).toLowerCase().trim();
  b = String(b).toLowerCase().trim();
  return b.indexOf(a) >= 0;
}