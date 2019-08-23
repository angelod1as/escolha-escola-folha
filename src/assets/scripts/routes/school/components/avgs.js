import React from 'react';
import uuid from 'uuid/v1';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ref, avgRefs } from '../../list/filters/refs';
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
		background-color: ${p => p.theme.color.gray};
	}
`;

const Avgs = ({ data, city }) => {
	const { avg } = city;

	const outer = Object.keys(data).map((first) => {
		const schoolCateg = data[first];
		const cityCateg = avg[first];

		const inner = Object.keys(schoolCateg)
			.filter((second) => {
				const schoolSub = schoolCateg[second];
				return schoolSub !== '';
			})
			.map((second) => {
				const schoolSub = schoolCateg[second];
				const citySub = cityCateg[second];
				const mainRef = ref.avg[first][second][0];

				return (
					<div key={uuid()}>
						<h5>{mainRef}</h5>
						<AvgBar
							school={Math.round(schoolSub * 100) / 100}
							avg={parseFloat(Math.round(citySub * 100) / 100)}
						/>
					</div>
				);
			});

		if (inner.length > 0) {
			return (
				<div key={uuid()}>
					<h4>{avgRefs[first]}</h4>
					<div>{inner}</div>
				</div>

			);
		}
		return null;
	});

	if (outer.length > 0) {
		return (
			<div key={uuid()}>
				<h3>Médias</h3>
				<Legend>
					<Upper>
						<div />
						<p>Média da escola</p>
					</Upper>
					<Lower>
						<div />
						<p>Média da cidade</p>
					</Lower>
				</Legend>
				<div>{outer}</div>
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
