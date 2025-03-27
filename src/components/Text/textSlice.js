import {createSlice} from "@reduxjs/toolkit";
import {generateRandomWord} from "../../utils/functions";

const Status = {
	READY: "ready",
	UNCOMPLETE: "uncomplete",
	COMPLETE: "complete",
	NOTREADY: "notready",
};

export const initialState = {
	words: [],
	index: 0,
	status: Status.NOTREADY,
};

function convertToWordObject(word) {
	return {
		original: word,
		typed: "",
		start: null,
		end: null,
		wpm: null,
		errors: 0,
		accuracy: 0,
	};
}

function helperCalculateWPM(state, action) {
	state.words[state.index].end = action.payload.timeStamp;
	const currentWord = state.words[state.index];
	const delta = Math.max(currentWord.end - currentWord.start, 10); // keyboard latency
	state.words[state.index].wpm = (currentWord.typed.length * 12000) / delta;
	state.words[state.index].accuracy =
		100 - Math.round((currentWord.errors / currentWord.original.length) * 100);
}

export const textSlice = createSlice({
	name: "text",
	initialState,
	reducers: {
		start: (state, action) => {
			state.words = action.payload.split(" ").map(convertToWordObject);
			state.index = 0;
			state.status = Status.READY;
		},
		reset: (state) => {
			state.words = state.words.map((w) => convertToWordObject(w.original));
			state.index = 0;
			state.status = Status.READY;
		},
		backspace: (state, action) => {
			action.payload.freedom = false; // remove this
			const word = state.words[state.index];
			if (word.typed)
				word.typed = action.payload.ctrl ? "" : word.typed.slice(0, -1);
			else if (state.index > 0) {
				const prev = state.words[state.index - 1];
				if (action.payload.freedom || prev.typed != prev.original) {
					state.index -= 1;
				}
			}
		},

		character: (state, action) => {
			// set status to uncomplete if ready
			if (state.status == Status.READY) state.status = Status.UNCOMPLETE;
			let temp = state.words[state.index];

			// stop entering after 5 extra characters
			if (temp.typed.length > temp.original.length + 5) return;

			// set start time
			if (!temp.typed.length) temp.start = action.payload.timeStamp;

			// check for errors
			if (
				action.payload.character !== temp.original.charAt(temp.typed.length)
			) {
				temp.errors++;
			}
			// add character
			temp.typed = `${temp.typed}${action.payload.character}`;

			//for last word
			const isLastWord =
				state.index === state.words.length - 1 && temp.typed === temp.original;

			if (isLastWord) {
				helperCalculateWPM(state, action);
				state.status = Status.COMPLETE;
			}
		},
		space: (state, action) => {
			if (state.status == Status.READY) state.status = Status.UNCOMPLETE;
			if (!state.words[state.index].typed) return; // stop skipping words

			helperCalculateWPM(state, action);
			state.index += 1;

			// set complete after after last word
			if (state.index === state.words.length) {
				state.status = Status.COMPLETE;
			}

			// keep adding words for time mode
			if (action.payload.mode == "time") {
				state.words.push(convertToWordObject(generateRandomWord()));
			}
		},
		completed: (state) => {
			state.words.length = state.index;
			state.status = Status.COMPLETE;
		},
	},
});

// Action creators are generated for each case reducer function
export const {start, reset, backspace, character, space, completed} =
	textSlice.actions;

export default textSlice.reducer;
