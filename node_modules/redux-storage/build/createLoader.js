'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = require('./actions');

exports['default'] = function (engine) {
    return function (store) {
        var dispatchLoad = function dispatchLoad(state) {
            return store.dispatch((0, _actions.load)(state));
        };
        return engine.load().then(function (newState) {
            dispatchLoad(newState);
            return newState;
        });
    };
};