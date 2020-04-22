/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { models } from './';
import Error from '../../common/components/error.jsx';

export default class ErrorHandler extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentWillUnmount() {
      logger.debug("ErrorHandler: Component unmount, clearing errors");
      this.props.clearError();
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    render () {
        if (this.props.error || this.state.error) {
            let error = this.props.error ? this.props.error : this.state.error;
            logger.error("ErrorHandler: ", error);
            if (typeof(error) != "string") {
                error = "Something went wrong";
            }
            return <Error error={error} key={error} />;
        } else {
            return this.props.children;
        }
    }
}

ErrorHandler.propTypes = {
    error: models.error,
    clearError: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};