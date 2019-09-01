import React, { Component } from 'react';
import Auto from 'react-autosuggest';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import slugfy from '../utils/slugfy';

const AutoWrapper = styled.div`
	.react-autosuggest__container,
	.react-autosuggest__container--open,
	.react-autosuggest__input,
	.react-autosuggest__input--open,
	.react-autosuggest__input--focused,
	.react-autosuggest__suggestions-container,
	.react-autosuggest__suggestions-container--open,
	.react-autosuggest__suggestions-list,
	.react-autosuggest__suggestion,
	.react-autosuggest__suggestion--first,
	.react-autosuggest__suggestion--highlighted,
	.react-autosuggest__section-container,
	.react-autosuggest__section-container--first,
	.react-autosuggest__section-title {
		display: block;
		* {
			font-family: ${p => p.theme.font.display};
			font-weight: 300;
			text-align: center;
			text-transform: ${p => (p.disabled ? 'initial' : 'uppercase')};
			pointer-events: ${p => (p.disabled ? 'none' : 'initial')};
			font-style: italic;
		}
	}

	.react-autosuggest__input {
		&::placeholder {
			color: ${p => (p.disabled ? p.theme.color.gray3 : p.theme.color.black)};
			text-transform: ${p => (p.disabled ? 'initial' : 'uppercase')};
		}
		width: 100%;
		border: 1px solid ${p => (p.disabled ? p.theme.color.gray3 : p.theme.color.black)};
		border-radius: 3px;
		padding: 5px 10px;
		font-size: .9em;
	}

	.react-autosuggest__suggestions-list {
		font-size: .9em;
	}

	.react-autosuggest__suggestion {
		padding: 10px;
		border-bottom: 1px solid ${p => p.theme.color.gray3};
		margin: 0;
		transition: .2 all;
		&:before {
			content: '';
		}
	}

	.react-autosuggest__suggestion--highlighted {
		background-color: ${p => p.theme.color.gray3};
		color: ${p => p.theme.color.black};
	}
`;

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion[0];

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
	<div>
		{suggestion[0]}
	</div>
);

export default class Autosuggest extends Component {
	constructor(props) {
		super(props);

		let value = '';
		if (props.initial) {
			const { data } = props;
			// const res = data.filter(out => out.filter(ins => ins.toLowerCase() === props.initial));
			const res = [].concat(...data.filter((out) => {
				const inside = out.filter(ins => typeof ins === 'string' && ins.toLowerCase() === props.initial);
				return inside.length > 0;
			}));
			value = res[0] || '';
		}

		this.state = {
			value,
			suggestions: [],
		};

		this.onChange = this.onChange.bind(this);
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
		this.getSuggestions = this.getSuggestions.bind(this);
		this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
	}

	onChange(event, { newValue }) {
		this.setState({ value: newValue });
	}

	onSuggestionsFetchRequested({ value }) {
		this.setState({
			suggestions: this.getSuggestions(value),
		});
	}

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested() {
		this.setState({
			suggestions: [],
		});
	}

	onSuggestionSelected(e, { suggestion }) {
		const { handleChange, type } = this.props;
		handleChange(suggestion[1], type);
		if (type === 'uf') {
			this.setState({ value: suggestion[0] });
		} else {
			this.setState({ value: '' });
		}
	}

	// Teach Autosuggest how to calculate suggestions for any given input value.
	getSuggestions(value) {
		const { data } = this.props;
		// Array of Arrays => two indexes:
		// 0 = Name
		// 1 = Code (or similar)
		const searchList = data;
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		if (inputLength === 0) {
			return [];
		}
		return searchList.filter(item => slugfy(item[0]
			.toLowerCase()
			.slice(0, inputLength)) === slugfy(inputValue));
	}

	render() {
		const { value, suggestions } = this.state;
		const { placeholder, enabled } = this.props;

		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			placeholder,
			value,
			onChange: this.onChange,
		};
		return (
			<AutoWrapper disabled={!enabled}>
				<Auto
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					getSuggestionValue={getSuggestionValue}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps}
					onSuggestionSelected={this.onSuggestionSelected}
				/>
			</AutoWrapper>
		);
	}
}

Autosuggest.propTypes = {
	handleChange: PropTypes.func.isRequired,
	data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	enabled: PropTypes.bool,
	initial: PropTypes.string,
};

Autosuggest.defaultProps = {
	enabled: true,
	initial: '',
};
