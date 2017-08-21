'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var Loader = (0, _immutable.Record)({
    isLoading: false,
    lastUpdate: 0
});

var _default = Loader;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Loader, 'Loader', 'src/records/components/plugins/Loader.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/records/components/plugins/Loader.js');
}();

;