'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.save = exports.load = undefined;

var _reduxActions = require('redux-actions');

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var load = exports.load = (0, _reduxActions.createAction)(constants.LOAD);
var save = exports.save = (0, _reduxActions.createAction)(constants.SAVE);