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

const Order = styled.div`
	position: relative;
	cursor: pointer;
	&:hover {
		opacity: .5;
	}
	&:after {
		padding-left: 5px;
		content: ${p => (p.order[1]
		? '"\\23F7"'
		: '"\\23F6"')};
		font-size: .8em;
		color: ${p => (p.order[0] === p.type
		? `${p.theme.color.black}`
		: `${p.theme.color.gray2}`)};
	}
`;

const Schools = ({
	schools, from, changeSort, sortOrder,
}) => {
	const asc = sortOrder[1];
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
						{/* {
							<P>
								{hasCity()
									? upperAll(each.address.city)
									:	 ref.address.zone[1][each.address.zone]}
							</P>
						} */}
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
							<Order
								type="name"
								order={sortOrder}
								onClick={() => changeSort('name', !asc)}
							>
								Escola
							</Order>
							{/* <div>{hasCity() ? 'Cidade' : 'Zona'}</div> */}
							<Order
								type="address.city"
								order={sortOrder}
								onClick={() => changeSort('address.city', !asc)}
							>
								Cidade
								{/* <Arrow>{sortOrder} ? '\u25B4' : '\u25BE'}</Arrow> */}
							</Order>
							<Order
								type="address.location"
								order={sortOrder}
								onClick={() => changeSort('address.location', !asc)}
							>
								Localização
							</Order>
							<Order
								type="public_private"
								order={sortOrder}
								onClick={() => changeSort('public_private', !asc)}
							>
								Tipo
							</Order>
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
	changeSort: PropTypes.func.isRequired,
	sortOrder: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.string, PropTypes.bool,
	])).isRequired,
};

export default withRouter(Schools);
