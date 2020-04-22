/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import ErrorHandler from '../errorHandler/errorHandlerContainer.jsx';
import PermissionChecker from '../permissionChecker/permissionCheckerContainer.jsx';

export default class Page extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        document.title = this.props.title;
    }

    render () {
        logger.render(`PAGE: ${this.props.url}`);
        return (
            <ErrorHandler>
                <PermissionChecker url={this.props.url} protected={this.props.protected}>
                    {this.props.children}
                </PermissionChecker>
            </ErrorHandler>
        );
    }
}

Page.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    menuPage: PropTypes.string,
    protected: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};