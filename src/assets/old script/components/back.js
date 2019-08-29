import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import React from 'react';

// import { Container } from './styles';

const Back = ({ from, noFrom }) => {
	let goBack = '/';
	if (from && from.state && from.state.from) {
		const location = from.state.from;
		goBack = `${location.pathname}${location.search}`;
	} else if (noFrom) {
		goBack = `/lista/${noFrom}`;
	}

	return <Link className="f-forms__button f-forms__button_secondary" to={goBack.toLowerCase()}>Voltar</Link>;
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
