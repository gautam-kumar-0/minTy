import React, {useRef, useLayoutEffect, useContext, useEffect} from "react";
import Word from "./Word";

const TestContent = React.forwardRef(({state}, ref) => {
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

		testText.current.style.transform = `translateY(-${offset.current}px)`;

		const cursorX = next.offsetLeft;
		const cursorY = next.offsetTop;
		cursor.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
	}, [state]);

	return (
		<div className={`testText `} ref={testText}>
			<span className="cursor" ref={cursor}></span>
			{state.words.map(renderWord)}
		</div>
	);
});

export default TestContent;
