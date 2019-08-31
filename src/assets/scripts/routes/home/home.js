import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// import uuid from 'uuid/v1';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import Fade from 'react-reveal/Fade';
// import { upperAll } from '../../utils/upper';

// const spCode = '3550308';
// const rjCode = '3304557';

import Top from './top/top';
// import Sidebar from './sidebar/sidebar';
import Content from './content/content';

export default class Home extends Component {
	constructor(props) {
		super(props);
		const { output } = this.props;
		this.state = {
			config: {
				output,
				spCode: '3550308',
			},
			filters: {
				uf: '',
				city: [],
				zone: [],
			},
			data: {
				cities: {},
				schools: [],
			},
			hasZone: false,
		};

		this.updateState = this.updateState.bind(this);
		this.getFiles = this.getFiles.bind(this);
	}

	getFiles(newState, cb) {
		const { state } = this;
		const { config: { output, spCode } } = state;
		const { filters: { uf, city, zone } } = newState;
		const newerState = newState;
		if (uf !== state.filters.uf) {
			const url = `${output}ufs/uf-${uf}.json`;
			newerState.filters.city = [];
			newerState.filters.zone = [];
			axios.get(url)
				.then(({ data }) => {
					newerState.data.cities = data;
					cb(newerState);
				});
		}
		if (city.length > 0) {
			const fetchCity = city
				.filter((each) => {
					const current = state.filters.city;
					return !current.includes(each) || each === spCode;
				});

			const arr = [].concat(...fetchCity
				.map((each) => {
					if (each === spCode) {
						if (zone.length > 0) {
							return zone
								.filter((eachZone) => {
									const current = state.filters.zone;
									return !current.includes(eachZone);
								})
								.map(eachZone => axios.get(`${output}city/city-${each}-${eachZone}.json`));
						} return null;
					}
					return axios.get(`${output}city/city-${each}.json`);
				})
				.filter(each => each !== null));

			axios
				.all(arr)
				.then(axios.spread((...args) => {
					const array = args.map(({ data }) => data);
					newerState.data.schools = [].concat(...array);
					cb(newerState);
				}));
		}
		cb(newerState);
	}

	updateState(receivedState) {
		const { config: { spCode } } = receivedState;
		this.getFiles(receivedState, (newState) => {
			const newerState = JSON.parse(JSON.stringify(newState));
			newerState.hasZone = newerState.filters.city.includes(spCode);
			this.setState(newerState);
		});
	}

	render() {
		// TODO Passar zona para o filtro
		return (
			<>
				<Top state={this.state} updateState={this.updateState} />
				{/* <Sidebar /> */}
				<Content />
			</>
		);
	}
}


Home.propTypes = {
	output: PropTypes.string.isRequired,
};
