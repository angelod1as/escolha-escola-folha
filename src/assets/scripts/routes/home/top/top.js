import React from 'react';

// import { Container } from './styles';
import LocationFilter from './filters/location-filter/index';
import ChosenFilter from './filters/chosen-filter/index';

const Top = () => (
	<>
		<LocationFilter />
		<ChosenFilter />
	</>
);

export default Top;
