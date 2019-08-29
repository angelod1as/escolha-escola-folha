import React, { Component } from 'react';
// import styled from 'styled-components';
//

import LocationFilter from './filters/location-filter';
import ChosenFilter from './filters/chosen-filter';
import NameFilter from './filters/name-filter';

export default class Top extends Component {
	constructor(props) {
		super(props);
		this.state = '';
	}

	render() {
		const { hasZone } = this.props;
		return (
			<>
				<LocationFilter hasZone={hasZone} />
				<ChosenFilter hasZone={hasZone} />
				<NameFilter />
			</>
		);
	}
}
