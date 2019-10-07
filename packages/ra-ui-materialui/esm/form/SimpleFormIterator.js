import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/RemoveCircleOutline';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { translate } from 'ra-core';
import classNames from 'classnames';

import FormInput from '../form/FormInput';

var styles = function styles(theme) {
    var _line;

    return {
        root: {
            padding: 0,
            marginBottom: 0,
            '& > li:last-child': {
                borderBottom: 'none'
            }
        },
        line: (_line = {
            display: 'flex',
            listStyleType: 'none',
            borderBottom: 'solid 1px ' + theme.palette.divider
        }, _defineProperty(_line, theme.breakpoints.down('xs'), { display: 'block' }), _defineProperty(_line, '&.fade-enter', {
            opacity: 0.01,
            transform: 'translateX(100vw)'
        }), _defineProperty(_line, '&.fade-enter-active', {
            opacity: 1,
            transform: 'translateX(0)',
            transition: 'all 500ms ease-in'
        }), _defineProperty(_line, '&.fade-exit', {
            opacity: 1,
            transform: 'translateX(0)'
        }), _defineProperty(_line, '&.fade-exit-active', {
            opacity: 0.01,
            transform: 'translateX(100vw)',
            transition: 'all 500ms ease-in'
        }), _line),
        index: _defineProperty({
            width: '3em',
            paddingTop: '1em'
        }, theme.breakpoints.down('sm'), { display: 'none' }),
        form: { flex: 2 },
        action: {
            paddingTop: '0.5em'
        },
        leftIcon: {
            marginRight: theme.spacing.unit
        }
    };
};

export var SimpleFormIterator = function (_Component) {
    _inherits(SimpleFormIterator, _Component);

    function SimpleFormIterator(props) {
        _classCallCheck(this, SimpleFormIterator);

        // we need a unique id for each field for a proper enter/exit animation
        // but redux-form doesn't provide one (cf https://github.com/erikras/redux-form/issues/2735)
        // so we keep an internal map between the field position and an autoincrement id
        var _this = _possibleConstructorReturn(this, (SimpleFormIterator.__proto__ || Object.getPrototypeOf(SimpleFormIterator)).call(this, props));

        _this.removeField = function (index) {
            return function () {
                var fields = _this.props.fields;

                _this.ids.splice(index, 1);
                fields.remove(index);
            };
        };

        _this.addField = function () {
            var fields = _this.props.fields;

            _this.ids.push(_this.nextId++);
            fields.push({});
        };

        _this.nextId = props.fields.length ? props.fields.length : props.defaultValue ? props.defaultValue.length : 0;

        // We check whether we have a defaultValue (which must be an array) before checking
        // the fields prop which will always be empty for a new record.
        // Without it, our ids wouldn't match the default value and we would get key warnings
        // on the CssTransition element inside our render method
        _this.ids = _this.nextId > 0 ? Array.from(Array(_this.nextId).keys()) : [];
        return _this;
    }

    _createClass(SimpleFormIterator, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                basePath = _props.basePath,
                _props$classes = _props.classes,
                classes = _props$classes === undefined ? {} : _props$classes,
                children = _props.children,
                fields = _props.fields,
                _props$meta = _props.meta,
                error = _props$meta.error,
                submitFailed = _props$meta.submitFailed,
                record = _props.record,
                resource = _props.resource,
                source = _props.source,
                translate = _props.translate,
                disableAdd = _props.disableAdd,
                disableRemove = _props.disableRemove;

            var records = get(record, source);
            return fields ? React.createElement(
                'ul',
                { className: classes.root },
                submitFailed && error && React.createElement(
                    'span',
                    null,
                    error
                ),
                React.createElement(
                    TransitionGroup,
                    null,
                    fields.map(function (member, index) {
                        return React.createElement(
                            CSSTransition,
                            {
                                key: _this2.ids[index],
                                timeout: 500,
                                classNames: 'fade'
                            },
                            React.createElement(
                                'li',
                                { className: classes.line },
                                React.createElement(
                                    Typography,
                                    {
                                        variant: 'body1',
                                        className: classes.index
                                    },
                                    index + 1
                                ),
                                React.createElement(
                                    'section',
                                    { className: classes.form },
                                    Children.map(children, function (input, index2) {
                                        return React.createElement(FormInput, {
                                            basePath: input.props.basePath || basePath,
                                            input: cloneElement(input, {
                                                source: input.props.source ? member + '.' + input.props.source : member,
                                                index: input.props.source ? undefined : index2,
                                                label: input.props.label || input.props.source
                                            }),
                                            record: records && records[index] || {},
                                            resource: resource
                                        });
                                    })
                                ),
                                !disableRemove && React.createElement(
                                    'span',
                                    { className: classes.action },
                                    React.createElement(
                                        Button,
                                        {
                                            className: classNames('button-remove', 'button-remove-' + source + '-' + index),
                                            size: 'small',
                                            onClick: _this2.removeField(index)
                                        },
                                        React.createElement(CloseIcon, {
                                            className: classes.leftIcon
                                        }),
                                        translate('ra.action.remove')
                                    )
                                )
                            )
                        );
                    })
                ),
                !disableAdd && React.createElement(
                    'li',
                    { className: classes.line },
                    React.createElement(
                        'span',
                        { className: classes.action },
                        React.createElement(
                            Button,
                            {
                                className: classNames('button-add', 'button-add-' + source),
                                size: 'small',
                                onClick: this.addField
                            },
                            React.createElement(AddIcon, { className: classes.leftIcon }),
                            translate('ra.action.add')
                        )
                    )
                )
            ) : null;
        }
    }]);

    return SimpleFormIterator;
}(Component);

SimpleFormIterator.defaultProps = {
    disableAdd: false,
    disableRemove: false
};

SimpleFormIterator.propTypes = {
    defaultValue: PropTypes.any,
    basePath: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    fields: PropTypes.object,
    meta: PropTypes.object,
    record: PropTypes.object,
    source: PropTypes.string,
    resource: PropTypes.string,
    translate: PropTypes.func,
    disableAdd: PropTypes.bool,
    disableRemove: PropTypes.bool
};

export default compose(translate, withStyles(styles))(SimpleFormIterator);