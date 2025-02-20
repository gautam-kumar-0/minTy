import React, {useState} from "react";

import {useRef, useEffect} from "react";
import {printableCharacterPattern} from "./config";
import useTestContext from "../hooks/useTestContext.js";

import Keyboard from "./Keyboard/Keyboard";
import Text from "./Text/Text.jsx";
import "./Test.css";
import TestResult from "./TestResult.jsx";
import LiveStats from "./LiveStats";

const Test = ({}) => {
	const [state, dispatch] = useTestContext();
	const [text, setText] = useState("");
	const containerRef = useRef(null);

	const handleKeyDown = (e) => {
		e.preventDefault();
		if (e.key === "Escape") {
			containerRef.current.blur();
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
		// console.log("HandleKeyPress", e);
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
	useEffect(() => {
		const getText = async (params) => {
			params = {
				type: "random",
				numberOfWords: 50,
			};
			let data = new Promise((resolve, reject) => {
				let data = null;
				setTimeout(() => {
					data =
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem architecto magnam in nam cupiditate dolores esse omnis quasi porro iusto!";
					resolve(data);
				}, 1000);
			});
			data = await data;
			setText(data);
		};
		if (text) {
			dispatch({type: "NEW", payload: text});
		} else getText();
	}, [text]);
	useEffect(() => {
		containerRef.current.focus();
	}, []);

	let display = null;

	if (state.status == "notready") {
		display = <span>Loading...</span>;
	} else if (state.status == "complete") {
		display = <TestResult setText={setText} />;
	} else {
		display = (
			<>
				<div className="stats-box">
					{state.status == "uncomplete" ? <LiveStats /> : <></>}
				</div>
				<Text />
				<div className="keyboard-wrapper">
					<Keyboard />
				</div>
			</>
		);
	}
	return (
		<div
			className="main"
			ref={containerRef}
			tabIndex={0}
			onKeyDown={handleKeyDown}
			onFocus={() => {
				let testContainer =
					containerRef.current.querySelector(".test-container");
				if (testContainer) {
					testContainer.style.filter = "blur(0px)";
				}
			}}
			onBlur={() => {
				let testContainer =
					containerRef.current.querySelector(".test-container");
				if (testContainer) {
					testContainer.style.filter = "blur(3px)";
				}
			}}
		>
			{display}
		</div>
	);
};

export default Test;
