/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './main/app.jsx';
import store from './main/store.js';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);