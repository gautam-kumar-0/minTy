const generateRandomWord = () => {
	return wordList[Math.floor(Math.random() * 1000)];
};

const generateRandomText = (words) => {
	let arr = Array(words).fill(null).map(generateRandomWord);
	console.log("generateRandomText(): ", words, arr);
	return arr.join(" ");
};
