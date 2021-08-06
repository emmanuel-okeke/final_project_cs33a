import { SHOW_ALERT, CLEAR_ALERT } from "../actions/Types";

const initialState = {
	alert: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SHOW_ALERT:
			return {
				...state,
				alert: action.payload,
			};
		case CLEAR_ALERT:
			return {
				...state,
				alert: null,
			};
		default:
			return state;
	}
}
