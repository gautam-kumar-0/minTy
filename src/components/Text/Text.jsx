import React, {useEffect} from "react";
import Word from "./Word";
import {useState, useRef} from "react";
import "./Text.css";
let testText =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam iste fuga soluta, amet quasi eveniet consequuntur minima fugit, placeat modi enim velit autem sunt numquam. Quaerat quas minus placeat aut cum laudantium beatae pariatur, architecto aliquam omnis molestiae amet odit magnam quo et, perspiciatis debitis mollitia quis adipisci laboriosam illum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa id quisquam dolor.";
const wordArray = testText.split(" ").map((w) => ({original: w, typed: ""}));

const Text = ({}) => {
	const [state, setState] = useState(wordArray);
	const addToCurrentWord = (letter) => {
		setState((prev) => {
			let temp = prev[index.current];
			if (temp.typed.length < temp.original.length + 5)
				prev[index.current] = {
					...prev[index.current],
					typed: prev[index.current].typed + letter,
				};
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
				if (state[index.current].typed.length > 0) {
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

	useEffect(() => {
		const current = document.querySelector(".current");
		if (!current) {
			return;
		}
		const testWindow = document.querySelector(".testWindow");
		const testText = document.querySelector(".testText");
		const testH = testWindow.offsetHeight;
		const cursor = document.querySelector(".cursor");

		if (current.offsetTop > testH / 2 - 10) {
			testText.style.translate = `0 calc(-${
				current.offsetTop - current.offsetHeight
			}px - 1ch)`;
		}
		const cursorX = current.offsetLeft;
		const cursorY = current.offsetTop;
		console.dir(current);

		cursor.style.translate = `${cursorX}px ${cursorY}px`;
	}, [state]);
	return (
		<div className="testWindow">
			<span className="cursor"></span>
			<div className="testText">{state.map(renderWord)}</div>;
		</div>
	);
};

export default Text;
