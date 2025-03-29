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
			<div
				ref={buttonRef}
				className={styles.colorButton}
				onClick={handleClick}
				style={{backgroundColor: color}}
			></div>
			<label className={styles.label}>{label}</label>

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
		dispatch(setTheme({bg, fg, primary}));
	};

	return (
		<div className={styles.container}>
			<h3 className={styles.heading}>Theme</h3>
			<div className={styles.colorPickersSection}>
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
				/>{" "}
			</div>

			<div className={styles.previewSection}>
				<h4>Preview</h4>
				<div
					className={styles.preview}
					style={{
						"--preview-bg": bg,
						"--preview-fg": fg,
						"--preview-primary": primary,
					}}
				>
					<div className={styles.previewBgFg}>
						<span>Background + Foreground</span>
					</div>
					<div className={styles.previewBgPrimary}>
						<span>Background + Primary</span>
					</div>
					<div className={styles.previewPrimaryBg}>
						<span>Primary + Background</span>
					</div>
				</div>
			</div>

			<button className={styles.saveButton} onClick={handleSaveTheme}>
				Save Theme
			</button>
		</div>
	);
}

export default ThemeSetting;
