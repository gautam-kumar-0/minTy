import {useEffect, useRef} from "react";
import Letter from "./Letter";

function TextWindow({text, nextInputIndex, isWrongWord}) {
	const textWindowRef = useRef(null);
	const cursorRef = useRef(null);
	const textViewRef = useRef(null);
	const renderText = (text) => {
		let index = 0;
		return text.split(" ").map((word, i) => {
			word += " ";
			return (
				<div className="word" key={i}>
					{word.split("").map((char, c) => {
						let className = "pending";
						if (index == nextInputIndex) {
							className = "current";
							if (isWrongWord) className += " wrong";
						} else if (index < nextInputIndex) className = "done";
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

			const current = textWindowRef.current.querySelector(".current");

			const {top, left} = textWindowRef.current.getBoundingClientRect();

			const {x: viewX, y: viewY} = textViewRef.current.getBoundingClientRect();

			const {
				x: currentX,
				y: currentY,
				height: currentH,
			} = current.getBoundingClientRect();

			const cursorX = currentX - viewX;
			const cursorY = currentY - viewY;

			if (currentY - top > currentH * 3) {
				// todo adjust it so that cursor remains in middle
				const offsetH = viewY - currentY;
				textViewRef.current.style.translate = `0 ${offsetH}px`;
			}

			cursorRef.current.style.top = `${cursorY}px`;
			cursorRef.current.style.left = `${cursorX}px`;
			console.log("Window", top, left);
			console.log("View", viewY, viewX);
			console.log("current", currentY, currentX);
			console.log("cursor", cursorY, cursorX);
			cursorRef.current.classList.add("blink");
		}
	}, [nextInputIndex]);

	return (
		<div className="text-window" ref={textWindowRef}>
			<div className="textView" ref={textViewRef}>
				<span className="cursor" ref={cursorRef}></span>
				{renderText(text)}
			</div>
		</div>
	);
}

export default TextWindow;
