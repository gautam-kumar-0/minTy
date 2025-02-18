import {createContext, useReducer, useMemo} from "react";

const text =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam iste fuga soluta, amet quasi eveniet consequuntur minima fugit, placeat modi enim velit autem sunt numquam. Quaerat quas minus placeat aut cum laudantium beatae pariatur, architecto aliquam omnis molestiae amet odit magnam quo et, perspiciatis debitis mollitia quis adipisci laboriosam illum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa id quisquam dolor.";
const words = text.split(" ").map((w) => ({
	original: w,
	typed: "",
	errors: 0,
	start: null,
	end: null,
}));
export const initialState = {
	words,
	isCompleted: false,
	index: 0,
};

export const reducer = (state, action) => {
	// todo Use Immer for state mutation
	switch (action.type) {
		case "BACKSPACE":
			console.log("ACTTON", action.type, action.payload);
			if (state.words[state.index].typed) {
				state.words[state.index] = {
					...state.words[state.index],
					typed: state.words[state.index].typed.slice(0, -1),
				};
			} else {
				state.index = state.index > 0 ? state.index - 1 : 0;
			}
			console.log(action.type, state.words);
			return {...state, words: [...state.words]};

		case "CTRLBACKSPACE":
			console.log("ACTTON", action.type, action.payload);
			if (state.words[state.index].typed) {
				state.words[state.index].typed = "";
			} else state.index = state.index > 0 ? state.index - 1 : 0;
			return {...state, words: [...state.words]};

		case "CHARACTER":
			let temp = state.words[state.index];
			console.log("ACTTON", action.type, action.payload);
			console.log("TEMP", temp);
			if (temp.typed.length < temp.original.length + 5) {
				if (
					action.payload.character !=
					temp.original.charAt(temp.typed.length - 1)
				)
					temp.errors++;
				if (!temp.typed.length) temp.start = action.payload.timeStamp;
				temp.typed = `${temp.typed}${action.payload.character}`;
				console.log("UPDATED TEMP", temp);
				state.words[state.index] = {...temp};
			}
			if (
				state.index == state.words.length - 1 &&
				temp.typed == temp.original
			) {
				state.isCompleted = true;
			}
			console.log("UPDATEWORD", state.words[state.index]);
			state = {...state, words: [...state.words]};
			console.log("UPDATEDSTATE", state);
			return state;

		case "SPACE":
			console.log("ACTTON", action.type, action.payload);
			state.words[state.index].end = action.payload.timeStamp;
			if (state.index == state.words.length - 1) {
				state.isCompleted = true;
			} else {
				state.index += 1;
			}
			return {...state, words: [...state.words]};

		default:
			console.log("Wrong action type", action.type);
			return {...state};
	}
};

export const TestContext = createContext();
export const TestDispatchContext = createContext();

const TestContextProvider = ({children}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<TestContext.Provider value={useMemo(() => state, [state])}>
			<TestDispatchContext.Provider value={useMemo(() => dispatch, [dispatch])}>
				{children}
			</TestDispatchContext.Provider>
		</TestContext.Provider>
	);
};

export default TestContextProvider;
