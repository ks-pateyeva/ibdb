/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { models } from './';
import LoginPage from '../loginPage/loginPageContainer.jsx';

export default class Authorization extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.localStorageChecked) {
            logger.debug("Authorization: awaiting token from storage");
            return null;
        } else if (!this.props.tokenState) {
            logger.debug("Authorization: no token or token expired");
            return <LoginPage />;
        } else if (this.props.authorized) {
            logger.debug("Authorization: passed");
            return this.props.children;
        } else {
            logger.debug("Authorization: awaiting data load");
            return null;
        }
    }
}

Authorization.propTypes = {
    localStorageChecked: PropTypes.bool.isRequired,
    tokenState: models.selector.tokenState,
    authorized: models.selector.authorization,
    children: PropTypes.node.isRequired,
};