'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DragHandle = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prefix = require('./../../../../../util/prefix');

var _GridConstants = require('./../../../../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragHandle = exports.DragHandle = function DragHandle() {
    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    return _react2.default.createElement('span', {
        className: (0, _prefix.prefix)(CLASS_NAMES.ROW_DRAG_HANDLE)
    });
};

var object = _propTypes2.default.object;


DragHandle.propTypes = {
    store: object
};

DragHandle.defaultProps = {};

var _default = DragHandle;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(DragHandle, 'DragHandle', 'src/components/layout/table-row/row/cell/DragHandle.js');

    __REACT_HOT_LOADER__.register(object, 'object', 'src/components/layout/table-row/row/cell/DragHandle.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/components/layout/table-row/row/cell/DragHandle.js');
}();

;