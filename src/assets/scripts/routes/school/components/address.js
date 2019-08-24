import React from 'react';
import uuid from 'uuid/v1';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { ref } from '../../../components/refs';
import { upperAll } from '../../../components/upper';

export const Wrapper = styled.div`
	span {
		&:last-child {
			margin-left: 30px;
		}
	}
`;


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
			<h3>Endereço</h3>
			<Fade cascade>
				<div>
					{content}
				</div>
			</Fade>
		</Wrapper>
	);

	if (address || compl || cep || district) {
		const addLine = [];
		if (address) {
			if (address.includes(addressType)) {
				addLine.push(upperAll(address));
			} else {
				addLine.push(`${upperAll(addressType)} ${upperAll(address)}`);
			}
		}
		if (compl) addLine.push(`${compl}`);
		if (cep) addLine.push(`CEP ${cep}`);
		if (district) addLine.push(`${upperAll(district)}`);
		lines.push(<p key={uuid()}>{addLine.join(', ')}</p>);
	}

	if (city || uf) {
		const addLine = [];
		if (city) addLine.push(upperAll(city));
		if (uf) addLine.push(uf);
		if (zone && zone > 1) addLine.push(`zona ${ref.address.zone[1][zone].toLowerCase()}`);
		lines.push(<p key={uuid()}>{addLine.join(', ')}</p>);
	}

	if (email) lines.push(<p key={uuid()}>{email.toLowerCase()}</p>);
	if (phone.phones.length > 0) {
		const ph = phone.phones
			.filter(each => typeof each === 'number' || typeof each === 'string')
			.map(each => <span key={uuid()}>{`${phone.DDD} ${each}`}</span>);
		if (ph.length > 0) lines.push(<p key={uuid()}>{ph}</p>);
	}

	return wrapper(lines);
};

export default Address;
