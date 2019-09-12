import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import { upperAll } from '../../../../utils/upper';
import ref from '../../../../utils/refs';
import bp from '../../../components/breakpoints';

import Bars from './bars/index';

const StyledReactTooltip = styled(ReactTooltip)`
	max-width: 400px;
`;

const Underlay = styled.div`
	width: 100%;
	height: 100%;
	background-color: white;
	opacity: 0.7;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 19;
`;

const Overlay = styled.div`
	position: relative;
	z-index: 20;
`;

const Name = styled.h2`
	font-size: 1.5em;
	font-weight: 700;
	text-transform: uppercase;
`;
const Infos = styled.p`
	margin: 0;
	padding: 0;
	font-size: .9em;
`;
const Holder = styled.div`
	margin: 40px 0;
	display: grid;
	grid-template-columns: 1fr 1fr;
	@media ${bp.medium} {
		grid-template-columns: 100%;
	}
`;
const H3 = styled.h3`
	font-weight: 600;
`;
const List = styled.ul`
	@media ${bp.medium} {
		margin-bottom: 20px;
	}
`;
const Li = styled.li`
	line-height: 1.4em;
	padding-left: 10px;
	position: relative;
	color: ${p => (p.disabled ? p.theme.color.gray2 : p.theme.color.black)};
	&:before {
		content: '•';
		position: absolute;
		top: 0;
		left: -1px;
	}
`;

const Contact = styled.div`
	margin: 40px 0;
	p {
		font-size: .9em;
		color: ${p => p.theme.color.gray}
	}
`;

const Back = styled.button`
		user-select: none;
		font-family: ${p => p.theme.font.display};
		font-size: .9em;
		font-weight: 500;
		text-align: left;
		border: none;
		background-color: ${p => p.theme.color.color};
		color: ${p => p.theme.color.white};
		/* min-width: 150px; */
		padding: 8px;
		margin: 0 0 10px 0;
		border-radius: 5px;
		&:hover {
			opacity: .8;
		}
`;

