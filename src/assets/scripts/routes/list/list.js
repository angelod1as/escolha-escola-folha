import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loading from '../../components/loading';
import Schools from './schools';
import Filters from './filters/filters';
import filter from './filters/filter';

class List extends Component {
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
		this.selectFilter = this.selectFilter.bind(this);

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

	selectFilter(e) {
		const { filters } = this.state;
		const {
			value, id, type,
		} = e.target;
		if (type === 'checkbox') {
			filters[id] = filters[id] === 2 ? 0 : 2;
		} else {
			filters[id] = value;
		}
		if (id === 'public_private') {
			delete filters.type;
		}
		this.setState({ filters });
	}

	render() {
		const { loading, schools, filters } = this.state;
		const { codes } = this.props;
		const hasZone = codes.filter(e => e.includes('-')).length > 0;

		return (
			<Loading loading={loading}>
				<Filters
					filters={filters}
					nameFilter={this.nameFilter}
					selectFilter={this.selectFilter}
					hasZone={hasZone}
				/>
				<hr />
				<Schools from={codes} schools={filter(schools, filters)} />
			</Loading>
		);
	}
}

List.propTypes = {
	codes: PropTypes.arrayOf(PropTypes.string).isRequired,
	output: PropTypes.string.isRequired,
};

export default withRouter(List);
