import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Back from '../../components/back';

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
			sortOrder: ['name', true],
		};

		this.nameFilter = this.nameFilter.bind(this);
		this.selectFilter = this.selectFilter.bind(this);
		this.sortList = this.sortList.bind(this);
		this.changeSort = this.changeSort.bind(this);

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
				this.sortList(schools);
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

	changeSort(term, order) {
		const { schools } = this.state;
		this.setState({ sortOrder: [term, order] }, () => {
			this.sortList(schools);
		});
	}

	sortList(schools) {
		const { sortOrder } = this.state;
		const [term, asc] = sortOrder;
		if (asc) {
			schools.sort((a, b) => {
				if (a[term] < b[term]) { return -1; }
				if (a[term] > b[term]) { return 1; }
				return 0;
			});
		} else {
			schools.sort((a, b) => {
				if (a[term] > b[term]) { return -1; }
				if (a[term] < b[term]) { return 1; }
				return 0;
			});
		}
		this.setState({ schools });
	}

	render() {
		const {
			loading, schools, filters, sortOrder,
		} = this.state;
		const { codes } = this.props;
		const hasZone = codes.filter(e => e.includes('-')).length > 1;

		return (
			<Loading loading={loading}>
				<Back />
				<h2>Escolas</h2>
				<Filters
					filters={filters}
					nameFilter={this.nameFilter}
					selectFilter={this.selectFilter}
					hasZone={hasZone}
				/>
				<Schools
					from={codes}
					schools={filter(schools, filters)}
					changeSort={this.changeSort}
					sortOrder={sortOrder}
				/>
			</Loading>
		);
	}
}

List.propTypes = {
	codes: PropTypes.arrayOf(PropTypes.string).isRequired,
	output: PropTypes.string.isRequired,
};

export default withRouter(List);
