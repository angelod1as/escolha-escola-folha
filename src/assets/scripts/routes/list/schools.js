import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import uuid from 'uuid/v1';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import { upperAll } from '../../components/upper';
import { ref } from '../../components/refs';

const ListWrapper = styled.div`
	margin-top: 20px;
`;

const Table = styled.div`
	display: grid;
	grid-template-columns: minmax(200px, 3fr) 1fr 1fr 1fr;
	grid-gap: 5px;
`;

const StyledLink = styled(Link)`
	display: block;
	margin: 0;
	padding: 5px 0;
	border-bottom: 1px solid ${p => p.theme.color.gray3};
	padding: 10px 0;
	transition: .2 all;
	&:hover {
		background-color: ${p => p.theme.color.gray3};
		color: ${p => p.theme.color.black};
	}
`;

const P = styled.p`
	margin: 0;
	padding: 0;
`;

const Schools = ({ schools, from }) => {
	// TODO testar hasCity - não obrigatório
	// const hasCity = () => {
	// 	if (from.length > 1) {
	// 		const sameCity = [...new Set(from.map(each => each.split('-')[0]))];
	// 		if (sameCity.length === 1) {
	// 			return false;
	// 		} return true;
	// 	} return false;
	// };

	const list = schools
		.map(each => (
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
					<Table>
						<P>{upperAll(each.name)}</P>
						<P>{upperAll(each.address.city)}</P>
						{/* <P>{hasCity() ? upperAll(each.address.city) : ref.address.zone[1][each.address.zone]}</P> */}
						<P>{ref.address.location[1][each.address.location]}</P>
						<P>{ref.public_private[1][each.public_private]}</P>
					</Table>
				</StyledLink>
			</Fade>
		));
	// TODO Testar lista com Zona ou Cidade
	return (
		<ListWrapper>
			{list.length > 0
				? (
					<div>
						<Table>
							<div>Escola</div>
							{/* <div>{hasCity() ? 'Cidade' : 'Zona'}</div> */}
							<div>Cidade</div>
							<div>Localização</div>
							<div>Tipo</div>
						</Table>
						{list}
					</div>
				)
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
