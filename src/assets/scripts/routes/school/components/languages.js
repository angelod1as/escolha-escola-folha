import React from 'react';
import uuid from 'uuid';
import Fade from 'react-reveal/Fade';
import { ref } from '../../../components/refs';
import { upper } from '../../../components/upper';

const Languages = ({ data }) => {
	const wrapper = content => (
		<Fade cascade>
			<div>
				<h3>Idiomas</h3>
				<div>
					<ul>
						{content}
					</ul>
				</div>
			</div>
		</Fade>
	);

	const languages = Object.keys(data)
		.filter(util => data[util] === 2);

	if (languages.length > 0) {
		const content = languages.map((util) => {
			const res = ref.languages[util][0].split(' de ')[1];
			return <li key={uuid()}>{upper(res)}</li>;
		});
		return wrapper(content);
	}
	return null;
};

export default Languages;
