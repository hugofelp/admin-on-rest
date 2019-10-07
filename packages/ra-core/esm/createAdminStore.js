import _regeneratorRuntime from 'babel-runtime/regenerator';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { USER_LOGOUT } from './actions/authActions';
import createAppReducer from './reducer';
import { adminSaga } from './sideEffect';
import { defaultI18nProvider } from './i18n';
import formMiddleware from './form/formMiddleware';

export default (function (_ref) {
    var authProvider = _ref.authProvider,
        _ref$customReducers = _ref.customReducers,
        customReducers = _ref$customReducers === undefined ? {} : _ref$customReducers,
        _ref$customSagas = _ref.customSagas,
        customSagas = _ref$customSagas === undefined ? [] : _ref$customSagas,
        dataProvider = _ref.dataProvider,
        _ref$i18nProvider = _ref.i18nProvider,
        i18nProvider = _ref$i18nProvider === undefined ? defaultI18nProvider : _ref$i18nProvider,
        history = _ref.history,
        initialState = _ref.initialState,
        _ref$locale = _ref.locale,
        locale = _ref$locale === undefined ? 'en' : _ref$locale;

    var messages = i18nProvider(locale);
    var appReducer = createAppReducer(customReducers, locale, messages);

    var resettableAppReducer = function resettableAppReducer(state, action) {
        return appReducer(action.type !== USER_LOGOUT ? state : undefined, action);
    };
    var saga = /*#__PURE__*/_regeneratorRuntime.mark(function rootSaga() {
        return _regeneratorRuntime.wrap(function rootSaga$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return all([adminSaga(dataProvider, authProvider, i18nProvider)].concat(_toConsumableArray(customSagas)).map(fork));

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, rootSaga, this);
    });
    var sagaMiddleware = createSagaMiddleware();
    var store = createStore(resettableAppReducer, initialState, compose(applyMiddleware(sagaMiddleware, formMiddleware, routerMiddleware(history)), typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : function (f) {
        return f;
    }));
    sagaMiddleware.run(saga);
    return store;
});