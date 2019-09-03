import styled from 'styled-components';

export const Select = styled.select`
	font-family: ${p => p.theme.font.display};
	font-weight: 300;
	text-align: center;
	pointer-events: ${p => (p.disabled ? 'none' : 'initial')};

	color: ${p => (p.disabled ? p.theme.color.gray3 : p.theme.color.black)};
	text-transform: ${p => (p.disabled ? 'initial' : 'uppercase')};
	font-style: italic;

	width: 100%;
	border: 1px solid ${p => (p.disabled ? p.theme.color.gray3 : p.theme.color.black)};
	border-radius: 3px;
	padding: 5px 10px;
	font-size: .9em;
`;

export const CleanA = styled.a`
	color: ${p => p.theme.color.black};
	cursor: pointer;
	&:hover {
		opacity: 1;
	}
`;

// OLD

export const P = styled.p`
	font-family: ${p => p.theme.font.text};
	font-weight: 300;
	font-size: 20px;
	line-height: 1.5em;
	padding: 10px 0;
	margin: 0 auto;
	-webkit-font-smoothing: antialiased;
`;

export const A = styled.a`
	font-family: ${p => p.theme.font.text};
	font-weight: 300;
	font-size: 20px;
	line-height: 1.5em;
	padding: 10px 0;
	margin: 0 auto;
	-webkit-font-smoothing: antialiased;
	cursor: pointer;
	display: inline-block;
	color: ${p => p.theme.color.color};
	transition: color .2s, transform .2s;
	text-decoration: none;
	&:hover {
		color: ${p => p.theme.color.black};
	}
`;

export const Li = styled(P)`
	padding-left: 25px;
	position: relative;
	line-height: 1.2em;
	&:before {
		font-weight: 700;
		top: 11px;
		left: 2px;
		position: absolute;
		color: ${p => p.theme.color.color};
	}
`;

export const Ul = styled.ul`
	li {
		&:before {
			content: '\\2714';
		}
	}
`;

export const Ol = styled.ol`
	li {
		counter-increment: step-counter;
		&:before {
			content: counter(step-counter) '.';
		}
	}
`;

export const H1 = styled(P)`
	font-family: ${p => p.theme.font.title};
	font-weight: 800;
	font-size: 3em;
`;
export const H2 = styled(P)`
	font-family: ${p => p.theme.font.display};
	font-weight: 700;
	font-size: 2em;
`;
export const H3 = styled(H2)`
	font-size: 1.2em;
`;
export const H4 = styled(H2)`
	font-size: 1em;
	font-weight: 300;
`;


export const Figcaption = styled(P)``;