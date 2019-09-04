import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const StyledReactTooltip = styled(ReactTooltip)`
	max-width: 400px;
`;

const Name = styled.h2`
	font-size: 1.5em;
	font-weight: 700;
	text-transform: uppercase;
`;
const Infos = styled.p`
	margin: 0;
	padding: 0;
	font-size: .9em;
`;
const Holder = styled.div`
	margin: 40px 0;
	display: grid;
	grid-template-columns: 1fr 1fr;
`;
const H3 = styled.h3`
	font-weight: 600;
`;
const List = styled.ul``;
const Li = styled.li`
	line-height: 1.4em;
	padding-left: 10px;
	position: relative;
	color: ${p => (p.disabled ? p.theme.color.gray2 : p.theme.color.black)};
	&:before {
		content: '•';
		position: absolute;
		top: 0;
		left: -1px;
	}
`;

const Bars = styled.div`
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

const Contact = styled.div`
	margin: 40px 0;
	p {
		font-size: .9em;
		color: ${p => p.theme.color.gray}
	}
`;

const Back = styled.button`
		user-select: none;
		font-family: ${p => p.theme.font.display};
		font-size: .9em;
		font-weight: 500;
		text-align: left;
		background-color: ${p => p.theme.color.color};
		color: ${p => p.theme.color.white};
		min-width: 250px;
		padding: 8px;
		margin: 5px 0;
		border-radius: 5px;
		&:hover {
			opacity: .8;
		}
`;

const School = ({ cleanSchool, fetchSchool, code }) => {
	console.log('school');
	return (
		<>
			<StyledReactTooltip
				type="light"
				place="right"
				// effect="solid"
				border
				clickable
				className="tooltip"
			/>
			<Name>CANDIDO GONÇALVES GOMIDE PROFESSOR</Name>
			<Infos>Escola municipal urbana • ensino fundamental</Infos>

			<Holder>
				<div>
					<H3>Infraestrutura</H3>
					<List>
						<Li>Necessidades especiais</Li>
						<Li disabled>Biblioteca</Li>
						<Li disabled>Internet</Li>
						<Li disabled>Laboratório de ciências</Li>
						<Li>Laboratório de informática</Li>
						<Li disabled>Quadra poliesportiva</Li>
					</List>
				</div>
				<div>
					<H3>Idiomas</H3>
					<List>
						<Li>Espanhol</Li>
						<Li disabled>Francês</Li>
						<Li disabled>Inglês</Li>
					</List>
				</div>
			</Holder>

			<Bars>

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
			</Bars>

			<Contact>
				<H3>Contato</H3>
				<p>Avenida Feiz Zarzur Comendador, SN, CEP 2942000</p>
				<p>Jardim Cidade Pirituba São Paulo, SP, zona norte</p>
				<p>emefleopoldina@prefeitura.sp.gov.br • 11 39720076 • 11 39793610</p>
			</Contact>

			<Back onClick={() => cleanSchool()}>Voltar</Back>
		</>
	);
};

export default School;
