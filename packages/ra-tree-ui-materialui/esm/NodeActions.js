import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { cloneElement, Children, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

var styles = function styles(theme) {
    return {
        root: {
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: theme.spacing.unit * 4
        }
    };
};

export var NodeActions = function (_Component) {
    _inherits(NodeActions, _Component);

    function NodeActions() {
        _classCallCheck(this, NodeActions);

        return _possibleConstructorReturn(this, (NodeActions.__proto__ || Object.getPrototypeOf(NodeActions)).apply(this, arguments));
    }

    _createClass(NodeActions, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                classes = _props.classes,
                props = _objectWithoutProperties(_props, ['children', 'classes']);

            return React.createElement(
                'span',
                { className: classes.root },
                Children.map(children, function (action) {
                    return action ? cloneElement(action, props) : null;
                })
            );
        }
    }]);

    return NodeActions;
}(Component);

NodeActions.propTypes = {
    classes: PropTypes.object.isRequired,
    basePath: PropTypes.string.isRequired,
    children: PropTypes.node,
    record: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired
};
export default withStyles(styles)(NodeActions);