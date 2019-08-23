import React from 'react';
import styled from 'styled-components';

// import { Container } from './styles';

const AvgBar = ({ school, avg, percent }) => {
	const limit = Math.max(school, avg);
	const height = 20;
	const max = 80;
	const isBigger = avg > school;

	const lower = (avg * max) / limit;

	const upper = (school * max) / limit;
	const upperHeight = height / 3;
	const upperTop = (height / 2) - (upperHeight / 2);

	const Limit = styled.div`
		margin: 10px 0 25px;
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
			content: '${school}${percent ? '%' : ''}';
			position: absolute;
			top: 0px;
			left: calc(100% + 10px);
			color: ${p => p.theme.color.color};
		}
	`;

	const LowerBar = styled.div`
		border-right: 1px solid ${p => p.theme.color.gray};
		width: ${lower}%;
		height: ${height}px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -3;
		&:after{
			content: '${avg}${percent ? '%' : ''}';
			position: absolute;
			top: ${height + 3}px;
			${() => (isBigger ? 'left: calc(100% + 10px); top: 0;' : 'right: 0')}
			color: ${p => p.theme.color.darkgray};
		}
	`;

	const Lower = styled.div`
		background-color: ${p => p.theme.color.gray};
		/* background-color: rgba(0,0,0,.5); */
		width: ${lower}%;
		height: ${height}px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -4;
`;

	return (
		<div>
			<Limit>
				<Holder>
					<UpperBar />
					<LowerBar />
					<Lower />
					<Upper />
				</Holder>
			</Limit>
		</div>
	);
};

export default AvgBar;
