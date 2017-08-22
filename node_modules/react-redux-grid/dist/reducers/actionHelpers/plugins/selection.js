'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setIndexes = exports.setSelection = exports.deselectRow = exports.selectRow = exports.removeSelections = exports.deselectAll = exports.selectAll = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _records = require('./../../../records');

var _lastUpdate = require('./../../../util/lastUpdate');

var _getUpdatedRecord5 = require('./../../../util/getUpdatedRecord');

var _getUpdatedRecord6 = _interopRequireDefault(_getUpdatedRecord5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var selectAll = exports.selectAll = function selectAll(state, _ref) {
    var selection = _ref.selection,
        stateKey = _ref.stateKey,
        indexes = _ref.indexes;
    return (0, _getUpdatedRecord6.default)(state, stateKey, _extends({}, selection, {
        indexes: indexes,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }), _records.Selection);
};

var deselectAll = exports.deselectAll = function deselectAll(state, _ref2) {
    var stateKey = _ref2.stateKey;
    return (0, _getUpdatedRecord6.default)(state, stateKey, {
        lastUpdate: (0, _lastUpdate.generateLastUpdate)(),
        indexes: []
    }, _records.Selection);
};

var removeSelections = exports.removeSelections = function removeSelections(state, _ref3) {
    var stateKey = _ref3.stateKey;
    return (0, _getUpdatedRecord6.default)(state, stateKey, {
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.Selection);
};

var selectRow = exports.selectRow = function selectRow(state, _ref4) {
    var _getUpdatedRecord;

    var rowId = _ref4.rowId,
        stateKey = _ref4.stateKey;
    return (0, _getUpdatedRecord6.default)(state, stateKey, (_getUpdatedRecord = {}, _defineProperty(_getUpdatedRecord, rowId, true), _defineProperty(_getUpdatedRecord, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _getUpdatedRecord), _records.Selection, 'mergeIn');
};

var deselectRow = exports.deselectRow = function deselectRow(state, _ref5) {
    var _getUpdatedRecord2;

    var rowId = _ref5.rowId,
        stateKey = _ref5.stateKey;
    return (0, _getUpdatedRecord6.default)(state, stateKey, (_getUpdatedRecord2 = {}, _defineProperty(_getUpdatedRecord2, rowId, false), _defineProperty(_getUpdatedRecord2, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _getUpdatedRecord2), _records.Selection, 'mergeIn');
};

var setSelection = exports.setSelection = function setSelection(state, _ref6) {
    var _getUpdatedRecord4;

    var allowDeselect = _ref6.allowDeselect,
        clearSelections = _ref6.clearSelections,
        id = _ref6.id,
        index = _ref6.index,
        stateKey = _ref6.stateKey;

    var currentValue = state.getIn([stateKey, id]);
    var currentIndexes = state.getIn([stateKey, 'indexes']);
    var isSelectAction = allowDeselect ? !currentValue : true;
    var indexes = setIndexes(index, currentIndexes && currentIndexes.toJS ? currentIndexes.toJS() : currentIndexes, !isSelectAction);

    if (clearSelections || !state.get(stateKey)) {
        var _getUpdatedRecord3;

        return (0, _getUpdatedRecord6.default)(state, stateKey, (_getUpdatedRecord3 = {}, _defineProperty(_getUpdatedRecord3, id, isSelectAction), _defineProperty(_getUpdatedRecord3, 'indexes', isSelectAction ? [index] : []), _defineProperty(_getUpdatedRecord3, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _getUpdatedRecord3), _records.Selection);
    }

    // multiselect
    return (0, _getUpdatedRecord6.default)(state, stateKey, (_getUpdatedRecord4 = {}, _defineProperty(_getUpdatedRecord4, id, isSelectAction), _defineProperty(_getUpdatedRecord4, 'indexes', indexes), _defineProperty(_getUpdatedRecord4, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _getUpdatedRecord4), _records.Selection, 'mergeIn');
};

var setIndexes = exports.setIndexes = function setIndexes(ids) {
    var previous = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var isRemove = arguments[2];


    if (!isRemove) {
        if (Array.isArray(ids)) {

            ids.forEach(function (id) {
                if (previous.indexOf(id) === -1) {
                    previous.push(id);
                }
            });
        } else {

            if (previous.indexOf(ids) !== -1) {
                return previous;
            }

            previous.push(ids);
            return previous;
        }
    } else if (isRemove) {
        var idx = void 0;
        if (Array.isArray(ids)) {

            ids.forEach(function (id) {
                idx = previous.indexOf(id);
                if (idx !== -1) {
                    previous.splice(idx, 1);
                }
            });
        } else {
            idx = previous.indexOf(ids);

            if (idx !== -1) {
                previous.splice(idx, 1);
                return previous;
            }

            return previous;
        }
    }

    return previous;
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(selectAll, 'selectAll', 'src/reducers/actionHelpers/plugins/selection.js');

    __REACT_HOT_LOADER__.register(deselectAll, 'deselectAll', 'src/reducers/actionHelpers/plugins/selection.js');

    __REACT_HOT_LOADER__.register(removeSelections, 'removeSelections', 'src/reducers/actionHelpers/plugins/selection.js');

    __REACT_HOT_LOADER__.register(selectRow, 'selectRow', 'src/reducers/actionHelpers/plugins/selection.js');

    __REACT_HOT_LOADER__.register(deselectRow, 'deselectRow', 'src/reducers/actionHelpers/plugins/selection.js');

    __REACT_HOT_LOADER__.register(setSelection, 'setSelection', 'src/reducers/actionHelpers/plugins/selection.js');

    __REACT_HOT_LOADER__.register(setIndexes, 'setIndexes', 'src/reducers/actionHelpers/plugins/selection.js');
}();

;