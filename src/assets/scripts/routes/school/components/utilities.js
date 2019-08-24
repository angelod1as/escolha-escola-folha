import React from 'react';
import uuid from 'uuid';
import Fade from 'react-reveal/Fade';
import { ref } from '../../../components/refs';

const Utilities = ({ data }) => {
	const wrapper = content => (
		<Fade>
			<div>
				<h3>Dependências</h3>
				<div>
					<ul>
						{content}
					</ul>
				</div>
			</div>
		</Fade>
	);

	const utilities = Object.keys(data)
		.filter(util => data[util] === 2);

	if (utilities.length > 0) {
		const content = utilities.map(util => <li key={uuid()}>{ref.utilities[util][0]}</li>);
		return wrapper(content);
	}
	return null;
};

export default Utilities;
