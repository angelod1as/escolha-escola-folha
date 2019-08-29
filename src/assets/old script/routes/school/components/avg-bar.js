import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v1';

import { P } from '../../../components/styles';
import bp from '../../../components/breakpoints';
import { avgRefs } from '../../../components/refs';

const Bar = styled.div`
	display: block;
	align-items: start;
	margin: 15px 0;
	@media ${bp.small} {
		display: grid;
		grid-template-columns: 110px 1fr;
	}
`;

const ThisP = styled(P)`
	padding: 0;
	margin: 0;
	font-family: ${p => p.theme.font.display};
	font-size: 0.9em;
	font-weight: 500;
	line-height: 1.2em;
	@media ${bp.small} {
		padding: 7px 0 0 0;
	}
`;

const AvgBar = ({ school, avg, percent }) => {
	const allNum = [];

	const allNumPopulate = (data, data2) => {
		Object.keys(data).map((each) => {
			const schoolNum = data[each];
			const avgNum = data2[each];
			if (typeof schoolNum === 'number') {
				allNum.push(schoolNum, avgNum);
				return null;
			}
			allNumPopulate(schoolNum, avgNum);
			return null;
		});
	};

	allNumPopulate(school, avg);

	const limit = Math.max(...allNum.filter(each => typeof each === 'number'));

	const height = 20;
	const max = 100;

	const createBars = (schoolNum, avgNum) => Object
		.keys(schoolNum)
		.map((each) => {
			let schE = schoolNum[each];
			let avgE = avgNum[each];

			if (typeof schE === 'number') {
				let upper = (schE * max) / limit;
				let lower = (avgE * max) / limit;

				schE = Math.round(schE * 100) / 100;
				const noAvg = avgE === undefined;
				avgE = noAvg ? 'média não disponível' : Math.round(avgE * 100) / 100;

				if (percent) {
					upper = schE;
					lower = avgE;
				}

				const isBigger = avgE > (schE + 20);

				const Limit = styled.div`
					margin: 3px 0 10px;
					@media ${bp.small} {
						margin: 10px 0 25px;
					}
					width: 100%;
					height: ${height}px;
					position: relative;
					font-family: ${p => p.theme.font.display};
					font-size: 0.9em;
					font-weight: 500;
					background-color: ${p => p.theme.color.gray3};
					z-index: -15;
				`;

				const Holder = styled.div`
					width: calc(100% - 1px);
					height: ${height}px;
					position: relative;
					z-index: -10;
				`;

				const BarSchool = styled.div`
					border-right: 1px solid ${p => p.theme.color.color};
					background-color: ${p => p.theme.color.color};
					width: ${upper}%;
					height: ${height}px;
					z-index: -1;
					position: relative;
					&:after {
						content: '${schE}${percent ? '%' : ''}';
						position: absolute;
						top: ${-height - 6}px;
						font-size: .9em;
						right: 0;
						color: ${p => p.theme.color.color};
						z-index: 0;
					}
				`;

				const BarAvg = styled.div`
					border-right: 2px solid ${p => p.theme.color.gray2};
					width: ${lower}%;
					height: ${height + 10}px;
					position: absolute;
					top: -5px;
					left: 0;
					z-index: -1;
					&:before {
						content: '\\25B4';
						position: absolute;
						top: ${height - 6}px;
						right: -6px;
						color: ${p => p.theme.color.gray2};
						z-index: 0;
					}
					&:after {
						content: 'Cidade: ${avgE}${percent ? '%' : ''}';
						font-size: .9em;
						position: absolute;
						top: ${height + 12}px;
						color: ${p => p.theme.color.gray2};
						${() => (isBigger ? 'width: 100%;' : 'right: -5px; width: initial;')}
						${() => (percent && avgE < 20 ? 'left: 0; width: 100vw' : '')}
						${() => (noAvg ? 'left: 0; width: 100vw' : '')}
					}
				`;

				const legend = each === 'medio' || each === 'fundamental' ? 'Ensino ' : '';
				return (
					<Bar key={uuid()}>
						<ThisP>{`${legend}${avgRefs[each]}`}</ThisP>
						<Limit>
							<Holder>
								<BarSchool />
								<BarAvg />
							</Holder>
						</Limit>
					</Bar>
				);
			}
			const title = <h4 key={uuid()}>{avgRefs[each]}</h4>;
			const bars = [title, createBars(schE, avgE)];
			return bars;
		});

	return createBars(school, avg);
};

export default AvgBar;
