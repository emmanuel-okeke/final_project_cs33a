import { CLEAR_ALERT, SHOW_ALERT } from "./Types";

export const clearAlert = () => (dispatch, getState) => {
	dispatch({ type: CLEAR_ALERT });
};

export const showAlert = (text, theme) => (dispatch, getState) => {
	dispatch({ type: SHOW_ALERT, payload: { text, theme } });
};
