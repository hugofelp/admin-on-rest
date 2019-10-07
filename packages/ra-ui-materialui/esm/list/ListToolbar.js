import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

var styles = {
    toolbar: {
        justifyContent: 'space-between'
    }
};

var ListToolbar = function ListToolbar(_ref) {
    var _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? {} : _ref$classes,
        filters = _ref.filters,
        actions = _ref.actions,
        bulkActions = _ref.bulkActions,
        exporter = _ref.exporter,
        rest = _objectWithoutProperties(_ref, ['classes', 'filters', 'actions', 'bulkActions', 'exporter']);

    return React.createElement(
        Toolbar,
        { className: classes.toolbar },
        filters && React.cloneElement(filters, _extends({}, rest, {
            context: 'form'
        })),
        React.createElement('span', null),
        actions && React.cloneElement(actions, _extends({}, rest, {
            className: classes.actions,
            bulkActions: bulkActions,
            exporter: exporter,
            filters: filters
        }))
    );
};

ListToolbar.propTypes = {
    classes: PropTypes.object,
    filters: PropTypes.element,
    actions: PropTypes.element,
    bulkActions: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    exporter: PropTypes.func
};

export default withStyles(styles)(ListToolbar);