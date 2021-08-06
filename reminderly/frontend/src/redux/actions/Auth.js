import axios from "axios";
import Cookies from "js-cookie";

import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	LOGOUT_USER_SUCCESS,
	SHOW_ALERT,
} from "./Types";

// CHECK TOKEN & LOAD USER
export const loadUser = (userid) => (dispatch, getState) => {
	// User Loading
	dispatch({ type: USER_LOADING });

	axios
		.get(`/api/v1/auth/users/${userid}`, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: AUTH_ERROR,
			});
			dispatch({
				type: SHOW_ALERT,
				payload: { text: "Authentication Error!", theme: "danger" },
			});
		});
};

// LOGIN USER
export const login = (email, password) => (dispatch) => {
	const csrfToken = Cookies.get("csrftoken");
	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json",
			"X-CSRFToken": csrfToken,
		},
	};

	// Request Body
	const body = JSON.stringify({ email: email, password: password });

	axios
		.post("/api/v1/auth/login/", body, config)
		.then((res) => {
			dispatch({
				type: LOGIN_USER_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: LOGIN_USER_FAILURE,
			});
			dispatch({
				type: SHOW_ALERT,
				payload: { text: "Login Failed!", theme: "danger" },
			});
		});
};

// REGISTER USER
export const register = (newUser) => (dispatch) => {
	const csrfToken = Cookies.get("csrftoken");
	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	// Request Body
	const body = JSON.stringify({
		email: newUser.email,
		firstname: newUser.firstname,
		lastname: newUser.lastname,
		password: newUser.password,
		csrfmiddlewaretoken: csrfToken,
	});

	axios
		.post("/api/v1/auth/register/", body, config)
		.then((res) => {
			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: REGISTER_USER_FAILURE,
			});
			dispatch({
				type: SHOW_ALERT,
				payload: { text: "Registration Failed!", theme: "danger" },
			});
		});
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
	axios
		.post("/api/v1/auth/logout/", null, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: LOGOUT_USER_SUCCESS,
			});
			dispatch({
				type: SHOW_ALERT,
				payload: { text: "Logout Successful!", theme: "success" },
			});
		})
		.catch((err) => {
			dispatch({
				type: SHOW_ALERT,
				payload: { text: "Logout Failed!", theme: "danger" },
			});
		});
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
	// Get token from state
	const token = getState().AuthReducer.token;

	// Headers
	const csrfToken = Cookies.get("csrftoken");
	const config = {
		headers: {
			"Content-Type": "application/json",
			"X-CSRFToken": csrfToken,
		},
	};

	// If token, add to headers config
	if (token) {
		config.headers["Authorization"] = `Token ${token}`;
	}

	return config;
};
