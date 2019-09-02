import React from 'react';
import styled from 'styled-components';
// import Reactotron from 'reactotron-react-js';

// Redux
import { connect } from 'react-redux';
import { fetchCityList, fetchSchoolList } from '../../../../redux/actions/index';

import Autosuggest from '../../../components/autosuggest';

const Uf = styled.div`
	grid-area: f-state;
	`;
const City = styled.div`
	grid-area: f-city;
	grid-column-end: 4;
`;
// const Zone = styled.div`
// 	grid-area: f-zone;
// `;

const LocationFilters = (props) => {
	const { ufList, chosenUf, cityList } = props;
	const handleChange = (value, type) => {
		console.log(value, type);
		switch (type) {
		case 'uf':
			props.fetchCityList(value);
			break;
		case 'city':
			props.fetchSchoolList(value);
			break;
		case 'zone':
			break;
		default:
			break;
		}
	};

	const city = {
		cityKeys: Object.keys(cityList),
	};
	city.has = city.cityKeys.length > 0;
	city.auto = city.cityKeys
		.map(each => [cityList[each].city_name, each]);

	return (
		<>
			<Uf>
				<Autosuggest
					placeholder="Digite o estado"
					handleChange={handleChange}
					data={ufList}
					type="uf"
					// initial={uf}
					enabled
				/>
			</Uf>
			<City
				className={city.has ? 'disabled' : ''}
			>
				<Autosuggest
					placeholder="Digite a cidade"
					handleChange={handleChange}
					data={city.auto}
					type="city"
					enabled={city.has}
				/>
			</City>
		</>
	);
};

const mapDispatchToProps = {
	fetchCityList,
	fetchSchoolList,
};

const mapStateToProps = ({
	config: { ufList },
	setUf: { chosenUf },
	setCity: { cityList },
}) => ({
	ufList,
	chosenUf,
	cityList,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LocationFilters);
