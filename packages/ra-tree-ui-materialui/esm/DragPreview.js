import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'ra-core';

var styles = function styles(theme) {
    return {
        item: {
            alignItems: 'center',
            backgroundColor: theme.palette.action.active,
            display: 'inline-flex',
            height: 72,
            minWidth: 72,
            paddingTop: theme.spacing.unit * 1.5,
            paddingBottom: theme.spacing.unit * 1.5,
            paddingLeft: theme.spacing.unit * 6,
            paddingRight: theme.spacing.unit * 4
        }
    };
};

var DragPreview = function (_Component) {
    _inherits(DragPreview, _Component);

    function DragPreview() {
        _classCallCheck(this, DragPreview);

        return _possibleConstructorReturn(this, (DragPreview.__proto__ || Object.getPrototypeOf(DragPreview)).apply(this, arguments));
    }

    _createClass(DragPreview, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                className = _props.className,
                classes = _props.classes,
                node = _props.node,
                style = _props.style,
                translate = _props.translate;

            return React.createElement(
                'div',
                { className: className || classes.item, style: style },
                children ? typeof children === 'function' ? children({ node: node, translate: translate }) : children : translate('ra.tree.drag_preview', {
                    id: node.id,
                    smart_count: node.children.length
                })
            );
        }
    }]);

    return DragPreview;
}(Component);

DragPreview.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    className: PropTypes.string,
    classes: PropTypes.object,
    node: PropTypes.object,
    style: PropTypes.object,
    translate: PropTypes.func.isRequired
};

export default compose(translate, withStyles(styles))(DragPreview);