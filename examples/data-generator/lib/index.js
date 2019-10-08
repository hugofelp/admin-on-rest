'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _customers = require('./customers');

var _customers2 = _interopRequireDefault(_customers);

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _products = require('./products');

var _products2 = _interopRequireDefault(_products);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

var _reviews = require('./reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _finalize = require('./finalize');

var _finalize2 = _interopRequireDefault(_finalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { serializeDate: true };

    var db = {};
    db.customers = (0, _customers2.default)(db, options);
    db.categories = (0, _categories2.default)(db, options);
    db.products = (0, _products2.default)(db, options);
    db.commands = (0, _commands2.default)(db, options);
    db.reviews = (0, _reviews2.default)(db, options);
    (0, _finalize2.default)(db);

    return db;
};

module.exports = exports['default'];