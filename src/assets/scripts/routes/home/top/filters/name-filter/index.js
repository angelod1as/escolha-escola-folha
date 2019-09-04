import { connect } from 'react-redux';
import { filterName } from '../../../../../redux/actions/index';

import NameFilter from './name-filter';

const mapDispatchToProps = {
	filterName,
};

const mapStateToProps = ({
	nameFilter,
	listSchools: { schoolList },
}) => ({ nameFilter, schoolList });

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NameFilter);
