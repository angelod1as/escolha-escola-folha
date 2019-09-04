import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Overlay = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background-color: white;
	opacity: 0.7;
	z-index: 30;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Svg = styled.svg`
	width: 70px;
	height: 70px;
	path {
		fill: ${p => p.theme.color.color};
	}
`;

const Loading = ({ isLoading }) => (
	<>
		{isLoading
			? (
				<Overlay>
					<Svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace="preserve">
						<path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
							<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite" />
						</path>
					</Svg>
				</Overlay>
			)
			: ''
		}
	</>
);

Loading.propTypes = {
	isLoading: PropTypes.bool.isRequired,
};

export default Loading;
