import _extends from 'babel-runtime/helpers/extends';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultGetTreeFromArray from './getTreeFromArray';
import { getIsNodeExpanded } from './selectors';
import { closeNode as closeNodeAction, expandNode as expandNodeAction, toggleNode as toggleNodeAction } from './actions';
import { Component } from 'react';

var defaultGetTreeState = function defaultGetTreeState(state) {
    return state.tree;
};

export var TreeControllerView = function (_Component) {
    _inherits(TreeControllerView, _Component);

    function TreeControllerView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TreeControllerView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TreeControllerView.__proto__ || Object.getPrototypeOf(TreeControllerView)).call.apply(_ref, [this].concat(args))), _this), _this.handleGetIsNodeExpanded = function (nodeId) {
            return getIsNodeExpanded(_this.props.treeState, _this.props.resource, nodeId);
        }, _this.handleCloseNode = function (nodeId) {
            return _this.props.closeNode(_this.props.resource, nodeId);
        }, _this.handleExpandNode = function (nodeId) {
            return _this.props.expandNode(_this.props.resource, nodeId);
        }, _this.handleToggleNode = function (nodeId) {
            return _this.props.toggleNode(_this.props.resource, nodeId);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TreeControllerView, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                closeNode = _props.closeNode,
                expandNode = _props.expandNode,
                _props$data = _props.data,
                fetchedAt = _props$data.fetchedAt,
                data = _objectWithoutProperties(_props$data, ['fetchedAt']),
                getTreeFromArray = _props.getTreeFromArray,
                getTreeState = _props.getTreeState,
                ids = _props.ids,
                parentSource = _props.parentSource,
                resource = _props.resource,
                toggleNode = _props.toggleNode,
                treeState = _props.treeState,
                props = _objectWithoutProperties(_props, ['children', 'closeNode', 'expandNode', 'data', 'getTreeFromArray', 'getTreeState', 'ids', 'parentSource', 'resource', 'toggleNode', 'treeState']);

            var availableData = ids.reduce(function (acc, id) {
                return [].concat(_toConsumableArray(acc), [data[id]]);
            }, []);
            var tree = getTreeFromArray(Object.values(availableData), parentSource);

            return children(_extends({
                getIsNodeExpanded: this.handleGetIsNodeExpanded,
                parentSource: parentSource,
                tree: tree,
                closeNode: this.handleCloseNode,
                expandNode: this.handleExpandNode,
                toggleNode: this.handleToggleNode,
                resource: resource
            }, props));
        }
    }]);

    return TreeControllerView;
}(Component);

TreeControllerView.propTypes = {
    basePath: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    closeNode: PropTypes.func.isRequired,
    expandNode: PropTypes.func.isRequired,
    ids: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    getTreeFromArray: PropTypes.func,
    getTreeState: PropTypes.func,
    parentSource: PropTypes.string,
    resource: PropTypes.string.isRequired,
    toggleNode: PropTypes.func.isRequired,
    treeState: PropTypes.object
};
var mapStateToProps = function mapStateToProps(state, _ref2) {
    var getTreeState = _ref2.getTreeState;
    return {
        treeState: getTreeState(state)
    };
};

var TreeController = connect(mapStateToProps, {
    closeNode: closeNodeAction,
    expandNode: expandNodeAction,
    toggleNode: toggleNodeAction
})(TreeControllerView);

TreeController.defaultProps = {
    getTreeFromArray: defaultGetTreeFromArray,
    getTreeState: defaultGetTreeState,
    parentSource: 'parent_id'
};

export default TreeController;