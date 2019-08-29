import React from 'react';
import uuid from 'uuid/v1';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { H3, H4 } from '../../../components/styles';
import { avgRefs } from '../../../components/refs';
import AvgBar from './avg-bar';

const Margin = styled.div`
	margin: 10px 0;
`;

const Avgs = ({ data, city }) => {
	const { avg } = city;

	const valid = Object
		.keys(data)
		.map(first => [first, Object
			.keys(data[first])
			.filter(second => data[first][second] !== '')])
		.filter(each => each[1].length > 0);

	if (valid.length > 0) {
		return (
			<div key={uuid()}>
				<H3 as="h3">Médias</H3>
				{valid.map((category) => {
					const title = avgRefs[category[0]];

					const valid2 = Object.keys(data[category[0]]).filter(each => typeof data[category[0]][each] === 'number');

					if (valid2.length > 0) {
						return (
							<Margin key={uuid()}>
								<H3 as="h3">{title.replace('%', '')}</H3>
								<AvgBar
									key={uuid()}
									title={title.replace('%', '')}
									percent={title.includes('%')}
									school={data[category[0]]}
									avg={avg[category[0]]}
								/>
							</Margin>
						);
					} if (category[0] === 'saeb') {
						const saeb = data[category[0]];
						const saebAvg = avg[category[0]];
						const saebValid = Object.keys(saeb)
							.filter((each) => {
								const saebValid2 = Object.keys(saeb[each])
									.filter(each2 => typeof saeb[each][each2] === 'number');
								return saebValid2.length > 0;
							});
						if (saebValid.length > 0) {
							return (
								<Margin key={uuid()}>
									<H3 as="h3">{title}</H3>
									{saebValid.map(each => (
										<div key={uuid()}>
											<H4 as="h4">{avgRefs[each]}</H4>
											<AvgBar
												title={avgRefs[each]}
												percent={title.includes('%')}
												school={saeb[each]}
												avg={saebAvg[each]}
											/>
										</div>
									))}
								</Margin>
							);
						}
					} return null;
				})}
			</div>
		);
	}
	return null;
};

Avgs.propTypes = {
	city: PropTypes.shape().isRequired,
	data: PropTypes.shape().isRequired,
};

export default Avgs;
