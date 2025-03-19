import React, {useState} from "react";

import {useRef, useEffect} from "react";
import {printableCharacterPattern} from "./config";
import useTestContext from "../hooks/useTestContext.js";

import Keyboard from "./Keyboard/Keyboard";
import Text from "./Text/Text.jsx";
import "./Test.css";
import TestResult from "./TestResult.jsx";
import LiveStats from "./LiveStats";
import {RiRestartLine} from "react-icons/ri";
import TestMode from "./TestMode.jsx";
import {wordList} from "./config";
const generateRandomText = (words) => {
	let arr = Array(words)
		.fill(null)
		.map(() => wordList[Math.floor(Math.random() * 1000)]);
	return arr.join(" ");
};

const FetchQuotes = async () => {
	const response = await fetch("http://localhost:3000/quotes");
	if (!response.ok) {
		throw new Error("Error while fetching quote", response.status);
	}
	return await response.json();
};

const MODE = {
	time: [30, 60, 120, "custom"],
	words: [10, 25, 50, 100, "custom"],
	quote: ["short", "medium", "long"],
	custom: ["change"],
};

const Test = ({}) => {
	const [state, dispatch] = useTestContext();

	const [mode, setMode] = useState({type: "words", index: 0});
	const [error, setError] = useState(null);
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
	const setText = async (mode) => {
		console.log("setText(): ", mode);
		let text = "";
		if (mode.type == "words") {
			text = generateRandomText(MODE[mode.type][mode.index]);
		} else if (mode.type == "time") {
			text = generateRandomText(100);
		} else if (mode.type == "quote") {
			console.log("STATE.QUOTES", state.quotes);
			if (state.quotes.length) {
				text = state.quotes[0].text;
				dispatch({type: "QUOTES/USE"});
			} else {
				try {
					let quotes = await FetchQuotes();
					dispatch({type: "QUOTES/STORE", payload: quotes});
					text = quotes[0].text;
				} catch (e) {
					console.log(e);
					setError(e.message);
				}
			}
		} else if (mode.type == "custom") {
			text = generateRandomText();
		}
		console.log(text);
		dispatch({type: "NEW", payload: text});
	};
	useEffect(() => {
		console.log("Loaded");
		setText(mode);
		setError(null);
	}, [mode]);

	useEffect(() => {
		containerRef.current.focus();
		setText(mode);
	}, []);

	let display = null;

	if (!state.text) display = null;
	else if (state.status == "notready") {
		display = <span>Loading...</span>;
	} else if (state.status == "complete") {
		display = <TestResult setMode={setMode} />;
	} else {
		display = (
			<>
				<div className="stats-box">
					{state.status == "uncomplete" ? <LiveStats /> : ""}
				</div>

				<Text />
				<div className="actions">
					<button
						className="action-button"
						onClick={() => setText(mode)}
						data-action="Restart"
					>
						<RiRestartLine />
					</button>
				</div>
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
			<TestMode
				mode={mode}
				setMode={setMode}
				className={state.status == "uncomplete" ? "invisible" : ""}
			/>
			{error && (
				<div className="error">
					<span>{error}</span> <button>Refresh</button>
				</div>
			)}
			{display}
		</div>
	);
};

export default Test;
