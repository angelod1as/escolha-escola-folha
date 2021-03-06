import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { changeFilter } from '../../../redux/actions/index';

const mapDispatchToProps = {
	changeFilter,
};

const mapStateToProps = ({
	filterList,
	listSchools: { schoolList },
}) => ({
	filterList,
	schoolList,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Sidebar);
