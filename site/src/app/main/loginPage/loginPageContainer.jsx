/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { actions as errorHandlerActions } from '../errorHandler';
import { actions as authorizationActions } from '../authorization';
import LoginPage from './LoginPage.jsx';

const mapStateToProps = (state) => ({
    authorizationErrors: state.errors.authorizationErrors,
});

const mapDispatchToProps = (dispatch) => ({
    clearErrors: () => {
        dispatch(errorHandlerActions.authorizationErrors.clear());
        dispatch(errorHandlerActions.error.clear());
    },
    authorize: (username, password) => dispatch(authorizationActions.token.get(JSON.stringify({ Name: username, Password: password }))),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);