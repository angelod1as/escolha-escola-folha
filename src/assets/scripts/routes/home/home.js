import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import uuid from 'uuid/v1';
// import axios from 'axios';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import Fade from 'react-reveal/Fade';
// import { upperAll } from '../../utils/upper';

// const spCode = '3550308';
// const rjCode = '3304557';

import Top from './top/top';
// import Sidebar from './sidebar/sidebar';
// import Content from './content/content';

export default class Home extends Component {
	constructor(props) {
		super(props);
		const { output } = this.props;
		this.state = {
			config: {
				output,
			},
			filters: {
				uf: '',
				city: '',
				zone: '',
			},
			hasZone: true,
		};
	}

	render() {
		// TODO Passar zona para o filtro
		return (
			<>
				<Top state={this.state} />
				{/* <Sidebar /> */}
				{/* <Content /> */}
			</>
		);
	}
}


Home.propTypes = {
	output: PropTypes.string.isRequired,
};
