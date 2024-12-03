import React, {useState, useEffect, useRef} from "react";

// Key Component
import "./Keyboard.css";
import TextWindow from "./TextWindow";
const Key = React.memo(({keyName, isActive}) => {
	const keyRef = useRef(null);
	const glow = "glow";
	useEffect(() => {
		if (keyRef.current && isActive) {
			keyRef.current.classList.add(glow);
			setTimeout(() => {
				keyRef.current.classList.remove(glow);
			}, 125);
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
			{keys.map((key) => {
				return <Key key={key} keyName={key} isActive={key == activeKey} />;
			})}
		</div>
	);
};

const LastRow = ({className, activeKey}) => {
	const space = " ";
	return (
		<div className={`${className} row`}>
			<Key key={space} keyName={"space"} isActive={space == activeKey} />
		</div>
	);
};

// parent component
const Keyboard = () => {
	const [activeKey, setActiveKey] = useState("");
	const [inputText, setInputText] = useState("");
	const [isTyping, setIsTyping] = useState(true);
	const handleInput = function (key) {
		if (!isTyping) setIsTyping(true);
		else inputText += key;
		// todo update text window to show key has been typed
	};
	useEffect(() => {
		const handleKeyDown = (e) => {
			setActiveKey(e.key);
			console.log(e.key, e);
			setTimeout(() => setActiveKey(""), 50); // Reset after 500ms for feedback
			handleInput(e.key);
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"];
	const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\"];
	const row3 = ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];
	const row4 = [" "];
	const keys = [row1, row2, row3, row4];
	const text =
		"Lorem ipsum consectetur adipisicing dolorum ad ratione nulla obcaecati explicabo eligendi. Possimus adipisci assumenda fugit harum iure qui neque obcaecati";

	return (
		<section className="main">
			<TextWindow text={text}></TextWindow>

			<div className="keyboard">
				<Row keys={row1} className={`row-1`} activeKey={activeKey} />
				<Row keys={row2} className={`row-2`} activeKey={activeKey} />
				<Row keys={row3} className={`row-3`} activeKey={activeKey} />
				<LastRow className={`row-4`} activeKey={activeKey} />
			</div>
		</section>
	);
};

export default Keyboard;
