import { combineReducers } from 'redux';
import ref from '../../utils/refs';

import {
	CLEAN_ALL,
	GET_UF,
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
	SHOW_SCHOOL,
} from '../actions/index';
import ufList from '../../utils/uf-list';
import zoneList from '../../utils/zones';

// const initialState = {
// 	config: {
// 		output: '../../../output/',
// 		spCode: '3550308',
// 	},
// 	locationFilters: {
// 		uf: {
// 			ufList,
// 			chosenUf: '',
// 		},
// 		cities: {
// 			fetching: true,
// 			chosen: false,
// 			cityList: [],
// 			chosenCities: [],
// 		},
// 		zones: {
// 			fetching: true,
// 			chosen: false,
// 			zoneList: [],
// 			chosenZones: [],
// 		},
// 	},
// 	schoolList: {
// 		fetching: true,
// 		list: [],
// 		filters: {
// 			name: '',
// 			fundamental: false,
// 			medio: false,
// 			particular: false,
// 			publica: false,
// 			urbana: false,
// 			rural: false,
// 			especiais: false,
// 			biblioteca: false,
// 			ciencia: false,
// 			informatica: false,
// 			quadra: false,
// 			espanhol: false,
// 			frances: false,
// 			ingles: false,
// 		},
// 	},
// 	school: {
// 		id: '',
// 	},
// };

const output = '../../../output/';
const spCode = '3550308';

const config = (state = {
	output,
	spCode,
	ufList,
	zoneList,
	urlUf: `${output}ufs/uf-`,
	urlCity: `${output}city/city-`,
}, action) => {
	switch (action.type) {
	case GET_UF:
		return state;
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
		// TODO not add duplicate zone
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
	default:
		return state;
	}
};

// TODO applyFilters
// const applyFilters = (state, action) => {

// }

const showSchool = (state = '', action) => {
	switch (action.type) {
	case SHOW_SCHOOL:
		return action.chosen;
	default:
		return state;
	}
};

const rootReducer = combineReducers({
	config,
	chooseUf,
	listCities,
	chooseCity,
	chooseZone,
	listSchools,
	// showSchool,
});

export default rootReducer;
