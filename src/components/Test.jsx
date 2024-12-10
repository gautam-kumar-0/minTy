import React from "react";
import TextWindow from "./TextWindow/TextWindow";
import Keyboard from "./Keyboard/Keyboard";
import {useState, useRef, useEffect} from "react";
import "./Test.css";

const Test = () => {
	const {stop, insert, freedom} = {stop: false, insert: true, freedom: true};
	const text =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis labore magnam maxime rem! Velit aliquam doloribus quaerat accusamus recusandae dignissimos. Lorem ipsum consectetur adipisicing dolorum ad ratione nulla obcaecati explicabo eligendi. Possimus adipisci assumenda fugit harum iure qui neque obcaecati";

	const originalTextArr = [...text];
	const [inputText, setInputText] = useState("");
	const inputRef = useRef(null);
	const [averageWpm, setAverageWpm] = useState(0);
	const [liveWpm, setliveWpm] = useState(0);
	const [timestamps, setTimestamps] = useState([]);
	let indexStopMatch = 0;

	useEffect(() => {
		const handleKeyPress = (e) => {
			if (document.activeElement !== inputRef.current) {
				inputRef.current.focus();
				e.preventDefault();
				return;
			}

			if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
				e.preventDefault();
				return;
			}
			// todo write code to handle The shortcut keys
			// help stop too many wrong entry;
			if (e.key !== "Backspace") {
				indexStopMatch = originalTextArr.findIndex(
					(c, i) => inputText[i] !== c
				);
				let i;
				for (i = indexStopMatch; i > 0; i--) {
					if (originalTextArr[i] === " ") break;
				}

				if (inputText.length - indexStopMatch > 7) {
					e.preventDefault();
				}
			}
		};

		window.addEventListener("keydown", handleKeyPress, true);
		return () => {
			window.removeEventListener("keydown", handleKeyPress, true);
		};
	}, [inputText]);

	function handlePasteCapture(e) {
		e.preventDefault();
	}

	function calculateWpm() {
		if (timestamps.length == 0) return;
		const length = timestamps.length;
		const elapsed = timestamps[length - 1] - timestamps[0];
		const averageTime = elapsed / length;
		const averageWpm = Math.round(12000 / averageTime);

		const before = Math.min(length, 5);
		const live = timestamps[length - 1] - timestamps[length - before];
		const liveWpm = Math.round(12000 / (live / (before - 1)));
		console.log("timestamps", timestamps);
		console.log("elapsed", elapsed);
		console.log("averageTime", averageTime);
		console.log("averageWpm", averageWpm);
		console.log("liveWpm", liveWpm);
		setAverageWpm(averageWpm);
		setliveWpm(liveWpm);
	}

	function handleInput(e) {
		console.log("Event", e);
		setTimestamps([...timestamps, e.timeStamp]);
		setInputText(e.currentTarget.value);
		if (e.nativeEvent.data) calculateWpm();
	}

	return (
		<div className="main">
			<input
				className="inputText"
				type="text"
				onChange={handleInput}
				value={inputText}
				ref={inputRef}
				onPasteCapture={handlePasteCapture}
			/>
			<TextWindow
				text={text}
				inputText={inputText}
				insert={insert}
				inputRef={inputRef}
			/>
			<Keyboard
				text={text}
				inputText={inputText}
				setInputText={setInputText}
				insert={insert}
				stop={stop}
			/>
			<div className="live-wpm">{liveWpm}</div>
			<div className="accuracy"></div>
			<div className="average-wpm">{averageWpm}</div>
		</div>
	);
};

export default Test;
