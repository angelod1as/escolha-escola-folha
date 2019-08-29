import React, { Component } from 'react';
import uuid from 'uuid/v1';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import { upperAll } from '../utils/upper';

import ufList from '../utils/states';

import Loading from '../components/loading';
import { P } from '../components/styles';
// import Autosuggest from './autosuggest';

const spCode = '3550308';
// const rjCode = '3304557';

const Selected = styled.div``;

const SelectedP = styled(P)`
	display: inline-block;
	padding: 5px 10px;
	margin: 0 5px;
	border-radius: 5px;
	font-family: ${p => p.theme.font.display};
	border: 1px solid ${p => p.theme.color.color};
	font-size: .9em;

	&:first-child {
		margin: 0;
	}
`;

const Button = styled.button`
	cursor: pointer;
	color: ${p => p.theme.color.gray};
	margin: 0 5px 0 10px;
	appearance: none;
	border: none;
	&:hover {
		color: ${p => p.theme.color.color};
	}
`;

const Zones = styled.div``;

const Btn = styled.div`
	margin-top: 20px;
`;

const Form = styled.form`
	.autosuggest {
		margin: 10px 0;
	}
`;

const Label = styled.label`
	display: block;
	margin: 20px 0;
`;

const Select = styled.select`
	display: block;
	margin: 10px 0;
`;

const Option = styled.option``;

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
				return (
					<Fade>
						<Btn>
							<Link
								className="f-forms__button f-forms__button_primary"
								to={`lista/${finalList}`}
							>
							Continuar
							</Link>
						</Btn>
					</Fade>
				);
			}
			if (chosenZones.length > 0) {
				if (finalList.includes(spCode)) {
					const newZones = chosenZones.map(each => `${spCode}-${each.toLowerCase()}`);
					finalList.push(...newZones);
					finalList = finalList.filter(each => each !== spCode);
				}
				return (
					<Fade>
						<Btn>
							<Link
								className="f-forms__button f-forms__button_primary"
								to={`lista/${finalList}`}
							>
							Continuar
							</Link>
						</Btn>
					</Fade>
				);
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
			name: upperAll(cities[each].city_name),
			code: each,
		}));

		return (
			<Fade>
				<Form className="f-forms" onSubmit={(e) => { e.preventDefault(); }}>

					{/* STATE */}
					<Label className="f-forms__label" htmlFor="uf">
						Selecione o Estado:
						<Select className="f-forms__select" name="uf" id="uf" value={uf} onChange={this.handleUfChange}>
							{ufs.map(each => (
								<Option key={uuid()} value={each[1]}>{each[1]}</Option>
							))}
						</Select>
					</Label>

					{/* LOADING JSON */}
					<Loading loading={loading}>

						{/* CITY */}
						<Label className="f-forms__label" htmlFor="city">
						Selecione a cidade:
							<div className="autosuggest">
								<Autosuggest list={autoList} changeChosen={this.changeChosen} />
							</div>
						</Label>

						{/* SELECTED CITIES */}
						<Selected>
							{chosen.map(each => (
								<SelectedP key={uuid()}>
									{upperAll(cities[each].city_name)}
									<Button
										type="button"
										data-code={each}
										onClick={e => this.deleteTag('chosen', e.target.dataset.code)}
									>
											×
									</Button>
								</SelectedP>
							))}
						</Selected>

						{/* SELECTED ZONES */}
						{hasZones
							? (
								<Zones>
									<Label className="f-forms__label" htmlFor="zones">
									Escolha a zona de São Paulo
										<select className="f-forms__select" name="zones" id="zones" value={zone} onChange={this.handleZoneChange}>
											{this
												.getZones()
												.map(each => <option value={each} key={uuid()}>{each}</option>)}
										</select>
									</Label>
									<Selected>
										{chosenZones.map(each => (
											<SelectedP key={uuid()}>
												{each}
												<Button type="button" data-zone={each} onClick={e => this.deleteTag('zones', e.target.dataset.zone)}>×</Button>
											</SelectedP>
										))}
									</Selected>
								</Zones>
							)
							: '' }
						{/* BUTTON */}
						{this.continueBtn()}
					</Loading>
				</Form>
			</Fade>
		);
	}
}

Home.propTypes = {
	output: PropTypes.string.isRequired,
};
