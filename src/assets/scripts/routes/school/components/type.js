import React from 'react';
import { ref } from '../../../components/refs';

const Type = ({
	publicPrivate, type, schoolType, location,
}) => {
	const wrapper = content => (
		<div>
			<p>{content[0]}</p>
			<p>{content[1]}</p>
		</div>
	);
	let typeAndLoc = '';

	if (+publicPrivate === 1) {
		typeAndLoc = `Escola privada ${ref.address.location[1][location].toLowerCase()}`;
	} else {
		typeAndLoc = `Escola ${ref.type[1][type].toLowerCase()} ${ref.address.location[1][location].toLowerCase()}`;
	}

	const validType = Object.keys(schoolType).filter(each => +schoolType[each] === 2);
	let finalType = '';

	if (validType.length > 0) {
		if (validType.length === 1) {
			finalType = `Ensino ${ref.school_type[validType][0].replace('Ensino ', '')}`;
		} else {
			finalType = `Ensino ${validType.map(each => ref.school_type[each][0].replace('Ensino ', '')).join(' e ')}`;
		}
	}

	return wrapper([typeAndLoc, finalType]);
};

export default Type;
