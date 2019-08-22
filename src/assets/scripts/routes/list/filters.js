import React, { Component } from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
import { ref, categs } from './refs';

const FilterTypes = ({
	data, category, filters: { name }, nameFilter,
}) => {
	const [title, type] = data;

	if (type === 'yn') {
		return (
			<div key={uuid()}>
				<h4>{title}</h4>
				<select name={category} id={category}>
					<option value="0">Selecione</option>
					<option value="1">Não</option>
					<option value="2">Sim</option>
				</select>
			</div>
		);
	}
	if (Array.isArray(type)) {
		const final = type.map(each => <option key={uuid()} value={each}>{each}</option>);
		return (
			<div key={uuid()}>
				<h4>{title}</h4>
				<select name={category} id={category}>
					{final}
				</select>
			</div>
		);
	}
	return null;
};

export default class Filters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filters: {
				name: '',
			},
		};
		this.nameFilter = this.nameFilter.bind(this);
		this.goToArray = this.goToArray.bind(this);
	}

	nameFilter(value) {
		const { filters } = this.state;
		filters.name = value;
		this.setState({ filters });
	}

	goToArray(obj, category) {
		const { filters } = this.state;
		if (Array.isArray(obj)) {
			if (obj[1] === 'text') {
				return (
					<input
						key="name"
						id="name"
						type="text"
						onChange={e => this.nameFilter(e.target.value)}
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
					nameFilter={this.nameFilter}
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
