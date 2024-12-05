import {useEffect, useRef} from "react";
import Letter from "./Letter";
import Word from "./Word";
import Space from "./Space";
function TextWindow({text, nextInputIndex, isWrongWord}) {
	const textWindowRef = useRef(null);
	const cursorRef = useRef(null);
	const textViewRef = useRef(null);
	let index = 0;

	const renderText = (text) => text.split(" ").map(renderWord);

	const getClass = () => {
		if (index < nextInputIndex) return "done";
		if (index == nextInputIndex)
			return isWrongWord ? "wrong current" : "current";
		return "pending";
	};

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
		if (textWindowRef.current && cursorRef.current) {
			cursorRef.current.classList.remove("blink");
			// todo replace getBounding rect with some better way to get height and x , y

			const current = textWindowRef.current.querySelector(".current");

			const {top, left} = textWindowRef.current.getBoundingClientRect();

			const {x: viewX, y: viewY} = textViewRef.current.getBoundingClientRect();

			const {x: currentX, y: currentY} = current.getBoundingClientRect();

			const {height: currentH} = current.parentElement.getBoundingClientRect();

			const cursorX = currentX - viewX;
			const cursorY = currentY - viewY;

			if (currentY - top > currentH * 2 - 2) {
				// todo adjust it so that cursor remains in middle
				// todo when delete it does not revert back to starting
				const offsetH = viewY - currentY + currentH;
				textViewRef.current.style.translate = `0 ${offsetH}px`;
			}
			//else {
			// 	textViewRef.current.style.translate = `0 0`;
			// }

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
	}, [nextInputIndex]);

	return (
		<div className="text-window" ref={textWindowRef}>
			<div className="textView" ref={textViewRef}>
				<span className="cursor" ref={cursorRef}></span>
				{renderText(text)}
			</div>
		</div>
	);
}

export default TextWindow;
