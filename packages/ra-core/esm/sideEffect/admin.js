import _regeneratorRuntime from 'babel-runtime/regenerator';
import { all } from 'redux-saga/effects';
import auth from './auth';
import callback from './callback';
import fetch from './fetch';
import error from './error';
import i18n from './i18n';
import notification from './notification';
import redirection from './redirection';
import accumulate from './accumulate';
import refresh from './refresh';
import undo from './undo';

/**
 * @param {Object} dataProvider A Data Provider function
 */
export default (function (dataProvider, authProvider, i18nProvider) {
    return (/*#__PURE__*/_regeneratorRuntime.mark(function admin() {
            return _regeneratorRuntime.wrap(function admin$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return all([i18n(i18nProvider)(), auth(authProvider)(), undo(), fetch(dataProvider)(), error(), accumulate(), redirection(), refresh(), notification(), callback()]);

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, admin, this);
        })
    );
});