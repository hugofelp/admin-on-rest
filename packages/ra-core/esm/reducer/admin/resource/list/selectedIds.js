import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import { SET_LIST_SELECTED_IDS, TOGGLE_LIST_ITEM } from '../../../../actions/listActions';
import { CRUD_DELETE_OPTIMISTIC } from '../../../../actions/dataActions';

var initialState = [];

export default (function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case SET_LIST_SELECTED_IDS:
            return action.payload;
        case TOGGLE_LIST_ITEM:
            {
                var index = previousState.indexOf(action.payload);
                if (index > -1) {
                    return [].concat(_toConsumableArray(previousState.slice(0, index)), _toConsumableArray(previousState.slice(index + 1)));
                } else {
                    return [].concat(_toConsumableArray(previousState), [action.payload]);
                }
            }
        case CRUD_DELETE_OPTIMISTIC:
            {
                var _index = previousState.indexOf(action.payload.id);
                if (_index === -1) {
                    return previousState;
                }
                return [].concat(_toConsumableArray(previousState.slice(0, _index)), _toConsumableArray(previousState.slice(_index + 1)));
            }
        default:
            return action.meta && action.meta.unselectAll ? initialState : previousState;
    }
});