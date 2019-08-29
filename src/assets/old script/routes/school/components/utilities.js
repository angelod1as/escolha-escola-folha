import React from 'react';
import uuid from 'uuid';

import { H3, Ul, Li } from '../../../components/styles';
import { ref } from '../../../components/refs';

const Utilities = ({ data }) => {
	const wrapper = content => (
		<div>
			<H3 as="h3">Dependências</H3>
			<div>
				<Ul>
					{content}
				</Ul>
			</div>
		</div>

	);

	const utilities = Object.keys(data)
		.filter(util => data[util] === 2);

	if (utilities.length > 0) {
		const content = utilities.map(util => <Li as="li" key={uuid()}>{ref.utilities[util][0]}</Li>);
		return wrapper(content);
	}
	return null;
};

export default Utilities;
