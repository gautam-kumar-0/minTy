import React, {useState} from "react";
import {useRef, useEffect} from "react";
import Keyboard from "../Keyboard/Keyboard";
import Text from "../Text/Text";
import "./Test.css";
import TestResult from "./TestResult.jsx";
import LiveStats from "./LiveStats.jsx";
import {RiRestartLine} from "react-icons/ri";
import TestMode from "./TestMode.jsx";

import {useSelector, useDispatch} from "react-redux"; // Import Redux hooks

import {start, reset, character, space, backspace} from "../Text/textSlice.js";
import {generateRandomText} from "../../utils/functions.js";
import {setTyping} from "./testSlice.js";

const Test = ({}) => {
	const dispatch = useDispatch(); // Use dispatch from Redux
	const testState = useSelector((state) => state.test); // Select the test state
	const textState = useSelector((state) => state.text); // Select the mode state
	const [text, setText] = useState("");

	const [error, setError] = useState(null);
	const containerRef = useRef(null);

	const startTest = async () => {
		console.log("setText(): ", testState.mode);
		let text = "";
		if (testState.mode.type == "words") {
			text = generateRandomText(testState.mode.value);
		} else if (testState.mode.type == "time") {
			text = generateRandomText(20);
		} else if (testState.mode.type == "custom") {
			text = generateRandomText();
		}
		setText(text);
		dispatch(start(text));
		focus.current = true;
	};

	const resetTest = (e) => {
		dispatch(reset());
	};

	const handleKeyDown = (e) => {
		console.log("HandleKeyDown", e.key);
		if (e.key === "Escape") {
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
	};

	const handleClick = (e) => {
		console.log(e);
	};

	const handleMouseMove = () => {
		let timeOut;
		return (...args) => {
			clearTimeout(timeOut);
			timeOut = setTimeout(() => {
				console.log("MouseMoves");
				dispatch(setTyping(false));
			}, 300);
		};
	};
	useEffect(() => {
		startTest();

		window.addEventListener("mousemove", handleMouseMove());
		window.addEventListener("click", handleClick, {capture: true});
		window.addEventListener("keydown", handleKeyDown); // Attach the event listener
		return () => {
			window.removeEventListener("keydown", handleKeyDown); // Cleanup the event listener
			window.removeEventListener("click", handleClick, {capture: true});
		};
	}, []);

	// Start new test
	useEffect(() => {
		startTest();
	}, [testState.mode]);

	let display = null;
	if (!text) {
		display = null;
	} else if (textState.status == "notready") {
		display = <span>Loading...</span>;
	} else if (textState.status == "complete") {
		display = <TestResult startTest={startTest} resetTest={resetTest} />;
	} else {
		display = (
			<>
				<div className="stats-box">
					{textState.status == "uncomplete" ? <LiveStats /> : ""}
				</div>

				<Text
					focus={focus}
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
