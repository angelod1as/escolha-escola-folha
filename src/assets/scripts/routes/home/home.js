import React, { Component } from 'react';
import uuid from 'uuid/v1';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


import ufList from '../../utils/states';

import Loading from '../../components/loading';
import Autosugest from './autosugest';

const Selected = styled.div`
	span {
		padding: 3px 5px;
		background-color: lightgray;
		margin: 0 5px;
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
		}
	}

	changeChosen(code) {
		const { chosen } = this.state;
		if (!chosen.includes(code)) {
			chosen.push(code);
			this.setState({ chosen });
		}
	}

	render() {
		const {
			lists, selected, loading, chosen,
		} = this.state;
		const { ufs, cities } = lists;
		const { uf } = selected;

		// for Autosugest
		const autoList = Object.keys(cities).map(each => ({
			name: cities[each].city_name,
			code: each,
		}));

		return (
			<form onSubmit={(e) => { e.preventDefault(); }}>
				<label htmlFor="uf">
						Selecione o Estado:
					<select name="uf" id="uf" value={uf} onChange={this.handleUfChange}>
						{ufs.map(each => (
							<option key={uuid()} value={each[1]}>{each[1]}</option>
						))}
					</select>
				</label>
				<Loading loading={loading}>
					<label htmlFor="city">
						Selecione a cidade:
						<Autosugest list={autoList} changeChosen={this.changeChosen} />
					</label>
				</Loading>
				<Selected>
					{chosen.map(each => <span key={uuid()}>{cities[each].city_name}</span>)}
				</Selected>
				{chosen.length > 0
					? <Link to={`lista/${chosen}`}>Continuar</Link>
					: ''}
			</form>
		);
	}
}
