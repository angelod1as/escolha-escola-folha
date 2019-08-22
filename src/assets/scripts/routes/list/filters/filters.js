import React, { Component } from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ref, categs } from './refs';
import FilterTypes from './filter-types';

const StyledFilters = styled.div``;

export default class Filters extends Component {
	constructor(props) {
		super(props);
		this.goToArray = this.goToArray.bind(this);
	}

	goToArray(obj, category, reference) {
		const { filters } = this.props;
		const { nameFilter, selectFilter } = this.props;
		if (Array.isArray(obj)) {
			if (obj[1] === 'text') {
				return (
					<fieldset>
						<legend>Nome da escola</legend>
						<input
							key="name"
							id="name"
							type="text"
							onChange={e => nameFilter(e.target.value)}
							value={filters.name}
						/>
					</fieldset>
				);
			}
			return (
				<FilterTypes
					key={category}
					data={obj}
					category={category}
					filters={filters}
					selectFilter={selectFilter}
					reference={reference[category]}
				/>
			);
		}
		return (
			<fieldset key={uuid()}>
				<legend>{categs[category]}</legend>
				{Object.keys(obj).map(each => this.goToArray(obj[each], each, reference[category]))}
			</fieldset>
		);
	}

	render() {
		return (
			<form onSubmit={(e) => { e.preventDefault(); }}>
				<h2>Filtros</h2>
				<StyledFilters>
					{Object.keys(ref).map(category => this.goToArray(ref[category], category, ref))}
				</StyledFilters>
			</form>
		);
	}
}

Filters.propTypes = {
	filters: PropTypes.shape().isRequired,
	nameFilter: PropTypes.func.isRequired,
	selectFilter: PropTypes.func.isRequired,
};
