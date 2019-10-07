import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { cloneElement, Children, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';
import { crudUpdate as crudUpdateAction, startUndoable as startUndoableAction } from 'ra-core';

import NodeFormActions from './NodeFormActions';

var styles = {
    root: {
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1
    }
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var anyTouched = _ref.anyTouched,
        array = _ref.array,
        asyncBlurFields = _ref.asyncBlurFields,
        asyncValidate = _ref.asyncValidate,
        asyncValidating = _ref.asyncValidating,
        autofill = _ref.autofill,
        blur = _ref.blur,
        cancelDropOnChildren = _ref.cancelDropOnChildren,
        change = _ref.change,
        clearAsyncError = _ref.clearAsyncError,
        clearFields = _ref.clearFields,
        clearSubmit = _ref.clearSubmit,
        clearSubmitErrors = _ref.clearSubmitErrors,
        crudUpdate = _ref.crudUpdate,
        destroy = _ref.destroy,
        dirty = _ref.dirty,
        dispatch = _ref.dispatch,
        dispatchCrudUpdate = _ref.dispatchCrudUpdate,
        form = _ref.form,
        getTreeState = _ref.getTreeState,
        handleSubmit = _ref.handleSubmit,
        initialize = _ref.initialize,
        initialized = _ref.initialized,
        initialValues = _ref.initialValues,
        invalid = _ref.invalid,
        isDragging = _ref.isDragging,
        onSelect = _ref.onSelect,
        onToggleItem = _ref.onToggleItem,
        onUnselectItems = _ref.onUnselectItems,
        parentSource = _ref.parentSource,
        pristine = _ref.pristine,
        pure = _ref.pure,
        redirect = _ref.redirect,
        reset = _ref.reset,
        resetSection = _ref.resetSection,
        save = _ref.save,
        startUndoable = _ref.startUndoable,
        submit = _ref.submit,
        submitFailed = _ref.submitFailed,
        submitSucceeded = _ref.submitSucceeded,
        submitting = _ref.submitting,
        touch = _ref.touch,
        translate = _ref.translate,
        triggerSubmit = _ref.triggerSubmit,
        undoable = _ref.undoable,
        undoableDragDrop = _ref.undoableDragDrop,
        untouch = _ref.untouch,
        valid = _ref.valid,
        validate = _ref.validate,
        props = _objectWithoutProperties(_ref, ['anyTouched', 'array', 'asyncBlurFields', 'asyncValidate', 'asyncValidating', 'autofill', 'blur', 'cancelDropOnChildren', 'change', 'clearAsyncError', 'clearFields', 'clearSubmit', 'clearSubmitErrors', 'crudUpdate', 'destroy', 'dirty', 'dispatch', 'dispatchCrudUpdate', 'form', 'getTreeState', 'handleSubmit', 'initialize', 'initialized', 'initialValues', 'invalid', 'isDragging', 'onSelect', 'onToggleItem', 'onUnselectItems', 'parentSource', 'pristine', 'pure', 'redirect', 'reset', 'resetSection', 'save', 'startUndoable', 'submit', 'submitFailed', 'submitSucceeded', 'submitting', 'touch', 'translate', 'triggerSubmit', 'undoable', 'undoableDragDrop', 'untouch', 'valid', 'validate']);

    return props;
};

var NodeForm = function (_Component) {
    _inherits(NodeForm, _Component);

    function NodeForm() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, NodeForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = NodeForm.__proto__ || Object.getPrototypeOf(NodeForm)).call.apply(_ref2, [this].concat(args))), _this), _this.handleClick = function (event) {
            event.persist();
            // This ensure clicking on an input or button does not collapse/expand a node
            // When clicking on the form (empty spaces around inputs) however, it should
            // propagate to the parent
            if (event.target.tagName.toLowerCase() !== 'form') {
                event.stopPropagation();
            }
        }, _this.handleDrop = function (event) {
            event.persist();
            if (_this.props.cancelDropOnChildren) {
                event.preventDefault();
            }
        }, _this.handleSubmit = function () {
            var _this$props = _this.props,
                basePath = _this$props.basePath,
                dispatchCrudUpdate = _this$props.dispatchCrudUpdate,
                handleSubmit = _this$props.handleSubmit,
                record = _this$props.node.record,
                resource = _this$props.resource,
                startUndoable = _this$props.startUndoable,
                _this$props$undoable = _this$props.undoable,
                undoable = _this$props$undoable === undefined ? true : _this$props$undoable;


            return handleSubmit(function (values) {
                return undoable ? startUndoable(crudUpdateAction(resource, record.id, _extends({}, record, values), record, basePath, false)) : dispatchCrudUpdate(resource, record.id, _extends({}, record, values), record, basePath, false);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(NodeForm, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                actions = _props.actions,
                basePath = _props.basePath,
                children = _props.children,
                classes = _props.classes,
                handleSubmit = _props.handleSubmit,
                invalid = _props.invalid,
                node = _props.node,
                pristine = _props.pristine,
                resource = _props.resource,
                saving = _props.saving,
                _props$submitOnEnter = _props.submitOnEnter,
                submitOnEnter = _props$submitOnEnter === undefined ? true : _props$submitOnEnter,
                props = _objectWithoutProperties(_props, ['actions', 'basePath', 'children', 'classes', 'handleSubmit', 'invalid', 'node', 'pristine', 'resource', 'saving', 'submitOnEnter']);

            return React.createElement(
                'form',
                _extends({
                    className: classes.root,
                    onClick: this.handleClick
                }, sanitizeRestProps(props)),
                Children.map(children, function (field) {
                    return field ? cloneElement(field, {
                        basePath: field.props.basePath || basePath,
                        onDrop: _this2.handleDrop,
                        record: node.record,
                        resource: resource
                    }) : null;
                }),
                actions && cloneElement(actions, {
                    basePath: basePath,
                    record: node.record,
                    resource: resource,
                    handleSubmit: this.handleSubmit,
                    handleSubmitWithRedirect: this.handleSubmit,
                    invalid: invalid,
                    pristine: pristine,
                    saving: saving,
                    submitOnEnter: submitOnEnter
                })
            );
        }
    }]);

    return NodeForm;
}(Component);

NodeForm.propTypes = {
    actions: PropTypes.node,
    basePath: PropTypes.string.isRequired,
    cancelDropOnChildren: PropTypes.bool,
    children: PropTypes.node,
    classes: PropTypes.object,
    dispatchCrudUpdate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool,
    node: PropTypes.object.isRequired,
    pristine: PropTypes.bool,
    resource: PropTypes.string.isRequired,
    saving: PropTypes.bool,
    startUndoable: PropTypes.func.isRequired,
    submitOnEnter: PropTypes.bool,
    undoable: PropTypes.bool
};
NodeForm.defaultProps = {
    actions: React.createElement(NodeFormActions, null)
};


var mapStateToProps = function mapStateToProps(state, _ref3) {
    var node = _ref3.node;
    return {
        form: 'tree-node-form-' + node.id,
        initialValues: node.record,
        record: node.record
    };
};

export default compose(connect(mapStateToProps, {
    dispatchCrudUpdate: crudUpdateAction,
    startUndoable: startUndoableAction
}), reduxForm({
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
}), withStyles(styles))(NodeForm);