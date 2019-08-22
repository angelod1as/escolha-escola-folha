import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Loading from '../../components/loading';
import Schools from './schools';
import Filters from './filters';

export default class List extends Component {
	constructor(props) {
		super(props);
		const { codes, output } = props;

		this.state = {
			loading: 1,
			schools: [],
			filters: {
				name: '',
			},
		};

		this.nameFilter = this.nameFilter.bind(this);

		axios.all(codes.map(each => axios.get(`${output}city/city-${each}.json`)))
			.then(axios.spread((...args) => {
				const array = args.map(({ config, data }) => {
					const code = config.url.split('city-')[1].split('.json')[0];
					return Object.keys(data).map((each) => {
						const newData = data[each];
						newData.code = each;
						newData.city_code = code;
						return newData;
					});
				});
				const schools = [].concat(...array);
				this.setState({ originalSchools: schools, schools, loading: 2 });
			}));
	}

	nameFilter(value) {
		this.setState({ filters: { name: value } });
	}

	render() {
		const { loading, schools, filters } = this.state;

		const filter = (data) => {
			const { name } = filters;
			const final = data
				.filter(each => each.name.toLowerCase().includes(name.toLowerCase()));
			return final;
		};

		return (
			<Loading loading={loading}>
				<Filters filters={filters} nameFilter={this.nameFilter} />
				<hr />
				<Schools schools={filter(schools)} />
			</Loading>
		);
	}
}

List.propTypes = {
	codes: PropTypes.arrayOf(PropTypes.string).isRequired,
	output: PropTypes.string.isRequired,
};
