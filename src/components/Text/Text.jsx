import React, {useContext, useRef, useEffect, useState} from "react";
import "./Text.css";

import TestContent from "./TestContent.jsx"; // Import the new component
import {useDispatch, useSelector} from "react-redux";
import {printableCharacterPattern} from "../../utils/config.js";
import {setTyping} from "../Test/testSlice.js";
import {space, character, backspace} from "./textSlice.js";
import {BsCursorFill} from "react-icons/bs";
const Text = React.forwardRef((props, ref) => {
	const textState = useSelector((state) => state.text);
	const testState = useSelector((state) => state.test);
	const dispatch = useDispatch();
	const [children, setChildren] = useState(null);

	const [animation, setAnimation] = useState("");
	const testWindow = useRef(null);

	// Handle Input
	const handleKeyPress = (e) => {
		console.log("Handle Key Press", e);
		if (!(e.key == "Backspace" || printableCharacterPattern.test(e.key)))
			return;
		if (!testState.isTyping) dispatch(setTyping(true));
		if (e.key == "Backspace") {
			if (e.ctrlKey) {
				dispatch(backspace({ctrl: true, timeStamp: e.timeStamp}));
			} else {
				dispatch(backspace({timeStamp: e.timeStamp}));
			}
		} else if (e.key === " ") {
			dispatch(space({timeStamp: e.timeStamp, mode: testState.mode.type}));
		} else {
			dispatch(character({character: e.key, timeStamp: e.timeStamp}));
		}
	};

	// Handling Swapping of TestContent
	useEffect(() => {
		if (textState.status == "ready") {
			setAnimation("");
			setTimeout(() => {
				setAnimation("appear");
				setChildren(<TestContent state={textState} />);
				ref.current?.focus();
			}, 50);
		} else if (textState.status == "uncomplete")
			setChildren(<TestContent state={textState} />);
	}, [textState]);

	return (
		<div
			className="test-container "
			onKeyDown={handleKeyPress}
			tabIndex={0}
			ref={ref}
		>
			<div className="testBg">
				<div className={`testWindow ${animation}`} ref={testWindow}>
					{children}
				</div>
				<div className="overlay">
					<BsCursorFill />
					<span>Click here or press any key to focus</span>
				</div>
			</div>
		</div>
	);
});

export default Text;
