import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v1';

const Wrapper = styled.div`
	margin-top: 20px;
	grid-area: f-sidebar;
	/* display: grid; */
	/* grid-template-columns: 30px 1fr;
	grid-template-areas:
		"f-s-toggle f-s-filters"; */
`;

const Section = styled.div`
	margin-bottom: 20px;
`;

const Buttons = styled.div`
	margin-left: 40px;
`;

const H3 = styled.h3`
	text-transform: uppercase;
	font-weight: 500;
	font-size: .9em;
	margin-top: 40px;
`;

const Checkbox = styled.label`
	input {
		display: none;
	}
	span {
		user-select: none;
		display: block;
		background-color: ${p => p.theme.color.gray2};
		color: ${p => p.theme.color.white};
		font-weight: 500;
		width: 90%;
		padding: 8px;
		margin: 5px 0;
		border-radius: 5px;
		&:hover {
			opacity: .8;
		}
	}
	input:checked + span {
		background-color: ${p => p.theme.color.color};
	}
`;

const Toggle = styled.label`
	input {
		display: none;
	}
	span {
		user-select: none;
		display: block;
		color: ${p => p.theme.color.gray};
		padding-left: 40px;
		position: relative;
		&:before{
			content: '';
			position: absolute;
			bottom: 6px;
			left: 0;
			border: 1px solid transparent;
			border-radius: 50px;
			width: 25px;
			height: 13px;
			background-color: ${p => p.theme.color.gray2}
		}
		&:after{
			content: '';
			position: absolute;
			bottom: 5px;
			left: 0;
			border: 1px solid ${p => p.theme.color.gray2};
			border-radius: 50%;
			width: 15px;
			height: 15px;
			background-color: white;
		}
		&:hover {
			opacity: .8;
		}
	}
	input:checked + span {
		&:before {
			background-color: ${p => p.theme.color.color};
		}
		&:after {
			left: 10px;
			border-color: ${p => p.theme.color.color};
		}
	}
`;

const Sidebar = () => {
	const toggles = [
		[
			['Ensino Fundamental', 'fundamental', false],
			['Ensino Médio', 'medio', false],
		],
		[
			['Particular', 'particular', false],
			['Pública', 'publica', false],
		],
		[
			['Escola urbana', 'urbana', false],
			['Escola rural', 'rural', false],
		],
	];

	const buttons = [
		'Infraestrutura',
		['Necessidades especiais', 'necessidades', false],
		['Biblioteca', 'biblioteca', false],
		['Laboratório de ciência', 'laboratorio', false],
		['Laboratório de informática', 'informatica', false],
		['Quadra poliesportiva', 'quadra', false],
		'Ensino de idiomas',
		['Espanhol', 'espanhol', false],
		['Francês', 'francês', false],
		['Inglês', 'inglês', false],
	];
	return (
		<Wrapper>
			{toggles.map(group => (
				<Section key={uuid()}>
					{group.map(item => (
						<Toggle htmlFor={item[1]} key={uuid()}>
							<input type="checkbox" id={item[1]} name={item[1]} value={item[2]} />
							<span>{item[0]}</span>
						</Toggle>
					))}
				</Section>
			))}

			<Buttons>
				{buttons.map(each => (typeof each === 'string'
					? <H3 key={uuid()}>{each}</H3>
					: (
						<Checkbox htmlFor={each[1]} key={uuid()}>
							<input type="checkbox" id={each[1]} name={each[1]} value={each[2]} />
							<span>{each[0]}</span>
						</Checkbox>
					)))}
			</Buttons>
		</Wrapper>
	);
};

export default Sidebar;
