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
		[quotesApi.reducerPath]: quotesApi.reducer, // Add the API reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(quotesApi.middleware),
});
