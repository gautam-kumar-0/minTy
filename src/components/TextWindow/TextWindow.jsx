import {useEffect, useRef} from "react";
import Letter from "./Letter";
import Word from "./Word";
import Space from "./Space";
import "./TextWindow.css";

function TextWindow({text, inputText, insert, inputRef}) {
	const textWindowRef = useRef(null);
	const cursorRef = useRef(null);
	const textViewRef = useRef(null);
	let index = 0;
	let visualText;
	let indexStopMatch;
	if (insert) {
		indexStopMatch = [...text].findIndex((c, i) => inputText[i] !== c);
		if (indexStopMatch == -1) {
			indexStopMatch = 0;
		}
		visualText = inputText + text.slice(indexStopMatch, text.length - 1);
	} else {
		indexStopMatch = inputText.length;
		visualText = text;
	}

	const renderText = (text) => text.split(" ").map(renderWord);

	const getClassSkip = () => {
		let className = "pending";
		if (index < inputText.length) {
			if (inputText[index] == visualText[index]) {
				className = "done";
			} else {
				className = "wrong";
			}
		} else if (index == indexStopMatch) {
			className = "current";
		}
		return className;
	};

	const getClassInsert = () => {
		let className = "pending";
		if (index < indexStopMatch) className = "done";
		else if (index < inputText.length) className = "wrong";
		if (index == indexStopMatch) className += " current";
		return className;
	};

	let getClass = insert ? getClassInsert : getClassSkip;

	const renderWord = (word, i) => {
		return (
			<Word key={i}>
				{word.split("").map(renderLetter)}
				<Space key={index++} className={getClass()} />
			</Word>
		);
	};

	const renderLetter = (char) => (
		<Letter key={index++} character={char} className={getClass()} />
	);

	useEffect(() => {
		if (textWindowRef.current && cursorRef.current && textViewRef.current) {
			cursorRef.current.classList.remove("blink");

			// todo replace getBoundingRect with some better way to get height and x , y
			const current = textWindowRef.current.querySelector(".current");
			if (current == null) return;

			const currentH = current.parentElement.offsetHeight;
			const cursorX = current.offsetLeft;
			const cursorY = current.offsetTop;
			console.table([
				["cursor", cursorX, cursorY, currentH],
				[
					"View",
					textViewRef.current.offsetLeft,
					textViewRef.current.offsetTop,
					textViewRef.current.offsetHeight,
				],
				[
					"Window",
					textWindowRef.current.offsetLeft,
					textWindowRef.current.offsetTop,
					textWindowRef.current.offsetHeight,
				],
			]);
			//make the logic of shifting line good and working
			if (cursorY > currentH * 2 - 5 || cursorY < currentH) {
				const difference = (cursorY - currentH) * -1;
				textViewRef.current.style.translate = `0 ${difference}px`;
			}
			cursorRef.current.style.translate = `${cursorX}px ${cursorY}px`;
			cursorRef.current.classList.add("blink");
		}
	}, [inputText]);

	return (
		<div className="text-window" ref={textWindowRef}>
			<div className="textView" ref={textViewRef}>
				<span className="cursor" ref={cursorRef}></span>
				{renderText(visualText)}
			</div>
		</div>
	);
}

export default TextWindow;
