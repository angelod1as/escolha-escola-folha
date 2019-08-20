import React, { Component } from 'react';
import axios from 'axios';

import Loading from '../../components/loading';

export default class School extends Component {
	constructor(props) {
		super(props);
		const { output, code } = props;
		const url = `${output}school/school-${code}.json`;

		let school = {};
		let avg = {};

		this.state = {
			school,
			avg,
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
		return (
			<Loading loading={loading}>
				<div>oi</div>
			</Loading>
		);
	}
}
