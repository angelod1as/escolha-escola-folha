import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import GlobalStyle from './global-style';

const theme = {
	color: {
		color: 'red',
		white: '#F4F4F4',
		black: '#333333',
		gray: '#CCCCCC',
		darkgray: '#A9A9A9',
		bg: '#140000',
	},
	font: {
		title: 'FolhaII, Folha II, Georgia, serif',
		display: 'Folha Grafico,Helvetica Neue,Helvetica,Arial,sans-serif',
		text: 'Folha Texto,Georgia,Times New Roman,serif;',
	},
	width: {
		full: '100%',
		max: '1000px',
		width: '630px',
	},
};

const Layout = styled.div`
	max-width: 920px;
	margin: 30px auto;
`;

const LayoutWrapper = ({ children }) => (
	<ThemeProvider theme={theme}>
		<>
			<GlobalStyle />
			<Layout>
				{children}
			</Layout>
		</>
	</ThemeProvider>
);

LayoutWrapper.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default LayoutWrapper;
