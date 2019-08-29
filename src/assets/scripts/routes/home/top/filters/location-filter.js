import React, { Component } from 'react';
import styled from 'styled-components';
// import { Autosuggest } from '../../../../components/styles';

import Autosuggest from '../../../../components/autosuggest';

const State = styled.div`
	background-color: red;
	grid-area: f-state;
	`;
const City = styled.div`
	grid-area: f-city;
	grid-column-end: ${p => (p.hasZone ? '4' : '5')};
`;
const Zone = styled.div`
	grid-area: f-zone;
`;

export default class LocationFilters extends Component {
	constructor(props) {
		super(props);
		this.state = '';
	}

	render() {
		const { hasZone } = this.props;
		return (
			<>
				<State>
					<Autosuggest placeholder="Digite o estado" />
				</State>
				<City hasZone={hasZone}>
					<Autosuggest placeholder="Digite a cidade" />
				</City>
				{hasZone ? (
					<Zone>
						<Autosuggest placeholder="Digite a zona de SP" />
					</Zone>
				) : ''}
			</>
		);
	}
}
