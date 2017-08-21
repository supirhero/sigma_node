'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var num = 0;

var REDUCER_KEYS = {
    BulkActions: 'bulkaction',
    DataSource: 'dataSource',
    Editor: 'editor',
    ErrorHandler: 'errorhandler',
    Grid: 'grid',
    Loader: 'loader',
    Menu: 'menu',
    Pager: 'pager',
    Selection: 'selection'
};

var generateLastUpdate = exports.generateLastUpdate = function generateLastUpdate() {
    return ++num;
};

var resetLastUpdate = exports.resetLastUpdate = function resetLastUpdate() {
    num = 0;
};

var getLastUpdate = exports.getLastUpdate = function getLastUpdate(store, key) {
    var reducerKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : REDUCER_KEYS;


    if (typeof reducerKeys === 'string') {
        var state = store.getState().get ? store.getState().get(reducerKeys) : store.getState()[reducerKeys];

        return updateGetter(state, REDUCER_KEYS, Object.keys(REDUCER_KEYS), key);
    }

    var dynamicReducerKeys = (typeof reducerKeys === 'undefined' ? 'undefined' : _typeof(reducerKeys)) === 'object' && Object.keys(reducerKeys).length > 0 ? reducerKeys : REDUCER_KEYS;

    return updateGetter(store.getState(), dynamicReducerKeys, Object.keys(dynamicReducerKeys), key);
};

var updateGetter = exports.updateGetter = function updateGetter(state, reducerKeys, keys, key) {
    return keys.reduce(function (prev, reducerAccessor) {
        var reducerKey = reducerKeys[reducerAccessor];
        var stateMap = typeof state.get === 'function' ? state.get(reducerKey) : state[reducerKey];
        if (stateMap && stateMap.toJS) {
            prev[reducerKey] = stateMap.getIn([key, 'lastUpdate']);
        } else if ((typeof stateMap === 'undefined' ? 'undefined' : _typeof(stateMap)) === 'object' && stateMap[key]) {
            prev[reducerKey] = stateMap[key].lastUpdate;
        }
        return prev;
    }, {});
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(num, 'num', 'src/util/lastUpdate.js');

    __REACT_HOT_LOADER__.register(REDUCER_KEYS, 'REDUCER_KEYS', 'src/util/lastUpdate.js');

    __REACT_HOT_LOADER__.register(generateLastUpdate, 'generateLastUpdate', 'src/util/lastUpdate.js');

    __REACT_HOT_LOADER__.register(resetLastUpdate, 'resetLastUpdate', 'src/util/lastUpdate.js');

    __REACT_HOT_LOADER__.register(getLastUpdate, 'getLastUpdate', 'src/util/lastUpdate.js');

    __REACT_HOT_LOADER__.register(updateGetter, 'updateGetter', 'src/util/lastUpdate.js');
}();

;