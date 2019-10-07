import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiTab from '@material-ui/core/Tab';
import classnames from 'classnames';
import { translate } from 'ra-core';
import { Field } from 'redux-form';

import FormInput from './FormInput';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var label = _ref.label,
        icon = _ref.icon,
        value = _ref.value,
        translate = _ref.translate,
        rest = _objectWithoutProperties(_ref, ['label', 'icon', 'value', 'translate']);

    return rest;
};

var FormTab = function (_Component) {
    _inherits(FormTab, _Component);

    function FormTab() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, FormTab);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = FormTab.__proto__ || Object.getPrototypeOf(FormTab)).call.apply(_ref2, [this].concat(args))), _this), _this.renderHeader = function (_ref3) {
            var className = _ref3.className,
                label = _ref3.label,
                icon = _ref3.icon,
                value = _ref3.value,
                translate = _ref3.translate,
                rest = _objectWithoutProperties(_ref3, ['className', 'label', 'icon', 'value', 'translate']);

            var to = { pathname: value, state: { skipFormReset: true } };

            return React.createElement(MuiTab, _extends({
                key: label,
                label: translate(label, { _: label }),
                value: value,
                icon: icon,
                className: classnames('form-tab', className),
                component: Link,
                to: to
            }, sanitizeRestProps(rest)));
        }, _this.renderContent = function (_ref4) {
            var children = _ref4.children,
                rest = _objectWithoutProperties(_ref4, ['children']);

            return React.createElement(
                Fragment,
                null,
                React.Children.map(children, function (input) {
                    return input && React.createElement(FormInput, _extends({ input: input }, sanitizeRestProps(rest)));
                })
            );
        }, _this.renderHiddenContent = function (_ref5) {
            var children = _ref5.children;
            return React.createElement(
                Fragment,
                null,
                React.Children.map(children, function (raInputComponent) {
                    return React.createElement(Field, {
                        component: function component() {
                            return null;
                        },
                        source: raInputComponent.props.source,
                        name: raInputComponent.props.source,
                        validate: raInputComponent.props.validate
                    });
                })
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FormTab, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                context = _props.context,
                hidden = _props.hidden,
                rest = _objectWithoutProperties(_props, ['children', 'context', 'hidden']);

            return context === 'header' ? this.renderHeader(rest) : hidden ? this.renderHiddenContent({ children: children }) : this.renderContent(_extends({ children: children }, rest));
        }
    }]);

    return FormTab;
}(Component);

FormTab.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    context: PropTypes.oneOf(['header', 'content']),
    hidden: PropTypes.bool,
    icon: PropTypes.element,
    label: PropTypes.string.isRequired,
    path: PropTypes.string,
    translate: PropTypes.func.isRequired,
    value: PropTypes.string
};

FormTab.displayName = 'FormTab';

export default translate(FormTab);