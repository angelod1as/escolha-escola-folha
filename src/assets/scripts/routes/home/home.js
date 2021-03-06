import React from 'react';
import PropTypes from 'prop-types';

// REDUX
import Loading from './loading/index';
import Top from './top/top';
import Sidebar from './sidebar/index';
import Content from './content/index';
import Retraction from './retraction/index';

const Home = (props) => {
	const { readFromUrl } = props;
	if (readFromUrl()) {
		return (
			<>
				<Loading />
				<Top />
				<Sidebar />
				<Content />
				<Retraction />
			</>
		);
	}
	return null;
};

Home.propTypes = {
	readFromUrl: PropTypes.func.isRequired,
};

export default Home;
