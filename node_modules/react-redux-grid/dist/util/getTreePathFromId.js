'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getTreePathFromId = exports.getTreePathFromId = function getTreePathFromId(flatData, id) {
    var res = [];
    var node = flatData.find(function (n) {
        return n.get('_id') === id;
    });
    var finder = function finder(n) {
        return n.get('_id') === lastParentId;
    };
    var lastParentId = node.get('_id');

    while (lastParentId !== undefined) {
        var parent = flatData.find(finder);

        if (parent) {
            res.push(parent.get('_id'));
            lastParentId = parent.get('_parentId');
        } else {
            lastParentId = undefined;
        }
    }

    return res.reverse();
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(getTreePathFromId, 'getTreePathFromId', 'src/util/getTreePathFromId.js');
}();

;