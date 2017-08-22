'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEditAction = exports.Menu = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('./../../../core/menu/Menu');

var _handleEditClick = require('./../../../../util/handleEditClick');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = exports.Menu = function Menu(_ref) {
    var actions = _ref.actions,
        columns = _ref.columns,
        editor = _ref.editor,
        maxHeight = _ref.maxHeight,
        reducerKeys = _ref.reducerKeys,
        rowData = _ref.rowData,
        rowId = _ref.rowId,
        rowIndex = _ref.rowIndex,
        stateKey = _ref.stateKey,
        store = _ref.store,
        type = _ref.type;


    if (editor.config.enabled && type !== 'header') {
        actions.menu.unshift(getEditAction(editor, store, rowId, rowData, rowIndex, columns, stateKey));
    }

    var menuProps = _extends({}, actions, {
        metaData: {
            rowId: rowId,
            rowData: rowData && rowData.toJS ? rowData.toJS() : rowData,
            rowIndex: rowIndex
        },
        maxHeight: maxHeight,
        reducerKeys: reducerKeys,
        stateKey: stateKey,
        store: store
    });

    return _react2.default.createElement(_Menu.ConnectedMenu, menuProps);
};

var getEditAction = exports.getEditAction = function getEditAction(editor, store, rowId, rowData, rowIndex, columns, stateKey) {
    return {
        text: 'Edit',
        EVENT_HANDLER: _handleEditClick.handleEditClick.bind(undefined, editor, store, rowId, rowData, rowIndex, columns, stateKey, {}),
        key: 'grid-edit-action'
    };
};

Menu.propTypes = {
    actions: _propTypes2.default.object,
    columns: _propTypes2.default.arrayOf(_propTypes2.default.object),
    editor: _propTypes2.default.object,
    maxHeight: _propTypes2.default.number,
    reducerKeys: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
    rowData: _propTypes2.default.object,
    rowId: _propTypes2.default.string,
    rowIndex: _propTypes2.default.number,
    stateKey: _propTypes2.default.string,
    store: _propTypes2.default.object,
    type: _propTypes2.default.string
};

Menu.defaultProps = {};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Menu, 'Menu', 'src/components/plugins/gridactions/actioncolumn/Menu.jsx');

    __REACT_HOT_LOADER__.register(getEditAction, 'getEditAction', 'src/components/plugins/gridactions/actioncolumn/Menu.jsx');
}();

;