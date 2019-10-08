import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import TablePagination from '@material-ui/core/TablePagination';
import compose from 'recompose/compose';
import { translate, sanitizeListRestProps } from 'ra-core';

import PaginationActions from './PaginationActions';
import PaginationLimit from './PaginationLimit';
import Responsive from '../layout/Responsive';

var emptyArray = [];

export var Pagination = function (_Component) {
    _inherits(Pagination, _Component);

    function Pagination() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Pagination);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call.apply(_ref, [this].concat(args))), _this), _this.getNbPages = function () {
            return Math.ceil(_this.props.total / _this.props.perPage) || 1;
        }, _this.handlePageChange = function (event, page) {
            event && event.stopPropagation();
            if (page < 0 || page > _this.getNbPages() - 1) {
                throw new Error(_this.props.translate('ra.navigation.page_out_of_boundaries', {
                    page: page + 1
                }));
            }
            _this.props.setPage(page + 1);
        }, _this.handlePerPageChange = function (event) {
            _this.props.setPerPage(event.target.value);
        }, _this.labelDisplayedRows = function (_ref2) {
            var from = _ref2.from,
                to = _ref2.to,
                count = _ref2.count;
            var translate = _this.props.translate;

            return translate('ra.navigation.page_range_info', {
                offsetBegin: from,
                offsetEnd: to,
                total: count
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Pagination, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.page < 1 || isNaN(this.props.page)) {
                this.props.setPage(1);
            }
        }

        /**
         * Warning: material-ui's page is 0-based
         */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                isLoading = _props.isLoading,
                page = _props.page,
                perPage = _props.perPage,
                rowsPerPageOptions = _props.rowsPerPageOptions,
                total = _props.total,
                translate = _props.translate,
                rest = _objectWithoutProperties(_props, ['isLoading', 'page', 'perPage', 'rowsPerPageOptions', 'total', 'translate']);

            if (!isLoading && total === 0) {
                return React.createElement(PaginationLimit, null);
            }

            return React.createElement(Responsive, {
                small: React.createElement(TablePagination, _extends({
                    count: total,
                    rowsPerPage: perPage,
                    page: page - 1,
                    onChangePage: this.handlePageChange,
                    rowsPerPageOptions: emptyArray,
                    component: 'span',
                    labelDisplayedRows: this.labelDisplayedRows
                }, sanitizeListRestProps(rest))),
                medium: React.createElement(TablePagination, _extends({
                    count: total,
                    rowsPerPage: perPage,
                    page: page - 1,
                    onChangePage: this.handlePageChange,
                    onChangeRowsPerPage: this.handlePerPageChange,
                    ActionsComponent: PaginationActions,
                    component: 'span',
                    labelRowsPerPage: translate('ra.navigation.page_rows_per_page'),
                    labelDisplayedRows: this.labelDisplayedRows,
                    rowsPerPageOptions: rowsPerPageOptions
                }, sanitizeListRestProps(rest)))
            });
        }
    }]);

    return Pagination;
}(Component);

Pagination.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    ids: PropTypes.array,
    isLoading: PropTypes.bool,
    page: PropTypes.number,
    perPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    setPage: PropTypes.func,
    setPerPage: PropTypes.func,
    translate: PropTypes.func.isRequired,
    total: PropTypes.number
};

Pagination.defaultProps = {
    rowsPerPageOptions: [5, 10, 25]
};

var enhance = compose(pure, translate);

export default enhance(Pagination);