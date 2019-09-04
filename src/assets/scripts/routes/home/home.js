import React from 'react';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';

// REDUX
import Loading from './loading/index';
import Top from './top/top';
import Sidebar from './sidebar/index';
import Content from './content/index';

const Home = () => (
	<>
		<Loading />
		<Top />
		<Sidebar />
		<Content />
	</>
);

export default Home;
