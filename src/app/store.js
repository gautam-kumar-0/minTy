import {configureStore} from "@reduxjs/toolkit";
import textReducer from "../components/Text/textSlice";
import testReducer from "../components/Test/testSlice";
export const store = configureStore({
	reducer: {
		text: textReducer,
		test: testReducer,
	},
});
