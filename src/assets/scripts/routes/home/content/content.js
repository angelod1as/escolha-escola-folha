import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import List from './list/index';
import School from './school/index';

const Wrapper = styled.div`
	grid-area: content;
	margin-top: 20px;
`;

const Content = ({ schoolData }) => (
	<Wrapper>
		{Object.keys(schoolData.data).length <= 0
			? <List />
			: <School />
		}
	</Wrapper>
);

Content.propTypes = {
	schoolData: PropTypes.shape().isRequired,
};

export default Content;
