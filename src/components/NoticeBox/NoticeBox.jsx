import React from "react";
import chroma from "chroma-js";
import "./NoticeBox.css";
const DEFAULT_COLOR = "#ccc"; // Define a generic fallback color

const NoticeBox = ({children, color, className, ...rest}) => {
	let baseColor;
	try {
		baseColor = chroma(color);
	} catch (error) {
		console.warn(
			"Invalid color format:",
			error,
			"using default color:",
			DEFAULT_COLOR
		);
		baseColor = chroma(DEFAULT_COLOR);
	}

	// Border color is the received or default color
	const borderColor = baseColor.hex();

	// Text color is a very light version (almost white)
	const textColor = baseColor.luminance(0.85).hex(); // Adjust brighten and saturate as needed

	// Background color is a transparent (alpha 0.2) darker version
	const darkerColor = baseColor.darken(0.6); // Adjust darken amount as needed
	const backgroundColor = darkerColor.alpha(0.2).css(); // Use css() to get rgba format

	const boxStyle = {
		border: `2px solid ${borderColor}`,
		color: textColor,
		backgroundColor: backgroundColor,
	};

	return (
		<div className={`notice-box ${className}`} style={boxStyle} {...rest}>
			{children}
		</div>
	);
};

export default NoticeBox;
