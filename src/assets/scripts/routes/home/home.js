import React, { Component } from 'react';
import uuid from 'uuid/v1';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ufList from '../../utils/states';

import Loading from '../../components/loading';
import Autosuggest from './autosuggest';

const spCode = '3550308';
// const rjCode = '3304557';

const Selected = styled.div`
	p {
		display: inline-block;
		padding: 5px 10px;
		margin: 0 5px;
		border-radius: 5px;
		border: 1px solid ${p => p.theme.color.color};

		button {
			cursor: pointer;
			color: ${p => p.theme.color.gray};
			margin: 0 5px 0 10px;
			appearance: none;
			border: none;
			&:hover {
				color: ${p => p.theme.color.color};
			}
		}
	}
`;

const Zones = styled.div``;

const Form = styled.form`
	label, select {
		display: block;
	}
	label {
		margin: 20px 0;
	}
	select, .autosuggest {
		margin: 10px 0;
	}
`;

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			loading: 0,
			lists: {
				ufs: ufList,
				cities: {},
			},
			selected: {
				uf: 'Selecione',
				zone: 'Selecione',
			},
			auto: {
				list: {},
			},
			chosen: [],
			chosenZones: [],
			hasZones: false,
		};

		this.handleUfChange = this.handleUfChange.bind(this);
		this.handleZoneChange = this.handleZoneChange.bind(this);
		this.changeChosen = this.changeChosen.bind(this);
		this.deleteTag = this.deleteTag.bind(this);
		this.getZones = this.getZones.bind(this);
	}

	getZones() {
		const { chosen } = this.state;
		const zones = [];
		if (chosen.includes(spCode)) {
			zones.push('Selecione', 'Centro', 'Norte', 'Leste', 'Sul', 'Oeste');
		}
		return zones;
	}

	continueBtn() {
		const { chosen, hasZones, chosenZones } = this.state;
		let finalList = [...chosen];
		if (finalList.length > 0) {
			if (!hasZones) {
				return <Link to={`lista/${finalList}`}>Continuar</Link>;
			}
			if (chosenZones.length > 0) {
				if (finalList.includes(spCode)) {
					const newZones = chosenZones.map(each => `${spCode}-${each.toLowerCase()}`);
					finalList.push(...newZones);
					finalList = finalList.filter(each => each !== spCode);
				}
				return <Link to={`lista/${finalList}`}>Continuar</Link>;
			}
		}
		return null;
	}

	handleUfChange(event) {
		const uf = event.target.value;
		const { selected } = this.state;
		selected.uf = uf;
		this.setState({ selected, loading: 1, chosen: [] });
		const { output } = this.props;

		if (uf !== 'Selecione') {
			const filename = uf.toLowerCase();
			const url = `${output}states/state-${filename}.json`;

			axios.get(url)
				.then((response) => {
					const { data } = response;
					const { lists } = this.state;

					lists.cities = data;

					this.setState({ loading: 2, lists });
				});
		} else {
			this.setState({ loading: 0 });
		}
	}

	handleZoneChange(event) {
		const zone = event.target.value;
		const { selected, chosenZones } = this.state;
		selected.zone = zone;

		if (zone !== 'Selecione' && !chosenZones.includes(zone)) {
			chosenZones.push(zone);
		}
		this.setState({ selected, chosenZones });
	}

	changeChosen(code) {
		const { chosen, hasZones } = this.state;

		let newZone = hasZones;

		if (code === spCode) {
			newZone = true;
		}

		if (!chosen.includes(code)) {
			chosen.push(code);
			this.setState({ chosen });
		}

		this.setState({ chosen, hasZones: newZone });
	}

	deleteTag(origin, data) {
		if (origin === 'chosen') {
			const { chosen } = this.state;
			const newChosen = chosen.filter(each => each !== data);
			if (data === spCode) {
				this.setState({ chosen: newChosen, hasZones: false, chosenZones: [] });
			} else {
				this.setState({ chosen: newChosen });
			}
		} else if (origin === 'zones') {
			const { chosenZones } = this.state;
			const newChosen = chosenZones.filter(each => each !== data);
			this.setState({ chosenZones: newChosen });
		}
	}

	render() {
		const {
			lists, selected, loading, chosen, hasZones, chosenZones,
		} = this.state;
		const { ufs, cities } = lists;
		const { uf, zone } = selected;

		// for autosuggest
		const autoList = Object.keys(cities).map(each => ({
			name: cities[each].city_name,
			code: each,
		}));

		return (
			<Form onSubmit={(e) => { e.preventDefault(); }}>

				{/* STATE */}
				<label htmlFor="uf">
						Selecione o Estado:
					<select name="uf" id="uf" value={uf} onChange={this.handleUfChange}>
						{ufs.map(each => (
							<option key={uuid()} value={each[1]}>{each[1]}</option>
						))}
					</select>
				</label>

				{/* LOADING JSON */}
				<Loading loading={loading}>

					{/* CITY */}
					<label htmlFor="city">
						Selecione a cidade:
						<div className="autosuggest">
							<Autosuggest list={autoList} changeChosen={this.changeChosen} />
						</div>
					</label>

					{/* SELECTED CITIES */}
					<Selected>
						{chosen.map(each => (
							<p key={uuid()}>
								{cities[each].city_name}
								<button type="button" data-code={each} onClick={e => this.deleteTag('chosen', e.target.dataset.code)}>×</button>
							</p>
						))}
					</Selected>

					{/* SELECTED ZONES */}
					{hasZones
						? (
							<Zones>
								<label htmlFor="zones">
									Escolha a zona
									<select name="zones" id="zones" value={zone} onChange={this.handleZoneChange}>
										{this.getZones().map(each => <option value={each} key={uuid()}>{each}</option>)}
									</select>
								</label>
								<Selected>
									{chosenZones.map(each => (
										<p key={uuid()}>
											{each}
											<button type="button" data-zone={each} onClick={e => this.deleteTag('zones', e.target.dataset.zone)}>×</button>
										</p>
									))}
								</Selected>
							</Zones>
						)
						: '' }

					{/* BUTTON */}
					{this.continueBtn()}
				</Loading>
			</Form>
		);
	}
}

Home.propTypes = {
	output: PropTypes.string.isRequired,
};
