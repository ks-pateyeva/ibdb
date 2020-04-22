import store from '../main/store.js';
import { utils } from '../main/authorization';
import { errors } from '../main/errorHandler';

export function getToken () {
    return utils.token();
}

export function getApiUrl () {
    return store.getState().appState.apiUrl;
}

export function service (response) {
    if (response) {
        return response;
    } else {
        throw errors.INTERNAL_SERVER_ERROR;
    }
}