import React from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';

const FilterTypes = ({
	data, category, filters, selectFilter, reference,
}) => {
	const [title, type] = data;

	if (type === 'yn') {
		return (
			<fieldset key={uuid()}>
				<h4>{title}</h4>
				<select onChange={selectFilter} value={filters[category]} name={category} id={category}>
					<option value="0">Selecione</option>
					<option value="1">Não</option>
					<option value="2">Sim</option>
				</select>
			</fieldset>
		);
	}
	if (Array.isArray(type)) {
		const final = type.map((each, i) => <option key={uuid()} value={i}>{reference[1][i]}</option>);
		return (
			<fieldset key={uuid()}>
				<h4>{title}</h4>
				<select onChange={selectFilter} value={filters[category]} name={category} id={category}>
					{final}
				</select>
			</fieldset>
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
};

export default FilterTypes;
