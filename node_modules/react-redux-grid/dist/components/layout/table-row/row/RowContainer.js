'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shouldComponentUpdate = require('../../../../util/shouldComponentUpdate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var object = _propTypes2.default.object;

var _default = function _default(DecoratedComponent) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
        _inherits(RowContainer, _Component);

        _createClass(RowContainer, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(DecoratedComponent, _extends({}, this.props, { getTreeData: this.getTreeData }));
            }
        }]);

        function RowContainer(props) {
            _classCallCheck(this, RowContainer);

            var _this = _possibleConstructorReturn(this, (RowContainer.__proto__ || Object.getPrototypeOf(RowContainer)).call(this, props));

            _this.getTreeData = function () {
                return _this.__getTreeData__REACT_HOT_LOADER__.apply(_this, arguments);
            };

            _this.shouldComponentUpdate = _shouldComponentUpdate.shouldRowUpdate.bind(_this);
            return _this;
        }

        _createClass(RowContainer, [{
            key: '__getTreeData__REACT_HOT_LOADER__',
            value: function __getTreeData__REACT_HOT_LOADER__() {
                return this.props.treeData;
            }
        }]);

        return RowContainer;
    }(_react.Component), _class.propTypes = {
        treeData: object
    }, _temp;
};

exports.default = _default;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(object, 'object', 'src/components/layout/table-row/row/RowContainer.jsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/components/layout/table-row/row/RowContainer.jsx');
}();

;