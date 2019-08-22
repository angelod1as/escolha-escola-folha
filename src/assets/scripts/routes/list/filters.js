import React, { Component } from 'react';
import uuid from 'uuid/v1';
import { ref, categs } from './refs';

const FilterTypes = ({
	reference, category, filters: { name }, nameFilter,
}) => <input key="name-input-text" id="name" type="text" onChange={e => nameFilter(e.target.value)} value={name} />;

export default class Filters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filters: {},
		};
		this.nameFilter = this.nameFilter.bind(this);
	}

	nameFilter(value) {
		const { filters } = this.state;
		filters.name = value;
		this.setState({ filters });
	}

	filterType(arr, category) {
		const { nameFilter, filters } = this.state;
		const { name } = filters;

		if (arr[1] === 'text') {
			return (
				<div key={uuid()}>
					<h2>{arr[0]}</h2>
					<input key="name-input-text" id="name" type="text" onChange={e => this.nameFilter(e.target.value)} value={name} />
				</div>
			);
		}
		if (arr[1] === 'yn') {
			return (
				<div key={uuid()}>
					<h2>{arr[0]}</h2>
					<select name={category} id={category}>
						<option value="0">Selecione</option>
						<option value="1">Não</option>
						<option value="2">Sim</option>
					</select>
				</div>
			);
		}
		if (Array.isArray(arr[1])) {
			const final = arr[1].map(each => <option key={uuid()} value={each}>{each}</option>);
			return (
				<div key={uuid()}>
					<h2>{arr[0]}</h2>
					<select name={category} id={category}>
						{final}
					</select>
				</div>
			);
		}
		return null;
	}

	goToArray(obj, category) {
		if (Array.isArray(obj)) {
			return this.filterType(obj, category);
		}
		return (
			<div key={uuid()}>
				<h2>{categs[category]}</h2>
				{Object.keys(obj).map(each => this.goToArray(obj[each], each))}
			</div>
		);
	}

	render() {
		const { filters } = this.state;
		const { name } = filters;
		return (
			<form onSubmit={(e) => { e.preventDefault(); }}>
				<h2>Filtros</h2>
				{/* {Object.keys(ref).map(category => this.goToArray(ref[category], category))} */}
				{Object.keys(ref).map(category => (
					<FilterTypes
						reference={ref[category]}
						category={category}
						filters={filters}
						nameFilter={this.nameFilter}
						goToArray={this.goToArray}
					/>
				))}

			</form>
		);
	}
}
