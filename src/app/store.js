import {configureStore} from "@reduxjs/toolkit";
import testReducer from "../components/Test/testSlice";
import modeReducer from "../components/Test/modeSlice";
export const store = configureStore({
	reducer: {
		test: testReducer,
		mode: modeReducer,
	},
});
