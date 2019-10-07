import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import { sanitizeListRestProps } from 'ra-core';

import CardActions from '../layout/CardActions';
import { CreateButton, ExportButton } from '../button';

var Actions = function Actions(_ref) {
    var bulkActions = _ref.bulkActions,
        currentSort = _ref.currentSort,
        className = _ref.className,
        resource = _ref.resource,
        filters = _ref.filters,
        displayedFilters = _ref.displayedFilters,
        exporter = _ref.exporter,
        filterValues = _ref.filterValues,
        hasCreate = _ref.hasCreate,
        basePath = _ref.basePath,
        selectedIds = _ref.selectedIds,
        onUnselectItems = _ref.onUnselectItems,
        showFilter = _ref.showFilter,
        rest = _objectWithoutProperties(_ref, ['bulkActions', 'currentSort', 'className', 'resource', 'filters', 'displayedFilters', 'exporter', 'filterValues', 'hasCreate', 'basePath', 'selectedIds', 'onUnselectItems', 'showFilter']);

    return React.createElement(
        CardActions,
        _extends({ className: className }, sanitizeListRestProps(rest)),
        bulkActions && cloneElement(bulkActions, {
            basePath: basePath,
            filterValues: filterValues,
            resource: resource,
            selectedIds: selectedIds,
            onUnselectItems: onUnselectItems
        }),
        filters && cloneElement(filters, {
            resource: resource,
            showFilter: showFilter,
            displayedFilters: displayedFilters,
            filterValues: filterValues,
            context: 'button'
        }),
        hasCreate && React.createElement(CreateButton, { basePath: basePath }),
        React.createElement(ExportButton, {
            resource: resource,
            sort: currentSort,
            filter: filterValues,
            exporter: exporter
        })
    );
};

Actions.propTypes = {
    bulkActions: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    basePath: PropTypes.string,
    className: PropTypes.string,
    currentSort: PropTypes.object,
    displayedFilters: PropTypes.object,
    exporter: PropTypes.func,
    filters: PropTypes.element,
    filterValues: PropTypes.object,
    hasCreate: PropTypes.bool,
    resource: PropTypes.string,
    onUnselectItems: PropTypes.func.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    showFilter: PropTypes.func
};

Actions.defaultProps = {
    selectedIds: []
};

export default onlyUpdateForKeys(['resource', 'filters', 'displayedFilters', 'filterValues', 'selectedIds'])(Actions);