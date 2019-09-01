import React from 'react';
import styled from 'styled-components';
// import uuid from 'uuid/v1';

// import { upperAll } from '../../../utils/upper';
// import { ref } from '../../../utils/refs';
import List from './list/list';
import School from './school/school';

const Wrapper = styled.div`
	grid-area: content;
	margin-top: 20px;
`;

// import { Container } from './styles';

const Content = ({ state }) => {
	// const { data: { cities, schools } } = state;
	// const number = schools.length;
	console.log('oi');
	return (
		<Wrapper>
			<List />
			{/* <School /> */}
			{/* <div>{`${number} resultado${number === 1 ? '' : 's'}`}</div>
			{schools.map((school) => {
				const schoolType = Object
					.keys(school.school_type)
					.filter(each => school.school_type[each] === 2)
					.map(each => ref.school_type[each][0]);
				const cityName = cities[school.address.city_code].city_name;
				const info = [];
				if (school.address.location) info.push(`Escola ${ref.address.location[1][school.address.location]}`);
				if (school.type) info.push(ref.type[1][school.type]);
				if (schoolType.length > 0) info.push(`Ensino ${schoolType.join(' e ')}`);

				return (
					<div key={uuid()}>
						<div>{school.name}</div>
						<div>{upperAll(cityName)}</div>
						<div>{info.join(' • ')}</div>
					</div>
				);
			})} */}
		</Wrapper>
	);
};

export default Content;
