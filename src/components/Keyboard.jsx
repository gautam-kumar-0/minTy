import React, {useState, useEffect, useRef} from "react";

// Key Component
import "./Keyboard.css";
import TextWindow from "./TextWindow";
const Key = React.memo(({keyName, isActive}) => {
	const keyRef = useRef(null);
	const glow = "glow";

	useEffect(() => {
		if (keyRef.current) {
			if (isActive) keyRef.current.classList.add(glow);
			else setTimeout(() => keyRef.current.classList.remove(glow), 100);
		}
	}, [isActive]);
	return (
		<div ref={keyRef} className="key">
			{keyName}
		</div>
	);
});

const Row = ({keys, className, activeKey}) => {
	return (
		<div className={`${className} row`}>
			{keys.map((key, i) => {
				return <Key key={i} keyName={key} isActive={key == activeKey} />;
			})}
		</div>
	);
};

// parent component
const Keyboard = () => {
	const [activeKey, setActiveKey] = useState("");
	const [inputText, setInputText] = useState("");
	const [isTyping, setIsTyping] = useState(true);
	const [shifted, setShifted] = useState(false);
	const handleInput = function (key) {
		if (!isTyping) setIsTyping(true);
		else inputText += key;
		// todo update text window to show key has been typed
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
			console.log(e.key, e.shiftKey, activeKey);
			if (!e.repeat) setTimeout(() => setActiveKey(""), 100);
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
	}, []);

	const keyArray = [
		["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
		["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\"],
		["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
		["space"],
	];

	const text =
		"Lorem ipsum consectetur adipisicing dolorum ad ratione nulla obcaecati explicabo eligendi. Possimus adipisci assumenda fugit harum iure qui neque obcaecati";

	return (
		<section className="main">
			<TextWindow text={text}></TextWindow>

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
