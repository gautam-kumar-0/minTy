import {wordList} from "./config";
export const generateRandomWord = () => {
	return wordList[Math.floor(Math.random() * 1000)];
};

export const generateRandomText = (words) => {
	let arr = Array(parseInt(words)).fill(null).map(generateRandomWord);
	console.log("generateRandomText(): ", words, arr);
	return arr.join(" ");
};
