import React, {useState, useEffect, memo, useCallback} from "react";
import "./Keyboard.css";
import Row from "./Row";

import {convertToKey, keyArray} from "./config";

const Keyboard = memo(() => {
	const [activeKey, setActiveKey] = useState("");
	const [shifted, setShifted] = useState(false);

	const handleKeyDown = useCallback((e) => {
		setActiveKey(convertToKey(e));
		setShifted(e.shiftKey || e.getModifierState("CapsLock"));
	}, []);

	const handleKeyUp = useCallback((e) => {
		setActiveKey("");
		if (e.key === "Shift") setShifted(false);
	}, []);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [handleKeyDown, handleKeyUp]);

	return (
		<div className={`keyboard ${shifted ? "shifted" : ""}`}>
			{keyArray.map((row, index) => (
				<Row
					key={`row-${index + 1}`}
					keys={row}
					className={`row-${index + 1}`}
					activeKey={activeKey}
				/>
			))}
		</div>
	);
});

export default Keyboard;
