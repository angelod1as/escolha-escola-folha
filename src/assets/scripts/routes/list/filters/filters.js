import React, { Component } from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ref, categs } from './refs';
import FilterTypes from './filter-types';

const StyledFilters = styled.div`
	display: block;
`;

const Upper = styled.div`
	display: grid;
	grid-auto-flow: column;
`;

const Lower = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	/* grid-auto-flow: column; */
	& > div > div {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
`;

export default class Filters extends Component {
	constructor(props) {
		super(props);
		this.goToArray = this.goToArray.bind(this);
	}

	goToArray(obj, category, reference) {
		const { filters, hasZone } = this.props;
		const { nameFilter, selectFilter } = this.props;
		if (Array.isArray(obj)) {
			if (obj[1] === 'text') {
				return (
					<div key={uuid()} id="filtername">
						<h4>Nome da escola</h4>
						<div>
							<input
								key="name"
								id="name"
								type="text"
								onChange={e => nameFilter(e.target.value)}
								value={filters.name}
							/>
						</div>
					</div>
				);
			}
			if (obj[0].toLowerCase() === 'zona') {
				if (hasZone) {
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
				return null;
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
			<div key={uuid()}>
				<h4>{categs[category]}</h4>
				<div>
					{Object.keys(obj).map(each => this.goToArray(obj[each], each, reference[category]))}
				</div>
			</div>
		);
	}

	render() {
		const { filters } = this.props;
		const jsx = {};

		Object.keys(ref).forEach((category) => {
			jsx[category] = this.goToArray(ref[category], category, ref);
		});

		return (
			<form onSubmit={(e) => { e.preventDefault(); }}>
				<h2>Filtros</h2>
				<StyledFilters>
					<Upper>
						{jsx.name}
						{jsx.public_private}
						{filters && filters.public_private && +filters.public_private === 2
							? jsx.type
							: ''
						}
					</Upper>
					<Lower>
						{/* ITERATE ALL THAT ARE NOT UP */}
						{jsx.school_type}
						{jsx.utilities}
						{jsx.address}
						{jsx.languages}
					</Lower>
				</StyledFilters>
			</form>
		);
	}
}

Filters.propTypes = {
	filters: PropTypes.shape().isRequired,
	nameFilter: PropTypes.func.isRequired,
	selectFilter: PropTypes.func.isRequired,
	hasZone: PropTypes.bool.isRequired,
};
