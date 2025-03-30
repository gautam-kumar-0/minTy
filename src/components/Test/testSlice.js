import {createSlice} from "@reduxjs/toolkit";
import {quotesApi} from "../../services/quotes";
const testSlice = createSlice({
	name: "test",
	initialState: {
		mode: {
			type: "words",
			value: 10,
		},
		isTyping: false,
		error: null,
		isLoading: false,
		quotes: [],
		messageE: null,
	},
	reducers: {
		setMode: (state, action) => {
			const newMode = {...state.mode, ...action.payload};
			if (newMode.type == "quote" && state.mode.value != newMode.value) {
				state.quotes = [];
			}
			state.error = null;
			state.isTyping = false;
			state.isLoading = false;
			state.mode = newMode;
		},
		setTyping: (state, action) => {
			state.isTyping = action.payload;
		},
		useQuote: (state) => {
			state.quotes.length = Math.max(state.quotes.length - 1, 0);
		},
		clearQuote: (state) => {
			state.quotes = [];
		},
		// setQuotes: (state, action) => {
		// 	state.quotes =
		// }
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			quotesApi.endpoints.getQuotes.matchFulfilled,
			(state, action) => {
				state.quotes = action.payload;
				state.error = null;
				state.isLoading = false;
			}
		);
		builder.addMatcher(quotesApi.endpoints.getQuotes.matchPending, (state) => {
			state.error = null;
			state.quotes = [];
			state.isLoading = true;
		});
		builder.addMatcher(
			quotesApi.endpoints.getQuotes.matchRejected,
			(state, action) => {
				state.error = "Failed to fetch  quotes.";
				state.quotes = [];
				state.isLoading = false;
				messageE = action.error;
			}
		);
	},
});

export const {setMode, setTyping, useQuote, clearQuote} = testSlice.actions;
export default testSlice.reducer;
