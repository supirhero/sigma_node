'use strict';

import simpleMerger from 'redux-storage-merger-simple';

import { LOAD } from './constants';

export default (function (reducer) {
    var merger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : simpleMerger;

    return function (state, action) {
        return reducer(action.type === LOAD ? merger(state, action.payload) : state, action);
    };
});