/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { actions } from '../errorHandler';
import ErrorHandler from './errorHandler.jsx';

const mapStateToProps = (state) => ({
	error: state.errors.error,
});

const mapDispatchToProps = (dispatch) => ({
    clearError: () => dispatch(actions.error.clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler);