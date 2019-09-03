import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import List from './list/index';
import School from './school/school';

const Wrapper = styled.div`
	grid-area: content;
	margin-top: 20px;
`;

const Content = () => (
	<Wrapper>
		{/* TODO name filter!! */}
		<List />
		{/* <School /> */}
	</Wrapper>
);

const mapStateToProps = ({
	listSchools: { schoolList },
}) => ({
	schoolList,
});

export default connect(mapStateToProps)(Content);
