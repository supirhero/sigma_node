'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = enhanceDataTable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dataReducer = require('./dataReducer');

var _actions = require('./actions');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapPropsToState = function mapPropsToState(props) {
  return {
    pageSize: props.initialPageLength,
    sortBy: props.initialSortBy
  };
};

function enhanceDataTable(ComposedComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    _inherits(DataTableEnhancer, _Component);

    function DataTableEnhancer(props) {
      _classCallCheck(this, DataTableEnhancer);

      var _this = _possibleConstructorReturn(this, (DataTableEnhancer.__proto__ || Object.getPrototypeOf(DataTableEnhancer)).call(this, props));

      _this.onPageNumberChange = function (value) {
        _this.setState(function (state) {
          return (0, _dataReducer.dataReducer)(state, (0, _actions.pageNumberChange)(value));
        });
      };

      _this.onPageSizeChange = function (_ref) {
        var value = _ref.target.value;

        _this.setState(function (state) {
          return (0, _dataReducer.dataReducer)(state, (0, _actions.pageSizeChange)(value));
        });
      };

      _this.onSort = function (value) {
        _this.setState(function (state) {
          return (0, _dataReducer.dataReducer)(state, (0, _actions.dataSort)(value));
        });
      };

      _this.onFilter = function (key, _ref2) {
        var value = _ref2.target.value;

        _this.setState(function (state) {
          return (0, _dataReducer.dataReducer)(state, (0, _actions.dataFilter)(key, value, _this.props.filters));
        });
      };

      _this.state = (0, _dataReducer.dataReducer)(mapPropsToState(props), (0, _actions.dataLoaded)(props.initialData));
      return _this;
    }

    _createClass(DataTableEnhancer, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.setState(function (state) {
          return (0, _dataReducer.dataReducer)(state, (0, _actions.dataLoaded)(nextProps.initialData));
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ComposedComponent, _extends({
          onPageNumberChange: this.onPageNumberChange,
          onPageSizeChange: this.onPageSizeChange,
          onSort: this.onSort,
          onFilter: this.onFilter,
          data: this.state
        }, this.props));
      }
    }]);

    return DataTableEnhancer;
  }(_react.Component), _class.defaultProps = {
    initialPageLength: 10,
    pageLengthOptions: [5, 10, 20],
    filters: {
      globalSearch: { filter: _utils.containsIgnoreCase }
    }
  }, _temp;
}