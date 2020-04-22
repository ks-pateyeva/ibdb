/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { models as routesModels } from '../routes';

export default class PermissionChecker extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        if (this.props.protected && !this.props.allowedPages.find((page) => page.url == this.props.url)) {
            this.props.setForbiddenError();
        }
    }

    render () {
        if (!this.props.protected || this.props.allowedPages.find((page) => page.url == this.props.url) != null) {
            return this.props.children;
        } else {
            return null;
        }
    }
}

PermissionChecker.propTypes = {
    allowedPages: routesModels.allowedPages,
    protected: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    //FUNC
    setForbiddenError: PropTypes.func.isRequired,
};