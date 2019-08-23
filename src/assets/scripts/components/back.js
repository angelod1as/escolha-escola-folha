import { withRouter, Link } from 'react-router-dom';

import React from 'react';

// import { Container } from './styles';

const Back = ({ history, from, noFrom }) => {
	let goBack = '/';
	if (from && from.state && from.state.from) {
		goBack = `/lista/${from.state.from.join()}`;
	} else if (noFrom) {
		goBack = `/lista/${noFrom}`;
	}

	return <Link to={goBack}>Voltar</Link>;
};

export default withRouter(Back);
