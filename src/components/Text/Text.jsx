import React, {useEffect} from "react";
import Word from "./Word";
import {useState, useRef} from "react";
import "./Text.css";
let testText =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam iste fuga soluta, amet quasi eveniet consequuntur minima fugit, placeat modi enim velit autem sunt numquam. Quaerat quas minus placeat aut cum laudantium beatae pariatur, architecto aliquam omnis molestiae amet odit magnam quo et, perspiciatis debitis mollitia quis adipisci laboriosam illum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa id quisquam dolor.";
const wordArray = testText.split(" ").map((w) => ({original: w, typed: ""}));

const Text = ({}) => {
	const [state, setState] = useState(wordArray);
	const [completed, setCompleted] = useState(false);
	const addToCurrentWord = (letter) => {
		setState((prev) => {
			let temp = prev[index.current];
			if (temp.typed.length < temp.original.length + 5)
				prev[index.current] = {
					...prev[index.current],
					typed: prev[index.current].typed + letter,
				};
			if (
				index.current == wordArray.length - 1 &&
				prev[index.current].original == prev[index.current].typed
			) {
				setCompleted(true);
			}
			return [...prev];
		});
	};
	const popFromCurrentWord = () => {
		setState((prev) => {
			if (prev[index.current].typed)
				prev[index.current] = {
					...prev[index.current],
					typed: prev[index.current].typed.slice(0, -1),
				};
			else
				index.current = index.current > 0 ? index.current - 1 : index.current;
			return [...prev];
		});
	};
	const resetCurrentWord = () => {
		setState((prev) => {
			if (prev[index.current].typed)
				prev[index.current] = {
					...prev[index.current],
					typed: "",
				};
			else
				index.current = index.current > 0 ? index.current - 1 : index.current;
			return [...prev];
		});
	};

	const index = useRef(0);
	const renderWord = (word, i) => {
		return (
			<Word
				word={word}
				key={i}
				done={index.current > i}
				typing={index.current == i}
				pending={index.current < i}
			/>
		);
	};
	useEffect(() => {
		const handleKeyPress = (e) => {
			console.log(e.key, index.current, state[index.current], state);

			if (e.key == "Backspace") {
				if (e.ctrlKey) {
					resetCurrentWord();
				} else {
					popFromCurrentWord();
				}
			} else if (e.key === " ") {
				if (index.current == wordArray.length - 1) {
					setCompleted(true);
				} else if (state[index.current].typed.length > 0) {
					index.current = index.current + 1;
					setState((prev) => [...prev]);
				}
			} else {
				console.log("ADD", e.key);
				addToCurrentWord(e.key);
			}
		};
		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [state]);

	const offset = useRef(0);
	const testWindow = useRef(null);
	const testText = useRef(null);
	const cursor = useRef(null);

	useEffect(() => {
		const next = document.querySelector(".current");
		if (!next) {
			return;
		}
		const testH = testWindow.current.offsetHeight;
		// const data = [
		// 	{property: "current.offsetTop", value: next.offsetTop},
		// 	{property: "current.offsetHeight", value: next.offsetHeight},
		// 	{property: "offset.current", value: offset.current},
		// 	{
		// 		property: "condition",
		// 		value:
		// 			Math.abs(next.offsetTop - offset.current) > next.offsetHeight - 5,
		// 	},
		// ];

		// console.table(data);

		if (
			next.offsetTop <
				testText.current.offsetHeight - testH + 2 * next.offsetHeight &&
			Math.abs(next.offsetTop - offset.current) > next.offsetHeight - 5
		) {
			offset.current += next.offsetTop - offset.current - next.offsetHeight;
			// console.log("After update", offset.current);
		}

		// console.log("No update");
		testText.current.style.translate = ` 0 -${offset.current}px`;

		const cursorX = next.offsetLeft;
		const cursorY = next.offsetTop;
		// console.dir(next);

		cursor.current.style.translate = `${cursorX}px ${cursorY}px`;
	}, [state]);
	return !completed ? (
		<div className="testWindow" ref={testWindow}>
			<div className="testText" ref={testText}>
				<span className="cursor" ref={cursor}></span>
				{state.map(renderWord)}
			</div>
		</div>
	) : (
		<h1>Result</h1>
	);
};

export default Text;
