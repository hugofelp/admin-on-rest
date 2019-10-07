import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { crudUpdate as crudUpdateAction, startUndoable as startUndoableAction } from 'ra-core';
import { expandNode as expandNodeAction } from 'ra-tree-core';

import { DROP_TARGET_TYPE } from './constants';

var dragSourceSpecs = {
    beginDrag: function beginDrag(props) {
        return props.node;
    },
    endDrag: function endDrag(_ref, monitor) {
        var basePath = _ref.basePath,
            dispatchCrudUpdate = _ref.dispatchCrudUpdate,
            expandNode = _ref.expandNode,
            node = _ref.node,
            parentSource = _ref.parentSource,
            resource = _ref.resource,
            startUndoable = _ref.startUndoable,
            _ref$undoableDragDrop = _ref.undoableDragDrop,
            undoableDragDrop = _ref$undoableDragDrop === undefined ? true : _ref$undoableDragDrop;

        if (!monitor.didDrop()) {
            return;
        }

        var droppedOnNode = monitor.getDropResult();
        if (typeof droppedOnNode.id === 'undefined' || droppedOnNode.id === node.record[parentSource]) {
            return;
        }

        // Ensure the node on which the dragged node has been dropped is expanded along with its parents
        // to avoid the dropped node to disappear
        var nodeToExpand = droppedOnNode;
        expandNode(resource, nodeToExpand.id);

        if (nodeToExpand.parent) {
            do {
                nodeToExpand = nodeToExpand.parent;
                expandNode(resource, nodeToExpand.id);
            } while (nodeToExpand.parent);
        }

        if (undoableDragDrop) {
            return startUndoable(crudUpdateAction(resource, node.record.id, _extends({}, node.record, _defineProperty({}, parentSource, droppedOnNode.id)), node.record, basePath, false));
        }

        return dispatchCrudUpdate(resource, node.record.id, _extends({}, node.record, _defineProperty({}, parentSource, droppedOnNode.id)), node.record, basePath, false);
    }
};

var dragSourceConnect = function dragSourceConnect(connect, monitor) {
    return {
        connectDragPreview: connect.dragPreview(),
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

export default compose(connect(undefined, {
    dispatchCrudUpdate: crudUpdateAction,
    expandNode: expandNodeAction,
    startUndoable: startUndoableAction
}), DragSource(DROP_TARGET_TYPE, dragSourceSpecs, dragSourceConnect));