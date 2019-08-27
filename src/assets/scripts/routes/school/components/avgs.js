import React from 'react';
import uuid from 'uuid/v1';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import Fade from 'react-reveal/Fade';
import { avgRefs } from '../../../components/refs';
import AvgBar from './avg-bar';

const Legend = styled.div`
	display: flex;
`;

const LegendWithBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	div {
		width: 15px;
		height: 15px;
		margin-right: 5px;
	}
	&:first-child {
		margin-right: 15px;
	}
`;

const Upper = styled(LegendWithBox)`
	div {
		background-color: ${p => p.theme.color.color};
	}
`;
const Lower = styled(LegendWithBox)`
	div {
		background-color: ${p => p.theme.color.gray2};
	}
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
				<h3>Médias</h3>
				<Legend>
					<Upper>
						<div />
						<p>Escola</p>
					</Upper>
					<Lower>
						<div />
						<p>Cidade</p>
					</Lower>
				</Legend>
				{valid.map((category) => {
					const title = avgRefs[category[0]];

					const valid2 = Object.keys(data[category[0]]).filter(each => typeof data[category[0]][each] === 'number');

					if (valid2.length > 0) {
						return (
							<div key={uuid()}>
								<h3>{title.replace('%', '')}</h3>
								<AvgBar
									key={uuid()}
									title={title.replace('%', '')}
									percent={title.includes('%')}
									school={data[category[0]]}
									avg={avg[category[0]]}
								/>
							</div>
						);
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
