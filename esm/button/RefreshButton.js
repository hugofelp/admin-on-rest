import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationRefresh from '@material-ui/icons/Refresh';
import { refreshView as refreshViewAction } from 'ra-core';

import Button from './Button';

var RefreshButton = function (_Component) {
    _inherits(RefreshButton, _Component);

    function RefreshButton() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RefreshButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RefreshButton.__proto__ || Object.getPrototypeOf(RefreshButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
            event.preventDefault();
            _this.props.refreshView();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RefreshButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                label = _props.label,
                refreshView = _props.refreshView,
                rest = _objectWithoutProperties(_props, ['label', 'refreshView']);

            return React.createElement(
                Button,
                _extends({ label: label, onClick: this.handleClick }, rest),
                React.createElement(NavigationRefresh, null)
            );
        }
    }]);

    return RefreshButton;
}(Component);

RefreshButton.propTypes = {
    label: PropTypes.string,
    refreshView: PropTypes.func.isRequired
};
RefreshButton.defaultProps = {
    label: 'ra.action.refresh'
};


var enhance = connect(null, { refreshView: refreshViewAction });

export default enhance(RefreshButton);