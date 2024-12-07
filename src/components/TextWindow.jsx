import {useEffect, useRef} from "react";
import Letter from "./Letter";
import Word from "./Word";
import Space from "./Space";
import "./TextWindow.css";
function TextWindow({text, inputText, insert}) {
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

	// const getClassSkip = () => {
	// 	let className = "pending";
	// 	if (index < inputText.length) {
	// 		if (inputText[index] == visualText[index]) {
	// 			className = "done";
	// 		} else {
	// 			className = "wrong";
	// 		}
	// 	} else if (index == indexStopMatch) {
	// 		className = "current";
	// 	}
	// 	return className;
	// };

	const getClassInsert = () => {
		let className = "pending";
		if (index < indexStopMatch) className = "done";
		else if (index < inputText.length) className = "wrong";
		if (index == indexStopMatch) className += " current";
		return className;
	};

	let getClass = getClassInsert;

	const renderWord = (word, i) => {
		return (
			<Word key={i}>
				{word.split("").map(renderLetter)}
				{index < text.length ? (
					<Space key={index++} className={getClass()} />
				) : (
					""
				)}
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
			const {top, left} = textWindowRef.current.getBoundingClientRect();

			const {x: viewX, y: viewY} = textViewRef.current.getBoundingClientRect();

			const {x: currentX, y: currentY} = current.getBoundingClientRect();

			const {height: currentH} = current.parentElement.getBoundingClientRect();

			const cursorX = currentX - viewX;
			const cursorY = currentY - viewY;

			// updates the textView position
			const tolerance = 2;
			const distance = currentY - top;
			if (
				distance > currentH * 2 - tolerance ||
				distance < currentH + tolerance
			) {
				const offsetH = viewY - currentY + currentH;
				textViewRef.current.style.translate = `0 ${offsetH}px`;
			}
			// update cursor position
			cursorRef.current.style.top = `${cursorY}px`;
			cursorRef.current.style.left = `${cursorX}px`;

			// console.table([
			// 	{name: "Window", x: left, y: top},
			// 	{name: "View", x: viewX, y: viewY},
			// 	{name: "Current", x: viewX, y: viewY},
			// 	{name: "Cursor", x: cursorX, y: cursorY},
			// ]);
			// console.log("CurrentY - top", currentY - top);
			// console.log("currentH * 2", currentH, currentH * 2);

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
