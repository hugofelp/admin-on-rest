import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';

var styles = function styles(theme) {
    return {
        expandIcon: {
            margin: 0,
            left: -theme.spacing.unit * 6
        },
        root: {
            alignItems: 'baseline',
            display: 'flex',
            padding: 0,
            flexGrow: 1
        },
        node: {
            alignItems: 'baseline',
            display: 'flex',
            padding: 0,
            flexGrow: 1,
            paddingLeft: theme.spacing.unit * 6
        },
        leaf: {
            display: 'flex',
            flexGrow: 1,
            margin: 0,
            padding: 0,
            paddingLeft: theme.spacing.unit * 6,
            paddingRight: theme.spacing.unit * 4,
            position: 'relative'
        },

        panel: {
            background: 'transparent',
            display: 'block',
            flexGrow: 1,
            margin: 0
        },
        panelDetails: {
            display: 'flex',
            flexDirection: 'column',
            padding: 0
        },
        panelSummary: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: 0,
            padding: 0
        },
        panelSummaryExpanded: {
            margin: 0
        },
        panelSummaryContent: {
            alignItems: 'center',
            margin: 0,

            // JSS notation to reference another class (here panelSummaryExpanded)
            '&$panelSummaryExpanded': {
                margin: 0
            }
        },
        handle: {
            cursor: 'drag',
            alignItems: 'center',
            display: 'flex',
            marginRight: theme.spacing.unit * 2
        },
        draggingOver: {
            background: theme.palette.action.hover
        }
    };
};

var TreeNode = function (_Component) {
    _inherits(TreeNode, _Component);

    function TreeNode() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TreeNode);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).call.apply(_ref, [this].concat(args))), _this), _this.handleDrop = function (event) {
            if (_this.props.isOver && _this.props.canDrop) {
                event.persit();
                event.preventDefault();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TreeNode, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                basePath = _props.basePath,
                canDrop = _props.canDrop,
                children = _props.children,
                classes = _props.classes,
                closeNode = _props.closeNode,
                connectDropTarget = _props.connectDropTarget,
                expandNode = _props.expandNode,
                getIsNodeExpanded = _props.getIsNodeExpanded,
                isOver = _props.isOver,
                isOverCurrent = _props.isOverCurrent,
                itemType = _props.itemType,
                node = _props.node,
                resource = _props.resource,
                treeNodeComponent = _props.treeNodeComponent,
                TreeNodeWithChildren = _props.treeNodeWithChildrenComponent,
                TreeNodeContent = _props.treeNodeContentComponent,
                toggleNode = _props.toggleNode,
                props = _objectWithoutProperties(_props, ['basePath', 'canDrop', 'children', 'classes', 'closeNode', 'connectDropTarget', 'expandNode', 'getIsNodeExpanded', 'isOver', 'isOverCurrent', 'itemType', 'node', 'resource', 'treeNodeComponent', 'treeNodeWithChildrenComponent', 'treeNodeContentComponent', 'toggleNode']);

            return connectDropTarget(React.createElement(
                'div',
                { className: classes.root },
                React.createElement(
                    ListItem,
                    {
                        button: true,
                        classes: {
                            root: classNames((_classNames = {}, _defineProperty(_classNames, classes.node, node.children.length > 0), _defineProperty(_classNames, classes.leaf, node.children.length === 0), _defineProperty(_classNames, classes.draggingOver, isOverCurrent), _classNames))
                        },
                        dense: true,
                        disableGutters: true
                    },
                    node.children.length > 0 ? React.createElement(
                        TreeNodeWithChildren,
                        _extends({
                            key: 'TreeNodeWithChildren' + node.id,
                            basePath: basePath,
                            cancelDropOnChildren: !!itemType,
                            classes: classes,
                            closeNode: closeNode,
                            expandNode: expandNode,
                            getIsNodeExpanded: getIsNodeExpanded
                            /*
                            Override the isExpanded prop managed through redux on hover.
                            Set it to undefined when not hovering to fall back to redux state
                            so that it stay expanded if it was before
                            */
                            , isExpanded: isOver && canDrop ? true : undefined,
                            node: node,
                            resource: resource,
                            treeNodeComponent: treeNodeComponent,
                            treeNodeWithChildrenComponent: TreeNodeWithChildren,
                            treeNodeContentComponent: TreeNodeContent,
                            toggleNode: toggleNode
                        }, props),
                        children
                    ) : React.createElement(
                        Fragment,
                        null,
                        React.createElement(
                            TreeNodeContent,
                            _extends({
                                key: 'TreeNodeContent_' + node.id,
                                basePath: basePath,
                                node: node,
                                resource: resource,
                                isLeaf: true,
                                cancelDropOnChildren: !!itemType,
                                onDrop: this.handleDrop,
                                classes: {
                                    handle: classes.handle
                                }
                            }, props),
                            children
                        )
                    )
                )
            ));
        }
    }]);

    return TreeNode;
}(Component);

TreeNode.propTypes = {
    basePath: PropTypes.string.isRequired,
    canDrop: PropTypes.bool,
    children: PropTypes.node,
    classes: PropTypes.object,
    closeNode: PropTypes.func,
    connectDropTarget: PropTypes.func,
    expandNode: PropTypes.func,
    getIsNodeExpanded: PropTypes.func,
    isOver: PropTypes.bool,
    isOverCurrent: PropTypes.bool,
    itemType: PropTypes.string,
    node: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    toggleNode: PropTypes.func,
    treeNodeComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    treeNodeContentComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    treeNodeWithChildrenComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};
TreeNode.defaultProps = {
    connectDropTarget: function connectDropTarget(target) {
        return target;
    }
};


export default withStyles(styles)(TreeNode);