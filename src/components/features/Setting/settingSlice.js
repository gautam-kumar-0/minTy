import {createSlice} from "@reduxjs/toolkit";

const settingSlice = createSlice({
	name: "test",
	initialState: {
		theme: {
			bg: "hsl()",
			fg: "hsl()",
			primary: "hsl()",
		},
		freedom: false,
		confidence: false,
		cursor: {
			option: ["bar", "caret", "block"],
		},
	},
});

export const {setMode, setTyping, useQuote, clearQuote} = settingSlice.actions;
export default settingSlice.reducer;
