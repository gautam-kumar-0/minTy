import {createSlice} from "@reduxjs/toolkit";

const testSlice = createSlice({
	name: "test",
	initialState: {
		mode: {
			type: "words",
			value: 10,
		},
		isTyping: false,
		errors: null,
	},
	reducers: {
		setMode: (state, action) => {
			state.mode = {...state.mode, ...action.payload};
		},
		setTyping: (state, action) => {
			state.isTyping = action.payload;
		},
	},
});

export const {setMode, setTyping} = testSlice.actions;
export default testSlice.reducer;
