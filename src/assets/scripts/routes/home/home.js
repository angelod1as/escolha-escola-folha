import React, { Component } from 'react';
import uuid from 'uuid/v1';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ufList from '../../utils/states';

import Loading from '../../components/loading';
import Autosuggest from './autosuggest';

const Selected = styled.div`
	p {
		display: inline-block;
		padding: 5px 10px;
		margin: 0 5px;
		border-radius: 5px;
		border: 1px solid ${p => p.theme.color.color};

		button {
			cursor: pointer;
			color: ${p => p.theme.color.gray};
			margin: 0 5px 0 10px;
			appearance: none;
			border: none;
			&:hover {
				color: ${p => p.theme.color.color};
			}
		}
	}
`;

const Form = styled.form`
	label, select {
		display: block;
	}
	label {
		margin: 20px 0;
	}
	select, .autosuggest {
		margin: 10px 0;
	}
`;

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			loading: 0,
			lists: {
				ufs: ufList,
				cities: {},
			},
			selected: {
				uf: 'Selecione',
			},
			auto: {
				list: {},
			},
			chosen: [],
		};

		this.handleUfChange = this.handleUfChange.bind(this);
		this.changeChosen = this.changeChosen.bind(this);
		this.deleteTag = this.deleteTag.bind(this);
	}

	handleUfChange(event) {
		const uf = event.target.value;
		this.setState({ selected: { uf }, loading: 1, chosen: [] });
		const { output } = this.props;

		if (uf !== 'Selecione') {
			const filename = uf.toLowerCase();
			const url = `${output}states/state-${filename}.json`;

			axios.get(url)
				.then((response) => {
					const { data } = response;
					const { lists } = this.state;

					lists.cities = data;

					this.setState({ loading: 2, lists });
				});
		} else {
			this.setState({ loading: 0 });
		}
	}

	changeChosen(code) {
		const { chosen } = this.state;
		if (!chosen.includes(code)) {
			chosen.push(code);
			this.setState({ chosen });
		}
	}

	deleteTag(code) {
		const { chosen } = this.state;
		const newChosen = chosen.filter(each => each !== code);
		this.setState({ chosen: newChosen });
	}

	render() {
		const {
			lists, selected, loading, chosen,
		} = this.state;
		const { ufs, cities } = lists;
		const { uf } = selected;

		// for autosuggest
		const autoList = Object.keys(cities).map(each => ({
			name: cities[each].city_name,
			code: each,
		}));

		return (
			<Form onSubmit={(e) => { e.preventDefault(); }}>

				{/* STATE */}
				<label htmlFor="uf">
						Selecione o Estado:
					<select name="uf" id="uf" value={uf} onChange={this.handleUfChange}>
						{ufs.map(each => (
							<option key={uuid()} value={each[1]}>{each[1]}</option>
						))}
					</select>
				</label>

				{/* LOADING JSON */}
				<Loading loading={loading}>

					{/* CITY */}
					<label htmlFor="city">
						Selecione a cidade:
						<div className="autosuggest">
							<Autosuggest list={autoList} changeChosen={this.changeChosen} />
						</div>
					</label>

					{/* SELECTED CITIES */}
					<Selected>
						{chosen.map(each => (
							<p key={uuid()}>
								{cities[each].city_name}
								<button type="button" data-code={each} onClick={e => this.deleteTag(e.target.dataset.code)}>×</button>
							</p>
						))}
					</Selected>

					{/* BUTTON */}
					{chosen.length > 0
						? <Link to={`lista/${chosen}`}>Continuar</Link>
						: ''}
				</Loading>
			</Form>
		);
	}
}

Home.propTypes = {
	output: PropTypes.string.isRequired,
};
