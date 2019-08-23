import React from 'react';
import uuid from 'uuid/v1';
import { ref } from '../../list/filters/refs';
import { upperAll } from '../../../components/upper';

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
		<div>
			<h3>Endereço</h3>
			<div>
				{content}
			</div>
		</div>
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
		lines.push(<p key={uuid()}>{addLine.join(', ')}</p>);
	}

	if (zone && zone > 1) lines.push(<p key={uuid()}>{`Zona ${ref.address.zone[1][zone]}`}</p>);
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
