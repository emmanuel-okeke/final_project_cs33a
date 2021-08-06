import axios from "axios";
import Cookies from "js-cookie";

import {
	GET_REMINDERS_SUCCESS,
	GET_REMINDERS_FAILURE,
	SHOW_ALERT,
} from "./Types";

// CHECK TOKEN & LOAD USER
export const getReminders = () => (dispatch, getState) => {
	axios
		.get(`/api/v1/reminders/`, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_REMINDERS_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_REMINDERS_FAILURE,
			});
			dispatch({
				type: SHOW_ALERT,
				payload: { text: "Could not get reminders!", theme: "danger" },
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
