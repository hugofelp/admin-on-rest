export var INITIALIZE_FORM = 'RA/INITIALIZE_FORM';
export var RESET_FORM = 'RA/RESET_FORM';
export var BEFORE_LOCATION_CHANGE = 'RA/BEFORE_LOCATION_CHANGE';

export var initializeForm = function initializeForm(initialValues) {
    return {
        type: INITIALIZE_FORM,
        payload: initialValues
    };
};

export var resetForm = function resetForm() {
    return {
        type: RESET_FORM
    };
};

export var beforeLocationChange = function beforeLocationChange(_ref) {
    var payload = _ref.payload,
        meta = _ref.meta;
    return {
        type: BEFORE_LOCATION_CHANGE,
        payload: payload,
        meta: meta
    };
};