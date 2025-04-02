import React, {useCallback, useState} from "react";
import {useRef, useEffect} from "react";
import Keyboard from "../../components/Keyboard/Keyboard.jsx";
import Text from "../Text/Text";
import "./Test.css";
import TestResult from "./TestResult.jsx";
import TestStats from "./TestStats.jsx";
import {useSelector, useDispatch} from "react-redux"; // Import Redux hooks

import {start, reset, completed} from "../Text/textSlice.js";
import {generateRandomText, throttle} from "../../utils/functions.js";
import {setTyping, useQuote} from "./testSlice.js";
import {useLazyGetQuotesQuery} from "../../services/quotes.js";
import {TiWarning} from "react-icons/ti";
import NoticeBox from "../../components/NoticeBox/NoticeBox.jsx";
import {FaArrowRotateRight} from "react-icons/fa6";
import useSound from "../../hooks/useSound.js";
import {useNavigate} from "react-router-dom";
import {ActionButton} from "../../components/ActionButton/ActionButton.jsx";

const Test = ({}) => {
	const {keyboard} = useSelector((state) => state.settings);
	const testState = useSelector((state) => state.test);
	const textState = useSelector((state) => state.text);
	const dispatch = useDispatch();
	const playSound = useSound();
	const navigate = useNavigate();

	const [fetchQuotes, {isFetching}] = useLazyGetQuotesQuery();

	const modeRef = useRef(testState.mode);
	const containerRef = useRef(null);
	const textRef = useRef(null);

	const startTest = useCallback(() => {
		let text = [];
		if (testState.mode.type == "words") {
			text = generateRandomText(
				testState.mode.value != Infinity ? testState.mode.value : 100
			);
		} else if (testState.mode.type == "time") {
			text = generateRandomText(50);
		} else if (testState.mode.type == "custom") {
			text = generateRandomText();
		} else if (testState.mode.type == "quote") {
			if (testState.quotes.length) {
				text = testState.quotes[testState.quotes.length - 1].text.split(" ");
				dispatch(useQuote());
			}
		}
		if (text) {
			dispatch(start(text));
		}
	}, [testState]);

	const resetTest = useCallback((e) => {
		dispatch(reset());
	}, []);

	const handleKeyDown = useCallback((e) => {
		if (e.repeat) return;
		playSound();
		if (e.key === "Escape") {
			if (Number(modeRef.current.value) == Infinity) dispatch(completed());
			else textRef.current.blur();
			e.stopPropagation();
		} else if (e.ctrlKey) {
			if (e.key == "Enter") {
				startTest();
			} else if (e.key == "ArrowLeft") {
				resetTest();
			} else if (e.key == "i") {
				navigate("/setting");
			}
			if (e.key != "Backspace") e.stopPropagation();
		}
		// disable space scrolling
		if (e.key == " ") e.preventDefault();
	}, []);

	const handleFocus = useCallback(() => {
		// If element is not focus make it focus
		if (textRef.current && textRef.current != document.activeElement) {
			textRef.current.focus();
		}
	}, []);

	const handleMouseMove = throttle(() => dispatch(setTyping(false)), 2000);

	//When test is loaded
	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("keydown", handleKeyDown, {capture: true});
		window.addEventListener("keydown", handleFocus); // Attach the event listener
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("keydown", handleKeyDown); // Cleanup the event listener
			window.removeEventListener("keydown", handleFocus); // Attach the event listener
		};
	}, []);

	// Start new test whenever test mode is changed
	useEffect(() => {
		modeRef.current = testState.mode;
		startTest();
	}, [testState.mode]);

	useEffect(() => {
		if (testState.shouldFetch) fetchQuotes(modeRef.current.value);
	}, [testState.shouldFetch]);

	// Start the test after fetching
	useEffect(() => {
		if (!isFetching && modeRef.current.type == "quote") startTest();
	}, [isFetching]);

	return (
		<div className={`main ${focus ? "focus" : "blur"}`} ref={containerRef}>
			{testState.error && testState.mode.type == "quote" && (
				<NoticeBox
					className="error"
					onClick={fetchQuotes(testState.mode.value)}
					color={"var(--warn)"}
				>
					<div>
						<TiWarning />
						<span>{testState.error}</span>
					</div>
					<span className="small">Click to reload</span>
				</NoticeBox>
			)}

			{testState.isLoading && testState.mode.type == "quote" && (
				<NoticeBox className="loading" color={"var(--accent-color)"}>
					<div>
						<div className="spin"></div>
						<span>Loading Quotes</span>
					</div>
				</NoticeBox>
			)}

			{(textState.status == "uncomplete" || textState.status == "ready") && (
				<>
					<div className="stats-box">
						{textState.status == "uncomplete" ? <TestStats /> : ""}
					</div>
					<Text ref={textRef} />
					<div className="actions">
						<ActionButton onClick={() => startTest()} action="New Test">
							<FaArrowRotateRight />
						</ActionButton>
					</div>

					{keyboard && (
						<div className="keyboard-wrapper">
							<Keyboard />
						</div>
					)}
				</>
			)}

			{textState.status == "complete" && (
				<TestResult startTest={startTest} resetTest={resetTest} />
			)}

			<div className="shortcuts">
				<div>
					<span>
						<code>ctrl</code> + <code>enter</code>
					</span>
					<span>New Test</span>
				</div>
				<div>
					<span>
						<code>ctrl</code> + <code>left</code>
					</span>
					<span>Restart</span>
				</div>
			</div>
		</div>
	);
};

export default Test;
