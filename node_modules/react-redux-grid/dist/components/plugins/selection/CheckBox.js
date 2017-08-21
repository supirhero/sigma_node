'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectedCheckBox = exports.getColumn = exports.getHeader = exports.handleChange = exports.CheckBox = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _prefix = require('../../../util/prefix');

var _fire = require('../../../util/fire');

var _stateGetter = require('../../../util/stateGetter');

var _GridConstants = require('../../../constants/GridConstants');

var _ModelActions = require('../../../actions/plugins/selection/ModelActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckBox = exports.CheckBox = function CheckBox(_ref) {
    var dataSource = _ref.dataSource,
        events = _ref.events,
        index = _ref.index,
        isSelected = _ref.isSelected,
        onSelect = _ref.onSelect,
        rowData = _ref.rowData,
        rowId = _ref.rowId,
        selectedRows = _ref.selectedRows,
        selectionModelConfig = _ref.selectionModelConfig,
        stateKey = _ref.stateKey,
        store = _ref.store,
        type = _ref.type;

    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    var checkBoxContainerProps = {
        className: (0, _prefix.prefix)(CLASS_NAMES.SELECTION_MODEL.CHECKBOX_CONTAINER, type === 'header' && selectionModelConfig.mode === _GridConstants.SELECTION_MODES.checkboxSingle ? 'hidden' : '')
    };

    var checked = selectedRows && selectedRows.get && selectedRows.get(rowId) !== undefined ? selectedRows.get(rowId) : false;

    if (type === 'header') {
        // check to see if all rows are selected
        // lastUpdate && the header checkbox itself
        checked = selectedRows && selectedRows.count && selectedRows.every(function (s) {
            return s;
        }) ? selectedRows.count() - 2 === dataSource.currentRecords.count() : false;
    }

    var checkBoxProps = {
        className: (0, _prefix.prefix)(CLASS_NAMES.SELECTION_MODEL.CHECKBOX),
        checked: checked,
        type: 'checkbox',
        onChange: handleChange.bind(undefined, dataSource, store, type, stateKey, onSelect, rowId, index, rowData, selectionModelConfig, isSelected, events)
    };

    return type === 'header' ? getHeader(checkBoxContainerProps, checkBoxProps) : getColumn(checkBoxContainerProps, checkBoxProps);
};

var handleChange = exports.handleChange = function handleChange(dataSource, store, type, stateKey, onSelect, id, index, rowData, selectionModelConfig, isSelected, events, reactEvent) {

    var target = reactEvent.target;

    if (type === 'header') {

        if (target.checked) {
            store.dispatch((0, _ModelActions.selectAll)({ stateKey: stateKey, data: dataSource }));

            (0, _fire.fireEvent)('HANDLE_AFTER_SELECT_ALL', events, {
                data: dataSource,
                store: store
            }, reactEvent);
        } else {
            store.dispatch((0, _ModelActions.deselectAll)({ stateKey: stateKey }));

            (0, _fire.fireEvent)('HANDLE_AFTER_DESELECT_ALL', events, {
                data: dataSource,
                store: store
            }, reactEvent);
        }
    } else if (selectionModelConfig.selectionEvent !== 'singleclick') {
        reactEvent.stopPropagation();
        onSelect({ id: id, index: index, data: rowData, selected: isSelected });
    }
};

var getHeader = exports.getHeader = function getHeader(checkBoxContainerProps, checkBoxProps) {

    return _react2.default.createElement(
        'th',
        checkBoxContainerProps,
        _react2.default.createElement('input', _extends({
            type: 'checkbox'
        }, checkBoxProps))
    );
};

var getColumn = exports.getColumn = function getColumn(checkBoxContainerProps, checkBoxProps) {
    return _react2.default.createElement(
        'td',
        checkBoxContainerProps,
        _react2.default.createElement('input', _extends({
            type: 'checkbox'
        }, checkBoxProps))
    );
};

var any = _propTypes2.default.any,
    func = _propTypes2.default.func,
    number = _propTypes2.default.number,
    object = _propTypes2.default.object,
    string = _propTypes2.default.string,
    oneOfType = _propTypes2.default.oneOfType;


CheckBox.propTypes = {
    dataSource: object,
    index: number,
    onSelect: func,
    reducerKeys: oneOfType([object, string]),
    rowId: any,
    selectedRows: object,
    selectionModelConfig: object,
    store: object,
    type: string
};

CheckBox.defaultProps = {
    selectionModelConfig: {}
};

function mapStateToProps(state, props) {
    return {
        dataSource: (0, _stateGetter.stateGetter)(state, props, 'dataSource', props.stateKey),
        selectedRows: (0, _stateGetter.stateGetter)(state, props, 'selection', props.stateKey)
    };
}

var ConnectedCheckBox = (0, _reactRedux.connect)(mapStateToProps)(CheckBox);

exports.ConnectedCheckBox = ConnectedCheckBox;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(CheckBox, 'CheckBox', 'src/components/plugins/selection/CheckBox.jsx');

    __REACT_HOT_LOADER__.register(handleChange, 'handleChange', 'src/components/plugins/selection/CheckBox.jsx');

    __REACT_HOT_LOADER__.register(getHeader, 'getHeader', 'src/components/plugins/selection/CheckBox.jsx');

    __REACT_HOT_LOADER__.register(getColumn, 'getColumn', 'src/components/plugins/selection/CheckBox.jsx');

    __REACT_HOT_LOADER__.register(any, 'any', 'src/components/plugins/selection/CheckBox.jsx');

    __REACT_HOT_LOADER__.register(func, 'func', 'src/components/plugins/selection/CheckBox.jsx');

    __REACT_HOT_LOADER__.register(number, 'number', 'src/components/plugins/selection/CheckBox.jsx');

    __REACT_HOT_LOADER__.register(object, 'object', 'src/components/plugins/selection/CheckBox.jsx');

    __REACT_HOT_LOADER__.register(string, 'string', 'src/components/plugins/selection/CheckBox.jsx');

    __REACT_HOT_LOADER__.register(oneOfType, 'oneOfType', 'src/components/plugins/selection/CheckBox.jsx');

    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'src/components/plugins/selection/CheckBox.jsx');

    __REACT_HOT_LOADER__.register(ConnectedCheckBox, 'ConnectedCheckBox', 'src/components/plugins/selection/CheckBox.jsx');
}();

;