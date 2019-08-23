import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ref } from '../list/filters/refs';

import Back from '../../components/back';
import Loading from '../../components/loading';
import Address from './components/address';
import Avgs from './components/avgs';
import Languages from './components/languages';
import Type from './components/type';
import Utilities from './components/utilities';

class School extends Component {
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
		const { loading, school, avg: city } = this.state;
		const { location } = this.props;

		if (loading === 2) {
			const {
				address, avg, languages, utilities,
			} = school;

			const noFrom = `${address.city_code}${address.zone !== 1 ? `-${ref.address.zone[1][address.zone - 1]}` : ''}`;

			return (
				<Loading loading={loading}>
					<Avgs data={avg} city={city} />
					<Back from={location} noFrom={noFrom} />
					<h2>{school.name}</h2>
					<Type
						publicPrivate={school.public_private}
						type={school.type}
						schoolType={school.school_type}
						location={address.location}
					/>
					<Address data={address} />
					<Languages data={languages} />
					<Utilities data={utilities} />
				</Loading>
			);
		}
		return <Loading loading={1} />;
	}
}

School.propTypes = {
	code: PropTypes.string.isRequired,
	output: PropTypes.string.isRequired,
	location: PropTypes.shape().isRequired,
};

export default withRouter(School);
