'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
* central function to retrieve state from reducer
* used inside of mapStateToProps by grid and other plugins
* @returns {object} state

* if a dynamic reducerKey is passed, it will favor that key
* over the build in grid keys

*/

var stateGetter = exports.stateGetter = function stateGetter(state, props, key, entry) {

    if (props && props.reducerKeys) {
        if (typeof props.reducerKeys === 'string') {
            var nestedInImmutable = typeof state.get === 'function';
            var nestedState = nestedInImmutable ? state.get(props.reducerKeys) : state[props.reducerKeys];
            return get(nestedState, key, entry);
        } else if (_typeof(props.reducerKeys) === 'object' && Object.keys(props.reducerKeys).length > 0 && props.reducerKeys[key]) {

            var dynamicKey = props.reducerKeys[key];
            return get(state, dynamicKey, entry);
        }
    }

    var val = get(state, key, entry);

    if (val) {
        return val;
    }

    return null;
};

var get = exports.get = function get(state, key, entry) {

    if (!state) {
        return null;
    }

    var isImmutable = typeof state.get === 'function';
    var stateItem = isImmutable ? state.get(key) : state[key];

    if (!stateItem) {
        return null;
    }

    return stateItem.get(entry);
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(stateGetter, 'stateGetter', 'src/util/stateGetter.js');

    __REACT_HOT_LOADER__.register(get, 'get', 'src/util/stateGetter.js');
}();

;