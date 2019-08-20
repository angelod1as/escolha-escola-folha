import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

import Loading from '../../components/loading';

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
				const schools = args.map(({ config, data }) => {
					const code = config.url.split('city-')[1].split('.json')[0];
					return { [code]: data };
				});
				this.setState({ schools, loading: 2 });
			}));
	}

	render() {
		const { loading, schools } = this.state;

		const list = schools
			.map(city => Object
				.keys(city)
				.map(cityCode => Object
					.keys(city[cityCode])
					.map((schoolCode) => {
						const data = city[cityCode][schoolCode];
						return (
							<Link
								to={`/escola/${schoolCode}`}
								data-city={cityCode}
								data-code={schoolCode}
							>
								{data.school_name}
							</Link>
						);
					})));

		return (
			<>
				<Loading loading={loading}>
					<form>FILTROS</form>
					<hr />
					<div>LISTA</div>
					{list}
				</Loading>
			</>
		);
	}
}
