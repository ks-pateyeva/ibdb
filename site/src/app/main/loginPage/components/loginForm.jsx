/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { models } from '../../errorHandler';
import InputGroup from './inputGroup.jsx';
import Errors from './errors.jsx';
import Button from 'react-bootstrap-button-loader';

export default class LoginForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { buttonPressed: false, usernameValid: null, passwordValid: null };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onInput = this.onInput.bind(this);
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    componentDidUpdate() {
        logger.update("LoginForms");
        if (this.state.buttonPressed && this.props.authorizationErrors && this.props.authorizationErrors.length > 0) {
            this.setState({ buttonPressed: false });
            this.usernameRef.current.value = "";
            this.passwordRef.current.value = "";
            this.setState({
                usernameValid: null,
                passwordValid: null,
            });
        }
    }

    //login button pressed
    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.clearErrors();
        let valid = true;
        if (!this.usernameRef.current.value.trim()) {
            valid = false;
            this.setState({ usernameValid: false });
        }
        if (!this.passwordRef.current.value.trim()) {
            valid = false;
            this.setState({ passwordValid: false });
        }
        if (!valid) {
            return;
        }
        this.setState({ buttonPressed: true });
        const login = this.usernameRef.current.value.trim();
        const password = this.passwordRef.current.value.trim();
        if (login && password) {
            this.props.authorize(login, password);
        }
    }

    onInput(type, value) {
        //this.props.clearAuthorizationError();
        if (type == "username") {
            const usernameValid = (value && value.length > 0);
            if (usernameValid != this.state.usernameValid) {
                this.setState({
                    usernameValid: usernameValid,
                });
            }
        }
        if (type == "password") {
            const passwordValid = (value && value.length > 0);
            if (passwordValid != this.state.passwordValid) {
                this.setState({
                    passwordValid: passwordValid,
                });
            }
        }
    }

    render () {
        return (
            <form className="login-page__form" onSubmit={this.handleSubmit}>
                <InputGroup type="username" valid={this.state.usernameValid} onInput={this.onInput} inputRef={this.usernameRef} />
                <InputGroup type="password" valid={this.state.passwordValid} onInput={this.onInput} inputRef={this.passwordRef} />
                <Errors authorizationErrors={this.props.authorizationErrors} />
                <Button className="login-page__submit-button" variant="login" onClick={this.handleSubmit} loading={this.state.buttonPressed}>
                    {this.state.buttonPressed ? "" : "Sign in"}
                </Button>
                <input type="submit"
                    className="login-page__hidden-input"
                    tabIndex="-1"
                />
            </form>
        );
    }
}

LoginForm.propTypes = {
    authorizationErrors: models.authorizationErrors.isRequired,
    clearErrors: PropTypes.func.isRequired,
    authorize: PropTypes.func.isRequired,
};