import React, {memo} from "react";
const Letter = ({letter}) => {
	const {value, isTyped, isCurrent, isValid} = letter;
	let className = "letter ";
	if (isCurrent) className += " current";
	else if (isTyped) {
		if (isValid) {
			className += " valid";
		} else className += " invalid";
	} else className += " unprocessed";
	return <span className={className}>{value}</span>;
};

const Word = ({word, done, typing, pending}) => {
	const LETTERS = Array.from(word.original + " ").map((letter, i) => ({
		value: letter,
		isTyped: i < word.typed.length,
		isCurrent: typing && i == word.typed.length,
		isValid: letter == word.typed.charAt(i),
	}));

	LETTERS[LETTERS.length - 1].value = "";

	if (word.original.length < word.typed.length) {
		Array.from(word.typed.slice(word.original.length)).forEach((letter, i) => {
			LETTERS.push({
				value: letter,
				isTyped: true,
				isCurrent: false,
				isValid: false,
			});
		});
	}

	return (
		<div className="word">
			<span>
				{LETTERS.map((l, i) => {
					return <Letter letter={l} key={i} />;
				})}
			</span>
			{/* <span className="typed">{word.typed}</span> */}
		</div>
	);
};

// Memoize the Word component
export default memo(Word);
