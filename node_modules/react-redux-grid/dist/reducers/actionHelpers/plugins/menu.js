'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hideMenu = exports.showMenu = undefined;

var _records = require('./../../../records');

var _lastUpdate = require('./../../../util/lastUpdate');

var _getUpdatedRecord3 = require('./../../../util/getUpdatedRecord');

var _getUpdatedRecord4 = _interopRequireDefault(_getUpdatedRecord3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var showMenu = exports.showMenu = function showMenu(state, _ref) {
    var _getUpdatedRecord;

    var stateKey = _ref.stateKey,
        id = _ref.id;
    return (0, _getUpdatedRecord4.default)(state, stateKey, (_getUpdatedRecord = {}, _defineProperty(_getUpdatedRecord, id, true), _defineProperty(_getUpdatedRecord, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _getUpdatedRecord), _records.Menu);
};

var hideMenu = exports.hideMenu = function hideMenu(state, _ref2) {
    var _getUpdatedRecord2;

    var stateKey = _ref2.stateKey,
        id = _ref2.id;
    return (0, _getUpdatedRecord4.default)(state, stateKey, (_getUpdatedRecord2 = {}, _defineProperty(_getUpdatedRecord2, id, false), _defineProperty(_getUpdatedRecord2, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _getUpdatedRecord2), _records.Menu);
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(showMenu, 'showMenu', 'src/reducers/actionHelpers/plugins/menu.js');

    __REACT_HOT_LOADER__.register(hideMenu, 'hideMenu', 'src/reducers/actionHelpers/plugins/menu.js');
}();

;