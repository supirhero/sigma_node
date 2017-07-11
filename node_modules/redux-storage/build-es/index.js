'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

export { default as createLoader } from './createLoader';
export { default as createMiddleware } from './createMiddleware';
export { default as reducer } from './reducer';
export { LOAD, SAVE } from './constants';

// The full default export is required to be BC with redux-storage <= v1.3.2
export default _extends({}, require('./constants'), {
    createLoader: require('./createLoader')['default'],
    createMiddleware: require('./createMiddleware')['default'],
    reducer: require('./reducer')['default']
});