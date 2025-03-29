import React from "react";
import styles from "./Select.module.css";

function Select({label, value, onChange, options, description}) {
	return (
		<div className={styles.selectContainer}>
			<div className={styles.labelContainer}>
				<label className={styles.label}>{label}</label>
				{description && <p className={styles.description}>{description}</p>}
			</div>

			<div className={styles.optionsContainer}>
				{options.map((option) => (
					<div
						key={option.value}
						className={`${styles.optionCard} ${
							value === option.value ? styles.selected : ""
						}`}
						onClick={() => onChange(option.value)}
						role="button"
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								onChange(option.value);
							}
						}}
					>
						{option.label}
					</div>
				))}
			</div>

			{/* Keep the hidden select for form submission if needed */}
			<select
				className={styles.select}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}

export default Select;
