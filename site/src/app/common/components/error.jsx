import React from 'react';
import PropTypes from 'prop-types';

export default class Error extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="alert alert-danger mt-1 mb-0 pt-1 pb-1" role="alert">
                {this.props.error}
            </div>
        );
    }
}

Error.propTypes = {
    error: PropTypes.string.isRequired,
};