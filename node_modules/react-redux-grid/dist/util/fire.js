'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var fireEvent = exports.fireEvent = function fireEvent(name, events) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var browserEvent = arguments[3];


    if (!events || typeof events[name] !== 'function') {
        return;
    }

    var dynamicArgs = Object.keys(context).reduce(function (prev, k) {
        prev[k] = normalize(context[k]);
        return prev;
    }, {});

    // apply dynamic arguments
    // but these vals will always be represented
    return events[name](_extends({}, dynamicArgs, {
        editor: normalize(context.editor),
        events: events,
        isSelected: context.isSelected,
        row: normalize(context.row),
        rowId: context.rowId,
        rowIndex: context.rowIndex
    }), browserEvent);
};

var normalize = exports.normalize = function normalize(v) {
    return v && v.toJS ? v.toJS() : v;
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(fireEvent, 'fireEvent', 'src/util/fire.js');

    __REACT_HOT_LOADER__.register(normalize, 'normalize', 'src/util/fire.js');
}();

;