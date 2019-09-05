import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid/v1';
import { upperAll } from '../../../../../utils/upper';

const Uf = styled.div`
	grid-area: f-cities;
	grid-column-end: 4;
`;
const Zone = styled.div`
	grid-area: f-zones;
`;
const Tag = styled.p`
	display: inline-block;
	padding: 5px;
	font-size: .9em;
`;

const CloseTag = styled.button`
	cursor: pointer;
	color: ${p => p.theme.color.gray};
	background-color: white;
	padding: 0;
	margin: 0 5px 0 0;
	appearance: none;
	border: none;
	&:hover {
		color: ${p => p.theme.color.color};
	}
`;

const ChosenFilter = ({
	chosenCities,
	cityList,
	chosenZones,
	removeCity: rCity,
	removeZone: rZone,
}) => {
	const removeTag = (e, type) => {
		const { id } = e.target.dataset;
		switch (type) {
		case 'city':
			rCity({ value: id });
			break;
		case 'zone':
			rZone({ value: id });
			break;
		default:
			break;
		}
		// rCity(e)
	};

	return (
		<>
			<Uf>
				{chosenCities.map(each => (
					<Tag key={uuid()}>
						<CloseTag
							onClick={e => removeTag(e, 'city')}
							data-id={each}
						>
							×
						</CloseTag>
						{upperAll(cityList[each].city_name)}
					</Tag>
				))}
			</Uf>
			<Zone>
				{chosenZones.map(each => (
					<Tag key={uuid()}>
						<CloseTag
							onClick={e => removeTag(e, 'zone')}
							data-id={each}
						>
							×
						</CloseTag>
						{upperAll(each)}
					</Tag>
				))}
			</Zone>
		</>
	);
};

ChosenFilter.propTypes = {
	chosenCities: PropTypes.arrayOf(PropTypes.string).isRequired,
	chosenZones: PropTypes.arrayOf(PropTypes.string).isRequired,
	cityList: PropTypes.shape().isRequired,
	removeCity: PropTypes.func.isRequired,
	removeZone: PropTypes.func.isRequired,
};

export default ChosenFilter;
