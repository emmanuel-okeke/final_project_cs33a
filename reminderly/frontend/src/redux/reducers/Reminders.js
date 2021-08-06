import { GET_REMINDERS_SUCCESS, GET_REMINDERS_FAILURE } from "../actions/Types";

const initialState = {
	reminders: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_REMINDERS_SUCCESS:
			return {
				...state,
				reminders: action.payload,
			};
		case GET_REMINDERS_FAILURE:
		default:
			return state;
	}
}
