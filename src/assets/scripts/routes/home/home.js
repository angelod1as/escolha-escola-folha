import React, { Component } from 'react';
// import uuid from 'uuid/v1';
// import axios from 'axios';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Fade from 'react-reveal/Fade';
// import { upperAll } from '../../utils/upper';

// const spCode = '3550308';
// const rjCode = '3304557';

import Sidebar from './sidebar/sidebar';
import Content from './content/content';
import Top from './top/top';


export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			chosen: {
				state: 0,
				city: 0,
				zone: 0,
			},
			hasZone: true,
		};
	}

	render() {
		// TODO Passar zona para o filtro
		const { hasZone } = this.state;
		return (
			<>
				<Top hasZone={hasZone} />
				<Sidebar />
				<Content />
			</>
		);
	}
}

// Home.propTypes = {
// 	output: PropTypes.string.isRequired,
// };
