'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filterData = exports.clearFilter = exports.sortData = exports.insertRow = exports.saveRow = exports.setTreeNodeVisibility = exports.moveNode = exports.addNewRow = exports.updateRow = exports.removeRow = exports.dismissEditor = exports.setPartialTreeData = exports.setData = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _immutable = require('immutable');

var _lastUpdate = require('./../../util/lastUpdate');

var _records = require('./../../records');

var _getTreePathFromId = require('./../../util/getTreePathFromId');

var _moveTreeNode = require('./../../util/moveTreeNode');

var _setTreeValue = require('./../../util/setTreeValue');

var _treeToFlatList = require('./../../util/treeToFlatList');

var _getData = require('./../../util/getData');

var _getUpdatedRecord = require('./../../util/getUpdatedRecord');

var _getUpdatedRecord2 = _interopRequireDefault(_getUpdatedRecord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _arrayFrom2.default)(arr); } }

var setData = exports.setData = function setData(state, _ref) {
    var currentRecords = _ref.currentRecords,
        data = _ref.data,
        gridType = _ref.gridType,
        stateKey = _ref.stateKey,
        treeData = _ref.treeData,
        total = _ref.total;


    var keyedData = (0, _getData.setKeysInData)(data);
    var keyedCurr = void 0;

    if (currentRecords) {
        keyedCurr = (0, _getData.setKeysInData)(currentRecords);
    }

    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        data: keyedData,
        proxy: keyedData,
        total: total || keyedData.count(),
        treeData: (0, _immutable.fromJS)(treeData),
        gridType: gridType || 'grid',
        currentRecords: keyedCurr ? keyedCurr : keyedData,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.DataSource);
};

var setPartialTreeData = exports.setPartialTreeData = function setPartialTreeData(state, _ref2) {
    var data = _ref2.data,
        parentId = _ref2.parentId,
        showTreeRootNode = _ref2.showTreeRootNode,
        stateKey = _ref2.stateKey;


    var tree = state.getIn([stateKey, 'treeData']);
    var flat = state.getIn([stateKey, 'data']);
    var pathToNode = [-1].concat(_toConsumableArray((0, _getTreePathFromId.getTreePathFromId)(flat, parentId)));
    var updatedTree = (0, _setTreeValue.setTreeValue)(tree, pathToNode, { children: data });

    var updatedFlat = (0, _treeToFlatList.treeToFlatList)(updatedTree);

    if (!showTreeRootNode) {
        updatedFlat = updatedFlat.shift();
    }

    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        data: updatedFlat,
        currentRecords: updatedFlat,
        treeData: updatedTree,
        proxy: updatedFlat,
        total: updatedFlat.count(),
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.DataSource, 'mergeIn');
};

var dismissEditor = exports.dismissEditor = function dismissEditor(state, _ref3) {
    var stateKey = _ref3.stateKey;

    var previousData = state.getIn([stateKey, 'data']);
    var previousProxy = state.getIn([stateKey, 'proxy']);
    var previousTotal = state.getIn([stateKey, 'total']);

    // upon dismiss, if a new row was in edit
    // but isn't save, update the total to reflect that
    if (previousData && previousProxy && previousData.size > previousProxy.size) {
        previousTotal = previousTotal - 1;
    }
    var record = state.get(stateKey);

    if (record) {
        return (0, _getUpdatedRecord2.default)(state, stateKey, {
            data: previousProxy,
            proxy: previousProxy,
            currentRecords: previousProxy,
            isEditing: false,
            total: previousTotal,
            lastUpdate: (0, _lastUpdate.generateLastUpdate)()
        }, _records.DataSource, 'mergeIn');
    }

    return state;
};

var removeRow = exports.removeRow = function removeRow(state, _ref4) {
    var stateKey = _ref4.stateKey,
        rowIndex = _ref4.rowIndex;

    var existingState = state.get(stateKey);
    var currentTotal = existingState.get('total');

    var remainingRows = state.getIn([stateKey, 'data']).remove(rowIndex || 0, 1);

    var updatedTotal = existingState && currentTotal && currentTotal > 0 ? currentTotal - 1 : 0;

    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        data: remainingRows,
        proxy: remainingRows,
        currentRecords: remainingRows,
        total: updatedTotal,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.DataSource, 'mergeIn');
};

var updateRow = exports.updateRow = function updateRow(state, _ref5) {
    var rowIndex = _ref5.rowIndex,
        stateKey = _ref5.stateKey,
        values = _ref5.values;


    var data = state.getIn([stateKey, 'data']);
    var row = data ? data.get(rowIndex) : null;

    if (!row) {
        return state;
    }

    var updatedRow = row.merge(values);
    var updatedData = state.getIn([stateKey, 'data']).set(rowIndex, updatedRow);

    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        data: updatedData,
        proxy: updatedData,
        currentRecords: updatedData,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.DataSource, 'mergeIn');
};

var addNewRow = exports.addNewRow = function addNewRow(state, _ref6) {
    var rowId = _ref6.rowId,
        stateKey = _ref6.stateKey,
        rowIndex = _ref6.rowIndex;

    var existingState = state.get(stateKey);
    var isEditing = existingState && existingState.get('isEditing');
    var data = existingState && existingState.get('data');

    if (existingState && isEditing) {
        return state;
    }

    var newRow = data && data.size > 0 && data.get(0) ? data.get(0).reduce(function (p, i, c) {
        return p.set(c, '');
    }, (0, _immutable.fromJS)({})) : (0, _immutable.fromJS)({});

    newRow = newRow.set('_key', rowId);

    if (!data) {
        data = new _immutable.List();
    }

    var updatedTotal = existingState && existingState.get('total') ? existingState.get('total') : 0;

    rowIndex = rowIndex === undefined ? 0 : rowIndex;

    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        data: data.insert(rowIndex, newRow),
        proxy: data,
        isEditing: true,
        total: updatedTotal + 1,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.DataSource, 'mergeIn');
};

