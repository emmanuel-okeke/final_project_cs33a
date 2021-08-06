import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	LOGOUT_USER_SUCCESS,
} from "../actions/Types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	isLoading: false,
	user: {
		firstname: "John",
		lastname: "Doe",
		id: null,
		email: null,
		username: null,
	},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};

		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload,
			};

		case REGISTER_USER_SUCCESS:
			return {
				...state,
				registrationSuccessful: true,
			};
		case REGISTER_USER_FAILURE:
			return {
				...state,
				registrationSuccessful: false,
			};
		case LOGIN_USER_SUCCESS:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false,
			};

		case AUTH_ERROR:
		case LOGOUT_USER_SUCCESS:
		case LOGIN_USER_FAILURE:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				isLoading: false,
				user: {
					firstname: "John",
					lastname: "Doe",
					id: null,
					email: null,
					username: null,
					is_coach: true,
				},
			};
		default:
			return state;
	}
}
