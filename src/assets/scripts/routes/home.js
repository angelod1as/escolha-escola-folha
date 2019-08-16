import React, { Component } from 'react';
import uuid from 'uuid/v1';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

import ufList from '../utils/states';

import Loading from './home/loading';

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
				city: [],
			},
		};

		this.handleUfChange = this.handleUfChange.bind(this);
	}

	handleUfChange(event) {
		const uf = event.target.value;
		this.setState({ selected: { uf }, loading: 1 });

		if (uf !== 'Selecione') {
			const filename = uf.toLowerCase();
			const output = '../../../../output/states/';
			const url = `${output}state-${filename}.json`;

			axios.get(url)
				.then((response) => {
					const { data } = response;
					const { lists } = this.state;

					lists.cities = data;

					this.setState({ loading: 2, lists });
				});
		}
	}

	render() {
		const { lists, selected, loading } = this.state;
		const { ufs, cities } = lists;
		const { uf, city } = selected;
		return (
			<>
				<form>
					<label htmlFor="uf">
						Selecione o Estado:
						<select name="uf" id="uf" value={uf} onChange={this.handleUfChange}>
							{ufs.map(each => (
								<option key={uuid()} value={each[1]}>{each[1]}</option>
							))}
						</select>
					</label>
					<Loading loading={loading}>
						{loading === 2
							? (
								<label htmlFor="city">
									Selecione a cidade:

								</label>
							)
							: ''}
					</Loading>
				</form>

			</>
		);
	}
}
