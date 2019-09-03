import { connect } from 'react-redux';
import { removeCity, removeZone } from '../../../../../redux/actions/index';
import ChosenFilter from './chosen-filter';

const mapDispatchToProps = {
	removeCity,
	removeZone,
};

const mapStateToProps = ({
	chooseCity: { chosenCities },
	listCities: { cityList },
	chooseZone: { chosenZones },
}) => ({
	chosenCities,
	cityList,
	chosenZones,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ChosenFilter);
