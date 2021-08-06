// AuthReducer.js
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import AuthReducer from "../Auth";

const persistConfig = {
	key: "auth",
	storage: storage,
	whitelist: ["token", "user"],
};

export default persistReducer(persistConfig, AuthReducer);
