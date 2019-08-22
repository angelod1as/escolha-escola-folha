import React, { Component } from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';

import { ref, categs } from './refs';
import FilterTypes from './filter-types';

export default class Filters extends Component {
	constructor(props) {
		super(props);
		this.goToArray = this.goToArray.bind(this);
	}

	goToArray(obj, category) {
		const { filters } = this.props;
		const { nameFilter } = this.props;

		if (Array.isArray(obj)) {
			if (obj[1] === 'text') {
				return (
					<input
						key="name"
						id="name"
						type="text"
						onChange={e => nameFilter(e.target.value)}
						value={filters.name}
					/>
				);
			}
			return (
				<FilterTypes
					key={category}
					data={obj}
					category={category}
					filters={filters}
					goToArray={this.goToArray}
				/>
			);
		}
		return (
			<div key={uuid()}>
				<h3>{categs[category]}</h3>
				{Object.keys(obj).map(each => this.goToArray(obj[each], each))}
			</div>
		);
	}

	render() {
		return (
			<form onSubmit={(e) => { e.preventDefault(); }}>
				<h2>Filtros</h2>
				{Object.keys(ref).map(category => this.goToArray(ref[category], category))}
			</form>
		);
	}
}

Filters.propTypes = {
	filters: PropTypes.shape().isRequired,
	nameFilter: PropTypes.func.isRequired,
};
