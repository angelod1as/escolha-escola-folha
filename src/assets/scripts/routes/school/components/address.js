import React from 'react';
import uuid from 'uuid/v1';
import styled from 'styled-components';

import { H3, P } from '../../../components/styles';
import { ref } from '../../../components/refs';
import { upperAll } from '../../../components/upper';

const Wrapper = styled.div``;

const Span = styled.span`
	&:last-child {
		margin-left: 30px;
	}
`;

const ThisP = styled(P)``;

const Address = ({ data }) => {
	const {
		address,
		cep,
		city,
		compl,
		district,
		email,
		phone,
		uf,
		zone,
	} = data;
	const addressType = data.address_type;

	const lines = [];

	const wrapper = content => (
		<Wrapper>
			<H3 as="h3">Endereço</H3>
			<div>
				{content}
			</div>
		</Wrapper>
	);

	if (address || compl || cep || district) {
		const addLine = [];
		if (address) {
			if (address.includes(addressType)) {
				addLine.push(upperAll(address));
			} else {
				addLine.push(upperAll(`${addressType} ${address}`));
			}
		}
		if (compl) addLine.push(compl);
		if (cep) addLine.push(`CEP ${cep}`);
		if (district) addLine.push(upperAll(district));
		lines.push(<ThisP key={uuid()}>{addLine.join(', ')}</ThisP>);
	}

	if (city || uf) {
		const addLine = [];
		if (city) addLine.push(upperAll(city));
		if (uf) addLine.push(uf);
		if (zone && zone > 1) {
			const term = ref.address.zone[1][zone - 1].toLowerCase() === 'centro' ? '' : 'zona ';
			addLine.push((`${term}${ref.address.zone[1][zone - 1]}`).toLowerCase());
		}
		lines.push(<ThisP key={uuid()}>{addLine.join(', ')}</ThisP>);
	}

	if (email) lines.push(<ThisP key={uuid()}>{email}</ThisP>);
	if (phone.phones.length > 0) {
		const ph = phone.phones
			.filter(each => typeof each === 'number' || typeof each === 'string')
			.map(each => <Span key={uuid()}>{`${phone.DDD} ${each}`}</Span>);
		if (ph.length > 0) lines.push(<ThisP key={uuid()}>{ph}</ThisP>);
	}

	return wrapper(lines);
};

export default Address;
