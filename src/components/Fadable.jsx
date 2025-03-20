import React from "react";
import useTestContext from "../hooks/useTestContext";
import "./Fadable.css";
const Fadable = ({className, children, ...restProps}) => {
	const [state] = useTestContext();
	const focus = state.focus ? "focus" : " ";
	return (
		<div className={`${focus} ${className || ""} fadable`} {...restProps}>
			{children}
		</div>
	);
};

export default Fadable;
