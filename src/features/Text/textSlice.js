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
	currentAccuracy: 0,
	errors: 0,
	typedCharacters: 0,
};

function convertToWordObject(word) {
	return {
		original: word,
		typed: "",
		start: null,
		end: null,
		wpm: null,
		errors: Array(word.length).fill(0),
	};
}

function helperCalculateWPM(state, action) {
	state.words[state.index].end = action.payload.timeStamp;
	const currentWord = state.words[state.index];
	const delta = Math.max(currentWord.end - currentWord.start, 10); // keyboard latency
	state.words[state.index].wpm = (currentWord.typed.length * 12000) / delta;
}

function calculateAccuracy(state) {
	return ((state.typedCharacters - state.errors) / state.typedCharacters) * 100;
}

export const textSlice = createSlice({
	name: "text",
	initialState,
	reducers: {
		start: (state, action) => {
			console.log("Start Test", action.payload);
			state.words = action.payload.map(convertToWordObject);
			state.status = Status.READY;
			state.index = 0;
			state.currentAccuracy = 0;
			state.errors = 0;
			state.typedCharacters = 0;
		},
		reset: (state) => {
			state.words = state.words.map((w) => convertToWordObject(w.original));
			state.status = Status.UNCOMPLETE;
			state.index = 0;
			state.currentAccuracy = 0;
			state.errors = 0;
			state.typedCharacters = 0;
		},
		backspace: (state, action) => {
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
			let currentIndex = temp.typed.length;
			if (
				action.payload.character !== temp.original.charAt(temp.typed.length)
			) {
				state.errors++;
				// condition to check for additional typed characters
				currentIndex <= temp.errors.length ? temp.errors[currentIndex]++ : "";
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

			// calculate accuracy //simple version
			state.typedCharacters++;
			state.currentAccuracy = calculateAccuracy(state);
		},
		space: (state, action) => {
			if (state.status == Status.READY) state.status = Status.UNCOMPLETE;
			if (!state.words[state.index].typed) return; // stop skipping words

			if (state.words[state.index].original != state.words[state.index].typed) {
				state.errors++;
				state.currentAccuracy = calculateAccuracy(state);
			}

			helperCalculateWPM(state, action);
			state.index += 1;

			// set complete after after last word
			if (state.index === state.words.length) {
				state.status = Status.COMPLETE;
			}

			// keep adding words for time mode and infinite mode
			if (
				action.payload.mode.type == "time" ||
				action.payload.mode.value == Infinity
			) {
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
