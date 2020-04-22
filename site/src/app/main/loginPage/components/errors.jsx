/* eslint-disable no-unused-vars */
import React from 'react';
import { models } from '../../errorHandler';

export default class Errors extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render () {
        if (this.props.authorizationErrors.length > 0) {
            return (
                <div>
                    {this.props.authorizationErrors.map((error) => (
                        <div className="login-page__error" key={error}>
                            {error}
                        </div>
                    ))}
                </div>
            );
        } else {
            return null;
        }
    }
}

Errors.propTypes = {
    authorizationErrors: models.authorizationErrors.isRequired,
};