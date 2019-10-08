import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { reduxForm, getFormAsyncErrors, getFormSyncErrors, getFormSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import compose from 'recompose/compose';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';
import { getDefaultValues, translate, REDUX_FORM_NAME } from 'ra-core';

import Toolbar from './Toolbar';
import CardContentInner from '../layout/CardContentInner';

var styles = function styles(theme) {
    return {
        errorTabButton: { color: theme.palette.error.main }
    };
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var anyTouched = _ref.anyTouched,
        array = _ref.array,
        asyncBlurFields = _ref.asyncBlurFields,
        asyncValidate = _ref.asyncValidate,
        asyncValidating = _ref.asyncValidating,
        autofill = _ref.autofill,
        blur = _ref.blur,
        change = _ref.change,
        clearAsyncError = _ref.clearAsyncError,
        clearFields = _ref.clearFields,
        clearSubmit = _ref.clearSubmit,
        clearSubmitErrors = _ref.clearSubmitErrors,
        destroy = _ref.destroy,
        dirty = _ref.dirty,
        dispatch = _ref.dispatch,
        form = _ref.form,
        handleSubmit = _ref.handleSubmit,
        initialize = _ref.initialize,
        initialized = _ref.initialized,
        initialValues = _ref.initialValues,
        pristine = _ref.pristine,
        pure = _ref.pure,
        redirect = _ref.redirect,
        reset = _ref.reset,
        resetSection = _ref.resetSection,
        save = _ref.save,
        staticContext = _ref.staticContext,
        submit = _ref.submit,
        submitFailed = _ref.submitFailed,
        submitSucceeded = _ref.submitSucceeded,
        submitting = _ref.submitting,
        touch = _ref.touch,
        translate = _ref.translate,
        triggerSubmit = _ref.triggerSubmit,
        untouch = _ref.untouch,
        valid = _ref.valid,
        validate = _ref.validate,
        props = _objectWithoutProperties(_ref, ['anyTouched', 'array', 'asyncBlurFields', 'asyncValidate', 'asyncValidating', 'autofill', 'blur', 'change', 'clearAsyncError', 'clearFields', 'clearSubmit', 'clearSubmitErrors', 'destroy', 'dirty', 'dispatch', 'form', 'handleSubmit', 'initialize', 'initialized', 'initialValues', 'pristine', 'pure', 'redirect', 'reset', 'resetSection', 'save', 'staticContext', 'submit', 'submitFailed', 'submitSucceeded', 'submitting', 'touch', 'translate', 'triggerSubmit', 'untouch', 'valid', 'validate']);

    return props;
};

var getTabFullPath = function getTabFullPath(tab, index, baseUrl) {
    return '' + baseUrl + (tab.props.path ? '/' + tab.props.path : index > 0 ? '/' + index : '');
};

export var TabbedForm = function (_Component) {
    _inherits(TabbedForm, _Component);

    function TabbedForm() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, TabbedForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = TabbedForm.__proto__ || Object.getPrototypeOf(TabbedForm)).call.apply(_ref2, [this].concat(args))), _this), _this.handleSubmitWithRedirect = function () {
            var redirect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.redirect;
            return _this.props.handleSubmit(function (values) {
                return _this.props.save(values, redirect);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TabbedForm, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                basePath = _props.basePath,
                children = _props.children,
                className = _props.className,
                _props$classes = _props.classes,
                classes = _props$classes === undefined ? {} : _props$classes,
                invalid = _props.invalid,
                location = _props.location,
                match = _props.match,
                pristine = _props.pristine,
                record = _props.record,
                redirect = _props.redirect,
                resource = _props.resource,
                saving = _props.saving,
                submitOnEnter = _props.submitOnEnter,
                tabsWithErrors = _props.tabsWithErrors,
                toolbar = _props.toolbar,
                translate = _props.translate,
                value = _props.value,
                version = _props.version,
                rest = _objectWithoutProperties(_props, ['basePath', 'children', 'className', 'classes', 'invalid', 'location', 'match', 'pristine', 'record', 'redirect', 'resource', 'saving', 'submitOnEnter', 'tabsWithErrors', 'toolbar', 'translate', 'value', 'version']);

            var validTabPaths = Children.toArray(children).map(function (tab, index) {
                return getTabFullPath(tab, index, match.url);
            });

            // This ensure we don't get warnings from material-ui Tabs component when
            // the current location pathname targets a dynamically added Tab
            // In the case the targeted Tab is not present at first render (when
            // using permissions for example) we temporarily switch to the first
            // available tab. The current location will be applied again on the
            // first render containing the targeted tab. This is almost transparent
            // for the user who may just see an short tab selection animation
            var tabsValue = validTabPaths.includes(location.pathname) ? location.pathname : validTabPaths[0];

            return React.createElement(
                'form',
                _extends({
                    className: classnames('tabbed-form', className),
                    key: version
                }, sanitizeRestProps(rest)),
                React.createElement(
                    Tabs
                    // The location pathname will contain the page path including the current tab path
                    // so we can use it as a way to determine the current tab
                    ,
                    { value: tabsValue,
                        indicatorColor: 'primary'
                    },
                    Children.map(children, function (tab, index) {
                        if (!tab) return null;

                        // Builds the full tab tab which is the concatenation of the last matched route in the
                        // TabbedShowLayout hierarchy (ex: '/posts/create', '/posts/12', , '/posts/12/show')
                        // and the tab path.
                        // This will be used as the Tab's value
                        var tabPath = getTabFullPath(tab, index, match.url);

                        return React.cloneElement(tab, {
                            context: 'header',
                            value: tabPath,
                            className: tabsWithErrors.includes(tab.props.label) && location.pathname !== tabPath ? classes.errorTabButton : null
                        });
                    })
                ),
                React.createElement(Divider, null),
                React.createElement(
                    CardContentInner,
                    null,
                    Children.map(children, function (tab, index) {
                        return tab && React.createElement(
                            Route,
                            {
                                exact: true,
                                path: getTabFullPath(tab, index, match.url)
                            },
                            function (routeProps) {
                                return React.cloneElement(tab, {
                                    context: 'content',
                                    resource: resource,
                                    record: record,
                                    basePath: basePath,
                                    hidden: !routeProps.match
                                });
                            }
                        );
                    })
                ),
                toolbar && React.createElement(
                    CardContentInner,
                    null,
                    React.cloneElement(toolbar, {
                        basePath: basePath,
                        className: 'toolbar',
                        handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                        handleSubmit: this.props.handleSubmit,
                        invalid: invalid,
                        pristine: pristine,
                        record: record,
                        redirect: redirect,
                        resource: resource,
                        saving: saving,
                        submitOnEnter: submitOnEnter
                    }),
                    ' '
                )
            );
        }
    }]);

    return TabbedForm;
}(Component);

