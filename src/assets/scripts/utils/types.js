import PropTypes from 'prop-types';

const types = {
	config: PropTypes.shape({
		output: PropTypes.string.isRequired,
	}).isRequired,
	filters: PropTypes.shape({
		uf: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		zone: PropTypes.string.isRequired,
	}),
	hasZone: PropTypes.bool.isRequired,
};

export default types;
