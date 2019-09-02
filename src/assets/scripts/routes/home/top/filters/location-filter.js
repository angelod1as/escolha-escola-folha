import React from 'react';
import styled from 'styled-components';
import Reactotron from 'reactotron-react-js';

// Redux
import { connect } from 'react-redux';
import { fetchCityList } from '../../../../redux/actions/index';

import Autosuggest from '../../../components/autosuggest';

const Uf = styled.div`
	grid-area: f-state;
	`;
// const City = styled.div`
// 	grid-area: f-city;
// 	grid-column-end: 4;
// `;
// const Zone = styled.div`
// 	grid-area: f-zone;
// `;

const LocationFilters = ({ ufList }) => {
	const handleChange = (e) => {
		Reactotron.log('HANDLE CHANGE');
		fetchCityList(e);
	};

	return (
		<>
			<Uf>
				<Autosuggest
					placeholder="Digite o estado"
					handleChange={handleChange}
					data={ufList}
					type="uf"
					// initial={uf}
					enabled
				/>
			</Uf>
		</>
	);
};

const mapDispatchToProps = {
	fetchCityList,
};

const mapStateToProps = ({ config: { ufList } }) => ({ ufList });

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LocationFilters);
