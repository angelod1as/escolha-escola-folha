import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

// import uuid from 'uuid/v1';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import Fade from 'react-reveal/Fade';
// import { upperAll } from '../../utils/upper';

// const spCode = '3550308';
// const rjCode = '3304557';

import Top from './top/top';
// import Sidebar from './sidebar/sidebar';
// import Content from './content/content';

class Home extends Component {
	constructor(props) {
		super(props);
		const { output } = this.props;
		this.state = {
			config: {
				output,
				spCode: '3550308',
			},
			filters: {
				uf: '',
				city: [],
				zone: [],
			},
			data: {
				cities: {},
				schools: [],
			},
			hasZone: false,
			needFetch: false,
		};
	}

	render() {
		// TODO Passar zona para o filtro
		return (
			<>
				<div>oi</div>
				{/* <Top state={this.state} updateState={this.updateState} /> */}
				{/* <Sidebar /> */}
				{/* <Content state={this.state} /> */}
			</>
		);
	}
}


Home.propTypes = {
	output: PropTypes.string.isRequired,
	history: PropTypes.shape().isRequired,
	location: PropTypes.shape({
		search: PropTypes.string,
	}).isRequired,
};

export default withRouter(Home);
