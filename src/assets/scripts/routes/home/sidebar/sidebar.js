import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v1';

const Wrapper = styled.div`
	margin-top: 20px;
	grid-area: f-sidebar;
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

const Sidebar = ({ changeFilter, filterList }) => {
	const handleChange = (e) => {
		console.log(e);
	};

	const keys = Object
		.keys(filterList);

	const getElement = (element, data) => {
		if (element === 'toggle') {
			return data
				.map(section => (
					<Section key={uuid()}>
						{Object
							.keys(section)
							.map((item) => {
								const [name, value] = section[item];
								return (
									<Toggle htmlFor={item} key={uuid()}>
										<input type="checkbox" id={item} name={item} value={value} onChange={handleChange} />
										<span>{name}</span>
									</Toggle>
								);
							})}
					</Section>
				));
		}
		return (
			<Buttons>
				<H3>{element === 'infraestrutura' ? 'Infraestrutura' : 'Ensino de idiomas'}</H3>
				{Object.keys(data)
					.map((item) => {
						const [name, value] = data[item];
						return (
							<Checkbox htmlFor={item} key={uuid()}>
								<input type="checkbox" id={item} name={item} value={value} onChange={handleChange} />
								<span>{name}</span>
							</Checkbox>
						);
					})
				}
			</Buttons>
		);
	};


	const types = keys.map(element => (
		<div key={uuid()}>
			{getElement(element, filterList[element])}
		</div>
	));

	return (
		<Wrapper>
			{types}
		</Wrapper>
	);
};

export default Sidebar;
