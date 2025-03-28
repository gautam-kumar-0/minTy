import {configureStore} from "@reduxjs/toolkit";
import textReducer from "../components/Text/textSlice";
import testReducer from "../components/Test/testSlice";
import settingReducer from "../components/features/Setting/settingSlice";
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
