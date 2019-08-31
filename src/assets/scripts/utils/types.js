import PropTypes from 'prop-types';

const types = {
	config: PropTypes.shape({
		output: PropTypes.string.isRequired,
	}).isRequired,
	filters: PropTypes.shape({
		uf: PropTypes.string.isRequired,
		city: PropTypes.arrayOf(PropTypes.string).isRequired,
		zone: PropTypes.arrayOf(PropTypes.string).isRequired,
	}),
	data: PropTypes.shape({
		cities: PropTypes.shape(),
		schools: PropTypes.shape(),
	}),
	hasZone: PropTypes.bool.isRequired,
};

export const defaultTypes = {
	config: {
		output: '',
	},
	filters: {
		uf: '',
		city: [],
		zone: [],
	},
	data: {
		cities: {},
		schools: {},
	},
	hasZone: false,
};

export default types;
