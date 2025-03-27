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
	},
	reducers: {
		setMode: (state, action) => {
			state.mode = {...state.mode, ...action.payload};
		},
		setTyping: (state, action) => {
			state.isTyping = action.payload;
		},
		useQuote: (state, action) => {
			state.quotes.length = Math.max(state.quotes.length - 1, 0);
		},
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
		builder.addMatcher(
			quotesApi.endpoints.getQuotes.matchPending,
			(state, action) => {
				state.error = null;
				state.quotes = [];
				state.isLoading = true;
			}
		);
		builder.addMatcher(
			quotesApi.endpoints.getQuotes.matchRejected,
			(state, action) => {
				state.error = "Failed to fetch  quotes.";
				state.quotes = [];
				state.isLoading = false;
			}
		);
	},
});

export const {setMode, setTyping, useQuote} = testSlice.actions;
export default testSlice.reducer;
