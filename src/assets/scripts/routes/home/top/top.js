import React from 'react';
import PropTypes from 'prop-types';
import types from '../../../utils/types';

import LocationFilter from './filters/location-filter';
// import ChosenFilter from './filters/chosen-filter';
// import NameFilter from './filters/name-filter';

const Top = props => (
	<>
		<LocationFilter {...props} />
		{/* <ChosenFilter hasZone={hasZone} state={state} /> */}
		{/* <NameFilter /> */}
	</>
);

Top.propTypes = {
	state: PropTypes.shape(types).isRequired,
};

export default Top;
