import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/es/storage";
import { usersReducer } from "../features/user/userSlice";

const usersPersistConfig = {
	key: "menu:users",
	storage,
	whitelist: ["user"],
};

const rootReducer = combineReducers({
	users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
