import {useState, useEffect} from "react";
import "./Keyboard.css";
import TextWindow from "./TextWindow";
import Row from "./Row";

const keyArray = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\"],
	["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
	["space"],
];
const Keyboard = ({text, inputText, setInputText, insert, stop}) => {
	// todo i can use a array or object for muliple keys later
	const [activeKey, setActiveKey] = useState("");

	const [shifted, setShifted] = useState(false);

	const handleInput = function (key) {
		if (
			!stop ||
			text[inputText.length - 1] == inputText[inputText.length - 1]
		) {
			setInputText((prev) => prev.concat(key));
		}
	};

	const handleDelete = function (e) {
		if (inputText.length == 0) return;
		if (e.ctrlKey && e.key == "Backspace") deleteWord();
		else deleteLetter();
	};

	const deleteWord = function () {
		let newInputText = inputText.split(" ").slice(0, -1).join(" ");
		setInputText(newInputText);
	};

	const deleteLetter = function () {
		setInputText(inputText.slice(0, -1));
	};

	const convertToKey = (e) => {
		if (e.key == " ") return "space";
		if (e.shiftKey) return e.key.toLowerCase();
		return e.key;
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			// todo should be using inputElement for this type of things
			setActiveKey(convertToKey(e));
			setShifted(e.shiftKey);
			if (e.key == "Enter" || e.key == "Tab") {
				return;
			}
			if (e.key == "Backspace") {
				handleDelete(e);
			} else if (e.key !== "Shift" && e.key !== "Control") handleInput(e.key);
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
	}, [inputText]);

	return (
		<div className={`keyboard ${shifted ? "shifted" : ""}`}>
			<Row keys={keyArray[0]} className={`row-1`} activeKey={activeKey} />
			<Row keys={keyArray[1]} className={`row-2`} activeKey={activeKey} />
			<Row keys={keyArray[2]} className={`row-3`} activeKey={activeKey} />
			<Row keys={keyArray[3]} className={`row-4`} activeKey={activeKey} />
		</div>
	);
};

export default Keyboard;
