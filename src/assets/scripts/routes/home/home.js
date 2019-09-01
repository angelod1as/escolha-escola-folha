import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

// import uuid from 'uuid/v1';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import Fade from 'react-reveal/Fade';
// import { upperAll } from '../../utils/upper';

// const spCode = '3550308';
// const rjCode = '3304557';

import Top from './top/top';
// import Sidebar from './sidebar/sidebar';
// import Content from './content/content';

class Home extends Component {
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

		const { location: { search }, history } = props;
		const { filters } = this.state;

		if (search === '') {
			const newHistory = encodeURIComponent(JSON.stringify(filters));
			history.push(`?filters=${newHistory}`);
		} else {
			const query = search.split('?filters=')[1];
			const newFilters = JSON.parse(decodeURIComponent(query));
			this.state.filters = newFilters;

			// Fetch all files:
			const needFetch = this.checkFetch(newFilters, true);
			console.log(needFetch);

			if (needFetch.length > 0) {
				needFetch.forEach((each) => {
					this.getFiles(each, this.state, (newer) => {
						this.state = newer;
					});
				});
			}
		}

		this.updateState = this.updateState.bind(this);
		this.getFiles = this.getFiles.bind(this);
		this.checkFetch = this.checkFetch.bind(this);
	}

	getFiles(type, newState, cb) {
		const newerState = newState;
		const { state } = this;
		const { config: { output } } = state;
		const { filters: { uf } } = newState;

		if (type === 'uf') {
			const url = `${output}ufs/uf-${uf}.json`;
			newerState.filters.city = [];
			newerState.filters.zone = [];
			axios.get(url)
				.then(({ data }) => {
					newerState.data.cities = data;
					cb(newerState);
				});
		}
		// const { config: { output, spCode } } = state;
		// const { filters: { uf, city, zone } } = newState;
		// const newerState = newState;
		// if (uf !== state.filters.uf) {
		// 	const url = `${output}ufs/uf-${uf}.json`;
		// 	newerState.filters.city = [];
		// 	newerState.filters.zone = [];
		// 	axios.get(url)
		// 		.then(({ data }) => {
		// 			newerState.data.cities = data;
		// 			cb(newerState);
		// 		});
		// }
		// if (city.length > 0) {
		// 	// const fetchCity = city
		// 	// .filter((each) => {
		// 	// 	const current = state.filters.city;
		// 	// 	return !current.includes(each) || each === spCode;
		// 	// });
		// 	const arr = [].concat(...city
		// 		.map((each) => {
		// 			if (each === spCode) {
		// 				if (zone.length > 0) {
		// 					return zone
		// 						.filter((eachZone) => {
		// 							const current = state.filters.zone;
		// 							return !current.includes(eachZone);
		// 						})
		// 						.map(eachZone => axios.get(`${output}city/city-${each}-${eachZone}.json`));
		// 				} return null;
		// 			}
		// 			return axios.get(`${output}city/city-${each}.json`);
		// 		})
		// 		.filter(each => each !== null));

		// 	axios
		// 		.all(arr)
		// 		.then(axios.spread((...args) => {
		// 			args.forEach(({ data }) => {
		// 				Object.keys(data).forEach((key) => {
		// 					if (newerState.data.schools.length > 0) {
		// 						newerState.data.schools.forEach((old) => {
		// 							if (old.code !== +key) {
		// 								newerState.data.schools.push(data[key]);
		// 							} if (key === spCode) {
		// 								console.log('sp');
		// 							}
		// 						});
		// 					} else {
		// 						newerState.data.schools.push(data[key]);
		// 					}
		// 				});
		// 			});
		// 			cb(newerState);
		// 		}));
		// }
		// cb(newerState);
	}

	checkFetch(received, force) {
		const { filters } = this.state;
		return Object.keys(received).filter((filter) => {
			if (typeof received[filter] === 'string') {
				if (received[filter] !== filters[filter]) {
					return force || true;
				}
			} else {
				// console.log(received);
				// const inside = received[filter].map(each => console.log(each));
				// return inside.length > 0;
			}
			return force || false;
		});
	}

	// updateState(receivedState) {
	// 	const { config: { spCode } } = receivedState;
	// 	this.getFiles(receivedState, (newState) => {
	// 		const newerState = JSON.parse(JSON.stringify(newState));
	// 		newerState.hasZone = newerState.filters.city.includes(spCode);
	// 		this.setState(newerState);
	// 	});
	// }

	pushHistory(newState) {
		const { history } = this.props;
		const newHistory = encodeURIComponent(JSON.stringify(newState.filters));
		history.push(`?filters=${newHistory}`);
	}

	updateState(receivedState) {
		console.log(receivedState);
		const { filters } = this.state;
		const { filters: receivedFilters } = receivedState;
		const needFetch = this.checkFetch(receivedFilters);

		if (needFetch.length > 0) {
			needFetch.forEach((each) => {
				this.getFiles(each, receivedState, (newState) => {
					this.pushHistory(newState);
					this.setState(newState);
				});
			});
		}

		// this.getFiles(receivedState, (newState) => {
		// 	const newerState = JSON.parse(JSON.stringify(newState));
		// 	newerState.hasZone = newerState.filters.city.includes(spCode);
		// 	this.setState(newerState);
		// });
	}

	render() {
		// TODO Passar zona para o filtro
		return (
			<>
				<Top state={this.state} updateState={this.updateState} />
				{/* <Sidebar /> */}
				{/* <Content state={this.state} /> */}
			</>
		);
	}
}


Home.propTypes = {
	output: PropTypes.string.isRequired,
	history: PropTypes.shape().isRequired,
	location: PropTypes.shape({
		search: PropTypes.string,
	}).isRequired,
};

export default withRouter(Home);
