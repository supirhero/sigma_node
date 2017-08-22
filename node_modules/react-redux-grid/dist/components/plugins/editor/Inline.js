'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isEditorShown = exports.focusFirstEditor = exports.getEditedRowKey = exports.getInputSelector = exports.getRowFromInput = exports.Inline = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.resetEditorPosition = resetEditorPosition;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _Button = require('./inline/Button');

var _prefix = require('../../../util/prefix');

var _stateGetter = require('../../../util/stateGetter');

var _getEditorTop = require('../../../util/getEditorTop');

var _getRowBoundingRect2 = require('../../../util/getRowBoundingRect');

var _GridConstants = require('../../../constants/GridConstants');

var _EditorActions = require('../../../actions/plugins/editor/EditorActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inline = exports.Inline = function (_Component) {
    _inherits(Inline, _Component);

    _createClass(Inline, [{
        key: 'render',
        value: function render() {
            var _gridConfig = (0, _GridConstants.gridConfig)(),
                CLASS_NAMES = _gridConfig.CLASS_NAMES;

            var _props = this.props,
                BUTTON_TYPES = _props.BUTTON_TYPES,
                editorState = _props.editorState,
                events = _props.events,
                stateKey = _props.stateKey,
                store = _props.store;
            var position = this.state.position;

            var editedRowKey = getEditedRowKey(editorState);

            if (!editedRowKey) {
                return null;
            }

            var top = -100;

            if (isEditorShown(editorState)) {
                top = editorState.get(editedRowKey).top;
            }

            var inlineEditorProps = {
                className: (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.CONTAINER, editorState && editorState.get(editedRowKey) ? CLASS_NAMES.EDITOR.INLINE.SHOWN : CLASS_NAMES.EDITOR.INLINE.HIDDEN, position),
                style: {
                    top: top + 'px'
                }
            };

            var buttonContainerProps = {
                className: (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.BUTTON_CONTAINER)
            };

            return _react2.default.createElement(
                'div',
                inlineEditorProps,
                _react2.default.createElement(
                    'span',
                    buttonContainerProps,
                    _react2.default.createElement(_Button.Button, {
                        editedRowKey: editedRowKey,
                        editorState: editorState,
                        events: events,
                        stateKey: stateKey,
                        store: store,
                        type: BUTTON_TYPES.CANCEL
                    }),
                    _react2.default.createElement(_Button.Button, {
                        editedRowKey: editedRowKey,
                        editorState: editorState,
                        events: events,
                        stateKey: stateKey,
                        store: store,
                        type: BUTTON_TYPES.SAVE
                    })
                )
            );
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            /*
            * lifecycle event used to focus on first available input
            * and to reposition editor
            */
            var dom = _reactDom2.default.findDOMNode(this);
            var _props2 = this.props,
                config = _props2.config,
                editorState = _props2.editorState,
                store = _props2.store,
                stateKey = _props2.stateKey;

            var editedRowKey = getEditedRowKey(editorState);
            var position = this.state.position;


            resetEditorPosition.call(this, editorState, store, stateKey, dom, position, editedRowKey);

            if (!config.focusOnEdit) {
                return false;
            }

            if (isEditorShown(editorState) && this.editedRow !== editorState.get(editedRowKey).rowIndex) {

                this.editedRow = editorState.get(editedRowKey).rowIndex;
                focusFirstEditor(dom);
            } else if (!isEditorShown(editorState)) {
                this.editedRow = null;
            }
        }
    }]);

    function Inline(props) {
        _classCallCheck(this, Inline);

        var _this = _possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).call(this, props));

        _this.state = {};
        return _this;
    }

    return Inline;
}(_react.Component);

var getRowFromInput = exports.getRowFromInput = function getRowFromInput(inputEl) {
    var _gridConfig2 = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig2.CLASS_NAMES;

    while (inputEl !== null && inputEl.classList) {
        if (inputEl.classList.contains((0, _prefix.prefix)(CLASS_NAMES.ROW))) {
            return inputEl;
        }

        inputEl = inputEl.parentNode;
    }

    return null;
};

