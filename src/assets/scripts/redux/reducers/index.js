import { combineReducers } from 'redux';
import {
	GET_UF,
	SET_UF,
	REQUEST_CITY_LIST,
	RECEIVE_CITY_LIST,
	SET_CITY,
	REQUEST_ZONE_LIST,
	RECEIVE_ZONE_LIST,
	SET_ZONE,
	REQUEST_SCHOOLS_LIST,
	RECEIVE_SCHOOLS_LIST,
	SHOW_SCHOOL,
} from '../actions/index';
import ufList from '../../utils/uf-list';

const initialState = {
	config: {
		output: '../../../output/',
		spCode: '3550308',
	},
	locationFilters: {
		uf: {
			ufList,
			chosenUf: '',
		},
		cities: {
			fetching: true,
			chosen: false,
			cityList: [],
			chosenCities: [],
		},
		zones: {
			fetching: true,
			chosen: false,
			zoneList: [],
			chosenZones: [],
		},
	},
	schoolList: {
		fetching: true,
		list: [],
		filters: {
			name: '',
			fundamental: false,
			medio: false,
			particular: false,
			publica: false,
			urbana: false,
			rural: false,
			especiais: false,
			biblioteca: false,
			ciencia: false,
			informatica: false,
			quadra: false,
			espanhol: false,
			frances: false,
			ingles: false,
		},
	},
	school: {
		id: '',
	},
};

const output = '../../../output/';
const spCode = '3550308';

const config = (state = {
	output,
	spCode,
	ufList,
}, action) => {
	switch (action.type) {
	case GET_UF:
		return state;
	default:
		return state;
	}
};

const setUf = (state = {
	url: `${output}ufs/uf-`,
	chosenUf: '',
}, action) => {
	switch (action.type) {
	case SET_UF:
		return Object.assign({}, state, {
			chosenUf: action.chosen,
			url: `${state.url}${action.chosen.toLowerCase()}.json`,
		});
	default:
		return state;
	}
};

const setCity = (state = {
	url: `${output}city/uf-`,
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
	default:
		return state;
	}
};

const chooseCity = (state = {
	chosen: false,
	chosenCities: [],
}, action) => {
	switch (action.type) {
	case SET_CITY:
		return Object.assign({}, state, {
			chosen: true,
			chosenCities: [...action.chosen],
		});
	default:
		return state;
	}
};

// const setZone = (state = {
// 	fetching: false,
// 	chosen: false,
// 	zoneList: [],
// 	chosenZones: [],
// }, action) => {
// 	switch (action.type) {
// 	case REQUEST_ZONE:
// 		return Object.assign({}, state, {
// 			fetching: true,
// 			chosen: false,
// 			zoneList: state.zoneList,
// 			chosenZones: state.chosenZones,
// 		});
// 	case RECEIVE_ZONE:
// 		return Object.assign({}, state, {
// 			fetching: false,
// 			chosen: false,
// 			zoneList: [...action.payload],
// 			chosenZones: state.chosenZones,
// 		});
// 	case SET_ZONE:
// 		return Object.assign({}, state, {
// 			fetching: false,
// 			chosen: true,
// 			zoneList: state.zoneList,
// 			chosenZones: [...action.chosen],
// 		});
// 	default:
// 		return state;
// 	}
// };

// const setSchool = (state = {
// 	fetching: false,
// 	chosen: false,
// 	schoolList: [],
// 	chosenSchools: [],
// }, action) => {
// 	switch (action.type) {
// 	case REQUEST_SCHOOLS:
// 		return Object.assign({}, state, {
// 			fetching: true,
// 			chosen: false,
// 			schoolList: state.schoolList,
// 			chosenSchools: state.chosenSchools,
// 		});
// 	case RECEIVE_SCHOOLS:
// 		return Object.assign({}, state, {
// 			fetching: false,
// 			chosen: false,
// 			schoolList: [...action.payload],
// 			chosenSchools: state.chosenSchools,
// 		});
// 	default:
// 		return state;
// 	}
// };

// TODO applyFilters
// const applyFilters = (state, action) => {

// }

// const showSchool = (state = '', action) => {
// 	switch (action.type) {
// 	case SHOW_SCHOOL:
// 		return action.chosen;
// 	default:
// 		return state;
// 	}
// };

const rootReducer = combineReducers({
	config,
	setUf,
	setCity,
	chooseCity,
	// setZone,
	// setSchool,
	// showSchool,
});

export default rootReducer;
