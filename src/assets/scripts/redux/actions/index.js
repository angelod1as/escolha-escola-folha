import axios from 'axios';

export const CONFIG = 'CONFIG';
export const config = action => ({
	type: CONFIG, action,
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

export const REQUEST_SCHOOL_DATA = 'REQUEST_SCHOOL_DATA';
export const requestSchoolData = payload => ({
	type: REQUEST_SCHOOL_DATA, payload,
});

export const RECEIVE_SCHOOL_DATA = 'RECEIVE_SCHOOL_DATA';
export const receiveSchoolData = payload => ({
	type: RECEIVE_SCHOOL_DATA, payload,
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

export const FILTER_NAME = 'FILTER_NAME';
export const filterName = name => ({
	type: FILTER_NAME,
	name,
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

export const REQUEST_AVG = 'REQUEST_AVG';
export const requestAvg = payload => ({
	type: REQUEST_AVG, payload,
});

export const RECEIVE_AVG = 'RECEIVE_AVG';
export const receiveAvg = (payload, code) => ({
	type: RECEIVE_AVG, payload, code,
});

export const CLEAN_AVG = 'CLEAN_AVG';
export const cleanAvg = payload => ({
	type: CLEAN_AVG, payload,
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
	let avgUrl = '';
	const { config: { urlCity, urlAvg, spCode }, cityAvg } = getState();
	if (!zone) {
		dispatch(listCities(value));
		url = `${urlCity}${value}.json`;
		avgUrl = `${urlAvg}${value}.json`;
	} else {
		dispatch(setZone(value));
		url = `${urlCity}${spCode}-${value}.json`;
		avgUrl = `${urlAvg}${spCode}.json`;
	}

	const fetchedAvgs = Object.keys(cityAvg.data);

	if (value === spCode) {
		if (!fetchedAvgs.includes(spCode)) {
			dispatch(requestAvg(url));
			axios.get(avgUrl)
				.then(({ data }) => {
					dispatch(receiveAvg(data, spCode));
				});
		}
	} else if (!fetchedAvgs.includes(value)) {
		dispatch(requestAvg(url));
		axios.get(avgUrl)
			.then(({ data }) => {
				dispatch(receiveAvg(data, value));
			});
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

export const fetchSchool = value => (dispatch, getState) => {
	dispatch(requestSchoolData(value));
	const { config: { urlSchool } } = getState();

	const url = `${urlSchool}${value}.json`;

	return axios.get(url)
		.then(({ data }) => {
			dispatch(receiveSchoolData(data));
		});
};

export const removeCity = ({ value }) => (dispatch) => {
	dispatch(removeCityFromList(value));
	dispatch(removeSchools(value));
};

export const removeZone = ({ value }) => (dispatch) => {
	dispatch(removeZoneFromList(value));
	dispatch(removeSchools(value, true));
};
