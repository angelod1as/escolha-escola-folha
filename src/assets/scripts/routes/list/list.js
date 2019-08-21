import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Loading from '../../components/loading';
import Schools from './schools';


export default class List extends Component {
	constructor(props) {
		super(props);
		const { codes, output } = props;

		this.state = {
			loading: 1,
			schools: [],
		};

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

		this.nameFilter = this.nameFilter.bind(this);
	}

	nameFilter(value) {
		const { originalSchools } = this.state;
		const newSchools = originalSchools.filter((each) => {
			const lowerName = each.name.toLowerCase();
			const lowerValue = value.toLowerCase();
			return lowerName.includes(lowerValue);
		});
		this.setState({ schools: newSchools });
	}

	render() {
		const { loading, schools } = this.state;

		return (
			<>
				<Loading loading={loading}>
					<form onSubmit={(e) => { e.preventDefault(); }}>
						<h2>Filtros</h2>
						<label htmlFor="name">
							Nome da escola
							<input id="name" type="text" onChange={e => this.nameFilter(e.target.value)} />
						</label>
					</form>
					<hr />
					<Schools schools={schools} />
				</Loading>
			</>
		);
	}
}

List.propTypes = {
	codes: PropTypes.arrayOf(PropTypes.string).isRequired,
	output: PropTypes.string.isRequired,
};