TabbedForm.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    handleSubmit: PropTypes.func, // passed by redux-form
    invalid: PropTypes.bool,
    location: PropTypes.object,
    match: PropTypes.object,
    pristine: PropTypes.bool,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func]),
    resource: PropTypes.string,
    save: PropTypes.func, // the handler defined in the parent, which triggers the REST submission
    saving: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    submitOnEnter: PropTypes.bool,
    tabsWithErrors: PropTypes.arrayOf(PropTypes.string),
    toolbar: PropTypes.element,
    translate: PropTypes.func,
    validate: PropTypes.func,
    value: PropTypes.number,
    version: PropTypes.number
};

TabbedForm.defaultProps = {
    submitOnEnter: true,
    toolbar: React.createElement(Toolbar, null)
};

var collectErrors = function collectErrors(state, props) {
    var syncErrors = getFormSyncErrors(props.form)(state);
    var asyncErrors = getFormAsyncErrors(props.form)(state);
    var submitErrors = getFormSubmitErrors(props.form)(state);

    return _extends({}, syncErrors, asyncErrors, submitErrors);
};

export var findTabsWithErrors = function findTabsWithErrors(state, props) {
    var collectErrorsImpl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : collectErrors;

    var errors = collectErrorsImpl(state, props);

    return Children.toArray(props.children).reduce(function (acc, child) {
        var inputs = Children.toArray(child.props.children);

        if (inputs.some(function (input) {
            return errors[input.props.source];
        })) {
            return [].concat(_toConsumableArray(acc), [child.props.label]);
        }

        return acc;
    }, []);
};

var enhance = compose(withRouter, connect(function (state, props) {
    var children = Children.toArray(props.children).reduce(function (acc, child) {
        return [].concat(_toConsumableArray(acc), _toConsumableArray(Children.toArray(child.props.children)));
    }, []);

    return {
        form: props.form || REDUX_FORM_NAME,
        initialValues: getDefaultValues(state, _extends({}, props, { children: children })),
        saving: props.saving || state.admin.saving,
        tabsWithErrors: findTabsWithErrors(state, _extends({
            form: REDUX_FORM_NAME
        }, props))
    };
}), translate, // Must be before reduxForm so that it can be used in validation
reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
}), withStyles(styles));

export default enhance(TabbedForm);