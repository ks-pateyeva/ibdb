import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { models } from './';
import Page from './page.jsx';
import Error from '../../common/components/error.jsx';
import { errors } from '../errorHandler/';
import './routesStyles.scss';

export default class Routes extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getPagesList = this.getPagesList.bind(this);
    }

    getPagesList() {
        return this.props.pages.map((page) => (
            <Route key={`route${page.url}`} exact path={page.url}
                render={() => (
                    <Page
                        url={page.url}
                        title={page.title}
                        menuPage={page.menuPage}
                        protected={page.operation != null}
                    >
                        {page.component ? <page.component /> : <Error error={errors.PAGE_NOT_FOUND} />}
                    </Page>
                )}
            />
        ));
    }

    render () {
        logger.render('Routes');
        return (
            <div className="routes">
                <Router>
                    {/* <Header /> */}
                    <div className="routes__page">
                        <Switch>
                            {this.getPagesList()}
                            <Route key={"/"} exact path="/" render={() => (<Redirect to={this.props.startPage.url} />)} />
                            <Route key={"*"} path="*" render={() => (<Error error={errors.PAGE_NOT_FOUND} />)} />
                        </Switch>
                    </div>
                    {/* {this.props.showFooter ? <Footer /> : null} */}
                    {/* <Sidebar /> */}
                </Router>
            </div>
        );
    }
}

Routes.propTypes = {
    pages: models.pagesModel.isRequired,
    startPage: models.pageModel.isRequired,
};