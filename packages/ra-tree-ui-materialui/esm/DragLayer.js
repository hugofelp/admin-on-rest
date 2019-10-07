import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/**
 * Custom DragLayer from Alejandro Hernandez
 * See https://github.com/react-dnd/react-dnd/issues/592#issuecomment-399287474
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import isEqual from 'lodash/isEqual';
var styles = {
    layer: {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    },
    item: {}
};

var CustomDragLayer = function (_Component) {
    _inherits(CustomDragLayer, _Component);

    function CustomDragLayer() {
        _classCallCheck(this, CustomDragLayer);

        return _possibleConstructorReturn(this, (CustomDragLayer.__proto__ || Object.getPrototypeOf(CustomDragLayer)).apply(this, arguments));
    }

    _createClass(CustomDragLayer, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return !isEqual(this.props.offset, nextProps.offset);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                beingDragged = _props.beingDragged,
                DragPreview = _props.dragPreviewComponent,
                itemBeingDragged = _props.itemBeingDragged,
                offset = _props.offset;

            if (!beingDragged || !offset) return null;

            return React.createElement(
                'div',
                { className: classes.layer },
                React.createElement(
                    'div',
                    {
                        role: 'presentation',
                        className: classes.item,
                        style: {
                            transform: 'translate(' + offset.x + 'px, ' + offset.y + 'px)'
                        }
                    },
                    React.createElement(DragPreview, { node: itemBeingDragged })
                )
            );
        }
    }]);

    return CustomDragLayer;
}(Component);

CustomDragLayer.propTypes = {
    beingDragged: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    dragPreviewComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    itemBeingDragged: PropTypes.object,
    offset: PropTypes.object
};


export default compose(withStyles(styles), DragLayer(function (monitor) {
    return {
        itemBeingDragged: monitor.getItem(),
        componentType: monitor.getItemType(),
        beingDragged: monitor.isDragging(),
        offset: monitor.getSourceClientOffset()
    };
}))(CustomDragLayer);