'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRouterRedux = require('react-router-redux');

var _reduxForm = require('redux-form');

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _formActions = require('../actions/formActions');

var _constants = require('../form/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This middleware ensure that whenever a location change happen, we get the
 * chance to properly reset the redux-form record form, preventing data to be
 * kept between different resources or form types (CREATE, EDIT).
 *
 * A middleware is needed instead of a saga because we need to control the actions
 * order: we need to ensure we reset the redux form BEFORE the location actually
 * changes. Otherwise, the new page which may contain a record redux-form might
 * initialize before our reset and loose its data.
 */
var formMiddleware = function formMiddleware() {
    var previousLocation = void 0;
    return function (next) {
        return function (action) {
            if (action.type !== _reactRouterRedux.LOCATION_CHANGE || action.payload.state && action.payload.state.skipFormReset) {
                return next(action);
            }

            // history allows one to redirect to the same location which can happen
            // when using a special menu for a create page for instance. In this case,
            // we don't want to reset the form.
            // See https://github.com/marmelab/react-admin/issues/2291
            if ((0, _isEqual2.default)(action.payload, previousLocation)) {
                return next(action);
            }

            previousLocation = action.payload;
            next((0, _formActions.resetForm)());
            next((0, _reduxForm.destroy)(_constants.REDUX_FORM_NAME));
            return next(action);
        };
    };
};

exports.default = formMiddleware;
module.exports = exports['default'];