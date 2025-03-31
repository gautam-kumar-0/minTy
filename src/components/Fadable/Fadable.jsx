import React, {memo} from "react";
import PropTypes from "prop-types";
import "./Fadable.css";
import {useSelector} from "react-redux";

const Fadable = memo(({className = "", children, ...restProps}) => {
	const isTyping = useSelector((state) => state.test.isTyping);
	const focusClass = isTyping ? "focus" : "";

	return (
		<div className={`fadable ${focusClass} ${className}`} {...restProps}>
			{children}
		</div>
	);
});

Fadable.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Fadable;
