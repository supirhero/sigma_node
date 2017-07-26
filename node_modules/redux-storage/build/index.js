'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createLoader = require('./createLoader');

Object.defineProperty(exports, 'createLoader', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_createLoader)['default'];
    }
});

var _createMiddleware = require('./createMiddleware');

Object.defineProperty(exports, 'createMiddleware', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_createMiddleware)['default'];
    }
});

var _reducer = require('./reducer');

Object.defineProperty(exports, 'reducer', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_reducer)['default'];
    }
});

var _constants = require('./constants');

Object.defineProperty(exports, 'LOAD', {
    enumerable: true,
    get: function get() {
        return _constants.LOAD;
    }
});
Object.defineProperty(exports, 'SAVE', {
    enumerable: true,
    get: function get() {
        return _constants.SAVE;
    }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// The full default export is required to be BC with redux-storage <= v1.3.2
exports['default'] = _extends({}, require('./constants'), {
    createLoader: require('./createLoader')['default'],
    createMiddleware: require('./createMiddleware')['default'],
    reducer: require('./reducer')['default']
});