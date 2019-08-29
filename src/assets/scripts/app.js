import React from 'react';
// import PropTypes from 'prop-types';
import {
	HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import Layout from './components/layout';
import Home from './routes/home/home';

const output = '../../../output/';

const App = () => (
	<Layout>
		<Router>
			<Switch>
				{/* home */}
				<Route exact path="/" render={() => <Home output={output} />} />
				{/* 404? redirect */}
				<Route render={() => <Redirect to="/" />} />
			</Switch>
		</Router>
	</Layout>
);

export default App;
