'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reduxStorageMergerSimple = require('redux-storage-merger-simple');

var _reduxStorageMergerSimple2 = _interopRequireDefault(_reduxStorageMergerSimple);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (reducer) {
    var merger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _reduxStorageMergerSimple2['default'];

    return function (state, action) {
        return reducer(action.type === _constants.LOAD ? merger(state, action.payload) : state, action);
    };
};