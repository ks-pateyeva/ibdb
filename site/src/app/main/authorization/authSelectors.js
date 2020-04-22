import { createSelector } from 'reselect';
import PropTypes from 'prop-types';

const token = state => state.authorization.token.token;
const expiration = state => state.authorization.token.expiration;
const userInfo = state => state.authorization.userInfo;
const permissions = state => state.authorization.permissions;

const tokenStateSelector = createSelector(
    token,
    expiration,
    (token, expiration) => {
        if (token) {
            const today = new Date();
            const tokenDate = new Date(expiration);
            return today < tokenDate;
        } else {
            return false;
        }
    }
);

const authorizationSelector = createSelector(
    userInfo,
    permissions,
    (userInfo, permissions) => !!(userInfo && permissions)
);

const models = {
    tokenState: PropTypes.bool,
    authorization: PropTypes.bool,
};

const selectors =  {
    tokenStateSelector,
    authorizationSelector,
};

export {
    models,
    selectors,
};