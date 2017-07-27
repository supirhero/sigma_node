'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dataReducer = require('../dataReducer');

var _actions = require('../actions');

var _utils = require('../utils');

var data = [[1, 2], [3, 4]];

var filters = {
  globalSearch: { filter: _utils.containsIgnoreCase }
};

describe('dataReducer', function () {
  it('loads data', function () {
    var action = (0, _actions.dataLoaded)(data);
    var expected = {
      data: data,
      initialized: false,
      initialData: data,
      page: data,
      filterValues: { globalSearch: '' },
      sortBy: null,
      pageNumber: 0,
      pageSize: 5,
      totalPages: 1
    };

    expect((0, _dataReducer.dataReducer)(undefined, action)).toEqual(expected);
  });

  it('changes page number', function () {
    var state = {
      data: data,
      page: data.slice(0, 1),
      pageNumber: 0,
      pageSize: 1
    };
    var action = (0, _actions.pageNumberChange)(1);
    var expected = _extends({}, state, {
      page: data.slice(1, 2),
      pageNumber: 1,
      totalPages: 2
    });

    expect((0, _dataReducer.dataReducer)(state, action)).toEqual(expected);
  });

  it('changes page size', function () {
    var state = {
      data: data,
      page: data.slice(0, 1),
      pageNumber: 0,
      pageSize: 1
    };
    var action = (0, _actions.pageSizeChange)(2);
    var expected = _extends({}, state, {
      page: data,
      pageSize: 2,
      totalPages: 1
    });

    expect((0, _dataReducer.dataReducer)(state, action)).toEqual(expected);
  });

  it('sorts descending', function () {
    var state = {
      data: [[3, 4], [1, 2]],
      page: [[3, 4]],
      pageNumber: 0,
      pageSize: 1,
      totalPages: 2
    };
    var sortBy = { prop: 0, order: 'ascending' };
    var action = (0, _actions.dataSort)(sortBy);
    var expected = _extends({}, state, {
      sortBy: sortBy,
      data: [[1, 2], [3, 4]],
      page: [[1, 2]]
    });

    expect((0, _dataReducer.dataReducer)(state, action)).toEqual(expected);
  });

  it('sorts descending', function () {
    var state = {
      data: [[1, 2], [3, 4]],
      page: [[1, 2]],
      pageNumber: 0,
      pageSize: 1,
      totalPages: 2
    };
    var sortBy = { prop: 0, order: 'descending' };
    var action = (0, _actions.dataSort)(sortBy);
    var expected = _extends({}, state, {
      sortBy: sortBy,
      data: [[3, 4], [1, 2]],
      page: [[3, 4]]
    });

    expect((0, _dataReducer.dataReducer)(state, action)).toEqual(expected);
  });

  it('filters', function () {
    var data = [['carlos', 'r'], [3, 4]];
    var state = {
      data: data,
      initialData: data,
      page: data.slice(0, 1),
      pageNumber: 0,
      pageSize: 1,
      totalPages: 2
    };
    var action = (0, _actions.dataFilter)('globalSearch', 'c', filters);
    var expected = _extends({}, state, {
      filterValues: { globalSearch: 'c' },
      data: [['carlos', 'r']],
      page: [['carlos', 'r']],
      totalPages: 1
    });

    expect((0, _dataReducer.dataReducer)(state, action)).toEqual(expected);
  });

  it('filters on different page', function () {
    var data = [['carlos', 'r'], [3, 4]];
    var state = {
      data: data,
      initialData: data,
      page: data.slice(0, 1),
      pageSize: 1,
      totalPages: 2
    };
    var initState = _extends({}, state, {
      pageNumber: 1
    });
    var action = (0, _actions.dataFilter)('globalSearch', 'c', filters);
    var expected = _extends({}, state, {
      pageNumber: 0,
      filterValues: { globalSearch: 'c' },
      data: [['carlos', 'r']],
      page: [['carlos', 'r']],
      totalPages: 1
    });

    expect((0, _dataReducer.dataReducer)(state, action)).toEqual(expected);
  });
});