import React, {useState} from "react";
import {useRef, useEffect} from "react";
import Keyboard from "../Keyboard/Keyboard";
import Text from "../Text/Text";
import "./Test.css";
import TestResult from "./TestResult.jsx";
import LiveStats from "./LiveStats.jsx";
import {RiRestartLine} from "react-icons/ri";

import {useSelector, useDispatch} from "react-redux"; // Import Redux hooks

import {start, reset} from "../Text/textSlice.js";
import {generateRandomText} from "../../utils/functions.js";
import {setTyping} from "./testSlice.js";
import {useGetQuoteQuery} from "../../services/quotes.js";

const Test = ({}) => {
	const dispatch = useDispatch(); // Use dispatch from Redux
	const testState = useSelector((state) => state.test); // Select the test state
	const textState = useSelector((state) => state.text); // Select the mode state

	const {
		data: quoteData,
		error: quoteError,
		isLoading: isQuoteLoading,
		refetch: refetchQuote,
	} = useGetQuoteQuery({
		skip: !(testState.mode.type === "quote" && testState.mode.fetchFromApi),
	});

	const [text, setText] = useState("");

	const [error, setError] = useState(null);
	const containerRef = useRef(null);
	const textRef = useRef(null);

	const startTest = async () => {
		console.log("setText(): ", testState.mode);
		let text = "";
		if (testState.mode.type == "words") {
			text = generateRandomText(testState.mode.value);
		} else if (testState.mode.type == "time") {
			text = generateRandomText(20);
		} else if (testState.mode.type == "custom") {
			text = generateRandomText();
		} else if (testState.mode.type == "quote") {
			text = quoteData ? quoteData[0].text : "";
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
		// if you want to take input in any another element then set it onKeydown stopPropagation
		if (textRef.current != document.activeElement) {
			textRef.current.focus();
		}
	};

	const debounceMouseMove = () => {
		let timeOut;
		return (...args) => {
			clearTimeout(timeOut);
			timeOut = setTimeout(() => {
				console.log("MouseMoves");
				dispatch(setTyping(false));
			}, 300);
		};
	};
	const handleMouseMove = debounceMouseMove();
	useEffect(() => {
		startTest();

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("keydown", handleKeyDown); // Attach the event listener
		return () => {
			window.removeEventListener("keydown", handleKeyDown); // Cleanup the event listener
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	// Start new test
	useEffect(() => {
		startTest();
		setError("");
	}, [testState.mode]);

	useEffect(() => {
		console.log("QuoteError", quoteError);
		if (quoteError) setError(quoteError.status);
	}, [quoteError]);

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
					ref={textRef}
					focus={focus}
					details={error ? error : "Click or press any key to start"}
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
					<span>{error}</span>{" "}
					<button className="action-button" onClick={() => refetchQuote()}>
						Reload
					</button>
				</div>
			)}

			{display}
		</div>
	);
};

export default Test;
