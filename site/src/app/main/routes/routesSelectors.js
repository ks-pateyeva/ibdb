import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import pages from './pages.js';

const permissions = authorization => authorization.permissions;

const allowedPagesSelector = createSelector(
    permissions,
    (permissions) => pages.filter((page) => {
        if (permissions.some(p => p.name === page.operation)) {
            return true;
        }
    })
);

const allowedMenuPagesSelector = createSelector(
    allowedPagesSelector,
    (allowedPagesSelector) => allowedPagesSelector.filter((page) => {
        if (page.menuPage == page.url) {
            return true;
        }
    })
);

const pageModel = PropTypes.exact({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    component: PropTypes.elementType.isRequired,
    menuPage: PropTypes.string,
    menuChild: PropTypes.elementType,
    menuImage: PropTypes.string,
    operation: PropTypes.string,
    menuColor: PropTypes.string,
    startPage: PropTypes.bool,
});

const pagesModel = PropTypes.arrayOf(pageModel);

const models = {
    allowedPages: pagesModel,
    allowedMenuPages: pagesModel,
    pagesModel,
    pageModel,
};

const selectors = {
    allowedPagesSelector,
    allowedMenuPagesSelector,
};

export {
    models,
    selectors,
};