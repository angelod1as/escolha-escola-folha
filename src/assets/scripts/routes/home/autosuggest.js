import React, { Component } from 'react';
import Auto from 'react-autosuggest';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import slugfy from '../../components/slugfy';

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
			font-family: ${p => p.theme.font.display}
		}
	}

	.react-autosuggest__suggestions-list {
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
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
	<div>
		{suggestion.name}
	</div>
);

export default class autosuggest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
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
		const { changeChosen } = this.props;
		changeChosen(suggestion.code);
		this.setState({ value: '' });
	}

	// Teach Autosuggest how to calculate suggestions for any given input value.
	getSuggestions(value) {
		const { list } = this.props;
		const searchList = Object.keys(list).map(each => list[each]);
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		if (inputLength === 0) {
			return [];
		}
		return searchList.filter(item => slugfy(item
			.name
			.toLowerCase()
			.slice(0, inputLength)) === slugfy(inputValue));
	}

	render() {
		const { value, suggestions } = this.state;

		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			placeholder: 'Digite a cidade',
			value,
			onChange: this.onChange,
		};
		return (
			<AutoWrapper>
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

autosuggest.propTypes = {
	changeChosen: PropTypes.func.isRequired,
	list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
