import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import types from '../../../../utils/types';
// import { Autosuggest } from '../../../../components/styles';

import Autosuggest from '../../../../components/autosuggest';
import ufs from '../../../../utils/ufs';

const State = styled.div`
	grid-area: f-state;
	`;
// const City = styled.div`
// 	grid-area: f-city;
// 	grid-column-end: ${p => (p.hasZone ? '4' : '5')};
// `;
// const Zone = styled.div`
// 	grid-area: f-zone;
// `;

const LocationFilters = ({ state }) => {
	const { config: { output } } = state;
	const newState = state;

	const handleChange = (suggestion, type) => {
		if (type === 'uf') {
			const filename = suggestion.toLowerCase();
			newState.filters[type] = filename;
			const url = `${output}ufs/uf-${filename}.json`;
			axios.get(url)
				.then(({ data }) => {
					newState.filters.city = data;
				});
		}
		// updateFilter(state, type);
	};

	return (
		<>
			<State>
				<Autosuggest
					placeholder="Digite o estado"
					handleChange={handleChange}
					data={ufs}
					type="uf"
				/>
			</State>
			{/* <City hasZone={hasZone}>
				<Autosuggest placeholder="Digite a cidade" type="city" />
			</City>
			{hasZone ? (
				<Zone>
					<Autosuggest placeholder="Digite a zona de SP" type="zone" />
				</Zone>
			) : ''} */}
		</>
	);
};

LocationFilters.propTypes = {
	state: PropTypes.shape(types).isRequired,
};

export default LocationFilters;
