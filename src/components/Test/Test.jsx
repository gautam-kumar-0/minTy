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
import {wordList} from "../../utils/config.js";
import {useSelector, useDispatch} from "react-redux"; // Import Redux hooks
import {useGetQuoteQuery} from "../../services/quotes.js";
import {start, character, space, backspace} from "./testSlice.js";
const generateRandomText = (words) => {
	console.log("generateRandomText(): ", words);
	let arr = Array(words)
		.fill(null)
		.map(() => wordList[Math.floor(Math.random() * 1000)]);
	console.log(arr);
	return arr.join(" ");
};

const Test = ({}) => {
	const dispatch = useDispatch(); // Use dispatch from Redux
	const state = useSelector((state) => state.test); // Select the test state
	const mode = useSelector((state) => state.mode); // Select the mode state
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
	const setText = async () => {
		console.log("setText(): ", mode);
		let text = "";
		if (mode.type == "words") {
			text = generateRandomText(mode.value);
		} else if (mode.type == "time") {
			text = generateRandomText(2);
		} else if (mode.type == "custom") {
			text = generateRandomText();
		}
		console.log(text);
		dispatch(start(text)); // Dispatch the start action
	};

	useEffect(() => {
		setText();
		containerRef.current.focus(); // Ensure the container is focused on mount

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
				containerRef.current?.focus();
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

	useEffect(() => {
		setText();
	}, [mode]);

	let display = null;

	if (state.status == "notready") {
		display = <span>Loading...</span>;
	} else if (state.status == "complete") {
		display = <TestResult />;
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
						onClick={() => console.log("setup restart")}
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
