import React, {createContext, useMemo} from "react";
import {useImmerReducer} from "use-immer";
const Status = {
	UNCOMPLETE: "uncomplete",
	COMPLETE: "complete",
	PENDING: "pending",
};
export const initialState = {
	words: [],
	isCompleted: false,
	index: 0,
	status: Status.PENDING,
};

const reducer = (draft, action) => {
	switch (action.type) {
		case "NEW":
			draft.words = action.payload.split(" ").map((w) => ({
				original: w,
				typed: "",
				start: null,
				end: null,
				wpm: null,
				errors: 0,
			}));

			draft.status = Status.UNCOMPLETE;
			draft.index = 0;
			draft.isCompleted = false;

		case "BACKSPACE":
			if (draft.words[draft.index].typed) {
				draft.words[draft.index].typed = draft.words[draft.index].typed.slice(
					0,
					-1
				);
			} else {
				draft.index = draft.index > 0 ? draft.index - 1 : 0;
			}
			break;

		case "CTRLBACKSPACE":
			if (draft.words[draft.index].typed) {
				draft.words[draft.index].typed = "";
			} else {
				draft.index = draft.index > 0 ? draft.index - 1 : 0;
			}
			break;

		case "CHARACTER":
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
			if (
				draft.index === draft.words.length - 1 &&
				temp.typed === temp.original
			) {
				draft.words[draft.index].end = action.payload.timeStamp;
				const currentWord = draft.words[draft.index];
				draft.words[draft.index].wpm =
					(currentWord.typed.length * 12000) /
					(currentWord.end - draft.words[draft.index].start);
				draft.isCompleted = true;
				draft.status = Status.COMPLETE;
			}
			break;

		case "SPACE":
			draft.words[draft.index].end = action.payload.timeStamp;
			const currentWord = draft.words[draft.index];
			draft.words[draft.index].wpm =
				(currentWord.typed.length * 12000) /
				(currentWord.end - draft.words[draft.index].start);

			if (draft.index === draft.words.length - 1) {
				draft.isCompleted = true;
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
			draft.status = Status.UNCOMPLETE;
			draft.isCompleted = false;
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
