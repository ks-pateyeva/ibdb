import { getJson, getBlob } from './getRequest.js';
import { postJson, post } from './postRequest.js';

export async function getToken(loginModel, apiUrl, abort) {
    return await postJson(`${apiUrl}api/account/login`, null, loginModel, abort, null);
}

export async function getUserInfo(token, apiUrl, abort) {
    return await getJson(`${apiUrl}api/account/info`, null, abort, token);
}

export async function getUserPic(token, apiUrl, abort) {
    return await getBlob(`${apiUrl}api/account/userpic`, null, abort, token);
}

export async function logOut(token, apiUrl, abort) {
    return await post(`${apiUrl}api/account/logout`, null, JSON.stringify(token), abort, null);
}