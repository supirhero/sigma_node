'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageNumberChange = pageNumberChange;
exports.pageSizeChange = pageSizeChange;
exports.dataSort = dataSort;
exports.dataLoaded = dataLoaded;
exports.dataFilter = dataFilter;
var ActionTypes = exports.ActionTypes = {
  DATA_LOADED: 'DATA_LOADED',
  PAGE_NUMBER_CHANGE: 'PAGE_NUMBER_CHANGE',
  PAGE_SIZE_CHANGE: 'PAGE_SIZE_CHANGE',
  DATA_FILTER: 'DATA_FILTER',
  DATA_SORT: 'DATA_SORT'
};

function pageNumberChange(value) {
  return { value: value, type: ActionTypes.PAGE_NUMBER_CHANGE };
}

function pageSizeChange(value) {
  return { value: value, type: ActionTypes.PAGE_SIZE_CHANGE };
}

function dataSort(value) {
  return { value: value, type: ActionTypes.DATA_SORT };
}

function dataLoaded(value) {
  return { value: value, type: ActionTypes.DATA_LOADED };
}

// Probably a bad idea to send down `filters` here.
function dataFilter(key, value, filters) {
  return { value: { key: key, value: value, filters: filters }, type: ActionTypes.DATA_FILTER };
}