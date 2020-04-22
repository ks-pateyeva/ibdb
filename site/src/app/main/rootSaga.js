/* eslint-disable no-unused-vars */
import { all } from 'redux-saga/effects';
import sagaWatcher from './authorization/authSaga.js';
export default function* rootSaga() {
    yield all([
        sagaWatcher(),
    ]);
}