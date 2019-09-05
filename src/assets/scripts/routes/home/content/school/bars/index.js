import { connect } from 'react-redux';
import Bars from './bars';
// import { cleanSchool } from '../../../../../redux/actions/index';

const mapDispatchToProps = {
};

const mapStateToProps = ({
	schoolData: { data: { avg, type } },
	cityAvg: { data: { avg: cityAvg } },
}) => ({
	avg,
	cityAvg,
	type,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Bars);
