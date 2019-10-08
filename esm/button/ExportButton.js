import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GetApp from '@material-ui/icons/GetApp';
import { crudGetAll, downloadCSV, CRUD_GET_MANY, GET_MANY } from 'ra-core';
import { unparse as convertToCSV } from 'papaparse/papaparse.min';

import Button from './Button';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var basePath = _ref.basePath,
        crudGetAll = _ref.crudGetAll,
        dispatch = _ref.dispatch,
        exporter = _ref.exporter,
        filter = _ref.filter,
        maxResults = _ref.maxResults,
        resource = _ref.resource,
        sort = _ref.sort,
        rest = _objectWithoutProperties(_ref, ['basePath', 'crudGetAll', 'dispatch', 'exporter', 'filter', 'maxResults', 'resource', 'sort']);

    return rest;
};

/**
 * Helper function for calling the data provider with GET_MANY
 * via redux and saga, and getting a Promise in return
 *
 * @example
 *     fetchRelatedRecords(records, 'post_id', 'posts').then(posts =>
 *          posts.map(record => ({
 *              ...record,
 *              post_title: posts[record.post_id].title,
 *          }));
 */
var fetchRelatedRecords = function fetchRelatedRecords(dispatch) {
    return function (data, field, resource) {
        return new Promise(function (resolve, reject) {
            var sanitizedData = data.filter(function (record) {
                return record[field];
            }).map(function (record) {
                return record[field];
            });

            // find unique keys
            var ids = [].concat(_toConsumableArray(new Set(sanitizedData)));

            dispatch({
                type: CRUD_GET_MANY,
                payload: { ids: ids },
                meta: {
                    resource: resource,
                    fetch: GET_MANY,
                    onSuccess: {
                        callback: function callback(_ref2) {
                            var data = _ref2.payload.data;

                            resolve(data.reduce(function (acc, post) {
                                acc[post.id] = post;
                                return acc;
                            }, {}));
                        }
                    },
                    onFailure: {
                        notification: {
                            body: 'ra.notification.http_error',
                            level: 'warning'
                        },
                        callback: function callback(_ref3) {
                            var error = _ref3.error;
                            return reject(error);
                        }
                    }
                }
            });
        });
    };
};

var ExportButton = function (_Component) {
    _inherits(ExportButton, _Component);

    function ExportButton() {
        var _ref4;

        var _temp, _this, _ret;

        _classCallCheck(this, ExportButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref4 = ExportButton.__proto__ || Object.getPrototypeOf(ExportButton)).call.apply(_ref4, [this].concat(args))), _this), _this.handleClick = function () {
            var _this$props = _this.props,
                dispatch = _this$props.dispatch,
                exporter = _this$props.exporter,
                filter = _this$props.filter,
                maxResults = _this$props.maxResults,
                sort = _this$props.sort,
                resource = _this$props.resource;

            dispatch(crudGetAll(resource, sort, filter, maxResults, function (_ref5) {
                var data = _ref5.payload.data;
                return exporter ? exporter(data, fetchRelatedRecords(dispatch), dispatch) : downloadCSV(convertToCSV(data), resource);
            }));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ExportButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                label = _props.label,
                rest = _objectWithoutProperties(_props, ['label']);

            return React.createElement(
                Button,
                _extends({
                    onClick: this.handleClick,
                    label: label
                }, sanitizeRestProps(rest)),
                React.createElement(GetApp, null)
            );
        }
    }]);

    return ExportButton;
}(Component);

ExportButton.propTypes = {
    basePath: PropTypes.string,
    dispatch: PropTypes.func,
    exporter: PropTypes.func,
    filter: PropTypes.object,
    label: PropTypes.string,
    maxResults: PropTypes.number.isRequired,
    resource: PropTypes.string.isRequired,
    sort: PropTypes.object
};


ExportButton.defaultProps = {
    label: 'ra.action.export',
    maxResults: 1000
};

export default connect()(ExportButton); // inject redux dispatch