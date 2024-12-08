import {useState, useEffect} from "react";
import "./Keyboard.css";
import Row from "./Row";
import {convertToKey} from "../../utils/keys";
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

	useEffect(() => {
		const handleKeyDown = (e) => {
			setActiveKey(convertToKey(e));
			setShifted(e.shiftKey);
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
