import React from "react";
import TextWindow from "./TextWindow";
import Keyboard from "./Keyboard";
import {useState} from "react";
const Test = () => {
	const {stop, insert} = {stop: false, insert: true};
	const text =
		"Lorem ipsum consectetur adipisicing dolorum ad ratione nulla obcaecati explicabo eligendi. Possimus adipisci assumenda fugit harum iure qui neque obcaecati";
	const [inputText, setInputText] = useState("");
	return (
		<div className="test">
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
