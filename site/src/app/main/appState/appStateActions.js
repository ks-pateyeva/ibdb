export const SET_WIN_SIZE = 'SET_WIN_SIZE';
export const SET_API_URL = 'SET_API_URL';
export const SET_SIDEBAR_STATE = 'SET_SIDEBAR_STATE';

const winSizeSet = (payload) => ({ type: SET_WIN_SIZE, payload });
const apiUrlSet = (payload) => ({ type: SET_API_URL, payload });
const setSidebarState = (payload) => ({ type: SET_SIDEBAR_STATE, payload });

const actions = {
    winSize: {
        set: winSizeSet,
    },
    apiUrl: {
        set: apiUrlSet,
    },
    setSidebarState,
};

const types = {
    SET_WIN_SIZE,
    SET_API_URL,
    SET_SIDEBAR_STATE,
};

export {
    actions,
    types,
};