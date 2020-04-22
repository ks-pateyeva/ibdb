import { reducer, models as reducerModels } from './authReducer.js';
import { actions, types } from './authActions.js';
import { selectors, models as selectorModels } from './authSelectors.js';
import * as utils from './authUtils.js';

const models = {
    reducer: reducerModels,
    selector: selectorModels,
};

export {
    reducer,
    actions,
    types,
    models,
    selectors,
    utils,
};