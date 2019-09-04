import axios from 'axios';

export const CONFIG = 'CONFIG';
export const config = action => ({
	type: CONFIG, action,
});

export const GET_UF = 'GET_UF';
export const getUf = action => ({
	type: GET_UF, action,
});

export const SET_UF = 'SET_UF';
export const chooseUf = chosen => ({
	type: SET_UF, chosen,
});

export const REQUEST_CITY_LIST = 'REQUEST_CITY_LIST';
export const requestCityList = payload => ({
	type: REQUEST_CITY_LIST, payload,
});

export const RECEIVE_CITY_LIST = 'RECEIVE_CITY_LIST';
export const receiveCityList = payload => ({
	type: RECEIVE_CITY_LIST, payload,
});

export const SET_CITY = 'SET_CITY';
export const listCities = chosen => ({
	type: SET_CITY, chosen,
});

export const SET_ZONE = 'SET_ZONE';
export const setZone = chosen => ({
	type: SET_ZONE, chosen,
});

export const REQUEST_SCHOOLS_LIST = 'REQUEST_SCHOOLS_LIST';
export const requestSchoolsList = payload => ({
	type: REQUEST_SCHOOLS_LIST, payload,
});

export const RECEIVE_SCHOOLS_LIST = 'RECEIVE_SCHOOLS_LIST';
export const receiveSchoolsList = payload => ({
	type: RECEIVE_SCHOOLS_LIST, payload,
});

export const SHOW_SCHOOL = 'SHOW_SCHOOL';
export const showSchool = chosen => ({
	type: SHOW_SCHOOL, chosen,
});

export const CLEAN_SCHOOL = 'CLEAN_SCHOOL';
export const cleanSchool = () => ({
	type: CLEAN_SCHOOL,
});

export const CLEAN_ALL = 'CLEAN_ALL';
export const cleanAll = () => ({
	type: CLEAN_ALL,
});

export const CHANGE_FILTER = 'CHANGE_FILTER';
export const changeFilter = change => ({
	type: CHANGE_FILTER,
	change,
});

export const REMOVE_CITY = 'REMOVE_CITY';
export const removeCityFromList = deleted => ({
	type: REMOVE_CITY, deleted,
});

export const REMOVE_ZONE = 'REMOVE_ZONE';
export const removeZoneFromList = deleted => ({
	type: REMOVE_ZONE, deleted,
});

export const REMOVE_SCHOOLS = 'REMOVE_SCHOOLS';
export const removeSchools = (deleted, zone) => ({
	type: REMOVE_SCHOOLS, deleted, zone,
});

// THUNKS
export const fetchCityList = ({ value }) => (dispatch, getState) => {
	dispatch(cleanAll());
	dispatch(chooseUf(value));

	const { config: { urlUf }, chooseUf: { chosenUf } } = getState();

	const	url = `${urlUf}${chosenUf.toLowerCase()}.json`;

	dispatch(requestCityList(url));

	return axios.get(url)
		.then(({ data }) => {
			dispatch(receiveCityList(data));
		});
};

export const fetchSchoolList = ({ value, zone }) => (dispatch, getState) => {
	let url = '';
	const { config: { urlCity, spCode } } = getState();
	if (!zone) {
		dispatch(listCities(value));
		url = `${urlCity}${value}.json`;
	} else {
		dispatch(setZone(value));
		url = `${urlCity}${spCode}-${value}.json`;
	}

	if (value !== spCode) {
		dispatch(requestSchoolsList(url));
		return axios.get(url)
			.then(({ data }) => {
				dispatch(receiveSchoolsList(data));
			});
	}
	return {};
};

export const fetchSchool = ({ value }) => (dispatch) => {
	console.log(value);
};

export const removeCity = ({ value }) => (dispatch) => {
	dispatch(removeCityFromList(value));
	dispatch(removeSchools(value));
};

export const removeZone = ({ value }) => (dispatch) => {
	dispatch(removeZoneFromList(value));
	dispatch(removeSchools(value, true));
};
