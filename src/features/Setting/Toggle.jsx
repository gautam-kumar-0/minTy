import React from "react";
import styles from "./Toggle.module.css";

function Toggle({label, value, onChange, description}) {
	return (
		<div className={styles.toggleContainer}>
			<div className={styles.labelContainer}>
				<label className={styles.label}>{label}</label>
				{description && <p className={styles.description}>{description}</p>}
			</div>
			<div
				className={`${styles.toggle} ${value ? styles.active : ""}`}
				onClick={() => onChange(!value)}
				role="button"
				tabIndex={0}
				onKeyPress={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						onChange(!value);
					}
				}}
			>
				<div className={styles.toggleButton} />
			</div>
		</div>
	);
}

export default Toggle;
