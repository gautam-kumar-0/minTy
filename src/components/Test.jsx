import React from "react";
import TextWindow from "./TextWindow/TextWindow";
import Keyboard from "./Keyboard/Keyboard";
import {useState, useRef, useEffect} from "react";
import "./Test.css";
const Test = () => {
	const {stop, insert} = {stop: false, insert: true};
	const text =
		"Lorem ipsum consectetur adipisicing dolorum ad ratione nulla obcaecati explicabo eligendi. Possimus adipisci assumenda fugit harum iure qui neque obcaecati";
	const [inputText, setInputText] = useState("");
	const inputRef = useRef(null);

	useEffect(() => {
		const handleKeyPress = (e) => {
			if (document.activeElement !== inputRef.current) {
				inputRef.current.focus();
				e.preventDefault();
			}
			const length = inputRef.current.value.length;
			inputRef.current.setSelectionRange(length, length);
			//make cursor at end and disable arrow keys;
			if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
				e.preventDefault();
			}
			//better way to calculate is
			let indexStopMatch = [...text].findIndex((c, i) => inputText[i] !== c);

			console.log(indexStopMatch, inputText.length);
			if (inputText.length - indexStopMatch > 7 && e.key != "Backspace") {
				e.preventDefault();
			}
		};

		window.addEventListener("keydown", handleKeyPress, true);
		return () => {
			window.removeEventListener("keydown", handleKeyPress, true);
		};
	}, [inputText]);

	function handlePasteCapture(e) {
		e.preventDefault();
	}

	return (
		<div className="main">
			<input
				className="inputText"
				type="text"
				onChange={(e) => setInputText(e.target.value)}
				value={inputText}
				ref={inputRef}
				onPasteCapture={handlePasteCapture}
			/>
			<TextWindow
				text={text}
				inputText={inputText}
				insert={insert}
				inputRef={inputRef}
			/>
			<Keyboard
				text={text}
				inputText={inputText}
				setInputText={setInputText}
				insert={insert}
				stop={stop}
			/>
		</div>
	);
};

export default Test;
