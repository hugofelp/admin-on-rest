import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import { CLOSE_NODE, TOGGLE_NODE, EXPAND_NODE } from './actions';

var initialState = {};

export default (function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref = arguments[1];
    var type = _ref.type,
        nodeId = _ref.payload,
        meta = _ref.meta;

    if (![CLOSE_NODE, TOGGLE_NODE, EXPAND_NODE].includes(type)) {
        return state;
    }
    if (!meta.resource) {
        console.warn('The ' + type + ' action does not have a resource meta'); // eslint-disable-line
        return state;
    }

    return _extends({}, state, _defineProperty({}, meta.resource, _extends({}, state[meta.resource] || {}, _defineProperty({}, nodeId, type === TOGGLE_NODE ? state[meta.resource] ? !state[meta.resource][nodeId] : true : type === EXPAND_NODE))));
});