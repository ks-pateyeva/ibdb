/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

export default class InputGroup extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render () {
        const mod = this.props.valid == null ? "" : (this.props.valid ? "--after-input" : "--not-valid");
        const inputClassName = `login-page__input${mod}`;
        const labelClassName = `login-page__label${mod}`;
        return (
            <div className="login-page__input-group" >
                <input
                    className={inputClassName}
                    id={this.props.type}
                    ref={this.props.inputRef}
                    type={this.props.type == "password" ? "password" : "text"}
                    placeholder={this.props.type == "password" ? "Password" : "Username"}
                    autoComplete="on"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    onChange={(event) => this.props.onInput(this.props.type, event.target.value)}
                />
                <label className={labelClassName}>
                    {this.props.type == "password" ? "Password" : "Username"}
                </label>
            </div>
        );
    }
}

InputGroup.propTypes = {
    valid: PropTypes.bool,
    type: PropTypes.oneOf([ "password", "username" ]).isRequired,
    onInput: PropTypes.func.isRequired,
    inputRef: PropTypes.object.isRequired,
};