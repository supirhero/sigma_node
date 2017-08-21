'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hideMenu = exports.showMenu = undefined;

var _ActionTypes = require('../../../constants/ActionTypes');

var showMenu = exports.showMenu = function showMenu(_ref) {
    var id = _ref.id,
        stateKey = _ref.stateKey;
    return {
        type: _ActionTypes.SHOW_MENU, id: id, stateKey: stateKey
    };
};

var hideMenu = exports.hideMenu = function hideMenu(_ref2) {
    var id = _ref2.id,
        stateKey = _ref2.stateKey;
    return {
        type: _ActionTypes.HIDE_MENU, id: id, stateKey: stateKey
    };
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(showMenu, 'showMenu', 'src/actions/plugins/actioncolumn/MenuActions.js');

    __REACT_HOT_LOADER__.register(hideMenu, 'hideMenu', 'src/actions/plugins/actioncolumn/MenuActions.js');
}();

;