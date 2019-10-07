import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import FakeRest from 'fakerest';
import { GET_LIST, GET_ONE, GET_MANY, GET_MANY_REFERENCE, CREATE, UPDATE, UPDATE_MANY, DELETE, DELETE_MANY } from 'react-admin';

/* eslint-disable no-console */
function log(type, resource, params, response) {
    if (console.group) {
        // Better logging in Chrome
        console.groupCollapsed(type, resource, JSON.stringify(params));
        console.log(response);
        console.groupEnd();
    } else {
        console.log('FakeRest request ', type, resource, params);
        console.log('FakeRest response', response);
    }
}

/**
 * Respond to react-admin data queries using a local JavaScript object
 *
 * Useful for debugging and testing - do not use in production.
 *
 * @example
 * import fakeDataProvider from 'ra-data-fakerest';
 * const dataProvider = fakeDataProvider({
 *   posts: [
 *     { id: 0, title: 'Hello, world!' },
 *     { id: 1, title: 'FooBar' },
 *   ],
 *   comments: [
 *     { id: 0, post_id: 0, author: 'John Doe', body: 'Sensational!' },
 *     { id: 1, post_id: 0, author: 'Jane Doe', body: 'I agree' },
 *   ],
 * })
 */
export default (function (data) {
    var loggingEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var restServer = new FakeRest.Server();
    restServer.init(data);
    if (window) {
        window.restServer = restServer; // give way to update data in the console
    }

    function getResponse(type, resource, params) {
        switch (type) {
            case GET_LIST:
                {
                    var _params$pagination = params.pagination,
                        page = _params$pagination.page,
                        perPage = _params$pagination.perPage;
                    var _params$sort = params.sort,
                        field = _params$sort.field,
                        order = _params$sort.order;

                    var query = {
                        sort: [field, order],
                        range: [(page - 1) * perPage, page * perPage - 1],
                        filter: params.filter
                    };
                    return {
                        data: restServer.getAll(resource, query),
                        total: restServer.getCount(resource, {
                            filter: params.filter
                        })
                    };
                }
            case GET_ONE:
                return {
                    data: restServer.getOne(resource, params.id, _extends({}, params))
                };
            case GET_MANY:
                return {
                    data: restServer.getAll(resource, {
                        filter: { id: params.ids }
                    })
                };
            case GET_MANY_REFERENCE:
                {
                    var _params$pagination2 = params.pagination,
                        _page = _params$pagination2.page,
                        _perPage = _params$pagination2.perPage;
                    var _params$sort2 = params.sort,
                        _field = _params$sort2.field,
                        _order = _params$sort2.order;

                    var _query = {
                        sort: [_field, _order],
                        range: [(_page - 1) * _perPage, _page * _perPage - 1],
                        filter: _extends({}, params.filter, _defineProperty({}, params.target, params.id))
                    };
                    return {
                        data: restServer.getAll(resource, _query),
                        total: restServer.getCount(resource, {
                            filter: _query.filter
                        })
                    };
                }
            case UPDATE:
                return {
                    data: restServer.updateOne(resource, params.id, _extends({}, params.data))
                };
            case UPDATE_MANY:
                params.ids.forEach(function (id) {
                    return restServer.updateOne(resource, id, _extends({}, params.data));
                });
                return { data: params.ids };
            case CREATE:
                return {
                    data: restServer.addOne(resource, _extends({}, params.data))
                };
            case DELETE:
                return { data: restServer.removeOne(resource, params.id) };
            case DELETE_MANY:
                params.ids.forEach(function (id) {
                    return restServer.removeOne(resource, id);
                });
                return { data: params.ids };
            default:
                return false;
        }
    }

    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Promise} The response
     */
    return function (type, resource, params) {
        var collection = restServer.getCollection(resource);
        if (!collection) {
            return new Promise(function (_, reject) {
                return reject(new Error('Undefined collection "' + resource + '"'));
            });
        }
        var response = void 0;
        try {
            response = getResponse(type, resource, params);
        } catch (error) {
            return new Promise(function (_, reject) {
                return reject(error);
            });
        }
        if (response === false) {
            return new Promise(function (_, reject) {
                return reject(new Error('Unsupported fetch action type ' + type));
            });
        }
        if (loggingEnabled) {
            log(type, resource, params, response);
        }
        return new Promise(function (resolve) {
            return resolve(response);
        });
    };
});