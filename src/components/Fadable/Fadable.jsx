import React from "react";
import "./Fadable.css";
import {useSelector} from "react-redux";
const Fadable = ({className, children, ...restProps}) => {
	const isTyping = useSelector((state) => state.test.isTyping);
	const focus = isTyping ? "focus" : " ";
	console.log("FADABLE", isTyping);
	return (
		<div className={`${focus} ${className || ""} fadable`} {...restProps}>
			{children}
		</div>
	);
};

export default Fadable;
