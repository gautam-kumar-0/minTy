import React, {useState, useRef, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {HexColorPicker} from "react-colorful";
import styles from "./ThemeSetting.module.css"; // Import CSS module

import {setTheme} from "./settingSlice"; // Adjust the import path

// Reusable Color Picker Component
function ColorPicker({label, initialColor, onChange}) {
	const [color, setColor] = useState(initialColor);
	const [isVisible, setIsVisible] = useState(false);
	const pickerRef = useRef(null);
	const buttonRef = useRef(null);

	const handleClick = () => {
		setIsVisible(!isVisible);
	};

	const handleChange = (newColor) => {
		setColor(newColor);
		onChange(newColor);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				isVisible &&
				pickerRef.current &&
				!pickerRef.current.contains(event.target) &&
				buttonRef.current !== event.target &&
				!buttonRef.current?.contains(event.target)
			) {
				setIsVisible(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isVisible]);

	return (
		<div className={styles.colorPickerContainer}>
			<label className={styles.label}>{label}:</label>
			<button
				ref={buttonRef}
				className={styles.colorButton}
				onClick={handleClick}
			>
				<div
					style={{
						width: "30px",
						height: "30px",
						backgroundColor: color,
						display: "inline-block",
						marginLeft: "10px",
						border: "1px solid #ccc",
					}}
				></div>
			</button>

			{isVisible && (
				<div ref={pickerRef} className={styles.pickerContainer}>
					<HexColorPicker color={color} onChange={handleChange} />
				</div>
			)}
		</div>
	);
}

function ThemeSetting() {
	const theme = useSelector((state) => state.settings.theme);
	const dispatch = useDispatch();

	const [bg, setBg] = useState(theme.bg);
	const [fg, setFg] = useState(theme.fg);
	const [primary, setPrimary] = useState(theme.primary);

	const handleSaveTheme = () => {
		console.log(fg, bg, primary);
		dispatch(setTheme({bg, fg, primary}));
	};

	return (
		<div className={styles.container}>
			<h3 className={styles.heading}>Theme Settings</h3>

			<ColorPicker
				label="Background Color"
				initialColor={bg}
				onChange={setBg}
			/>

			<ColorPicker
				label="Foreground Color"
				initialColor={fg}
				onChange={setFg}
			/>

			<ColorPicker
				label="Primary Color"
				initialColor={primary}
				onChange={setPrimary}
			/>

			<button className={styles.saveButton} onClick={handleSaveTheme}>
				Save Theme
			</button>
		</div>
	);
}

export default ThemeSetting;
