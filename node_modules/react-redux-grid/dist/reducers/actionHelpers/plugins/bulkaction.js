'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeToolbar = undefined;

var _records = require('./../../../records');

var _lastUpdate = require('./../../../util/lastUpdate');

var _getUpdatedRecord = require('./../../../util/getUpdatedRecord');

var _getUpdatedRecord2 = _interopRequireDefault(_getUpdatedRecord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeToolbar = exports.removeToolbar = function removeToolbar(state, _ref) {
    var stateKey = _ref.stateKey,
        value = _ref.value;
    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        isRemoved: value,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.BulkAction);
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(removeToolbar, 'removeToolbar', 'src/reducers/actionHelpers/plugins/bulkaction.js');
}();

;