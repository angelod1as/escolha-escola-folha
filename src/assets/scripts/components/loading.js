import React from 'react';

// import { Container } from './styles';

const Loading = ({ loading, children }) => {
	if (loading === 0) {
		return null;
	}
	if (loading === 1) {
		return <div>Carregando</div>;
	}
	return children;
};

export default Loading;
