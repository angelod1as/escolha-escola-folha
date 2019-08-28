import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v1';
// import Fade from 'react-reveal/Fade';
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

const P = styled.div`
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
	const upperHeight = height;
	const upperTop = (height / 2) - (upperHeight / 2);

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
				avgE = noAvg ? 'Média não disponível' : Math.round(avgE * 100) / 100;

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

				const Upper = styled.div`
					background-color: ${p => p.theme.color.color};
					width: ${upper}%;
					height: ${upperHeight}px;
					position: absolute;
					top: ${upperTop}px;
					left: 0;
					z-index: -2;
				`;

				const UpperBar = styled.div`
					border-right: 1px solid ${p => p.theme.color.color};
					width: ${upper}%;
					height: ${height}px;
					z-index: -1;
					position: relative;
					&:after {
						content: '${schE}${percent ? '%' : ''}';
						position: absolute;
						/* ${() => (upper < 90 ? 'top: 0px;' : `top: ${-height}px;`)} */
						/* ${() => (upper < 90 ? 'left: calc(100% + 5px);' : 'right: 5px;')} */
						top: ${-height}px;
						right: 0;
						color: ${p => p.theme.color.color};
						z-index: 0;
					}
				`;

				const LowerBar = styled.div`
					border-right: 2px solid ${p => p.theme.color.gray2};
					width: ${lower}%;
					height: ${height + 10}px;
					position: absolute;
					top: -5px;
					left: 0;
					z-index: -1;
					&:after {
						content: 'Cidade: ${avgE}${percent ? '%' : ''}';
						font-size: .9em;
						position: absolute;
						top: ${height + 12}px;
						width: 100%;
						${() => {
		if (isBigger) {
			return 'left: calc(100% + 5px); top: 0;';
		}
		if (percent && avgE < 10) {
			return 'left: 5px;';
		}
		if (noAvg) {
			return 'left: 5px; width: 200px;';
		}
		return 'right: 5px;';
	}}
						color: ${p => p.theme.color.gray2};
					}
					&:before {
						content: '▴';
						position: absolute;
						top: ${height}px;
						right: -6px;
						color: ${p => p.theme.color.gray2};
						z-index: 0;
					}
				`;

				const Lower = styled.div`
					width: ${lower}%;
					height: ${height}px;
					position: absolute;
					top: 0;
					left: 0;
					z-index: -4;
			`;
				return (
					<Bar key={uuid()}>
						<P>{`Ensino ${avgRefs[each]}`}</P>
						<Limit>
							<Holder>
								<UpperBar />
								<LowerBar />
								<Lower />
								<Upper />
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
