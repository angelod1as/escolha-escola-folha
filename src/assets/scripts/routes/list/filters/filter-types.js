import React from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';

const FilterTypes = ({
	data, category, filters, selectFilter, reference,
}) => {
	const [title, type] = data;

	if (type === 'yn') {
		const checked = filters[category] === 2;
		return (
			<div key={uuid()}>
				<h4>{title}</h4>
				<div>
					<input type="checkbox" onChange={selectFilter} name={category} checked={checked} id={category} />
				</div>
			</div>
		);
	}
	if (Array.isArray(type)) {
		const final = type.map((each, i) => <option key={uuid()} value={i}>{reference[1][i]}</option>);
		return (
			<div key={uuid()}>
				<h4>{title}</h4>
				<div>
					<select onChange={selectFilter} value={filters[category]} name={category} id={category}>
						{final}
					</select>
				</div>
			</div>
		);
	}
	return null;
};

FilterTypes.propTypes = {
	category: PropTypes.string.isRequired,
	data: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string),
		]),
	).isRequired,
	selectFilter: PropTypes.func.isRequired,
	filters: PropTypes.shape().isRequired,
	reference: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string),
		]),
	).isRequired,
};

export default FilterTypes;
