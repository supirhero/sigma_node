'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.encode = exports.keyFromObject = exports.keyGenerator = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyGenerator = exports.keyGenerator = function keyGenerator() {
    for (var _len = arguments.length, keywords = Array(_len), _key = 0; _key < _len; _key++) {
        keywords[_key] = arguments[_key];
    }

    return encode((0, _arrayFrom2.default)(keywords).join(''));
};

var keyFromObject = exports.keyFromObject = function keyFromObject(obj, additionalStrings) {

    if (additionalStrings && Array.isArray(additionalStrings)) {
        return encode(additionalStrings.join('') + Object.keys(obj).map(function (k) {
            return obj[k];
        }).join(''));
    }

    return encode(Object.keys(obj).map(function (k) {
        return obj[k];
    }).join(''));
};

var encode = exports.encode = function encode(s) {
    return btoa(unescape(encodeURIComponent(s)));
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(keyGenerator, 'keyGenerator', 'src/util/keyGenerator.js');

    __REACT_HOT_LOADER__.register(keyFromObject, 'keyFromObject', 'src/util/keyGenerator.js');

    __REACT_HOT_LOADER__.register(encode, 'encode', 'src/util/keyGenerator.js');
}();

;