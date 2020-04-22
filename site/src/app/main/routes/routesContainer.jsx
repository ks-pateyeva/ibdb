/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import pages from './pages.js';
import Routes from './routes.jsx';

function withSubscription(WrappedComponent) {
    const HOC = class extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                pages: pages,
                startPage: pages.find(page => page.startPage),
            };
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    pages={this.state.pages}
                    startPage={this.state.startPage}
                />
            );
        }
    };

    return HOC;
}

export default connect()(withSubscription(Routes));