import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';

import Loading from '../../components/loading';
import Address from './components/address';
import Avgs from './components/avgs';
import Languages from './components/languages';
import Type from './components/type';
import Utilities from './components/utilities';
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

			const {
				address, avg, languages, utilities,
			} = school;

			return (
				<Loading loading={loading}>
					<h2>{school.name}</h2>
					<Type publicPrivate={school.public_private} type={school.type} schoolType={school.school_type} location={address.location} />
					<Address data={address} />
					<Languages data={languages} />
					<Utilities data={utilities} />
					<Avgs data={avg} />
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