var moveNode = exports.moveNode = function moveNode(state, _ref7) {
    var current = _ref7.current,
        next = _ref7.next,
        showTreeRootNode = _ref7.showTreeRootNode,
        stateKey = _ref7.stateKey;

    var nextPath = (0, _immutable.List)(next.path);
    var tree = state.getIn([stateKey, 'treeData']);
    var currentPath = (0, _immutable.List)(current.path);

    var newTreeMove = (0, _moveTreeNode.moveTreeNode)(tree, current.index, currentPath, next.index, nextPath);

    var flatMove = (0, _treeToFlatList.treeToFlatList)(newTreeMove);

    // remove root-node
    if (!showTreeRootNode) {
        flatMove = flatMove.shift();
    }

    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        data: flatMove,
        currentRecords: flatMove,
        treeData: newTreeMove,
        proxy: flatMove,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.DataSource, 'mergeIn');
};

var setTreeNodeVisibility = exports.setTreeNodeVisibility = function setTreeNodeVisibility(state, _ref8) {
    var id = _ref8.id,
        showTreeRootNode = _ref8.showTreeRootNode,
        stateKey = _ref8.stateKey;


    var flat = state.getIn([stateKey, 'data']);
    var tree = state.getIn([stateKey, 'treeData']);

    var currentVisibility = !!flat.find(function (node) {
        return node.get('_id') === id;
    }).get('_hideChildren');

    var path = [-1].concat(_toConsumableArray((0, _getTreePathFromId.getTreePathFromId)(flat, id)));

    var updatedTree = (0, _setTreeValue.setTreeValue)(tree, path, { _hideChildren: !currentVisibility });

    var updatedList = (0, _treeToFlatList.treeToFlatList)(updatedTree);

    // remove root-node
    if (!showTreeRootNode) {
        updatedList = updatedList.shift();
    }

    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        data: updatedList,
        currentRecords: updatedList,
        treeData: updatedTree,
        proxy: updatedList,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.DataSource, 'mergeIn');
};

var saveRow = exports.saveRow = function saveRow(state, _ref9) {
    var rowIndex = _ref9.rowIndex,
        stateKey = _ref9.stateKey,
        values = _ref9.values;

    var data = state.getIn([stateKey, 'data']).set(rowIndex, (0, _immutable.fromJS)(values));

    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        data: data,
        proxy: data,
        currentRecords: data,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.DataSource, 'mergeIn');
};

var insertRow = exports.insertRow = function insertRow(state, _ref10) {
    var data = _ref10.data,
        index = _ref10.index,
        stateKey = _ref10.stateKey;

    var prevData = state.getIn([stateKey, 'data']);
    var newData = prevData ? prevData.insert(index, (0, _immutable.fromJS)(data)) : new _immutable.List((0, _immutable.fromJS)(data));

    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        data: newData,
        proxy: newData,
        currentRecords: newData,
        total: newData.size,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.DataSource, 'mergeIn');
};

var sortData = exports.sortData = function sortData(state, _ref11) {
    var data = _ref11.data,
        stateKey = _ref11.stateKey;
    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        data: data,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.DataSource, 'mergeIn');
};

var clearFilter = exports.clearFilter = function clearFilter(state, _ref12) {
    var stateKey = _ref12.stateKey;

    var proxy = state.getIn([stateKey, 'proxy']);
    var prevData = state.getIn([stateKey, 'data']);
    var recs = proxy || prevData;

    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        data: recs,
        proxy: recs,
        currentRecords: recs,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.DataSource, 'mergeIn');
};

var filterData = exports.filterData = function filterData(state, _ref13) {
    var data = _ref13.data,
        stateKey = _ref13.stateKey;
    return (0, _getUpdatedRecord2.default)(state, stateKey, {
        data: data,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }, _records.DataSource, 'mergeIn');
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setData, 'setData', 'src/reducers/actionHelpers/datasource.js');

    __REACT_HOT_LOADER__.register(setPartialTreeData, 'setPartialTreeData', 'src/reducers/actionHelpers/datasource.js');

    __REACT_HOT_LOADER__.register(dismissEditor, 'dismissEditor', 'src/reducers/actionHelpers/datasource.js');

    __REACT_HOT_LOADER__.register(removeRow, 'removeRow', 'src/reducers/actionHelpers/datasource.js');

    __REACT_HOT_LOADER__.register(updateRow, 'updateRow', 'src/reducers/actionHelpers/datasource.js');

    __REACT_HOT_LOADER__.register(addNewRow, 'addNewRow', 'src/reducers/actionHelpers/datasource.js');

    __REACT_HOT_LOADER__.register(moveNode, 'moveNode', 'src/reducers/actionHelpers/datasource.js');

    __REACT_HOT_LOADER__.register(setTreeNodeVisibility, 'setTreeNodeVisibility', 'src/reducers/actionHelpers/datasource.js');

    __REACT_HOT_LOADER__.register(saveRow, 'saveRow', 'src/reducers/actionHelpers/datasource.js');

    __REACT_HOT_LOADER__.register(insertRow, 'insertRow', 'src/reducers/actionHelpers/datasource.js');

    __REACT_HOT_LOADER__.register(sortData, 'sortData', 'src/reducers/actionHelpers/datasource.js');

    __REACT_HOT_LOADER__.register(clearFilter, 'clearFilter', 'src/reducers/actionHelpers/datasource.js');

    __REACT_HOT_LOADER__.register(filterData, 'filterData', 'src/reducers/actionHelpers/datasource.js');
}();

;