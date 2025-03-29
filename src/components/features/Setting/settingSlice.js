import {createSlice} from "@reduxjs/toolkit";

const settingSlice = createSlice({
	name: "test",
	initialState: {
		theme: {
			bg: "hsl(0,0%,0%)",
			fg: "hsl(0,0%,100%)",
			primary: "hsl(57,100%,40%)",
		},
		freedom: false,
		confidence: false,
		cursor: "bar",
		enableSound: true,
		sound: "",
		fontSize: 16,
		fontFamily: "IBM Plex Mono",
		keyboard: true,
		liveStats: true,
	},
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
		setFreedom: (state, action) => {
			state.freedom = action.payload;
		},
		setConfidence: (state, action) => {
			state.confidence = action.payload;
		},
		setCursor: (state, action) => {
			state.cursor = action.payload;
		},
		setEnableSound: (state, action) => {
			state.enableSound = action.payload;
		},
		setSound: (state, action) => {
			state.sound = action.payload;
		},
		setFontSize: (state, action) => {
			state.fontSize = action.payload;
		},
		setFontFamily: (state, action) => {
			state.fontFamily = action.payload;
		},
		setKeyboard: (state, action) => {
			state.keyboard = action.payload;
		},
		setLiveStats: (state, action) => {
			state.liveStats = action.payload;
		},
		setSetting: (state, action) => {
			return action.payload;
		},
	},
});

export const {
	setTheme,
	setFreedom,
	setConfidence,
	setCursor,
	setEnableSound,
	setSound,
	setFontSize,
	setFontFamily,
	setKeyboard,
	setLiveStats,
	setEntireSetting,
} = settingSlice.actions;

export default settingSlice.reducer;
