import {wordList} from "./config";
export const generateRandomWord = () =>
	wordList[Math.floor(Math.random() * 1000)];

export const generateRandomText = (words) =>
	Array.from({length: parseInt(words)}, generateRandomWord);

export const formatMsConcise = (ms) => {
	const seconds = Math.floor((ms / 1000) % 60);
	const minutes = Math.floor((ms / (1000 * 60)) % 60);
	const hours = Math.floor(ms / (1000 * 60 * 60));

	const parts = [];

	if (hours > 0) {
		parts.push(`${hours}h`);
	}
	if (minutes > 0) {
		parts.push(`${minutes}m`);
	}
	parts.push(`${seconds}s`);

	return parts.join(" ");
};
