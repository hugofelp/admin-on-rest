import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React, { Children, Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var handleSubmit = _ref.handleSubmit,
        handleSubmitWithRedirect = _ref.handleSubmitWithRedirect,
        invalid = _ref.invalid,
        pristine = _ref.pristine,
        saving = _ref.saving,
        submitOnEnter = _ref.submitOnEnter,
        rest = _objectWithoutProperties(_ref, ['handleSubmit', 'handleSubmitWithRedirect', 'invalid', 'pristine', 'saving', 'submitOnEnter']);

    return rest;
};

/**
 * This component ensure form related props are not passed to its children. This is required
 * in `NodeActions` is used inside a NodeForm and buttons not related to form (such as EditButton
 * or DeleteButton) are used.
 *
 * @example
 * const CustomNodeActions = props => (
 *     <NodeActions {...props}>
 *         <SaveButton variant="flat" />
 *         <IgnoreFormProps>
 *             <EditButton />
 *             <ShowButton />
 *             <DeleteButton />
 *         </IgnoreFormProps>
 *     </NodeActions>
 * );
 */
var IgnoreFormProps = function IgnoreFormProps(_ref2) {
    var children = _ref2.children,
        props = _objectWithoutProperties(_ref2, ['children']);

    return React.createElement(
        Fragment,
        null,
        Children.map(children, function (child) {
            return cloneElement(child, sanitizeRestProps(props));
        })
    );
};

IgnoreFormProps.propTypes = {
    children: PropTypes.node.isRequired
};

export default IgnoreFormProps;