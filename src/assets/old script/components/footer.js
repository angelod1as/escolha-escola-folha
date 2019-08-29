import React from 'react';
import styled from 'styled-components';

export const StyledFooter = styled.footer`
	margin: 100px 0 30px 0;
	width: 100%;
	font-family: ${p => p.theme.font.display};
	font-size: .9em;
	text-align: center;
	color: ${p => p.theme.color.darkgray};
`;

// import { Container } from './styles';

const Footer = () => (
	<StyledFooter>
		Informações gerais do Footer
	</StyledFooter>
);

export default Footer;
