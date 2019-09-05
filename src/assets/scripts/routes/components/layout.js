import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import bp from './breakpoints';

import theme from './theme';

const Wrapper = styled.div`
	min-height:100%;
	position:relative;
	* {
		box-sizing: border-box;
    -webkit-font-smoothing: antialiased
	}
	font-size: 18px;
	font-family: ${p => p.theme.font.display};
`;

const Layout = styled.div`
	width: 100%;
	max-width: 1920px;
	max-width: ${p => p.theme.width.max};
	margin: 30px auto;
	display: grid;
	grid-gap: 5px;
	grid-template-columns: 255px auto auto auto;
	grid-template-rows: auto minmax(35px,auto) auto auto;
	grid-template-areas:
		"f-state f-city f-city f-zone"
		". f-cities f-cities f-zones"
		". f-name f-name f-name"
		"f-sidebar content content content";

	@media ${bp.medium} {
		grid-template-columns: 200px auto auto;
		grid-gap: 10px 5px;
		grid-template-areas:
		"f-state f-state f-state"
		"f-city f-city f-city"
		"f-zone f-zone f-zone"
		"f-cities f-cities f-zones"
		"f-name f-name f-name"
		"f-sidebar content content";
	}

	@media ${bp.small} {
		grid-template-columns: 100%;
		grid-template-areas:
		"f-state"
		"f-city"
		"f-cities"
		"f-zone"
		"f-zones"
		"f-name"
		"f-sidebar"
		"content";
	}
`;

const LayoutWrapper = ({ children }) => (
	<ThemeProvider theme={theme}>
		<Wrapper>
			<Layout>
				{children}
			</Layout>
		</Wrapper>
	</ThemeProvider>
);

LayoutWrapper.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default LayoutWrapper;
