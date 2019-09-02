import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import Reactotron from '../../../../../reactotron-config';

// const loggerMiddleware = createLogger();

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(
			thunk,
		// loggerMiddleware,
		),
		Reactotron.createEnhancer(),
	),
);

export default store;
