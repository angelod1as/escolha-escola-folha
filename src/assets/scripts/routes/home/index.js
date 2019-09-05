import { connect } from 'react-redux';
import Home from './home';
import { readFromUrl } from '../../redux/actions/index';

const mapDispatchToProps = {
	readFromUrl,
};

const mapStateToProps = () => ({
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Home);
