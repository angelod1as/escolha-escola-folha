import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import ref, { avgRefs } from '../../../../../utils/refs';

const H3 = styled.h3`
	font-weight: 600;
`;

const H4 = styled.h4`
	font-weight: 600;
`;

const AllBars = styled.div`
	margin: 40px 0;
`;
const TitleHolder = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 30px 0 10px 0;
`;

const Indicator = styled.div`
	color: ${p => p.theme.color.gray};
	font-size: .9em;
	position: relative;
	& > div {
		height: 14px;
		left: -10px;
		top: 5px;
		bottom: initial;
	}
`;

const BarHolder = styled.div`
	display: grid;
	grid-template-columns: 200px 50px auto 40px;
	grid-gap: 5px;
	font-size: .9em;
	margin: 5px 0;
`;
const Item = styled.p`
	position: relative;
	${p => (p['data-tip']
		?	`&:after {
		content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDE1IDE1Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojMDA3OGE0O308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTkuNjY3LDE1LjVoMS42NjdWMTMuODMzSDkuNjY3VjE1LjVtLjgzMy0xMEEzLjMzMywzLjMzMywwLDAsMCw3LjE2Nyw4LjgzM0g4LjgzM2ExLjY2NywxLjY2NywwLDEsMSwzLjMzMywwYzAsMS42NjctMi41LDEuNDU4LTIuNSw0LjE2N2gxLjY2N2MwLTEuODc1LDIuNS0yLjA4MywyLjUtNC4xNjdBMy4zMzMsMy4zMzMsMCwwLDAsMTAuNSw1LjVNNC42NjcsM0gxNi4zMzNBMS42NjcsMS42NjcsMCwwLDEsMTgsNC42NjdWMTYuMzMzQTEuNjY3LDEuNjY3LDAsMCwxLDE2LjMzMywxOEg0LjY2N0ExLjY2NywxLjY2NywwLDAsMSwzLDE2LjMzM1Y0LjY2N0ExLjY2NywxLjY2NywwLDAsMSw0LjY2NywzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMgLTMpIi8+PC9zdmc+");
		margin-left: 5px;
	}`
		: '')
}
`;
const Number = styled.div`
	color: ${p => p.theme.color.color};
	font-weight: bold;
	justify-self: end;
`;
const Bar = styled.div`
	margin-top: 2px;
	height: 15px;
	width: 100%;
	border-bottom: 1px solid ${p => p.theme.color.gray2};
	position: relative;
`;
const Grade = styled.div`
	position: absolute;
	top: 3px;
	left: 0;
	width: ${p => p.num}%;
	height: 10px;
	background-color: ${p => p.theme.color.color};
`;
const Marker = styled.div`
	position: absolute;
	left: ${p => p.num}%;
	bottom: 0;
	height: 100%;
	width: 4px;
	background-color: ${p => p.theme.color.black};
	border: 1px solid white;
`;
const Total = styled.div`
	justify-self: end;
