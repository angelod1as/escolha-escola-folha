import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ref from '../../utils/refs';

import {
	CLEAN_ALL,
	SET_UF,
	REQUEST_CITY_LIST,
	RECEIVE_CITY_LIST,
	SET_CITY,
	REMOVE_CITY,
	SET_ZONE,
	REMOVE_ZONE,
	REQUEST_SCHOOLS_LIST,
	RECEIVE_SCHOOLS_LIST,
	REMOVE_SCHOOLS,
	CHANGE_FILTER,
	FILTER_NAME,
	CLEAN_SCHOOL,
	REQUEST_SCHOOL_DATA,
	RECEIVE_SCHOOL_DATA,
	REQUEST_AVG,
	RECEIVE_AVG,
	CLEAN_AVG,
} from '../actions/index';
import ufList from '../../utils/uf-list';
import zoneList from '../../utils/zones';

const output = '/educacao/buscador-escolha-a-escola/json/';
const spCode = '3550308';

const config = (state = {
	output,
	spCode,
	ufList,
	zoneList,
	urlUf: `${output}ufs/uf-`,
	urlCity: `${output}city/city-`,
	urlSchool: `${output}school/school-`,
	urlAvg: `${output}avgs/`,
}, action) => {
	switch (action.type) {
	default:
		return state;
	}
};

const chooseUf = (state = {
	chosenUf: '',
}, action) => {
	switch (action.type) {
	case SET_UF:
		return Object.assign({}, state, {
			chosenUf: action.chosen,
		});
	case CLEAN_ALL:
		return Object.assign({}, state, {
			chosenUf: '',
		});
	default:
		return state;
	}
};

const listCities = (state = {
	fetching: false,
	cityList: {},
}, action) => {
	switch (action.type) {
	case REQUEST_CITY_LIST:
		return Object.assign({}, state, {
			fetching: true,
			cityList: state.cityList,
		});
	case RECEIVE_CITY_LIST:
		return Object.assign({}, state, {
			fetching: false,
			cityList: action.payload,
		});
	case CLEAN_ALL:
		return Object.assign({}, state, {
			fetching: false,
			cityList: {},
		});
	default:
		return state;
	}
};

const chooseCity = (state = {
	hasZone: false,
	hasChosenCity: false,
	chosenCities: [],
}, action) => {
	switch (action.type) {
	case SET_CITY: {
		const newChosen = state
			.chosenCities
			.includes(action.chosen)
			? state.chosenCities
			: [...state.chosenCities, action.chosen];
		return Object.assign({}, state, {
			hasZone: newChosen.includes(spCode),
			hasChosenCity: newChosen.length > 0,
			chosenCities: newChosen,
		});
	}
	case REMOVE_CITY: {
		const newChosen = [...state.chosenCities
			.filter(each => each !== action.deleted)];
		return Object.assign({}, state, {
			hasZone: action.deleted === spCode ? false : state.hasZone,
			hasChosenCity: newChosen.length > 0,
			chosenCities: newChosen,
		});
	}
	case CLEAN_ALL:
		return Object.assign({}, state, {
			hasZone: false,
			hasChosenCity: false,
			chosenCities: [],
		});
	default:
		return state;
	}
};

const chooseZone = (state = {
	hasChosenZone: false,
	chosenZones: [],
}, action) => {
	switch (action.type) {
	case SET_ZONE: {
		const newChosen = state
			.chosenZones
			.includes(action.chosen)
			? state.chosenZones
			: [...state.chosenZones, action.chosen];
		return Object.assign({}, state, {
			hasChosenZone: newChosen.length > 0,
			chosenZones: newChosen,
		});
	}
	case REMOVE_ZONE: {
		const newChosen = [...state.chosenZones
			.filter(each => each !== action.deleted)];
		return Object.assign({}, state, {
			hasChosenZone: newChosen.length > 0,
			chosenZones: newChosen,
		});
	}
	case REMOVE_CITY:
		if (+action.deleted !== +spCode) return state;
		// falls through
	case CLEAN_ALL:
		return Object.assign({}, state, {
			hasChosenZone: false,
			chosenZones: [],
		});
	default:
		return state;
	}
};

