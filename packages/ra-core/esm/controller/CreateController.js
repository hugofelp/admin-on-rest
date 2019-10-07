import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import inflection from 'inflection';
import { parse } from 'query-string';

import translate from '../i18n/translate';
import { crudCreate as crudCreateAction } from '../actions';

/**
 * Page component for the Create view
 *
 * The `<Create>` component renders the page title and actions.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Create>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Create, SimpleForm, TextInput } from 'react-admin';
 *
 *     export const PostCreate = (props) => (
 *         <Create {...props}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Create>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostCreate } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" create={PostCreate} />
 *         </Admin>
 *     );
 *     export default App;
 */
export var CreateController = function (_Component) {
    _inherits(CreateController, _Component);

    function CreateController(props) {
        _classCallCheck(this, CreateController);

        var _this = _possibleConstructorReturn(this, (CreateController.__proto__ || Object.getPrototypeOf(CreateController)).call(this, props));

        _initialiseProps.call(_this);

        var _this$props = _this.props,
            _this$props$location = _this$props.location,
            state = _this$props$location.state,
            search = _this$props$location.search,
            record = _this$props.record;

        _this.record = state && state.record ? state.record : search ? parse(search, { arrayFormat: 'bracket' }) : record;
        return _this;
    }

    _createClass(CreateController, [{
        key: 'defaultRedirectRoute',
        value: function defaultRedirectRoute() {
            var _props = this.props,
                hasShow = _props.hasShow,
                hasEdit = _props.hasEdit;

            if (hasEdit) return 'edit';
            if (hasShow) return 'show';
            return 'list';
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                basePath = _props2.basePath,
                children = _props2.children,
                isLoading = _props2.isLoading,
                resource = _props2.resource,
                translate = _props2.translate;


            if (!children) return null;

            var resourceName = translate('resources.' + resource + '.name', {
                smart_count: 1,
                _: inflection.humanize(inflection.singularize(resource))
            });
            var defaultTitle = translate('ra.page.create', {
                name: '' + resourceName
            });
            return children({
                isLoading: isLoading,
                defaultTitle: defaultTitle,
                save: this.save,
                resource: resource,
                basePath: basePath,
                record: this.record,
                redirect: this.defaultRedirectRoute(),
                translate: translate
            });
        }
    }]);

    return CreateController;
}(Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.save = function (record, redirect) {
        _this2.props.crudCreate(_this2.props.resource, record, _this2.props.basePath, redirect);
    };
};

CreateController.propTypes = {
    basePath: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    crudCreate: PropTypes.func.isRequired,
    hasCreate: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasList: PropTypes.bool,
    hasShow: PropTypes.bool,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    record: PropTypes.object,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    translate: PropTypes.func.isRequired
};

CreateController.defaultProps = {
    record: {}
};

function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0
    };
}

export default compose(connect(mapStateToProps, { crudCreate: crudCreateAction }), translate)(CreateController);