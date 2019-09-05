import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers/index';
// import Reactotron from '../../../../../reactotron-config';

export const history = createBrowserHistory();

const configureStore = () => createStore(
	createRootReducer(history),
	compose(
		applyMiddleware(
			thunk,
			routerMiddleware(history),
		),
		// Reactotron.createEnhancer(),
	),
);

export default configureStore;
