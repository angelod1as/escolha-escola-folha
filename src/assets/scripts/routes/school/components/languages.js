import React from 'react';
import uuid from 'uuid';

import { H3, Ul, Li } from '../../../components/styles';
import { ref } from '../../../components/refs';
import { upper } from '../../../components/upper';

const Languages = ({ data }) => {
	const wrapper = content => (
		<div>
			<H3 as="h3">Idiomas</H3>
			<div>
				<Ul>
					{content}
				</Ul>
			</div>
		</div>
	);

	const languages = Object.keys(data)
		.filter(util => data[util] === 2);

	if (languages.length > 0) {
		const content = languages.map((util) => {
			const res = ref.languages[util][0].split(' de ')[1];
			return <Li as="li" key={uuid()}>{upper(res)}</Li>;
		});
		return wrapper(content);
	}
	return null;
};

export default Languages;
