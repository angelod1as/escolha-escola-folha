import React from 'react';
// import PropTypes from 'prop-types';
import {
	HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import Layout from './components/layout';
import Home from './routes/home/home';
import List from './routes/list/list';
import School from './routes/school/school';

const output = '../../../output/';

const App = () => (
	<Layout>
		<Router>
			<Switch>
				{/* home */}
				<Route exact path="/" render={() => <Home output={output} />} />
				{/* no code? redirect */}
				<Route exact path="/lista" render={() => <Redirect to="/" />} />
				{/* after choosing cities */}
				<Route
					path="/lista/:code"
					render={(path) => {
						const codes = path.match.params.code.split(',');
						return <List output={output} codes={codes} />;
					}}
				/>
				{/* no code? redirect */}
				<Route exact path="/escola" render={() => <Redirect to="/" />} />
				{/* After listing schools */}
				<Route
					path="/escola/:code"
					render={(path) => {
						const { code } = path.match.params;
						return <School output={output} code={code} />;
					}}
				/>
				{/* 404? redirect */}
				<Route render={() => <Redirect to="/" />} />
			</Switch>
		</Router>
	</Layout>
);

export default App;