import React from 'react';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';

// REDUX
import Top from './top/top';
import Sidebar from './sidebar/index';
import Content from './content/index';

const Home = () => (
	<>
		<Top />
		<Sidebar />
		<Content />
	</>
);

export default Home;
