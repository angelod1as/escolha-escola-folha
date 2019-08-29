import React, { Component } from 'react';
import styled from 'styled-components';
//

const State = styled.div`
	grid-area: f-cities;
	grid-column-end: ${p => (p.hasZone ? '4' : '5')};
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

export default class ChosenFilter extends Component {
	constructor(props) {
		super(props);
		this.state = '';
	}

	render() {
		const { hasZone } = this.props;
		// TODO Passar zona para o filtro
		return (
			<>
				<State hasZone={hasZone}>
					<Tag>
						<CloseTag>×</CloseTag>
						São Paulo
					</Tag>
					<Tag>
						<CloseTag>×</CloseTag>
						Irapuã
					</Tag>
				</State>
				{hasZone ? (
					<Zone>
						<Tag>
							<CloseTag>×</CloseTag>
							Norte
						</Tag>
						<Tag>
							<CloseTag>×</CloseTag>
							Sul
						</Tag>
					</Zone>
				) : ''}
			</>
		);
	}
}
