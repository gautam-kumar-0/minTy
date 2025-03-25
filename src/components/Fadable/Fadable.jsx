import React from "react";
import "./Fadable.css";
const Fadable = ({className, children, ...restProps}) => {
	const focus = false ? "focus" : " ";
	return (
		<div className={`${focus} ${className || ""} fadable`} {...restProps}>
			{children}
		</div>
	);
};

export default Fadable;
