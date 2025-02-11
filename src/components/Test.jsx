import React, {useContext} from "react";
import Keyboard from "./Keyboard/Keyboard";
import Text from "./Text/Text";
import {useState, useRef, useEffect} from "react";
import "./Test.css";
import {printableCharacterPattern} from "./config";
const Test = ({status, setStatus, text}) => {
	const [isFocused, setFocused] = useState(true);
	const containerRef = useRef(null);
	const handleClick = (e) => {
		//* If click outside the test box
		if (!containerRef.current?.contains(e.target)) {
			setFocused(false);
		}
	};
	const handleControls = (e) => {
		// console.log(
		// 	"Inside Test:",
		// 	e.key,
		// 	!(e.key == "Backspace" || printableCharacterPattern.test(e.key))
		// );
		// job of this function is capture keyboard and manage shortcuts.

		if (!isFocused) {
			setFocused(true);
			e.stopPropagation();
		} else if (e.key === "Escape") {
			setFocused(false);
			e.stopPropagation();
		} else if (e.ctrlKey) {
			if (e.key == "r") {
				console.log("Restart the test");
				e.stopPropagation();
			} else if (e.key == "c") {
				console.log("Reset the test");
				e.stopPropagation();
			}
		}
		if (!(e.key == "Backspace" || printableCharacterPattern.test(e.key))) {
			e.stopPropagation();
		}
	};
	useEffect(() => {
		// todo Window focus and blur should be handled
		window.addEventListener("keydown", handleControls, true);

		return () => {
			window.removeEventListener("keydown", handleControls, true);
		};
	}, []);

	return (
		<div className="main" ref={containerRef}>
			<Text testText={text} focus={isFocused} />
			<Keyboard />
		</div>
	);
};

export default Test;
