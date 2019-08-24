import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import GlobalStyle from './global-style';

const theme = {
	color: {
		color: '#0078A4',
		lighter: '#4CA5C5',
		red: '#E51717',
		white: '#F4F4F4',
		black: '#333333',
		gray: '#757575',
		gray2: '#bdbdbd',
		gray3: '#e0e0e0',
		gray4: '#f5f5f5',
		yellow: '#F3BD00',
		green: '#93c9a8',
		darkgray: '#A9A9A9',
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
	padding: 0 5px;
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
