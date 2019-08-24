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
				<input className="f-forms__checkbox" type="checkbox" onChange={selectFilter} name={category} checked={checked} id={category} />
				<label className="f-forms__label" htmlFor={category}>{title}</label>
			</div>
		);
	}
	if (Array.isArray(type)) {
		const final = type.map((each, i) => {
			const val = category === 'zone' ? i + 1 : i;
			return <option key={uuid()} value={val}>{reference[1][i]}</option>;
		});
		return (
			<div key={uuid()}>
				<label className="f-forms__label" htmlFor={category}>{title}</label>
				<select className="f-forms__select" onChange={selectFilter} value={filters[category]} name={category} id={category}>
					{final}
				</select>
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
