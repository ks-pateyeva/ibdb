/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Authorization from './authorization.jsx';
import { actions, selectors, utils, models } from './';
import { errors, actions as errorHandlerActions} from '../errorHandler';
import logger from '../../../../logger.js';

function withSubscription(WrappedComponent) {
    const HOC = class extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = { localStorageChecked: false };
        }

        componentDidMount() {
            const token = utils.getTokenFromCookies();
            if (token) {
                this.props.setToken(token);
            }
            this.setState({
                localStorageChecked: true,
            });
        }

        componentDidUpdate () {
            if (this.props.tokenState && !this.props.authorized) {
                this.props.getUserData();
            }
            if (!this.props.tokenState && this.props.authorized && !this.props.sessionExpired) {
                this.props.setSessionExpiredError();
            }
            if (this.props.sessionExpired) {
                this.props.logOut();
            }
        }

        render() {
            return (
                <WrappedComponent
                    localStorageChecked={this.state.localStorageChecked}
                    tokenState={this.props.tokenState}
                    authorized={this.props.authorized}
                >
                    {this.props.children}
                </WrappedComponent>
            );
        }
    };

    HOC.propTypes = {
        //token: models.reducer.token,
        tokenState: models.selector.tokenState.isRequired,
        authorized: models.selector.authorization.isRequired,
        sessionExpired: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired,
        //FUNC
        setToken: PropTypes.func.isRequired,
        getUserData: PropTypes.func.isRequired,
        logOut: PropTypes.func.isRequired,
        setSessionExpiredError: PropTypes.func.isRequired,
    };

    return HOC;
}

const mapStateToProps = (state) => ({
    token: state.authorization.token,
    tokenState: selectors.tokenStateSelector(state),
    authorized: selectors.authorizationSelector(state),
    sessionExpired: state.errors.authorizationErrors.find((error) => error == errors.SESSION_EXPIRED) != null
        || state.errors.error == errors.SESSION_EXPIRED,
});

const mapDispatchToProps = (dispatch) => ({
    setToken: (token) => dispatch(actions.token.set(token)),
    getUserData: () => dispatch(actions.getUserData()),
    logOut: (token) => dispatch(actions.logOut(token)),
    setSessionExpiredError: () => dispatch(errorHandlerActions.authorizationErrors.set(errors.SESSION_EXPIRED)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withSubscription(Authorization));