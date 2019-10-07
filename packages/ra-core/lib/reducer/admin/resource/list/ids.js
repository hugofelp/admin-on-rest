'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getIds = exports.addRecordIdsFactory = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _dataActions = require('../../../../actions/dataActions');

var _getFetchedAt = require('../../../../util/getFetchedAt');

var _getFetchedAt2 = _interopRequireDefault(_getFetchedAt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addRecordIdsFactory = exports.addRecordIdsFactory = function addRecordIdsFactory(getFetchedAt) {
    return function () {
        var newRecordIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var oldRecordIds = arguments[1];

        var newFetchedAt = getFetchedAt(newRecordIds, oldRecordIds.fetchedAt);
        var recordIds = (0, _uniq2.default)(oldRecordIds.filter(function (id) {
            return !!newFetchedAt[id];
        }).concat(newRecordIds));

        Object.defineProperty(recordIds, 'fetchedAt', {
            value: newFetchedAt
        }); // non enumerable by default
        return recordIds;
    };
};

var addRecordIds = addRecordIdsFactory(_getFetchedAt2.default);

exports.default = function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
        case _dataActions.CRUD_GET_LIST_SUCCESS:
            return addRecordIds(payload.data.map(function (_ref2) {
                var id = _ref2.id;
                return id;
            }), []);
        case _dataActions.CRUD_GET_MANY_SUCCESS:
        case _dataActions.CRUD_GET_MANY_REFERENCE_SUCCESS:
            return addRecordIds(payload.data.map(function (_ref3) {
                var id = _ref3.id;
                return id;
            }).filter(function (id) {
                return previousState.indexOf(id) !== -1;
            }), previousState);
        case _dataActions.CRUD_GET_ONE_SUCCESS:
        case _dataActions.CRUD_CREATE_SUCCESS:
        case _dataActions.CRUD_UPDATE_SUCCESS:
            return addRecordIds([payload.data.id], previousState);
        case _dataActions.CRUD_DELETE_OPTIMISTIC:
            {
                var index = previousState.map(function (el) {
                    return el == payload.id;
                }) // eslint-disable-line eqeqeq
                .indexOf(true);
                if (index === -1) {
                    return previousState;
                }
                var newState = [].concat((0, _toConsumableArray3.default)(previousState.slice(0, index)), (0, _toConsumableArray3.default)(previousState.slice(index + 1)));

                Object.defineProperty(newState, 'fetchedAt', {
                    value: previousState.fetchedAt
                });

                return newState;
            }
        case _dataActions.CRUD_DELETE_MANY_OPTIMISTIC:
            {
                var _newState = previousState.filter(function (el) {
                    return !payload.ids.includes(el);
                });
                Object.defineProperty(_newState, 'fetchedAt', {
                    value: previousState.fetchedAt
                });

                return _newState;
            }
        default:
            return previousState;
    }
};

var getIds = exports.getIds = function getIds(state) {
    return state;
};