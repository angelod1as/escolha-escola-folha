import React from 'react';

// import { Container } from './styles';
import LocationFilter from './filters/location-filter/index';
import ChosenFilter from './filters/chosen-filter/index';
import NameFilter from './filters/name-filter/index';

const Top = () => (
	<>
		<LocationFilter />
		<ChosenFilter />
		<NameFilter />
	</>
);

export default Top;
