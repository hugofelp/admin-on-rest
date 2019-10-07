import React from 'react';
import { SaveButton } from 'ra-ui-materialui';
import NodeActions from './NodeActions';

var NodeFormActions = function NodeFormActions(props) {
    return React.createElement(
        NodeActions,
        props,
        React.createElement(SaveButton, { variant: 'flat' })
    );
};

export default NodeFormActions;