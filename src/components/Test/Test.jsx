import React, {useState} from "react";
import {useRef, useEffect} from "react";
import {printableCharacterPattern} from "../../utils/config.js";
import Keyboard from "../Keyboard/Keyboard";
import Text from "../Text/Text";
import "./Test.css";
import TestResult from "./TestResult.jsx";
import LiveStats from "./LiveStats.jsx";
import {RiRestartLine} from "react-icons/ri";
import TestMode from "./TestMode.jsx";

import {useSelector, useDispatch} from "react-redux"; // Import Redux hooks

import {start, reset, character, space, backspace} from "./testSlice.js";
import {generateRandomText} from "../../utils/functions.js";

const Test = ({}) => {
	const dispatch = useDispatch(); // Use dispatch from Redux
	const state = useSelector((state) => state.test); // Select the test state
	const mode = useSelector((state) => state.mode); // Select the mode state
	const [text, setText] = useState("");
	const [focus, setFocus] = useState(true);
	const [error, setError] = useState(null);
	const containerRef = useRef(null);

	const startTest = async () => {
		console.log("setText(): ", mode);
		let text = "";
		if (mode.type == "words") {
			text = generateRandomText(mode.value);
		} else if (mode.type == "time") {
			text = generateRandomText(20);
		} else if (mode.type == "custom") {
			text = generateRandomText();
		}
		setText(text);
		dispatch(start(text));
	};

	const resetTest = (e) => {
		dispatch(reset());
	};

	const updateFocus = (e) => {
		const activeElement = document.activeElement;

		// Debugging: Log the currently focused element
		console.log("Active Element:", activeElement);

		// Check if the currently focused element is an input, textarea, or other focusable element
		const isFocusableElement =
			activeElement &&
			(["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(
				activeElement.tagName
			) ||
				activeElement.isContentEditable);

		if (isFocusableElement) {
			console.log("Focus is on a focusable element. Skipping...");
			setFocus(false);
			return false;
		} else {
			console.log("Shifting focus to container...");
			setFocus(true);

			return true;
		}
	};

	const handleKeyDown = (e) => {
		let focus = updateFocus(e);

		if (e.key === "Escape") {
			setFocus(false);
			return;
		}
		if (e.ctrlKey) {
			if (e.key == "r") {
				console.log("Restart the test");
				startTest();
				return;
			} else if (e.key == "c") {
				console.log("Reset the test");
				resetTest();
				return;
			}
		}

		if (!focus || state.status == "complete") return;
		e.preventDefault();
		console.log("focus", focus);

		if (e.key == "Backspace" || printableCharacterPattern.test(e.key)) {
			handleKeyPress(e);
		}
	};

	const handleKeyPress = (e) => {
		// console.log("HandleKeyPress", e);
		if (e.key == "Backspace") {
			if (e.ctrlKey) {
				dispatch(backspace({ctrl: true, timeStamp: e.timeStamp}));
			} else {
				dispatch(backspace({timeStamp: e.timeStamp}));
			}
		} else if (e.key === " ") {
			dispatch(space({timeStamp: e.timeStamp, mode: mode.type}));
		} else {
			dispatch(character({character: e.key, timeStamp: e.timeStamp}));
		}
	};

	useEffect(() => {
		startTest();
		setFocus(true); // Ensure the container is focused on mount

		window.addEventListener("keydown", handleKeyDown); // Attach the event listener
		return () => window.removeEventListener("keydown", handleKeyDown); // Cleanup the event listener
	}, []);

	// Focus Every time new test is loaded
	useEffect(() => {
		setFocus(true);
	}, [state]);

	// Start new test
	useEffect(() => {
		startTest();
	}, [mode]);

	let display = null;
	if (!text) {
		display = null;
	} else if (state.status == "notready") {
		display = <span>Loading...</span>;
	} else if (state.status == "complete") {
		display = <TestResult startTest={startTest} resetTest={resetTest} />;
	} else {
		display = (
			<>
				<div className="stats-box">
					{state.status == "uncomplete" ? <LiveStats /> : ""}
				</div>

				<Text
					setFocus={setFocus}
					details={error ? error.message : "Click or press any key to start"}
				/>
				<div className="actions">
					<button
						tabIndex={1}
						className="action-button"
						onClick={() => resetTest()}
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
		<div className={`main ${focus ? "focus" : "blur"}`} ref={containerRef}>
			<TestMode />
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
