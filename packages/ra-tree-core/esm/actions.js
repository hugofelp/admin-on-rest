export var TOGGLE_NODE = 'RA/TREE/TOGGLE_NODE';
export var EXPAND_NODE = 'RA/TREE/EXPAND_NODE';
export var CLOSE_NODE = 'RA/TREE/CLOSE_NODE';

export var toggleNode = function toggleNode(resource, nodeId) {
    return {
        type: TOGGLE_NODE,
        payload: nodeId,
        meta: { resource: resource }
    };
};

export var expandNode = function expandNode(resource, nodeId) {
    return {
        type: EXPAND_NODE,
        payload: nodeId,
        meta: { resource: resource }
    };
};

export var closeNode = function closeNode(resource, nodeId) {
    return {
        type: CLOSE_NODE,
        payload: nodeId,
        meta: { resource: resource }
    };
};