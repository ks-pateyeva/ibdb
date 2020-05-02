/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

export default class AppState extends React.PureComponent {
    constructor(props) {
        super(props);
        this.setWinSize = this.setWinSize.bind(this);
        window.addEventListener("resize", this.setWinSize);
    }

    componentDidMount() {
        this.setWinSize();
        if (process.env.devServer) {
            this.props.setApiUrl(process.api.url);
        } else {
            this.props.setApiUrl('/');
        }
    }

    setWinSize() {
        this.props.setWinSize({width: window.innerWidth, height: window.innerHeight});
    }

    render() {
        logger.render("appState: RENDER");
        return null;
    }
}

AppState.propTypes = {
    setWinSize: PropTypes.func.isRequired,
    setApiUrl: PropTypes.func.isRequired,
};