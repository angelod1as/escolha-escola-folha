import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v1';
import Fade from 'react-reveal/Fade';
import bp from '../../../components/breakpoints';
import { avgRefs } from '../../../components/refs';

const Bar = styled.div`
	display: block;
	/* grid-template-columns: 110px 1fr; */
	align-items: start;
	p {
		padding: 0;
		margin: 0;
		font-family: ${p => p.theme.font.display};
		font-size: 0.9em;
		font-weight: 500;
		line-height: 1.2em;
	}
	@media ${bp.small} {
		display: grid;
		grid-template-columns: 110px 1fr;
		p {
			padding: 7px 0 0 0;
		}
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
	const max = 80;
	const upperHeight = height / 3;
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

				const isBigger = avgE > (schE + 10);

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
					&:after{
						content: '${schE}${percent ? '%' : ''}';
						position: absolute;
						${() => (upper < 80 ? 'top: 0px;' : `top: ${-height + 7}px;`)}
						${() => (upper < 80 ? 'left: calc(100% + 5px);' : 'right: 5px;')}
						color: ${p => p.theme.color.color};
					}
				`;

				const LowerBar = styled.div`
					border-right: 1px solid ${p => p.theme.color.gray3};
					width: ${lower}%;
					height: ${height}px;
					position: absolute;
					top: 0;
					left: 0;
					z-index: -3;
					&:after{
						content: '${avgE}${percent ? '%' : ''}';
						position: absolute;
						top: ${height + 3}px;
						${() => {
		if (isBigger) {
			return 'left: calc(100% + 5px); top: 0;';
		}
		if (percent && avgE < 10) {
			return 'left: 0;';
		}
		if (noAvg) {
			return 'left: 0; width: 200px;';
		}
		return 'right: 0;';
	}}
						color: ${p => p.theme.color.gray2};
					}
				`;

				const Lower = styled.div`
					background-color: ${p => p.theme.color.gray3};
					width: ${lower}%;
					height: ${height}px;
					position: absolute;
					top: 0;
					left: 0;
					z-index: -4;
			`;
				return (
					<Bar key={uuid()}>

						<p>{avgRefs[each]}</p>
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
