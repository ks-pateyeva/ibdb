import { reducer, models as reducerModels } from './appStateReducers.js';
import {actions, types } from './appStateActions.js';

const models = {
    reducer: reducerModels,
};

export {
    reducer,
    actions,
    types,
    models,
};