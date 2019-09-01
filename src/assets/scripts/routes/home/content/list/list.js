import React from 'react';
import styled from 'styled-components';
// import uuid from 'uuid/v1';

import { CleanA } from '../../../../components/styles';

const Number = styled.p`
	font-weight: 500;
`;

const School = styled(CleanA)`
	display: block;
	margin: 30px 0;
	padding: 0 5px 10px 5px;
	border: 1px solid ${p => p.theme.color.gray3};
	border-radius: 5px;
	&:hover{
		opacity: .7;
	}
`;

const Name = styled.h2`
	font-size: 1.5em;
	text-transform: uppercase;
	font-weight: 400;
	margin-bottom: 10px;
`;
const City = styled.p`
	font-size: .9em;
`;
const Info = styled.p`
	font-size: .9em;
	color: ${p => p.theme.color.gray};
`;

const List = () => (
	<>
		<Number>6 resultados</Number>
		<div>
			<School>
				<Name>Escola Estadual Prof Johannes Petrusz</Name>
				<City>Vila Bela da Santíssima Trindade</City>
				<Info>Escola Rural • Particular • Ensino Fundamental e Médio</Info>
			</School>
			<School>
				<Name>Escola Estadual Prof Johannes Petrusz</Name>
				<City>Vila Bela da Santíssima Trindade</City>
				<Info>Escola Rural • Particular • Ensino Fundamental e Médio</Info>
			</School>
		</div>
	</>
);

export default List;
