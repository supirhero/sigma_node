'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EmptyHeader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmptyHeader = exports.EmptyHeader = function EmptyHeader(props) {

    var headerProps = _extends({
        style: {
            width: '100%'
        },
        key: 'react-grid-empty-header'
    }, props);

    return _react2.default.createElement('th', headerProps);
};

var object = _propTypes2.default.object;


EmptyHeader.propTypes = {
    props: object
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(EmptyHeader, 'EmptyHeader', 'src/components/layout/header/EmptyHeader.jsx');

    __REACT_HOT_LOADER__.register(object, 'object', 'src/components/layout/header/EmptyHeader.jsx');
}();

;