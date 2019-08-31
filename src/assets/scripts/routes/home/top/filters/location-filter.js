import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid/v1';
import types from '../../../../utils/types';
import { Select } from '../../../../components/styles';

import Autosuggest from '../../../../components/autosuggest';
import ufs from '../../../../utils/ufs';
import zones from '../../../../utils/zones';

const State = styled.div`
	grid-area: f-state;
	`;
const City = styled.div`
	grid-area: f-city;
	grid-column-end: 4;
`;
const Zone = styled.div`
	grid-area: f-zone;
`;

const LocationFilters = ({ state, updateState }) => {
	const {
		config: { output },
		data: {
			cities,
		},
		hasZone,
	} = state;
	const newState = JSON.parse(JSON.stringify(state));

	const handleChange = (suggestion, type) => {
		if (type === 'uf') {
			const filename = suggestion.toLowerCase();
			newState.filters[type] = filename;
		} else if (type === 'city') {
			if (!newState.filters.city.includes(suggestion)) {
				newState.filters.city.push(suggestion);
			}
		} else if (type === 'zone') {
			newState.filters.zone.push(suggestion);
		}
		updateState(newState);
	};

	const citiesList = Object
		.keys(cities)
		.map(each => [cities[each].city_name, each]);

	const hasCities = citiesList.length > 0;

	return (
		<>
			<State>
				<Autosuggest
					placeholder="Digite o estado"
					handleChange={handleChange}
					data={ufs}
					type="uf"
					enabled
				/>
			</State>
			<City
				hasZone={hasZone}
				className={hasCities ? '' : 'disabled'}
			>
				<Autosuggest
					placeholder="Digite a cidade"
					handleChange={handleChange}
					data={citiesList}
					type="city"
					enabled={hasCities}
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
					{zones.map(each => (
						<option key={uuid()} value={each}>{each}</option>
					))}
				</Select>
			</Zone>
		</>
	);
};

LocationFilters.propTypes = {
	state: PropTypes.shape(types).isRequired,
	updateState: PropTypes.func.isRequired,
};

export default LocationFilters;
