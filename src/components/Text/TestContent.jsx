import React, {useRef, useLayoutEffect, memo, useEffect} from "react";
import Word from "./Word";
import {useSelector} from "react-redux";

const TestContent = memo(({state}, ref) => {
	const cursorType = useSelector((state) => state.settings.cursor);
	const testText = useRef(null);
	const cursor = useRef(null);
	const offset = useRef(0);

	const renderWord = (word, i) => {
		return (
			<Word
				word={word}
				key={i}
				done={state.index > i}
				typing={state.index === i}
				pending={state.index < i}
			/>
		);
	};

	useEffect(() => {
		if (state.status == "ready") {
			testText.current.style.transition = "";
			offset.current = 0;
			testText.current.style.transform = "";
			cursor.current.style.transform = "";
		} else {
			testText.current.style.transition =
				"transform var(--transition-mid) ease var(--transition-fast)";
		}
	}, [state.status]);

	useEffect(() => {
		cursor.current.classList.remove("blink");
		const next = document.querySelector(".current");
		if (!next) {
			return;
		}
		if (next.offsetTop < testText.current.offsetHeight - next.offsetHeight) {
			offset.current = next.offsetTop - next.offsetHeight;
		}

		testText.current.style.transform = `translateY(-${offset.current}px)`;

		const cursorX = next.offsetLeft;
		const cursorY = next.offsetTop;
		cursor.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
		// resets the blink animation state
		cursor.current.classList.add("blink");
	}, [state]);

	return (
		<div className={`testText `} ref={testText}>
			<span className={`cursor ${cursorType}`} ref={cursor}></span>
			{state.words.map(renderWord)}
		</div>
	);
});

export default TestContent;
