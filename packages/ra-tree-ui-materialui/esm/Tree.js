import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Children, Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { TreeController } from 'ra-tree-core';
import { DragDropContext } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import draggable from './draggable';
import droppable from './droppable';
import DragLayer from './DragLayer';
import DefaultDragPreview from './DragPreview';
import DefaultTreeNode from './TreeNode';
import DefaultTreeNodeContent from './TreeNodeContent';
import DefaultTreeNodeWithChildren from './TreeNodeWithChildren';
import RootDropTarget from './RootDropTarget';

export var styles = {
    root: {
        display: 'flex',
        flexDirection: 'column'
    }
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var currentSort = _ref.currentSort,
        defaultTitle = _ref.defaultTitle,
        displayedFilters = _ref.displayedFilters,
        filterValues = _ref.filterValues,
        hasBulkActions = _ref.hasBulkActions,
        hasCreate = _ref.hasCreate,
        hideFilter = _ref.hideFilter,
        isLoading = _ref.isLoading,
        getTreeState = _ref.getTreeState,
        perPage = _ref.perPage,
        selectedIds = _ref.selectedIds,
        setFilters = _ref.setFilters,
        setPage = _ref.setPage,
        setPerPage = _ref.setPerPage,
        setSelectedIds = _ref.setSelectedIds,
        setSort = _ref.setSort,
        showFilter = _ref.showFilter,
        rest = _objectWithoutProperties(_ref, ['currentSort', 'defaultTitle', 'displayedFilters', 'filterValues', 'hasBulkActions', 'hasCreate', 'hideFilter', 'isLoading', 'getTreeState', 'perPage', 'selectedIds', 'setFilters', 'setPage', 'setPerPage', 'setSelectedIds', 'setSort', 'showFilter']);

    return rest;
};

var warnAboutChildren = function warnAboutChildren() {
    return console.warn( // eslint-disable-line
    'You passed multiple children to the Tree component. You must either pass it a NodeView or a NodeForm component as its only child:\n\n    <Tree>\n        <NodeView>\n            <TextField source="name" />\n        </NodeView>\n    </Tree>\n\n    // Or\n\n    <Tree>\n        <NodeForm>\n            <TextInput source="name" />\n        </NodeForm>\n    </Tree>\n\nIf you need actions on each node, use the actions prop on either the NodeView or NodeForm component:\n\n    const MyNodeActions = props => (\n        <NodeActions {...props}>\n            <EditButton />\n            <ShowButton />\n            <DeleteButton />\n        </NodeActions>\n    );\n\n    <Tree>\n        <NodeView actions={<MyNodeActions />}>\n            <TextField source="name" />\n        </NodeView>\n    </Tree>\n\n    // Or\n\n    const MyNodeActions = props => (\n        <NodeActions {...props}>\n            <SaveButton variant="flat" />\n            <IgnoreFormProps>\n                <EditButton />\n                <ShowButton />\n                <DeleteButton />\n            </IgnoreFormProps>\n        </NodeActions>\n    );\n\n    <Tree>\n        <NodeForm actions={<MyNodeActions />}>\n            <TextInput source="name" />\n        </NodeForm>\n    </Tree>\n');
};

export var Tree = function (_Component) {
    _inherits(Tree, _Component);

    function Tree() {
        _classCallCheck(this, Tree);

        return _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).apply(this, arguments));
    }

    _createClass(Tree, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var childrenCount = Children.count(this.props.children);

            if (childrenCount > 1 && process.env.NODE_ENV !== 'production') {
                warnAboutChildren();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                allowDropOnRoot = _props.allowDropOnRoot,
                children = _props.children,
                classes = _props.classes,
                dragPreviewComponent = _props.dragPreviewComponent,
                enableDragAndDrop = _props.enableDragAndDrop,
                parentSource = _props.parentSource,
                treeNodeComponent = _props.treeNodeComponent,
                treeNodeWithChildrenComponent = _props.treeNodeWithChildrenComponent,
                treeNodeContentComponent = _props.treeNodeContentComponent,
                props = _objectWithoutProperties(_props, ['allowDropOnRoot', 'children', 'classes', 'dragPreviewComponent', 'enableDragAndDrop', 'parentSource', 'treeNodeComponent', 'treeNodeWithChildrenComponent', 'treeNodeContentComponent']);

            var Container = enableDragAndDrop ? DragDropContext(TouchBackend({
                enableKeyboardEvents: true,
                enableMouseEvents: true,
                enableTouchEvents: true
            }))('div') : Fragment;

            var TreeNode = enableDragAndDrop ? droppable(treeNodeComponent) : treeNodeComponent;

            var TreeNodeContent = enableDragAndDrop ? draggable(treeNodeContentComponent) : treeNodeContentComponent;

            return React.createElement(
                TreeController,
                _extends({ parentSource: parentSource }, props),
                function (_ref2) {
                    var getTreeState = _ref2.getTreeState,
                        tree = _ref2.tree,
                        controllerProps = _objectWithoutProperties(_ref2, ['getTreeState', 'tree']);

                    return React.createElement(
                        Container,
                        null,
                        enableDragAndDrop ? React.createElement(DragLayer, {
                            dragPreviewComponent: dragPreviewComponent
                        }) : null,
                        React.createElement(
                            List,
                            {
                                classes: {
                                    root: classes.root
                                },
                                dense: true,
                                disablePadding: true
                            },
                            enableDragAndDrop && allowDropOnRoot ? React.createElement(RootDropTarget, { parentSource: parentSource }) : null,
                            tree.map(function (node) {
                                return React.createElement(
                                    TreeNode,
                                    _extends({
                                        key: 'TreeNode_' + node.id,
                                        classes: _extends({}, classes, {
                                            root: classes.node || undefined
                                        }),
                                        getTreeState: getTreeState,
                                        node: node,
                                        treeNodeComponent: TreeNode,
                                        treeNodeWithChildrenComponent: treeNodeWithChildrenComponent,
                                        treeNodeContentComponent: TreeNodeContent
                                    }, sanitizeRestProps(controllerProps)),
                                    children
                                );
                            })
                        )
                    );
                }
            );
        }
    }]);

    return Tree;
}(Component);

Tree.propTypes = {
    allowDropOnRoot: PropTypes.bool,
    basePath: PropTypes.string.isRequired,
    children: PropTypes.node,
    classes: PropTypes.object,
    enableDragAndDrop: PropTypes.bool,
    getTreeFromArray: PropTypes.func,
    parentSource: PropTypes.string,
    resource: PropTypes.string.isRequired,
    dragPreviewComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    treeNodeComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    treeNodeContentComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    treeNodeWithChildrenComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

Tree.defaultProps = {
    classes: {},
    parentSource: 'parent_id',
    dragPreviewComponent: DefaultDragPreview,
    treeNodeComponent: DefaultTreeNode,
    treeNodeContentComponent: DefaultTreeNodeContent,
    treeNodeWithChildrenComponent: DefaultTreeNodeWithChildren
};

export default withStyles(styles)(Tree);