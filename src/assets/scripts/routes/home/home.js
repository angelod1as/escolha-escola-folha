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
			needFetch: false,
		};

		this.updateState = this.updateState.bind(this);
		this.getFiles = this.getFiles.bind(this);
		this.pushHistory = this.pushHistory.bind(this);
		this.checkFetch = this.checkFetch.bind(this);
	}

	componentDidMount() {
		// Set URL if empty
		const { location: { search }, history } = this.props;
		const { filters } = this.state;
		if (search === '') {
			const newHistory = encodeURIComponent(JSON.stringify(filters));
			history.push(`?filters=${newHistory}`);
		} else {
			const query = search.split('?filters=')[1];
			const newFilters = JSON.parse(decodeURIComponent(query));
			const newState = this.state;
			newState.filters = newFilters;
			this.updateState(newState, true);
		}
	}

	getFiles(type, newState, cb) {
		const newerState = newState;
		const { state } = this;
		console.log('get');
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

	pushHistory(receivedFilters) {
		const { history } = this.props;
		const newHistory = encodeURIComponent(JSON.stringify(receivedFilters));
		history.push(`?filters=${newHistory}`);
	}

	updateState(receivedState, force) {
		const { filters: receivedFilters } = receivedState;
		this.pushHistory(receivedFilters);
		const needFetch = this.checkFetch(receivedFilters, force);

		if (needFetch.length > 0) {
			needFetch.forEach((each) => {
				this.getFiles(each, receivedState, (newState) => {
					this.setState(newState);
				});
			});
		} else {
			this.setState(receivedState);
		}
	}

	render() {
		// TODO Passar zona para o filtro
		console.log('rendered', this.state);
		return (
			<>
				<div>oi</div>
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
