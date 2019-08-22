import React from 'react';
import uuid from 'uuid/v1';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ListWrapper = styled.div``;

const StyledLink = styled(Link)`
	display: block;
	margin: 0;
	padding: 5px 0;
	p {
		margin: 0;
		padding: 0;
	}
	/* display: grid;
	grid-gap: 5px;
	grid-template-columns: 2fr 1fr;
	&.zones {
		grid-template-columns: 1fr 2fr 1fr;
	} */
`;

const School = ({ schools }) => {
	const list = schools.map(each => (
		<StyledLink
			to={`/escola/${each.code}`}
			data-city={each.city_code}
			data-code={each.code}
			key={uuid()}
			className="zones"
		>
			<p>{each.name}</p>
		</StyledLink>
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
