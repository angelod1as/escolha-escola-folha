import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import React from 'react';

// import { Container } from './styles';

const Back = ({ from, noFrom }) => {
	let goBack = '/';
	if (from && from.state && from.state.from) {
		goBack = `/lista/${from.state.from.join()}`;
	} else if (noFrom) {
		goBack = `/lista/${noFrom}`;
	}

	return <Link to={goBack}>Voltar</Link>;
};

Back.propTypes = {
	from: PropTypes.shape(),
	noFrom: PropTypes.string,
};

Back.defaultProps = {
	noFrom: undefined,
	from: undefined,
};

export default withRouter(Back);
