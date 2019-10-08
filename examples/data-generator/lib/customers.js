'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _en = require('faker/locale/en');

var _utils = require('./utils');

exports.default = function (db, _ref) {
    var serializeDate = _ref.serializeDate;
    return Array.from(Array(900).keys()).map(function (id) {
        var first_seen = (0, _utils.randomDate)();
        var last_seen = (0, _utils.randomDate)(first_seen);
        var has_ordered = (0, _utils.weightedBoolean)(25);
        var first_name = _en.name.firstName();
        var last_name = _en.name.lastName();
        var email = _en.internet.email(first_name, last_name);
        var birthday = has_ordered ? _en.date.past(60) : null;
        return {
            id: id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            address: has_ordered ? _en.address.streetName() : null,
            zipcode: has_ordered ? _en.address.zipCode() : null,
            city: has_ordered ? _en.address.city() : null,
            avatar: _en.internet.avatar(),
            birthday: serializeDate && birthday ? birthday.toISOString() : birthday,
            first_seen: serializeDate ? first_seen.toISOString() : first_seen,
            last_seen: serializeDate ? last_seen.toISOString() : last_seen,
            has_ordered: has_ordered,
            latest_purchase: null, // finalize
            has_newsletter: has_ordered ? (0, _utils.weightedBoolean)(30) : true,
            groups: [], // finalize
            nb_commands: 0,
            total_spent: 0
        };
    });
};

module.exports = exports['default'];