function resetEditorPosition(editorState, store, stateKey, dom, position, rowId) {

    if (!dom) {
        return;
    }

    var input = dom.parentNode.querySelector(getInputSelector());

    if (input) {
        var row = getRowFromInput(input);

        var _getRowBoundingRect = (0, _getRowBoundingRect2.getRowBoundingRect)(row),
            spaceBottom = _getRowBoundingRect.spaceBottom;

        var editedRowKey = getEditedRowKey(editorState);

        var moveToTop = spaceBottom < row.clientHeight * 2;

        if (row && editorState && editorState.get(editedRowKey) && editorState.get(editedRowKey).top) {

            var top = (0, _getEditorTop.getEditorTop)(row, moveToTop, dom);

            if (top !== editorState.get(editedRowKey).top) {
                store.dispatch((0, _EditorActions.repositionEditor)({
                    stateKey: stateKey,
                    top: top,
                    rowId: rowId
                }));
            }

            if (position === 'top' && !moveToTop || moveToTop && !position) {
                this.setState({
                    position: 'bottom'
                });
            } else if (position === 'bottom' && moveToTop || !moveToTop && !position) {
                this.setState({
                    position: 'top'
                });
            }
        }
    }
}

/* eslint-disable max-len */
var getInputSelector = exports.getInputSelector = function getInputSelector() {
    var _gridConfig3 = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig3.CLASS_NAMES;

    return ['.' + (0, _prefix.prefix)(CLASS_NAMES.EDITED_CELL) + ' .' + (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER) + ' input:enabled,', '.' + (0, _prefix.prefix)(CLASS_NAMES.EDITED_CELL) + ' .' + (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER) + ' select:enabled'].join(' ');
};
/* eslint-enable max-len */

var getEditedRowKey = exports.getEditedRowKey = function getEditedRowKey(editorState) {

    if (!editorState) {
        return null;
    }

    var p = editorState.find(function (k) {
        return k !== 'lastUpdate';
    });

    if (!p || !p.get) {
        return null;
    }

    return p.get('key');
};

var focusFirstEditor = exports.focusFirstEditor = function focusFirstEditor(dom) {
    var input = dom.parentNode.querySelector(getInputSelector());

    if (input && input.focus) {
        input.focus();
    }
};

var isEditorShown = exports.isEditorShown = function isEditorShown(editorState) {
    var editedRowKey = getEditedRowKey(editorState);
    return editorState && editorState.get(editedRowKey);
};

Inline.propTypes = {
    BUTTON_TYPES: _propTypes2.default.object,
    columns: _propTypes2.default.array,
    config: _propTypes2.default.object.isRequired,
    editorState: _propTypes2.default.object,
    events: _propTypes2.default.object,
    reducerKeys: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
    stateKey: _propTypes2.default.string,
    store: _propTypes2.default.object
};

Inline.defaultProps = {
    BUTTON_TYPES: {
        CANCEL: 'CANCEL',
        SAVE: 'SAVE'
    }
};

function mapStateToProps(state, props) {
    return {
        errorHandler: (0, _stateGetter.stateGetter)(state, props, 'errorhandler', props.stateKey),
        editorState: (0, _stateGetter.stateGetter)(state, props, 'editor', props.stateKey)
    };
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(Inline);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Inline, 'Inline', 'src/components/plugins/editor/Inline.jsx');

    __REACT_HOT_LOADER__.register(getRowFromInput, 'getRowFromInput', 'src/components/plugins/editor/Inline.jsx');

    __REACT_HOT_LOADER__.register(resetEditorPosition, 'resetEditorPosition', 'src/components/plugins/editor/Inline.jsx');

    __REACT_HOT_LOADER__.register(getInputSelector, 'getInputSelector', 'src/components/plugins/editor/Inline.jsx');

    __REACT_HOT_LOADER__.register(getEditedRowKey, 'getEditedRowKey', 'src/components/plugins/editor/Inline.jsx');

    __REACT_HOT_LOADER__.register(focusFirstEditor, 'focusFirstEditor', 'src/components/plugins/editor/Inline.jsx');

    __REACT_HOT_LOADER__.register(isEditorShown, 'isEditorShown', 'src/components/plugins/editor/Inline.jsx');

    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'src/components/plugins/editor/Inline.jsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/components/plugins/editor/Inline.jsx');
}();

;