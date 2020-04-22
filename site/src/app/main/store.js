import rootReducer from './rootReducer.js';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './rootSaga.js';

export const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    rootReducer,
    process.env.devServer ? composeWithDevTools(applyMiddleware(sagaMiddleware)) : applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

export default store;