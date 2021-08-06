import { combineReducers } from "redux";
import AuthReducer from "./persistors/Auth";
import AlertReducer from "./Alerts";
import RemindersReducer from "./Reminders";

export default combineReducers({
	AuthReducer,
	AlertReducer,
	RemindersReducer,
});
