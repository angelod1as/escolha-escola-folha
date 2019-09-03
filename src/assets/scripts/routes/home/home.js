import React from 'react';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';

// REDUX
import { chooseUf, fetchCityList } from '../../redux/actions';

import Top from './top/top';

const Home = () => (
	<>
		<Top />
	</>
);

export default Home;


// console.log(store.getState());

// const unsubscribe = store.subscribe(() => console.log(store.getState()));

// store.dispatch(chooseUf('SP'));
// const state = store.getState();
// store.dispatch(fetchCityList(state.chooseUf.url));

// unsubscribe();

// import { Container } from './styles';
