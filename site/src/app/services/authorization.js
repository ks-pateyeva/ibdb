import { getApiUrl, getToken as getTokenFromCookies } from './_requestInfo.js';
import { errors } from '../main/errorHandler';
import * as request from '../api/authorization.js';

export async function getToken (loginModel, abort) {
    const apiUrl = getApiUrl();
    const response = await request.getToken(loginModel, apiUrl, abort);
    const expiration = new Date(response.validTo);
    if (response && expiration) {
        return {
            token: response.token,
            expiration: expiration,
            userId: response.userId,
        };
    } else {
        throw errors.INTERNAL_SERVER_ERROR;
    }
}

export async function getUserData (abort) {
    let result = null;
    const apiUrl = getApiUrl();
    const token = getTokenFromCookies();
    //const personId = getPersonId();
    const response = await request.getUserInfo(token, apiUrl, abort);
    if (response) {
        result = {
            userInfo: {
                // name: personInfo ? `${personInfo.firstName} ${personInfo.lastName}` : response.name,
                // roleId: response.roleId,
                // registerDate: response.registerDate,
                // hasPhoto: personInfo.hasPhoto,
            },
            permissions: response.operations,
        };
    } else {
        throw errors.INTERNAL_SERVER_ERROR;
    }
    return result;
}

export async function logOut (token, abort) {
    const apiUrl = getApiUrl();
    await request.logOut(token, apiUrl, abort);
}