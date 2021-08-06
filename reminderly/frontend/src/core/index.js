import Cookies from "js-cookie";
import { store } from "../redux/Store";

export const tokenConfig = () => {
	// Get token from state
	const token = store.getState().AuthReducer.token;

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

export const compareDateToToday = (dateString) => {
	var today = new Date();
	var date = new Date(dateString);

	if (date.getFullYear() < today.getFullYear()) {
		return -1;
	} else if (date.getFullYear() > today.getFullYear()) {
		return 1;
	} else {
		if (date.getMonth() < today.getMonth()) {
			return -1;
		} else if (date.getMonth() > today.getMonth()) {
			return 1;
		} else {
			if (date.getDate() + 1 < today.getDate()) {
				return -1;
			} else if (date.getDate() + 1 > today.getDate()) {
				return 1;
			} else {
				return 0;
			}
		}
	}
};
