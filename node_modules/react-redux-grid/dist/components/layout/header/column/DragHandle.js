'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DragHandle = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragHandle = exports.DragHandle = function DragHandle(_ref) {
    var dragAndDropManager = _ref.dragAndDropManager,
        handleDrag = _ref.handleDrag;
    return _react2.default.createElement('span', _extends({
        draggable: true
    }, dragAndDropManager.initDragable({
        onDrag: handleDrag,
        draggable: true
    })));
};

var object = _propTypes2.default.object,
    func = _propTypes2.default.func;


DragHandle.propTypes = {
    col: object,
    dragAndDropManager: object,
    handleDrag: func
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(DragHandle, 'DragHandle', 'src/components/layout/header/column/DragHandle.jsx');

    __REACT_HOT_LOADER__.register(object, 'object', 'src/components/layout/header/column/DragHandle.jsx');

    __REACT_HOT_LOADER__.register(func, 'func', 'src/components/layout/header/column/DragHandle.jsx');
}();

;