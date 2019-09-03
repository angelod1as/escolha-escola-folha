import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import uuid from 'uuid/v1';

import { upper, upperAll } from '../../../../utils/upper';
import ref from '../../../../utils/refs';
import { CleanA } from '../../../components/styles';

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
	margin-bottom: 5px;
`;
const City = styled.p`
	font-size: .9em;
`;
const Info = styled.p`
	font-size: .9em;
	color: ${p => p.theme.color.gray};
`;

const List = ({ schoolList }) => {
	const sArray = Object.keys(schoolList);
	return (
		<>
			<Number>{`${sArray.length} resultados`}</Number>
			<div>
				{sArray.map((code) => {
					const school = schoolList[code];
					const type = Object
						.keys(school.school_type)
						.filter(each => school.school_type[each] === 2)
						.map(each => (each === 'fundamental' ? 'Fundamental' : 'Médio'))
						.join(' e ');
					const loc = `Escola ${ref.address.location[1][school.address.location]}`;
					const pub = ref.public_private[1][school.public_private];
					return (
						<School key={uuid()}>
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

const mapDispatchToProps = {};
const mapStateToProps = ({
	listSchools: { schoolList },
}) => ({
	schoolList,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(List);
