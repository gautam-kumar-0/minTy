import {useState, useEffect} from "react";
import "./Keyboard.css";
import TextWindow from "./TextWindow";
import Row from "./Row";

const Keyboard = () => {
	const text =
		"Lorem ipsum consectetur adipisicing dolorum ad ratione nulla obcaecati explicabo eligendi. Possimus adipisci assumenda fugit harum iure qui neque obcaecati";

	// todo i can use a array or object for muliple keys later
	const [activeKey, setActiveKey] = useState("");
	const [inputText, setInputText] = useState("");
	const [isWrongWord, setIsWrongWord] = useState(false);

	const [nextInputIndex, setNextInputIndex] = useState(0);
	const [isTyping, setIsTyping] = useState(true);
	const [shifted, setShifted] = useState(false);

	const handleInput = function (key) {
		// * should be using focus to handle this type of things
		// * currently for wrong word i am only going to implement cursor stop
		// * wrong insertion can be implemented using a copy of original text, or using inputText as display;

		if (isWrongWord) setIsWrongWord(false);
		if (!isTyping) return setIsTyping(true);

		if (key == text[nextInputIndex]) {
			setNextInputIndex((prev) => prev + 1);
			setInputText((prev) => prev.concat(key));
		} else setIsWrongWord(true);
	};

	const handleDelete = function (e) {
		if (nextInputIndex <= 0 || inputText.length == 0) return;
		if (e.ctrlKey && e.key == "Backspace") deleteWord();
		else deleteLetter();
	};

	const deleteWord = function () {
		let newInputText = inputText.split(" ").slice(0, -1).join(" ");
		setInputText(newInputText);
		setNextInputIndex(newInputText.length);
	};

	const deleteLetter = function () {
		setInputText(inputText.slice(0, -1));
		setNextInputIndex(nextInputIndex - 1);
	};

	const convertToKey = (e) => {
		if (e.key == " ") return "space";
		if (e.shiftKey) return e.key.toLowerCase();
		return e.key;
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			setActiveKey(convertToKey(e));
			setShifted(e.shiftKey);
			if (e.key == "Backspace") {
				isWrongWord ? setIsWrongWord(false) : handleDelete(e);
			} else handleInput(e.key);
		};

		const handleKeyUp = (e) => {
			setActiveKey("");
			if (e.key == "Shift") setShifted(false);
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [nextInputIndex, isWrongWord]);

	const keyArray = [
		["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
		["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\"],
		["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
		["space"],
	];

	return (
		<section className="main">
			<TextWindow
				text={text}
				nextInputIndex={nextInputIndex}
				isWrongWord={isWrongWord}
			/>
			<div className={`keyboard ${shifted ? "shifted" : ""}`}>
				<Row keys={keyArray[0]} className={`row-1`} activeKey={activeKey} />
				<Row keys={keyArray[1]} className={`row-2`} activeKey={activeKey} />
				<Row keys={keyArray[2]} className={`row-3`} activeKey={activeKey} />
				<Row keys={keyArray[3]} className={`row-4`} activeKey={activeKey} />
			</div>
		</section>
	);
};

export default Keyboard;
