import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const initialState = {};

const persistConfig = {
	key: "root",
	storage: storage,
	stateReconciler: autoMergeLevel2,
	whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const store = createStore(
	persistedReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { persistor, store };
