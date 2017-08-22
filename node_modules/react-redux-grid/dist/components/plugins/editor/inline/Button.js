'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Button = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prefix = require('./../../../../util/prefix');

var _fire = require('./../../../../util/fire');

var _GridConstants = require('./../../../../constants/GridConstants');

var _EditorActions = require('./../../../../actions/plugins/editor/EditorActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = exports.Button = function (_Component) {
    _inherits(Button, _Component);

    function Button() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Button);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.listenForEnter = function () {
            var _this2;

            return (_this2 = _this).__listenForEnter__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.listenForCancel = function () {
            var _this3;

            return (_this3 = _this).__listenForCancel__REACT_HOT_LOADER__.apply(_this3, arguments);
        }, _this.handleButtonClick = function () {
            var _this4;

            return (_this4 = _this).__handleButtonClick__REACT_HOT_LOADER__.apply(_this4, arguments);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Button, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                BUTTON_TYPES = _props.BUTTON_TYPES,
                saveText = _props.saveText,
                cancelText = _props.cancelText,
                editorState = _props.editorState,
                editedRowKey = _props.editedRowKey,
                type = _props.type;

            var _gridConfig = (0, _GridConstants.gridConfig)(),
                CLASS_NAMES = _gridConfig.CLASS_NAMES;

            var text = type === BUTTON_TYPES.SAVE ? saveText : cancelText;

            var buttonProps = {
                onClick: this.handleButtonClick,
                className: type === BUTTON_TYPES.SAVE ? (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.SAVE_BUTTON) : (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.CANCEL_BUTTON)
            };

            if (type === BUTTON_TYPES.SAVE && editorState && editorState.get(editedRowKey) && !editorState.get(editedRowKey).valid) {
                buttonProps.disabled = true;
            }

            return _react2.default.createElement(
                'button',
                buttonProps,
                text
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props2 = this.props,
                type = _props2.type,
                BUTTON_TYPES = _props2.BUTTON_TYPES;


            if (!this._EVENT_LISTENER) {
                this._EVENT_LISTENER = type === BUTTON_TYPES.SAVE ? this.listenForEnter : this.listenForCancel;

                document.addEventListener('keydown', this._EVENT_LISTENER);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('keydown', this._EVENT_LISTENER);
            delete this._EVENT_LISTENER;
        }
    }, {
        key: '__listenForEnter__REACT_HOT_LOADER__',
        value: function __listenForEnter__REACT_HOT_LOADER__(e) {
            if (e.keyCode === _GridConstants.KEYBOARD_MAP.ENTER) {
                this.handleButtonClick();
            }
        }
    }, {
        key: '__listenForCancel__REACT_HOT_LOADER__',
        value: function __listenForCancel__REACT_HOT_LOADER__(e) {
            if (e.keyCode === _GridConstants.KEYBOARD_MAP.ESCAPE) {
                this.handleButtonClick();
            }
        }
    }, {
        key: '__handleButtonClick__REACT_HOT_LOADER__',
        value: function __handleButtonClick__REACT_HOT_LOADER__() {
            var _props3 = this.props,
                BUTTON_TYPES = _props3.BUTTON_TYPES,
                editorState = _props3.editorState,
                events = _props3.events,
                type = _props3.type,
                stateKey = _props3.stateKey,
                editedRowKey = _props3.editedRowKey,
                store = _props3.store;


            var values = editorState.get(editedRowKey).values;

            if (!values._key) {
                values = values.set('_key', editedRowKey);
            }

            if (type === BUTTON_TYPES.SAVE) {

                var result = (0, _fire.fireEvent)('HANDLE_BEFORE_INLINE_EDITOR_SAVE', events, {
                    values: values,
                    editor: editorState
                }, null);

                // early exit if custom event returns false
                // dont do save or dismiss editor
                if (result === false) {
                    return;
                }
            }

            if (type === BUTTON_TYPES.CANCEL) {
                store.dispatch((0, _EditorActions.dismissEditor)({ stateKey: stateKey }));
            } else if (type === BUTTON_TYPES.SAVE) {

                store.dispatch((0, _EditorActions.saveRow)({
                    values: values,
                    rowIndex: editorState.get(editedRowKey).rowIndex,
                    stateKey: stateKey
                }));

                (0, _fire.fireEvent)('HANDLE_AFTER_INLINE_EDITOR_SAVE', events, {
                    values: values,
                    editor: editorState
                }, null);

                store.dispatch((0, _EditorActions.dismissEditor)({ stateKey: stateKey }));
            }
        }
    }]);

    return Button;
}(_react.Component);

Button.propTypes = {
    BUTTON_TYPES: _propTypes2.default.object,
    cancelText: _propTypes2.default.string,
    editedRowKey: _propTypes2.default.string,
    editorState: _propTypes2.default.object,
    events: _propTypes2.default.object,
    saveText: _propTypes2.default.string,
    stateKey: _propTypes2.default.string,
    store: _propTypes2.default.object,
    type: _propTypes2.default.string
};
Button.defaultProps = {
    BUTTON_TYPES: {
        CANCEL: 'CANCEL',
        SAVE: 'SAVE'
    },
    cancelText: 'Cancel',
    editorState: {},
    saveText: 'Save'
};
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Button, 'Button', 'src/components/plugins/editor/inline/Button.jsx');
}();

;