import React, { Component } from 'react';
import styled from 'styled-components';
//

const Wrapper = styled.div`
	grid-area: content;
`;

export default class Content extends Component {
	constructor(props) {
		super(props);
		this.state = '';
	}

	render() {
		return (
			<Wrapper>
				Content
			</Wrapper>
		);
	}
}
