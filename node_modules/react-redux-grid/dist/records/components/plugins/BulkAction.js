'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var BulkAction = (0, _immutable.Record)({
    isRemoved: null,
    lastUpdate: 0
});

var _default = BulkAction;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(BulkAction, 'BulkAction', 'src/records/components/plugins/BulkAction.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/records/components/plugins/BulkAction.js');
}();

;