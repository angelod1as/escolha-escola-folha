import { connect } from 'react-redux';
import School from './school';
import { cleanSchool, fetchSchool } from '../../../../redux/actions/index';

const mapDispatchToProps = {
	cleanSchool,
	fetchSchool,
};

const mapStateToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(School);
