'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DOMAIN = exports.DOMAIN = 'react-data-components';

var ActionTypes = exports.ActionTypes = {
  DATA_LOADED: '@@' + DOMAIN + '/DATA_LOADED',
  INITIALIZE: '@@' + DOMAIN + '/INITIALIZE',
  PAGE_NUMBER_CHANGE: '@@' + DOMAIN + '/PAGE_NUMBER_CHANGE',
  PAGE_SIZE_CHANGE: '@@' + DOMAIN + '/PAGE_SIZE_CHANGE',
  DATA_FILTER: '@@' + DOMAIN + '/DATA_FILTER',
  DATA_SORT: '@@' + DOMAIN + '/DATA_SORT'
};

var initialize = exports.initialize = function initialize() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var table = arguments[1];
  return {
    type: ActionTypes.INITIALIZE,
    payload: data,
    meta: { table: table }
  };
};

// Probably a bad idea to send down `filters` here.
var dataFilter = exports.dataFilter = function dataFilter(key, value, filters, table) {
  return {
    type: ActionTypes.DATA_FILTER,
    payload: { key: key, value: value, filters: filters },
    meta: { table: table }
  };
};

var dataSort = exports.dataSort = function dataSort(sortBy, table) {
  return {
    type: ActionTypes.DATA_SORT,
    payload: sortBy,
    meta: { table: table }
  };
};

var dataLoaded = exports.dataLoaded = function dataLoaded(data, table) {
  return {
    type: ActionTypes.DATA_LOADED,
    payload: data,
    meta: { table: table }
  };
};

var pageNumberChange = exports.pageNumberChange = function pageNumberChange(pageNumber, table) {
  return {
    type: ActionTypes.PAGE_NUMBER_CHANGE,
    payload: pageNumber,
    meta: { table: table }
  };
};

var pageSizeChange = exports.pageSizeChange = function pageSizeChange(pageSize, table) {
  return {
    type: ActionTypes.PAGE_SIZE_CHANGE,
    payload: pageSize,
    meta: { table: table }
  };
};