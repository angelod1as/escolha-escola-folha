import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  /* reset and normalize */
  ${reset}
  ${normalize}

  /* gatsby 100% */
  div[role="group"][tabindex] {
    height: 100%;
  }
  html, body, #___gatsby {
    height: 100%;
  }

  body {
    font-family: ${p => p.theme.font.text};
    -webkit-font-smoothing: antialiased;
		font-size: 20px;
  }

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased
  }

  p, a, li, h1, h2, h3, h4, figcaption {
		font-family: ${p => p.theme.font.text};
    font-weight: 300;
    font-size: 20px;
    line-height: 1.5em;
    padding: 10px 0;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased
  }

	h1 {
		font-family: ${p => p.theme.font.title};
		font-weight: 800;
	}

	h2, h3, h4 {
		font-family: ${p => p.theme.font.display};
    font-weight: 700;
	}

  h1 {
    font-size: 3em;
  }

  h2 {
    font-size: 2em;
  }

	h3 {
    font-size: 1.2em;
  }

	h4, legend {
		font-size: 1em;
		font-weight: 300;
	}

  img, figure {
    width: 100%;
    height: auto;
    display: block;
  }

  a {
    cursor: pointer;
    display: inline-block;
    color: ${p => p.theme.color.color};
    transition: color .2s, transform .2s;
    text-decoration: none;
    &:hover {
      color: ${p => p.theme.color.black};
    }
  }

  svg {
    pointer-events: none;
    & > * {
      pointer-events: none;
    }
  }
`;

export default GlobalStyle;
