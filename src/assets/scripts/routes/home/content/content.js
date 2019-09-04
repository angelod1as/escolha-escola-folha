import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import List from './list/index';
import School from './school/index';

const Wrapper = styled.div`
	grid-area: content;
	margin-top: 20px;
`;

const Content = ({ showSchool }) => (
	<Wrapper>
		{/* TODO name filter!! */}
		{showSchool === ''
			? <List />
			: <School />
		}
	</Wrapper>
);

Content.propTypes = {
	showSchool: PropTypes.string.isRequired,
};

export default Content;
