import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import uuid from 'uuid/v1';
import { upperAll } from '../../../../utils/upper';

import { removeCity, removeZone } from '../../../../redux/actions/index';

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
			rCity(id);
			break;
		case 'zone':
			rZone(id);
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

const mapDispatchToProps = {
	removeCity,
	removeZone,
};

const mapStateToProps = ({
	chooseCity: { chosenCities },
	listCities: { cityList },
	chooseZone: { chosenZones },
}) => ({
	chosenCities,
	cityList,
	chosenZones,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ChosenFilter);
