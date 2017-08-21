'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pageRemote = exports.pageLocal = undefined;

var _records = require('./../../../records');

var _lastUpdate = require('./../../../util/lastUpdate');

var _getUpdatedRecord = require('./../../../util/getUpdatedRecord');

var _getUpdatedRecord2 = _interopRequireDefault(_getUpdatedRecord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pageLocal = exports.pageLocal = function pageLocal(state, _ref) {
    var pageIndex = _ref.pageIndex,
        stateKey = _ref.stateKey;
    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        pageIndex: pageIndex,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.Pager);
};

var pageRemote = exports.pageRemote = function pageRemote(state, _ref2) {
    var pageIndex = _ref2.pageIndex,
        stateKey = _ref2.stateKey;
    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        pageIndex: pageIndex,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.Pager);
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(pageLocal, 'pageLocal', 'src/reducers/actionHelpers/plugins/pager.js');

    __REACT_HOT_LOADER__.register(pageRemote, 'pageRemote', 'src/reducers/actionHelpers/plugins/pager.js');
}();

;