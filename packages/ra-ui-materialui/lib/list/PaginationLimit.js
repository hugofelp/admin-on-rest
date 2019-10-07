'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _CardContent = require('@material-ui/core/CardContent');

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaginationLimit = function PaginationLimit(_ref) {
    var translate = _ref.translate;
    return _react2.default.createElement(
        _CardContent2.default,
        null,
        _react2.default.createElement(
            _Typography2.default,
            { variant: 'body1' },
            translate('ra.navigation.no_results')
        )
    );
};

PaginationLimit.propTypes = {
    translate: _propTypes2.default.func.isRequired
};

var enhance = (0, _compose2.default)(_pure2.default, _raCore.translate);

exports.default = enhance(PaginationLimit);
module.exports = exports['default'];