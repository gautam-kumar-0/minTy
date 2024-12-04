import {useState, useEffect} from "react";
// Key Component
import "./Keyboard.css";
import TextWindow from "./TextWindow";
import Row from "./Row";
// parent component
const Keyboard = () => {
	const text =
		"Lorem ipsum consectetur adipisicing dolorum ad ratione nulla obcaecati explicabo eligendi. Possimus adipisci assumenda fugit harum iure qui neque obcaecati";

	const [activeKey, setActiveKey] = useState("");
	const [inputText, setInputText] = useState("");
	const [isWrongWord, setIsWrongWord] = useState(false);

	const [nextInputIndex, setNextInputIndex] = useState(0);
	const [isTyping, setIsTyping] = useState(true);
	const [shifted, setShifted] = useState(false);

	const handleInput = function (key) {
		console.log("begin", key, text[nextInputIndex], nextInputIndex, inputText);
		if (!isTyping) return setIsTyping(true);
		if (key == text[nextInputIndex]) {
			setNextInputIndex((prev) => prev + 1);
			setInputText((prev) => prev.concat(key));
			console.log("end", nextInputIndex, key, inputText);
		} else {
			setIsWrongWord(true);
		}
	};
	const handleDelete = function (e) {
		if (nextInputIndex <= 0 || inputText.length == 0) return;
		if (e.ctrlKey && e.key == "Backspace") deleteOneWord();
		else deleteOneLetter;
	};

	const deleteOneWord = function () {
		let newInputText = inputText.split(" ").slice(0, -1).join(" ");
		setInputText(newInputText);
		setNextInputIndex(newInputText.length);
		console.log(inputText, newInputText);
	};

	const deleteOneLetter = function () {
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
			// console.log(e.key, e.repeat, activeKey, convertToKey(e));
			if (e.key == "Backspace") handleDelete(e);
			else handleInput(e.key);
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
	}, [nextInputIndex]);

	const keyArray = [
		["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
		["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\"],
		["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
		["space"],
	];

	return (
		<section className="main">
			<TextWindow text={text} nextInputIndex={nextInputIndex} />
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
