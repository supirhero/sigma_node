'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setLoading = undefined;

var _records = require('./../../../records');

var _lastUpdate = require('./../../../util/lastUpdate');

var _getUpdatedRecord = require('./../../../util/getUpdatedRecord');

var _getUpdatedRecord2 = _interopRequireDefault(_getUpdatedRecord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setLoading = exports.setLoading = function setLoading(state, _ref) {
    var stateKey = _ref.stateKey,
        loadingState = _ref.state;
    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        isLoading: loadingState,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.Loader);
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setLoading, 'setLoading', 'src/reducers/actionHelpers/plugins/loader.js');
}();

;