import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

export var TreeNodeWithChildren = function (_Component) {
    _inherits(TreeNodeWithChildren, _Component);

    function TreeNodeWithChildren() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TreeNodeWithChildren);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TreeNodeWithChildren.__proto__ || Object.getPrototypeOf(TreeNodeWithChildren)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function () {
            var _this$props = _this.props,
                toggleNode = _this$props.toggleNode,
                node = _this$props.node;


            toggleNode(node.id);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TreeNodeWithChildren, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                basePath = _props.basePath,
                cancelDropOnChildren = _props.cancelDropOnChildren,
                children = _props.children,
                classes = _props.classes,
                closeNode = _props.closeNode,
                expandNode = _props.expandNode,
                getIsNodeExpanded = _props.getIsNodeExpanded,
                isExpanded = _props.isExpanded,
                node = _props.node,
                resource = _props.resource,
                toggleNode = _props.toggleNode,
                TreeNode = _props.treeNodeComponent,
                treeNodeWithChildrenComponent = _props.treeNodeWithChildrenComponent,
                TreeNodeContent = _props.treeNodeContentComponent,
                props = _objectWithoutProperties(_props, ['basePath', 'cancelDropOnChildren', 'children', 'classes', 'closeNode', 'expandNode', 'getIsNodeExpanded', 'isExpanded', 'node', 'resource', 'toggleNode', 'treeNodeComponent', 'treeNodeWithChildrenComponent', 'treeNodeContentComponent']);

            return React.createElement(
                ExpansionPanel,
                {
                    classes: {
                        root: classes.panel
                    },
                    elevation: 0,
                    expanded: isExpanded || getIsNodeExpanded(node.id),
                    onChange: this.handleChange
                },
                React.createElement(
                    ExpansionPanelSummary,
                    {
                        classes: {
                            content: classes.panelSummaryContent,
                            expandIcon: classes.expandIcon,
                            root: classes.panelSummary,
                            expanded: classes.panelSummaryExpanded
                        },
                        expandIcon: React.createElement(KeyboardArrowDown, null)
                    },
                    React.createElement(
                        TreeNodeContent,
                        _extends({
                            key: 'TreeNodeContent' + node.id,
                            basePath: basePath,
                            node: node,
                            resource: resource,
                            cancelDropOnChildren: cancelDropOnChildren,
                            classes: {
                                handle: classes.handle
                            }
                        }, props),
                        children
                    )
                ),
                React.createElement(
                    ExpansionPanelDetails,
                    {
                        classes: {
                            root: classes.panelDetails
                        }
                    },
                    React.createElement(
                        List,
                        { dense: true },
                        node.children.map(function (child) {
                            return React.createElement(
                                TreeNode,
                                _extends({
                                    key: 'TreeNode_' + child.id,
                                    basePath: basePath,
                                    classes: classes,
                                    node: child,
                                    getIsNodeExpanded: getIsNodeExpanded,
                                    resource: resource,
                                    treeNodeComponent: TreeNode,
                                    treeNodeWithChildrenComponent: treeNodeWithChildrenComponent,
                                    treeNodeContentComponent: TreeNodeContent,
                                    toggleNode: toggleNode,
                                    closeNode: closeNode,
                                    expandNode: expandNode
                                }, props),
                                children
                            );
                        })
                    )
                )
            );
        }
    }]);

    return TreeNodeWithChildren;
}(Component);

TreeNodeWithChildren.propTypes = {
    basePath: PropTypes.string.isRequired,
    cancelDropOnChildren: PropTypes.bool,
    children: PropTypes.node,
    classes: PropTypes.object,
    closeNode: PropTypes.func,
    expandNode: PropTypes.func,
    getIsNodeExpanded: PropTypes.func,
    isExpanded: PropTypes.bool,
    node: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    toggleNode: PropTypes.func,
    treeNodeComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    treeNodeContentComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    treeNodeWithChildrenComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};
export default TreeNodeWithChildren;