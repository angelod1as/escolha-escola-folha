import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';

import { upper, upperAll } from '../../../../utils/upper';
import ref from '../../../../utils/refs';

const Number = styled.p`
	font-weight: 500;
`;

const School = styled.button`
	background-color: white;
	border: 1px solid ${p => p.theme.color.gray3};
	color: ${p => p.theme.color.black};
	font-family: ${p => p.theme.font.display};
	text-align: left;
	appearance: none;
	display: block;
	padding: 10px;
	width: 100%;
	margin: 30px 0;
	border-radius: 5px;
	&:hover{
		opacity: .7;
	}
	> * {
		pointer-events: none;
	}
`;

const Name = styled.h2`
	font-size: 1.5em;
	text-transform: uppercase;
	font-weight: 400;
	margin-bottom: 5px;
`;
const City = styled.p`
	font-size: .9em;
`;
const Info = styled.p`
	font-size: .9em;
	color: ${p => p.theme.color.gray};
`;

const List = ({ schools, fetchSchool }) => {
	const handleClick = (e) => {
		fetchSchool(e.target.dataset.code);
	};
	return (
		<>
			<Number>{`${schools.length} resultados`}</Number>
			<div>
				{schools
					.map((arr) => {
						const [code, school] = arr;
						const type = Object
							.keys(school.school_type)
							.filter(each => school.school_type[each] === 2)
							.map(each => (each === 'fundamental' ? 'Fundamental' : 'Médio'))
							.join(' e ');
						const loc = `Escola ${ref.address.location[1][school.address.location]}`;
						const pub = ref.public_private[1][school.public_private];
						return (
							<School data-code={code} key={uuid()} onClick={handleClick}>
								<Name>{upper(school.name)}</Name>
								<City>{upperAll(school.address.city)}</City>
								<Info>{upperAll(`${loc} • ${pub} • ${type}`)}</Info>
							</School>
						);
					})}
			</div>
		</>
	);
};

List.propTypes = {
	schools: PropTypes.array.isRequired,
	fetchSchool: PropTypes.func.isRequired,
};

export default List;
