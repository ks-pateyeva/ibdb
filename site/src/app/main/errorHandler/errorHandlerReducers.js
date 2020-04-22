import { combineReducers } from 'redux';
import errors from './errors.js';
import PropTypes from 'prop-types';
import { types } from './errorHandlerActions.js';

const error = (state = null, action) => {
    switch (action.type) {
        case types.SET_ERROR:
            return action.payload;
        case types.CLEAR_ERROR:
            return null;
        default:
            return state;
    }
};

const authorizationErrors = (state = [], action) => {
    switch (action.type) {
        case types.SET_AUTHORIZATION_ERROR:
            return [
                ...state,
                action.payload,
            ];
        case types.CLEAR_AUTHORIZATION_ERROR:
            return [];
        default:
            return state;
    }
};

const models = {
    error: PropTypes.oneOf([
        errors.INTERNAL_SERVER_ERROR,
        errors.BAD_LOGIN_DATA,
        errors.SESSION_EXPIRED,
        errors.FORBIDDEN,
        errors.PAGE_NOT_FOUND,
        errors.EMPTY_USERNAME_FIELD,
        errors.EMPTY_PASSWORD_FIELD,
    ]),
    authorizationErrors: PropTypes.array,
};

const reducer = combineReducers({
    error,
    authorizationErrors,
});

export {
    reducer,
    models,
};