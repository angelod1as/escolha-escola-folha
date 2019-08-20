import React from 'react';
// import PropTypes from 'prop-types';
import {
	HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import Layout from './components/layout';
import Home from './routes/home/home';
import List from './routes/list/list';
import School from './routes/school/school';

/* ROUTING:
- main (search form) = /
- cities = /lista/[cidade],[cidade],[cidade],[cidade]
- schools = /escola/[nome da escola]
*/

// const output = '../../../../output/states/';
const output = '../../../output/';

const App = () => (
	<Layout>
		<Router>
			<Switch>
				<Route exact path="/" render={() => <Home output={output} />} />
				<Route exact path="/lista" render={() => <Redirect to="/" />} />
				<Route
					path="/lista/:code"
					render={(path) => {
						const codes = path.match.params.code.split(',');
						return <List output={output} codes={codes} />;
					}}
				/>
				<Route exact path="/escola" render={() => <Redirect to="/" />} />
				<Route
					path="/escola/:code"
					render={(path) => {
						const { code } = path.match.params;
						return <School output={output} code={code} />;
					}}
				/>
			</Switch>
		</Router>
	</Layout>
);

export default App;
