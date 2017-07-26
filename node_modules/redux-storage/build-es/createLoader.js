'use strict';

import { load as actionLoad } from './actions';

export default (function (engine) {
    return function (store) {
        var dispatchLoad = function dispatchLoad(state) {
            return store.dispatch(actionLoad(state));
        };
        return engine.load().then(function (newState) {
            dispatchLoad(newState);
            return newState;
        });
    };
});