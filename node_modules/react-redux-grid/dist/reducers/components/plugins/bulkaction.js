'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var _ActionTypes = require('./../../../constants/ActionTypes');

var _handleActions2 = require('./../../../util/handleActions');

var _handleActions3 = _interopRequireDefault(_handleActions2);

var _bulkaction = require('./../../actionHelpers/plugins/bulkaction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = new _immutable.OrderedMap();

var _default = (0, _handleActions3.default)(_defineProperty({}, _ActionTypes.REMOVE_TOOLBAR, _bulkaction.removeToolbar), initialState);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(initialState, 'initialState', 'src/reducers/components/plugins/bulkaction.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/reducers/components/plugins/bulkaction.js');
}();

;