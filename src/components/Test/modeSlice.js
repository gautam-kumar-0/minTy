import {createSlice} from "@reduxjs/toolkit";

const modeSlice = createSlice({
	name: "modeSlice",
	initialState: {
		type: "words",
		value: "25",
	},
	reducers: {
		setType: (state, action) => {
			state.type = action.payload;
		},
		setValue: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const {setType, setValue} = modeSlice.actions;
export default modeSlice.reducer;
