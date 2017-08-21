'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TableContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _GridConstants = require('./../../constants/GridConstants');

var _prefix = require('./../../util/prefix');

var _throttle = require('./../../util/throttle');

var _TableRow = require('./TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var any = _propTypes2.default.any,
    bool = _propTypes2.default.bool,
    number = _propTypes2.default.number,
    object = _propTypes2.default.object,
    oneOfType = _propTypes2.default.oneOfType,
    string = _propTypes2.default.string;

var TableContainer = exports.TableContainer = function (_Component) {
    _inherits(TableContainer, _Component);

    _createClass(TableContainer, [{
        key: 'render',
        value: function render() {
            var _gridConfig = (0, _GridConstants.gridConfig)(),
                CLASS_NAMES = _gridConfig.CLASS_NAMES;

            var _props = this.props,
                editorComponent = _props.editorComponent,
                headerProps = _props.headerProps,
                height = _props.height,
                rowProps = _props.rowProps,
                infinite = _props.infinite;
            var _state = this.state,
                containerScrollTop = _state.containerScrollTop,
                containerHeight = _state.containerHeight;


            return _react2.default.createElement(
                'div',
                {
                    className: (0, _prefix.prefix)(CLASS_NAMES.TABLE_CONTAINER),
                    style: { height: height !== false ? height : null }
                },
                _react2.default.createElement(
                    'table',
                    {
                        cellSpacing: 0,
                        className: (0, _prefix.prefix)(CLASS_NAMES.TABLE, CLASS_NAMES.HEADER_HIDDEN)
                    },
                    _react2.default.createElement(_Header2.default, headerProps),
                    _react2.default.createElement(_TableRow2.default, _extends({
                        containerHeight: containerHeight,
                        containerScrollTop: containerScrollTop,
                        infinite: infinite
                    }, rowProps))
                ),
                editorComponent
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var infinite = this.props.infinite;


            if (infinite) {
                var container = _reactDom2.default.findDOMNode(this);

                this._scrollListener = (0, _throttle.throttle)(this.handleScroll.bind(this), this, 50, { leading: false, trailing: true });

                container.addEventListener('scroll', this._scrollListener);

                this._resizeListener = (0, _throttle.debounce)(this.handleResize.bind(this), 5);

                window.addEventListener('resize', this._resizeListener);

                this.handleResize();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.handleResize();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var container = _reactDom2.default.findDOMNode(this);

            container.removeEventListener('scroll', this._scrollListener);
            window.removeEventListener('resize', this._resizeListener);
        }
    }]);

    function TableContainer(props) {
        _classCallCheck(this, TableContainer);

        var _this = _possibleConstructorReturn(this, (TableContainer.__proto__ || Object.getPrototypeOf(TableContainer)).call(this, props));

        _this.handleResize = function () {
            return _this.__handleResize__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.handleScroll = function () {
            return _this.__handleScroll__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.state = {
            containerScrollTop: 0
        };
        return _this;
    }

    _createClass(TableContainer, [{
        key: '__handleResize__REACT_HOT_LOADER__',
        value: function __handleResize__REACT_HOT_LOADER__() {
            var infinite = this.props.infinite;
            var containerHeight = this.state.containerHeight;


            if (infinite) {
                var container = _reactDom2.default.findDOMNode(this);

                if (containerHeight !== container.clientHeight) {
                    this.setState({
                        containerHeight: container.clientHeight
                    });
                }
            }
        }
    }, {
        key: '__handleScroll__REACT_HOT_LOADER__',
        value: function __handleScroll__REACT_HOT_LOADER__() {
            var container = _reactDom2.default.findDOMNode(this);

            this.setState({
                containerScrollTop: container.scrollTop
            });
        }
    }]);

    return TableContainer;
}(_react.Component);

TableContainer.propTypes = {
    editorComponent: any,
    headerProps: object,
    height: oneOfType([bool, string, number]),
    infinite: bool,
    rowProps: object
};
TableContainer.defaultProps = {
    headerProps: {},
    rowProps: {}
};
var _default = TableContainer;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(any, 'any', 'src/components/layout/TableContainer.jsx');

    __REACT_HOT_LOADER__.register(bool, 'bool', 'src/components/layout/TableContainer.jsx');

    __REACT_HOT_LOADER__.register(number, 'number', 'src/components/layout/TableContainer.jsx');

    __REACT_HOT_LOADER__.register(object, 'object', 'src/components/layout/TableContainer.jsx');

    __REACT_HOT_LOADER__.register(oneOfType, 'oneOfType', 'src/components/layout/TableContainer.jsx');

    __REACT_HOT_LOADER__.register(string, 'string', 'src/components/layout/TableContainer.jsx');

    __REACT_HOT_LOADER__.register(TableContainer, 'TableContainer', 'src/components/layout/TableContainer.jsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/components/layout/TableContainer.jsx');
}();

;