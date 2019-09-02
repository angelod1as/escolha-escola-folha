import axios from 'axios';

export const CONFIG = 'CONFIG';
export const config = action => ({ type: CONFIG, action });

export const GET_UF = 'GET_UF';
export const getUf = action => ({ type: GET_UF, action });

export const SET_UF = 'SET_UF';
export const setUf = chosen => ({ type: SET_UF, chosen });

export const REQUEST_CITY_LIST = 'REQUEST_CITY_LIST';
export const requestCityList = payload => ({ type: REQUEST_CITY_LIST, payload });

export const RECEIVE_CITY_LIST = 'RECEIVE_CITY_LIST';
export const receiveCityList = payload => ({ type: RECEIVE_CITY_LIST, payload });

export const SET_CITY = 'SET_CITY';
export const setCity = chosen => ({ type: SET_CITY, chosen });

export const REQUEST_ZONE_LIST = 'REQUEST_ZONE_LIST';
export const requestZoneList = payload => ({ type: REQUEST_ZONE_LIST, payload });

export const RECEIVE_ZONE_LIST = 'RECEIVE_ZONE_LIST';
export const receiveZoneList = payload => ({ type: RECEIVE_ZONE_LIST, payload });

export const SET_ZONE = 'SET_ZONE';
export const setZone = chosen => ({ type: SET_ZONE, chosen });

export const REQUEST_SCHOOLS_LIST = 'REQUEST_SCHOOLS_LIST';
export const requestSchoolsList = payload => ({ type: REQUEST_SCHOOLS_LIST, payload });

export const RECEIVE_SCHOOLS_LIST = 'RECEIVE_SCHOOLS_LIST';
export const receiveSchoolsList = payload => ({ type: RECEIVE_SCHOOLS_LIST, payload });

export const SHOW_SCHOOL = 'SHOW_SCHOOL';
export const showSchool = id => ({ type: SHOW_SCHOOL, id });

// THUNKS
export const fetchCityList = payload => (dispatch, getState) => {
	dispatch(setUf(payload));
	const { setUf: { url } } = getState();

	dispatch(requestCityList(url));

	return axios.get(url)
		.then(({ data }) => {
			dispatch(receiveCityList(data));
		});
};

export const fetchSchoolList = payload => (dispatch, getState) => {
	dispatch(setCity(payload));
};
