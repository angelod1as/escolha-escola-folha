import { connect } from 'react-redux';
import { fetchCityList, fetchSchoolList } from '../../../../../redux/actions/index';

import LocationFilters from './location-filter';

const mapDispatchToProps = {
	fetchCityList,
	fetchSchoolList,
};

const mapStateToProps = ({
	config: { ufList, zoneList },
	chooseUf: { chosenUf },
	listCities: { cityList },
	chooseCity: { hasChosenCity, hasZone },
}) => ({
	ufList,
	zoneList,
	chosenUf,
	cityList,
	hasChosenCity,
	hasZone,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LocationFilters);