const listSchools = (state = {
	fetching: false,
	schoolList: {},
}, action) => {
	switch (action.type) {
	case REQUEST_SCHOOLS_LIST:
		return Object.assign({}, state, {
			fetching: true,
			schoolList: state.schoolList,
		});
	case RECEIVE_SCHOOLS_LIST:
		return Object.assign({}, state, {
			fetching: false,
			schoolList: Object.assign({}, state.schoolList, action.payload),
		});
	case REMOVE_SCHOOLS: {
		const newSchoolList = {};
		let map = [];
		const list = state.schoolList;
		if (action.zone) {
			map = Object.keys(list)
				.filter((each) => {
					const isSp = state
						.schoolList[each]
						.address
						.city_code === +spCode;

					const stateZone = state
						.schoolList[each]
						.address
						.zone;

					const refZone = ref
						.address
						.zone[1]
						.map(zone => zone.toLowerCase())
						.indexOf(action.deleted) + 1;

					if (!isSp) return true;
					return stateZone !== (refZone);
				});
		} else {
			map = Object.keys(list)
				.filter(each => state
					.schoolList[each]
					.address
					.city_code !== +action.deleted);
		}

		map.forEach((each) => {
			newSchoolList[each] = list[each];
			return null;
		});
		return Object.assign({}, state, {
			schoolList: Object.assign({}, newSchoolList),
		});
	}
	case CLEAN_ALL:
		return {
			...state,
			fetching: false,
			schoolList: {},
		};
	default:
		return state;
	}
};

const schoolData = (state = {
	fetching: false,
	chosen: '',
	data: {},
}, action) => {
	switch (action.type) {
	case REQUEST_SCHOOL_DATA:
		return {
			...state,
			fetching: true,
			chosen: action.payload,
		};
	case RECEIVE_SCHOOL_DATA:
		return {
			...state,
			fetching: false,
			data: action.payload,
		};
	case CLEAN_ALL:
		// fall through
	case CLEAN_SCHOOL:
		return {
			...state,
			fetching: false,
			data: {},
			chosen: '',
		};
	default:
		return state;
	}
};

const nameFilter = (state = '', action) => {
	switch (action.type) {
	case FILTER_NAME:
		return action.name;
	case CLEAN_ALL:
		return '';
	default:
		return state;
	}
};

const filterList = (state = {
	toggle: [
		{
			fundamental: ['Ensino fundamental', false],
			medio: ['Ensino médio', false],
		},
		{
			public: ['Privada', false],
			private: ['Pública', false],
		},
		{
			urban: ['Escola urbana', false],
			rural: ['Escola rural', false],
		},
	],
	infraestrutura: {
		pne_dep: ['Necessidades especiais', false],
		library: ['Biblioteca', false],
		science_lab: ['Laboratório de ciência', false],
		computer_lab: ['Laboratório de informática', false],
		sports_court: ['Quadra poliesportiva', false],
	},
	idiomas: {
		spanish: ['Espanhol', false],
		french: ['Francês', false],
		english: ['Inglês', false],
	},
}, action) => {
	switch (action.type) {
	case CHANGE_FILTER: {
		const { categ, name, id } = action.change;
		if (categ === 'toggle') {
			const newArr = state[categ].map((each, i) => {
				if (i === +id) {
					return {
						...each,
						[name]: [
							each[name][0],
							!each[name][1],
						],
					};
				}
				return each;
			});
			return {
				...state,
				[categ]: [
					...newArr,
				],
			};
		}
		return {
			...state,
			[categ]: {
				...state[categ],
				[name]: [
					state[categ][name][0],
					!state[categ][name][1],
				],
			},
		};
	}
	default:
		return state;
	}
};

const cityAvg = (state = {
	fetching: false,
	data: {},
}, action) => {
	switch (action.type) {
	case REQUEST_AVG:
		return {
			...state,
			fetching: true,
		};
	case RECEIVE_AVG:
		return {
			...state,
			fetching: false,
			data: action.payload,
		};
	case CLEAN_ALL:
		// fall through
	case CLEAN_AVG:
		return {
			...state,
			fetching: false,
			data: {},
		};
	default:
		return state;
	}
};

const createRootReducer = history => combineReducers({
	router: connectRouter(history),
	config,
	chooseUf,
	listCities,
	chooseCity,
	chooseZone,
	listSchools,
	filterList,
	nameFilter,
	schoolData,
	cityAvg,
});


export default createRootReducer;
