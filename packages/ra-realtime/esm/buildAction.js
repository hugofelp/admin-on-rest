import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import { FETCH_END } from 'react-admin';

export default (function (_ref, payload) {
    var type = _ref.type,
        requestPayload = _ref.payload,
        _ref$meta = _ref.meta,
        restType = _ref$meta.fetch,
        meta = _objectWithoutProperties(_ref$meta, ['fetch']);

    return {
        type: type + '_SUCCESS',
        payload: payload,
        requestPayload: requestPayload,
        meta: _extends({}, meta, { fetchResponse: restType, fetchStatus: FETCH_END })
    };
});