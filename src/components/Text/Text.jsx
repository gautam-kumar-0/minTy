import React, {
	useContext,
	useRef,
	useEffect,
	useState,
	useLayoutEffect,
} from "react";
import Word from "./Word";
import "./Text.css";
import {TestContext} from "../context/TestContextProvider";

const Text = ({}) => {
	const state = useContext(TestContext);
	const [children, setChildren] = useState(null);
	const [fade, setFade] = useState("in"); // Initialize with "in" for initial fade-in
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

	const offset = useRef(0);
	const testWindow = useRef(null);
	const testText = useRef(null);
	const cursor = useRef(null);

	// update cursor
	useEffect(() => {
		setChildren(state.words.map(renderWord));
	}, [state.words]);

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

		testText.current.style.transform = `translateY(-${offset.current}px)`; // Use transform for smoother animation

		const cursorX = next.offsetLeft;
		const cursorY = next.offsetTop;
		cursor.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`; // Use transform for smoother animation
	}, [state]);

	useEffect(() => {
		setFade("out");
		setTimeout(() => {
			setChildren(state.words.map(renderWord));
			setFade("in");
		}, 200);
	}, [state.text]);

	return (
		<div className="test-container">
			<div className={`testWindow ${fade}`} ref={testWindow}>
				<div className="testText" ref={testText}>
					<span className="cursor" ref={cursor}></span>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Text;
