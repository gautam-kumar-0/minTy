import React, {useState} from "react";
import {useRef, useEffect} from "react";
import Keyboard from "../Keyboard/Keyboard";
import Text from "../Text/Text";
import "./Test.css";
import TestResult from "./TestResult.jsx";
import LiveStats from "./LiveStats.jsx";

import {useSelector, useDispatch} from "react-redux"; // Import Redux hooks

import {start, reset, completed} from "../Text/textSlice.js";
import {generateRandomText} from "../../utils/functions.js";
import {clearQuote, setTyping, useQuote} from "./testSlice.js";
import {useGetQuotesQuery} from "../../services/quotes.js";
import {TiWarning} from "react-icons/ti";
import NoticeBox from "../NoticeBox/NoticeBox.jsx";
import {FaArrowRotateRight} from "react-icons/fa6";
import useSound from "../../hooks/useSound.js";
import {useNavigate} from "react-router-dom";

const Test = ({}) => {
	const {keyboard, liveStats} = useSelector((state) => state.settings);
	const dispatch = useDispatch(); // Use dispatch from Redux
	const testState = useSelector((state) => state.test); // Select the test state
	const textState = useSelector((state) => state.text); // Select the mode state
	const soundRef = useSound();
	const modeRef = useRef(testState.mode);
	const {
		isLoading,
		refetch: refetchQuote,
		fulfilledTimeStamp,
	} = useGetQuotesQuery(
		testState.mode.type == "quote" ? testState.mode.value : "quotes"
	);

	const navigate = useNavigate();
	const [text, setText] = useState("");
	const containerRef = useRef(null);
	const textRef = useRef(null);

	const startTest = async () => {
		console.log("startTest", testState.mode, testState.quotes);
		let text = "";
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
			} else {
				await refetchQuote(testState.mode.value);
			}
		}
		setText(text);
		dispatch(start(text));
	};

	const resetTest = (e) => {
		dispatch(reset());
	};

	const playSound = () => {
		console.log(soundRef.current);
		if (!soundRef.current) return;
		if (!soundRef.current.paused) {
			soundRef.current.pause();
			soundRef.current.currentTime = 0;
		}
		soundRef.current.play();
	};

	const handleKeyDown = (e) => {
		console.log("HandleKeyDown, Intercept Shortcuts", e);
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
		// if you want to take input in any another element then set it onKeydown stopPropagation
	};

	const handleFocus = (e) => {
		// If element is not focus make it focus
		if (textRef.current && textRef.current != document.activeElement) {
			textRef.current.focus();
		}
	};

	const throttleMouseMove = () => {
		let isExecuted = false;
		return () => {
			if (isExecuted) return;
			dispatch(setTyping(false));
			isExecuted = true;
			setTimeout(() => (isExecuted = false), 2000);
		};
	};
	const handleMouseMove = throttleMouseMove();

	//When test is loaded
	useEffect(() => {
		startTest();

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("keydown", handleKeyDown, {capture: true});
		window.addEventListener("keydown", handleFocus); // Attach the event listener
		return () => {
			window.removeEventListener("keydown", handleKeyDown); // Cleanup the event listener
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	// Start new test whenever test mode is changed
	useEffect(() => {
		modeRef.current = testState.mode;
		startTest();
	}, [testState.mode]);

	useEffect(() => {
		if (!testState.isLoading) {
			startTest();
		}
	}, [testState.isLoading, fulfilledTimeStamp]);

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
					{liveStats && textState.status == "uncomplete" ? <LiveStats /> : ""}
				</div>

				<Text ref={textRef} />
				<div className="actions">
					<button
						tabIndex={1}
						className="action-button"
						onClick={() => resetTest()}
						data-action="Restart"
					>
						<FaArrowRotateRight />
					</button>
				</div>
				{keyboard && (
					<div className="keyboard-wrapper">
						<Keyboard />
					</div>
				)}
			</>
		);
	}
	return (
		<div className={`main ${focus ? "focus" : "blur"}`} ref={containerRef}>
			{testState.error && testState.mode.type == "quote" && (
				<NoticeBox
					className="error"
					onClick={refetchQuote}
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

			{display}
		</div>
	);
};

export default Test;
