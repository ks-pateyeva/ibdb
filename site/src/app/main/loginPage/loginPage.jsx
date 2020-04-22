/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { models } from '../errorHandler';
import logo from './img/login-logo.png';
import LoginForm from './components/LoginForm.jsx';
import './loginPageStyles.scss';

export default class LoginPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = 'Login';
    }

    render() {
        logger.render('LoginPage');
        return (
            <div className="login-page">
                <div className="login-page__login-group">
                    <img className="login-page__logo" src={logo} />
                    <LoginForm
                        authorize={this.props.authorize}
                        //FUNC
                        authorizationErrors={this.props.authorizationErrors}
                        clearErrors={this.props.clearErrors}
                    />
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    authorizationErrors: models.authorizationErrors.isRequired,
    //FUNC
    clearErrors: PropTypes.func.isRequired,
    authorize: PropTypes.func.isRequired,
};