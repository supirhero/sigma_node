"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var val = 0;

var getNewRowId = exports.getNewRowId = function getNewRowId() {
    return --val;
};

var resetRowId = exports.resetRowId = function resetRowId() {
    val = 0;
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(val, "val", "src/util/getNewRowId.js");

    __REACT_HOT_LOADER__.register(getNewRowId, "getNewRowId", "src/util/getNewRowId.js");

    __REACT_HOT_LOADER__.register(resetRowId, "resetRowId", "src/util/getNewRowId.js");
}();

;