import React from 'react';

// import { Container } from './styles';
import LocationFilter from './filters/location-filter';
import ChosenFilter from './filters/chosen-filter';

const Top = () => (
	<>
		<LocationFilter />
		<ChosenFilter />
	</>
);

export default Top;
