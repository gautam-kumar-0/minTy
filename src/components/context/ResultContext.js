import {createContext} from "react";

const initialState = {
	isCompleted: true,
	data: {},
	setResult: (val) => (this.data = val),
	setCompleted: (val) => (this.isCompleted = val),
	getResult: () => this.data,
};
export const resultContext = createContext(initialState);

export default resultContext.Provider;
