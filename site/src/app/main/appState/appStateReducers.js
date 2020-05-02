import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import { colorsArr } from './appStateUtils.js';
import { types } from './appStateActions.js';
import { setDataReducer } from '../../common/commonReducers.js';

const winSize = (state = {height: 0, width: 0}, action) => {
    switch (action.type) {
        case types.SET_WIN_SIZE:
            if (state !== action.payload) {
                return action.payload;
            } else {
                return state;
            }
        default:
            return state;
    }
};

const apiUrl = (state = null, action) => setDataReducer(state, action, types.SET_API_URL);

const colors = (state = colorsArr, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const sidebarState = (state = false, action) => {
    switch (action.type) {
        case types.SET_SIDEBAR_STATE:
            return (action.payload != null || action.payload != undefined) ? action.payload : !state;
        default:
            return state;
    }
};

const models = {
    winSize: PropTypes.exact({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
    }),
    apiUrl: PropTypes.string,
    sidebarState: PropTypes.bool,
};

const reducer = combineReducers({
    winSize,
    apiUrl,
    selectedPage,
    layoutConfig,
    colors,
    sidebarState,
});

export {
    reducer,
    models,
};