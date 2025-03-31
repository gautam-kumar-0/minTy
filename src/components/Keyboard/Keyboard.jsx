import React, {useState, useEffect, memo} from "react";
import "./Keyboard.css";
import Row from "./Row";

import {convertToKey, keyArray} from "./config";

const Keyboard = () => {
	const [activeKey, setActiveKey] = useState("");
	const [shifted, setShifted] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e) => {
			setActiveKey(convertToKey(e));
			setShifted(e.shiftKey || e.getModifierState("CapsLock"));
		};

		const handleKeyUp = (e) => {
			setActiveKey("");
			if (e.key == "Shift") setShifted(false);
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	return (
		<div className={`keyboard ${shifted ? "shifted" : ""}`}>
			<Row keys={keyArray[0]} className={`row-1`} activeKey={activeKey} />
			<Row keys={keyArray[1]} className={`row-2`} activeKey={activeKey} />
			<Row keys={keyArray[2]} className={`row-3`} activeKey={activeKey} />
			<Row keys={keyArray[3]} className={`row-4`} activeKey={activeKey} />
		</div>
	);
};

export default Keyboard;
