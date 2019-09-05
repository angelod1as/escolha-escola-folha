import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import configureStore, { history } from './redux/store/index';

import Home from './routes/home/index';
import Layout from './routes/components/layout';

const store = configureStore();
const App = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Layout>
				<Route path="/" render={() => <Home />} />
			</Layout>
		</ConnectedRouter>
	</Provider>
);

export default App;
