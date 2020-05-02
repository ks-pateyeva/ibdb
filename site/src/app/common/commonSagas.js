
import { put, call, cancelled  } from 'redux-saga/effects';
import { actions as errorActions } from '../main/errorHandler';

export function* dataLoader(func, ...theArgs) {
    const abortController = new AbortController();
    try {
        const payload = yield call(func, abortController.signal, ...theArgs);
        return payload;
    } catch (err) {
        if (yield(cancelled())) {
            abortController.abort();
        }
        yield put(errorActions.error.set(err));
        return null;
    }
}

export function* getDataSaga(func, action, ...theArgs) {
    const payload = yield dataLoader(func, ...theArgs);
    if (payload) {
        yield put(action(payload));
    }
    return;
}