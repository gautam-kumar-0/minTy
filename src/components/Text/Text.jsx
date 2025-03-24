import React, {
	useContext,
	useRef,
	useEffect,
	useState,
	useLayoutEffect,
} from "react";
import "./Text.css";
import {TestContext} from "../context/TestContextProvider";
import TestContent from "./TestContent.jsx"; // Import the new component

const Text = ({}) => {
	const state = useContext(TestContext);
	const [children, setChildren] = useState(null);
	const [currentText, setCurrentText] = useState(state.text);
	const [fade, setFade] = useState("out");
	const testWindow = useRef(null);
	const testContentRef = useRef(null); // Ref for the TestContent component

	useEffect(() => {
		setFade("out");
		setTimeout(() => {
			setChildren(
				<TestContent fade={fade} ref={testContentRef} state={state} />
			);
			setFade("in");
		}, 200);
	}, [currentText]);

	useEffect(() => {
		if (currentText == state.text)
			setChildren(
				<TestContent fade={fade} ref={testContentRef} state={state} />
			);
		else setCurrentText(state.text);
	}, [state]);

	return (
		<div className="test-container">
			<div className={`testWindow ${fade}`} ref={testWindow}>
				{children}
				{/* Use the new component */}
			</div>
		</div>
	);
};

export default Text;
