import React, { Component } from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Back from '../../../components/back';

import { ref, categs } from '../../../components/refs';
import FilterTypes from './filter-types';

const StyledFilters = styled.div`
	display: block;
`;

const Upper = styled.div`
	display: grid;
	grid-auto-flow: column;
	margin-bottom: 10px;
`;

const Lower = styled.div`
	overflow: hidden;
	margin-top: 10px;
	display: block;
	& > div {
		margin-bottom: 10px;
		padding-bottom: 20px;
		border-bottom: 1px solid ${p => p.theme.color.gray3};
		& > div {
			display: flex;
			& > div {
				width: 100%;
			}
		}
	}
`;

export default class Filters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			more: false,
		};

		this.goToArray = this.goToArray.bind(this);
		this.moreFilters = this.moreFilters.bind(this);
	}

	moreFilters() {
		const { more } = this.state;
		this.setState({ more: !more });
	}

	goToArray(obj, category, reference) {
		const { filters, hasZone } = this.props;
		const { nameFilter, selectFilter } = this.props;
		if (Array.isArray(obj)) {
			if (obj[1] === 'text') {
				return (
					<div key={uuid()} id="filtername">
						<label className="f-forms__label" htmlFor="name">Nome da escola</label>
						<input
							key="name"
							id="name"
							type="text"
							className="f-forms__text"
							onChange={e => nameFilter(e.target.value)}
							value={filters.name}
						/>
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
		const { more } = this.state;
		const jsx = {};

		Object.keys(ref).forEach((category) => {
			jsx[category] = this.goToArray(ref[category], category, ref);
		});

		return (
			<form onSubmit={(e) => { e.preventDefault(); }}>
				<Back />
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
					<button className="f-forms__button_primary" type="button" onClick={this.moreFilters}>Mais filtros</button>
					<Fade collapse duration={500} when={more}>
						<Lower>
							{jsx.school_type}
							{jsx.utilities}
							{jsx.address}
							{jsx.languages}
						</Lower>
					</Fade>
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
