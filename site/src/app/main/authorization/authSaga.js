import { put, takeEvery, call, cancelled } from 'redux-saga/effects';
import * as services from '../../services/authorization.js';
import { actions, types } from './authActions.js';
import { token as getTokenFromCookies, cookieTypes } from './authUtils.js';
import { actions as errorActions } from '../errorHandler';

function* getToken(action) {
    const abortController = new AbortController();
    try {
        const payload = yield call(services.getToken, action.payload, abortController.signal);
        if (payload) {
            yield put(actions.token.set({
                token: true,
                expiration: payload.expiration,
                userId: payload.userId,
            }));
            const ms = payload.expiration.getTime() - new Date().getTime();
            document.cookie = `${cookieTypes.token}=${payload.token}; max-age=${ms}`;
            document.cookie = `${cookieTypes.expires}=${Date.parse(payload.expiration)}; max-age=${ms}`;
            document.cookie = `${cookieTypes.userId}=${payload.userId}; max-age=${ms}`;
        }
        return;
    } catch (err) {
        if (yield(cancelled())) {
            abortController.abort();
        }
        yield put(errorActions.authorizationErrors.set(err));
    }
}

function* getUserData() {
    const abortController = new AbortController();
    try {
        const payload = yield call(services.getUserData, abortController.signal);
        if (payload && payload.userInfo) {
            yield put(actions.userInfo.set(payload.userInfo));
        }
        if (payload && payload.permissions) {
            yield put(actions.permissions.set(payload.permissions));
        }
        return;
    } catch (err) {
        console.log(err);
        if (yield(cancelled())) {
            abortController.abort();
        }
        yield logOut();
        yield put(errorActions.authorizationErrors.set(err));
    }
}

function* logOut() {
    const token = getTokenFromCookies();
    const abortController = new AbortController();
    try {
        document.cookie = `${cookieTypes.token}=${null}; max-age=${-1}`;
        document.cookie = `${cookieTypes.expires}=${null}; max-age=${-1}`;
        document.cookie = `${cookieTypes.userId}=${null}; max-age=${-1}`;
        yield put(actions.token.clear());
        yield put(actions.userInfo.clear());
        yield put(actions.permissions.clear());
        yield call(services.logOut, token, abortController.signal);
        return;
    } catch (err) {
        console.error(err);
        if (yield(cancelled())) {
            abortController.abort();
        }
    }
}

export default function* authorizationWatcher() {
    yield takeEvery(types.GET_TOKEN, getToken);
    yield takeEvery(types.GET_USER_DATA, getUserData);
    yield takeEvery(types.LOG_OUT, logOut);
}