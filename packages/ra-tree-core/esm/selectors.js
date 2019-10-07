export var getIsNodeExpanded = function getIsNodeExpanded(state, resource, nodeId) {
    return state[resource] && state[resource][nodeId] || false;
};