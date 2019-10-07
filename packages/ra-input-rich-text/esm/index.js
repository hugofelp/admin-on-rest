import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import debounce from 'lodash/debounce';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import { addField } from 'react-admin';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

export var RichTextInput = function (_Component) {
    _inherits(RichTextInput, _Component);

    function RichTextInput() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RichTextInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RichTextInput.__proto__ || Object.getPrototypeOf(RichTextInput)).call.apply(_ref, [this].concat(args))), _this), _this.onTextChange = function () {
            var value = _this.editor.innerHTML == '<p><br></p>' ? '' : _this.editor.innerHTML;
            _this.props.input.onChange(value);
        }, _this.updateDivRef = function (ref) {
            _this.divRef = ref;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RichTextInput, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                value = _props.input.value,
                toolbar = _props.toolbar;


            this.quill = new Quill(this.divRef, {
                modules: { toolbar: toolbar },
                theme: 'snow'
            });

            this.quill.setContents(this.quill.clipboard.convert(value));

            this.editor = this.divRef.querySelector('.ql-editor');
            this.quill.on('text-change', debounce(this.onTextChange, 500));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.quill.off('text-change', this.onTextChange);
            this.quill = null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$meta = this.props.meta,
                error = _props$meta.error,
                _props$meta$helperTex = _props$meta.helperText,
                helperText = _props$meta$helperTex === undefined ? false : _props$meta$helperTex;

            return React.createElement(
                FormControl,
                {
                    error: error,
                    fullWidth: this.props.fullWidth,
                    className: 'ra-rich-text-input'
                },
                React.createElement('div', { ref: this.updateDivRef }),
                error && React.createElement(
                    FormHelperText,
                    null,
                    error
                ),
                helperText && React.createElement(
                    FormHelperText,
                    null,
                    helperText
                )
            );
        }
    }]);

    return RichTextInput;
}(Component);

RichTextInput.propTypes = {
    addLabel: PropTypes.bool.isRequired,
    classes: PropTypes.object,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    source: PropTypes.string,
    toolbar: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    fullWidth: PropTypes.bool
};
RichTextInput.defaultProps = {
    addLabel: true,
    options: {},
    record: {},
    toolbar: true,
    fullWidth: true
};
var RichRextInputWithField = addField(withStyles(styles)(RichTextInput));

RichRextInputWithField.defaultProps = {
    addLabel: true,
    fullWidth: true
};
export default RichRextInputWithField;