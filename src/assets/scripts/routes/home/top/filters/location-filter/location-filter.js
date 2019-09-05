import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid/v1';
import { Select } from '../../../../components/styles';

import Autosuggest from '../../../../components/autosuggest';

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
	cityList,
	hasZone,
	zoneList,
	fetchCityList: fCityList,
	fetchSchoolList: fSchoolList,
}) => {
	const handleChange = (value, type) => {
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
					id="uf"
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
					id="city"
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
					<option value="" disabled hidden>Escolha a região</option>
					{zoneList.map(each => (
						<option key={uuid()} value={each}>{each}</option>
					))}
				</Select>
			</Zone>
		</>
	);
};

LocationFilters.propTypes = {
	cityList: PropTypes.shape().isRequired,
	fetchCityList: PropTypes.func.isRequired,
	fetchSchoolList: PropTypes.func.isRequired,
	hasZone: PropTypes.bool.isRequired,
	ufList: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	zoneList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LocationFilters;
