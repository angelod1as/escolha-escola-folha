import { connect } from 'react-redux';
import School from './school';
import { cleanSchool } from '../../../../redux/actions/index';

const mapDispatchToProps = {
	cleanSchool,
};

const mapStateToProps = ({
	schoolData: { data },
}) => ({
	data,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(School);
