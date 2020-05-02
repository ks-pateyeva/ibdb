/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import AppState from './appState.jsx';
import { actions } from './appStateActions.js';

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = (dispatch) => ({
    setWinSize: (winSize) => dispatch(actions.winSize.set(winSize)),
    setApiUrl: (url) => dispatch(actions.apiUrl.set(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppState);