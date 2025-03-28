import React, {useState} from "react";
import {useRef, useEffect} from "react";
import {printableCharacterPattern} from "../../utils/config.js";
import useTestContext from "../../hooks/useTestContext.js";
import Keyboard from "../Keyboard/Keyboard";
import Text from "../Text/Text";
import "./Test.css";
import TestResult from "./TestResult.jsx";
import LiveStats from "./LiveStats.jsx";
import {RiRestartLine} from "react-icons/ri";
import TestMode from "./TestMode.jsx";
import {wordList} from "../../utils/config.js";

const generateRandomText = (words) => {
	console.log("generateRandomText(): ", words);
	let arr = Array(words)
		.fill(null)
		.map(() => wordList[Math.floor(Math.random() * 1000)]);
	console.log(arr);
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
	time: [5, 60, 120, "custom"],
	words: [10, 25, 50, 100, "custom"],
	quote: ["short", "medium", "long"],
	custom: ["change"],
};

const Test = ({}) => {
	const [state, dispatch] = useTestContext();

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
		if (state.status == "complete") return;
		if (!state.focus) dispatch({type: "FOCUS", payload: true});
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
			text = generateRandomText(mode.value);
		} else if (mode.type == "time") {
			text = generateRandomText(2);
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
		setText(state.mode);
		setError(null);
	}, [state.mode]);

	useEffect(() => {
		containerRef.current.focus(); // Ensure the container is focused on mount
		setText(state.mode);

		const checkFocus = (e) => {
			const activeElement = document.activeElement;

			// Debugging: Log the currently focused element
			console.log("Active Element:", activeElement);

			// Check if the currently focused element is an input, textarea, or other focusable element
			if (
				activeElement &&
				(["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(
					activeElement.tagName
				) ||
					activeElement.isContentEditable)
			) {
				console.log("Focus is on a focusable element. Skipping...");
				return;
			}

			// Shift focus to the container if no other focusable element is active
			if (activeElement !== containerRef.current) {
				console.log("Shifting focus to container...");
				containerRef.current.focus();
			}
		};

		window.addEventListener("keydown", checkFocus); // Attach the event listener
		return () => {
			window.removeEventListener("keydown", checkFocus); // Cleanup the event listener
		};
	}, []);

	useEffect(() => {
		if (state.status == "ready") {
			containerRef.current.focus();
		}
	}, [state.status]);

	let display = null;

	if (!state.text) display = null;
	else if (state.status == "notready") {
		display = <span>Loading...</span>;
	} else if (state.status == "complete") {
		display = <TestResult dispatch={dispatch} />;
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
						onClick={() => setText(state.mode)}
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
			onMouseMove={() => dispatch({type: "FOCUS", payload: false})}
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
			<TestMode mode={state.mode} dispatch={dispatch} />
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
