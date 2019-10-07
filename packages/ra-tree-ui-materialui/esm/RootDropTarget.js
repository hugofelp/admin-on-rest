import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import IconGetApp from '@material-ui/icons/GetApp';

import { DROP_TARGET_TYPE } from './constants';
import { translate } from 'ra-core';

var styles = function styles(theme) {
    return {
        root: {
            paddingLeft: theme.spacing.unit * 6
        },
        text: {
            paddingLeft: theme.spacing.unit * 2,
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit
        },
        hover: {
            backgroundColor: theme.palette.action.active
        }
    };
};

var RootDropTarget = function (_Component) {
    _inherits(RootDropTarget, _Component);

    function RootDropTarget() {
        _classCallCheck(this, RootDropTarget);

        return _possibleConstructorReturn(this, (RootDropTarget.__proto__ || Object.getPrototypeOf(RootDropTarget)).apply(this, arguments));
    }

    _createClass(RootDropTarget, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return this.props.canDrop !== nextProps.canDrop || this.props.isOverCurrent !== nextProps.isOverCurrent;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                canDrop = _props.canDrop,
                classes = _props.classes,
                connectDropTarget = _props.connectDropTarget,
                isOverCurrent = _props.isOverCurrent,
                translate = _props.translate;

            return React.createElement(
                ListItem,
                {
                    className: classNames(classes.root, _defineProperty({}, classes.hover, canDrop && isOverCurrent)),
                    disabled: !canDrop
                },
                React.createElement(IconGetApp, null),
                connectDropTarget(React.createElement(
                    'div',
                    null,
                    React.createElement(
                        Typography,
                        { className: classes.text },
                        translate('ra.tree.root_target')
                    )
                ))
            );
        }
    }]);

    return RootDropTarget;
}(Component);

RootDropTarget.propTypes = {
    canDrop: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOverCurrent: PropTypes.bool,
    translate: PropTypes.func.isRequired
};


var dropTargetSpecs = {
    drop: function drop(props, monitor) {
        if (monitor.isOver({ shallow: true })) {
            return { id: null, record: { id: null } };
        }

        return undefined;
    },
    canDrop: function canDrop(props, monitor) {
        var item = monitor.getItem();
        return item.parent;
    }
};

var dropTargetConnect = function dropTargetConnect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        item: monitor.getItem()
    };
};

export default compose(DropTarget(DROP_TARGET_TYPE, dropTargetSpecs, dropTargetConnect), translate, withStyles(styles))(RootDropTarget);