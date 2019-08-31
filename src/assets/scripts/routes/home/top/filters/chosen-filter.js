import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
import types from '../../../../utils/types';
import { upperAll } from '../../../../utils/upper';

const State = styled.div`
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
	appearance: none;
	border: none;
	&:hover {
		color: ${p => p.theme.color.color};
	}
`;

const ChosenFilter = ({ state, updateState }) => {
	const newState = JSON.parse(JSON.stringify(state));
	const { config: { spCode }, data: { cities }, filters: { city, zone } } = state;

	const removeTag = ({ target: { dataset: { id } } }, type) => {
		if (type === 'city') {
			const filtered = city.filter(each => each !== id);
			if (id === spCode) {
				newState.filters.zone = [];
			}
			newState.filters.city = filtered;
		} else if (type === 'zone') {
			const filtered = zone.filter(each => each !== id);
			newState.filters.zone = filtered;
		}
		updateState(newState);
	};

	return (
		<>
			<State>
				{city.map(each => (
					<Tag key={uuid()}>
						<CloseTag
							onClick={e => removeTag(e, 'city')}
							data-id={each}
						>
							×
						</CloseTag>
						{upperAll(cities[each].city_name)}
					</Tag>
				))}
			</State>
			<Zone>
				{zone.map(each => (
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
	state: PropTypes.shape(types).isRequired,
	updateState: PropTypes.func.isRequired,
};

export default ChosenFilter;
