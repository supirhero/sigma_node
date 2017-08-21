"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var bufferTop = exports.bufferTop = function bufferTop(rowHeight, viewableIndex, viewableCount, bufferMultiplier) {
    var spacerCount = Math.max(viewableIndex - viewableCount * bufferMultiplier, 0);

    return spacerCount * rowHeight;
};

var bufferBottom = exports.bufferBottom = function bufferBottom(rowHeight, viewableIndex, viewableCount, bufferMultiplier, totalCount) {
    var spacerCount = Math.max(totalCount - viewableIndex - viewableCount * (bufferMultiplier + 1), 0);

    return spacerCount * rowHeight;
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(bufferTop, "bufferTop", "src/util/buffer.js");

    __REACT_HOT_LOADER__.register(bufferBottom, "bufferBottom", "src/util/buffer.js");
}();

;