import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { cloneElement, Children, Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import IconDragHandle from '@material-ui/icons/DragHandle';

var TreeNodeContent = function (_Component) {
    _inherits(TreeNodeContent, _Component);

    function TreeNodeContent() {
        _classCallCheck(this, TreeNodeContent);

        return _possibleConstructorReturn(this, (TreeNodeContent.__proto__ || Object.getPrototypeOf(TreeNodeContent)).apply(this, arguments));
    }

    _createClass(TreeNodeContent, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                classes = _props.classes,
                connectDragPreview = _props.connectDragPreview,
                connectDragSource = _props.connectDragSource,
                Container = _props.containerElement,
                expandNode = _props.expandNode,
                submit = _props.submit,
                isLeaf = _props.isLeaf,
                node = _props.node,
                props = _objectWithoutProperties(_props, ['children', 'classes', 'connectDragPreview', 'connectDragSource', 'containerElement', 'expandNode', 'submit', 'isLeaf', 'node']);

            return React.createElement(
                Fragment,
                null,
                cloneElement(Children.only(children), _extends({ node: node }, props)),
                connectDragPreview && connectDragPreview(React.createElement('span', null), {
                    // IE fallback: specify that we'd rather screenshot the node
                    // when it already knows it's being dragged so we can hide it with CSS.
                    captureDraggingState: true
                }),
                connectDragSource && connectDragSource(React.createElement(
                    'div',
                    { className: classes.handle },
                    React.createElement(IconDragHandle, null)
                ))
            );
        }
    }]);

    return TreeNodeContent;
}(Component);

TreeNodeContent.propTypes = {
    basePath: PropTypes.string.isRequired,
    cancelDropOnChildren: PropTypes.bool,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    containerElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    expandNode: PropTypes.func,
    isLeaf: PropTypes.bool,
    node: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    submit: PropTypes.func
};
TreeNodeContent.defaultProps = {
    containerElement: 'div'
};


export default TreeNodeContent;