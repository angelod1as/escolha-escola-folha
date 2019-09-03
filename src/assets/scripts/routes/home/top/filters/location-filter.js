import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import uuid from 'uuid/v1';
import { Select } from '../../../components/styles';

// Redux
import { fetchCityList, fetchSchoolList } from '../../../../redux/actions/index';

import Autosuggest from '../../../components/autosuggest';

const Uf = styled.div`
	grid-area: f-state;
	`;
const City = styled.div`
	grid-area: f-city;
	grid-column-end: 4;
`;
const Zone = styled.div`
	grid-area: f-zone;
`;

const LocationFilters = ({
	ufList,
	chosenUf,
	cityList,
	hasChosenCity,
	hasZone,
	zoneList,
	fetchCityList: fCityList,
	fetchSchoolList: fSchoolList,
}) => {
	const handleChange = (value, type) => {
		console.log(value, type);
		switch (type) {
		case 'uf':
			fCityList({ value });
			break;
		case 'city':
			fSchoolList({ value });
			break;
		case 'zone':
			fSchoolList({ value, zone: true });
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
			<Zone>
				<Select
					className="f-forms__select"
					name="zones"
					id="zones"
					onChange={e => handleChange(e.target.value, 'zone')}
					value=""
					disabled={!hasZone}
				>
					<option value="" disabled hidden>Escolha a zona de SP</option>
					{zoneList.map(each => (
						<option key={uuid()} value={each}>{each}</option>
					))}
				</Select>
			</Zone>
		</>
	);
};

const mapDispatchToProps = {
	fetchCityList,
	fetchSchoolList,
};

const mapStateToProps = ({
	config: { ufList, zoneList },
	chooseUf: { chosenUf },
	listCities: { cityList },
	chooseCity: { hasChosenCity, hasZone },
}) => ({
	ufList,
	zoneList,
	chosenUf,
	cityList,
	hasChosenCity,
	hasZone,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LocationFilters);
