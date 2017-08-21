'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Description = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Description = exports.Description = function Description(_ref) {
    var toolbarRenderer = _ref.toolbarRenderer,
        pageIndex = _ref.pageIndex,
        pageSize = _ref.pageSize,
        total = _ref.total,
        currentRecords = _ref.currentRecords,
        recordType = _ref.recordType;


    return _react2.default.createElement(
        'span',
        null,
        toolbarRenderer(pageIndex, pageSize, total, currentRecords, recordType)
    );
};

var func = _propTypes2.default.func,
    number = _propTypes2.default.number,
    string = _propTypes2.default.string;


Description.propTypes = {
    currentRecords: number,
    pageIndex: number,
    pageSize: number,
    recordType: string,
    toolbarRenderer: func,
    total: number
};

Description.defaultProps = {
    toolbarRenderer: function toolbarRenderer(pageIndex, pageSize, total, currentRecords, recordType) {
        if (!currentRecords) {
            return 'No ' + recordType + ' Available';
        }

        var firstIndex = pageIndex * pageSize + 1;

        return firstIndex + '\n            through ' + (pageIndex * pageSize + currentRecords) + '\n            of ' + total + ' ' + recordType + ' Displayed';
    }
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Description, 'Description', 'src/components/plugins/pager/toolbar/Description.jsx');

    __REACT_HOT_LOADER__.register(func, 'func', 'src/components/plugins/pager/toolbar/Description.jsx');

    __REACT_HOT_LOADER__.register(number, 'number', 'src/components/plugins/pager/toolbar/Description.jsx');

    __REACT_HOT_LOADER__.register(string, 'string', 'src/components/plugins/pager/toolbar/Description.jsx');
}();

;