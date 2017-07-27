'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.dataReducer = dataReducer;
exports.default = tableReducer;

var _utils = require('./utils');

var _actions = require('./actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  initialized: false,
  initialData: [],
  data: [],
  page: [],
  filterValues: { globalSearch: '' },
  totalPages: 0,
  sortBy: null,
  pageNumber: 0,
  pageSize: 5
};

function calculatePage(data, pageSize, pageNumber) {
  if (pageSize === 0 || !data.length) {
    return { page: data, totalPages: 0 };
  }

  var start = pageSize * pageNumber;

  return {
    page: data.slice(start, start + pageSize),
    totalPages: Math.ceil(data.length / pageSize)
  };
}

function pageNumberChange(state, _ref) {
  var pageNumber = _ref.payload;

  return _extends({}, state, calculatePage(state.data, state.pageSize, pageNumber), {
    pageNumber: pageNumber
  });
}

function pageSizeChange(state, action) {
  var newPageSize = Number(action.payload);
  var pageNumber = state.pageNumber,
      pageSize = state.pageSize;

  var newPageNumber = newPageSize ? Math.floor(pageNumber * pageSize / newPageSize) : 0;

  return _extends({}, state, calculatePage(state.data, newPageSize, newPageNumber), {
    pageSize: newPageSize,
    pageNumber: newPageNumber
  });
}

function dataSort(state, _ref2) {
  var sortBy = _ref2.payload;

  var data = (0, _utils.sort)(sortBy, state.data);

  return _extends({}, state, calculatePage(data, state.pageSize, state.pageNumber), {
    sortBy: sortBy,
    data: data
  });
}

function dataFilter(state, _ref3) {
  var _ref3$payload = _ref3.payload,
      key = _ref3$payload.key,
      value = _ref3$payload.value,
      filters = _ref3$payload.filters;

  var newFilterValues = _extends({}, state.filterValues, _defineProperty({}, key, value));
  var data = (0, _utils.filter)(filters, newFilterValues, state.initialData);

  if (state.sortBy) {
    data = (0, _utils.sort)(state.sortBy, data);
  }

  return _extends({}, state, calculatePage(data, state.pageSize, 0), {
    data: data,
    filterValues: newFilterValues,
    pageNumber: 0
  });
}

function dataInit(state, action) {
  var payload = action.payload;


  return _extends({}, state, {
    initialized: true,
    initialData: payload,
    data: payload
  });
}

function dataLoaded(state, _ref4) {
  var data = _ref4.payload;

  // Filled missing properties.
  var filledState = _extends({}, initialState, state);
  var pageSize = filledState.pageSize,
      pageNumber = filledState.pageNumber;


  if (state.sortBy) {
    data = (0, _utils.sort)(state.sortBy, data);
  }

  return _extends({}, filledState, calculatePage(data, pageSize, pageNumber), {
    initialData: data,
    data: data
  });
}

function dataReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _actions.ActionTypes.INITIALIZE:
      return dataInit(state, action);

    case _actions.ActionTypes.DATA_LOADED:
      return dataLoaded(state, action);

    case _actions.ActionTypes.PAGE_NUMBER_CHANGE:
      return pageNumberChange(state, action);

    case _actions.ActionTypes.PAGE_SIZE_CHANGE:
      return pageSizeChange(state, action);

    case _actions.ActionTypes.DATA_FILTER:
      return dataFilter(state, action);

    case _actions.ActionTypes.DATA_SORT:
      return dataSort(state, action);
  }

  return state;
}

function tableReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actions.ActionTypes.INITIALIZE:
    case _actions.ActionTypes.DATA_LOADED:
    case _actions.ActionTypes.PAGE_NUMBER_CHANGE:
    case _actions.ActionTypes.PAGE_SIZE_CHANGE:
    case _actions.ActionTypes.DATA_FILTER:
    case _actions.ActionTypes.DATA_SORT:
      {
        var table = action.meta.table;


        return _extends({}, state, _defineProperty({}, table, dataReducer(state[table], action)));
      }
  }

  return state;
}