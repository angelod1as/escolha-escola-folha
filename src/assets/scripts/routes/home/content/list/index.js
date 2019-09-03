import { connect } from 'react-redux';
import List from './list';

const mapDispatchToProps = {};
const mapStateToProps = ({
	listSchools: { schoolList },
}) => ({
	schoolList,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(List);
