import React from 'react';
import styled from 'styled-components';
//

const Wrapper = styled.div`
	grid-area: content;
`;

// import { Container } from './styles';

const Content = ({ state: { data: { schools } } }) => (
	<Wrapper>
		{schools.map(school => <div>ESCOLA</div>)}
	</Wrapper>
);

export default Content;
