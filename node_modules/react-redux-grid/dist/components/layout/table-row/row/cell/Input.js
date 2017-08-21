'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleChange = exports.Input = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EditorActions = require('./../../../../../actions/plugins/editor/EditorActions');

var _getData = require('./../../../../../util/getData');

var _records = require('./../../../../../records');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var any = _propTypes2.default.any,
    array = _propTypes2.default.array,
    func = _propTypes2.default.func,
    object = _propTypes2.default.object,
    string = _propTypes2.default.string;
var Input = exports.Input = function Input(_ref) {
    var cellData = _ref.cellData,
        column = _ref.column,
        columns = _ref.columns,
        editorState = _ref.editorState,
        onBlur = _ref.onBlur,
        onFocus = _ref.onFocus,
        rowId = _ref.rowId,
        stateKey = _ref.stateKey,
        store = _ref.store;


    var colName = (0, _getData.nameFromDataIndex)(column);
    var editorData = editorState && editorState.get ? editorState.get(rowId) : new _records.Editor();

    var overrides = editorData && editorData.values && editorData.overrides[colName] !== undefined ? editorData.overrides[colName] : {};

    var placeholder = column && column.placeholder ? column.placeholder : null;

    var value = editorData && editorData.values && editorData.values[colName] !== undefined ? editorData.values[colName] : cellData;

    var disabled = overrides.disabled || editorState && editorData && !editorData.isCreate && column.editable === 'create';

    var onChange = function onChange(e) {
        return handleChange(column, columns, rowId, stateKey, store, e);
    };

    return _react2.default.createElement('input', {
        disabled: disabled,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        placeholder: placeholder,
        type: 'text',
        value: value
    });
};

var handleChange = exports.handleChange = function handleChange(columnDefinition, columns, rowId, stateKey, store, reactEvent) {

    store.dispatch((0, _EditorActions.updateCellValue)({
        value: reactEvent.target.value,
        name: (0, _getData.nameFromDataIndex)(columnDefinition),
        column: columnDefinition,
        rowId: rowId,
        columns: columns,
        stateKey: stateKey
    }));
};

Input.propTypes = {
    cellData: any,
    column: object,
    columns: array,
    editorState: object,
    onBlur: func,
    onFocus: func,
    rowId: string,
    stateKey: string,
    store: object
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(any, 'any', 'src/components/layout/table-row/row/cell/Input.jsx');

    __REACT_HOT_LOADER__.register(array, 'array', 'src/components/layout/table-row/row/cell/Input.jsx');

    __REACT_HOT_LOADER__.register(func, 'func', 'src/components/layout/table-row/row/cell/Input.jsx');

    __REACT_HOT_LOADER__.register(object, 'object', 'src/components/layout/table-row/row/cell/Input.jsx');

    __REACT_HOT_LOADER__.register(string, 'string', 'src/components/layout/table-row/row/cell/Input.jsx');

    __REACT_HOT_LOADER__.register(Input, 'Input', 'src/components/layout/table-row/row/cell/Input.jsx');

    __REACT_HOT_LOADER__.register(handleChange, 'handleChange', 'src/components/layout/table-row/row/cell/Input.jsx');
}();

;