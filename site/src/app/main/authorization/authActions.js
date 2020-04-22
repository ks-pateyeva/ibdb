//#region token
const GET_TOKEN = 'GET_TOKEN';
const SET_TOKEN = 'SET_TOKEN';
const CLEAR_TOKEN = 'CLEAR_TOKEN';
const getToken = (payload) => ({ type: GET_TOKEN, payload });
const setToken = (payload) => ({ type: SET_TOKEN, payload });
const clearToken = () => ({ type: CLEAR_TOKEN });
//#endregion
//#region UserInfo
const GET_USER_DATA = "GET_USER_DATA";
const SET_USER_INFO = "SET_USER_INFO";
const UPDATE_USER_INFO = "UPDATE_USER_INFO";
const CLEAR_USER_INFO = "CLEAR_USER_INFO";
const getUserData = (payload) => ({ type: GET_USER_DATA, payload });
const setUserInfo = (payload) => ({ type: SET_USER_INFO, payload });
const updateUserInfo = (payload) => ({ type: UPDATE_USER_INFO, payload });
const clearUserInfo = () => ({ type: CLEAR_USER_INFO });
//#endregion
//#region permissions
const SET_PERMISSIONS = "SET_PERMISSIONS";
const CLEAR_PERMISSIONS = "CLEAR_PERMISSIONS";
const setPermissions = (payload) => ({ type: SET_PERMISSIONS, payload });
const clearPermissions = () => ({ type: CLEAR_PERMISSIONS });
//#endregion
//#region logOut
const logOut = () => ({ type: LOG_OUT });
const LOG_OUT = 'LOG_OUT';
//#endregion
export const actions = {
    logOut,
    token: {
        get: getToken,
        set: setToken,
        clear: clearToken,
    },
    getUserData,
    userInfo: {
        set: setUserInfo,
        clear: clearUserInfo,
        update: updateUserInfo,
    },
    permissions: {
        set: setPermissions,
        clear: clearPermissions,
    },
};

export const types = {
    GET_TOKEN,
    SET_TOKEN,
    CLEAR_TOKEN,
    GET_USER_DATA,
    SET_USER_INFO,
    UPDATE_USER_INFO,
    CLEAR_USER_INFO,
    SET_PERMISSIONS,
    CLEAR_PERMISSIONS,
    LOG_OUT,
};