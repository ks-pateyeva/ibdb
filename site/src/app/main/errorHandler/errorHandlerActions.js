const SET_ERROR = 'SET_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';
const SET_AUTHORIZATION_ERROR = 'SET_AUTHORIZATION_ERROR';
const CLEAR_AUTHORIZATION_ERROR = 'CLEAR_AUTHORIZATION_ERROR';

const setError = (payload) => ({ type: SET_ERROR, payload });
const clearError = () => ({ type: CLEAR_ERROR });
const setAuthorizationError = (payload) => ({ type: SET_AUTHORIZATION_ERROR, payload });
const clearAuthorizationError = () => ({ type: CLEAR_AUTHORIZATION_ERROR });

const actions = {
    error: {
        set: setError,
        clear: clearError,
    },
    authorizationErrors: {
        set: setAuthorizationError,
        clear: clearAuthorizationError,
    },
};

const types = {
    SET_ERROR,
    CLEAR_ERROR,
    SET_AUTHORIZATION_ERROR,
    CLEAR_AUTHORIZATION_ERROR,
};

export {
    actions,
    types,
};