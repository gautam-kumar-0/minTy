import React, {useContext, useRef, useEffect, useState} from "react";
import "./Text.css";
import {TestContext} from "../context/TestContextProvider";
import TestContent from "./TestContent.jsx"; // Import the new component

const Text = ({}) => {
	const state = useContext(TestContext);
	const [children, setChildren] = useState(null);
	// const [currentText, setCurrentText] = useState(state.text);
	const [fade, setFade] = useState("out");
	const testWindow = useRef(null);

	useEffect(() => {
		if (state.status == "ready") {
			setFade("out");
			setTimeout(() => {
				setChildren(<TestContent state={state} />);
				setFade("in");
			}, 150);
		} else if (state.status == "uncomplete")
			setChildren(<TestContent state={state} />);
	}, [state]);

	return (
		<div className="test-container">
			<div className={`testWindow ${fade}`} ref={testWindow}>
				{children}
			</div>
		</div>
	);
};

export default Text;
