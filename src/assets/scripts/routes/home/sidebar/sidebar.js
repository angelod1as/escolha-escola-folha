import React from 'react';
import styled from 'styled-components';
import Toggle from 'react-toggle';
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

const ToggleHolder = styled.div`
	label {
		display: grid;
		grid-template-columns: 30px 1fr;
		grid-gap: 10px;
		grid-template-areas:
		"f-s-toggle f-s-filters";
	}
	.react-toggle {
	grid-area: f-s-toggle;
  touch-action: pan-x;

  display: block;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 0;
	margin-top: 5px;

  user-select: none;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
}

.react-toggle-screenreader-only {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.react-toggle--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.react-toggle-track {
  width: 24px;
  height: 14px;
  padding: 0;
  border-radius: 30px;
  background-color: ${p => p.theme.color.gray};
}

.react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
  background-color: ${p => p.theme.color.black};
}

.react-toggle--checked .react-toggle-track {
  background-color: ${p => p.theme.color.color};
}

.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
  background-color: ${p => p.theme.color.lighter};
}

.react-toggle-thumb {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 14px;
  height: 14px;
  border: 1px solid #4D4D4D;
  border-radius: 50%;
  background-color: #FAFAFA;

  box-sizing: border-box;

}

.react-toggle--checked .react-toggle-thumb {
  left: 10px;
  border-color: #19AB27;
}

.react-toggle--focus .react-toggle-thumb {
  box-shadow: 0px 0px 1px 1px #0099E0;
}

.react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
  box-shadow: 0px 0px 2px 2px #0099E0;
}
`;

const Span = styled.span`
	grid-area: f-s-filters;
	font-size: .9em;
	color: ${p => p.theme.color.gray};
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
						<ToggleHolder key={uuid()}>
							<label htmlFor={item[1]}>
								<Toggle
									id={item[1]}
									defaultChecked={item[2]}
									icons={false}
									onChange={() => console.log('oi')}
								/>
								<Span>{item[0]}</Span>
							</label>
						</ToggleHolder>
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
