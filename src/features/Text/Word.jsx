import React, {memo} from "react";
import {useSelector} from "react-redux";

const Letter = memo(({letter}) => {
	const {confidence} = useSelector((state) => state.settings);
	const {value, isTyped, isCurrent, isValid} = letter;
	let className = "letter ";

	if (isCurrent) className += " current";
	if (isTyped) {
		if (isValid || confidence) {
			className += " valid";
		} else className += " invalid";
	} else className += " unprocessed";
	return <span className={className}>{value}</span>;
});

const Word = memo(({word, done, typing, pending}) => {
	const LETTERS = Array.from(word.original + " ").map((letter, i) => ({
		value: letter,
		isTyped: i < word.typed.length,
		isCurrent: typing && i == word.typed.length,
		isValid: letter == word.typed.charAt(i),
	}));

	LETTERS[LETTERS.length - 1].value = "";

	if (word.original.length < word.typed.length) {
		const space = LETTERS.pop();
		Array.from(word.typed.slice(word.original.length)).forEach((letter, i) => {
			LETTERS.push({
				value: letter,
				isTyped: true,
				isCurrent: false,
				isValid: false,
			});
		});
		space.isCurrent = typing;
		LETTERS.push(space);
	}

	return (
		<div className="word">
			<span>
				{LETTERS.map((l, i) => (
					<Letter letter={l} key={i} />
				))}
			</span>
		</div>
	);
});

export default Word;
