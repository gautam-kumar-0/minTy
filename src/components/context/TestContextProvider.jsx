import React, {createContext, useMemo} from "react";
import {useImmerReducer} from "use-immer";
const Status = {
	READY: "ready",
	UNCOMPLETE: "uncomplete",
	COMPLETE: "complete",
	NOTREADY: "notready",
};
const MODE = {
	time: [5, 60, 120, "custom"],
	words: [10, 25, 50, 100, "custom"],
	quote: ["short", "medium", "long"],
	custom: ["change"],
};

export const initialState = {
	words: [],
	index: 0,
	status: Status.NOTREADY,
	text: "",
	mode: {type: "words", value: 25}, // Default mode initialization
	MODE: MODE,
	quotes: [],
	focus: false,
};

const config = {
	freedom: false,
};
const reducer = (draft, action) => {
	function helperBackSpace(clearAll = false) {
		const word = draft.words[draft.index];
		if (word.typed) {
			word.typed = clearAll ? "" : word.typed.slice(0, -1);
		} else if (draft.index > 0) {
			const prev = draft.words[draft.index - 1];
			if (config.freedom || prev.typed != prev.original) {
				draft.index -= 1;
			}
		}
	}
	function helperCalculateWPM() {
		draft.words[draft.index].end = action.payload.timeStamp;
		const currentWord = draft.words[draft.index];
		draft.words[draft.index].wpm =
			(currentWord.typed.length * 12000) /
			(currentWord.end - draft.words[draft.index].start);
	}

	switch (action.type) {
		case "CLEAR":
			draft = initialState;
			break;
		case "NEW":
			draft.words = action.payload.split(" ").map((w) => ({
				original: w,
				typed: "",
				start: null,
				end: null,
				wpm: null,
				errors: 0,
			}));

			draft.status = Status.READY;
			draft.index = 0;
			draft.text = action.payload;
			break;

		case "FOCUS":
			draft.focus = action.payload;
			break;

		case "TIMEUP":
			draft.status = Status.COMPLETE;
			draft.words.splice(draft.index);
			break;

		case "QUOTES/STORE":
			draft.quotes = action.payload;
			break;
		case "QUOTES/USE":
			draft.quotes.shift();
			break;

		case "BACKSPACE":
			helperBackSpace();
			break;

		case "CTRLBACKSPACE":
			helperBackSpace(true);
			break;

		case "CHARACTER":
			if (draft.status == Status.READY) draft.status = Status.UNCOMPLETE;
			let temp = draft.words[draft.index];
			if (temp.typed.length < temp.original.length + 5) {
				if (
					action.payload.character !== temp.original.charAt(temp.typed.length)
				) {
					temp.errors++;
				}
				if (!temp.typed.length) temp.start = action.payload.timeStamp;
				temp.typed = `${temp.typed}${action.payload.character}`;
			}
			//for last word
			if (
				draft.index === draft.words.length - 1 &&
				temp.typed === temp.original
			) {
				console.log("COMpleted from character condition is right");
				helperCalculateWPM();
				draft.status = Status.COMPLETE;
			}
			break;

		case "SPACE":
			if (draft.status == Status.READY) draft.status = Status.UNCOMPLETE;
			if (!draft.words[draft.index].typed) return;
			helperCalculateWPM();
			if (draft.index === draft.words.length - 1) {
				draft.status = Status.COMPLETE;
			} else {
				draft.index += 1;
			}
			break;
		case "RESTART":
			draft.words.forEach((w) => {
				w.end = null;
				w.start = null;
				w.wpm = null;
				w.errors = 0;
				w.typed = "";
			});
			draft.index = 0;
			draft.status = Status.READY;
			break;

		case "SET_MODE":
			draft.mode = {
				type: action.payload.type,
				value: parseInt(action.payload.value),
			}; // Update mode in state
			break;

		default:
			break;
	}
};

export const TestContext = createContext();
export const TestDispatchContext = createContext();

const TestContextProvider = ({children}) => {
	const [state, dispatch] = useImmerReducer(reducer, initialState);
	return (
		<TestContext.Provider value={useMemo(() => state, [state])}>
			<TestDispatchContext.Provider value={useMemo(() => dispatch, [dispatch])}>
				{children}
			</TestDispatchContext.Provider>
		</TestContext.Provider>
	);
};

export default TestContextProvider;
