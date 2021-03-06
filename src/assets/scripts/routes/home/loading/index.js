import { connect } from 'react-redux';

import Loading from './loading';

const mapStateToProps = ({
	listCities,
	listSchools,
	schoolData,
	cityAvg,
}) => {
	const isLoading =	listCities.fetching
	|| listSchools.fetching
	|| schoolData.fetching
	|| cityAvg.fetching;

	return ({ isLoading });
};

export default connect(
	mapStateToProps,
	// mapDispatchToProps
)(Loading);
