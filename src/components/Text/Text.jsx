import React, {useContext} from "react";
import Word from "./Word";
import {useRef, useLayoutEffect} from "react";
import "./Text.css";
import {TestContext} from "../context/TestContextProvider";

const Text = ({}) => {
	const state = useContext(TestContext);

	const renderWord = (word, i) => {
		return (
			<Word
				word={word}
				key={i}
				done={state.index > i}
				typing={state.index == i}
				pending={state.index < i}
			/>
		);
	};

	const offset = useRef(0);
	const testWindow = useRef(null);
	const testText = useRef(null);
	const cursor = useRef(null);

	useLayoutEffect(() => {
		const next = document.querySelector(".current");
		if (!next) {
			return;
		}
		if (
			next.offsetTop <
			testText.current.offsetHeight - 2 * next.offsetHeight
		) {
			offset.current = next.offsetTop - next.offsetHeight;
		}

		testText.current.style.translate = ` 0 -${offset.current}px`;

		const cursorX = next.offsetLeft;
		const cursorY = next.offsetTop;
		cursor.current.style.translate = `${cursorX}px ${cursorY}px`;
	}, [state]);

	return (
		<div className="test-container">
			<div className="testWindow" ref={testWindow}>
				<div className="testText" ref={testText}>
					<span className="cursor" ref={cursor}></span>
					{state.words.map(renderWord)}
				</div>
			</div>
		</div>
	);
};

export default Text;
