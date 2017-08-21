'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var Pager = (0, _immutable.Record)({
    pageIndex: 0,
    lastUpdate: 0
});

var _default = Pager;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Pager, 'Pager', 'src/records/components/plugins/Pager.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/records/components/plugins/Pager.js');
}();

;