import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { ListController, getListControllerProps } from 'ra-core';

import Title from '../layout/Title';
import ListToolbar from './ListToolbar';
import DefaultPagination from './Pagination';
import DefaultBulkActionButtons from '../button/BulkDeleteButton';
import BulkActionsToolbar from './BulkActionsToolbar';
import DefaultActions from './ListActions';
import defaultTheme from '../defaultTheme';

var styles = {
    root: {},
    card: {
        position: 'relative'
    },
    actions: {
        zIndex: 2,
        display: 'flex',
        justifyContent: 'flex-end',
        flexWrap: 'wrap'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignSelf: 'flex-start'
    },
    noResults: { padding: 20 }
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var actions = _ref.actions,
        basePath = _ref.basePath,
        bulkActions = _ref.bulkActions,
        changeListParams = _ref.changeListParams,
        children = _ref.children,
        classes = _ref.classes,
        className = _ref.className,
        crudGetList = _ref.crudGetList,
        currentSort = _ref.currentSort,
        data = _ref.data,
        defaultTitle = _ref.defaultTitle,
        displayedFilters = _ref.displayedFilters,
        exporter = _ref.exporter,
        filter = _ref.filter,
        filterDefaultValues = _ref.filterDefaultValues,
        filters = _ref.filters,
        filterValues = _ref.filterValues,
        hasCreate = _ref.hasCreate,
        hasEdit = _ref.hasEdit,
        hasList = _ref.hasList,
        hasShow = _ref.hasShow,
        hideFilter = _ref.hideFilter,
        history = _ref.history,
        ids = _ref.ids,
        isLoading = _ref.isLoading,
        locale = _ref.locale,
        location = _ref.location,
        match = _ref.match,
        onSelect = _ref.onSelect,
        onToggleItem = _ref.onToggleItem,
        onUnselectItems = _ref.onUnselectItems,
        options = _ref.options,
        page = _ref.page,
        pagination = _ref.pagination,
        params = _ref.params,
        permissions = _ref.permissions,
        perPage = _ref.perPage,
        push = _ref.push,
        query = _ref.query,
        refresh = _ref.refresh,
        resource = _ref.resource,
        selectedIds = _ref.selectedIds,
        setFilters = _ref.setFilters,
        setPage = _ref.setPage,
        setPerPage = _ref.setPerPage,
        setSelectedIds = _ref.setSelectedIds,
        setSort = _ref.setSort,
        showFilter = _ref.showFilter,
        sort = _ref.sort,
        theme = _ref.theme,
        title = _ref.title,
        toggleItem = _ref.toggleItem,
        total = _ref.total,
        translate = _ref.translate,
        version = _ref.version,
        rest = _objectWithoutProperties(_ref, ['actions', 'basePath', 'bulkActions', 'changeListParams', 'children', 'classes', 'className', 'crudGetList', 'currentSort', 'data', 'defaultTitle', 'displayedFilters', 'exporter', 'filter', 'filterDefaultValues', 'filters', 'filterValues', 'hasCreate', 'hasEdit', 'hasList', 'hasShow', 'hideFilter', 'history', 'ids', 'isLoading', 'locale', 'location', 'match', 'onSelect', 'onToggleItem', 'onUnselectItems', 'options', 'page', 'pagination', 'params', 'permissions', 'perPage', 'push', 'query', 'refresh', 'resource', 'selectedIds', 'setFilters', 'setPage', 'setPerPage', 'setSelectedIds', 'setSort', 'showFilter', 'sort', 'theme', 'title', 'toggleItem', 'total', 'translate', 'version']);

    return rest;
};

