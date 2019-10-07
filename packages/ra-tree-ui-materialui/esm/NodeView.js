import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { cloneElement, Children, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

var CONTAINER_CLASS = 'treenode-content';

var styles = {
    root: {
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1
    }
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var cancelDropOnChildren = _ref.cancelDropOnChildren,
        crudUpdate = _ref.crudUpdate,
        dispatchCrudUpdate = _ref.dispatchCrudUpdate,
        getTreeState = _ref.getTreeState,
        isDragging = _ref.isDragging,
        onSelect = _ref.onSelect,
        onToggleItem = _ref.onToggleItem,
        onUnselectItems = _ref.onUnselectItems,
        parentSource = _ref.parentSource,
        startUndoable = _ref.startUndoable,
        translate = _ref.translate,
        undoable = _ref.undoable,
        undoableDragDrop = _ref.undoableDragDrop,
        rest = _objectWithoutProperties(_ref, ['cancelDropOnChildren', 'crudUpdate', 'dispatchCrudUpdate', 'getTreeState', 'isDragging', 'onSelect', 'onToggleItem', 'onUnselectItems', 'parentSource', 'startUndoable', 'translate', 'undoable', 'undoableDragDrop']);

    return rest;
};

export var NodeView = function (_Component) {
    _inherits(NodeView, _Component);

    function NodeView() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, NodeView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = NodeView.__proto__ || Object.getPrototypeOf(NodeView)).call.apply(_ref2, [this].concat(args))), _this), _this.handleClick = function (event) {
            event.persist();
            // This ensure clicking on a button does not collapse/expand a node
            // When clicking on the form (empty spaces around buttons) however, it should
            // propagate to the parent
            if (!event.target.matches('.' + CONTAINER_CLASS)) {
                event.stopPropagation();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(NodeView, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                actions = _props.actions,
                basePath = _props.basePath,
                children = _props.children,
                classes = _props.classes,
                node = _props.node,
                resource = _props.resource,
                props = _objectWithoutProperties(_props, ['actions', 'basePath', 'children', 'classes', 'node', 'resource']);

            return React.createElement(
                'div',
                _extends({
                    className: classNames(CONTAINER_CLASS, classes.root),
                    onClick: this.handleClick
                }, sanitizeRestProps(props)),
                Children.map(children, function (field) {
                    return field ? cloneElement(field, {
                        basePath: field.props.basePath || basePath,
                        record: node.record,
                        resource: resource
                    }) : null;
                }),
                actions && cloneElement(actions, {
                    basePath: basePath,
                    record: node.record,
                    resource: resource
                })
            );
        }
    }]);

    return NodeView;
}(Component);

NodeView.propTypes = {
    actions: PropTypes.node,
    basePath: PropTypes.string.isRequired,
    children: PropTypes.node,
    classes: PropTypes.object,
    node: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired
};
export default withStyles(styles)(NodeView);