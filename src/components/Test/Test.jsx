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
import {clearQuote, setTyping, useQuote} from "./testSlice.js";
import {useGetQuotesQuery} from "../../services/quotes.js";
import {TiWarning} from "react-icons/ti";
import NoticeBox from "../NoticeBox/NoticeBox.jsx";

const Test = ({}) => {
	const dispatch = useDispatch(); // Use dispatch from Redux
	const testState = useSelector((state) => state.test); // Select the test state
	const textState = useSelector((state) => state.text); // Select the mode state

	const {isLoading, refetch: refetchQuote} = useGetQuotesQuery(
		testState.mode.type == "quote" ? testState.mode.value : "quotes"
	);

	const [text, setText] = useState("");
	const containerRef = useRef(null);
	const textRef = useRef(null);

	const previousQuoteValue = useRef(testState.mode.value);

	const startTest = async () => {
		console.log("setText(): ", testState.mode);
		let text = "";
		if (testState.mode.type == "words") {
			text = generateRandomText(testState.mode.value);
		} else if (testState.mode.type == "time") {
			text = generateRandomText(50);
		} else if (testState.mode.type == "custom") {
			text = generateRandomText();
		} else if (testState.mode.type == "quote") {
			if (testState.quotes.length) {
				text = testState.quotes[testState.quotes.length - 1].text;
				dispatch(useQuote());
			} else {
				refetchQuote(testState.mode.value);
			}
		}
		setText(text);
		dispatch(start(text));
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
			if (e.key == "Enter") {
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
		if (textRef.current && textRef.current != document.activeElement) {
			textRef.current.focus();
		}
	};

	const throttleMouseMove = () => {
		let isExecuted = false;
		return (...args) => {
			if (isExecuted) return;
			console.log("MouseMove Throttle");
			if (testState.isTyping) dispatch(setTyping(false));
			isExecuted = true;
			setTimeout(() => (isExecuted = false), 2000);
		};
	};
	const handleMouseMove = throttleMouseMove();
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
		if (testState.mode.type == "quote") {
			if (previousQuoteValue.current !== testState.mode.value) {
				refetchQuote(testState.mode.value);
			} else {
				previousQuoteValue.current = testState.mode.value;
			}
		}
		startTest();
	}, [testState.mode]);

	useEffect(() => {
		if (testState.quotes.length) startTest();
	}, [testState.quotes]);
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

				<Text ref={textRef} />
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
			{testState.error && testState.mode.type == "quote" && (
				<NoticeBox className="error" onClick={refetchQuote} color={"red"}>
					<div>
						<TiWarning />
						<span>{testState.error}</span>
					</div>
					<span className="small">Click to reload</span>
				</NoticeBox>
			)}
			{testState.isLoading && testState.mode.type == "quote" && (
				<NoticeBox className="loading" color={"#0ff1ce"}>
					<div>
						<div className="spin"></div>
						<span>Loading Quotes</span>
					</div>
				</NoticeBox>
			)}

			{display}
		</div>
	);
};

export default Test;
