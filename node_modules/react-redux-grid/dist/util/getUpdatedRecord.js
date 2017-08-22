'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUpdatedDataRecord = undefined;

var _immutable = require('immutable');

var getUpdatedDataRecord = exports.getUpdatedDataRecord = function getUpdatedDataRecord(state, stateKey) {
    var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var type = arguments[3];
    var operation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'setIn';

    if (operation === 'setIn') {
        return state[operation]([stateKey], new type(values));
    } else if (operation === 'mergeIn') {
        var p = state.get(stateKey) ? state.get(stateKey) : (0, _immutable.fromJS)({});

        return state[operation]([stateKey], p.merge(values));
    }

    throw new Error('Update operation has not been implemented!');
}; /**
   * utility classed used by all reducers to
   * update their internal Immutable records
   * @param {object}  state
   * @param {string} stateKey
   * @param {object} values
   * @param {Immutable.Record} type
   * @param {string} operation
   **/

var _default = getUpdatedDataRecord;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(getUpdatedDataRecord, 'getUpdatedDataRecord', 'src/util/getUpdatedRecord.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/util/getUpdatedRecord.js');
}();

;