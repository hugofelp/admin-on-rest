import _regeneratorRuntime from 'babel-runtime/regenerator';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, call, put, take, cancelled } from 'redux-saga/effects';
import { CRUD_GET_LIST, CRUD_GET_ONE, FETCH_START, FETCH_END } from 'react-admin';
import omit from 'lodash/omit';

import buildAction from './buildAction';
import createObserverChannel from './createObserverChannel';

export var watchCrudActionsFactory = function watchCrudActionsFactory(observeRequest) {
    return (/*#__PURE__*/_regeneratorRuntime.mark(function watchCrudActions(action) {
            var params, _action$meta, fetchType, resource, observer, realtimeChannel, payload, type, requestPayload, meta, raAction;

            return _regeneratorRuntime.wrap(function watchCrudActions$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            params = action.payload, _action$meta = action.meta, fetchType = _action$meta.fetch, resource = _action$meta.resource;
                            _context.next = 3;
                            return call(observeRequest, fetchType, resource, params);

                        case 3:
                            observer = _context.sent;

                            if (observer) {
                                _context.next = 6;
                                break;
                            }

                            return _context.abrupt('return');

                        case 6:
                            _context.next = 8;
                            return call(createObserverChannel, observer);

                        case 8:
                            realtimeChannel = _context.sent;
                            _context.prev = 9;

                        case 10:
                            if (!true) {
                                _context.next = 26;
                                break;
                            }

                            _context.next = 13;
                            return take(realtimeChannel);

                        case 13:
                            payload = _context.sent;
                            type = action.type, requestPayload = action.payload, meta = action.meta;
                            _context.next = 17;
                            return [put({
                                type: type + '_LOADING',
                                payload: requestPayload,
                                meta: omit(meta, 'fetch')
                            }), put({ type: FETCH_START })];

                        case 17:
                            _context.next = 19;
                            return call(buildAction, action, payload);

                        case 19:
                            raAction = _context.sent;
                            _context.next = 22;
                            return put(raAction);

                        case 22:
                            _context.next = 24;
                            return put({ type: FETCH_END });

                        case 24:
                            _context.next = 10;
                            break;

                        case 26:
                            _context.prev = 26;
                            _context.next = 29;
                            return cancelled() && realtimeChannel;

                        case 29:
                            if (!_context.sent) {
                                _context.next = 31;
                                break;
                            }

                            realtimeChannel.close();

                        case 31:
                            return _context.finish(26);

                        case 32:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, watchCrudActions, this, [[9,, 26, 32]]);
        })
    );
};

export var watchLocationChangeFactory = function watchLocationChangeFactory(watchCrudActions) {
    return (/*#__PURE__*/_regeneratorRuntime.mark(function watchLocationChange() {
            return _regeneratorRuntime.wrap(function watchLocationChange$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return takeLatest([CRUD_GET_LIST, CRUD_GET_ONE], watchCrudActions);

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, watchLocationChange, this);
        })
    );
};

export default (function (observeQuery) {
    return (/*#__PURE__*/_regeneratorRuntime.mark(function realtimeSaga() {
            var watchCrudActions;
            return _regeneratorRuntime.wrap(function realtimeSaga$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            watchCrudActions = watchCrudActionsFactory(observeQuery);
                            _context3.next = 3;
                            return takeLatest(LOCATION_CHANGE, watchLocationChangeFactory(watchCrudActions));

                        case 3:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, realtimeSaga, this);
        })
    );
});