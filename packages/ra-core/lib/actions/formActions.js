'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var INITIALIZE_FORM = exports.INITIALIZE_FORM = 'RA/INITIALIZE_FORM';
var RESET_FORM = exports.RESET_FORM = 'RA/RESET_FORM';
var BEFORE_LOCATION_CHANGE = exports.BEFORE_LOCATION_CHANGE = 'RA/BEFORE_LOCATION_CHANGE';

var initializeForm = exports.initializeForm = function initializeForm(initialValues) {
    return {
        type: INITIALIZE_FORM,
        payload: initialValues
    };
};

var resetForm = exports.resetForm = function resetForm() {
    return {
        type: RESET_FORM
    };
};

var beforeLocationChange = exports.beforeLocationChange = function beforeLocationChange(_ref) {
    var payload = _ref.payload,
        meta = _ref.meta;
    return {
        type: BEFORE_LOCATION_CHANGE,
        payload: payload,
        meta: meta
    };
};