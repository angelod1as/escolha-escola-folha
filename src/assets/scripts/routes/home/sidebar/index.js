import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { changeFilter } from '../../../redux/actions/index';

const mapDispatchToProps = {
	changeFilter,
};

const mapStateToProps = ({
	filterList,
}) => ({
	filterList,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Sidebar);
