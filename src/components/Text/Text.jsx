import React, {useContext, useRef, useEffect, useState} from "react";
import "./Text.css";
import TestContent from "./TestContent.jsx"; // Import the new component
import useTestSelector from "../../hooks/useTestSelector.js";
const Text = ({}) => {
	const [state] = useTestSelector();
	const [children, setChildren] = useState(null);

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
