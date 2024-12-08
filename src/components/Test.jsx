import React from "react";
import TextWindow from "./TextWindow";
import Keyboard from "./Keyboard/Keyboard";
import {useState, useRef, useEffect} from "react";
const Test = () => {
	const {stop, insert} = {stop: false, insert: true};
	const text =
		"Lorem ipsum consectetur adipisicing dolorum ad ratione nulla obcaecati explicabo eligendi. Possimus adipisci assumenda fugit harum iure qui neque obcaecati";
	const [inputText, setInputText] = useState("");
	const inputRef = useRef(null);

	useEffect(() => {
		const focus = (e) => {
			if (document.activeElement !== inputRef.current) {
				inputRef.current.focus();
				e.preventDefault();
			}
		};

		window.addEventListener("keydown", focus, true);
		return () => {
			window.removeEventListener("keydown", focus);
		};
	}, []);

	return (
		<div className="test">
			<input
				type="text"
				onChange={(e) => setInputText(e.target.value)}
				value={inputText}
				ref={inputRef}
			/>
			<TextWindow text={text} inputText={inputText} insert={insert} />
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
