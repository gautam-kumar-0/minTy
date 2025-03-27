import {configureStore} from "@reduxjs/toolkit";
import textReducer from "../components/Text/textSlice";
import testReducer from "../components/Test/testSlice";
import {quotesApi} from "../services/quotes";
export const store = configureStore({
	reducer: {
		text: textReducer,
		test: testReducer,
		[quotesApi.reducerPath]: quotesApi.reducer, // Add the API reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(quotesApi.middleware),
});
