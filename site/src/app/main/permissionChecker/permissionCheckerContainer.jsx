/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { selectors as routesSelectors } from '../routes';
import { errors, actions as errorHandlerActions } from '../errorHandler';
import PermissionChecker from './permissonChecker.jsx';

const mapStateToProps = state => ({
      allowedPages: routesSelectors.allowedPagesSelector(state.authorization),
});

const mapDispatchToProps = (dispatch) => ({
        setForbiddenError: () => dispatch(errorHandlerActions.error.set(errors.FORBIDDEN)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PermissionChecker);