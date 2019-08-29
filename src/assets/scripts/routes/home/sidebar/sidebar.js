import React, { Component } from 'react';
import styled from 'styled-components';
//

const Wrapper = styled.div`
	grid-area: f-sidebar;
`;

export default class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = '';
	}

	render() {
		return (
			<Wrapper>
				Sidebar
			</Wrapper>
		);
	}
}
