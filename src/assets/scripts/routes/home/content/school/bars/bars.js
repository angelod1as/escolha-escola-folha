import React from 'react';
import styled from 'styled-components';

const H3 = styled.h3`
	font-weight: 600;
`;

const AllBars = styled.div`
	margin: 40px 0;
`;
const TitleHolder = styled.div`
	display: flex;
	justify-content: space-between;
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


// import { Container } from './styles';

const Bars = () => (
	<AllBars>

		<TitleHolder>
			<H3>Ensino Médio</H3>
			<Indicator>
				<Marker />
					Média municipal
			</Indicator>
		</TitleHolder>

		<BarHolder>
			<Item>Média de alunos por turma</Item>
			<Number>80%</Number>
			<Bar>
				<Grade num={80} />
				<Marker num={50} />
			</Bar>
			<Total>
						100%
			</Total>
		</BarHolder>

		<BarHolder>
			<Item data-tip="A distorção idade-série é a proporção de alunos com mais de 2 anos de atraso escolar. No Brasil, a criança deve ingressar no 1º ano do ensino fundamental aos 6 anos de idade, permanecendo no Ensino Fundamental até o 9º ano, com a expectativa de que conclua os estudos nesta modalidade até os 14 anos de idade.">
						Média de alunos por turma
			</Item>
			<Number>80%</Number>
			<Bar>
				<Grade num={80} />
				<Marker num={50} />
			</Bar>
			<Total>
						100%
			</Total>
		</BarHolder>
	</AllBars>
);

export default Bars;
