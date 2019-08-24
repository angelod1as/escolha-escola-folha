import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import uuid from 'uuid/v1';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import { upperAll } from '../../components/upper';

const ListWrapper = styled.div`
	margin-top: 20px;
	a {
		border-bottom: 1px solid ${p => p.theme.color.gray3};
		padding: 10px 0;
		transition: .2 all;
		&:hover {
			background-color: ${p => p.theme.color.gray3};
			color: ${p => p.theme.color.black};
		}
	}
`;

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

const Schools = ({ schools, from }) => {
	const list = schools.map(each => (
		<Fade duration={500} key={uuid()}>
			<StyledLink
				to={{
					pathname: `/escola/${each.code}`,
					state: {
						from,
					},
				}}
				key={uuid()}
				className="zones"
			>
				<p>{upperAll(each.name)}</p>
			</StyledLink>
		</Fade>
	));

	return (

		<ListWrapper>
			{list.length > 0
				? list
				: (
					<div>
						<p>Nenhuma escola encontrada.</p>
						<p>O que acha de refinar sua busca?</p>
					</div>
				)
			}
		</ListWrapper>
	);
};

Schools.propTypes = {
	schools: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	from: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withRouter(Schools);
