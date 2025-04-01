import React from "react";
import "./NoticeBox.css";

const NoticeBox = ({children, color, className, ...rest}) => {
	const boxStyle = {
		border: `2px solid ${color}`,
		color: `color-mix(in srgb, ${color} 20%, var(--primary-foreground))`,
		backgroundColor: `color-mix(in srgb, ${color} 20%, var(--primary-background))`,
	};

	return (
		<div className={`notice-box ${className}`} style={boxStyle} {...rest}>
			{children}
		</div>
	);
};

export default NoticeBox;
