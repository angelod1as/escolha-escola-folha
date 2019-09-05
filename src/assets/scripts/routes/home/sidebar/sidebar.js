import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import bp from '../../components/breakpoints';

const Wrapper = styled.div`
	margin-top: 20px;
	grid-area: f-sidebar;
`;

const Section = styled.div`
	margin-bottom: 20px;
`;

const Buttons = styled.div`
	margin-left: 40px;
	@media ${bp.medium} {
		margin-left: 0;
	}
`;

const H3 = styled.h3`
	text-transform: uppercase;
	font-weight: 500;
	font-size: .9em;
	margin-top: 40px;
	color: ${p => (p.disabled ? p.theme.color.gray3 : 'initial')};
`;

const Checkbox = styled.label`
	cursor: pointer;
	input {
		display: none;
	}
	span {
		user-select: none;
		display: block;
		background-color: ${p => (p.disabled ? p.theme.color.gray3 : p.theme.color.gray2)};
		pointer-events: ${p => (p.disabled ? 'none' : 'initial')};
		color: ${p => p.theme.color.white};
		font-weight: 500;
		width: 90%;
		@media ${bp.medium} {
			width: 100%;
		}
		padding: 8px;
		margin: 5px 0;
		border-radius: 5px;
		&:hover {
			opacity: ${p => (p.disabled ? 1 : 0.8)};
		}
	}
	input:checked + span {
		background-color: ${p => p.theme.color.color};
	}
`;

const Toggle = styled.label`
	cursor: pointer;
	input {
		display: none;
	}
	span {
		user-select: none;
		display: block;
		color: ${p => (p.disabled ? p.theme.color.gray3 : p.theme.color.gray)};
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

const Sidebar = ({ changeFilter, filterList, schoolList }) => {
	const disabled = Object.keys(schoolList).length <= 0;
	const handleChange = (e) => {
		const [categ, name, id] = e.target.dataset.path.split('-');
		changeFilter({ categ, name, id });
	};

	const keys = Object
		.keys(filterList);

	const getElement = (element, data) => {
		if (element === 'toggle') {
			return data
				.map((section, i) => (
					<Section
						key={uuid()}
						disabled={disabled}
					>
						{Object
							.keys(section)
							.map((item) => {
								const [name, value] = section[item];
								return (
									<Toggle
										htmlFor={item}
										key={uuid()}
										disabled={disabled}
									>
										<input
											type="checkbox"
											id={item}
											name={item}
											checked={value}
											onChange={disabled ? () => null : handleChange}
											data-path={`${element}-${item}-${i}`}
										/>
										<span>{name}</span>
									</Toggle>
								);
							})}
					</Section>
				));
		}

		const sortBtns = (a, b) => {
			if (a[0] < b[0]) return -1;
			if (a[0] > b[0]) return 1;
			return 0;
		};

		const check = Object.keys(data)
			.map((item) => {
				const [name, value] = data[item];
				return [name, (
					<Checkbox
						htmlFor={item}
						key={uuid()}
						disabled={disabled}
					>
						<input
							type="checkbox"
							id={item}
							name={item}
							checked={value}
							onChange={disabled ? () => null : handleChange}
							data-path={`${element}-${item}`}
						/>
						<span>{name}</span>
					</Checkbox>
				)];
			})
			.sort(sortBtns)
			.map(each => each[1]);

		return (
			<Buttons disabled={disabled}>
				<H3 disabled={disabled}>{element === 'infraestrutura' ? 'Infraestrutura' : 'Ensino de idiomas'}</H3>
				{check}
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

Sidebar.propTypes = {
	changeFilter: PropTypes.func.isRequired,
	filterList: PropTypes.shape().isRequired,
	schoolList: PropTypes.shape().isRequired,
};

export default Sidebar;
