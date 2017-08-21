'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var Grid = (0, _immutable.Record)({
    columns: (0, _immutable.List)(),
    headerHidden: false,
    lastUpdate: 0
});

var _default = Grid;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Grid, 'Grid', 'src/records/components/Grid.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/records/components/Grid.js');
}();

;