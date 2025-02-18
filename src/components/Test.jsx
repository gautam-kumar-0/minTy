import React, {useContext} from "react";
import Keyboard from "./Keyboard/Keyboard";
import Text from "./Text/Text.jsx";
import {useState, useRef, useEffect} from "react";
import "./Test.css";
import {printableCharacterPattern} from "./config";
import useTestContext from "../hooks/useTestContext.js";
const Test = ({status, setStatus, text}) => {
	const [state, dispatch] = useTestContext();
	const containerRef = useRef(null);
	const handleKeyDown = (e) => {
		e.preventDefault();
		console.log("HandleKeyDown", e);

		if (e.key === "Escape") {
			console.log("Escaped");
			return;
		}
		if (e.ctrlKey) {
			if (e.key == "r") {
				console.log("Restart the test");
				return;
			} else if (e.key == "c") {
				console.log("Reset the test");
				return;
			}
		}
		if (e.key == "Backspace" || printableCharacterPattern.test(e.key)) {
			handleKeyPress(e);
		}
	};

	const handleKeyPress = (e) => {
		console.log("HandleKeyPress", e);
		if (e.key == "Backspace") {
			if (e.ctrlKey) {
				dispatch({type: "CTRLBACKSPACE"});
			} else {
				dispatch({type: "BACKSPACE"});
			}
		} else if (e.key === " ") {
			dispatch({type: "SPACE", payload: {timeStamp: e.timeStamp}});
		} else {
			dispatch({
				type: "CHARACTER",
				payload: {character: e.key, timeStamp: e.timeStamp},
			});
		}
	};

	return (
		<div
			className="main"
			ref={containerRef}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			onFocus={() => (containerRef.current.style.filter = `blur(0)`)}
			onBlur={() => (containerRef.current.style.filter = `blur(2px)`)}
		>
			<Text testText={text} />
			<Keyboard />
		</div>
	);
};

export default Test;
