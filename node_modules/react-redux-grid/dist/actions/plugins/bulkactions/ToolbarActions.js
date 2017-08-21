'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeToolbar = undefined;

var _ActionTypes = require('../../../constants/ActionTypes');

var removeToolbar = exports.removeToolbar = function removeToolbar(_ref) {
    var state = _ref.state,
        stateKey = _ref.stateKey;
    return {
        type: _ActionTypes.REMOVE_TOOLBAR, value: state, stateKey: stateKey
    };
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(removeToolbar, 'removeToolbar', 'src/actions/plugins/bulkactions/ToolbarActions.js');
}();

;