import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import { types } from './authActions';

const defaultTokenInfo = {
    token: false,
    expiration: null,
    userId: null,
};

const token = (state = defaultTokenInfo, action) => {
    switch (action.type) {
        case types.SET_TOKEN:
            return action.payload;
        case types.CLEAR_TOKEN:
            return defaultTokenInfo;
        default:
            return state;
    }
};

const userInfo = (state = null, action) => {
    switch (action.type) {
        case types.SET_USER_INFO:
            return action.payload;
        case types.UPDATE_USER_INFO: {
            let changed = false;
            const newState = Object.assign({}, state);
            if (action.payload.name && action.payload.name != state.name) {
                newState.name = action.payload.name;
                changed = true;
            }
            if (action.payload.roleId != null && action.payload.roleId != undefined && action.payload.roleId != state.roleId) {
                newState.roleId = action.payload.roleId;
                changed = true;
            }
            if (changed) {
                return newState;
            } else {
                return state;
            }
        }
        case types.CLEAR_USER_INFO:
            return null;
        default:
            return state;
    }
};

const permissions = (state = null, action) => {
    switch (action.type) {
        case types.SET_PERMISSIONS:
            return action.payload;
        case types.CLEAR_PERMISSIONS:
            return null;
        default:
            return state;
    }
};

const reducer = combineReducers({
    token,
    userInfo,
    permissions,
});

const models = {
    token: PropTypes.exact({
        token: PropTypes.bool.isRequired,
        expiration: PropTypes.instanceOf(Date),
        userId: PropTypes.number,
    }),
    userInfo: PropTypes.exact({
        name: PropTypes.string.isRequired,
        roleId: PropTypes.number.isRequired,
        registerDate: PropTypes.string,
        hasPhoto: PropTypes.bool.isRequired,
    }),
    permissions: PropTypes.arrayOf({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }),
};

export {
    reducer,
    models,
};