import React, {useRef, useEffect, useState} from "react";
import "./Text.css";

import TestContent from "./TestContent.jsx"; // Import the new component
import {useDispatch, useSelector} from "react-redux";
import {printableCharacterPattern} from "../../utils/config.js";
import {setTyping} from "../Test/testSlice.js";
import {space, character, backspace} from "./textSlice.js";
import {BsCursorFill} from "react-icons/bs";

const Text = React.forwardRef((props, ref) => {
	const {freedom} = useSelector((state) => state.settings);
	const textState = useSelector((state) => state.text);
	const testState = useSelector((state) => state.test);
	const dispatch = useDispatch();
	const [children, setChildren] = useState(null);

	const [animation, setAnimation] = useState("");
	const testWindow = useRef(null);

	// Handle Input
	const handleKeyPress = (e) => {
		if (!(e.key == "Backspace" || printableCharacterPattern.test(e.key)))
			return;
		if (!testState.isTyping) dispatch(setTyping(true));
		if (e.key == "Backspace") {
			if (e.ctrlKey) {
				dispatch(backspace({ctrl: true, timeStamp: e.timeStamp, freedom}));
			} else {
				dispatch(backspace({timeStamp: e.timeStamp, freedom}));
			}
		} else if (e.key === " ") {
			dispatch(
				space({
					timeStamp: e.timeStamp,
					mode: testState.mode,
				})
			);
		} else {
			dispatch(character({character: e.key, timeStamp: e.timeStamp}));
		}
	};

	// Handling Swapping of TestContent
	useEffect(() => {
		if (textState.status == "ready") {
			setAnimation("");
			setTimeout(() => {
				ref.current?.focus();
				setAnimation("appear");
				setChildren(<TestContent state={textState} />);
			}, 50);
		} else if (textState.status == "uncomplete")
			setChildren(<TestContent state={textState} />);
	}, [textState.status, textState.words]);

	useEffect(() => {
		ref.current?.focus();
	}, []);

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
