import React, {useContext, useRef, useEffect, useState} from "react";
import "./Text.css";

import TestContent from "./TestContent.jsx"; // Import the new component
import {useSelector} from "react-redux";
const Text = ({focus, setFocus, details}) => {
	const state = useSelector((state) => state.test);
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
		<div
			className="test-container "
			onClick={() => setFocus(true)}
			data-details={details}
		>
			<div className={`testWindow ${fade}`} ref={testWindow}>
				{children}
			</div>
		</div>
	);
};

export default Text;
