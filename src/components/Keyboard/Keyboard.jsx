import React, {useState, useEffect, useMemo, useCallback} from "react";
import "./Keyboard.css";
import Row from "./Row";

import {convertToKey, keyArray} from "./config";
const initialKey = {row: -1, index: 0};

const Keyboard = () => {
	const [activeKey, setActiveKey] = useState(initialKey);
	const [shifted, setShifted] = useState(false);

	// useCallback doesn't create the function every re-render
	const handleKeyDown = useCallback((e) => {
		const key = convertToKey(e);
		for (let i = 0; i < keyArray.length; i++) {
			const j = keyArray[i].indexOf(key);
			if (j !== -1) {
				setActiveKey({row: i, index: j});
			}
		}

		setShifted(e.shiftKey || e.getModifierState("CapsLock"));
	}, []);

	const handleKeyUp = useCallback((e) => {
		setActiveKey(initialKey);
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
					key={index}
					keys={row}
					className={`row-${index + 1}`}
					activeKey={index == activeKey.row ? activeKey.index : null}
				/>
			))}
		</div>
	);
};

export default Keyboard;
