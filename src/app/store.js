import {configureStore} from "@reduxjs/toolkit";
import textReducer from "../features/Text/textSlice";
import testReducer from "../features/Test/testSlice";
import settingReducer from "../features/Setting/settingSlice";
import {quotesApi} from "../services/quotes";

export const store = configureStore({
	reducer: {
		text: textReducer,
		test: testReducer,
		settings: settingReducer,
		[quotesApi.reducerPath]: quotesApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ["test/setTyping"],
			},
		}).concat(quotesApi.middleware),
	devTools: process.env.NODE_ENV !== "production",
});
