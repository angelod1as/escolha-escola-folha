import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid/v1';
import bp from '../../../../components/breakpoints';

import Autosuggest from '../../../../components/autosuggest';


const form = {
	gridArea: 'f-form',
	display: 'grid',
	gridGap: '1em',
	gridTemplateColumns: 'auto auto auto',
	// gridTemplateAreas: 'f-state f-city f-city f-zone',
};

const Uf = styled.div`
	grid-area: f-state;
	grid-column-start: 1;
	grid-column-end: 1;
	@media ${bp.small} {
		grid-column-start: auto;
		grid-column-end: auto;
	}
`;
const City = styled.div`
	grid-area: f-city;
	grid-column-start: 2;
	grid-column-end: 2;
	@media ${bp.small} {
		grid-column-start: auto;
		grid-column-end: auto;
	}
`;
const Zone = styled.div`
	grid-area: f-zone;
	grid-column-start: 3;
	grid-column-end: 3;
	@media ${bp.small} {
		grid-column-start: auto;
		grid-column-end: auto;
	}
`;

const Select = styled.select`
	font-family: ${p => p.theme.font.display};
	font-weight: 300;
	text-align: center;
	pointer-events: ${p => (p.disabled ? 'none' : 'initial')};

	color: ${p => (p.disabled ? p.theme.color.gray3 : p.theme.color.black)};
	text-transform: ${p => (p.disabled ? 'initial' : 'uppercase')};
	font-style: italic;

	width: 100%;
	max-width: 100%;
	border: 1px solid ${p => (p.disabled ? p.theme.color.gray3 : p.theme.color.black)};
	border-radius: 3px;
	font-size: 16px;
	background-color: white;
	padding: 2px 0 3px 0;
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
			<form autoComplete="off" style={form}>
				<Uf>
					<Autosuggest
						placeholder="Digite o estado"
						handleChange={handleChange}
						data={ufList}
						type="uf"
						id="uf"
						autocomplete="new-password"
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
						autocomplete="new-password"
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
			</form>
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
