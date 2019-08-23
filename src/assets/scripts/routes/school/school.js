import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Loading from '../../components/loading';
import { ref } from '../list/filters/refs';

export default class School extends Component {
	constructor(props) {
		super(props);
		const { output, code } = props;
		const url = `${output}school/school-${code}.json`;

		let school = {};
		let avg = {};

		this.state = {
			loading: 1,
		};

		axios.get(url)
			.then(({ data: schoolData }) => {
				school = schoolData;
				const avgUrl = `${output}avgs/${school.address.city_code}.json`;
				axios.get(avgUrl)
					.then(({ data: cityData }) => {
						avg = cityData;
						this.setState({
							school,
							avg,
							loading: 2,
						});
					});
			});
	}

	render() {
		const { loading, school } = this.state;

		if (loading === 2) {
			console.log(school);
			const { address } = school;
			return (
				<Loading loading={loading}>
					<h2>{school.name}</h2>
					<div>
						<h3>Endereço</h3>
						<div>
							<p>{`${address.address}, ${address.compl}`}</p>
							<p>{`CEP ${address.cep} - ${address.district}`}</p>
							<p>{`${address.city} - ${address.uf}`}</p>
							<p>{`Escola ${ref.address.location[1][address.location]} - ${address.zone ? `Zona ${ref.address.zone[1][address.zone]}` : ''}`}</p>
						</div>
					</div>
				</Loading>
			);
		}
		return <Loading loading={1} />;
	}
}

School.propTypes = {
	code: PropTypes.string.isRequired,
	output: PropTypes.string.isRequired,
};
