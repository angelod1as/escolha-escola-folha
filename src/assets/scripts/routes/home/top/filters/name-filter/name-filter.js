import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Name = styled.div`
	grid-area: f-name;
	position: relative;
	margin-top: 10px;
	input {
		width: 100%;
		font-family: ${p => p.theme.font.display};
		border: 0;
		border-bottom: 1px solid ${p => (p.disabled ? p.theme.color.gray3 : p.theme.color.black)};
		border-radius: 0;
		text-transform: none;
		text-align: left;
		font-style: italic;
		&::placeholder{
			text-transform: none;
			color: ${p => (p.disabled ? p.theme.color.gray3 : p.theme.color.black)};
		}
	}
	&:after {
		content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNy41IiBoZWlnaHQ9IjE3LjUiIHZpZXdCb3g9IjAgMCAxNy41IDE3LjUiPjxkZWZzPjxzdHlsZT4uYXtmaWxsOiNjY2M7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJhIiBkPSJNOS41LDNhNi41LDYuNSwwLDAsMSw0Ljk0LDEwLjczbC4yNy4yN2guNzlsNSw1TDE5LDIwLjVsLTUtNXYtLjc5bC0uMjctLjI3QTYuNSw2LjUsMCwxLDEsOS41LDNtMCwyQTQuNSw0LjUsMCwxLDAsMTQsOS41LDQuNDgxLDQuNDgxLDAsMCwwLDkuNSw1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMgLTMpIi8+PC9zdmc+");
		position: absolute;
		right: 0;
		bottom: 3px;
	}
`;

const NameFilter = ({ filterName, nameFilter, schoolList }) => {
	const handleChange = (e) => {
		filterName(e.target.value);
	};
	const disabled = Object.keys(schoolList).length <= 0;
	return (
		<Name disabled={disabled}>
			<input
				type="text"
				name="school-name"
				id="school-name"
				placeholder="nome da escola"
				onChange={handleChange}
				value={nameFilter}
				disabled={disabled}
				autoComplete="false"
			/>
		</Name>
	);
};

NameFilter.propTypes = {
	filterName: PropTypes.func.isRequired,
	nameFilter: PropTypes.string.isRequired,
	schoolList: PropTypes.shape().isRequired,
};
export default NameFilter;
