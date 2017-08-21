'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cleanProps = exports.Editor = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Input = require('./Input');

var _GridConstants = require('./../../../../../constants/GridConstants');

var _prefix = require('./../../../../../util/prefix');

var _fire = require('./../../../../../util/fire');

var _getData = require('./../../../../../util/getData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Editor = exports.Editor = function Editor(_ref) {
    var cellData = _ref.cellData,
        columns = _ref.columns,
        editorState = _ref.editorState,
        events = _ref.events,
        rawValue = _ref.rawValue,
        index = _ref.index,
        isEditable = _ref.isEditable,
        row = _ref.row,
        isRowSelected = _ref.isRowSelected,
        rowId = _ref.rowId,
        stateKey = _ref.stateKey,
        store = _ref.store;

    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    var colName = columns && columns[index] ? (0, _getData.nameFromDataIndex)(columns[index]) : '';

    if (!colName) {
        colName = columns && columns[index] && columns[index].name ? columns[index].name : '';
    }

    var editorData = editorState ? editorState.get(rowId) || new Map() : new Map();

    var invalid = editorData && editorData.invalidCells && editorData.invalidCells.contains(colName) ? true : null;

    var value = editorData.values && editorData.values.get ? editorData.values.get(colName) : rawValue;

    var editableFuncArgs = {
        row: editorData && editorData.toJS ? editorData.toJS() : editorData || {},
        isRowSelected: isRowSelected,
        store: store
    };

    var wrapperCls = (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER, invalid ? CLASS_NAMES.EDITOR.INVALID : '');

    var onFocus = function onFocus() {
        return (0, _fire.fireEvent)('HANDLE_EDITOR_FOCUS', events, {
            column: columns[index],
            rowId: rowId,
            editor: editorData
        });
    };

    var onBlur = function onBlur() {
        return (0, _fire.fireEvent)('HANDLE_EDITOR_BLUR', events, {
            column: columns[index],
            rowId: rowId,
            editor: editorData
        });
    };

    if (isEditable && columns[index] && columns[index].editor && (columns[index].editable === undefined || columns[index].editable) && (typeof columns[index].editable === 'function' ? columns[index].editable(editableFuncArgs) : true) && typeof columns[index].editor === 'function') {

        var input = columns[index].editor({
            column: columns[index],
            columns: columns,
            store: store,
            rowId: rowId,
            onFocus: onFocus,
            onBlur: onBlur,
            row: editorData && editorData.values && editorData.toJS ? _extends({}, row, cleanProps(editorData.values.toJS())) : _extends({ key: rowId }, row),
            columnIndex: index,
            value: value && value.toJS ? value.toJS() : value,
            isRowSelected: isRowSelected,
            stateKey: stateKey,
            isCreate: editorData.isCreate
        });

        return _react2.default.createElement(
            'span',
            { className: wrapperCls },
            input
        );
    } else if (isEditable && columns[index] && (columns[index].editable === undefined || columns[index].editable) && (typeof columns[index].editable === 'function' ? columns[index].editable(editableFuncArgs) : true)) {

        return _react2.default.createElement(
            'span',
            { className: wrapperCls },
            _react2.default.createElement(_Input.Input, {
                cellData: value,
                column: columns[index],
                columns: columns,
                editorState: editorState,
                onBlur: onBlur,
                onFocus: onFocus,
                rowId: rowId,
                stateKey: stateKey,
                store: store
            })
        );
    }

    return _react2.default.createElement(
        'span',
        { className: (0, _prefix.prefix)(CLASS_NAMES.INACTIVE_CLASS) },
        cellData
    );
};

var cleanProps = exports.cleanProps = function cleanProps() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    Object.keys(obj).forEach(function (k) {
        return obj[k] === undefined && delete obj[k];
    });
    return obj;
};

var any = _propTypes2.default.any,
    array = _propTypes2.default.array,
    bool = _propTypes2.default.bool,
    number = _propTypes2.default.number,
    object = _propTypes2.default.object,
    string = _propTypes2.default.string;


Editor.propTypes = {
    cellData: any,
    columns: array,
    editorState: object,
    events: object,
    index: number,
    isEditable: bool,
    isRowSelected: bool,
    rawValue: any,
    row: object,
    rowId: string,
    stateKey: string,
    store: object
};

Editor.defaultProps = {
    isRowSelected: false
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Editor, 'Editor', 'src/components/layout/table-row/row/cell/Editor.jsx');

    __REACT_HOT_LOADER__.register(cleanProps, 'cleanProps', 'src/components/layout/table-row/row/cell/Editor.jsx');

    __REACT_HOT_LOADER__.register(any, 'any', 'src/components/layout/table-row/row/cell/Editor.jsx');

    __REACT_HOT_LOADER__.register(array, 'array', 'src/components/layout/table-row/row/cell/Editor.jsx');

    __REACT_HOT_LOADER__.register(bool, 'bool', 'src/components/layout/table-row/row/cell/Editor.jsx');

    __REACT_HOT_LOADER__.register(number, 'number', 'src/components/layout/table-row/row/cell/Editor.jsx');

    __REACT_HOT_LOADER__.register(object, 'object', 'src/components/layout/table-row/row/cell/Editor.jsx');

    __REACT_HOT_LOADER__.register(string, 'string', 'src/components/layout/table-row/row/cell/Editor.jsx');
}();

;