`;

const Bars = ({ avg, cityAvg, type }) => {
	const pub = type === 1 ? 'private' : 'public';
	const tips = {
		lp: '',
		mt: '',
		quiz: '',
		essay: '',
		students: '',
		age_distortion_rate: 'A distorção idade-série é a proporção de alunos com mais de 2 anos de atraso escolar. No Brasil, a criança deve ingressar no 1º ano do ensino fundamental aos 6 anos de idade, permanecendo no Ensino Fundamental até o 9º ano, com a expectativa de que conclua os estudos nesta modalidade até os 14 anos de idade.',
		hour_class: '',
		teacher_percent: '',
		approval_rate: '',
		reproval_rate: '',
		abandon_rate: '',
	};

	const fundamental = Object.keys(avg.fundamental)
		.filter(each => avg.fundamental[each] !== '')
		.map(each => [
			ref.avg[each][0],
			avg.fundamental[each],
			cityAvg[pub].fundamental[each],
			tips[each],
		]);

	const medio = Object.keys(avg.medio)
		.filter(each => avg.medio[each] !== '')
		.map(each => [ref.avg[each][0],
			avg.medio[each],
			cityAvg[pub].medio[each],
			tips[each],
		]);

	const enem = Object.keys(avg.enem)
		.filter(each => avg.enem[each] !== '')
		.map(each => [ref.avg.enem[each][0],
			avg.enem[each],
			cityAvg[pub].enem[each],
			tips[each],
		]);

	const saeb = [];
	Object.keys(avg.saeb)
		.filter((each) => {
			const res = Object.keys(avg.saeb[each])
				.filter(saebEach => avg.saeb[each][saebEach] !== '')
				.map(saebEach => [avg.saeb[each][saebEach],
					cityAvg.saeb[each][saebEach],
					tips[saebEach],
				]);
			if (res.length > 0) {
				saeb.push([each, res]);
			}
			return null;
		});
	const all = [];


	if (medio.length > 0) all.push(['Ensino médio', medio]);
	if (fundamental.length > 0) all.push(['Ensino fundamental', fundamental]);
	if (enem.length > 0) all.push(['Enem', enem]);
	if (saeb.length > 0) all.push(['Saeb', saeb]);

	return (
		<AllBars>

			{all.map((each) => {
				if (each[0] === 'Saeb') {
					return (
						<>
							<TitleHolder key={uuid()}>
								<H3>{each[0]}</H3>
								<Indicator>
									<Marker />
									Média municipal
								</Indicator>
							</TitleHolder>

							{each[1].map(eachSaeb => (
								<>
									<H4>{avgRefs[eachSaeb[0]]}</H4>
									{eachSaeb[1].map((saebNum, i) => {
										const schoolVal = saebNum[0] === undefined ? saebNum[0] : +saebNum[0].toFixed(2);
										const cityVal = saebNum[1] === undefined ? saebNum[1] : +saebNum[1].toFixed(2);
										return (
											<BarHolder>
												<Item data-tip={saebNum[3] !== '' ? saebNum[3] : null}>{i === 0 ? 'Português' : 'Matemática'}</Item>
												<Number>{schoolVal}</Number>
												<Bar>
													<Grade num={schoolVal / 10} />
													<Marker num={cityVal / 10} />
												</Bar>
												<Total>
													{cityVal === undefined ? 'N/D' : cityVal}
												</Total>
											</BarHolder>
										);
									})}
								</>
							))}
						</>
					);
				}
				return (
					<>
						<TitleHolder key={uuid()}>
							<H3>{each[0]}</H3>
							<Indicator>
								<Marker />
									Média municipal
							</Indicator>
						</TitleHolder>

						{each[1].map((bar) => {
							const percent = bar[0].includes('%');
							const title = percent ? bar[0].replace('%', '') : bar[0];
							const schoolVal = bar[1] === undefined ? bar[1] : +bar[1].toFixed(2);
							const cityVal = bar[2] === undefined ? bar[2] : +bar[2].toFixed(2);
							const enemSchool = bar[1] / 10;
							const enemCity = bar[2] / 10;

							const isEnem = each[0].toLowerCase().includes('enem');

							return (
								<BarHolder>
									<Item data-tip={bar[3] !== '' ? bar[3] : null}>{title}</Item>
									<Number>{`${schoolVal}${percent ? '%' : ''}`}</Number>
									<Bar>
										<Grade num={isEnem ? enemSchool : schoolVal} />
										<Marker hidden={cityVal === undefined} num={isEnem ? enemCity : cityVal} />
									</Bar>
									<Total>
										{`${cityVal === undefined ? 'N/D' : `${cityVal}${percent ? '%' : ''}`}`}
									</Total>
								</BarHolder>
							);
						})}
					</>
				);
			})}

		</AllBars>
	);
};

Bars.propTypes = {
	avg: PropTypes.shape().isRequired,
	cityAvg: PropTypes.shape().isRequired,
	type: PropTypes.string.isRequired,
};

export default Bars;
