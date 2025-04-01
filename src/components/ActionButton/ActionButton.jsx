import React from "react";
import styles from "./ActionButton.module.css";
export const ActionButton = ({action, onClick, className = "", children}) => {
	return (
		<button
			className={`${styles["action-button"]} ${className}`}
			onClick={onClick}
			data-action={action}
		>
			{children}
		</button>
	);
};