var ListView = function ListView(_ref2) {
    var _ref2$actions = _ref2.actions,
        actions = _ref2$actions === undefined ? React.createElement(DefaultActions, null) : _ref2$actions,
        filters = _ref2.filters,
        bulkActions = _ref2.bulkActions,
        _ref2$bulkActionButto = _ref2.bulkActionButtons,
        bulkActionButtons = _ref2$bulkActionButto === undefined ? React.createElement(DefaultBulkActionButtons, null) : _ref2$bulkActionButto,
        _ref2$pagination = _ref2.pagination,
        pagination = _ref2$pagination === undefined ? React.createElement(DefaultPagination, null) : _ref2$pagination,
        children = _ref2.children,
        className = _ref2.className,
        _ref2$classes = _ref2.classes,
        classes = _ref2$classes === undefined ? {} : _ref2$classes,
        exporter = _ref2.exporter,
        title = _ref2.title,
        rest = _objectWithoutProperties(_ref2, ['actions', 'filters', 'bulkActions', 'bulkActionButtons', 'pagination', 'children', 'className', 'classes', 'exporter', 'title']);

    var defaultTitle = rest.defaultTitle,
        version = rest.version;

    var controllerProps = getListControllerProps(rest);

    return React.createElement(
        'div',
        _extends({
            className: classnames('list-page', classes.root, className)
        }, sanitizeRestProps(rest)),
        React.createElement(Title, { title: title, defaultTitle: defaultTitle }),
        React.createElement(
            Card,
            { className: classes.card },
            bulkActions !== false && bulkActionButtons !== false && bulkActionButtons && !bulkActions && React.createElement(
                BulkActionsToolbar,
                controllerProps,
                bulkActionButtons
            ),
            (filters || actions) && React.createElement(ListToolbar, _extends({
                filters: filters
            }, controllerProps, {
                actions: actions,
                bulkActions: bulkActions,
                exporter: exporter
            })),
            React.createElement(
                'div',
                { key: version },
                children && React.cloneElement(children, _extends({}, controllerProps, {
                    hasBulkActions: bulkActions !== false && bulkActionButtons !== false
                })),
                pagination && React.cloneElement(pagination, controllerProps)
            )
        )
    );
};

export { ListView };
ListView.propTypes = {
    actions: PropTypes.element,
    basePath: PropTypes.string,
    bulkActions: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    bulkActionButtons: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    children: PropTypes.element,
    className: PropTypes.string,
    classes: PropTypes.object,
    currentSort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.string
    }),
    data: PropTypes.object,
    defaultTitle: PropTypes.string,
    displayedFilters: PropTypes.object,
    exporter: PropTypes.func,
    filterDefaultValues: PropTypes.object,
    filters: PropTypes.element,
    filterValues: PropTypes.object,
    hasCreate: PropTypes.bool,
    hideFilter: PropTypes.func,
    ids: PropTypes.array,
    isLoading: PropTypes.bool,
    onSelect: PropTypes.func,
    onToggleItem: PropTypes.func,
    onUnselectItems: PropTypes.func,
    page: PropTypes.number,
    pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    perPage: PropTypes.number,
    refresh: PropTypes.func,
    resource: PropTypes.string,
    selectedIds: PropTypes.array,
    setFilters: PropTypes.func,
    setPage: PropTypes.func,
    setPerPage: PropTypes.func,
    setSort: PropTypes.func,
    showFilter: PropTypes.func,
    title: PropTypes.any,
    total: PropTypes.number,
    translate: PropTypes.func,
    version: PropTypes.number
};

/**
 * List page component
 *
 * The <List> component renders the list layout (title, buttons, filters, pagination),
 * and fetches the list of records from the REST API.
 * It then delegates the rendering of the list of records to its child component.
 * Usually, it's a <Datagrid>, responsible for displaying a table with one row for each post.
 *
 * In Redux terms, <List> is a connected component, and <Datagrid> is a dumb component.
 *
 * Props:
 *   - title
 *   - perPage
 *   - sort
 *   - filter (the permanent filter to apply to the query)
 *   - actions
 *   - filters (a React Element used to display the filter form)
 *   - pagination
 *
 * @example
 *     const PostFilter = (props) => (
 *         <Filter {...props}>
 *             <TextInput label="Search" source="q" alwaysOn />
 *             <TextInput label="Title" source="title" />
 *         </Filter>
 *     );
 *     export const PostList = (props) => (
 *         <List {...props}
 *             title="List of posts"
 *             sort={{ field: 'published_at' }}
 *             filter={{ is_published: true }}
 *             filters={<PostFilter />}
 *         >
 *             <Datagrid>
 *                 <TextField source="id" />
 *                 <TextField source="title" />
 *                 <EditButton />
 *             </Datagrid>
 *         </List>
 *     );
 */
var List = function List(props) {
    return React.createElement(
        ListController,
        props,
        function (controllerProps) {
            return React.createElement(ListView, _extends({}, props, controllerProps));
        }
    );
};

List.propTypes = {
    // the props you can change
    actions: PropTypes.element,
    bulkActions: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    bulkActionButtons: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    filter: PropTypes.object,
    filterDefaultValues: PropTypes.object,
    filters: PropTypes.element,
    pagination: PropTypes.element,
    perPage: PropTypes.number.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.string
    }),
    title: PropTypes.any,
    // the props managed by react-admin
    authProvider: PropTypes.func,
    hasCreate: PropTypes.bool.isRequired,
    hasEdit: PropTypes.bool.isRequired,
    hasList: PropTypes.bool.isRequired,
    hasShow: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    path: PropTypes.string,
    resource: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired
};

List.defaultProps = {
    filter: {},
    perPage: 10,
    theme: defaultTheme
};

export default withStyles(styles)(List);