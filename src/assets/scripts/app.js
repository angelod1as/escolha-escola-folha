import React from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/layout';
import Home from './routes/home';

/* ROUTING:
- main (search form) = /
- cities = /&cities=[cidade],[cidade],[cidade],[cidade]
- schools = /escola/[nome da escola]
*/

const App = () => (
	<Layout>
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				{/* <Route path="/about" component={About} /> */}
				{/* <Route path="/contact" component={Contact} /> */}
			</Switch>
		</Router>
	</Layout>
);

export default App;
