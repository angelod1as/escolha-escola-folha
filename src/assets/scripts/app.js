import React from 'react';
// import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
// import {
// 	HashRouter as Router, Route, Switch, Redirect,
// } from 'react-router-dom';

// Redux
import store from './redux/store';

// import Layout from './routes/components/layout';
import Home from './routes/home/home';
import Layout from './routes/components/layout';

const App = () => (
	<Provider store={store}>
		<Layout>
			<Home />
		</Layout>
	</Provider>
);

export default App;
