import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import { arrayToTree } from 'performant-array-to-tree';

/**
 * Recursivly create nodes.
 */
var createNode = function createNode(_ref) {
    var children = _ref.children,
        node = _objectWithoutProperties(_ref, ['children']);

    return {
        id: node.data.id,
        record: node.data,
        children: children ? children.map(function (child) {
            return createNode(child);
        }) : []
    };
};

/**
 * Recursivly add a parent property to every nodes so that they can a reference to their parent
 */
var addParent = function addParent(node, parent) {
    return _extends({}, node, {
        children: node.children.map(function (child) {
            return addParent(child, node);
        }),
        parent: parent
    });
};

/**
 * Build a tree representation of the data returned by the List component
 */
export default (function (data, parentSource) {
    // arrayToTree requires top level nodes to have their parent id set to null
    var sanitizedData = data.map(function (item) {
        return _extends({}, item, _defineProperty({}, parentSource, item[parentSource] || null));
    });

    return arrayToTree(sanitizedData, {
        id: 'id',
        parentId: parentSource
    }).map(function (node) {
        return createNode(node, 1);
    }).map(function (node) {
        return addParent(node, null);
    });
});