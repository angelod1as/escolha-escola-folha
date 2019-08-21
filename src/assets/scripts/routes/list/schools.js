import React from 'react';
import uuid from 'uuid/v1';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ListWrapper = styled.div`
	a {
		display: block;
	}
`;

const School = ({ schools }) => {
	const list = schools.map(each => (
		<Link
			to={`/escola/${each.code}`}
			data-city={each.city_code}
			data-code={each.code}
			key={uuid()}
		>
			<p>{each.name}</p>
		</Link>
	));

	return (
		<ListWrapper>
			{list}
		</ListWrapper>
	);
};

School.propTypes = {
	schools: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default School;
