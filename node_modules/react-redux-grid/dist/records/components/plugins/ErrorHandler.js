'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var ErrorHandler = (0, _immutable.Record)({
    error: '',
    errorOccurred: false,
    lastUpdate: 0
});

var _default = ErrorHandler;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(ErrorHandler, 'ErrorHandler', 'src/records/components/plugins/ErrorHandler.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/records/components/plugins/ErrorHandler.js');
}();

;