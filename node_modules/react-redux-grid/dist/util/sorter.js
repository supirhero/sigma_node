'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Sorter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GridConstants = require('../constants/GridConstants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sorter = exports.Sorter = function () {
    function Sorter() {
        _classCallCheck(this, Sorter);
    }

    _createClass(Sorter, [{
        key: 'sortBy',
        value: function sortBy(name, direction, datasource) {
            return datasource.data.sort(function (a, b) {

                if (a.get(name) < b.get(name) && direction) {
                    return direction === _GridConstants.SORT_DIRECTIONS.ASCEND ? 1 : -1;
                } else if (a.get(name) > b.get(name)) {
                    return direction === _GridConstants.SORT_DIRECTIONS.ASCEND ? -1 : 1;
                }
            });
        }
    }]);

    return Sorter;
}();

var _default = new Sorter();

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Sorter, 'Sorter', 'src/util/sorter.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/util/sorter.js');
}();

;