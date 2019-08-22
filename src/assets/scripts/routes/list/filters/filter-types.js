import React from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';

const FilterTypes = ({
	data, category,
}) => {
	const [title, type] = data;

	if (type === 'yn') {
		return (
			<div key={uuid()}>
				<h4>{title}</h4>
				<select name={category} id={category}>
					<option value="0">Selecione</option>
					<option value="1">Não</option>
					<option value="2">Sim</option>
				</select>
			</div>
		);
	}
	if (Array.isArray(type)) {
		const final = type.map(each => <option key={uuid()} value={each}>{each}</option>);
		return (
			<div key={uuid()}>
				<h4>{title}</h4>
				<select name={category} id={category}>
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
};

export default FilterTypes;
