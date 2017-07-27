"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var selectDataTable = exports.selectDataTable = function selectDataTable(table) {
  return function (state) {
    return state.datatable[table];
  };
};