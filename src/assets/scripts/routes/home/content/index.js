import { connect } from 'react-redux';
import Content from './content';

const mapStateToProps = ({
	listSchools: { schoolList },
	showSchool,
}) => ({
	schoolList,
	showSchool,
});

export default connect(mapStateToProps)(Content);
