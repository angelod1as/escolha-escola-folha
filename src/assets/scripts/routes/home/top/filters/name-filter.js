import React, { Component } from 'react';
import styled from 'styled-components';

import Autosuggest from '../../../../components/autosuggest';

const Name = styled.div`
	grid-area: f-name;
	position: relative;
	.react-autosuggest__input {
		border: 0;
		border-bottom: 1px solid ${p => p.theme.color.black};
		border-radius: 0;
		text-transform: none;
		text-align: left;
		font-style: italic;
		&::placeholder{
			text-transform: none;
		}
	}
	&:after {
		content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNy41IiBoZWlnaHQ9IjE3LjUiIHZpZXdCb3g9IjAgMCAxNy41IDE3LjUiPjxkZWZzPjxzdHlsZT4uYXtmaWxsOiNjY2M7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJhIiBkPSJNOS41LDNhNi41LDYuNSwwLDAsMSw0Ljk0LDEwLjczbC4yNy4yN2guNzlsNSw1TDE5LDIwLjVsLTUtNXYtLjc5bC0uMjctLjI3QTYuNSw2LjUsMCwxLDEsOS41LDNtMCwyQTQuNSw0LjUsMCwxLDAsMTQsOS41LDQuNDgxLDQuNDgxLDAsMCwwLDkuNSw1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMgLTMpIi8+PC9zdmc+");
		position: absolute;
		right: 0;
		bottom: 3px;
	}
`;

export default class NameFilter extends Component {
	constructor(props) {
		super(props);
		this.state = '';
	}

	render() {
		return (
			<>
				<Name>
					<Autosuggest placeholder="Nome da escola" />
				</Name>
			</>
		);
	}
}
