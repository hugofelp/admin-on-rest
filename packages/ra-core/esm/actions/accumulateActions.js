import _extends from 'babel-runtime/helpers/extends';
import { crudGetMany, crudGetMatching } from './dataActions';

export var CRUD_GET_MANY_ACCUMULATE = 'RA/CRUD_GET_MANY_ACCUMULATE';

export var crudGetManyAccumulate = function crudGetManyAccumulate(resource, ids) {
    return {
        type: CRUD_GET_MANY_ACCUMULATE,
        payload: { resource: resource, ids: ids },
        meta: { accumulate: crudGetMany }
    };
};

export var CRUD_GET_MATCHING_ACCUMULATE = 'RA/CRUD_GET_MATCHING_ACCUMULATE';

export var crudGetMatchingAccumulate = function crudGetMatchingAccumulate(reference, relatedTo, pagination, sort, filter) {
    var action = crudGetMatching(reference, relatedTo, pagination, sort, filter);

    return {
        type: CRUD_GET_MATCHING_ACCUMULATE,
        meta: {
            accumulate: function accumulate() {
                return action;
            },
            accumulateValues: function accumulateValues() {
                return true;
            },
            accumulateKey: JSON.stringify(_extends({
                resource: reference,
                relatedTo: relatedTo
            }, action.payload))
        }
    };
};