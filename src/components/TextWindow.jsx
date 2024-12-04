import {useEffect, useRef} from "react";
import Letter from "./Letter";

function TextWindow({text, nextInputIndex}) {
	const textWindowRef = useRef(null);
	const cursorRef = useRef(null);
	const renderText = (text) => {
		let index = 0;
		return text.split(" ").map((word, i) => {
			word += " ";
			return (
				<div className="word" key={i}>
					{word.split("").map((char, c) => {
						let className = "pending";
						if (index == nextInputIndex) className = "current";
						else if (index < nextInputIndex) className = "done";
						return (
							<Letter key={index++} character={char} className={className} />
						);
					})}
				</div>
			);
		});
	};

	useEffect(() => {
		if (textWindowRef.current && cursorRef.current) {
			cursorRef.current.classList.remove("blink");
			const {x, y} = textWindowRef.current.getBoundingClientRect();
			const {top, left} = textWindowRef.current
				.querySelector(".current")
				.getBoundingClientRect();
			cursorRef.current.style.top = `${top - y}px`;
			cursorRef.current.style.left = `${left - x}px`;
			cursorRef.current.classList.add("blink");
			console.log(top, left);
		}
	}, [nextInputIndex]);

	return (
		<div className="text-window" ref={textWindowRef}>
			<span className="cursor" ref={cursorRef}></span>
			{renderText(text + text + text + text)}
		</div>
	);
}

export default TextWindow;
