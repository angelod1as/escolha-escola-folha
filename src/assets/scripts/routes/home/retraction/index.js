import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { render } from 'pug';

const RetractionWrapper = styled.div`
	grid-area: retraction;
	margin-top: 20px;
`;

export default class Retraction extends React.Component {
	render() {
		return (
			<RetractionWrapper className="retraction">
				<h6 className="retraction__title">Erramos</h6>
				<time dateTime="2019-11-19 10:52:00" className="retraction__modified-date">19.nov.2019 - 10h52</time>
				<p>Ao contrário do publicado na Homepage, o Buscador Escolha a Escola não possui dados de mensalidades das escolas.</p>
			</RetractionWrapper>
		);
	}
}