const School = ({
	cleanSchool, cleanUrl, data,
}) => {
	const {
		name,
		public_private: publicPrivate,
		type,
		school_type: schoolType,
		address,
		utilities,
		languages,
	} = data;

	const handleClick = () => {
		cleanSchool();
		cleanUrl();
	};

	const infosArr = [[], []];

	if (publicPrivate) {
		if (publicPrivate === 1) {
			infosArr[0].push('Escola privada');
		} else if (type) {
			infosArr[0].push(`Escola ${ref.type[1][type].toLowerCase()}`);
		}
	}
	if (address.location) infosArr[0].push(ref.address.location[1][address.location].toLowerCase());
	if (schoolType.fundamental || +schoolType.fundamental === 2) infosArr[1].push('fundamental');
	if (schoolType.medio || +schoolType.medio === 2) infosArr[1].push('médio');
	if (infosArr[1].length > 0) infosArr[1] = ['Ensino', infosArr[1].join(' e ')];

	// Address array
	const addressArr = [[], [], []];

	// First address line
	if (address.address) {
		addressArr[0]
			.push(`${address.address.includes(address.address_type)
				? address.address
				: `${address.address_type} ${address.address}`}`);
	}
	if (address.compl) addressArr[0].push(address.compl);
	if (address.cep) addressArr[0].push(`CEP ${address.cep}`);

	// Second address line
	if (address.district) addressArr[1].push(address.district);
	if (address.city) addressArr[1].push(address.city);
	if (address.uf) addressArr[1].push(address.uf);
	// if (address.zone && +address.zone !== 1) addressArr[1].push(ref.address.zone[1][address.zone - 1]);

	// Third address line
	if (address.email) addressArr[2].push(address.email);
	if (address.phone) {
		const DDD = address.phone.DDD || '';
		const { phones } = address.phone;
		if (phones[0]) addressArr[2].push(`${DDD} ${phones[0]}`);
		if (phones[1]) addressArr[2].push(`${DDD} ${phones[1]}`);
	}

	const sortList = (a, b) => {
		if (a[2] < b[2]) return -1;
		if (a[2] > b[2]) return 1;
		return 0;
	};


	const infraList = Object
		.keys(utilities)
		.map(each => [each, utilities[each], ref.utilities[each][0]])
		.sort(sortList);

	const languageList = Object
		.keys(languages)
		.map(each => [each, languages[each], ref.languages[each][0]])
		.sort(sortList);

	return (
		<>
			<Overlay>
				<StyledReactTooltip
					type="light"
					place="right"
					// effect="solid"
					border
					clickable
					className="tooltip"
				/>
				<Back onClick={handleClick}>Voltar</Back>

				<Name>{upperAll(name)}</Name>
				<Infos>{[infosArr[0].join(' '), infosArr[1].join(' ')].join(' • ')}</Infos>

				<Holder>
					<div>
						<H3>Infraestrutura</H3>
						<List>
							{infraList.map(each => (
								<Li
									key={uuid()}
									disabled={+each[1] === 1}
								>
									{ref.utilities[each[0]][0]}
								</Li>
							))}
						</List>
					</div>
					<div>
						<H3>Idiomas</H3>
						<List>
							{languageList.map(each => (
								<Li
									key={uuid()}
									disabled={+each[1] === 1}
								>
									{ref.languages[each[0]][0]}

								</Li>
							))}
						</List>
					</div>
				</Holder>

				<Bars />

				<Contact>
					<H3>Contato</H3>
					{addressArr[0].length > 0 || addressArr[1].length > 0 || addressArr[2].length > 0
						? (
							<>
								{addressArr[0].length > 0 ? <p>{upperAll(addressArr[0].join(', '))}</p> : ''}
								{addressArr[1].length > 0 ? <p>{upperAll(addressArr[1].join(', '))}</p> : ''}
								{addressArr[2].length > 0 ? <p>{addressArr[2].join(' • ')}</p> : ''}
							</>
						)
						: 'Sem informações de contato.'
					}
				</Contact>

				<div>
					<p style={{ fontSize: '.75em', marginBottom: '1em' }}>As informações presentes no buscador têm como base fontes oficiais, mas alguns dados podem estar desatualizados. Em caso de dúvidas, sugerimos contato direto com a escola.</p>
					<p style={{ fontSize: '.75em' }}>*Os indicadores se referem à média de todas as séries da unidade. Se a unidade tiver do 1º ao 9º ano, todas as séries serão consideradas no cálculo; se tiver apenas o fundamental 1 nessa unidade, serão considerados apenas do 1º ao 5º ano.</p>
				</div>
			</Overlay>
			<Underlay onClick={() => null} />
		</>
	);
};

School.propTypes = {
	cleanSchool: PropTypes.func.isRequired,
	cleanUrl: PropTypes.func.isRequired,
	data: PropTypes.shape({
		code: PropTypes.number,
		name: PropTypes.string,
		public_private: PropTypes.number,
		type: PropTypes.number,
		address: PropTypes.shape({
			uf_code: PropTypes.number,
			uf: PropTypes.string,
			city_code: PropTypes.number,
			city: PropTypes.string,
			location: PropTypes.number,
			district: PropTypes.string,
			cep: PropTypes.number,
			address_type: PropTypes.string,
			address: PropTypes.string,
			compl: PropTypes.number,
			email: PropTypes.string,
			zone: PropTypes.number,
			phone: PropTypes.shape({
				DDD: PropTypes.number,
				phones: PropTypes.arrayOf(PropTypes.number),
			}),
		}),
		utilities: PropTypes.shape({
			computer_lab: PropTypes.number,
			science_lab: PropTypes.number,
			sports_court: PropTypes.number,
			library: PropTypes.number,
			pne_dep: PropTypes.number,
			internet: PropTypes.number,
		}),
		school_type: PropTypes.shape({
			fundamental: PropTypes.number,
			medio: PropTypes.number,
		}),
		languages: PropTypes.shape({
			english: PropTypes.number,
			spanish: PropTypes.number,
			french: PropTypes.number,
		}),
	}).isRequired,
};

export default School;
