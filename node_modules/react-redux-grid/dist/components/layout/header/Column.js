'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isColumnResizable = exports.getWidth = exports.isSortable = exports.handleColumnClick = exports.handleSort = exports.handleDrop = exports.Column = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DragHandle = require('./column/DragHandle');

var _SortHandle = require('./column/SortHandle');

var _Text = require('./column/Text');

var _keyGenerator = require('./../../../util/keyGenerator');

var _prefix = require('./../../../util/prefix');

var _GridConstants = require('./../../../constants/GridConstants');

var _ColumnManager = require('./../../../actions/core/ColumnManager');

var _GridActions = require('./../../../actions/GridActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

var Column = exports.Column = function Column(_ref) {
    var actualIndex = _ref.actualIndex,
        scope = _ref.scope,
        col = _ref.col,
        columns = _ref.columns,
        columnManager = _ref.columnManager,
        dataSource = _ref.dataSource,
        dragAndDropManager = _ref.dragAndDropManager,
        filterFields = _ref.filterFields,
        pageSize = _ref.pageSize,
        pager = _ref.pager,
        store = _ref.store,
        stateKey = _ref.stateKey,
        index = _ref.index,
        stateful = _ref.stateful;


    if (col.hidden) {
        return false;
    }

    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    var isResizable = isColumnResizable(col, columnManager);

    var sortable = isSortable(col, columnManager);

    var visibleColumns = columns.filter(function (c) {
        return !c.hidden;
    });

    var sortedColumn = columns.find(function (c) {
        return c.sortDirection;
    });

    var shouldShowCaret = sortedColumn ? sortedColumn.dataIndex === col.dataIndex : col.defaultSortDirection;

    var direction = col.sortDirection || col.defaultSortDirection || _GridConstants.SORT_DIRECTIONS.ASCEND;

    var sortHandleCls = shouldShowCaret ? (0, _prefix.prefix)(CLASS_NAMES.SORT_HANDLE_VISIBLE) : '';

    var key = (0, _keyGenerator.keyGenerator)(col.name, 'grid-column');

    var nextColumnKey = visibleColumns && visibleColumns[index + 1] ? (0, _keyGenerator.keyGenerator)(visibleColumns[index + 1].name, 'grid-column') : null;

    var handleDrag = scope.handleDrag.bind(scope, scope, columns, key, columnManager, store, nextColumnKey, stateKey, stateful);

    var sortHandle = sortable ? _react2.default.createElement(_SortHandle.SortHandle, {
        col: col,
        columns: columns,
        columnManager: columnManager,
        dataSource: dataSource,
        direction: direction,
        pager: pager,
        sortHandleCls: sortHandleCls,
        store: store }) : null;

    var dragHandle = isResizable ? _react2.default.createElement(_DragHandle.DragHandle, { col: col, dragAndDropManager: dragAndDropManager, handleDrag: handleDrag }) : null;

    var headerClass = col.className ? col.className + ' ' + (isResizable ? (0, _prefix.prefix)('resizable') : '') : '' + (isResizable ? (0, _prefix.prefix)('resizable') : '');

    if (sortHandleCls) {
        headerClass = headerClass + ' ' + sortHandleCls;
    }

    if (col.sortable) {
        headerClass = headerClass + ' ' + (0, _prefix.prefix)('is-sortable');
    }

    if (index === 0) {
        headerClass = headerClass + ' ' + (0, _prefix.prefix)('is-first-column');
    }

    var clickArgs = {
        columns: columns,
        col: col,
        columnManager: columnManager,
        dataSource: dataSource,
        direction: direction,
        filterFields: filterFields,
        pageSize: pageSize,
        pager: pager,
        stateKey: stateKey,
        store: store
    };

    var headerProps = {
        className: headerClass,
        onClick: handleColumnClick.bind(scope, clickArgs),
        onDrop: handleDrop.bind(scope, actualIndex, columns, stateful, stateKey, store),
        onDragOver: function onDragOver(reactEvent) {
            reactEvent.preventDefault();
        },
        key: key,
        style: {
            width: getWidth(col, key, columns, columnManager.config.defaultColumnWidth, index)
        }
    };

    if (!isChrome) {
        headerProps.onDragOver = function (reactEvent) {
            // due to a bug in firefox, we need to set a global to
            // preserve the x coords
            // http://stackoverflow.com/questions/11656061/
            // event-clientx-showing-as-0-in-firefox-for-dragend-event
            window.reactGridXcoord = reactEvent.clientX;
            reactEvent.preventDefault();
        };
    }

    var innerHTML = _react2.default.createElement(_Text.Text, {
        actualIndex: actualIndex,
        col: col,
        index: index,
        columnManager: columnManager,
        dragAndDropManager: dragAndDropManager,
        sortHandle: sortHandle
    });

    return _react2.default.createElement(
        'th',
        headerProps,
        innerHTML,
        dragHandle
    );
};

Column.propTypes = {
    actualIndex: _propTypes2.default.number,
    col: _propTypes2.default.object,
    columnManager: _propTypes2.default.object,
    columns: _propTypes2.default.arrayOf(_propTypes2.default.object),
    dataSource: _propTypes2.default.object,
    dragAndDropManager: _propTypes2.default.object,
    filterFields: _propTypes2.default.object,
    index: _propTypes2.default.number,
    pageSize: _propTypes2.default.number,
    pager: _propTypes2.default.object,
    scope: _propTypes2.default.object,
    stateKey: _propTypes2.default.string,
    stateful: _propTypes2.default.bool,
    store: _propTypes2.default.object
};

var handleDrop = exports.handleDrop = function handleDrop(droppedIndex, columns, stateful, stateKey, store, reactEvent) {

    reactEvent.preventDefault();
    try {
        var colData = reactEvent && reactEvent.dataTransfer.getData ? JSON.parse(reactEvent.dataTransfer.getData('Text')) : null;

        if (colData) {
            store.dispatch((0, _ColumnManager.reorderColumn)({
                draggedIndex: colData.index,
                droppedIndex: droppedIndex,
                columns: columns,
                stateKey: stateKey,
                stateful: stateful
            }));
        }
    } catch (e) {
        /* eslint-disable no-console */
        console.warn('Invalid drop');
        /* eslint-enable no-console */
    }
};

var handleSort = exports.handleSort = function handleSort(columns, col, columnManager, dataSource, direction, filterFields, pageSize, pager, stateKey, store) {

    var newDirection = direction === _GridConstants.SORT_DIRECTIONS.ASCEND ? _GridConstants.SORT_DIRECTIONS.DESCEND : _GridConstants.SORT_DIRECTIONS.ASCEND;

    store.dispatch((0, _GridActions.setSortDirection)({
        columns: columns,
        id: col.id,
        sortDirection: newDirection,
        stateKey: stateKey
    }));

    if (columnManager.config.sortable.method.toUpperCase() === _GridConstants.SORT_METHODS.LOCAL) {
        columnManager.doSort({
            method: _GridConstants.SORT_METHODS.LOCAL,
            column: col,
            direction: newDirection,
            dataSource: dataSource,
            filterFields: filterFields,
            pageSize: pageSize,
            pagerState: null,
            stateKey: stateKey
        });
    } else if (columnManager.config.sortable.method.toUpperCase() === _GridConstants.SORT_METHODS.REMOTE) {
        columnManager.doSort({
            method: _GridConstants.SORT_METHODS.REMOTE,
            column: col,
            direction: newDirection,
            dataSource: dataSource,
            filterFields: filterFields,
            pageSize: pageSize,
            pagerState: pager,
            stateKey: stateKey
        });
    } else {
        /* eslint-disable no-console */
        console.warn('Sort method not defined!');
        /* eslint-enable no-console */
    }
};

var handleColumnClick = exports.handleColumnClick = function handleColumnClick(_ref2) {
    var columns = _ref2.columns,
        col = _ref2.col,
        columnManager = _ref2.columnManager,
        dataSource = _ref2.dataSource,
        direction = _ref2.direction,
        filterFields = _ref2.filterFields,
        pageSize = _ref2.pageSize,
        pager = _ref2.pager,
        stateKey = _ref2.stateKey,
        store = _ref2.store;


    if (col.sortable || columnManager && columnManager.config && columnManager.config.sortable && columnManager.config.sortable.enabled && col.sortable !== false) {
        handleSort(columns, col, columnManager, dataSource, direction, filterFields, pageSize, pager, stateKey, store);
    }

    if (typeof col.HANDLE_CLICK === 'function') {
        col.HANDLE_CLICK({
            columns: columns,
            column: col,
            sortDirection: direction
        }, null);
    }
};

var isSortable = exports.isSortable = function isSortable(col, columnManager) {

    if (col.sortable !== undefined) {
        return col.sortable;
    } else if (columnManager.config.sortable.enabled !== undefined) {
        return columnManager.config.sortable.enabled;
    }

    return columnManager.config.defaultSortable;
};

var getWidth = exports.getWidth = function getWidth(col, key, columns, defaultColumnWidth) {

    var visibleColumns = columns.filter(function (_col) {
        return !_col.hidden;
    });
    var lastColumn = visibleColumns[visibleColumns.length - 1];
    var isLastColumn = lastColumn && lastColumn.name === col.name;
    var totalWidth = columns.reduce(function (a, _col) {
        if (_col.hidden) {
            return a + 0;
        }
        return a + parseFloat(_col.width || defaultColumnWidth);
    }, 0);

    var width = col.width || defaultColumnWidth;

    if (isLastColumn && totalWidth !== 0 && totalWidth < 100) {
        width = 100 - (totalWidth - parseFloat(width)) + '%';
    }

    return width;
};

var isColumnResizable = exports.isColumnResizable = function isColumnResizable(col, columnManager) {

    if (col.resizable !== undefined) {
        return col.resizable;
    } else if (columnManager.config.resizable !== undefined) {
        return columnManager.config.resizable;
    }

    return columnManager.config.defaultResizable;
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(isChrome, 'isChrome', 'src/components/layout/header/Column.jsx');

    __REACT_HOT_LOADER__.register(Column, 'Column', 'src/components/layout/header/Column.jsx');

    __REACT_HOT_LOADER__.register(handleDrop, 'handleDrop', 'src/components/layout/header/Column.jsx');

    __REACT_HOT_LOADER__.register(handleSort, 'handleSort', 'src/components/layout/header/Column.jsx');

    __REACT_HOT_LOADER__.register(handleColumnClick, 'handleColumnClick', 'src/components/layout/header/Column.jsx');

    __REACT_HOT_LOADER__.register(isSortable, 'isSortable', 'src/components/layout/header/Column.jsx');

    __REACT_HOT_LOADER__.register(getWidth, 'getWidth', 'src/components/layout/header/Column.jsx');

    __REACT_HOT_LOADER__.register(isColumnResizable, 'isColumnResizable', 'src/components/layout/header/Column.jsx');
}();

;