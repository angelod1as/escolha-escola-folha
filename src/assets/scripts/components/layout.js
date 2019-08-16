import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Layout = styled.div``;

const LayoutWrapper = ({ children }) => (<Layout>{children}</Layout>);

LayoutWrapper.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default LayoutWrapper;
