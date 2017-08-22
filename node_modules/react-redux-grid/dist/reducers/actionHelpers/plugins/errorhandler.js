'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dismissError = exports.errorOccurred = undefined;

var _records = require('./../../../records');

var _lastUpdate = require('./../../../util/lastUpdate');

var _getUpdatedRecord = require('./../../../util/getUpdatedRecord');

var _getUpdatedRecord2 = _interopRequireDefault(_getUpdatedRecord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorOccurred = exports.errorOccurred = function errorOccurred(state, _ref) {
    var error = _ref.error,
        stateKey = _ref.stateKey;
    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        error: error,
        errorOccurred: true,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.ErrorHandler);
};

var dismissError = exports.dismissError = function dismissError(state, _ref2) {
    var stateKey = _ref2.stateKey;
    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        error: '',
        errorOccurred: false,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.ErrorHandler);
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(errorOccurred, 'errorOccurred', 'src/reducers/actionHelpers/plugins/errorhandler.js');

    __REACT_HOT_LOADER__.register(dismissError, 'dismissError', 'src/reducers/actionHelpers/plugins/errorhandler.js');
}();

;