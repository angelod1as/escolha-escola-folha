import { connect } from 'react-redux';
import Content from './content';

const mapStateToProps = ({
	listSchools: { schoolList },
	schoolData,
}) => ({
	schoolList,
	schoolData,
});

export default connect(mapStateToProps)(Content);
