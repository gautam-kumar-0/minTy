import React from "react";
import "./Fadable.css";
import {useSelector} from "react-redux";

const Fadable = ({className = "", children, ...restProps}) => {
	const isTyping = useSelector((state) => state.test.isTyping);
	const focusClass = isTyping ? "focus" : "";

	return (
		<div className={`fadable ${focusClass} ${className}`} {...restProps}>
			{children}
		</div>
	);
};

export default Fadable;
