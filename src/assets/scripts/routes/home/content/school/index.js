import { connect } from 'react-redux';
import School from './school';
import { cleanSchool, cleanUrl } from '../../../../redux/actions/index';

const mapDispatchToProps = {
	cleanSchool,
	cleanUrl,
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
