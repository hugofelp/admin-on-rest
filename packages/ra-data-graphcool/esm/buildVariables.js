import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _typeof from 'babel-runtime/helpers/typeof';
import _extends from 'babel-runtime/helpers/extends';
import { GET_LIST, GET_ONE, GET_MANY, GET_MANY_REFERENCE, CREATE, UPDATE, DELETE } from 'react-admin';

var buildGetListVariables = function buildGetListVariables(introspectionResults) {
    return function (resource, aorFetchType, params) {
        var filter = Object.keys(params.filter).reduce(function (acc, key) {
            if (key === 'ids') {
                return _extends({}, acc, { id_in: params.filter[key] });
            }

            if (_typeof(params.filter[key]) === 'object') {
                var type = introspectionResults.types.find(function (t) {
                    return t.name === resource.type.name + 'Filter';
                });
                var filterSome = type.inputFields.find(function (t) {
                    return t.name === key + '_some';
                });

                if (filterSome) {
                    var _filter = Object.keys(params.filter[key]).reduce(function (acc, k) {
                        return _extends({}, acc, _defineProperty({}, k + '_in', params.filter[key][k]));
                    }, {});
                    return _extends({}, acc, _defineProperty({}, key + '_some', _filter));
                }
            }

            var parts = key.split('.');

            if (parts.length > 1) {
                if (parts[1] == 'id') {
                    var _type = introspectionResults.types.find(function (t) {
                        return t.name === resource.type.name + 'Filter';
                    });
                    var _filterSome = _type.inputFields.find(function (t) {
                        return t.name === parts[0] + '_some';
                    });

                    if (_filterSome) {
                        return _extends({}, acc, _defineProperty({}, parts[0] + '_some', { id: params.filter[key] }));
                    }

                    return _extends({}, acc, _defineProperty({}, parts[0], { id: params.filter[key] }));
                }

                var resourceField = resource.type.fields.find(function (f) {
                    return f.name === parts[0];
                });
                if (resourceField.type.name === 'Int') {
                    return _extends({}, acc, _defineProperty({}, key, parseInt(params.filter[key])));
                }
                if (resourceField.type.name === 'Float') {
                    return _extends({}, acc, _defineProperty({}, key, parseFloat(params.filter[key])));
                }
            }

            return _extends({}, acc, _defineProperty({}, key, params.filter[key]));
        }, {});

        return {
            skip: parseInt((params.pagination.page - 1) * params.pagination.perPage),
            first: parseInt(params.pagination.perPage),
            orderBy: params.sort.field + '_' + params.sort.order,
            filter: filter
        };
    };
};

var buildCreateUpdateVariables = function buildCreateUpdateVariables() {
    return function (resource, aorFetchType, params, queryType) {
        return Object.keys(params.data).reduce(function (acc, key) {
            if (Array.isArray(params.data[key])) {
                var arg = queryType.args.find(function (a) {
                    return a.name === key + 'Ids';
                });

                if (arg) {
                    return _extends({}, acc, _defineProperty({}, key + 'Ids', params.data[key].map(function (_ref) {
                        var id = _ref.id;
                        return id;
                    })));
                }
            }

            if (_typeof(params.data[key]) === 'object') {
                var _arg = queryType.args.find(function (a) {
                    return a.name === key + 'Id';
                });

                if (_arg) {
                    return _extends({}, acc, _defineProperty({}, key + 'Id', params.data[key].id));
                }
            }

            return _extends({}, acc, _defineProperty({}, key, params.data[key]));
        }, {});
    };
};

export default (function (introspectionResults) {
    return function (resource, aorFetchType, params, queryType) {
        switch (aorFetchType) {
            case GET_LIST:
                {
                    return buildGetListVariables(introspectionResults)(resource, aorFetchType, params, queryType);
                }
            case GET_MANY:
                return {
                    filter: { id_in: params.ids }
                };
            case GET_MANY_REFERENCE:
                {
                    var parts = params.target.split('.');

                    return {
                        filter: _defineProperty({}, parts[0], { id: params.id })
                    };
                }
            case GET_ONE:
                return {
                    id: params.id
                };
            case UPDATE:
                {
                    return buildCreateUpdateVariables(introspectionResults)(resource, aorFetchType, params, queryType);
                }

            case CREATE:
                {
                    return buildCreateUpdateVariables(introspectionResults)(resource, aorFetchType, params, queryType);
                }

            case DELETE:
                return {
                    id: params.id
                };
        }
    };
});