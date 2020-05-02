/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
import React from 'react';
import Authorization from './authorization/authorizationContainer.jsx';
import Routes from './routes/routesContainer.jsx';
import AppState from './appState/appStateContainer.jsx';
import 'isomorphic-fetch';
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
//import '../common/fonts.scss';
//import '../common/styles.scss';
//import '../common/componentThemes/button.scss';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<main className="clearfix main">
				<AppState />
				<Authorization>
					<Routes />
				</Authorization>
			</main>
		);
	}
}