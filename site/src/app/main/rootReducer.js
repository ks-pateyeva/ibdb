import { combineReducers } from 'redux';
import { reducer as errors } from './errorHandler';
import { reducer as authorization } from './authorization';
import { reducer as appState } from './appState';
//import { reducer as rootMenu } from '../pages/rootMenu';

export default combineReducers({
    errors,
    authorization,
    appState,
    //rootMenu,
});