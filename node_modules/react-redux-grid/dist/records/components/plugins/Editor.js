'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var Editor = (0, _immutable.Record)({
    key: null,
    values: (0, _immutable.Map)(),
    rowIndex: null,
    top: null,
    valid: null,
    invalidCells: (0, _immutable.List)(),
    isCreate: null,
    overrides: (0, _immutable.Map)(),
    previousValues: (0, _immutable.Map)(),
    lastUpdate: 0
});

var _default = Editor;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Editor, 'Editor', 'src/records/components/plugins/Editor.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/records/components/plugins/Editor.js');
}();

;